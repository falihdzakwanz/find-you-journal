import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token && req.nextUrl.pathname === "/login") {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({ req }) {
        const token = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
        });

        const { pathname } = req.nextUrl;
        const isAuthPage = pathname.startsWith("/login");

        // Allow access to auth pages when not logged in
        if (isAuthPage) return true;

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/journal/:path*", "/profile", "/login"],
};
