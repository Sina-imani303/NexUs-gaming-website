"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiMessageCircle, FiUser } from "react-icons/fi";

export default function BottomNav() {
  const pathname = usePathname();

  const isChatPage = pathname?.startsWith("/chat/") || pathname?.startsWith("/group/") || pathname?.startsWith("/channel/");

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl ${isChatPage ? "hidden" : "block"}`}>
      <div className="flex h-16 items-center justify-around w-full max-w-7xl mx-auto">
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
  );
}
