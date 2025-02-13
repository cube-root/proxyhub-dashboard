"use client";

import { useState, useEffect } from "react";
import { RequestData, ResponseData, TabData, Theme } from "./types";
import { generateId, buildUrl } from "./utils";
import { RequestUrl } from "./components/RequestUrl";
import { QueryParams } from "./components/QueryParams";
import { RequestBody } from "./components/RequestBody";
import { Response } from "./components/Response";
import { Tabs } from "./components/Tabs";
import { History } from "./components/History";
import { Headers } from "./components/Headers";

const createNewTab = (): TabData => ({
  id: generateId(),
  name: "New Request",
  request: {
    id: generateId(),
    name: "New Request",
    method: "GET",
    url: "",
    queryParams: [],
    headers: [
      { key: "Content-Type", value: "application/json", enabled: true },
      { key: "Accept", value: "application/json", enabled: true },
      { key: "Authorization", value: "", enabled: true },
      { key: "Access-Control-Allow-Origin", value: "*", enabled: true },
      {
        key: "Access-Control-Allow-Methods",
        value: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        enabled: true,
      },
      {
        key: "Access-Control-Allow-Headers",
        value: "Content-Type, Authorization",
        enabled: true,
      },
    ],
    body: "",
    contentType: "application/json",
  },
  response: null,
});

export default function ApiTester() {
  const [tabs, setTabs] = useState<TabData[]>([createNewTab()]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<
    Array<TabData & { timestamp: number }>
  >([]);
  const [theme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  });

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  useEffect(() => {
    // Initialize theme
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    // Load history from localStorage on component mount
    const savedHistory = localStorage.getItem("request_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (activeTab.request.queryParams.length === 0) {
      setTabs((prevTabs) =>
        prevTabs.map((tab) =>
          tab.id === activeTabId
            ? {
                ...tab,
                request: {
                  ...tab.request,
                  queryParams: [{ key: "", value: "" }],
                },
              }
            : tab
        )
      );
    }
  }, [activeTab.request.queryParams.length, activeTabId]);

  const handleRequestChange = (request: RequestData) => {
    setTabs(
      tabs.map((tab) => (tab.id === activeTabId ? { ...tab, request } : tab))
    );
  };

  const addToHistory = (item: TabData) => {
    const historyItem = { ...item, timestamp: Date.now() };
    const updatedHistory = [historyItem, ...history].slice(0, 50); // Keep last 50 items
    setHistory(updatedHistory);
    localStorage.setItem("request_history", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("request_history");
  };

  const removeHistoryItem = (timestamp: number) => {
    const updatedHistory = history.filter(
      (item) => item.timestamp !== timestamp
    );
    setHistory(updatedHistory);
    localStorage.setItem("request_history", JSON.stringify(updatedHistory));
  };

  const handleSend = async () => {
    const startTime = performance.now();
    try {
      setLoading(true);
      const headers: Record<string, string> = {};

      // Add all enabled headers
      activeTab.request.headers.forEach((h) => {
        if (h.key && h.value && h.enabled) headers[h.key] = h.value;
      });

      const url = buildUrl(
        activeTab.request.url,
        activeTab.request.queryParams
      );
      const options: RequestInit = {
        method: activeTab.request.method,
        headers,
        // mode: 'cors',
      };

      if (activeTab.request.method !== "GET") {
        if (activeTab.request.contentType === "multipart/form-data") {
          const formData = new FormData();
          activeTab.request.formData?.forEach((item) => {
            if (item.type === "file" && item.file) {
              formData.append(item.key, item.file);
            } else {
              formData.append(item.key, item.value);
            }
          });
          delete headers["Content-Type"]; // Let the browser set the correct boundary
          options.body = formData;
        } else if (activeTab.request.body) {
          options.body = activeTab.request.body;
        }
      }

      const res = await fetch(url, options);
      let data;
      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      const executionTime = Math.round(performance.now() - startTime);

      const response: ResponseData = {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers),
        data,
        executionTime,
      };

      const updatedTab = {
        ...activeTab,
        response,
      };

      setTabs(tabs.map((tab) => (tab.id === activeTabId ? updatedTab : tab)));

      // Add to history after successful request
      addToHistory(updatedTab);
    } catch (error) {
      const executionTime = Math.round(performance.now() - startTime);
      const updatedTab = {
        ...activeTab,
        response: {
          error: error instanceof Error ? error.message : "An error occurred",
          executionTime,
          data: {}, // Add empty data object to satisfy the type
          status: 0, // Add status 0 to indicate error
          statusText: "Error",
        },
      };
      setTabs(tabs.map((tab) => (tab.id === activeTabId ? updatedTab : tab)));
      // Add failed requests to history too
      addToHistory(updatedTab);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFromHistory = (historyItem: TabData) => {
    // Update the current tab with the historical request and response
    setTabs(
      tabs.map((tab) =>
        tab.id === activeTabId
          ? {
              ...tab,
              request: { ...historyItem.request, id: tab.request.id },
              response: historyItem.response,
            }
          : tab
      )
    );
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <div className="container mx-auto p-2 sm:p-4 max-w-[1600px]">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Tabs */}
          <Tabs
            tabs={tabs}
            activeTabId={activeTabId}
            onTabChange={setActiveTabId}
            onTabAdd={() => {
              const newTab = createNewTab();
              setTabs([...tabs, newTab]);
              setActiveTabId(newTab.id);
            }}
            onTabRemove={(tabId) => {
              const newTabs = tabs.filter((tab) => tab.id !== tabId);
              setTabs(newTabs);
              if (tabId === activeTabId) {
                setActiveTabId(newTabs[0].id);
              }
            }}
            onTabRename={(tabId, name) => {
              setTabs(
                tabs.map((tab) => (tab.id === tabId ? { ...tab, name } : tab))
              );
            }}
          />

          {/* Request URL */}
          <RequestUrl
            request={activeTab.request}
            loading={loading}
            onRequestChange={handleRequestChange}
            onSend={handleSend}
          />

          {/* Main Content */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr,auto] gap-4">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
              {/* Request Panel */}
              <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-3 sm:p-4 border border-light-border dark:border-dark-border">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">Request</h2>

                <QueryParams
                  request={activeTab.request}
                  onRequestChange={handleRequestChange}
                />

                <Headers
                  request={activeTab.request}
                  onRequestChange={handleRequestChange}
                />

                <RequestBody
                  request={activeTab.request}
                  onRequestChange={handleRequestChange}
                />
              </div>

              {/* Response Panel */}
              <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-3 sm:p-4 border border-light-border dark:border-dark-border">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">Response</h2>
                <Response
                  response={activeTab.response}
                  request={activeTab.request}
                />
              </div>
            </div>

            {/* History Panel */}
            <div className="w-full lg:w-80 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
              <History
                history={history}
                onSelect={handleSelectFromHistory}
                onClear={clearHistory}
                onRemove={removeHistoryItem}
              />
            </div>
          </div>
        </div>

        <style jsx>{`
          .btn-primary {
            @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors;
          }
          .btn-secondary {
            @apply bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-4 py-2 rounded flex items-center gap-2 transition-colors hover:bg-light-border dark:hover:bg-dark-border;
          }
        `}</style>
      </div>
    </div>
  );
}
