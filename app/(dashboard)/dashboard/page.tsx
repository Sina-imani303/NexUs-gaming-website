"use client";

import Link from "next/link";
import { FiBell, FiChevronLeft, FiHeart, FiPlay, FiPlus, FiStar, FiUsers, FiUserPlus, FiZap } from "react-icons/fi";

export default function DashboardPage() {
  const favoriteGames = [
    {
      name: "Valorant",
      short: "VAL",
      players: "5v5",
    },
    {
      name: "Counter Strike 2",
      short: "CS2",
      players: "5v5",
    },
    {
      name: "PUBG",
      short: "PUBG",
      players: "Battle Royale",
    },
    {
      name: "Fortnite",
      short: "FN",
      players: "Battle Royale",
    },
  ];

  const onlineFriends = [
    {
      name: "Alex",
      username: "@alex",
      game: "Valorant",
      level: 14,
      status: "در حال بازی",
    },
    {
      name: "Reza",
      username: "@reza",
      game: "CS2",
      level: 11,
      status: "در حال بازی",
    },
    {
      name: "Amir",
      username: "@amir",
      game: "PUBG",
      level: 8,
      status: "در حال بازی",
    },
  ];

  const notifications = [
    {
      icon: <FiUserPlus size={17} />,
      title: "درخواست دوستی جدید",
      description: "Ashkan برای شما درخواست دوستی فرستاد.",
      time: "۵ دقیقه پیش",
    },
    {
      icon: <FiHeart size={17} />,
      title: "دنبال‌کننده جدید",
      description: "Reza شما را دنبال کرد.",
      time: "۲۵ دقیقه پیش",
    },
    {
      icon: <FiZap size={17} />,
      title: "NEX Coin دریافت کردی",
      description: "۲۰ NEX به موجودی شما اضافه شد.",
      time: "۱ ساعت پیش",
    },
  ];

  const activities = [
    {
      icon: <FiZap size={18} />,
      title: "Level Up",
      description: "به Level 8 رسیدی",
      time: "۲ ساعت پیش",
    },
    {
      icon: <FiUsers size={18} />,
      title: "Friend Added",
      description: "Alex به دوستانت اضافه شد",
      time: "۵ ساعت پیش",
    },
    {
      icon: <FiPlay size={18} />,
      title: "Game Added",
      description: "Valorant به بازی‌های مورد علاقه اضافه شد",
      time: "دیروز",
    },
  ];

  return (
    <main dir="rtl" className="font-vazir min-h-screen w-full overflow-x-hidden px-3 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="mb-1.5 text-xs font-medium text-primary sm:mb-2 sm:text-sm">داشبورد NexUs</p>

            <h1 className="truncate text-xl font-black text-foreground sm:text-2xl md:text-3xl">سلام jaki 👋</h1>

            <p className="mt-1.5 text-xs leading-6 text-foreground-secondary sm:mt-2 sm:text-sm sm:leading-7">آماده‌ای امروز یه بازی خوب داشته باشی؟</p>
          </div>

          <Link
            href="/notifications"
            className="relative flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-2xl border border-border bg-surface/70 text-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:h-12 sm:w-12 sm:self-auto"
            aria-label="اعلان‌ها"
          >
            <FiBell size={19} />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary" />
          </Link>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-4 backdrop-blur-xl sm:p-6 md:p-7">
          <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl sm:h-48 sm:w-48" />

          <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl sm:h-56 sm:w-56" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-lg font-black text-primary sm:h-16 sm:w-16 sm:text-xl">
                08
              </div>

              <div className="min-w-0">
                <p className="text-xs text-foreground-secondary sm:text-sm">سطح فعلی</p>

                <h2 className="mt-1 text-lg font-bold text-foreground sm:text-xl">Level 8</h2>

                <p className="mt-1 text-[11px] text-muted sm:text-xs">750 XP تا Level 9</p>
              </div>
            </div>
            <div className="w-full lg:max-w-md lg:flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted sm:text-sm">XP</p>

                <p className="text-lg font-black text-primary sm:text-xl">
                  1,250
                  <span className="text-xs font-medium text-muted sm:text-sm"> / 2,000</span>
                </p>
              </div>

              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-background/60 sm:mt-3 sm:h-2.5">
                <div className="h-full w-[62%] rounded-full bg-primary" />
              </div>

              <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted sm:mt-2 sm:text-[11px]">
                <span>پیشرفت تا Level 9</span>
                <span>62%</span>
              </div>
            </div>

            <Link
              href="/coins"
              className="group flex w-full min-w-0 items-center gap-3 rounded-2xl border border-primary/20 bg-background/30 p-3 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 sm:gap-4 sm:p-4 lg:w-auto lg:min-w-52"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xl transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14 sm:text-2xl">
                🪙
              </div>

              <div className="min-w-0">
                <p className="text-[11px] text-muted sm:text-xs">موجودی شما</p>

                <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1 sm:gap-2">
                  <span className="text-xl font-black text-primary sm:text-2xl">100</span>

                  <span className="text-xs font-bold text-foreground sm:text-sm">NEX</span>
                </div>

                <p className="mt-0.5 text-[10px] text-muted sm:mt-1 sm:text-[11px]">مشاهده کیف پول</p>
              </div>

              <FiChevronLeft size={16} className="mr-auto shrink-0 text-muted transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-primary sm:h-4.25 sm:w-4.25" />
            </Link>
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4 xl:grid-cols-4">
          <StatCard icon={<FiUsers size={19} />} label="دوستان" value="24" description="۳ نفر آنلاین" />

          <StatCard icon={<FiHeart size={19} />} label="دنبال‌کننده‌ها" value="128" description="۱۲ نفر جدید این ماه" />

          <StatCard icon={<FiUserPlus size={19} />} label="دنبال‌شونده‌ها" value="86" description="افرادی که دنبال می‌کنی" />

          <StatCard icon={<FiStar size={19} />} label="امتیاز" value="1,250" description="XP کسب شده" />
        </section>
        <section className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 xl:grid-cols-2">
          <div className="flex h-full min-w-0 flex-col rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6 sm:items-center">
              <div className="min-w-0">
                <h2 className="text-base font-bold text-foreground sm:text-lg">دوستان آنلاین</h2>

                <p className="mt-1 text-xs text-muted sm:text-sm">دوستانی که الان آنلاین هستند</p>
              </div>

              <span className="shrink-0 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-semibold text-success sm:px-3 sm:text-xs">3 آنلاین</span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {onlineFriends.map((friend) => (
                <Link
                  key={friend.username}
                  href={`/profile/${friend.username.replace("@", "")}`}
                  className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-transparent p-2.5 transition hover:border-border hover:bg-surface-hover sm:gap-3 sm:p-3"
                >
                  <div className="relative shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary sm:h-12 sm:w-12">{friend.name.charAt(0)}</div>

                    <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-surface bg-success sm:h-3.5 sm:w-3.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">{friend.name}</h3>

                        <p className="truncate text-[10px] text-muted sm:text-xs">{friend.username}</p>
                      </div>

                      <span className="shrink-0 text-[10px] text-primary sm:text-xs">Lv. {friend.level}</span>
                    </div>

                    <p className="mt-1 flex min-w-0 items-center gap-1 truncate text-[10px] text-foreground-secondary sm:text-xs">
                      <FiPlay size={11} className="shrink-0 sm:h-3.25 sm:w-3.25" />
                      {friend.status} {friend.game}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/friends"
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-border text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary sm:h-12 sm:text-sm"
            >
              مشاهده همه دوستان
              <FiChevronLeft size={15} />
            </Link>
          </div>

          <div className="flex h-full min-w-0 flex-col rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6 sm:items-center">
              <div className="min-w-0">
                <h2 className="text-base font-bold text-foreground sm:text-lg">اعلان‌های اخیر</h2>

                <p className="mt-1 text-xs text-muted sm:text-sm">آخرین اتفاقات حساب شما</p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-10 sm:w-10">
                <FiBell size={17} />
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              {notifications.map((notification, index) => (
                <div key={`${notification.title}-${index}`} className="flex min-w-0 gap-2.5 rounded-2xl p-2.5 transition hover:bg-surface-hover sm:gap-3 sm:p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11">{notification.icon}</div>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                      <h3 className="truncate text-sm font-semibold text-foreground">{notification.title}</h3>

                      <span className="shrink-0 text-[9px] text-muted sm:text-[11px]">{notification.time}</span>
                    </div>

                    <p className="mt-1 truncate text-xs leading-6 text-foreground-secondary sm:text-sm">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/notifications"
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-border text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary sm:h-12 sm:text-sm"
            >
              مشاهده همه اعلان‌ها
              <FiChevronLeft size={15} />
            </Link>
          </div>
        </section>
        <section className="mt-6 sm:mt-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-base font-bold text-foreground sm:text-lg">بازی‌های مورد علاقه</h2>

              <p className="mt-1 truncate text-xs text-muted sm:text-sm">بازی‌هایی که بیشتر دنبال می‌کنی</p>
            </div>

            <Link href="/games" className="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary transition hover:text-primary-hover sm:text-sm">
              مشاهده همه
              <FiChevronLeft size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
            {favoriteGames.map((game) => (
              <Link
                key={game.name}
                href="/games"
                className="group flex min-w-0 items-center gap-2 rounded-2xl border border-border bg-surface/60 p-3 text-right backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface-hover sm:gap-4 sm:p-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-[9px] font-black text-primary transition group-hover:bg-primary group-hover:text-background sm:h-14 sm:w-14 sm:rounded-2xl sm:text-xs">
                  {game.short}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-xs font-bold text-foreground sm:text-sm">{game.name}</h3>

                  <p className="mt-1 truncate text-[9px] text-muted sm:text-xs">{game.players}</p>
                </div>

                <FiChevronLeft size={14} className="mr-auto shrink-0 text-muted transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-primary sm:h-4 sm:w-4" />
              </Link>
            ))}
          </div>
        </section>
        <section className="mt-6 sm:mt-8">
          <div className="rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
              <div className="min-w-0">
                <h2 className="text-base font-bold text-foreground sm:text-lg">فعالیت اخیر</h2>

                <p className="mt-1 text-xs text-muted sm:text-sm">آخرین فعالیت‌های حساب شما</p>
              </div>

              <FiZap size={19} className="shrink-0 text-primary sm:h-5.25 sm:w-5.25" />
            </div>

            <div className="grid grid-cols-1 gap-1.5 lg:grid-cols-3 lg:gap-2">
              {activities.map((activity, index) => (
                <div key={`${activity.title}-${index}`} className="flex min-w-0 gap-3 rounded-2xl p-2.5 transition hover:bg-surface-hover sm:gap-4 sm:p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11">{activity.icon}</div>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold text-foreground">{activity.title}</h3>

                      <span className="shrink-0 text-[9px] text-muted sm:text-[11px]">{activity.time}</span>
                    </div>

                    <p className="mt-1 truncate text-xs leading-6 text-foreground-secondary sm:text-sm">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-border text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary sm:h-12 sm:text-sm"
            >
              مشاهده فعالیت‌ها
              <FiChevronLeft size={15} />
            </button>
          </div>
        </section>
        <section className="mt-6 rounded-3xl border border-primary/15 bg-primary/5 p-4 backdrop-blur-xl sm:mt-8 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11">
                  <FiUsers size={18} />
                </div>

                <h2 className="text-sm font-bold text-foreground sm:text-base">دنبال هم‌تیمی می‌گردی؟</h2>
              </div>

              <p className="mt-2.5 text-xs leading-6 text-foreground-secondary sm:mt-3 sm:text-sm sm:leading-7">بازیکن‌هایی با بازی‌های مورد علاقه مشابه خودت پیدا کن.</p>
            </div>

            <Link
              href="/friends"
              className="flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-background transition hover:-translate-y-0.5 hover:bg-primary-hover active:scale-[.98] sm:h-12 sm:w-auto sm:px-6"
            >
              <FiPlus size={17} />
              پیدا کردن بازیکن
            </Link>
          </div>
        </section>

        <div className="h-6 sm:h-8" />
      </div>
    </main>
  );
}

function StatCard({ icon, label, value, description }: { icon: React.ReactNode; label: string; value: string; description: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-surface/50 p-3 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-10 sm:w-10">{icon}</div>

        <span className="truncate text-[10px] text-muted sm:text-xs">{label}</span>
      </div>

      <p className="mt-3 text-xl font-black text-foreground sm:mt-4 sm:text-2xl">{value}</p>

      <p className="mt-1 truncate text-[10px] text-muted sm:text-xs">{description}</p>
    </div>
  );
}
