import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    // For protected routes, just continue
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {

        // For all other routes, require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/journal/:path*", "/profile"],
};
