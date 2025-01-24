"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold">
          🏆 Achievement Unlocked: Page Not Found! 🏆
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Wow! You&apos;ve managed to find a page so exclusive, it doesn&apos;t even exist! 
          Your reward? The satisfaction of seeing this absolutely useless message. 
          We&apos;re so proud. 👏
        </p>

        <div className="space-y-4 text-gray-500 dark:text-gray-400">
          <p>
            Perhaps the URL got lost in the digital abyss, or maybe it&apos;s taking 
            an unscheduled vacation. We hear the 404 realm is lovely this time of year! 
            Excellent choice for getting lost. 🌴
          </p>
          <p>
            Fun fact: This page is like quantum physics - it simultaneously exists 
            and doesn&apos;t exist. Schrödinger would be proud! 🐱
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium transition-transform hover:scale-105"
          >
            Return to Reality
          </Link>
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-500 italic">
          Meanwhile, our AI is calculating the probability of this page existing 
          in parallel universes. Current status: Error 404 in all dimensions. 🤖
        </p>
      </div>
    </div>
  );
}