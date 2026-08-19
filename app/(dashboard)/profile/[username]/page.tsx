"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiCheck, FiHeart, FiMessageCircle, FiPlay, FiUserPlus, FiUsers } from "react-icons/fi";

type ProfileUser = {
  name: string;
  username: string;
  level: number;
  followers: number;
  following: number;
  status: "online" | "gaming" | "offline";
  game?: string;
  verified: boolean;
  gender?: "male" | "female";
  bio: string;
  cover: string;
  avatar: string;
  games: {
    name: string;
    category: string;
    level: string;
    image: string;
  }[];
  cards: {
    name: string;
    game: string;
    rarity: string;
    description: string;
    image: string;
  }[];
};

const profileUsers: Record<string, ProfileUser> = {
  armin: {
    name: "Armin",
    username: "@armin",
    level: 18,
    followers: 1542,
    following: 126,
    status: "online",
    verified: true,
    gender: "male",
    bio: "Gamer | Valorant Player 🎮\nAlways ready for the next match.",
    cover: "/covers/default-cover.jpg",
    avatar: "",
    games: [
      {
        name: "Valorant",
        category: "FPS",
        level: "حرفه‌ای",
        image: "/games/valorant.jpg",
      },
      {
        name: "CS2",
        category: "FPS",
        level: "پیشرفته",
        image: "/games/cs2.jpg",
      },
      {
        name: "PUBG",
        category: "Battle Royale",
        level: "متوسط",
        image: "/games/pubg.jpg",
      },
    ],
    cards: [
      {
        name: "Valorant Master",
        game: "Valorant",
        rarity: "Epic",
        description: "بازیکن حرفه‌ای Valorant",
        image: "/cards/valorant.jpg",
      },
      {
        name: "CS2 Veteran",
        game: "Counter Strike 2",
        rarity: "Rare",
        description: "بازیکن باسابقه CS2",
        image: "/cards/cs2.jpg",
      },
      {
        name: "PUBG Hunter",
        game: "PUBG",
        rarity: "Legendary",
        description: "شکارچی میدان نبرد",
        image: "/cards/pubg.jpg",
      },
    ],
  },

  ali: {
    name: "Ali",
    username: "@ali",
    level: 12,
    followers: 684,
    following: 241,
    status: "gaming",
    game: "Valorant",
    verified: false,
    gender: "male",
    bio: "Just here to play 🎮",
    cover: "/covers/default-cover.jpg",
    avatar: "",
    games: [
      {
        name: "Valorant",
        category: "FPS",
        level: "پیشرفته",
        image: "/games/valorant.jpg",
      },
      {
        name: "Fortnite",
        category: "Battle Royale",
        level: "متوسط",
        image: "/games/fortnite.jpg",
      },
    ],
    cards: [
      {
        name: "Valorant Rookie",
        game: "Valorant",
        rarity: "Common",
        description: "شروع مسیر حرفه‌ای",
        image: "/cards/valorant.jpg",
      },
    ],
  },

  mahan: {
    name: "Mahan",
    username: "@mahan",
    level: 21,
    followers: 2387,
    following: 312,
    status: "online",
    verified: true,
    gender: "male",
    bio: "Competitive gamer ⚡\nLevel up. Play harder. Win more.",
    cover: "/covers/default-cover.jpg",
    avatar: "",
    games: [
      {
        name: "CS2",
        category: "FPS",
        level: "حرفه‌ای",
        image: "/games/cs2.jpg",
      },
      {
        name: "Apex Legends",
        category: "Battle Royale",
        level: "حرفه‌ای",
        image: "/games/apex.jpg",
      },
    ],
    cards: [
      {
        name: "CS2 Elite",
        game: "Counter Strike 2",
        rarity: "Legendary",
        description: "بازیکن Elite در CS2",
        image: "/cards/cs2.jpg",
      },
      {
        name: "Apex Master",
        game: "Apex Legends",
        rarity: "Epic",
        description: "بازیکن حرفه‌ای Apex",
        image: "/cards/apex.jpg",
      },
    ],
  },
};

export default function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const [userKey, setUserKey] = useState("armin");
  const [following, setFollowing] = useState(false);
  const [friendRequested, setFriendRequested] = useState(false);

  const user = profileUsers[userKey] ?? profileUsers.armin;

  const toggleFollowing = () => {
    setFollowing((current) => !current);
  };

  const sendFriendRequest = () => {
    setFriendRequested((current) => !current);
  };

  void params;
  void setUserKey;

  return (
    <main dir="rtl" className="font-vazir min-h-screen px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-5">
          <Link
            href="/users"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface/60 px-4 text-sm font-semibold text-muted transition-all duration-300 hover:border-primary hover:text-primary"
          >
            <FiArrowRight size={17} />
            بازگشت به کاربران
          </Link>
        </div>

        <section className="overflow-hidden rounded-3xl border border-border bg-surface/60 backdrop-blur-xl">
          <div className="relative h-40 overflow-hidden sm:h-52 md:h-60">
            <div className="absolute inset-0 bg-linear-to-br from-primary/25 via-background-secondary to-background" />

            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-[100px]" />

            <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />

            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
          </div>

          <div className="relative px-4 pb-5 sm:px-7 sm:pb-7">
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
                <div className="relative shrink-0">
                  <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-background bg-primary/10 text-4xl font-black text-primary shadow-2xl sm:h-32 sm:w-32">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <span
                    className={`absolute bottom-2 left-2 h-5 w-5 rounded-full border-[3px] border-background ${
                      user.status === "online" ? "bg-success" : user.status === "gaming" ? "bg-primary" : "bg-muted"
                    }`}
                  />
                </div>

                <div className="min-w-0 pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-black text-foreground sm:text-3xl">{user.name}</h1>

                    {user.verified && (
                      <span title="کاربر تأیید شده" className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-white">
                        <FiCheck size={15} strokeWidth={3} />
                      </span>
                    )}

                    {user.gender && (
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${user.gender === "male" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"}`}>
                        {user.gender === "male" ? "پسر" : "دختر"}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted">{user.username}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className={`flex items-center gap-1.5 font-semibold ${user.status === "online" ? "text-success" : user.status === "gaming" ? "text-primary" : "text-muted"}`}>
                      <span className={`h-2 w-2 rounded-full ${user.status === "online" ? "bg-success" : user.status === "gaming" ? "bg-primary" : "bg-muted"}`} />

                      {user.status === "online" ? "آنلاین" : user.status === "gaming" ? `در حال بازی ${user.game}` : "آفلاین"}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-border" />

                    <span className="text-muted">Level {user.level}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:flex">
                <button
                  type="button"
                  onClick={toggleFollowing}
                  className={`flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold transition-all duration-300 ${
                    following ? "border border-border bg-background-secondary text-foreground hover:border-error hover:text-error" : "bg-primary text-background hover:bg-primary-hover"
                  }`}
                >
                  {following ? (
                    <>
                      <FiCheck size={16} />
                      دنبال می‌کنید
                    </>
                  ) : (
                    <>
                      <FiUserPlus size={16} />
                      دنبال کردن
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={sendFriendRequest}
                  className={`flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-semibold transition-all duration-300 ${
                    friendRequested ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-background-secondary text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {friendRequested ? (
                    <>
                      <FiCheck size={16} />
                      درخواست شد
                    </>
                  ) : (
                    <>
                      <FiUsers size={16} />
                      دوست
                    </>
                  )}
                </button>

                <Link
                  href={`/chat/${user.username.replace("@", "")}`}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background-secondary px-4 text-xs font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  <FiMessageCircle size={16} />
                  پیام
                </Link>
              </div>
            </div>

            <div className="mt-6 max-w-2xl">
              {user.bio.split("\n").map((line) => (
                <p key={line} className="text-sm leading-7 text-foreground-secondary">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-2xl border border-border bg-background-secondary/40">
              <ProfileStat value={formatNumber(user.followers)} label="دنبال‌کننده" />

              <ProfileStat value={formatNumber(user.following)} label="دنبال‌شونده" border />

              <ProfileStat value={`Lv.${user.level}`} label="سطح" border />
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-border bg-surface/50 p-5 backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-foreground">بازی‌های کاربر</h2>

                <p className="mt-1 text-xs text-muted">بازی‌هایی که در پروفایل انتخاب شده‌اند</p>
              </div>

              <FiPlay size={20} className="text-primary" />
            </div>

            <div className="space-y-3">
              {user.games.map((game) => (
                <GameItem key={game.name} game={game} />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface/50 p-5 backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-foreground">کارت‌های کلکسیونی</h2>

                <p className="mt-1 text-xs text-muted">کارت‌هایی که این کاربر جمع‌آوری کرده</p>
              </div>

              <FiHeart size={20} className="text-primary" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {user.cards.map((card) => (
                <CollectionCard key={card.name} card={card} />
              ))}
            </div>

            {user.cards.length === 0 && (
              <div className="rounded-2xl border border-border bg-background-secondary/50 p-8 text-center">
                <p className="text-sm text-muted">هنوز کارت کلکسیونی ندارد.</p>
              </div>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-surface/50 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-foreground">ارتباط با {user.name}</h2>

              <p className="mt-1 text-sm leading-6 text-muted">برای شروع گفتگو یا اضافه کردن این کاربر به دوستانت اقدام کن.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex">
              <Link
                href={`/chat/${user.username.replace("@", "")}`}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold text-background transition-all duration-300 hover:bg-primary-hover"
              >
                <FiMessageCircle size={16} />
                شروع گفتگو
              </Link>

              <button
                type="button"
                onClick={toggleFollowing}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background-secondary px-5 text-xs font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
              >
                <FiUserPlus size={16} />
                {following ? "لغو دنبال کردن" : "دنبال کردن"}
              </button>
            </div>
          </div>
        </section>

        <div className="h-8" />
      </div>
    </main>
  );
}

function ProfileStat({ value, label, border = false }: { value: string; label: string; border?: boolean }) {
  return (
    <div className={`p-4 text-center ${border ? "border-r border-border" : ""}`}>
      <p className="text-lg font-black text-foreground sm:text-xl">{value}</p>

      <p className="mt-1 text-[11px] text-muted sm:text-xs">{label}</p>
    </div>
  );
}

function GameItem({ game }: { game: ProfileUser["games"][number] }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-background-secondary/50 p-3 transition-all duration-300 hover:border-primary/30">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-primary/10">
        <GameImage src={game.image} alt={game.name} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-foreground">{game.name}</h3>

        <p className="mt-1 text-xs text-muted">{game.category}</p>
      </div>

      <span className="shrink-0 rounded-lg bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">{game.level}</span>
    </div>
  );
}

function CollectionCard({ card }: { card: ProfileUser["cards"][number] }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-background-secondary/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
      <div className="relative h-28 overflow-hidden bg-primary/10">
        <GameImage src={card.image} alt={card.name} className="transition-transform duration-500 group-hover:scale-110" />

        <span className="absolute right-2 top-2 rounded-lg bg-black/60 px-2 py-1 text-[9px] font-bold text-primary backdrop-blur-md">{card.rarity}</span>
      </div>

      <div className="p-3">
        <h3 className="truncate text-xs font-bold text-foreground">{card.name}</h3>

        <p className="mt-1 truncate text-[10px] text-muted">{card.game}</p>

        <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-muted">{card.description}</p>
      </div>
    </div>
  );
}

function GameImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-linear-to-br from-primary/20 to-background-secondary text-lg font-black text-primary ${className}`}>
        {alt
          .split(" ")
          .map((word) => word.charAt(0))
          .slice(0, 2)
          .join("")
          .toUpperCase()}
      </div>
    );
  }
  return <Image src={src} alt={alt} onError={() => setFailed(true)} className={`h-full w-full object-cover ${className}`} />;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
