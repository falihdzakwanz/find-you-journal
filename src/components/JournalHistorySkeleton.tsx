import Skeleton from "./Skeleton";

export default function JournalHistorySkeleton() {
  return (
    <main className="w-full max-w-sm px-4 py-10 mx-auto md:max-w-md lg:max-w-3xl animate-pulse">
      <Skeleton className="w-40 h-8 mb-2 rounded" />
      <section className="flex flex-row items-center justify-between gap-2 mb-4">
        <Skeleton className="w-full h-10 rounded sm:w-48" />

        <div className="flex space-x-2">
          <Skeleton className="w-8 h-8 rounded lg:w-36" />
          <Skeleton className="w-8 h-8 rounded lg:w-36" />
        </div>
      </section>

      <Skeleton className="w-48 h-8 mt-2 mb-2 rounded" />
      <section className="flex flex-col space-y-4">
        {[1, 2, 3].map((_, groupIdx) => (
          <div key={groupIdx} className="rounded shadow-sm">
            <div className="flex items-center justify-between p-4 bg-gray-100">
              <Skeleton className="w-3/4 h-5 rounded" />
              <Skeleton className="w-5 h-5 rounded-full" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
