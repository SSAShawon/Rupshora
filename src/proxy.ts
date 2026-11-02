
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create-event/:path*",
    "/manage-events/:path*",
    "/joined-events/:path*",
  ],
};
