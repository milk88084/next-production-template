"use client";

import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-screen-xl items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-lg font-bold">NPT</span>
        </Link>

        <nav className="flex flex-1 items-center space-x-4 text-sm font-medium">
          <Link href="/" className="text-foreground/60 hover:text-foreground/80 transition-colors">
            Home
          </Link>
        </nav>

        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          )}
        </Button>
      </div>
    </header>
  );
}
