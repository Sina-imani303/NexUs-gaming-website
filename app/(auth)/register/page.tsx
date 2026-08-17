"use client";

import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi";

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <section dir="rtl" className="font-vazir flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl rounded-[30px] border border-white/10 bg-white/4 p-5 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-3xl sm:p-8 lg:p-10">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-[6px] text-primary">NexUs</span>

          <h1 className="mt-6 text-3xl font-black text-foreground sm:text-4xl">ایجاد حساب کاربری</h1>

          <p className="mt-4 text-sm leading-8 text-foreground-secondary sm:text-base">کمتر از یک دقیقه تا عضویت در NexUs فاصله داری.</p>
        </div>

        <div className="my-10">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold text-primary">مرحله {step} از 3</span>

            <span className="text-sm text-muted">Register</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-border">
            <div className={`h-full rounded-full bg-primary transition-all duration-500 ${step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"}`} />
          </div>
        </div>

        <form className="space-y-6">
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">نام کاربری</label>

                  <div className="relative">
                    <FiUser size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted" />

                    <input
                      type="text"
                      placeholder="Username"
                      className="h-14 w-full rounded-2xl border border-border bg-background-secondary pr-14 pl-5 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15"
                    />
                  </div>
                </div>

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
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">شماره موبایل (اختیاری)</label>

                <div className="relative">
                  <FiPhone size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted" />

                  <input
                    type="tel"
                    placeholder="09xxxxxxxxx"
                    className="h-14 w-full rounded-2xl border border-border bg-background-secondary pr-14 pl-5 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">تکرار رمز عبور</label>

                  <div className="relative">
                    <FiLock size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted" />

                    <input
                      type={showRepeatPassword ? "text" : "password"}
                      placeholder="تکرار رمز عبور"
                      className="h-14 w-full rounded-2xl border border-border bg-background-secondary pr-14 pl-14 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15"
                    />

                    <button type="button" onClick={() => setShowRepeatPassword(!showRepeatPassword)} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary">
                      {showRepeatPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="h-14 w-full rounded-2xl bg-primary font-bold text-background transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover active:scale-[.98]"
              >
                ادامه
              </button>

              <p className="text-center text-sm leading-7 text-foreground-secondary">
                قبلاً حساب کاربری دارید؟
                <Link href="/login" className="mr-2 font-semibold text-primary transition hover:text-primary-hover">
                  ورود
                </Link>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <FiMail size={36} className="text-primary" />
                </div>

                <h2 className="text-2xl font-bold text-foreground">تایید ایمیل</h2>

                <p className="mt-4 text-sm leading-8 text-foreground-secondary sm:text-base">کد 4 رقمی ارسال شده به ایمیل خود را وارد کنید.</p>
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
              <button
                type="button"
                onClick={() => setStep(3)}
                className="h-14 w-full rounded-2xl bg-primary font-bold text-background transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover active:scale-[.98]"
              >
                تایید و ادامه
              </button>

              <button type="button" className="w-full text-sm font-semibold text-primary transition hover:text-primary-hover">
                ارسال مجدد کد
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-14 w-full rounded-2xl border border-border bg-background-secondary font-semibold text-foreground transition-all duration-300 hover:border-primary"
              >
                بازگشت
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">نام نمایشی</label>

                  <div className="relative">
                    <FiUser size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted" />

                    <input
                      type="text"
                      placeholder="Display Name"
                      className="h-14 w-full rounded-2xl border border-border bg-background-secondary pr-14 pl-5 text-foreground placeholder:text-muted outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">جنسیت</label>

                  <select className="h-14 w-full rounded-2xl border border-border bg-background-secondary px-5 text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15">
                    <option value="">انتخاب کنید</option>

                    <option value="male">مرد</option>

                    <option value="female">زن</option>

                    <option value="other">سایر</option>

                    <option value="private">نمایش نده</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">سطح گیمینگ</label>

                <select className="h-14 w-full rounded-2xl border border-border bg-background-secondary px-5 text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/15">
                  <option value="">انتخاب کنید</option>

                  <option value="beginner">مبتدی</option>

                  <option value="intermediate">متوسط</option>

                  <option value="advanced">حرفه‌ای</option>

                  <option value="pro">نخبه</option>
                </select>
              </div>

              <div>
                <label className="mb-4 block text-sm font-medium text-foreground">بازی‌های مورد علاقه</label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {["Valorant", "CS2", "PUBG", "Fortnite", "League of Legends", "Dota 2", "Apex Legends", "Rainbow Six", "Overwatch 2"].map((game) => (
                    <label key={game} className="group cursor-pointer">
                      <input type="checkbox" className="peer hidden" />

                      <div className="flex h-16 sm:h-20 items-center justify-center rounded-2xl border border-border bg-background-secondary transition-all duration-300 group-hover:border-primary peer-checked:border-primary peer-checked:bg-primary/10">
                        <span className="px-2 text-center text-sm font-medium text-foreground">{game}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-3 rounded-2xl border border-border bg-background-secondary p-5">
                <input type="checkbox" className="mt-1 h-5 w-5 accent-primary" />

                <span className="text-sm leading-7 text-foreground-secondary">
                  قوانین و شرایط استفاده از
                  <span className="mx-1 font-semibold text-primary">NexUs</span>
                  را مطالعه کرده‌ام و با آن موافقم.
                </span>
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="order-2 h-14 rounded-2xl border border-border bg-background-secondary font-semibold text-foreground transition-all duration-300 hover:border-primary hover:bg-surface-hover sm:order-1"
                >
                  بازگشت
                </button>

                <button
                  type="submit"
                  className="order-1 h-14 rounded-2xl bg-primary font-bold text-background transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover active:scale-[.98] sm:order-2"
                >
                  ایجاد حساب
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
