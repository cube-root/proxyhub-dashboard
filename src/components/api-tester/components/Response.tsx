'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ResponseData } from '../types';

interface ResponseProps {
  response: ResponseData | null;
  request: any; // Add request prop for generating curl command
}

export function Response({ response, request }: ResponseProps) {
  const [format, setFormat] = useState<'json' | 'raw'>('json');
  const [copied, setCopied] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const generateCurlCommand = () => {
    if (!request.url) return '';
    
    let command = `curl -X ${request.method} '${request.url}'`;
    
    // Add headers
    request.headers.forEach((header: any) => {
      if (header.key && header.value) {
        command += `\n  -H '${header.key}: ${header.value}'`;
      }
    });

    // Add body
    if (request.method !== 'GET' && request.body) {
      if (request.contentType === 'multipart/form-data' && request.formData) {
        request.formData.forEach((item: any) => {
          if (item.type === 'file' && item.file) {
            command += `\n  -F '${item.key}=@${item.file.name}'`;
          } else {
            command += `\n  -F '${item.key}=${item.value}'`;
          }
        });
      } else {
        command += `\n  -d '${request.body}'`;
      }
    }

    return command;
  };

  const copyToClipboard = async (text: string, isCurl = false) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isCurl) {
        setCopiedCurl(true);
        setTimeout(() => setCopiedCurl(false), 2000);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatResponseData = (data: any, format: 'json' | 'raw') => {
    if (data === null || data === undefined) {
      return '';
    }

    if (typeof data === 'string') {
      try {
        // If it's a JSON string and format is json, parse and stringify it
        if (format === 'json') {
          const parsed = JSON.parse(data);
          return JSON.stringify(parsed, null, 2);
        }
      } catch {
        // If parsing fails, return as is
        return data;
      }
      return data;
    }

    // If it's already an object
    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    }
    // For raw format, convert object to string
    return JSON.stringify(data);
  };

  if (!response) {
    return (
      <div className="text-light-text/60 dark:text-dark-text/60 text-sm p-4">
        Send a request to see the response
      </div>
    );
  }

  const curlCommand = generateCurlCommand();
  const formattedData = formatResponseData(response.data, format);

  return (
    <div className="p-2 space-y-4">
      {/* Status and Copy cURL */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {response.status && (
            <span className={`px-2 py-1 rounded text-sm ${
              response.status >= 200 && response.status < 300 
                ? 'bg-green-500/20 text-green-500'
                : 'bg-red-500/20 text-red-500'
            }`}>
              {response.status} {response.statusText}
            </span>
          )}
          {response.executionTime && (
            <span className="text-xs text-light-text/60 dark:text-dark-text/60">
              {response.executionTime}ms
            </span>
          )}
        </div>
        <button
          className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded px-2 py-1"
          onClick={() => copyToClipboard(curlCommand, true)}
        >
          {copiedCurl ? <Check size={16} /> : <Copy size={16} />}
          <span>Copy as cURL</span>
        </button>
      </div>

      {/* Headers */}
      {response.headers && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Response Headers</h3>
          <pre className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded p-2 sm:p-4 overflow-auto text-xs sm:text-sm text-light-text dark:text-dark-text whitespace-pre-wrap sm:whitespace-pre max-h-[150px] sm:max-h-[200px]">
            {JSON.stringify(response.headers, null, 2)}
          </pre>
        </div>
      )}

      {/* Response Body */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Response Body</h3>
          <div className="flex items-center gap-2">
            <select
              className="text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded px-2 py-1"
              value={format}
              onChange={(e) => setFormat(e.target.value as 'json' | 'raw')}
            >
              <option value="json">JSON</option>
              <option value="raw">Raw</option>
            </select>
            <button
              className="flex items-center gap-1 text-sm hover:text-blue-400"
              onClick={() => copyToClipboard(formattedData)}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
        <pre className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded p-2 sm:p-4 overflow-auto text-xs sm:text-sm text-light-text dark:text-dark-text whitespace-pre-wrap sm:whitespace-pre max-h-[200px] sm:max-h-[300px]">
          {formattedData}
        </pre>
      </div>
    </div>
  );
} 