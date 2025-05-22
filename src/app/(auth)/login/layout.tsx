import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Login - Find You",
  description: "Login to your account",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased bg-neutral">
      <Toaster />
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
