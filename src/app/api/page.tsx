import { Metadata } from "next";
import ApiTester from "@/components/api-tester/ApiTester";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ProxyHub",
  description: "A beautiful and powerful API testing tool",
};

export const dynamic = 'force-dynamic';

export default function TestingTool() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
          <svg 
            className="w-8 h-8" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
            <line x1="12" y1="13" x2="12" y2="21" />
            <line x1="8" y1="17" x2="16" y2="17" />
          </svg>
          <span className="text-xl font-bold">ProxyHub</span>
        </Link>
      </div>
      <ApiTester />
    </div>
  );
} 