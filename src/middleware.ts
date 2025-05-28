import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import Logger from "@/lib/pino/logger";

export default withAuth(
  function middleware() {

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        if (!token) {
          const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";

          Logger.warn("Unauthorized access attempt", {
            path: req.nextUrl.pathname,
            ip,
            userAgent: req.headers.get("user-agent"),
          });
        }
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
      error: "/error",
    },
  }
);

export const config = {
  matcher: ["/journal/:path*", "/profile"],
};
