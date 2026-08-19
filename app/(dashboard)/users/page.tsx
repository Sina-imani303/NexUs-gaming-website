"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiCheck, FiMessageCircle, FiSearch, FiUserPlus, FiUsers, FiX } from "react-icons/fi";

type UserStatus = "online" | "gaming" | "offline";

type User = {
  id: number;
  name: string;
  username: string;
  level: number;
  followers: number;
  following: number;
  status: UserStatus;
  game?: string;
  verified?: boolean;
  gender?: "male" | "female";
  bio: string;
  followed: boolean;
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "Armin",
    username: "@armin",
    level: 18,
    followers: 1542,
    following: 126,
    status: "online",
    verified: true,
    gender: "male",
    bio: "Gamer | Valorant Player",
    followed: false,
  },
  {
    id: 2,
    name: "Ali",
    username: "@ali",
    level: 12,
    followers: 684,
    following: 241,
    status: "gaming",
    game: "Valorant",
    gender: "male",
    bio: "Just here to play 🎮",
    followed: true,
  },
  {
    id: 3,
    name: "Mahan",
    username: "@mahan",
    level: 21,
    followers: 2387,
    following: 312,
    status: "online",
    verified: true,
    gender: "male",
    bio: "Competitive gamer",
    followed: false,
  },
  {
    id: 4,
    name: "Sara",
    username: "@sara",
    level: 15,
    followers: 942,
    following: 178,
    status: "offline",
    gender: "female",
    bio: "PUBG & Fortnite",
    followed: false,
  },
  {
    id: 5,
    name: "Reza",
    username: "@reza",
    level: 27,
    followers: 4218,
    following: 405,
    status: "gaming",
    game: "CS2",
    verified: true,
    gender: "male",
    bio: "CS2 player | Level 27",
    followed: false,
  },
  {
    id: 6,
    name: "Sina2",
    username: "@sina2",
    level: 9,
    followers: 321,
    following: 97,
    status: "offline",
    gender: "male",
    bio: "Gaming enthusiast",
    followed: false,
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>(initialUsers);

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return users;
    }

    return users.filter((user) => user.name.toLowerCase().includes(value) || user.username.toLowerCase().includes(value.replace(/^@/, "")));
  }, [search, users]);

  const toggleFollow = (id: number) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) => {
        if (user.id !== id) {
          return user;
        }

        return {
          ...user,
          followed: !user.followed,
          followers: user.followed ? Math.max(0, user.followers - 1) : user.followers + 1,
        };
      }),
    );
  };

  return (
    <main dir="rtl" className="font-vazir min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-sm text-primary">Community</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-black text-foreground sm:text-3xl">پیدا کردن کاربران</h1>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-foreground-secondary">کاربران NexUs را با نام کاربری پیدا کن، پروفایلشان را ببین و آن‌ها را دنبال کن.</p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3">
              <FiUsers size={18} className="text-primary" />

              <span className="text-sm font-bold text-primary">{users.length} کاربر</span>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:p-5">
          <div className="relative">
            <FiSearch size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجو با نام یا نام کاربری..."
              className="h-14 w-full rounded-2xl border border-border bg-background-secondary pr-14 pl-12 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/15"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="پاک کردن جستجو"
                className="absolute left-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition hover:bg-surface-hover hover:text-foreground"
              >
                <FiX size={17} />
              </button>
            )}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">{search ? "نتایج جستجو" : "کاربران پیشنهادی"}</h2>

              <p className="mt-1 text-xs text-muted">{filteredUsers.length} کاربر پیدا شد</p>
            </div>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} onFollow={() => toggleFollow(user.id)} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-surface/50 p-12 text-center backdrop-blur-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FiSearch size={26} />
              </div>

              <h3 className="mt-5 font-bold text-foreground">کاربری پیدا نشد</h3>

              <p className="mt-2 text-sm text-muted">نام کاربری یا نام دیگری را امتحان کنید.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function UserCard({ user, onFollow }: { user: User; onFollow: () => void }) {
  const status = getStatus(user.status, user.game);

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-surface/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_15px_50px_rgba(0,0,0,.25)]">
      <div className="flex items-start justify-between gap-4">
        <Link href={`/profile/${user.username.replace("@", "")}`} className="flex min-w-0 items-center gap-3">
          <div className="relative shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-xl font-black text-primary">{user.name.charAt(0).toUpperCase()}</div>

            <span
              className={`absolute bottom-0 left-0 h-4 w-4 rounded-full border-[3px] border-surface ${user.status === "online" ? "bg-success" : user.status === "gaming" ? "bg-primary" : "bg-muted"}`}
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-bold text-foreground">{user.name}</h3>

              {user.verified && (
                <span title="کاربر تأیید شده" className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
                  <FiCheck size={13} strokeWidth={3} />
                </span>
              )}
            </div>

            <p className="mt-1 truncate text-xs text-muted">{user.username}</p>
          </div>
        </Link>

        {user.gender && (
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${user.gender === "male" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"}`}>
            {user.gender === "male" ? "پسر" : "دختر"}
          </span>
        )}
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-background-secondary/50 p-3">
        <div className="flex items-center justify-between gap-3">
          <span className={`flex items-center gap-2 text-xs font-semibold ${status.className}`}>
            <span className={`h-2 w-2 rounded-full ${user.status === "online" ? "bg-success" : user.status === "gaming" ? "bg-primary" : "bg-muted"}`} />

            {status.label}
          </span>

          <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">Level {user.level}</span>
        </div>

        {user.status === "gaming" && user.game && <p className="mt-2 text-xs text-muted">در حال بازی {user.game}</p>}
      </div>

      <p className="mt-4 min-h-10 text-sm leading-6 text-foreground-secondary">{user.bio}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-background-secondary/40 p-3">
        <div className="text-center">
          <p className="text-base font-black text-foreground">{formatNumber(user.followers)}</p>

          <p className="mt-1 text-[11px] text-muted">دنبال‌کننده</p>
        </div>

        <div className="border-r border-border text-center">
          <p className="text-base font-black text-foreground">{formatNumber(user.following)}</p>

          <p className="mt-1 text-[11px] text-muted">دنبال‌شونده</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onFollow}
          className={`flex h-11 items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-[.97] ${
            user.followed ? "border border-border bg-background-secondary text-foreground hover:border-error hover:text-error" : "bg-primary text-background hover:bg-primary-hover"
          }`}
        >
          {user.followed ? (
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

        <Link
          href={`/profile/${user.username.replace("@", "")}`}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background-secondary text-xs font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
        >
          پروفایل
        </Link>
      </div>

      <Link
        href={`/chat/${user.username.replace("@", "")}`}
        className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold text-muted transition-all duration-300 hover:bg-primary/5 hover:text-primary"
      >
        <FiMessageCircle size={15} />
        ارسال پیام
      </Link>
    </article>
  );
}

function getStatus(status: UserStatus, game?: string) {
  if (status === "online") {
    return {
      label: "آنلاین",
      className: "text-success",
    };
  }

  if (status === "gaming") {
    return {
      label: game ? `در حال بازی ${game}` : "در حال بازی",
      className: "text-primary",
    };
  }

  return {
    label: "آفلاین",
    className: "text-muted",
  };
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
