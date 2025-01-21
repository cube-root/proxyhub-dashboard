'use client';

import { Send } from 'lucide-react';
import { HTTP_METHODS } from '../utils';
import { RequestData } from '../types';

interface RequestUrlProps {
  request: RequestData;
  loading: boolean;
  onRequestChange: (request: RequestData) => void;
  onSend: () => void;
}

export function RequestUrl({ request, loading, onRequestChange, onSend }: RequestUrlProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center p-2">
      <select
        className="w-full sm:w-auto bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-3 py-2 text-light-text dark:text-dark-text"
        value={request.method}
        onChange={(e) => onRequestChange({ ...request, method: e.target.value })}
      >
        {HTTP_METHODS.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
      <div className="flex-1 flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="url"
          placeholder="Enter request URL"
          className="w-full flex-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-3 py-2 text-light-text dark:text-dark-text"
          value={request.url}
          onChange={(e) => onRequestChange({ ...request, url: e.target.value })}
        />
        <button 
          className="flex-1 sm:flex-initial btn-primary flex items-center justify-center gap-1" 
          onClick={onSend}
          disabled={loading || !request.url}
        >
          <Send size={18} />
          <span className="hidden sm:inline">{loading ? 'Sending...' : 'Send'}</span>
          <span className="sm:hidden">{loading ? '...' : ''}</span>
        </button>
      </div>
    </div>
  );
} 