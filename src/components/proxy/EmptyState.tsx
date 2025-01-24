"use client";

export function EmptyState() {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto transform transition-all duration-300 hover:scale-[1.02]">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Animated Icon Container */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-100 animate-pulse"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-full p-4">
              <div className="relative animate-bounce">
                <svg
                  className="h-16 w-16 text-blue-500 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 16l2.879-2.879m0 0a3 3 0 104.242-4.242 3 3 0 00-4.242 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="absolute -top-1 -right-1">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              No Requests Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-sm">
              We&apos;re actively listening for incoming requests. They&apos;ll appear
              here as soon as they arrive.
            </p>
          </div>

          {/* Status Indicator */}
          <div className="pt-4">
            <div className="inline-flex items-center px-4 py-2 space-x-2 text-sm text-blue-500 dark:text-blue-400 border border-blue-500/30 dark:border-blue-400/30 rounded-full bg-blue-50/50 dark:bg-blue-900/20">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Listening for requests...</span>
            </div>
          </div>

          {/* Tips Section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p className="font-medium mb-2">Quick Tips:</p>
              <ul className="space-y-1 text-left">
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Make sure your API endpoint is correct
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Check if your request includes required headers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
