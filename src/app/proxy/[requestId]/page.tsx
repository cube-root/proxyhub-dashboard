"use client";

import Header from "@/components/Header";
import { useFirebase } from "@/hooks/firebase";
import { use } from "react";
import { LoadingSpinner } from "@/components/proxy/LoadingSpinner";
import { ErrorDisplay } from "@/components/proxy/ErrorDisplay";
import { EmptyState } from "@/components/proxy/EmptyState";
import { RequestTable } from "@/components/proxy/RequestTable";
import { useState, useEffect } from "react";

interface Props {
  params: Promise<{
    requestId: string;
  }>;
}

function Proxy({ params }: Props) {
  const { requestId } = use(params);
  const { isLoading, error, data } = useFirebase(requestId);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  // only console the newley added data
  useEffect(() => {
    if (data) {
      const lastItem = data[0]; // Since data is ordered by createdAt desc, first item is newest
      console.log("New request received:", lastItem);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!data || data?.length === 0) {
    return <EmptyState />;
  }

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    // TODO: Show request details in a modal
    console.log("Request details:", request);
  };

  return <RequestTable requests={data} />;
}

export default function ProxyWrapper({ params }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white sm:p-6 md:p-8">
      <div className="p-4">
        <Header />
      </div>
      <Proxy params={params} />
    </div>
  );
}
