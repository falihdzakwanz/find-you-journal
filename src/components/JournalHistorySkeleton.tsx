import Skeleton from "./Skeleton";

export default function JournalHistorySkeleton() {
  return (
    <main className="w-full max-w-sm px-4 py-10 mx-auto md:max-w-md lg:max-w-3xl animate-pulse">
      {/* Header skeleton */}
      <Skeleton className="w-40 h-8 mb-2 rounded" />
      <div className="flex flex-col justify-between gap-2 mb-4 sm:flex-row">
        <Skeleton className="h-10 rounded w-36" />

        <div className="flex space-x-2">
          <Skeleton className="h-8 rounded w-36" />
          <Skeleton className="h-8 rounded w-36" />
        </div>
      </div>

      {/* Fake groups */}
      {[1].map((_, groupIdx) => (
        <div key={groupIdx} className="border rounded shadow-sm">
          {/* Group title */}
          <div className="flex items-center justify-between p-4 bg-gray-100">
            <Skeleton className="w-48 h-5 rounded" />
            <Skeleton className="w-5 h-5 rounded-full" />
          </div>

          <div className="p-4 space-y-4">
            {/* Day label */}
            <div className="space-y-2">
              {/* Fake journal entries */}
              {[1, 2].map((_, entryIdx) => (
                <div key={entryIdx} className="p-3 space-y-2 border rounded-md">
                  <Skeleton className="w-1/2 h-4 rounded" />
                  <Skeleton className="w-3/4 h-4 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
