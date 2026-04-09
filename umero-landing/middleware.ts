import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("umero_token")?.value;

  // Validate token properly — don't just check existence
  let isValidToken = false;
  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
      isValidToken = true;
    } catch {
      isValidToken = false; // expired or malformed
    }
  }

  const protectedRoutes = ["/dashboard", "/profile", "/submit"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !isValidToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Only redirect away from login/signup if token is actually valid
  if (isValidToken && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
