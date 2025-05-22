import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isAuthPage =
      pathname.startsWith("/login");

    // If user is logged in and trying to access auth pages
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // For protected routes, just continue
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        const isAuthPage =
          pathname.startsWith("/login");

        // Allow access to auth pages when not logged in
        if (isAuthPage) return true;

        // For all other routes, require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/journal/:path*", "/profile", "/login"],
};
