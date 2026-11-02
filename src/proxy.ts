
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/create-event",
  "/manage-events",
  "/joined-events",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasSessionCookie = request.cookies
    .getAll()
    .some((cookie) => cookie.name.includes("better-auth"));

  if (!hasSessionCookie) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackURL", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create-event/:path*",
    "/manage-events/:path*",
    "/joined-events/:path*",
  ],
};
