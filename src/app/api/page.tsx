import { Metadata } from "next";
import ApiTester from "@/components/api-tester/ApiTester";

export const metadata: Metadata = {
  title: "ProxyHub",
  description: "A beautiful and powerful API testing tool",
};

export default function TestingTool() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <ApiTester />
    </div>
  );
} 