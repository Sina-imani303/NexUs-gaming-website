"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiHash, FiMenu, FiMessageCircle, FiMoon, FiSun, FiUserPlus, FiMoreVertical } from "react-icons/fi";

export default function ChatPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isLight) {
      root.classList.add("light");
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [isLight]);

  const toggleTheme = () => {
    setIsLight((current) => !current);
  };
  return (
    <main dir="rtl" className="relative h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute -left-48 -top-48 h-125 w-125 rounded-full bg-primary/10 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-125 w-125 rounded-full bg-primary/5 blur-[160px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/2.5 blur-[120px]" />

      <header className="absolute inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background/80 px-5 backdrop-blur-2xl sm:px-7">
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="منوی بیشتر"
            className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-surface/80 text-muted shadow-lg backdrop-blur-xl transition-all duration-300 ${
              menuOpen ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary hover:bg-primary/10 hover:text-primary"
            }`}
          >
            <FiMoreVertical size={20} />
          </button>

          {menuOpen && (
            <>
              <button type="button" aria-label="بستن منو" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 cursor-default" />

              <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-border bg-surface/95 p-1.5 shadow-2xl backdrop-blur-2xl">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-foreground transition hover:bg-surface-hover hover:text-primary"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">{isLight ? <FiMoon size={16} /> : <FiSun size={16} />}</div>
                  <span className="flex-1 text-right">{isLight ? "حالت دارک" : "حالت لایت"}</span>
                </button>

                <div className="my-1 h-px bg-border" />

                <Link
                  href="/group/create"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-foreground transition hover:bg-surface-hover hover:text-primary"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FiUserPlus size={16} />
                  </div>
                  <span className="flex-1 text-right">ایجاد گروه</span>
                </Link>

                <Link
                  href="/channel/create"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-foreground transition hover:bg-surface-hover hover:text-primary"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FiHash size={16} />
                  </div>
                  <span className="flex-1 text-right">ایجاد کانال</span>
                </Link>
              </div>
            </>
          )}
        </div>

        <Link
          href="/dashboard"
          aria-label="داشبورد"
          title="داشبورد"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/80 text-muted shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
        >
          <FiMenu size={21} />
        </Link>
      </header>

      <div className="relative z-10 flex h-full items-center justify-center px-6 pb-16 pt-16 text-center">
        <div className="max-w-xl">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-primary/25 bg-primary/10 text-primary shadow-[0_0_80px_rgba(212,175,55,.1)]">
            <div className="absolute inset-0 animate-pulse rounded-3xl border border-primary/10" />
            <FiMessageCircle size={40} strokeWidth={1.6} />
          </div>

          <p className="mt-7 text-[10px] font-black tracking-[5px] text-primary">NΞXUS</p>

          <h1 className="mt-2 text-3xl font-black text-foreground sm:text-4xl">به NΞXUS خوش آمدی</h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-8 text-muted sm:text-base">یک گفتگو را از لیست انتخاب کن یا برای پیدا کردن کاربر موردنظر از جستجو استفاده کن.</p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span className="h-1 w-8 rounded-full bg-primary/30" />
            <span className="h-1 w-1 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </main>
  );
}
