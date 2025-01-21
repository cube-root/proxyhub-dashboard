'use client';

import { Plus, Trash2, Upload } from 'lucide-react';
import { RequestData, FormDataItem } from '../types';
import { CONTENT_TYPES } from '../utils';

interface RequestBodyProps {
  request: RequestData;
  onRequestChange: (request: RequestData) => void;
}

export function RequestBody({ request, onRequestChange }: RequestBodyProps) {
  if (request.method === 'GET') return null;

  const addFormDataItem = () => {
    const newFormData = [...(request.formData || []), { key: '', value: '', type: 'text' as const }];
    onRequestChange({ ...request, formData: newFormData });
  };

  const addHeader = () => {
    onRequestChange({
      ...request,
      headers: [...request.headers, { key: '', value: '' }]
    });
  };

  const addCorsHeaders = () => {
    const corsHeaders = [
      { key: 'Access-Control-Allow-Origin', value: '*' },
      { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS' },
      { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' }
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

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...request.headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    onRequestChange({ ...request, headers: newHeaders });
  };

  const removeFormDataItem = (index: number) => {
    const newFormData = (request.formData || []).filter((_, i) => i !== index);
    onRequestChange({ ...request, formData: newFormData });
  };

  const updateFormDataItem = (index: number, field: keyof FormDataItem, value: string | File | null) => {
    const newFormData = [...(request.formData || [])];
    if (field === 'file') {
      newFormData[index] = { 
        ...newFormData[index], 
        file: value as File,
        value: value ? (value as File).name : ''
      };
    } else {
      newFormData[index] = { ...newFormData[index], [field]: value };
    }
    onRequestChange({ ...request, formData: newFormData });
  };

  return (
    <div className="space-y-6 p-2">
      {/* Headers Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Headers</h3>
          <button
            className="text-xs bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded px-2 py-1 transition-colors"
            onClick={addCorsHeaders}
          >
            Add CORS Headers
          </button>
        </div>
        <div className="space-y-2">
          {request.headers.map((header, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2 group">
              <input
                placeholder="Header Name"
                className="flex-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 text-sm"
                value={header.key}
                onChange={(e) => updateHeader(index, 'key', e.target.value)}
              />
              <div className="flex-1 flex gap-2">
                <input
                  placeholder="Header Value"
                  className="flex-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 text-sm"
                  value={header.value}
                  onChange={(e) => updateHeader(index, 'value', e.target.value)}
                />
                <button
                  className="text-light-text dark:text-dark-text hover:text-red-400 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeHeader(index)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
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
      </div>

      {/* Body Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
          <h3 className="text-sm font-medium">Body</h3>
          <select
            className="w-full sm:w-auto bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 text-sm text-light-text dark:text-dark-text"
            value={request.contentType}
            onChange={(e) => {
              onRequestChange({ 
                ...request, 
                contentType: e.target.value,
                formData: e.target.value === 'multipart/form-data' ? [{ key: '', value: '', type: 'text' }] : undefined
              });
            }}
          >
            {Object.entries(CONTENT_TYPES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        
        {request.contentType === 'application/json' && (
          <textarea
            className="w-full h-32 sm:h-48 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-3 py-2 font-mono text-xs sm:text-sm text-light-text dark:text-dark-text"
            placeholder="Request body (JSON)"
            value={request.body}
            onChange={(e) => onRequestChange({ ...request, body: e.target.value })}
          />
        )}

        {request.contentType === 'multipart/form-data' && (
          <div className="space-y-2">
            {(request.formData || []).map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 group">
                <input
                  placeholder="Key"
                  className="flex-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 text-sm"
                  value={item.key}
                  onChange={(e) => updateFormDataItem(index, 'key', e.target.value)}
                />
                <div className="flex-1 flex gap-2">
                  <select
                    className="w-24 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 text-sm"
                    value={item.type}
                    onChange={(e) => updateFormDataItem(index, 'type', e.target.value)}
                  >
                    <option value="text">Text</option>
                    <option value="file">File</option>
                  </select>
                  {item.type === 'text' ? (
                    <input
                      placeholder="Value"
                      className="flex-1 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 text-sm"
                      value={item.value}
                      onChange={(e) => updateFormDataItem(index, 'value', e.target.value)}
                    />
                  ) : (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="file"
                        className="hidden"
                        id={`file-${index}`}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          updateFormDataItem(index, 'file', file);
                        }}
                      />
                      <label
                        htmlFor={`file-${index}`}
                        className="flex-1 flex items-center gap-2 cursor-pointer bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1 text-sm"
                      >
                        <Upload size={16} />
                        {item.file ? item.file.name : 'Choose file'}
                      </label>
                    </div>
                  )}
                  <button
                    className="text-light-text dark:text-dark-text hover:text-red-400 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFormDataItem(index)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            <button
              className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400 mt-2"
              onClick={addFormDataItem}
            >
              <Plus size={16} />
              Add Field
            </button>
          </div>
        )}

        {request.contentType === 'application/x-www-form-urlencoded' && (
          <div className="space-y-2">
            <textarea
              className="w-full h-32 sm:h-48 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-3 py-2 font-mono text-xs sm:text-sm text-light-text dark:text-dark-text"
              placeholder="key1=value1&key2=value2"
              value={request.body}
              onChange={(e) => onRequestChange({ ...request, body: e.target.value })}
            />
          </div>
        )}

        {request.contentType === 'text/plain' && (
          <textarea
            className="w-full h-32 sm:h-48 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-3 py-2 font-mono text-xs sm:text-sm text-light-text dark:text-dark-text"
            placeholder="Plain text body"
            value={request.body}
            onChange={(e) => onRequestChange({ ...request, body: e.target.value })}
          />
        )}

        {request.contentType === 'application/xml' && (
          <textarea
            className="w-full h-32 sm:h-48 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-3 py-2 font-mono text-xs sm:text-sm text-light-text dark:text-dark-text"
            placeholder="<?xml version='1.0' encoding='UTF-8'?>"
            value={request.body}
            onChange={(e) => onRequestChange({ ...request, body: e.target.value })}
          />
        )}
      </div>
    </div>
  );
} 