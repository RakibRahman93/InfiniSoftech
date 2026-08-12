import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/admin/login",
  "/api/admin/login",
  "/api/admin/login-gate",
  "/api/admin/verify-otp",
  "/api/admin/logout",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Edge runtime cannot read server-only env vars (ADMIN_EMAIL/ADMIN_PASSWORD),
  // so full token validation happens server-side in the admin layout and API
  // route guards. This middleware only short-circuits the redirect for guests.
  const hasCookie = Boolean(request.cookies.get("admin_session")?.value);
  if (hasCookie) return NextResponse.next();

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};