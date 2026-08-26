// app/feed/layout.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiPlus, FiSearch, FiUser, FiMessageCircle, FiMenu } from "react-icons/fi";

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 w-full">
          <Link
            href="/dashboard"
            aria-label="داشبورد"
            title="داشبورد"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/80 text-muted shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            <FiMenu size={21} />
          </Link>
          <Link href="/feed" className="text-2xl font-black tracking-[2px] text-primary">
            NΞXUS
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/feed/search" className="flex h-11 w-11 items-center justify-center rounded-xl text-muted hover:bg-surface-hover hover:text-primary transition">
              <FiSearch size={22} />
            </Link>
            <Link href="/feed/post/create" className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition">
              <FiPlus size={22} />
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-around w-full">
          <Link href="/feed" className={`flex flex-col items-center gap-0.5 text-xs transition ${pathname === "/feed" ? "text-primary" : "text-muted hover:text-primary"}`}>
            <FiHome size={24} />
            <span>خانه</span>
          </Link>
          <Link href="/chat" className={`flex flex-col items-center gap-0.5 text-xs transition ${pathname?.startsWith("/chat") ? "text-primary" : "text-muted hover:text-primary"}`}>
            <FiMessageCircle size={24} />
            <span>پیام‌ها</span>
          </Link>
          <Link href="/profile" className={`flex flex-col items-center gap-0.5 text-xs transition ${pathname === "/profile" ? "text-primary" : "text-muted hover:text-primary"}`}>
            <FiUser size={24} />
            <span>پروفایل</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
