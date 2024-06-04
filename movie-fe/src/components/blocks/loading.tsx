export default function Loading() {
  return (
    <div className="flex-1  flex flex-row gap-6 animate-pulse w-full flex-wrap">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 max-h-80 min-w-80"
        >
          <div className="animate-shimmer h-48 bg-gray-200 dark:bg-gray-700" />
          <div className="p-4">
            <div className="animate-shimmer h-6 w-3/4 bg-gray-200 mb-2 dark:bg-gray-700" />
            <div className="animate-shimmer h-4 w-full bg-gray-200 dark:bg-gray-700" />
            <div className="animate-shimmer h-4 w-4/5 bg-gray-200 mt-2 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
