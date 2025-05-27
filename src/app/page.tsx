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
    <main className="flex flex-col-reverse h-screen items-center justify-center md:justify-evenly lg:justify-between mx-auto lg:flex-row gap-8 px-4 pt-24 py-10 overflow-hidden lg:px-16 md:py-10">
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left md:w-3/4">
        {/* Text Animation */}
        <motion.div
          className="mb-5 text-3xl md:text-4xl font-bold lg:text-5xl text-dark-brown leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center lg:justify-start">
            {"Discover yourself, reflect on your journey, and grow every day."
              .split(" ")
              .map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.3,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="mr-2"
                >
                  {word}
                </motion.span>
              ))}
          </div>
        </motion.div>

        {/* Auth Button - Appears after text animation completes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay:
              0.3 *
                "Discover yourself, reflect on your journey, and grow every day.".split(
                  " "
                ).length +
              0.5,
            duration: 0.5,
          }}
        >
          <AuthButton
            isAuthenticated={!!session}
            userName={session?.user?.name}
            onWriteClick={() => router.push("/journal/today")}
          />
        </motion.div>
      </div>

      {/* Carousel with Blob Background */}
      <motion.div
        className="relative w-full md:w-3/4 lg:w-[45%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <BlobBackground color="#FFBB70" />
        <Carousel images={images} interval={4000} className="h-60 md:h-84" />
      </motion.div>
    </main>
  );
}
