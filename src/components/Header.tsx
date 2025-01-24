import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/80 px-4 py-3 backdrop-blur-sm dark:bg-gray-900/80 sm:px-6 md:px-8">
      <Link href="/" className="hover:opacity-80 transition-opacity">
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
          className="h-6 w-auto dark:hidden dark:block sm:h-8"
          priority
        />
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default Header;
