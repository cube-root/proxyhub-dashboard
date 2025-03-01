"use client";

import { useState } from "react";
import { RequestDetailsModal } from "./RequestDetailsModal";

interface Request {
  requestId: string;
  method: string;
  path: string;
  queryParams?: Record<string, unknown>;
  requestHeader?: Record<string, string>;
  body?: any;
  fullUrl: string;
}

interface Response {
  responseHeader: Record<string, string>;
  statusCode: number;
  response: any;
}

interface Data {
  id: string;
  requestId: string;
  createdAt: string;
  updatedAt: string;
  request: Request;
  response: Response;
}

interface RequestTableProps {
  requests: Data[];
}

function calculateLatency(createdAt: string, updatedAt: string): number {
  const start = new Date(createdAt).getTime();
  const end = new Date(updatedAt).getTime();
  return end - start;
}

function formatLatency(latency: number): string {
  if (latency < 1000) {
    return `${latency}ms`;
  }
  return `${(latency / 1000).toFixed(2)}s`;
}

export function RequestTable({ requests }: RequestTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<Data | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestClick = (request: Data) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Request History
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Showing {requests.length} requests
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Method
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Path
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Latency
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {requests.map((request, index) => {
                  const latency = calculateLatency(
                    request.createdAt,
                    request.updatedAt
                  );
                  return (
                    <tr
                      key={request.id}
                      className="group transition-all duration-200 hover:bg-blue-50/10 dark:hover:bg-blue-900/20 animate-fadeIn cursor-pointer relative hover:shadow-md"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => handleRequestClick(request)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap transition-colors">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150
                          ${
                            request.request.method === "GET"
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 ring-1 ring-blue-500/30"
                              : request.request.method === "POST"
                              ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-500/30"
                              : request.request.method === "PUT"
                              ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-500/30"
                              : request.request.method === "DELETE"
                              ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-500/30"
                              : "bg-gray-50 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400 ring-1 ring-gray-500/30"
                          }`}
                        >
                          {request.request.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-md transition-colors">
                        <div className="text-sm text-gray-900 dark:text-gray-100 truncate">
                          {request.request.path}
                        </div>
                        {request.request.queryParams &&
                          typeof request.request.queryParams === "object" &&
                          Object.keys(request.request.queryParams).length > 0 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {Object.entries(request.request.queryParams).map(
                                ([key, value]) => (
                                  <span
                                    key={key}
                                    className="inline-flex items-center mr-2 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700"
                                  >
                                    {key}={String(value)}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap transition-colors">
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2
                            ${
                              request.response.statusCode >= 200 &&
                              request.response.statusCode < 300
                                ? "bg-green-400"
                                : request.response.statusCode >= 400
                                ? "bg-red-400"
                                : "bg-yellow-400"
                            }`}
                          />
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium
                            ${
                              request.response.statusCode >= 200 &&
                              request.response.statusCode < 300
                                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : request.response.statusCode >= 400
                                ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {request.response.statusCode}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap transition-colors">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {new Date(request.createdAt).toLocaleTimeString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap transition-colors">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium
                          ${
                            latency < 300
                              ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : latency < 1000
                              ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {formatLatency(latency)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedRequest && (
        <RequestDetailsModal
          request={{
            id: selectedRequest.id,
            method: selectedRequest.request.method,
            path: selectedRequest.request.path,
            statusCode: selectedRequest.response.statusCode,
            createdAt: selectedRequest.createdAt,
            updatedAt: selectedRequest.updatedAt,
            queryParams: selectedRequest.request.queryParams,
            requestHeader: selectedRequest.request.requestHeader,
            responseHeader: selectedRequest.response.responseHeader,
            body: selectedRequest.request.body,
            response: selectedRequest.response.response,
            fullUrl: selectedRequest.request.fullUrl
          }}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setTimeout(() => setSelectedRequest(null), 300);
          }}
        />
      )}
    </>
  );
}
