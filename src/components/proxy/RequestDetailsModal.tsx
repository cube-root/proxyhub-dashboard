"use client";

import { useEffect, useState } from "react";

type Tab = "headers" | "body" | "response" | "curl";

interface Request {
  id: string;
  method: string;
  path: string;
  statusCode: number;
  createdAt: string;
  updatedAt: string;
  queryParams?: Record<string, unknown>;
  requestHeader?: Record<string, string>;
  responseHeader?: Record<string, string>;
  body?: any;
  response?: any;
  fullUrl?: string;
}

interface RequestDetailsModalProps {
  request: Request;
  isOpen: boolean;
  onClose: () => void;
}

export function RequestDetailsModal({
  request,
  isOpen,
  onClose,
}: RequestDetailsModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("headers");
  const [curlCommand, setCurlCommand] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [basicInfoExpanded, setBasicInfoExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
      // Generate cURL command
      let command = `curl -X ${request.method} '${request.fullUrl || request.path}'`;
      if (request.requestHeader) {
        Object.entries(request.requestHeader).forEach(([key, value]) => {
          command += `\n  -H '${key}: ${value}'`;
        });
      }
      if (request.body) {
        command += `\n  -d '${typeof request.body === "string" ? request.body : JSON.stringify(request.body)}'`;
      }
      setCurlCommand(command);
    } else {
      document.body.style.overflow = "unset";
      setTimeout(() => setMounted(false), 300);
    }
  }, [isOpen, request]);

  const calculateLatency = () => {
    const start = new Date(request.createdAt).getTime();
    const end = new Date(request.updatedAt).getTime();
    const latency = end - start;
    return latency < 1000 ? `${latency}ms` : `${(latency / 1000).toFixed(2)}s`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className={`relative w-11/12 max-w-4xl h-[90vh] bg-white dark:bg-gray-800 shadow-xl rounded-lg transition-transform duration-300 transform overflow-hidden flex flex-col ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-none bg-white dark:bg-gray-800 z-10">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Request Details
              </h3>
            </div>
          </div>

          <div className={`transition-all duration-300 ease-in-out ${basicInfoExpanded ? 'py-4 bg-gray-50 dark:bg-gray-900' : 'py-2 bg-white dark:bg-gray-800'}`}>
            <div className="px-6 flex items-center justify-between gap-4">
              <div className={`flex items-center gap-4 ${basicInfoExpanded ? 'hidden' : ''}`}>
                <div className="flex items-center gap-2 font-mono text-sm text-gray-600 dark:text-gray-300 truncate max-w-xl">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${request.method === "GET" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : request.method === "POST" ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400" : request.method === "PUT" ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" : request.method === "DELETE" ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-gray-50 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400"}`}>
                    {request.method}
                  </span>
                  <span className="truncate">{request.path}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${request.statusCode >= 200 && request.statusCode < 300 ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : request.statusCode >= 400 ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
                    {request.statusCode}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                    {calculateLatency()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setBasicInfoExpanded(!basicInfoExpanded)}
                className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 text-sm transition-colors ml-auto"
              >
                {basicInfoExpanded ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span>Minimize Info</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Show Info</span>
                  </>
                )}
              </button>
            </div>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${basicInfoExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-6 pt-4 pb-2">
                <div className="grid grid-cols-3 gap-6 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900 transition-all duration-200 hover:shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Method</div>
                    <div>
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium shadow-sm ${request.method === "GET" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 ring-1 ring-blue-500/30" : request.method === "POST" ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-500/30" : request.method === "PUT" ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-500/30" : request.method === "DELETE" ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-500/30" : "bg-gray-50 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400 ring-1 ring-gray-500/30"}`}>
                        {request.method}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900 transition-all duration-200 hover:shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Status</div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${request.statusCode >= 200 && request.statusCode < 300 ? "bg-green-400" : request.statusCode >= 400 ? "bg-red-400" : "bg-yellow-400"}`} />
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium shadow-sm ${request.statusCode >= 200 && request.statusCode < 300 ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-500/30" : request.statusCode >= 400 ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-500/30" : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-500/30"}`}>
                        {request.statusCode}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900 transition-all duration-200 hover:shadow-md">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Latency</div>
                    <div>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium shadow-sm bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 ring-1 ring-purple-500/30">
                        {calculateLatency()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Full URL</div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2 font-mono text-sm break-all border border-gray-200 dark:border-gray-700">
                  {request.fullUrl || request.path}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Path</div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2 font-mono text-sm break-all border border-gray-200 dark:border-gray-700">
                  {request.path}
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-6">
              {["headers", "body", "response", "curl"].map((tab) => (
                <button
                  key={tab}
                  className={`py-3 px-4 border-b-2 transition-colors ${activeTab === tab ? "border-blue-500 text-blue-600 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
                  onClick={() => setActiveTab(tab as Tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-6 space-y-6">
            {activeTab === "headers" && (
              <div className="space-y-6">
                {request.requestHeader && Object.keys(request.requestHeader).length > 0 && (
                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Request Headers
                      </h4>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(request.requestHeader, null, 2))}
                        className="text-blue-500 hover:text-blue-400 text-sm"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                      <pre className="text-sm overflow-x-auto">
                        {JSON.stringify(request.requestHeader, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {request.responseHeader && Object.keys(request.responseHeader).length > 0 && (
                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Response Headers
                      </h4>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(request.responseHeader, null, 2))}
                        className="text-blue-500 hover:text-blue-400 text-sm"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                      <pre className={`text-sm overflow-x-auto transition-all duration-200 ${expanded ? "max-h-none" : "max-h-[200px]"}`}>
                        {JSON.stringify(request.responseHeader, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "body" && (
              <div className="relative">
                {request.body ? (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Request Body
                      </h4>
                      <button
                        onClick={() => copyToClipboard(typeof request.body === "string" ? request.body : JSON.stringify(request.body, null, 2))}
                        className="text-blue-500 hover:text-blue-400 text-sm"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <button
                          onClick={() => setExpanded(!expanded)}
                          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          {expanded ? "Show Less" : "Show More"}
                        </button>
                      </div>
                      <pre className={`text-sm overflow-x-auto transition-all duration-200 ${expanded ? "max-h-none" : "max-h-[200px]"}`}>
                        {typeof request.body === "string" ? request.body : JSON.stringify(request.body, null, 2)}
                      </pre>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    No request body
                  </div>
                )}
              </div>
            )}

            {activeTab === "response" && (
              <div className="relative">
                {request.response ? (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Response Data
                      </h4>
                      <button
                        onClick={() => copyToClipboard(typeof request.response === "string" ? request.response : JSON.stringify(request.response, null, 2))}
                        className="text-blue-500 hover:text-blue-400 text-sm"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <button
                          onClick={() => setExpanded(!expanded)}
                          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          {expanded ? "Show Less" : "Show More"}
                        </button>
                      </div>
                      <pre className={`text-sm overflow-x-auto transition-all duration-200 ${expanded ? "max-h-none" : "max-h-[200px]"}`}>
                        {typeof request.response === "string" ? request.response : JSON.stringify(request.response, null, 2)}
                      </pre>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    No response data
                  </div>
                )}
              </div>
            )}

            {activeTab === "curl" && (
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    cURL Command
                  </h4>
                  <button
                    onClick={() => copyToClipboard(curlCommand)}
                    className="text-blue-500 hover:text-blue-400 text-sm"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <textarea
                  value={curlCommand}
                  onChange={(e) => setCurlCommand(e.target.value)}
                  className="w-full h-48 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
