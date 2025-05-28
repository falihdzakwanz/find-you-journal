import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import Logger from "@/lib/pino/logger";
import { getToken } from "next-auth/jwt";

export default withAuth(
  function middleware() {

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ req }) {
        const token = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
        });
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
