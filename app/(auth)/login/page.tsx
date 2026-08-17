"use client";

import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section dir="rtl" className=" font-vazir flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg rounded-[30px] border border-white/10 bg-white/4 p-6 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-3xl sm:p-8 lg:p-10">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[5px] text-primary">NexUs</span>

          <h1 className="mt-6 text-3xl font-black text-foreground sm:text-4xl">ورود به حساب کاربری</h1>

          <p className="mt-4 text-sm leading-8 text-foreground-secondary sm:text-base">به حساب NexUs وارد شوید و با دوستان خود بازی کنید.</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">ایمیل یا نام کاربری</label>

            <div className="relative">
              <FiMail size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted" />

              <input
                type="text"
                placeholder="Username یا Email"
                className="h-14 w-full rounded-2xl border border-border bg-background-secondary pr-14 pl-5 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">رمز عبور</label>

            <div className="relative">
              <FiLock size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور"
                className="h-14 w-full rounded-2xl border border-border bg-background-secondary pr-14 pl-14 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15"
              />

              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary">
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-sm text-foreground-secondary">
              <input type="checkbox" className="h-4 w-4 accent-primary" />

              <span>مرا به خاطر بسپار</span>
            </label>

            <Link href="/forgot-password" className="text-sm font-medium text-primary transition hover:text-primary-hover">
              فراموشی رمز عبور؟
            </Link>
          </div>

          <button type="submit" className="h-14 w-full rounded-2xl bg-primary font-bold text-background transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover active:scale-[.98]">
            ورود به حساب
          </button>
          <div className="flex items-center gap-5 py-2">
            <div className="h-px flex-1 bg-border" />

            <span className="text-sm text-muted">یا</span>

            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-border bg-background-secondary font-semibold text-foreground transition-all duration-300 hover:border-primary hover:bg-surface-hover active:scale-[.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
              />

              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />

              <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2c-2.1 1.6-4.6 2.5-7.3 2.5-5.3 0-9.8-3.3-11.4-8l-6.6 5.1C9.3 39.6 16 44 24 44z" />

              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l.1-.1 6.2 5.2C37 38.4 44 33 44 24c0-1.3-.1-2.3-.4-3.5z" />
            </svg>

            <span>ورود با Google</span>
          </button>

          <div className="rounded-2xl border border-border bg-background-secondary p-5">
            <h3 className="mb-3 font-semibold text-foreground">نکات امنیتی</h3>

            <ul className="space-y-2 text-sm leading-7 text-foreground-secondary">
              <li>• اطلاعات ورود خود را در اختیار دیگران قرار ندهید.</li>

              <li>• برای امنیت بیشتر گزینه «مرا به خاطر بسپار» را فقط روی دستگاه شخصی فعال کنید.</li>

              <li>• در صورت فراموشی رمز عبور از بخش بازیابی استفاده کنید.</li>
            </ul>
          </div>

          <p className="pt-2 text-center text-sm leading-7 text-foreground-secondary">
            حساب کاربری ندارید؟
            <Link href="/register" className="mr-2 font-semibold text-primary transition hover:text-primary-hover">
              ثبت‌نام
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
