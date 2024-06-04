type Props = {
  title?: string;
  description?: string;
};

export default function ErrorComponent(props: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-4 md:p-6">
      <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800">
        <TriangleAlertIcon className="h-12 w-12 text-red-500" />
      </div>
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-2">
          {props.title ?? "Oops, something went wrong!"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          {props.description ??
            `We\'re sorry, but an unexpected error has occurred. Please try again later or contact support if the issue
            persists.`}
        </p>
      </div>
    </div>
  );
}

function TriangleAlertIcon(props: any) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
