"use client";

import { useSession, } from "next-auth/react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gradient-to-r from-yellow-100 to-orange-200">
      <HeroSection session={session} router={router} />
    </main>
  );
}
