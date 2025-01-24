import { Metadata } from "next";
import ApiTester from "@/components/api-tester/ApiTester";
import Link from "next/link";
import Image from "next/image";  // Add this import

export const metadata: Metadata = {
  title: "ProxyHub",
  description: "A beautiful and powerful API testing tool",
};

export default function TestingTool() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="p-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/proxyhub_light.png"
            alt="ProxyHub"
            width={32}
            height={32}
            priority
            className="w-auto h-6 sm:h-8 hidden dark:block"
          />

          <Image
            src="/proxyhub_dark.png"
            alt="ProxyHub"
            width={32}
            height={32}
            priority
            className="w-auto h-6 sm:h-8 block dark:hidden"
          />
        </Link>
      </div>
      <ApiTester />
    </div>
  );
}
