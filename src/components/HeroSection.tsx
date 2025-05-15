import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";

interface Props {
    session: Session | null;
    router: AppRouterInstance;
}

const HeroSection = ({ session, router }: Props) => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 md:flex md:flex-col md:items-start">
        <h1 className="text-2xl font-bold mb-6 lg:text-left lg:text-4xl">
          &quot;Temukan diri Anda, refleksikan perjalanan Anda, dan tumbuh
          setiap hari.&quot;
        </h1>
        {session ? (
          <>
            <p className="mb-4">Selamat datang, {session.user?.name}</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => router.push("/journal/today")}
                className="btn"
              >
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
            </div>
          </>
        ) : (
          <button onClick={() => signIn("google")} className="bg-[#f59e0b] text-white py-3.5 px-7 rounded-lg font-bold">
            🔐 Masuk dengan Google
          </button>
        )}
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 relative">
        <img
          src="https://placehold.co/600x400/png"
          alt="Personal Growth"
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <svg
          className="absolute top-0 left-0 w-32 h-32 text-yellow-300 opacity-30"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-32 h-32 text-orange-300 opacity-30"
          viewBox="0 0 100 100"
        >
          <rect width="100" height="100" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
