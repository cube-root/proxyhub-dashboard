"use client";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600" />
        <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">
          Loading...
        </span>
      </div>
    </div>
  );
}
