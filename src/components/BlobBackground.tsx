"use client";

import { motion } from "framer-motion";

interface BlobBackgroundProps {
  color?: string;
  className?: string;
}

export const BlobBackground = ({
  color = "#FFBB70",
  className = "",
}: BlobBackgroundProps) => (
  <motion.svg
    className={`absolute z-0 w-[160%] h-[150%] -top-[22%] -left-[25%] opacity-50 hidden md:inline ${className}`}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    animate={{
      rotate: [0, 5, 0, -5, 0],
      y: [0, -10, 0, 10, 0],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <path
      fill={color}
      d="M45.6,-75.9C58.4,-71.6,67.7,-58,72,-43.8C76.3,-29.6,75.7,-14.8,74.4,-0.7C73.1,13.3,71.1,26.6,64.7,37.2C58.3,47.8,47.5,55.7,36,62.8C24.5,69.8,12.2,76.1,-2,79.6C-16.3,83.1,-32.6,83.8,-44.4,76.9C-56.2,70.1,-63.6,55.5,-71.9,41.4C-80.3,27.3,-89.7,13.7,-92,-1.4C-94.4,-16.4,-89.7,-32.7,-79.3,-43.3C-68.8,-53.8,-52.7,-58.5,-38.5,-62.1C-24.3,-65.7,-12.2,-68.2,2.1,-71.8C16.4,-75.5,32.8,-80.3,45.6,-75.9Z"
      transform="translate(100 100)"
    />
  </motion.svg>
);
