"use client";

import Link from "next/link";
import { FiArrowLeft, FiBookOpen, FiChevronDown, FiHeadphones, FiMessageCircle, FiShield, FiTool } from "react-icons/fi";
import { useState } from "react";

const faqs = [
  {
    question: "چطور رمز عبور خود را تغییر دهم؟",
    answer: "از بخش تنظیمات وارد قسمت امنیت شوید و گزینه تغییر رمز عبور را انتخاب کنید.",
  },
  {
    question: "چطور یک دوست جدید اضافه کنم؟",
    answer: "وارد بخش دوستان شوید، نام کاربری فرد موردنظر را جستجو کنید و درخواست دوستی ارسال کنید.",
  },
  {
    question: "چطور وضعیت آنلاین خود را مخفی کنم؟",
    answer: "در تنظیمات و بخش حریم خصوصی می‌توانید نمایش وضعیت آنلاین خود را غیرفعال کنید.",
  },
  {
    question: "اگر حساب من هک شد چه کاری انجام دهم؟",
    answer: "در اولین فرصت رمز عبور خود را تغییر دهید و برای بررسی بیشتر با پشتیبانی NexUs تماس بگیرید.",
  },
  {
    question: "چطور اعلان‌های ایمیلی را غیرفعال کنم؟",
    answer: "به تنظیمات بروید و در بخش اعلان‌ها، گزینه اعلان‌های ایمیلی را خاموش کنید.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main dir="rtl" className="font-vazir min-h-screen w-full overflow-x-hidden px-3 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-7 sm:mb-8">
          <p className="mb-2 text-xs font-medium text-primary sm:text-sm">مرکز پشتیبانی</p>

          <h1 className="text-2xl font-black leading-tight text-foreground sm:text-3xl">راهنما و پشتیبانی</h1>

          <p className="mt-3 max-w-2xl text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">پاسخ سوالات خود را پیدا کنید یا در صورت نیاز با تیم پشتیبانی NexUs ارتباط برقرار کنید.</p>
        </header>

        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <SupportCard icon={<FiMessageCircle size={21} />} title="تماس با پشتیبانی" description="مشکل یا درخواست خود را برای تیم پشتیبانی ارسال کنید." href="/support/contact" />

          <SupportCard icon={<FiTool size={21} />} title="تیکت‌های من" description="تیکت‌های قبلی خود را مشاهده و پاسخ‌های پشتیبانی را پیگیری کنید." href="/support/tickets" />

          <SupportCard icon={<FiBookOpen size={21} />} title="راهنمای NexUs" description="آموزش استفاده از امکانات مختلف NexUs را مشاهده کنید." href="/support/guide" />

          <SupportCard icon={<FiShield size={21} />} title="امنیت حساب" description="نکات امنیتی و روش‌های محافظت از حساب کاربری خود را ببینید." href="/support/security" />
        </section>

        <section className="mt-7 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:mt-8 sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
            <div className="min-w-0">
              <h2 className="text-base font-bold text-foreground sm:text-lg">سوالات متداول</h2>

              <p className="mt-1 text-[11px] text-muted sm:text-xs">پاسخ سوالات رایج کاربران NexUs</p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FiHeadphones size={19} />
            </div>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question} className="overflow-hidden rounded-2xl border border-border bg-background-secondary/60">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-4 text-right transition hover:bg-surface-hover sm:px-5"
                  >
                    <span className="min-w-0 text-xs font-semibold leading-6 text-foreground sm:text-sm">{faq.question}</span>

                    <FiChevronDown size={18} className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="border-t border-border px-4 py-4 sm:px-5">
                      <p className="text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiMessageCircle size={20} />
              </div>

              <div className="min-w-0">
                <h2 className="text-sm font-bold text-foreground sm:text-base">هنوز جواب سوالت رو پیدا نکردی؟</h2>

                <p className="mt-2 text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">تیم پشتیبانی NexUs آماده پاسخگویی به درخواست شماست.</p>
              </div>
            </div>

            <Link
              href="/support/contact"
              className="flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover active:scale-[.98] sm:h-12 sm:w-auto sm:rounded-2xl sm:text-sm"
            >
              ارتباط با پشتیبانی
              <FiArrowLeft size={16} />
            </Link>
          </div>
        </section>

        <div className="h-6 sm:h-8" />
      </div>
    </main>
  );
}

function SupportCard({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex min-h-32 flex-col justify-between rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-hover sm:min-h-36 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-background">{icon}</div>

        <FiArrowLeft size={18} className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-primary" />
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-bold text-foreground sm:text-base">{title}</h3>

        <p className="mt-2 text-[11px] leading-6 text-muted sm:text-xs">{description}</p>
      </div>
    </Link>
  );
}
