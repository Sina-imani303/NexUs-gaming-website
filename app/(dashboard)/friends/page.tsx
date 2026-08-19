"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiCheck, FiChevronLeft, FiHeart, FiMessageCircle, FiMoreHorizontal, FiPlay, FiUserPlus, FiUsers } from "react-icons/fi";

type ProfileData = {
  name: string;
  username: string;
  level: number;
  followers: number;
  following: number;
  friends: number;
  online: boolean;
  playing?: string;
  verified: boolean;
  gender: "male" | "female";
  bio: string;
  joined: string;
};

const profiles: Record<string, ProfileData> = {
  ashkan: {
    name: "Ashkan",
    username: "@ashkan",
    level: 18,
    followers: 1240,
    following: 310,
    friends: 86,
    online: true,
    playing: "Valorant",
    verified: true,
    gender: "male",
    bio: "گیمر، سازنده محتوا و عاشق رقابت 🎮",
    joined: "عضو از ۱۴۰۴",
  },
  reza: {
    name: "Reza",
    username: "@reza",
    level: 15,
    followers: 428,
    following: 185,
    friends: 64,
    online: true,
    playing: "Valorant",
    verified: false,
    gender: "male",
    bio: "Valorant player • Competitive gamer",
    joined: "عضو از ۱۴۰۴",
  },
  amir: {
    name: "Amir",
    username: "@amir",
    level: 10,
    followers: 156,
    following: 92,
    friends: 31,
    online: true,
    playing: "CS2",
    verified: false,
    gender: "male",
    bio: "CS2 و بازی‌های رقابتی 🎯",
    joined: "عضو از ۱۴۰۴",
  },
  mahan: {
    name: "Mahan",
    username: "@mahan",
    level: 18,
    followers: 721,
    following: 203,
    friends: 72,
    online: true,
    playing: "PUBG",
    verified: false,
    gender: "male",
    bio: "PUBG lover 🔥",
    joined: "عضو از ۱۴۰۴",
  },
};

const games = [
  {
    name: "Valorant",
    category: "FPS",
    level: "حرفه‌ای",
    color: "from-red-500/25",
  },
  {
    name: "Counter Strike 2",
    category: "FPS",
    level: "پیشرفته",
    color: "from-orange-500/25",
  },
  {
    name: "PUBG",
    category: "Battle Royale",
    level: "حرفه‌ای",
    color: "from-yellow-500/25",
  },
];

const collections = [
  {
    name: "Valorant",
    description: "کارت بازیکن حرفه‌ای",
    rarity: "Legendary",
    color: "from-red-500/30",
  },
  {
    name: "Mario",
    description: "کارت قهرمان کلاسیک",
    rarity: "Epic",
    color: "from-blue-500/30",
  },
  {
    name: "PUBG",
    description: "کارت Survivor",
    rarity: "Rare",
    color: "from-yellow-500/30",
  },
];

export default function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const [following, setFollowing] = useState(false);
  const [friendRequested, setFriendRequested] = useState(false);

  const [profileKey, setProfileKey] = useState("ashkan");

  useState(() => {
    params.then((value) => {
      const normalized = value.username.toLowerCase().replace("@", "");

      if (profiles[normalized]) {
        setProfileKey(normalized);
      }
    });
  });
  const profile = profiles[profileKey];

  if (!profile) {
    return (
      <main dir="rtl" className="font-vazir flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-border bg-surface/60 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FiUsers size={28} />
          </div>

          <h1 className="mt-5 text-xl font-black text-foreground">کاربر پیدا نشد</h1>

          <p className="mt-2 text-sm leading-7 text-muted">این کاربر وجود ندارد یا ممکن است حساب او حذف شده باشد.</p>

          <Link href="/friends" className="mt-6 flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-bold text-background transition hover:bg-primary-hover">
            <FiArrowRight size={17} />
            بازگشت به دوستان
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main dir="rtl" className="font-vazir min-h-screen w-full overflow-x-hidden px-3 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/friends"
            className="flex h-10 items-center gap-2 rounded-xl border border-border bg-surface/60 px-3 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary sm:h-11 sm:px-4 sm:text-sm"
          >
            <FiArrowRight size={16} />
            بازگشت
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/60 text-muted transition hover:border-primary hover:text-primary"
            aria-label="گزینه‌های بیشتر"
          >
            <FiMoreHorizontal size={19} />
          </button>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-border bg-surface/50 backdrop-blur-xl">
          <div className="relative h-36 overflow-hidden bg-linear-to-br from-primary/25 via-background-secondary to-background sm:h-48 md:h-56">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />

            <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-primary/5 blur-[80px]" />

            <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />
          </div>

          <div className="relative px-4 pb-5 sm:px-7 sm:pb-7">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-16">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-3 sm:gap-5">
                  <div className="relative shrink-0">
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-background bg-primary/10 text-3xl font-black text-primary shadow-2xl sm:h-32 sm:w-32 sm:text-4xl">
                      {profile.name.charAt(0)}
                    </div>

                    <span
                      className={`absolute bottom-1 left-1 h-5 w-5 rounded-full border-[3px] border-background sm:bottom-2 sm:left-2 sm:h-6 sm:w-6 ${profile.online ? "bg-success" : "bg-muted"}`}
                    />
                  </div>

                  <div className="min-w-0 pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="truncate text-xl font-black text-foreground sm:text-2xl md:text-3xl">{profile.name}</h1>

                      {profile.verified && (
                        <span title="حساب تأیید شده" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-white sm:h-7 sm:w-7">
                          <FiCheck size={14} strokeWidth={3} />
                        </span>
                      )}

                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${profile.gender === "male" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"}`}>
                        {profile.gender === "male" ? "پسر" : "دختر"}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-muted sm:text-sm">{profile.username}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-muted sm:gap-3 sm:text-xs">
                      <span>Level {profile.level}</span>

                      <span className="h-1 w-1 rounded-full bg-border" />

                      <span>{profile.online ? `در حال بازی ${profile.playing}` : "آفلاین"}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={() => setFollowing(!following)}
                    className={`flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold transition sm:h-12 sm:px-5 sm:text-sm ${
                      following ? "border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15" : "bg-primary text-background hover:bg-primary-hover"
                    }`}
                  >
                    <FiHeart size={16} className={following ? "fill-current" : ""} />
                    {following ? "دنبال می‌کنی" : "دنبال کردن"}
                  </button>

                  <Link
                    href={`/chat?user=${profile.username.replace("@", "")}`}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background-secondary px-4 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary sm:h-12 sm:px-5 sm:text-sm"
                  >
                    <FiMessageCircle size={17} />
                    پیام
                  </Link>
                </div>
              </div>

              <p className="max-w-2xl text-xs leading-7 text-foreground-secondary sm:text-sm sm:leading-7">{profile.bio}</p>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                <ProfileStat value={profile.followers.toLocaleString("fa-IR")} label="دنبال‌کننده" />

                <ProfileStat value={profile.following.toLocaleString("fa-IR")} label="دنبال‌شونده" />

                <ProfileStat value={profile.friends.toLocaleString("fa-IR")} label="دوستان" />

                <ProfileStat value={`Lv.${profile.level}`} label="سطح" primary />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setFriendRequested(!friendRequested)}
                  className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition sm:h-12 sm:text-sm ${
                    friendRequested ? "border-success/30 bg-success/5 text-success" : "border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {friendRequested ? (
                    <>
                      <FiCheck size={16} />
                      درخواست ارسال شد
                    </>
                  ) : (
                    <>
                      <FiUserPlus size={16} />
                      درخواست دوستی
                    </>
                  )}
                </button>

                <Link
                  href={`/profile/${profile.username.replace("@", "")}/collections`}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary sm:h-12 sm:text-sm"
                >
                  <FiStarIcon />
                  کارت‌های کلکسیونی
                </Link>
              </div>

              <div className="border-t border-border pt-4 text-[10px] text-muted sm:text-xs">{profile.joined}</div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-foreground sm:text-lg">بازی‌های مورد علاقه</h2>

              <p className="mt-1 text-[10px] text-muted sm:text-xs">بازی‌هایی که در پروفایل این کاربر نمایش داده می‌شوند.</p>
            </div>

            <FiPlay size={20} className="text-primary" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <GameProfileCard key={game.name} game={game} />
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-foreground sm:text-lg">کارت‌های کلکسیونی</h2>

              <p className="mt-1 text-[10px] text-muted sm:text-xs">مجموعه کارت‌های باز شده توسط {profile.name}</p>
            </div>

            <Link href={`/profile/${profile.username.replace("@", "")}/collections`} className="flex items-center gap-1 text-xs font-semibold text-primary">
              مشاهده همه
              <FiChevronLeft size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {collections.map((card) => (
              <CollectionCard key={card.name} card={card} />
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground sm:text-lg">ارتباط با {profile.name}</h2>

              <p className="mt-1 text-xs leading-6 text-muted sm:text-sm">می‌توانید این کاربر را دنبال کنید، به او پیام دهید یا درخواست دوستی ارسال کنید.</p>
            </div>

            <Link
              href={`/chat?user=${profile.username.replace("@", "")}`}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold text-background transition hover:bg-primary-hover sm:h-12 sm:text-sm"
            >
              <FiMessageCircle size={17} />
              شروع گفتگو
            </Link>
          </div>
        </section>

        <div className="h-8" />
      </div>
    </main>
  );
}

function ProfileStat({ value, label, primary = false }: { value: string; label: string; primary?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-background-secondary/60 p-3 text-center sm:p-4">
      <p className={`text-base font-black sm:text-xl ${primary ? "text-primary" : "text-foreground"}`}>{value}</p>

      <p className="mt-1 text-[9px] text-muted sm:text-xs">{label}</p>
    </div>
  );
}

function GameProfileCard({
  game,
}: {
  game: {
    name: string;
    category: string;
    level: string;
    color: string;
  };
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-background-secondary/60 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
      <div className={`pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-linear-to-br ${game.color} to-transparent blur-3xl`} />

      <div className="relative flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-sm font-black text-primary">
          {game.name
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-foreground">{game.name}</h3>

          <p className="mt-1 text-[10px] text-muted">{game.category}</p>

          <span className="mt-2 inline-flex rounded-full bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary">{game.level}</span>
        </div>
      </div>
    </div>
  );
}

function CollectionCard({
  card,
}: {
  card: {
    name: string;
    description: string;
    rarity: string;
    color: string;
  };
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-background-secondary/60 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
      <div className={`absolute inset-x-0 top-0 h-24 bg-linear-to-br ${card.color} to-transparent opacity-70`} />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-xs font-black text-primary">{card.name.slice(0, 2).toUpperCase()}</div>

          <span className="rounded-full bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary">{card.rarity}</span>
        </div>

        <h3 className="mt-6 text-sm font-bold text-foreground">{card.name}</h3>

        <p className="mt-1 text-[10px] leading-5 text-muted">{card.description}</p>
      </div>
    </div>
  );
}

function FiStarIcon() {
  return <span className="text-sm">✦</span>;
}
