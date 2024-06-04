export default function NoResult() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <SearchIcon className="h-12 w-12 text-gray-400" />
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-semibold">No Search Results Found</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try a different search term or check your spelling.
        </p>
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
