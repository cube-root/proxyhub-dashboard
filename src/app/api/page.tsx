import { Metadata } from "next";
import ApiTester from "@/components/api-tester/ApiTester";
import Link from "next/link";
import Image from "next/image"; // Add this import
import Header from "@/components/Header";
export const metadata: Metadata = {
  title: "ProxyHub",
  description: "A beautiful and powerful API testing tool",
};

export default function TestingTool() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="p-4">
        <Header />
      </div>
      <ApiTester />
    </div>
  );
}
