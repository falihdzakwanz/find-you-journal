import Skeleton from "./Index";

export default function JournalHistorySkeleton() {
  return (
    <main className="w-full max-w-sm px-4 py-10 mx-auto md:max-w-md lg:max-w-3xl animate-pulse">
      <Skeleton className="w-40 h-10 mb-4 rounded lg:h-12" />
      <section className="flex flex-row items-center justify-between gap-2 mb-8">
        <Skeleton className="w-full h-12 rounded lg:h-14 sm:w-48" />

        <div className="flex space-x-2">
          <Skeleton className="w-12 rounded h-11 lg:h-12 lg:w-36" />
          <Skeleton className="w-12 rounded h-11 lg:h-12 lg:w-36" />
        </div>
      </section>

      <section className="flex flex-row items-end mt-2 mb-4 space-x-2">
        <Skeleton className="w-48 h-10 rounded lg:h-12" />
        <Skeleton className="w-16 h-8 rounded lg:h-10" />
      </section>

      <section className="flex flex-col space-y-4">
        {[1, 2, 3].map((_, groupIdx) => (
          <div key={groupIdx} className="overflow-hidden rounded shadow-sm">
            <div className="flex items-center justify-between p-4 py-6 bg-gray-100/50">
              <Skeleton className="w-3/4 h-5 rounded" />
              <Skeleton className="w-5 h-5 rounded-full" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
