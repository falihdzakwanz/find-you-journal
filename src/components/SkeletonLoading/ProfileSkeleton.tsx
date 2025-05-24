"use client";

import { motion } from "framer-motion";
import Skeleton from "./Skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Profile Header Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center mb-12 text-center"
      >
        <div className="w-32 h-32 mb-4 rounded-full bg-primary/20 animate-pulse"></div>
        <Skeleton className="w-48 h-8 mb-2" />
        <Skeleton className="w-64 h-4" />
        <Skeleton className="w-32 h-10 mt-6" />
      </motion.div>

      {/* Quick Stats Skeleton */}
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-lg bg-primary/10 animate-pulse"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 mr-3 rounded-full bg-primary/20"></div>
              <Skeleton className="w-24 h-4" />
            </div>
            <Skeleton className="w-16 h-8" />
          </motion.div>
        ))}
      </div>

      {/* Detailed Statistics Skeleton */}
      <div className="p-6 mb-12 rounded-lg bg-primary/10 animate-pulse">
        <div className="flex items-center mb-6">
          <Skeleton className="w-6 h-6 mr-2" />
          <Skeleton className="w-48 h-6" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="flex items-center mb-4">
                <Skeleton className="w-6 h-6 mr-2" />
                <Skeleton className="w-36 h-5" />
              </div>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex justify-between py-2">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-16 h-4" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Highlights Skeleton */}
      <div>
        <div className="flex items-center mb-6">
          <Skeleton className="w-6 h-6 mr-2" />
          <Skeleton className="w-48 h-6" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 border rounded-lg bg-primary/10 border-neutral-200"
            >
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 rounded-full bg-primary/20"></div>
                <Skeleton className="w-32 h-5" />
              </div>
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4 mt-2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
