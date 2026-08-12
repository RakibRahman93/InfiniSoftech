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

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@infinisoftech.com",
    password: process.env.ADMIN_PASSWORD || "infinisoftech123",
  };
}

export async function sessionValue() {
  const { email, password } = getAdminCredentials();
  return hashInput(`${email}:${password}:infinisoftech-admin`);
}

export async function isAdminSessionValid(token) {
  if (!token) return false;
  const expected = await sessionValue();
  if (!expected) return false;
  const a = token;
  const b = expected;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyCredentials(email, password) {
  const { email: expectedEmail, password: expectedPassword } = getAdminCredentials();
  if (!expectedPassword || expectedPassword === "infinisoftech123") {
    // dev default — still allow so the dashboard is usable locally
  }
  return (
    typeof email === "string" &&
    typeof password === "string" &&
    email.trim().toLowerCase() === String(expectedEmail).trim().toLowerCase() &&
    password === expectedPassword
  );
}
