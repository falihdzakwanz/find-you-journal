"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface CarouselProps {
  images: { src: string; alt: string }[];
  interval?: number;
  className?: string;
}

export const Carousel = ({
  images,
  interval = 4000,
  className = "",
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval, isHovered]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-sm">
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              x: 0,
            }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className="h-1.5 rounded-full bg-white/50"
            animate={{
              width: index === currentIndex ? 24 : 12,
              backgroundColor:
                index === currentIndex
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.5)",
            }}
            transition={{ duration: 0.3 }}
            aria-label={`Show image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
