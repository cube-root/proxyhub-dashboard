"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setTimeout(() => setMounted(false), 300);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-t-xl shadow-xl transition-transform duration-300 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Request Details
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Basic Information
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Method
                  </div>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${
                        request.method === "GET"
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          : request.method === "POST"
                          ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : request.method === "PUT"
                          ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : request.method === "DELETE"
                          ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-gray-50 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}
                    >
                      {request.method}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </div>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium
                      ${
                        request.statusCode >= 200 && request.statusCode < 300
                          ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : request.statusCode >= 400
                          ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {request.statusCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Path */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Path
              </h4>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm break-all">
                {request.path}
              </div>
            </div>

            {/* Query Parameters */}
            {request.queryParams &&
              Object.keys(request.queryParams).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Query Parameters
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                    <pre className="text-sm overflow-x-auto">
                      {JSON.stringify(request.queryParams, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

            {/* Headers */}
            {request.requestHeader && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Request Headers
                </h4>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(request.requestHeader, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Response Headers */}
            {request.responseHeader && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Response Headers
                </h4>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(request.responseHeader, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Body */}
            {request.body && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Request Body
                </h4>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                  <pre className="text-sm overflow-x-auto">
                    {typeof request.body === "string"
                      ? request.body
                      : JSON.stringify(request.body, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Response */}
            {request.response && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Response
                </h4>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                  <pre className="text-sm overflow-x-auto">
                    {typeof request.response === "string"
                      ? request.response
                      : JSON.stringify(request.response, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Timing */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Timing
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Created At
                  </div>
                  <div className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {new Date(request.createdAt).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Updated At
                  </div>
                  <div className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {new Date(request.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
