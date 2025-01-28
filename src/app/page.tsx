"use client";
import { GoogleAnalytics } from "@next/third-parties/google";
import Image from "next/image"; // Add this import
import Header from "@/components/Header";
export default function Home() {
  return (
    <>
      <GoogleAnalytics
        gaId={process?.env?.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}
      />
      <div className="relative flex min-h-screen flex-col bg-white p-4 dark:bg-gray-900 text-gray-900 dark:text-white sm:p-6 md:p-8">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 pt-10 pb-16 md:gap-8 md:pt-12">
          {/* Hero Section */}
          <section className="text-center">
            <div className="animate-fade-in space-y-4">
              <h1 className="flex items-center justify-center gap-4 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text pb-2 text-4xl font-bold text-transparent animate-gradient-x dark:from-orange-400 dark:via-amber-400 dark:to-orange-400 sm:text-6xl md:text-7xl">
                <svg
                  className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16"
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
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 sm:text-xl md:text-2xl">
                Your Ultimate API Testing & Tunneling Companion
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
                  Open Source
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                  Free Forever
                </span>
              </div>
            </div>
          </section>

          {/* API Testing Tool Link */}
          <section className="w-full">
            <a
              href="/api"
              className="group flex items-center justify-between gap-4 rounded-xl border border-orange-200/50 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 p-4 shadow-lg transition-all hover:scale-[1.01] hover:border-orange-300 hover:from-orange-500/20 hover:via-amber-500/20 hover:to-orange-500/20 hover:shadow-xl dark:border-orange-700/50 dark:from-orange-500/20 dark:via-amber-500/20 dark:to-orange-500/20 dark:hover:border-orange-600 dark:hover:from-orange-500/30 dark:hover:via-amber-500/30 dark:hover:to-orange-500/30 sm:p-6"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-white p-2 dark:bg-gray-800">
                  <span className="text-2xl">🔧</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800 transition-colors group-hover:text-orange-600 dark:text-gray-200 dark:group-hover:text-orange-400 sm:text-xl">
                    Launch API Testing Tool
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                    Test, debug, and analyze your APIs in real-time
                  </p>
                </div>
              </div>
              <svg
                className="h-6 w-6 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-orange-500 dark:group-hover:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </section>

          {/* Feature Cards */}
          <section className="grid gap-6 md:gap-8">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-transform hover:scale-[1.02] dark:border-gray-700 dark:bg-gray-800/50 sm:p-8">
              <h2 className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-2xl font-bold text-transparent dark:from-orange-400 dark:to-amber-400 sm:text-3xl">
                🚀 Intercept. Test. Proxy. Repeat.
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Debug your APIs like a pro with our open-source tunneling
                solution. No more &ldquo;works on my machine&rdquo; drama!
                Experience seamless API testing with real-time request
                interception.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-transform hover:scale-[1.02] dark:border-gray-700 dark:bg-gray-800/50 sm:p-8">
              <h2 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent dark:from-green-400 dark:to-emerald-400 sm:text-3xl">
                💰 Pricing (Hold onto Your Wallet!)
              </h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 sm:text-4xl">
                    $0.00
                  </p>
                  <p className="text-lg text-gray-500 dark:text-gray-400 sm:text-xl">
                    Forever*
                  </p>
                </div>
                <p className="text-sm italic text-gray-500 dark:text-gray-400">
                  * No, this is not a typo. We&apos;re serious!
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">
                      ✓
                    </span>
                    <span>Because who doesn&apos;t love free stuff?</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">
                      ✓
                    </span>
                    <span>
                      No credit card required (we won&apos;t even ask!)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">
                      ✓
                    </span>
                    <span>No hidden fees (we promise, pinky swear!)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">
                      ✓
                    </span>
                    <span>No &ldquo;premium&rdquo; features held hostage</span>
                  </li>
                </ul>

                <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                  <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                    🎁 Want to Support Us?
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    While we&apos;re committed to keeping ProxyHub free, we
                    won&apos;t stop you from buying us a coffee! (We&apos;ve
                    been told it&apos;s weird to refuse money 😅)
                  </p>
                  <p className="mt-1 text-sm italic text-gray-500 dark:text-gray-400">
                    **Plot twist: Cloud providers don&apos;t accept high-fives
                    as payment (we tried) 🤦‍♂️
                  </p>
                  <div className="mt-3 space-y-2">
                    <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-yellow-500">⭐</span>
                      Star us on GitHub (it&apos;s free and makes us happy!)
                    </p>
                    <a
                      href="https://buymeacoffee.com/abhisawzm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400"
                    >
                      <span className="text-green-500">☕</span>
                      Buy us a coffee (if you really insist!)
                    </a>
                    <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-red-500">❤️</span>
                      Tell your friends (we love good gossip!)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Buttons */}
          <section className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              className="flex h-12 w-[200px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 text-white shadow-lg transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-xl"
              href="https://github.com/cube-root/proxyhub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Star on GitHub
            </a>
            {/* <a
              className="flex h-12 w-[200px] items-center justify-center rounded-full border-2 border-orange-500 px-6 text-orange-600 transition-all hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-900/20"
              href="https://github.com/cube-root/proxyhub#readme"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Documentation
            </a> */}
            <a
              className="flex h-12 w-[200px] items-center justify-center rounded-full overflow-hidden"
              href="https://www.buymeacoffee.com/abhisawzm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png"
                alt="Buy Me A Coffee"
                width={200}
                height={48}
                className="h-12 w-[200px] object-cover"
              />
            </a>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-gray-200 py-4 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="flex items-center gap-2">
              Built with <span className="animate-pulse text-red-500">❤️</span>{" "}
              for developers
            </p>
            <a
              className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
              href="https://github.com/cube-root/proxyhub"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <a
              className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
              href="https://github.com/abhisawesome"
              target="_blank"
              rel="noopener noreferrer"
            >
              @abhisawesome
            </a>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <a
              className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
              href="/privacy"
            >
              Privacy Policy
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
