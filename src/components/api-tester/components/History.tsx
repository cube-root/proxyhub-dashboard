'use client';

import { useState } from 'react';
import { Clock, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TabData } from '../types';

interface HistoryProps {
  history: Array<TabData & { timestamp: number }>;
  onSelect: (request: TabData) => void;
  onClear: () => void;
  onRemove: (timestamp: number) => void;
}

export function History({ history, onSelect, onClear, onRemove }: HistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(history.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = history.slice(startIndex, endIndex);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatStatusColor = (status?: number) => {
    if (!status) return 'text-gray-500';
    if (status >= 200 && status < 300) return 'text-green-500';
    return 'text-red-500';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <h2 className="text-lg font-semibold">History</h2>
        </div>
        <button
          className="text-sm text-red-500 hover:text-red-400 flex items-center gap-1"
          onClick={onClear}
        >
          <Trash2 size={16} />
          Clear All
        </button>
      </div>
      
      <div className="flex-1 overflow-auto">
        {history.length === 0 ? (
          <div className="text-center text-light-text/60 dark:text-dark-text/60 p-4">
            No history yet
          </div>
        ) : (
          <div className="divide-y divide-light-border dark:divide-dark-border">
            {currentItems.map((item) => (
              <div 
                key={item.timestamp} 
                className="p-4 hover:bg-light-border/10 dark:hover:bg-dark-border/10 cursor-pointer"
                onClick={() => onSelect(item)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm px-2 py-0.5 bg-light-border/20 dark:bg-dark-border/20 rounded">
                        {item.request.method}
                      </span>
                      <span className="text-sm truncate">{item.request.url}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-light-text/60 dark:text-dark-text/60">
                      <span>{formatTimestamp(item.timestamp)}</span>
                      {item.response?.status && (
                        <span className={formatStatusColor(item.response.status)}>
                          {item.response.status}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    className="p-1 hover:text-red-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item.timestamp);
                    }}
                    title="Remove"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-light-border dark:border-dark-border p-2">
          <div className="flex items-center justify-between gap-2">
            <button
              className="p-1 hover:bg-light-border/10 dark:hover:bg-dark-border/10 rounded disabled:opacity-50"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="p-1 hover:bg-light-border/10 dark:hover:bg-dark-border/10 rounded disabled:opacity-50"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 