"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { FiBell, FiGlobe, FiLock, FiLogOut, FiMail, FiSave, FiShield, FiUser, FiEye, FiTrash2, FiCheck } from "react-icons/fi";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [showGender, setShowGender] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
    }, 700);
  };

  return (
    <main dir="rtl" className="font-vazir min-h-screen w-full overflow-x-hidden px-3 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6 sm:mb-8">
          <p className="mb-1.5 text-xs text-muted sm:mb-2 sm:text-sm">مدیریت حساب</p>

          <h1 className="text-2xl font-black text-foreground sm:text-3xl">تنظیمات</h1>

          <p className="mt-2 max-w-2xl text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">حساب کاربری، اعلان‌ها، حریم خصوصی و امنیت حساب خود را مدیریت کنید.</p>
        </header>

        <section className="rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:p-7">
          <SectionHeader icon={<FiUser size={19} />} title="حساب کاربری" description="اطلاعات اصلی حساب خود را مدیریت کنید." />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            <InputField label="نام کاربری" value="jaki" icon={<FiUser size={16} />} />

            <InputField label="ایمیل" value="jaki@example.com" icon={<FiMail size={16} />} disabled />
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">ورود با Google</p>

              <p className="mt-1 text-xs leading-6 text-muted">حساب Google خود را برای ورود سریع‌تر متصل کنید.</p>
            </div>

            <button
              type="button"
              className="flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-background-secondary px-4 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary sm:w-auto sm:text-sm"
            >
              <span className="font-black">G</span>
              اتصال Google
            </button>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-xs font-bold text-background transition hover:bg-primary-hover active:scale-[.98] sm:h-12 sm:w-auto sm:text-sm"
          >
            {saving ? (
              <>
                <FiCheck size={16} />
                ذخیره شد
              </>
            ) : (
              <>
                <FiSave size={16} />
                ذخیره تغییرات
              </>
            )}
          </button>
        </section>

        <section className="mt-5 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:mt-6 sm:p-7">
          <SectionHeader icon={<FiBell size={19} />} title="اعلان‌ها" description="نحوه دریافت اعلان‌های NexUs را کنترل کنید." />

          <div className="divide-y divide-border/50">
            <SettingRow
              icon={<FiBell size={18} />}
              title="اعلان‌های داخل برنامه"
              description="اعلان‌های جدید را داخل NexUs دریافت کنید."
              enabled={notifications}
              onChange={() => setNotifications(!notifications)}
            />

            <SettingRow
              icon={<FiMail size={18} />}
              title="اعلان‌های ایمیلی"
              description="اعلان‌های مهم را از طریق ایمیل دریافت کنید."
              enabled={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
          </div>
        </section>

        <section className="mt-5 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:mt-6 sm:p-7">
          <SectionHeader icon={<FiShield size={19} />} title="حریم خصوصی" description="کنترل کنید دیگران چه اطلاعاتی از شما ببینند." />

          <div className="divide-y divide-border/50">
            <SettingRow
              icon={<FiEye size={18} />}
              title="نمایش وضعیت آنلاین"
              description="دوستان می‌توانند آنلاین بودن شما را ببینند."
              enabled={onlineStatus}
              onChange={() => setOnlineStatus(!onlineStatus)}
            />

            <SettingRow
              icon={<FiUser size={18} />}
              title="نمایش جنسیت"
              description="جنسیت شما در پروفایل و نتایج جستجو نمایش داده شود."
              enabled={showGender}
              onChange={() => setShowGender(!showGender)}
            />

            <SettingRow icon={<FiMail size={18} />} title="نمایش ایمیل" description="اجازه دهید ایمیل شما در پروفایل قابل مشاهده باشد." enabled={showEmail} onChange={() => setShowEmail(!showEmail)} />
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-background-secondary/50 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">پیش‌نمایش اطلاعات عمومی</p>

                <p className="mt-1 text-xs leading-6 text-muted">اطلاعاتی که سایر کاربران می‌توانند از پروفایل شما ببینند.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-semibold text-primary">@jaki</span>

                <span className="rounded-full bg-success/10 px-3 py-1.5 text-[10px] font-semibold text-success">آنلاین</span>

                {showGender && <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold text-blue-400">مرد</span>}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:mt-6 sm:p-7">
          <SectionHeader icon={<FiLock size={19} />} title="امنیت" description="امنیت حساب کاربری خود را مدیریت کنید." />

          <div className="space-y-3">
            <ActionRow icon={<FiLock size={18} />} title="رمز عبور" description="رمز عبور حساب خود را تغییر دهید." button="تغییر رمز عبور" />

            <ActionRow icon={<FiShield size={18} />} title="تأیید دو مرحله‌ای" description="یک لایه امنیتی بیشتر به حساب خود اضافه کنید." button="فعال‌سازی" />
          </div>
        </section>

        <section className="mt-5 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:mt-6 sm:p-7">
          <SectionHeader icon={<FiLogOut size={19} />} title="جلسه فعلی" description="مدیریت ورود فعلی شما به NexUs." />

          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background-secondary/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
                <FiGlobe size={18} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">Windows • Chrome</p>

                <p className="mt-1 text-xs text-muted">دستگاه فعلی • فعال</p>
              </div>
            </div>

            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-error/30 bg-error/5 px-5 text-xs font-semibold text-error transition hover:border-error hover:bg-error/10 sm:w-auto sm:text-sm"
            >
              <FiLogOut size={16} />
              خروج از حساب
            </button>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-3xl border border-error/20 bg-surface/50 backdrop-blur-xl sm:mt-6">
          <div className="border-b border-error/10 bg-error/5 px-4 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-error/10 text-error">
                <FiTrash2 size={19} />
              </div>

              <div>
                <h2 className="font-bold text-error">مدیریت حساب</h2>

                <p className="mt-1 text-xs text-muted">حذف حساب یک عملیات دائمی است.</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-7">
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-sm font-bold text-foreground sm:text-base">حذف حساب کاربری</h3>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">
                  با حذف حساب، پروفایل و اطلاعات مرتبط با حساب شما از NexUs حذف خواهد شد. این عملیات قابل بازگشت نیست.
                </p>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl border border-error/10 bg-error/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <FiShield size={18} className="mt-0.5 shrink-0 text-error" />

                  <p className="text-xs leading-6 text-muted">اگر مطمئن نیستید، به‌جای حذف حساب می‌توانید فقط از آن خارج شوید.</p>
                </div>

                <button
                  type="button"
                  className="flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-error/30 px-5 text-xs font-semibold text-error transition-all duration-300 hover:bg-error hover:text-white active:scale-[.98] sm:w-auto sm:text-sm"
                >
                  <FiTrash2 size={15} />
                  حذف حساب
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="h-6 sm:h-8" />
      </div>
    </main>
  );
}

function SectionHeader({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 sm:mb-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11">{icon}</div>

      <div className="min-w-0">
        <h2 className="text-sm font-bold text-foreground sm:text-base">{title}</h2>

        <p className="mt-1 truncate text-[10px] text-muted sm:text-xs">{description}</p>
      </div>
    </div>
  );
}

function InputField({ label, value, icon, disabled = false }: { label: string; value: string; icon: ReactNode; disabled?: boolean }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-medium text-foreground sm:text-sm">
        <span className="text-muted">{icon}</span>
        {label}
      </label>

      <input
        type="text"
        defaultValue={value}
        disabled={disabled}
        className={`h-12 w-full rounded-2xl border border-border px-4 text-xs outline-none transition sm:h-14 sm:px-5 sm:text-sm ${
          disabled ? "cursor-not-allowed bg-background-secondary/50 text-muted" : "bg-background-secondary text-foreground focus:border-primary focus:ring-4 focus:ring-primary/15"
        }`}
      />
    </div>
  );
}

function SettingRow({ icon, title, description, enabled, onChange }: { icon: ReactNode; title: string; description: string; enabled: boolean; onChange: () => void }) {
  return (
    <div className="flex w-full items-center gap-3 py-4 sm:gap-4 sm:py-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11">{icon}</div>

      <div className="min-w-0 flex-1">
        <h3 className="text-xs font-semibold leading-6 text-foreground sm:text-sm sm:leading-7">{title}</h3>

        <p className="mt-0.5 text-[10px] leading-5 text-muted sm:text-xs sm:leading-6">{description}</p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-label={title}
        aria-pressed={enabled}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-all duration-300 ${enabled ? "bg-primary" : "bg-border"}`}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${enabled ? "right-1" : "right-6"}`} />
      </button>
    </div>
  );
}

function ActionRow({ icon, title, description, button }: { icon: ReactNode; title: string; description: string; button: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background-secondary/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11">{icon}</div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>

          <p className="mt-1 text-xs leading-6 text-muted">{description}</p>
        </div>
      </div>

      <button
        type="button"
        className="h-10 w-full rounded-xl border border-border px-5 text-xs font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:h-11 sm:w-auto sm:text-sm"
      >
        {button}
      </button>
    </div>
  );
}
