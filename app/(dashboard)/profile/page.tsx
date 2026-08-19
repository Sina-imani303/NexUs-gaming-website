"use client";

import { useState } from "react";
import { FiAward, FiCamera, FiCheck, FiEdit3, FiHeart, FiLock, FiMail, FiMessageCircle, FiPhone, FiShield, FiStar, FiUser, FiUsers, FiZap } from "react-icons/fi";

const games = ["Valorant", "CS2", "PUBG", "Fortnite", "Apex Legends", "Dota 2", "Rainbow Six", "Overwatch 2"];

const collectionCards = [
  {
    name: "Mario",
    game: "Super Mario",
    level: "حرفه‌ای",
    rarity: "Epic",
    symbol: "M",
    description: "کارت ویژه بازیکنان حرفه‌ای",
  },
  {
    name: "Valorant",
    game: "Valorant",
    level: "نخبه",
    rarity: "Legendary",
    symbol: "V",
    description: "کارت کمیاب مخصوص بازیکنان Valorant",
  },
  {
    name: "PUBG",
    game: "PUBG",
    level: "حرفه‌ای",
    rarity: "Rare",
    symbol: "P",
    description: "کارت ویژه بازیکنان PUBG",
  },
];

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [following, setFollowing] = useState(false);
  const [friendRequested, setFriendRequested] = useState(false);
  const [showGender, setShowGender] = useState(true);
  const [selectedGames, setSelectedGames] = useState(["Valorant", "CS2", "PUBG"]);

  const followers = following ? 1285 : 1284;
  const followingCount = 386;
  const friends = 24;
  const isVerified = followers >= 1000;

  const toggleGame = (game: string) => {
    setSelectedGames((current) => (current.includes(game) ? current.filter((item) => item !== game) : [...current, game]));
  };

  return (
    <main dir="rtl" className="font-vazir min-h-screen w-full overflow-x-hidden px-3 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-6 sm:mb-8">
          <p className="mb-2 text-xs text-primary sm:text-sm">حساب کاربری</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-black text-foreground sm:text-3xl">پروفایل</h1>

              <p className="mt-2 text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">پروفایل، فعالیت‌ها و مشخصات گیمینگ خود را مدیریت کنید.</p>
            </div>

            <button
              type="button"
              onClick={() => setEditing((value) => !value)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover active:scale-[.98] sm:h-12 sm:w-auto"
            >
              {editing ? (
                <>
                  <FiCheck size={17} />
                  ذخیره تغییرات
                </>
              ) : (
                <>
                  <FiEdit3 size={17} />
                  ویرایش پروفایل
                </>
              )}
            </button>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-border bg-surface/50 backdrop-blur-xl">
          <div className="relative h-32 overflow-hidden sm:h-44 md:h-56">
            <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-background-secondary to-primary/5" />

            <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />

            <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background/90 to-transparent" />

            {editing && (
              <button
                type="button"
                aria-label="تغییر کاور"
                className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/70 text-foreground backdrop-blur-xl transition hover:border-primary hover:text-primary sm:left-5 sm:top-5"
              >
                <FiCamera size={18} />
              </button>
            )}
          </div>

          <div className="relative px-4 pb-5 sm:px-7 sm:pb-7">
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 lg:flex-row lg:items-end">
              <div className="relative mx-auto lg:mx-0">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-surface bg-background-secondary text-3xl font-black text-primary shadow-[0_0_45px_rgba(212,175,55,.16)] sm:h-32 sm:w-32">
                  S
                </div>

                <span className="absolute bottom-2 left-2 h-5 w-5 rounded-full border-4 border-surface bg-success" />

                {editing && (
                  <button
                    type="button"
                    aria-label="تغییر تصویر پروفایل"
                    className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:border-primary hover:text-primary"
                  >
                    <FiCamera size={16} />
                  </button>
                )}
              </div>

              <div className="min-w-0 flex-1 text-center lg:pb-1 lg:text-right">
                <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  <h2 className="text-2xl font-black text-foreground">jaki</h2>

                  {isVerified && (
                    <button type="button" title="این حساب بیش از ۱۰۰۰ دنبال‌کننده دارد" className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-white">
                      <FiCheck size={14} strokeWidth={3} />
                    </button>
                  )}

                  <span className="rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold text-success">آنلاین</span>
                </div>

                <p className="mt-1 text-xs text-muted sm:text-sm">@jaki</p>

                <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7 lg:mx-0">عاشق بازی، رقابت و پیدا کردن هم‌تیمی‌های جدید.</p>
              </div>

              <div className="grid w-full grid-cols-[1fr_1fr_auto] gap-2 lg:w-auto">
                <button
                  type="button"
                  onClick={() => setFollowing((value) => !value)}
                  className={`flex h-11 items-center justify-center gap-2 rounded-xl px-3 text-xs font-bold transition-all sm:h-12 sm:px-4 sm:text-sm ${
                    following ? "border border-border bg-background-secondary text-foreground" : "bg-primary text-background hover:bg-primary-hover"
                  }`}
                >
                  <FiUsers size={16} />

                  <span className="hidden xs:inline sm:inline">{following ? "دنبال می‌کنید" : "دنبال کردن"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFriendRequested((value) => !value)}
                  className={`flex h-11 items-center justify-center gap-2 rounded-xl border px-3 text-xs font-semibold transition-all sm:h-12 sm:px-4 sm:text-sm ${
                    friendRequested ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-background-secondary text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  <FiUsers size={16} />

                  <span className="hidden sm:inline">{friendRequested ? "درخواست ارسال شد" : "درخواست دوستی"}</span>
                </button>

                <button
                  type="button"
                  aria-label="ارسال پیام"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background-secondary text-muted transition hover:border-primary hover:text-primary sm:h-12 sm:w-12"
                >
                  <FiMessageCircle size={17} />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 divide-x divide-x-reverse divide-border rounded-2xl border border-border bg-background-secondary/50">
              <ProfileSocialStat value={friends.toString()} label="دوستان" />

              <ProfileSocialStat value={followers.toLocaleString("en-US")} label="دنبال‌کننده" />

              <ProfileSocialStat value={followingCount.toLocaleString("en-US")} label="دنبال‌شونده" />
            </div>
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:grid-cols-4 sm:gap-4">
          <ProfileStat label="بازی‌ها" value="8" icon={<FiZap size={18} />} />

          <ProfileStat label="XP" value="1,250" icon={<FiStar size={18} />} />

          <ProfileStat label="فعالیت" value="86" icon={<FiAward size={18} />} />

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3.5 backdrop-blur-xl sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-10 sm:w-10">
                <span className="text-lg font-black">N</span>
              </div>

              <span className="text-[10px] text-muted sm:text-xs">NEX Coin</span>
            </div>

            <p className="mt-3 text-xl font-black text-primary sm:mt-4 sm:text-2xl">100</p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:mt-8 sm:p-7">
          <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground sm:text-lg">کارت‌های کلکسیونی</h2>

              <p className="mt-1 text-xs text-muted sm:text-sm">کارت‌هایی که در پروفایل خود جمع‌آوری کرده‌اید.</p>
            </div>

            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold text-primary sm:text-xs">{collectionCards.length} کارت</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {collectionCards.map((card) => (
              <CollectionCard key={card.name} card={card} />
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:mt-8 sm:p-7">
          <div className="mb-5 sm:mb-6">
            <h2 className="text-base font-bold text-foreground sm:text-lg">اطلاعات شخصی</h2>

            <p className="mt-1 text-xs text-muted sm:text-sm">اطلاعات اصلی حساب کاربری</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            <ProfileField icon={<FiUser size={17} />} label="نام نمایشی" value="jaki" editing={editing} />

            <ProfileField icon={<FiUser size={17} />} label="نام کاربری" value="@jaki" editing={editing} />

            <ProfileField icon={<FiMail size={17} />} label="ایمیل" value="jaki@example.com" editing={editing} />

            <ProfileField icon={<FiPhone size={17} />} label="شماره تلفن" value="ثبت نشده" editing={editing} />
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:mt-8 sm:p-7">
          <div className="mb-5 sm:mb-6">
            <h2 className="text-base font-bold text-foreground sm:text-lg">اطلاعات گیمینگ</h2>

            <p className="mt-1 text-xs text-muted sm:text-sm">سطح، جنسیت و بازی‌های مورد علاقه شما</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            <div>
              <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">جنسیت</label>

              {editing ? (
                <select
                  defaultValue="male"
                  className="h-12 w-full rounded-2xl border border-border bg-background-secondary px-4 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15 sm:h-14 sm:px-5"
                >
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                  <option value="other">سایر</option>
                  <option value="private">نمایش نده</option>
                </select>
              ) : (
                <div className="flex h-12 items-center justify-between rounded-2xl border border-border bg-background-secondary px-4 sm:h-14 sm:px-5">
                  {showGender ? <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">مرد</span> : <span className="text-xs text-muted">جنسیت مخفی است</span>}

                  <button type="button" onClick={() => setShowGender((value) => !value)} className="text-xs font-semibold text-muted transition hover:text-primary">
                    {showGender ? "مخفی کردن" : "نمایش دادن"}
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">سطح گیمینگ</label>

              {editing ? (
                <select
                  defaultValue="advanced"
                  className="h-12 w-full rounded-2xl border border-border bg-background-secondary px-4 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15 sm:h-14 sm:px-5"
                >
                  <option value="beginner">مبتدی</option>
                  <option value="intermediate">متوسط</option>
                  <option value="advanced">حرفه‌ای</option>
                  <option value="pro">نخبه</option>
                </select>
              ) : (
                <div className="flex h-12 items-center rounded-2xl border border-border bg-background-secondary px-4 text-sm text-foreground sm:h-14 sm:px-5">حرفه‌ای</div>
              )}
            </div>
          </div>

          <div className="mt-6 sm:mt-7">
            <label className="mb-3 block text-xs font-medium text-foreground sm:mb-4 sm:text-sm">بازی‌های مورد علاقه</label>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
              {games.map((game) => {
                const selected = selectedGames.includes(game);

                return (
                  <button
                    key={game}
                    type="button"
                    disabled={!editing}
                    onClick={() => toggleGame(game)}
                    className={`flex min-h-12 items-center justify-center rounded-2xl border px-2 text-center text-xs font-medium transition-all duration-300 sm:min-h-14 sm:px-3 sm:text-sm ${
                      selected ? "border-primary bg-primary/10 text-primary" : "border-border bg-background-secondary text-foreground hover:border-primary/50 hover:text-primary"
                    } ${!editing ? "cursor-default" : ""}`}
                  >
                    {game}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 sm:mt-7">
            <label className="mb-2 block text-xs font-medium text-foreground sm:text-sm">درباره من</label>

            {editing ? (
              <textarea
                defaultValue="عاشق بازی، رقابت و پیدا کردن هم‌تیمی‌های جدید."
                rows={4}
                className="w-full resize-none rounded-2xl border border-border bg-background-secondary p-4 text-xs leading-6 text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15 sm:text-sm sm:leading-7"
              />
            ) : (
              <div className="rounded-2xl border border-border bg-background-secondary p-4 text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">
                عاشق بازی، رقابت و پیدا کردن هم‌تیمی‌های جدید.
              </div>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:mt-8 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <FiShield size={19} className="text-primary" />

                <h2 className="text-base font-bold text-foreground sm:text-lg">امنیت حساب</h2>
              </div>

              <p className="mt-2 text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">برای تغییر رمز عبور و مدیریت امنیت حساب از این بخش استفاده کنید.</p>
            </div>

            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-border px-5 text-xs font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:h-12 sm:w-auto sm:text-sm"
            >
              <FiLock size={16} />
              تغییر رمز عبور
            </button>
          </div>
        </section>

        <div className="h-6 sm:h-8" />
      </div>
    </main>
  );
}

function ProfileSocialStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-center px-2 py-4 sm:py-5">
      <p className="text-base font-black text-foreground sm:text-lg">{value}</p>

      <p className="mt-1 text-[10px] text-muted sm:text-xs">{label}</p>
    </div>
  );
}

function ProfileStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/50 p-3.5 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-10 sm:w-10">{icon}</div>

        <p className="text-[10px] text-muted sm:text-xs">{label}</p>
      </div>

      <p className="mt-3 text-xl font-black text-foreground sm:mt-4 sm:text-2xl">{value}</p>
    </div>
  );
}

function CollectionCard({
  card,
}: {
  card: {
    name: string;
    game: string;
    level: string;
    rarity: string;
    symbol: string;
    description: string;
  };
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/15 via-surface to-background-secondary p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 sm:p-5">
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-2xl font-black text-primary shadow-[0_0_30px_rgba(212,175,55,.1)] sm:h-20 sm:w-20">
            {card.symbol}
          </div>

          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">{card.rarity}</span>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-bold text-foreground">{card.name}</h3>

            <FiHeart size={15} className="shrink-0 text-primary transition-transform group-hover:scale-110" />
          </div>

          <p className="mt-1 text-xs text-muted">{card.game}</p>

          <p className="mt-2 text-xs leading-6 text-foreground-secondary">{card.description}</p>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FiAward size={13} />
            </div>

            <span className="text-[10px] text-foreground-secondary sm:text-xs">سطح کارت: {card.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ icon, label, value, editing }: { icon: React.ReactNode; label: string; value: string; editing: boolean }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-medium text-foreground sm:text-sm">
        <span className="text-muted">{icon}</span>
        {label}
      </label>

      {editing ? (
        <input
          type="text"
          defaultValue={value === "ثبت نشده" ? "" : value}
          placeholder={value === "ثبت نشده" ? value : ""}
          className="h-12 w-full rounded-2xl border border-border bg-background-secondary px-4 text-xs text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15 sm:h-14 sm:px-5 sm:text-sm"
        />
      ) : (
        <div className="flex h-12 items-center overflow-hidden rounded-2xl border border-border bg-background-secondary px-4 text-xs text-foreground-secondary sm:h-14 sm:px-5 sm:text-sm">{value}</div>
      )}
    </div>
  );
}
