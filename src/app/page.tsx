"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-2">Personal Growth Journal</h1>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => router.push("/journal/today")} className="btn">
            ✍️ Mulai Menulis
          </button>
          <button
            onClick={() => router.push("/journal/history")}
            className="btn"
          >
            📖 Lihat Riwayat
          </button>
          <button onClick={() => signOut()} className="btn-secondary mt-4">
            Logout
          </button>
        </>
      ) : (
        <button onClick={() => signIn("google")} className="btn">
          🔐 Masuk dengan Google
        </button>
      )}
    </main>
  );
}
