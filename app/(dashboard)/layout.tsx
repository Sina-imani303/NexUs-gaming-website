"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiBell, FiChevronLeft, FiHeadphones, FiHome, FiLogOut, FiMenu, FiPlay, FiSettings, FiUser, FiUsers, FiX } from "react-icons/fi";

const navigation = [
  {
    name: "داشبورد",
    href: "/dashboard",
    icon: FiHome,
  },
  {
    name: "پروفایل",
    href: "/profile",
    icon: FiUser,
  },
  {
    name: "دوستان",
    href: "/friends",
    icon: FiUsers,
  },
  {
    name: "بازی‌ها",
    href: "/games",
    icon: FiPlay,
  },
  {
    name: "اعلان‌ها",
    href: "/notifications",
    icon: FiBell,
  },
  {
    name: "تنظیمات",
    href: "/settings",
    icon: FiSettings,
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div dir="rtl" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed -bottom-40 -right-40 z-0 h-112.5 w-112.5 rounded-full bg-primary/10 blur-[180px]" />

      <div className="pointer-events-none fixed -left-40 -top-40 z-0 h-100 w-100 rounded-full bg-primary/5 blur-[160px]" />

      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-3 backdrop-blur-2xl lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface/70 text-foreground transition hover:border-primary hover:text-primary"
          aria-label="باز کردن منو"
        >
          <FiMenu size={21} />
        </button>

        <div className="flex items-center gap-2">
          <Link href="/" className="text-base font-black tracking-[3px] text-primary sm:text-lg sm:tracking-[4px]">
            NΞXUS
          </Link>

          <Link
            href="/"
            aria-label="خروج از داشبورد"
            title="خروج از داشبورد"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/5 text-red-400 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
          >
            <FiLogOut size={17} />
          </Link>
        </div>

        <Link
          href="/notifications"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface/70 text-foreground transition hover:border-primary hover:text-primary"
        >
          <FiBell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </Link>
      </header>

      <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 border-l border-border bg-background/70 backdrop-blur-2xl lg:block xl:w-72">
        <div className="flex h-full flex-col p-4 xl:p-5">
          <div className="mb-8 flex items-center gap-3 px-2 xl:mb-10 xl:px-3">
            <Link href="/" className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary shadow-[0_0_30px_rgba(212,175,55,.15)] xl:h-14 xl:w-14">
                <Image src="/logo/logo.jpg" width={56} height={56} alt="NexUs logo" className="h-full w-full object-cover" />
              </div>

              <div className="min-w-0">
                <div className="truncate text-lg font-black tracking-[2px] text-foreground xl:text-xl xl:tracking-[3px]">NΞXUS</div>
              </div>
            </Link>

            <Link
              href="/"
              aria-label="خروج از داشبورد"
              title="خروج از داشبورد"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/5 text-red-400 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 xl:h-11 xl:w-11"
            >
              <FiLogOut size={18} />
            </Link>
          </div>

          <div className="mb-5 rounded-2xl border border-border bg-surface/50 p-3 xl:mb-6">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary xl:h-11 xl:w-11">S</div>

                <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-surface bg-success" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">jaki</p>

                <p className="truncate text-[11px] text-muted xl:text-xs">Level 8 • Online</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex h-11 items-center gap-3 rounded-2xl px-3 text-sm font-semibold transition-all duration-300 xl:h-12 xl:gap-4 xl:px-4 ${
                    active ? "bg-primary text-background shadow-[0_8px_30px_rgba(212,175,55,.12)]" : "text-foreground-secondary hover:bg-surface-hover hover:text-foreground"
                  }`}
                >
                  <Icon size={18} className={active ? "shrink-0 text-background" : "shrink-0 text-muted transition group-hover:text-primary"} />

                  <span className="min-w-0 flex-1 truncate">{item.name}</span>

                  {item.href === "/notifications" && (
                    <span
                      className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1 text-[10px] ${active ? "bg-background/20 text-background" : "bg-primary/10 text-primary"}`}
                    >
                      2
                    </span>
                  )}

                  {active && <FiChevronLeft size={15} className="shrink-0 opacity-70" />}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/support"
            className={`group mt-4 flex items-center gap-3 rounded-2xl border p-3 transition-all duration-300 xl:mt-5 xl:p-4 ${
              isActive("/support") ? "border-primary/30 bg-primary/10" : "border-border bg-surface/50 hover:border-primary/30 hover:bg-primary/5"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                isActive("/support") ? "bg-primary text-background" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background"
              }`}
            >
              <FiHeadphones size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-foreground xl:text-sm">راهنما و پشتیبانی</p>
            </div>

            <FiChevronLeft size={16} className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-primary" />
          </Link>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="بستن منو" onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <aside className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col border-l border-border bg-background p-4 shadow-2xl sm:w-[80%] sm:p-5">
            <div className="mb-6 flex items-center justify-between sm:mb-8">
              <div className="flex items-center gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-black tracking-[3px] text-primary sm:text-xl sm:tracking-[4px]">
                  NΞXUS
                </Link>

                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="خروج از داشبورد"
                  title="خروج از داشبورد"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/5 text-red-400 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
                >
                  <FiLogOut size={17} />
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition hover:border-primary hover:text-primary"
                aria-label="بستن منو"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mb-5 rounded-2xl border border-border bg-surface/60 p-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">S</div>

                  <span className="absolute bottom-0 left-0 h-3.5 w-3.5 rounded-full border-2 border-surface bg-success" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground sm:text-base">jaki</p>

                  <p className="mt-1 truncate text-xs text-muted">Level 8 • Online</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex h-12 items-center gap-3 rounded-2xl px-4 text-sm font-semibold transition-all sm:h-13 ${
                      active ? "bg-primary text-background shadow-[0_8px_30px_rgba(212,175,55,.12)]" : "text-foreground-secondary hover:bg-surface-hover hover:text-foreground"
                    }`}
                  >
                    <Icon size={20} className="shrink-0" />

                    <span className="min-w-0 flex-1 truncate">{item.name}</span>

                    {item.href === "/notifications" && (
                      <span className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1 text-[10px] ${active ? "bg-background/20" : "bg-primary/10 text-primary"}`}>2</span>
                    )}

                    {active && <FiChevronLeft size={15} className="shrink-0 opacity-70" />}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/support"
              onClick={() => setMobileMenuOpen(false)}
              className={`mt-4 flex items-center gap-3 rounded-2xl border p-3 transition-all duration-300 sm:p-4 ${
                isActive("/support") ? "border-primary/30 bg-primary/10" : "border-border bg-surface/50 hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isActive("/support") ? "bg-primary text-background" : "bg-primary/10 text-primary"}`}>
                <FiHeadphones size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">راهنما و پشتیبانی</p>

                <p className="mt-0.5 truncate text-[10px] text-muted">سوالی داری؟ از اینجا شروع کن</p>
              </div>

              <FiChevronLeft size={16} className="shrink-0 text-muted" />
            </Link>
          </aside>
        </div>
      )}

      <main className="relative z-10 min-h-screen lg:mr-64 xl:mr-72">
        <div className="pt-16 lg:pt-0">{children}</div>
      </main>
    </div>
  );
}
