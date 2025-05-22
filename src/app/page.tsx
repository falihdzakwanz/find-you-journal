"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Carousel } from "@/components/Carousel";
import { BlobBackground } from "@/components/BlobBackground";
import { AuthButton } from "@/components/ui/AuthButton";

const images = [
  { src: "/image/dog_and_human.webp", alt: "Person smiling with a dog" },
  { src: "/image/woman_smiling.webp", alt: "Woman smiling" },
  { src: "/image/cat_and_human.webp", alt: "Person smiling with a cat" },
  { src: "/image/woman_smiling_2.webp", alt: "Woman smiling" },
];

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col-reverse h-screen items-center justify-center md:justify-evenly lg:justify-between mx-auto lg:flex-row gap-8 px-4 py-10 overflow-hidden lg:px-16">
      {/* Text Content */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left md:w-3/5">
        <motion.h1
          className="mb-6 text-2xl md:text-3xl font-bold lg:text-4xl text-dark-brown leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          &quot;Discover yourself, reflect on your journey, and grow every
          day.&quot;
        </motion.h1>

        <AuthButton
          isAuthenticated={!!session}
          userName={session?.user?.name}
          onWriteClick={() => router.push("/journal/today")}
        />
      </div>

      {/* Carousel with Blob Background */}
      <motion.div
        className="relative w-5/6 md:w-3/5 lg:w-2/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <BlobBackground color="#FFBB70" />
        <Carousel images={images} interval={4000} className="h-64 md:h-80" />
      </motion.div>
    </main>
  );
}
