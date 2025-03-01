"use client";

import dynamic from "next/dynamic";
import { use, useEffect } from "react";
import { useFirebase } from "@/hooks/firebase";
import Header from "@/components/Header";
import { LoadingSpinner } from "@/components/proxy/LoadingSpinner";
import { useSearchParams } from 'next/navigation'
 
const ErrorDisplay = dynamic(() => import("@/components/proxy/ErrorDisplay").then(mod => ({ default: mod.ErrorDisplay })), { ssr: false });
const EmptyState = dynamic(() => import("@/components/proxy/EmptyState").then(mod => ({ default: mod.EmptyState })), { ssr: false });
const RequestTable = dynamic(() => import("@/components/proxy/RequestTable").then(mod => ({ default: mod.RequestTable })), { ssr: false });

interface Props {
  params: Promise<{
    requestId: string;
  }>;
}

function Proxy({ params }: Props) {
  const searchParams = useSearchParams()
 
  const key = searchParams.get('key')
  
  if (!key) {
    return <ErrorDisplay error={new Error("Key not found. Please provide a valid key parameter.")} />;
  }

  const { requestId } = use(params);
  const { isLoading, error, data } = useFirebase(requestId, key);

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
