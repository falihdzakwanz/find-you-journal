const JournalSkeleton = () => {
  return (
    <main className="w-full max-w-sm px-4 py-10 mx-auto md:max-w-md lg:max-w-2xl animate-pulse">
      <div className="w-1/2 h-6 mb-2 bg-gray-300 rounded" />
      <div className="w-1/3 h-4 mb-6 bg-gray-200 rounded" />

      {[...Array(1)].map((_, i) => (
        <div key={i} className="mb-4 border rounded">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100">
            <div className="w-2/3 h-4 bg-gray-300 rounded" />
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-300 rounded" />
              <div className="w-5 h-5 bg-blue-300 rounded" />
            </div>
          </div>
          <div className="px-3 pb-3">
            <div className="w-full h-24 mt-2 bg-gray-200 rounded" />
          </div>
        </div>
      ))}

      <div className="w-full h-10 mt-4 bg-gray-300 rounded" />
      <div className="w-full h-10 mt-4 bg-gray-300 rounded" />
      <div className="w-1/3 h-10 mt-4 bg-gray-300 rounded" />
    </main>
  );
};

export default JournalSkeleton;
