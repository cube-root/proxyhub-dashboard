'use client';

interface ViewButtonProps {
  requestId: string;
}

export function ViewButton({ requestId }: ViewButtonProps) {
  const scrollToRequest = () => {
    document.getElementById(`request-${requestId}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      className="text-sm text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium transition-colors"
      onClick={scrollToRequest}
    >
      View
    </button>
  );
}