"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiCamera, FiCheck, FiHash, FiUsers } from "react-icons/fi";

export default function CreateChannelPage() {
  const [step, setStep] = useState(1);
  const [channelName, setChannelName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"public" | "private">("public");

  const nextStep = () => {
    if (step === 1 && !channelName.trim()) return;
    if (step === 2 && type === "public" && !username.trim()) return;

    setStep((current) => Math.min(current + 1, 3));
  };

  const previousStep = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  const createChannel = () => {
    const channel = {
      name: channelName.trim(),
      username: username.trim().replace(/^@/, "").toLowerCase(),
      description: description.trim(),
      type,
    };

    console.log("CREATE CHANNEL:", channel);
  };

  return (
    <main dir="rtl" className="font-vazir min-h-screen bg-background px-4 py-5 text-foreground sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-2xl flex-col">
        <header className="mb-6 flex items-center gap-3 sm:mb-8">
          <Link
            href="/chat"
            aria-label="بازگشت"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface/70 text-muted transition hover:border-primary hover:text-primary"
          >
            <FiArrowRight size={19} />
          </Link>

          <div className="flex-1">
            <p className="text-[10px] font-black tracking-[4px] text-primary">NΞXUS</p>

            <h1 className="mt-1 text-2xl font-black sm:text-3xl">ایجاد کانال</h1>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((item) => (
              <span key={item} className={`h-2 rounded-full transition-all ${item === step ? "w-8 bg-primary" : item < step ? "w-2 bg-primary" : "w-2 bg-border"}`} />
            ))}
          </div>
        </header>

        <section className="flex-1 rounded-3xl border border-primary/15 bg-surface/50 p-5 shadow-[0_20px_80px_rgba(0,0,0,.25)] backdrop-blur-xl sm:p-8">
          {step === 1 && (
            <div>
              <div className="mb-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/25 bg-primary/10 text-primary">
                  <FiHash size={34} />
                </div>

                <h2 className="mt-5 text-xl font-black sm:text-2xl">کانال جدید بساز</h2>

                <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-muted sm:text-sm">کانالت را بساز و محتوایت را با دیگران به اشتراک بگذار.</p>
              </div>

              <div className="space-y-5">
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-border bg-background-secondary text-muted transition hover:border-primary hover:text-primary"
                  >
                    <FiCamera size={27} />

                    <span className="absolute bottom-2 rounded-full bg-background/90 px-2 py-1 text-[9px] font-bold">افزودن عکس</span>
                  </button>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold">نام کانال</label>

                  <input
                    autoFocus
                    value={channelName}
                    onChange={(event) => setChannelName(event.target.value)}
                    placeholder="مثلاً NexUs Gaming"
                    maxLength={50}
                    className="h-13 w-full rounded-2xl border border-border bg-background-secondary px-4 text-sm outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold">
                    توضیحات
                    <span className="mr-1 font-normal text-muted">اختیاری</span>
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="توضیح کوتاهی درباره کانال..."
                    rows={4}
                    maxLength={180}
                    className="w-full resize-none rounded-2xl border border-border bg-background-secondary px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />

                  <p className="mt-1 text-left text-[9px] text-muted">{description.length}/180</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FiHash size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black">تنظیمات کانال</h2>

                    <p className="mt-1 text-xs text-muted">مشخص کن کانالت عمومی باشد یا خصوصی.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setType("public")}
                  className={`w-full rounded-2xl border p-5 text-right transition ${
                    type === "public" ? "border-primary bg-primary/10" : "border-border bg-background-secondary hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${type === "public" ? "bg-primary text-background" : "bg-surface text-muted"}`}>
                      <FiHash size={20} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-black">کانال عمومی</p>

                      <p className="mt-1 text-[10px] leading-5 text-muted">همه می‌توانند کانال را پیدا کنند و وارد آن شوند.</p>
                    </div>

                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border ${type === "public" ? "border-primary bg-primary text-background" : "border-border"}`}>
                      {type === "public" && <FiCheck size={13} strokeWidth={3} />}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setType("private")}
                  className={`w-full rounded-2xl border p-5 text-right transition ${
                    type === "private" ? "border-primary bg-primary/10" : "border-border bg-background-secondary hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${type === "private" ? "bg-primary text-background" : "bg-surface text-muted"}`}>
                      <FiUsers size={20} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-black">کانال خصوصی</p>

                      <p className="mt-1 text-[10px] leading-5 text-muted">فقط افرادی که دعوت شوند می‌توانند وارد کانال شوند.</p>
                    </div>

                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border ${type === "private" ? "border-primary bg-primary text-background" : "border-border"}`}>
                      {type === "private" && <FiCheck size={13} strokeWidth={3} />}
                    </div>
                  </div>
                </button>
              </div>

              {type === "public" && (
                <div className="mt-6">
                  <label className="mb-2 block text-xs font-bold">نام کاربری کانال</label>

                  <div className="flex items-center rounded-2xl border border-border bg-background-secondary transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                    <span dir="ltr" className="px-4 text-sm font-bold text-primary">
                      @
                    </span>

                    <input
                      value={username}
                      onChange={(event) => setUsername(event.target.value.replace(/^@/, "").replace(/\s/g, "").toLowerCase())}
                      placeholder="nexusgaming"
                      maxLength={32}
                      dir="ltr"
                      className="h-13 min-w-0 flex-1 bg-transparent px-2 text-left text-sm outline-none placeholder:text-muted"
                    />
                  </div>

                  <p className="mt-2 text-[10px] text-muted">این نام برای آدرس عمومی کانال استفاده می‌شود.</p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="mb-7 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-background">
                  <FiCheck size={34} strokeWidth={2.5} />
                </div>

                <h2 className="mt-5 text-xl font-black sm:text-2xl">کانالت آماده است</h2>

                <p className="mt-2 text-xs leading-6 text-muted">اطلاعات را بررسی کن و کانال را ایجاد کن.</p>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border bg-background-secondary/60">
                <div className="flex items-center gap-4 border-b border-border p-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xl font-black text-primary">
                    {channelName.trim() ? channelName.trim().charAt(0).toUpperCase() : "#"}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-black">{channelName}</h3>

                    <p className="mt-1 text-xs text-muted">{type === "public" ? `@${username}` : "کانال خصوصی"}</p>
                  </div>
                </div>

                {description && (
                  <div className="border-b border-border p-5">
                    <p className="text-[10px] font-bold text-muted">توضیحات</p>

                    <p className="mt-2 text-sm leading-7 text-foreground-secondary">{description}</p>
                  </div>
                )}

                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-[10px] font-bold text-muted">نوع کانال</p>

                    <p className="mt-2 text-sm font-bold">{type === "public" ? "عمومی" : "خصوصی"}</p>
                  </div>

                  <span className="rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-black text-primary">{type === "public" ? "Public" : "Private"}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        <footer className="mt-4 flex items-center justify-between gap-3">
          {step === 1 ? (
            <Link href="/chat" className="flex h-12 items-center rounded-xl border border-border bg-surface/60 px-5 text-sm font-bold transition hover:border-primary hover:text-primary">
              انصراف
            </Link>
          ) : (
            <button type="button" onClick={previousStep} className="h-12 rounded-xl border border-border bg-surface/60 px-5 text-sm font-bold transition hover:border-primary hover:text-primary">
              مرحله قبل
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={(step === 1 && !channelName.trim()) || (step === 2 && type === "public" && !username.trim())}
              className="h-12 rounded-xl bg-primary px-8 text-sm font-black text-background transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              ادامه
            </button>
          ) : (
            <button type="button" onClick={createChannel} className="flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-black text-background transition hover:bg-primary-hover">
              <FiHash size={17} />
              ایجاد کانال
            </button>
          )}
        </footer>
      </div>
    </main>
  );
}
