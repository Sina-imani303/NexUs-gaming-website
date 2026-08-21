"use client";

import Link from "next/link";
import { FiArrowRight, FiCheck, FiSearch, FiUserPlus } from "react-icons/fi";

const friends = [
  {
    username: "armin",
    name: "Armin",
    avatar: "A",
    level: 18,
    online: true,
    verified: true,
    game: "Valorant",
    bio: "گیمر، سازنده محتوا و عاشق رقابت 🎮",
    followers: 1240,
    following: 310,
    friends: 86,
  },
  {
    username: "ali",
    name: "Ali",
    avatar: "A",
    level: 12,
    online: false,
    verified: false,
    game: "CS2",
    bio: "Competitive player",
    followers: 680,
    following: 240,
    friends: 54,
  },
  {
    username: "sina",
    name: "Sina",
    avatar: "S",
    level: 8,
    online: true,
    verified: false,
    game: "PUBG",
    bio: "Gaming & Community",
    followers: 420,
    following: 190,
    friends: 31,
  },
  {
    username: "reza",
    name: "Reza",
    avatar: "R",
    level: 15,
    online: false,
    verified: true,
    game: "Apex Legends",
    bio: "Looking for teammates",
    followers: 930,
    following: 270,
    friends: 72,
  },
  {
    username: "amir",
    name: "Amir",
    avatar: "A",
    level: 10,
    online: true,
    verified: false,
    game: "Fortnite",
    bio: "Let's play together 🔥",
    followers: 510,
    following: 180,
    friends: 43,
  },
];

export default function FriendsPage() {
  return (
    <main dir="rtl" className="font-vazir min-h-screen w-full bg-background px-3 py-5 text-foreground sm:px-5 sm:py-7 md:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-6 flex items-center gap-3 sm:mb-8">
          <Link
            href="/profile"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface/70 text-muted transition-all duration-300 hover:border-primary hover:text-primary"
            aria-label="بازگشت به پروفایل"
          >
            <FiArrowRight size={19} />
          </Link>

          <div>
            <p className="text-[10px] font-black tracking-[4px] text-primary">NΞXUS</p>

            <h1 className="mt-1 text-2xl font-black text-foreground sm:text-3xl">دوستان</h1>
          </div>
        </header>

        <section className="mb-5 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:p-5">
          <div className="relative">
            <FiSearch size={19} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />

            <input
              type="search"
              placeholder="جستجوی دوستان..."
              className="h-13 w-full rounded-2xl border border-border bg-background-secondary pr-11 pl-4 text-sm text-foreground outline-none transition-all placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-foreground">دوستان من</p>

              <p className="mt-1 text-[10px] text-muted sm:text-xs">{friends.length} نفر در لیست دوستان شما</p>
            </div>

            <button
              type="button"
              className="flex h-10 shrink-0 items-center gap-2 rounded-xl border border-border px-3 text-xs font-bold text-foreground transition hover:border-primary hover:text-primary"
            >
              <FiUserPlus size={15} />
              افزودن دوست
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-border bg-surface/50 backdrop-blur-xl">
          {friends.map((friend, index) => (
            <Link
              key={friend.username}
              href={`/profile/${friend.username}`}
              className={`group block p-4 transition-all duration-300 hover:bg-surface-hover sm:p-5 ${index !== friends.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="relative shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-linear-to-br from-primary/20 via-background-secondary to-primary/5 text-xl font-black text-primary transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_25px_rgba(212,175,55,.12)] sm:h-16 sm:w-16">
                    {friend.avatar}
                  </div>

                  {friend.online && <span className="absolute -bottom-1 -left-1 h-4 w-4 rounded-full border-[3px] border-surface bg-success" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-black text-foreground transition group-hover:text-primary sm:text-base">{friend.name}</h2>

                    {friend.verified && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success text-white">
                        <FiCheck size={10} strokeWidth={3} />
                      </span>
                    )}

                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">Level {friend.level}</span>
                  </div>

                  <p dir="ltr" className="mt-1 text-right text-[10px] text-muted sm:text-xs">
                    @{friend.username}
                  </p>

                  <p className="mt-1 truncate text-[10px] text-foreground-secondary sm:text-xs">{friend.bio}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[9px] text-muted sm:gap-4 sm:text-[10px]">
                    <span>{friend.followers.toLocaleString("en-US")} دنبال‌کننده</span>

                    <span>{friend.following.toLocaleString("en-US")} دنبال‌شونده</span>

                    <span>{friend.friends.toLocaleString("en-US")} دوست</span>

                    <span className="text-primary">{friend.game}</span>
                  </div>
                </div>

                <div className="hidden shrink-0 items-center gap-2 text-xs font-bold text-muted transition group-hover:text-primary sm:flex">
                  مشاهده پروفایل
                  <FiArrowRight size={15} />
                </div>

                <FiArrowRight size={17} className="shrink-0 text-muted transition group-hover:text-primary sm:hidden" />
              </div>
            </Link>
          ))}
        </section>

        <p className="mt-5 text-center text-[10px] text-muted sm:text-xs">روی هر شخص بزنید تا پروفایل کامل او را ببینید.</p>
      </div>
    </main>
  );
}
