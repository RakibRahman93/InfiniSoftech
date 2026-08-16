import { v2 as cloudinary } from "cloudinary";
import { prisma, hasPrisma } from "@/lib/prisma";

const AVATAR_MAX_BYTES = 5 * 1024 * 1024;
const AVATAR_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

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

function publicIdFor(role, identifier) {
  const clean = String(identifier).replace(/[^a-zA-Z0-9_-]/g, "-");
  return `infinisoft/avatars/${role}/${role}-${clean}`;
}

export function uploadAvatar({ role, identifier, buffer }) {
  return new Promise((resolve, reject) => {
    configureCloudinary();
    const publicId = publicIdFor(role, identifier);
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: "image",
        overwrite: true,
        invalidate: true,
        transformation: [{ width: 512, height: 512, crop: "limit" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    stream.on("error", reject);
    stream.end(buffer);
  });
}

export function deleteAvatar({ role, identifier }) {
  return new Promise((resolve) => {
    configureCloudinary();
    cloudinary.uploader.destroy(
      publicIdFor(role, identifier),
      { resource_type: "image" },
      () => resolve(),
    );
  });
}

export async function updateAvatar({ role, identifier, avatarUrl }) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };
  try {
    if (role === "admin") {
      await prisma.adminUser.update({ where: { email: identifier }, data: { avatarUrl } });
    } else if (role === "customer") {
      await prisma.customer.update({ where: { id: identifier }, data: { avatarUrl } });
    } else if (role === "developer") {
      await prisma.user.update({ where: { id: identifier }, data: { avatarUrl } });
    }
    return { ok: true };
  } catch (error) {
    return { error: error?.message || "Could not update profile image." };
  }
}

export function validateAvatarFile({ buffer, mimetype }) {
  if (!buffer || buffer.length === 0) return "No image received.";
  if (buffer.length > AVATAR_MAX_BYTES) return "Image is too large. Maximum size is 5 MB.";
  if (!AVATAR_TYPES.has(String(mimetype ?? "").toLowerCase())) {
    return "Image type not allowed. Use JPG, PNG, WebP or GIF.";
  }
  return null;
}