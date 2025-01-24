'use client';
import { useState } from 'react';
import { Copy, ChevronDown, ChevronRight, AlertCircle, Clock, Hash } from 'lucide-react';

interface RequestLog {
  id: string;
  method: string;
  path: string;
  statusCode: number;
  requestHeader: Record<string, string>;
  responseHeader: Record<string, string>;
  queryParams: Record<string, string>;
  body: any;
  response: string;
  createdAt: string;
  updatedAt: string;
  requestId: string;
}

interface RequestLogViewerProps {
  log: RequestLog;
}

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleString();
}

function safeJsonParse(str: string) {
  try {
    return { data: JSON.parse(str), error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
}

function JsonViewer({ data, title, error }: { data: any; title: string; error?: string | null }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (error) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            {title}
          </h3>
        </div>
        <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-xs flex items-start gap-2">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Failed to parse JSON</p>
            <p className="mt-1 text-destructive/90">{error}</p>
            <pre className="mt-2 p-2 bg-muted/50 rounded border border-destructive/20 whitespace-pre-wrap">
              {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  const isEmpty = typeof data === 'object' && data !== null && Object.keys(data).length === 0;

  if (isEmpty) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-medium text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors"
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          {title}
        </button>
        <button
          onClick={copyToClipboard}
          className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Copy size={12} />
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {isExpanded && (
        <pre className="bg-muted/50 p-3 rounded-lg text-xs overflow-auto max-h-60 border">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export function RequestLogViewer({ log }: RequestLogViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: parsedResponse, error: parseError } = log.response ? safeJsonParse(log.response) : { data: null, error: null };

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span className={`font-mono px-2 py-1 rounded text-xs font-medium 
              ${log.method === 'GET' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                log.method === 'POST' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                log.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                log.method === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'}`}
            >
              {log.method}
            </span>
            <span className="font-medium text-sm truncate max-w-[300px]">{log.path}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium
            ${log.statusCode >= 200 && log.statusCode < 300 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
              log.statusCode >= 300 && log.statusCode < 400 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
              log.statusCode >= 400 && log.statusCode < 500 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'}`}
          >
            {log.statusCode}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Hash size={12} />
            <span>{log.id}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{formatTime(log.createdAt)}</span>
          </div>
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t">
          <div className="grid grid-cols-2 divide-x">
            {/* Request Details */}
            <div className="p-4 space-y-4">
              <h3 className="text-sm font-medium mb-4">Request Details</h3>
              <JsonViewer data={log.requestHeader} title="Headers" />
              <JsonViewer data={log.queryParams} title="Query Parameters" />
              <JsonViewer data={log.body} title="Body" />
            </div>

            {/* Response Details */}
            <div className="p-4 space-y-4">
              <h3 className="text-sm font-medium mb-4">Response Details</h3>
              <JsonViewer data={log.responseHeader} title="Headers" />
              <JsonViewer 
                data={parsedResponse || log.response} 
                title="Body" 
                error={parseError}
              />
            </div>
          </div>

          <div className="px-4 py-3 bg-muted/30 border-t text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>Created: {formatTime(log.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>Updated: {formatTime(log.updatedAt)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 