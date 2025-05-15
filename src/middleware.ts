import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    // Bisa tambahkan logic tambahan di sini jika perlu
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        // Hanya izinkan akses jika user sudah login
        return !!token;
      },
    },
  }
);

// Konfigurasi route yang ingin dilindungi
export const config = {
  matcher: ["/journal/:path*", "/profile"],
};
