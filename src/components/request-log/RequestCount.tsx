'use client';

interface RequestCountProps {
  count: number;
}

export function RequestCount({ count }: RequestCountProps) {
  return (
    <div className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium animate-fade-in">
      {count} {count === 1 ? 'request' : 'requests'} found
    </div>
  );
}