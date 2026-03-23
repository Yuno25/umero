import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("umero_token")?.value;

  const protectedRoutes = ["/dashboard", "/profile", "/submit"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Protect routes
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent logged-in users from visiting login/signup
  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
