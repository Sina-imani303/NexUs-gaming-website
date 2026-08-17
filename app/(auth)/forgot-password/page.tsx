"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiCheckCircle, FiLock, FiMail } from "react-icons/fi";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);

  return (
    <section dir="rtl" className=" font-vazir flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-[30px] border border-white/10 bg-white/4 p-5 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-3xl sm:p-8">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[6px] text-primary">NexUs</span>

          <h1 className="mt-6 text-3xl font-black text-foreground sm:text-4xl">بازیابی رمز عبور</h1>

          <p className="mt-4 text-sm leading-8 text-foreground-secondary">تنها در سه مرحله رمز عبور خود را بازیابی کنید.</p>
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">مرحله {step} از 3</span>

            <span className="text-sm text-muted">Forgot Password</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-border">
            <div className={`h-full rounded-full bg-primary transition-all duration-500 ${step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"}`} />
          </div>
        </div>

        <form className="mt-8 space-y-6">
          {step === 1 && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">ایمیل</label>

                <div className="relative">
                  <FiMail size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted" />

                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="h-14 w-full rounded-2xl border border-border bg-background-secondary pr-14 pl-5 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                </div>

                <p className="mt-3 text-sm leading-7 text-muted">کد تایید برای ایمیل شما ارسال خواهد شد.</p>
              </div>

              <button type="button" onClick={() => setStep(2)} className="h-14 w-full rounded-2xl bg-primary font-bold text-background transition-all duration-300 hover:bg-primary-hover">
                ارسال کد تایید
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">تایید کد</h2>

                <p className="mt-3 text-sm leading-7 text-foreground-secondary">کد ارسال شده به ایمیل را وارد کنید.</p>
              </div>

              <div className="flex justify-center gap-2 sm:gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <input
                    key={item}
                    maxLength={1}
                    className="h-12 w-12 rounded-2xl border border-border bg-background-secondary text-center text-lg font-bold text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15 sm:h-16 sm:w-16 sm:text-2xl"
                  />
                ))}
              </div>
              <button type="button" className="text-center text-sm font-semibold text-primary transition hover:text-primary-hover">
                ارسال مجدد کد
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="h-14 w-full rounded-2xl bg-primary font-bold text-background transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover active:scale-[.98]"
              >
                تایید کد
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">رمز عبور جدید</label>

                <div className="relative">
                  <FiLock size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted" />

                  <input
                    type="password"
                    placeholder="رمز عبور جدید"
                    className="h-14 w-full rounded-2xl border border-border bg-background-secondary pr-14 pl-5 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">تکرار رمز عبور</label>

                <div className="relative">
                  <FiLock size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted" />

                  <input
                    type="password"
                    placeholder="تکرار رمز عبور"
                    className="h-14 w-full rounded-2xl border border-border bg-background-secondary pr-14 pl-5 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                </div>
              </div>

              <button type="submit" className="h-14 w-full rounded-2xl bg-primary font-bold text-background transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover active:scale-[.98]">
                تغییر رمز عبور
              </button>
            </>
          )}

          <div className="rounded-2xl border border-border bg-background-secondary p-5">
            <div className="mb-3 flex items-center gap-3">
              <FiCheckCircle size={20} className="text-primary" />

              <h3 className="font-semibold text-foreground">راهنمای بازیابی</h3>
            </div>

            <ul className="space-y-2 text-sm leading-7 text-foreground-secondary">
              <li>• کد تایید فقط به ایمیل ثبت شده ارسال می‌شود.</li>

              <li>• اعتبار کد ۵ دقیقه است.</li>

              <li>• بعد از تغییر رمز، از همه دستگاه‌ها خارج خواهید شد.</li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />

            <span className="text-sm text-muted">یا</span>

            <div className="h-px flex-1 bg-border" />
          </div>

          <Link
            href="/login"
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-border bg-background-secondary font-semibold text-foreground transition-all duration-300 hover:border-primary hover:bg-surface-hover"
          >
            <FiArrowRight size={18} />
            بازگشت به صفحه ورود
          </Link>
        </form>
      </div>
    </section>
  );
}
