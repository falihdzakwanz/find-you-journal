import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import React from "react";

interface Props {
  session: Session | null;
  router: AppRouterInstance;
}

const HeroSection = ({ session, router }: Props) => {
  return (
    <div className="flex flex-col items-center justify-between max-w-5xl mx-auto md:flex-row">
      <div className="md:w-1/2 md:flex md:flex-col md:items-start">
        <h1 className="mb-6 text-2xl font-bold text-base lg:text-left lg:text-4xl">
          &quot;Temukan diri Anda, refleksikan perjalanan Anda, dan tumbuh
          setiap hari.&quot;
        </h1>
        {session ? (
          <>
            <p className="mb-4 text-base">
              Selamat datang, {session.user?.name}
            </p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => router.push("/journal/today")}
                className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition"
              >
                ✍️ Mulai Menulis
              </button>
              <button
                onClick={() => router.push("/journal/history")}
                className="bg-accent text-white font-semibold py-3 px-6 rounded-lg hover:bg-rose-400 transition"
              >
                📖 Lihat Riwayat
              </button>
              <button
                onClick={() => signOut()}
                className="mt-4 text-base font-medium underline"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-primary text-white py-3.5 px-7 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            🔐 Masuk dengan Google
          </button>
        )}
      </div>
      <div className="mt-8 md:w-1/2 md:mt-0">
        <Image
          src="/image/hug.png"
          alt="Personal Growth"
          width={400}
          height={200}
          className="w-1/2 h-auto m-auto border-none lg:w-3/5"
        />
      </div>
    </div>
  );
};

export default HeroSection;
