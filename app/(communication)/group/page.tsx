"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiCamera, FiCheck, FiSearch, FiUserPlus, FiUsers } from "react-icons/fi";

type Friend = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  online: boolean;
};

const friends: Friend[] = [
  {
    id: "armin",
    name: "Armin",
    username: "@armin",
    avatar: "A",
    online: true,
  },
  {
    id: "ali",
    name: "Ali",
    username: "@ali",
    avatar: "A",
    online: false,
  },
  {
    id: "sina",
    name: "Sina",
    username: "@sina",
    avatar: "S",
    online: true,
  },
  {
    id: "reza",
    name: "Reza",
    username: "@reza",
    avatar: "R",
    online: false,
  },
  {
    id: "amir",
    name: "Amir",
    username: "@amir",
    avatar: "A",
    online: true,
  },
  {
    id: "mahan",
    name: "Mahan",
    username: "@mahan",
    avatar: "M",
    online: true,
  },
];

export default function CreateGroupPage() {
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const filteredFriends = friends.filter((friend) => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return friend.name.toLowerCase().includes(query) || friend.username.toLowerCase().includes(query);
  });

  const toggleMember = (id: string) => {
    setSelectedMembers((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const nextStep = () => {
    if (step === 1 && !groupName.trim()) {
      return;
    }

    setStep((current) => Math.min(current + 1, 3));
  };

  const previousStep = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  const createGroup = () => {
    const group = {
      name: groupName.trim(),
      description: description.trim(),
      members: selectedMembers,
    };

    console.log("CREATE GROUP:", group);
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

            <h1 className="mt-1 text-2xl font-black sm:text-3xl">ایجاد گروه</h1>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((item) => (
              <span key={item} className={`h-2 rounded-full transition-all duration-300 ${item === step ? "w-8 bg-primary" : item < step ? "w-2 bg-primary" : "w-2 bg-border"}`} />
            ))}
          </div>
        </header>

        <section className="flex-1 rounded-3xl border border-primary/15 bg-surface/50 p-5 shadow-[0_20px_80px_rgba(0,0,0,.25)] backdrop-blur-xl sm:p-8">
          {step === 1 && (
            <div>
              <div className="mb-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/25 bg-primary/10 text-primary">
                  <FiUsers size={34} />
                </div>

                <h2 className="mt-5 text-xl font-black sm:text-2xl">گروه جدید بساز</h2>

                <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-muted sm:text-sm">گروهت را بساز و دوستانت را به آن اضافه کن.</p>
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
                  <label className="mb-2 block text-xs font-bold">نام گروه</label>

                  <input
                    autoFocus
                    value={groupName}
                    onChange={(event) => setGroupName(event.target.value)}
                    placeholder="مثلاً Gaming Team"
                    maxLength={50}
                    className="h-13 w-full rounded-2xl border border-border bg-background-secondary px-4 text-sm outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />

                  <p className="mt-1.5 text-left text-[9px] text-muted">{groupName.length}/50</p>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold">
                    توضیحات
                    <span className="mr-1 font-normal text-muted">اختیاری</span>
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="توضیح کوتاهی درباره گروه..."
                    rows={4}
                    maxLength={180}
                    className="w-full resize-none rounded-2xl border border-border bg-background-secondary px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />

                  <p className="mt-1.5 text-left text-[9px] text-muted">{description.length}/180</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FiUserPlus size={21} />
                </div>

                <div>
                  <h2 className="text-xl font-black">اعضای گروه</h2>

                  <p className="mt-1 text-xs text-muted">دوستانی که می‌خواهی به گروه اضافه شوند را انتخاب کن.</p>
                </div>
              </div>

              <div className="relative mb-4">
                <FiSearch size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="جستجوی دوستان..."
                  className="h-12 w-full rounded-2xl border border-border bg-background-secondary pr-11 pl-4 text-sm outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <div className="mb-4 flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3">
                <span className="text-xs font-bold text-muted">اعضای انتخاب‌شده</span>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">{selectedMembers.length}</span>
              </div>

              <div className="max-h-107.5 overflow-y-auto rounded-2xl border border-border">
                {filteredFriends.length === 0 ? (
                  <div className="px-5 py-12 text-center">
                    <FiSearch size={24} className="mx-auto text-muted" />

                    <p className="mt-3 text-xs font-bold">کاربری پیدا نشد</p>

                    <p className="mt-1 text-[10px] text-muted">عبارت جستجو را تغییر بده.</p>
                  </div>
                ) : (
                  filteredFriends.map((friend) => {
                    const selected = selectedMembers.includes(friend.id);

                    return (
                      <button
                        key={friend.id}
                        type="button"
                        onClick={() => toggleMember(friend.id)}
                        className="flex w-full items-center gap-3 border-b border-border p-4 text-right transition last:border-0 hover:bg-surface-hover"
                      >
                        <div className="relative shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 font-black text-primary">{friend.avatar}</div>

                          {friend.online && <span className="absolute bottom-0 left-0 h-3.5 w-3.5 rounded-full border-2 border-surface bg-success" />}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold">{friend.name}</p>

                          <p dir="ltr" className="mt-1 text-right text-[10px] text-muted">
                            {friend.username}
                          </p>
                        </div>

                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${
                            selected ? "border-primary bg-primary text-background" : "border-border text-transparent"
                          }`}
                        >
                          <FiCheck size={14} strokeWidth={3} />
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="mb-7 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-background">
                  <FiCheck size={34} strokeWidth={2.5} />
                </div>

                <h2 className="mt-5 text-xl font-black sm:text-2xl">آماده ساخت گروه هستی؟</h2>

                <p className="mt-2 text-xs leading-6 text-muted">اطلاعات گروه را بررسی کن.</p>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border bg-background-secondary/60">
                <div className="border-b border-border p-5">
                  <p className="text-[10px] font-bold text-muted">نام گروه</p>

                  <h3 className="mt-2 text-lg font-black">{groupName}</h3>
                </div>

                {description && (
                  <div className="border-b border-border p-5">
                    <p className="text-[10px] font-bold text-muted">توضیحات</p>

                    <p className="mt-2 text-sm leading-7 text-foreground-secondary">{description}</p>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-muted">اعضای گروه</p>

                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary">{selectedMembers.length} نفر</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedMembers.length === 0 ? (
                      <p className="text-xs text-muted">فقط خودت عضو گروه خواهی بود.</p>
                    ) : (
                      friends
                        .filter((friend) => selectedMembers.includes(friend.id))
                        .map((friend) => (
                          <div key={friend.id} className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-black text-primary">{friend.avatar}</div>

                            <span className="text-xs font-bold">{friend.name}</span>
                          </div>
                        ))
                    )}
                  </div>
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
              disabled={step === 1 && !groupName.trim()}
              className="h-12 rounded-xl bg-primary px-8 text-sm font-black text-background transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              ادامه
            </button>
          ) : (
            <button type="button" onClick={createGroup} className="flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-black text-background transition hover:bg-primary-hover">
              <FiUsers size={17} />
              ایجاد گروه
            </button>
          )}
        </footer>
      </div>
    </main>
  );
}
