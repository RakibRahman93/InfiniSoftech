import { v2 as cloudinary } from "cloudinary";
import { prisma, hasPrisma } from "@/lib/prisma";
import { logAudit } from "@/lib/admin/audit-service";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
const CLOUDINARY_URL_SET = Boolean(process.env.CLOUDINARY_URL);

const ALLOWED_TYPES = new Set([
  // images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/bmp",
  "image/avif",
  "image/tiff",
  // documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  "text/markdown",
  "application/json",
  // archives
  "application/zip",
  "application/x-zip-compressed",
  "application/x-rar-compressed",
  "application/gzip",
  // audio / video
  "audio/mpeg",
  "audio/wav",
  "audio/mp4",
  "audio/ogg",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

let cloudinaryConfigured = false;

function configureCloudinary() {
  if (cloudinaryConfigured) return;
  const url = process.env.CLOUDINARY_URL || "";
  const m = url.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
  if (m) {
    cloudinary.config({ cloud_name: m[3], api_key: m[1], api_secret: m[2] });
    cloudinaryConfigured = true;
  }
}

function mapFile(f) {
  return {
    id: f.id,
    projectId: f.projectId,
    publicId: f.publicId ?? "",
    url: f.url,
    secureUrl: f.secureUrl ?? f.url,
    fileName: f.fileName,
    fileType: f.fileType ?? "",
    fileSize: f.fileSize ?? 0,
    isImage: f.isImage,
    uploadedById: f.uploadedById ?? "",
    uploadedBy: f.uploadedBy ?? "",
    createdAt: f.createdAt,
  };
}

function sanitizeName(name) {
  return String(name ?? "file")
    .replace(/[^\w.\-() ]/g, "_")
    .slice(0, 120);
}

async function notifyFileUploaded({ project, file, actor }) {
  const { createNotification } = await import("@/lib/notification-service");
  const { getCustomerByEmail } = await import("@/lib/customer/auth");

  const actorName = actor?.name || actor?.email || "Admin";
  const actorRole = actor?.role || "ADMIN";
  const title = `New file in ${project.name}`;
  const message = `${actorName} uploaded "${file.fileName}" to ${project.name}.`;

  // Customer owning this project
  if (project.clientEmail) {
    const customer = await getCustomerByEmail(project.clientEmail);
    if (customer) {
      await createNotification({
        role: "CUSTOMER",
        userId: customer.id,
        type: "PROJECT_FILE",
        title,
        message,
        entityType: "Project",
        entityId: project.id,
        link: "/customer/dashboard/projects",
        actorName,
        actorRole,
      });
    }
  }

  // Developers: project manager + all task assignees on the project
  const userIds = new Set();
  if (project.projectManagerId) userIds.add(project.projectManagerId);
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId: project.id, assigneeId: { not: null } },
      select: { assigneeId: true },
    });
    tasks.forEach((t) => {
      if (t.assigneeId) userIds.add(t.assigneeId);
    });
  } catch {
    // ignore query failures
  }
  userIds.delete(actor?.id);
  for (const userId of userIds) {
    await createNotification({
      role: "DEVELOPER",
      userId,
      type: "PROJECT_FILE",
      title,
      message,
      entityType: "Project",
      entityId: project.id,
      link: "/developer/dashboard/projects",
      actorName,
      actorRole,
    });
  }

  // Admin (when someone else uploaded)
  if (actorRole !== "ADMIN") {
    await createNotification({
      role: "ADMIN",
      userId: null,
      type: "PROJECT_FILE",
      title,
      message,
      entityType: "Project",
      entityId: project.id,
      link: "/admin/dashboard/project-files",
      actorName,
      actorRole,
    });
  }
}

export async function listProjectFiles(projectId) {
  if (!hasPrisma()) return [];
  try {
    const rows = await prisma.projectFile.findMany({
      where: projectId ? { projectId } : {},
      orderBy: { createdAt: "desc" },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            projectCode: true,
            status: true,
            health: true,
            progress: true,
            clientName: true,
          },
        },
      },
    });
    return rows.map((r) => ({
      ...mapFile(r),
      projectName: r.project?.name ?? "",
      projectCode: r.project?.projectCode ?? "",
      clientName: r.project?.clientName ?? "",
    }));
  } catch {
    return [];
  }
}

export async function listAllProjectFiles() {
  return listProjectFiles(null);
}

function uploadToCloudinary({ buffer, folder, resourceType }) {
  return new Promise((resolve, reject) => {
    configureCloudinary();
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    stream.on("error", reject);
    stream.end(buffer);
  });
}

export async function uploadProjectFile({ projectId, buffer, originalname, mimetype, size, actor }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  if (!CLOUDINARY_URL_SET) {
    return { error: "Cloudinary is not configured." };
  }

  if (!buffer || buffer.length === 0) {
    return { error: "No file received." };
  }
  if (buffer.length > MAX_FILE_SIZE) {
    return { error: "File is too large. Maximum size is 20 MB." };
  }
  const type = String(mimetype ?? "").toLowerCase();
  if (!ALLOWED_TYPES.has(type)) {
    return { error: "File type not allowed." };
  }

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return { error: "Project not found." };

  const folder = `infinisoft/projects/${project.projectCode || project.id}`;

  let result;
  try {
    result = await uploadToCloudinary({
      buffer,
      folder,
      resourceType: type.startsWith("image/") ? "image" : "raw",
    });
  } catch {
    return { error: "Upload failed. Please try again." };
  }

  const fileName = sanitizeName(originalname);
  const row = await prisma.projectFile.create({
    data: {
      projectId,
      publicId: result.public_id ?? null,
      url: result.url ?? "",
      secureUrl: result.secure_url ?? null,
      fileName,
      fileType: type,
      fileSize: size ?? buffer.length,
      isImage: type.startsWith("image/"),
      uploadedById: actor?.id ?? null,
      uploadedBy: actor?.name ?? actor?.email ?? null,
    },
  });

  await logAudit({
    actorId: actor?.id,
    actorName: actor?.name ?? actor?.email,
    action: "PROJECT_FILE_UPLOADED",
    entityType: "Project",
    entityId: projectId,
    metadata: { projectName: project.name, fileName, fileType: type, publicId: result.public_id },
    request: actor?.request,
  });

  await notifyFileUploaded({ project, file: { fileName }, actor });

  return { file: mapFile(row) };
}

export async function updateProjectFile(fileId, { fileName, actor = {}, ownerId = null }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const row = await prisma.projectFile.findUnique({ where: { id: fileId } });
  if (!row) return { error: "File not found." };

  if (ownerId && row.uploadedById && row.uploadedById !== ownerId) {
    return { error: "You can only manage files you uploaded." };
  }

  const name = sanitizeName(String(fileName ?? "").trim());
  if (!name) return { error: "File name is required." };

  const updated = await prisma.projectFile.update({
    where: { id: fileId },
    data: { fileName: name },
  });

  await logAudit({
    actorId: actor?.id,
    actorName: actor?.name ?? actor?.email,
    action: "PROJECT_FILE_RENAMED",
    entityType: "Project",
    entityId: row.projectId,
    metadata: { prevName: row.fileName, fileName: name },
    request: actor?.request,
  });
  return { file: mapFile(updated) };
}

export async function deleteProjectFile(fileId, actor = {}, ownerId = null) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  const row = await prisma.projectFile.findUnique({ where: { id: fileId } });
  if (!row) return { error: "File not found." };

  if (ownerId && row.uploadedById && row.uploadedById !== ownerId) {
    return { error: "You can only delete files you uploaded." };
  }

  if (row.publicId) {
    try {
      configureCloudinary();
      await cloudinary.uploader.destroy(row.publicId, { resource_type: row.isImage ? "image" : "raw" });
    } catch {
      // best-effort: still remove the database row
    }
  }

  await prisma.projectFile.delete({ where: { id: fileId } });
  await logAudit({
    actorId: actor?.id,
    actorName: actor?.name ?? actor?.email,
    action: "PROJECT_FILE_DELETED",
    entityType: "Project",
    entityId: row.projectId,
    metadata: { fileName: row.fileName, publicId: row.publicId },
    request: actor?.request,
  });
  return { ok: true };
}