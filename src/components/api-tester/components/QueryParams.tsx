'use client';

import { Trash2 } from 'lucide-react';
import { RequestData } from '../types';

interface QueryParamsProps {
  request: RequestData;
  onRequestChange: (request: RequestData) => void;
}

export function QueryParams({ request, onRequestChange }: QueryParamsProps) {
  const addQueryParam = () => {
    onRequestChange({
      ...request,
      queryParams: [...request.queryParams, { key: '', value: '' }]
    });
  };

  const removeQueryParam = (index: number) => {
    const newParams = request.queryParams.filter((_, i) => i !== index);
    onRequestChange({ ...request, queryParams: newParams });
  };

  const updateQueryParam = (index: number, field: 'key' | 'value', value: string) => {
    const newParams = [...request.queryParams];
    newParams[index] = { ...newParams[index], [field]: value };
    onRequestChange({ ...request, queryParams: newParams });
  };

  return (
    <div className="mb-4 p-2">
      <h3 className="text-sm font-medium mb-2">Query Parameters</h3>
      {request.queryParams.map((param, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-2 mb-2 group">
          <div className="flex-1 flex gap-2">
            <input
              placeholder="Key"
              className="flex-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 text-sm text-light-text dark:text-dark-text"
              value={param.key}
              onChange={(e) => updateQueryParam(index, 'key', e.target.value)}
            />
            <input
              placeholder="Value"
              className="flex-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 text-sm text-light-text dark:text-dark-text"
              value={param.value}
              onChange={(e) => updateQueryParam(index, 'value', e.target.value)}
            />
          </div>
          <button
            className="text-light-text dark:text-dark-text hover:text-red-400 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1 sm:p-0"
            onClick={() => removeQueryParam(index)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      <button
        className="text-sm text-blue-500 hover:text-blue-400 mt-2"
        onClick={addQueryParam}
      >
        + Add Parameter
      </button>
    </div>
  );
} 