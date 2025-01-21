'use client';

import { Plus, Trash2 } from 'lucide-react';
import { RequestData } from '../types';

interface HeadersProps {
  request: RequestData;
  onRequestChange: (request: RequestData) => void;
}

export function Headers({ request, onRequestChange }: HeadersProps) {
  const addHeader = () => {
    onRequestChange({
      ...request,
      headers: [...request.headers, { key: '', value: '', enabled: true }]
    });
  };

  const addCorsHeaders = () => {
    const corsHeaders = [
      { key: 'Access-Control-Allow-Origin', value: '*', enabled: true },
      { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS', enabled: true },
      { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization', enabled: true }
    ];
    
    // Filter out existing CORS headers
    const nonCorsHeaders = request.headers.filter(h => !h.key.startsWith('Access-Control-'));
    
    onRequestChange({
      ...request,
      headers: [...nonCorsHeaders, ...corsHeaders]
    });
  };

  const removeHeader = (index: number) => {
    const newHeaders = request.headers.filter((_, i) => i !== index);
    onRequestChange({ ...request, headers: newHeaders });
  };

  const updateHeader = (index: number, field: 'key' | 'value' | 'enabled', value: string | boolean) => {
    const newHeaders = [...request.headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    onRequestChange({ ...request, headers: newHeaders });
  };

  const clearAllHeaders = () => {
    onRequestChange({
      ...request,
      headers: []
    });
  };

  return (
    <div className="mb-4 p-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Headers</h3>
        <div className="flex gap-2">
          <button
            className="text-xs bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded px-2 py-1 transition-colors"
            onClick={addCorsHeaders}
          >
            Add CORS Headers
          </button>
          <button
            className="text-xs bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded px-2 py-1 transition-colors"
            onClick={clearAllHeaders}
          >
            Clear All Headers
          </button>
        </div>
      </div>
      
      {request.headers.map((header, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-2 mb-2 group">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={header.enabled}
              onChange={(e) => updateHeader(index, 'enabled', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 flex gap-2">
            <input
              placeholder="Key"
              className={`flex-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 text-sm text-light-text dark:text-dark-text ${!header.enabled ? 'opacity-50' : ''}`}
              value={header.key}
              onChange={(e) => updateHeader(index, 'key', e.target.value)}
            />
            <input
              placeholder="Value"
              className={`flex-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 text-sm text-light-text dark:text-dark-text ${!header.enabled ? 'opacity-50' : ''}`}
              value={header.value}
              onChange={(e) => updateHeader(index, 'value', e.target.value)}
            />
          </div>
          <button
            className="text-light-text dark:text-dark-text hover:text-red-400 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1 sm:p-0"
            onClick={() => removeHeader(index)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      <button
        className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400"
        onClick={addHeader}
      >
        <Plus size={16} />
        Add Header
      </button>
    </div>
  );
} 