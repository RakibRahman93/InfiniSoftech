import { prisma, hasPrisma } from "@/lib/prisma";

const TE = new TextEncoder();

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashInput(input) {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    return "";
  }
  const digest = await crypto.subtle.digest("SHA-256", TE.encode(input));
  return toHex(digest);
}

function generateSalt() {
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return toHex(bytes);
}

export async function hashPassword(password, salt = generateSalt()) {
  return { salt, hash: await hashInput(`${salt}:${password}:infinisoftech-admin`) };
}

export async function verifyPassword(password, salt, storedHash) {
  if (!salt || !storedHash) return false;
  const attempt = await hashInput(`${salt}:${password}:infinisoftech-admin`);
  return attempt.length === storedHash.length && attempt === storedHash;
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@infinisoftech.com",
    password: process.env.ADMIN_PASSWORD || "infinisoftech123",
  };
}

function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

async function getAdminUser(email) {
  if (!hasPrisma()) return null;
  try {
    return await prisma.adminUser.findUnique({
      where: { email: normalizeEmail(email) },
    });
  } catch {
    return null;
  }
}

export async function isOtpEnabledFor(email) {
  const user = await getAdminUser(email);
  return user?.otpEnabled !== false;
}

export async function ensureAdminSeeded() {
  if (!hasPrisma()) return { seeded: false, reason: "prisma-not-configured" };

  const { email, password } = getAdminCredentials();
  const existing = await getAdminUser(email);
  if (existing) return { seeded: false, reason: "exists" };

  const { salt, hash } = await hashPassword(password);
  try {
    await prisma.adminUser.create({
      data: {
        email: normalizeEmail(email),
        passwordHash: hash,
        salt,
        otpEnabled: true,
      },
    });
    return { seeded: true };
  } catch (error) {
    return { seeded: false, reason: error?.message };
  }
}

export async function verifyCredentials(email, password) {
  if (hasPrisma()) {
    const normalized = normalizeEmail(email);
    let user = null;
    try {
      user = await prisma.adminUser.findUnique({ where: { email: normalized } });
    } catch {
      user = null;
    }

    if (user && user.passwordHash && user.salt) {
      return verifyPassword(password, user.salt, user.passwordHash);
    }

    const env = getAdminCredentials();
    if (
      typeof email === "string" &&
      typeof password === "string" &&
      normalized === normalizeEmail(env.email) &&
      password === env.password
    ) {
      await ensureAdminSeeded();
      return true;
    }
    return false;
  }

  const { email: expectedEmail, password: expectedPassword } = getAdminCredentials();
  return (
    typeof email === "string" &&
    typeof password === "string" &&
    normalizeEmail(email) === normalizeEmail(expectedEmail) &&
    password === expectedPassword
  );
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function issueOtpFor(email) {
  if (!hasPrisma()) return { error: "Prisma/DATABASE_URL is not configured." };

  const normalized = normalizeEmail(email);
  const value = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  const codeHash = await hashInput(value);

  try {
    await prisma.adminUser.updateMany({
      where: { email: normalized },
      data: { otpHash: codeHash, otpExpiresAt: expiresAt },
    });

    await prisma.adminOtp.create({
      data: {
        email: normalized,
        codeHash,
        expiresAt,
      },
    });
  } catch (error) {
    return { error: error?.message };
  }

  const sendError = await sendOtpEmail(normalized, value);
  if (sendError) return { error: sendError, devOtp: process.env.NODE_ENV !== "production" ? value : undefined };

  return { ok: true };
}

export async function verifyOtp(email, code) {
  if (!hasPrisma()) return false;

  const normalized = normalizeEmail(email);
  let user;
  try {
    user = await prisma.adminUser.findUnique({ where: { email: normalized } });
  } catch {
    return false;
  }
  if (!user) return false;

  const trimmed = String(code ?? "").trim();

  // 1) Emailed one-time code stored on the admin user.
  if (user.otpHash) {
    if (!user.otpExpiresAt || user.otpExpiresAt.getTime() >= Date.now()) {
      const expected = await hashInput(trimmed);
      if (expected.length === user.otpHash.length && expected === user.otpHash) {
        await prisma.adminUser.update({
          where: { id: user.id },
          data: { otpHash: null, otpExpiresAt: null, lastLoginAt: new Date() },
        });
        await prisma.adminOtp.updateMany({
          where: { email: normalized, codeHash: user.otpHash },
          data: { expiresAt: new Date() },
        });
        return true;
      }
    }
  }

  // 2) Admin-managed security codes (CRUD from the Security panel).
  try {
    const { verifySecurityCode } = await import("@/lib/admin/security-codes-service");
    if (await verifySecurityCode(trimmed)) {
      await prisma.adminUser.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
      return true;
    }
  } catch {
    // fall through
  }

  return false;
}

async function sendOtpEmail(to, code) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return "Email is not configured (EMAIL_USER/EMAIL_PASS).";

  try {
    const { default: nodemailer } = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"Infinisoftech Admin" <${user}>`,
      to,
      subject: "Your Infinisoftech admin login code",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;padding:20px;background:#fff;border-radius:8px;border:2px solid #8876FF">
          <h2 style="background:linear-gradient(90deg,#8876FF 0%,#E75778 100%);color:#fff;padding:14px;border-radius:6px;text-align:center;margin:0 0 16px;">Admin Login Code</h2>
          <p>Hi,</p>
          <p>Use the code below to finish signing in to your Infinisoftech admin dashboard. It expires in <strong>10 minutes</strong>.</p>
          <p style="text-align:center;font-size:34px;font-weight:800;letter-spacing:8px;color:#4D8A5B;margin:18px 0;">${code}</p>
          <p style="text-align:center;color:#777;font-size:12px;">If you did not request this, you can safely ignore this email.</p>
        </div>
      `,
    });
    return null;
  } catch (err) {
    return err?.message || "Failed to send OTP email.";
  }
}

export async function sessionValue() {
  if (hasPrisma()) {
    const { email } = getAdminCredentials();
    const user = await getAdminUser(email);
    if (user?.passwordHash && user?.salt) {
      return hashInput(`${email}:${user.salt}:${user.passwordHash}:infinisoftech-admin`);
    }
  }
  const { email, password } = getAdminCredentials();
  return hashInput(`${email}:${password}:infinisoftech-admin`);
}

export async function isAdminSessionValid(token) {
  if (!token) return false;
  const expected = await sessionValue();
  if (!expected) return false;
  if (token.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i++) diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}