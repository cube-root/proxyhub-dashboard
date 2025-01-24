import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { RequestTable } from '@/components/request-log/RequestTable';
import { ThemeToggle } from '@/components/ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';
import { ViewButton } from '@/components/request-log/ViewButton';

interface Props {
  params: Promise<{
    requestId: string;
  }>;
}

function convertTimestampToISO(timestamp: { seconds: number; nanoseconds: number }) {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000).toISOString();
}

export default async function ProxyRequestPage({ params }: Props) {
  const { requestId } = await params;
  
  try {
    const collectionRef = collection(db, requestId);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const requests = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestampToISO(data.createdAt),
        updatedAt: convertTimestampToISO(data.updatedAt)
      };
    }) as any[];

    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/proxyhub_light.png"
                  alt="ProxyHub"
                  width={32}
                  height={32}
                  className="h-6 w-auto dark:hidden sm:h-8"
                  priority
                />
                <Image
                  src="/proxyhub_dark.png"
                  alt="ProxyHub"
                  width={32}
                  height={32}
                  className="h-6 w-auto hidden dark:block sm:h-8"
                  priority
                />
              </Link>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link
                  href="/api"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
                >
                  API Tester
                </Link>
                <Link
                  href="https://github.com/cube-root/proxyhub"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
                >
                  GitHub
                </Link>
              </nav>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto py-8 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Request Logs
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Proxy ID: <code className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 font-mono text-sm">{requestId}</code>
              </p>
            </div>
          </div>
          
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <RequestTable requestId={requestId} initialRequests={requests} />
          </div>
        </main>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-gray-950">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/proxyhub_light.png"
                  alt="ProxyHub"
                  width={32}
                  height={32}
                  className="h-6 w-auto dark:block hidden sm:h-8"
                  priority
                />
                <Image
                  src="/proxyhub_dark.png"
                  alt="ProxyHub"
                  width={32}
                  height={32}
                  className="h-6 w-auto dark:hidden block sm:h-8"
                  priority
                />
              </Link>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link
                  href="/api"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  API Tester
                </Link>
                <Link
                  href="https://github.com/cube-root/proxyhub"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  GitHub
                </Link>
              </nav>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto py-6">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-destructive to-destructive/60 bg-clip-text text-transparent mb-6">Error</h1>
          <div className="rounded-xl border bg-destructive/10 p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-destructive/20">
                <svg className="w-6 h-6 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-destructive mb-2">Failed to fetch request logs</h2>
                <p className="text-sm text-destructive/90">Error Details: {(error as Error).message}</p>
                <p className="text-sm text-destructive/90 mt-1">Collection Path: {requestId}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}