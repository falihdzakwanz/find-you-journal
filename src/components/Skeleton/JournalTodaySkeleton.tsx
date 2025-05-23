import React from "react";
import Skeleton from "./Index";

const JournalTodaySkeleton = () => {
  return (
    <main className="w-full max-w-sm px-4 py-10 mx-auto md:max-w-md lg:max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="w-1/2 h-8 mb-2" />
        <Skeleton className="w-1/3 h-4" />
      </div>

      {/* Journal Entry */}
      <div className="mb-4 border rounded-lg border-primary/10 ">
        <div className="flex items-center justify-between px-4 py-3">
          <Skeleton className="w-2/3 h-5" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="w-5 h-5 rounded-full" />
          </div>
        </div>
        <div className="px-4 pb-4">
          <Skeleton className="w-full h-32 mt-2" />
        </div>
      </div>

      {/* Question Suggestions */}
      <Skeleton className="w-full h-12 mb-3 rounded-lg" />

      {/* Custom Question */}
      <Skeleton className="w-full h-12 mb-5 rounded-lg" />

      {/* Submit Button */}
      <Skeleton className="w-full h-12 rounded-lg" />
    </main>
  );
};

export default JournalTodaySkeleton;
