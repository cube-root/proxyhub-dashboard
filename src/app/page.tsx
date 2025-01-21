import { ThemeToggle } from "@/components/ThemeToggle";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <ThemeToggle />
      <main className="flex flex-col gap-8 row-start-2 items-center text-center max-w-4xl">
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 light:from-purple-600 light:via-blue-500 light:to-purple-600 bg-clip-text text-transparent animate-gradient-x pb-4 flex items-center justify-center gap-4">
            <svg 
              className="w-12 h-12 sm:w-16 sm:h-16" 
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
            ProxyHub
          </h1>
          <p className="text-xl sm:text-3xl text-gray-600 dark:text-gray-300 mt-4">
            Your Ultimate API Testing & Tunneling Companion
          </p>
          <div className="flex gap-2 justify-center mt-4">
            <span className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full">Open Source</span>
            <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full">Free Forever</span>
          </div>
        </div>

        <div className="w-full transform hover:scale-[1.02] transition-all duration-300">
          <a 
            href="/api"
            className="group flex items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 hover:from-purple-500/20 hover:via-blue-500/20 hover:to-purple-500/20 dark:from-purple-500/20 dark:via-blue-500/20 dark:to-purple-500/20 dark:hover:from-purple-500/30 dark:hover:via-blue-500/30 dark:hover:to-purple-500/30 rounded-2xl border border-purple-200/50 dark:border-purple-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white dark:bg-gray-800 rounded-xl">
                <span className="text-2xl">🔧</span>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Launch API Testing Tool
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Test, debug, and analyze your APIs in real-time
                </p>
              </div>
            </div>
            <svg 
              className="w-6 h-6 text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transform group-hover:translate-x-1 transition-all" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="space-y-8 mt-12 w-full">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col gap-4 p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                🚀 Intercept. Test. Proxy. Repeat.
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Debug your APIs like a pro with our open-source tunneling solution. 
                No more "works on my machine" drama! Experience seamless API testing 
                with real-time request interception.
              </p>
            </div>
          </div>

          <div className="transform hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col gap-4 p-8 rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                💰 Pricing (Hold onto Your Wallet!)
              </h2>
              <div className="text-left space-y-4">
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400">$0.00</p>
                  <p className="text-xl text-gray-500 dark:text-gray-400">Forever*</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">* No, this is not a typo. We're serious!</p>
                <ul className="list-none space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Because who doesn't love free stuff?</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>No credit card required (we won't even ask!)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>No hidden fees (we promise, pinky swear!)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>No "premium" features held hostage</span>
                  </li>
                </ul>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                  <p className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">🎁 Want to Support Us?</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    While we're committed to keeping ProxyHub free, we won't stop you from buying us a coffee! 
                    (We've been told it's weird to refuse money 😅)
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                    **Plot twist: Cloud providers don't accept high-fives as payment (we tried) 🤦‍♂️
                  </p>
                  <div className="mt-3 space-y-2">
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                      <span className="text-yellow-500">⭐</span>
                      Star us on GitHub (it's free and makes us happy!)
                    </p>
                    <a 
                      href="https://buymeacoffee.com/abhisawzm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                    >
                      <span className="text-green-500">☕</span>
                      Buy us a coffee (if you really insist!)
                    </a>
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                      <span className="text-red-500">❤️</span>
                      Tell your friends (we love good gossip!)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-center flex-col sm:flex-row mt-12">
          <a
            className="rounded-full border-2 border-solid border-transparent transition-all flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white gap-2 text-base sm:text-lg h-14 px-8 shadow-lg hover:shadow-xl"
            href="https://github.com/cube-root/proxyhub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Star on GitHub
          </a>
          <a
            className="rounded-full border-2 border-solid border-purple-500 dark:border-purple-400 transition-all flex items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-base sm:text-lg h-14 px-8"
            href="https://github.com/cube-root/proxyhub#readme"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Documentation
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        <p className="flex items-center gap-2">
          Built with <span className="text-red-500 animate-pulse">❤️</span> for developers
        </p>
        <a
          className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
          href="https://github.com/cube-root/proxyhub"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <span className="text-gray-400 dark:text-gray-500">•</span>
        <a
          className="hover:text-purple-500 dark:hover:text-purple-400 transition-colors text-sm"
          href="https://github.com/abhisawesome"
          target="_blank"
          rel="noopener noreferrer"
        >
          @abhisawesome
        </a>
      </footer>
    </div>
  );
}
