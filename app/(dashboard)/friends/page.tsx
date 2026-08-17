"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCheck, FiChevronLeft, FiHeart, FiSearch, FiUserPlus, FiUsers, FiX } from "react-icons/fi";

type User = {
  name: string;
  username: string;
  level: number;
  followers: number;
  following: number;
  online: boolean;
  playing?: string;
  verified?: boolean;
  gender?: "male" | "female";
  isFollowing?: boolean;
  isFriend?: boolean;
};

export default function FriendsPage() {
  const [search, setSearch] = useState("");
  const [followingUsers, setFollowingUsers] = useState<string[]>(["@reza"]);
  const [friends, setFriends] = useState<string[]>(["@reza", "@amir", "@mahan", "@ali", "@armin", "@sina2"]);

  const users: User[] = [
    {
      name: "Ashkan",
      username: "@ashkan",
      level: 18,
      followers: 1240,
      following: 310,
      online: true,
      playing: "Valorant",
      verified: true,
      gender: "male",
    },
    {
      name: "Reza",
      username: "@reza",
      level: 15,
      followers: 428,
      following: 185,
      online: true,
      playing: "Valorant",
      gender: "male",
      isFriend: true,
    },
    {
      name: "Amir",
      username: "@amir",
      level: 10,
      followers: 156,
      following: 92,
      online: true,
      playing: "CS2",
      gender: "male",
      isFriend: true,
    },
    {
      name: "Armin",
      username: "@armin",
      level: 7,
      followers: 84,
      following: 61,
      online: false,
      gender: "male",
      isFriend: true,
    },
    {
      name: "Mahan",
      username: "@mahan",
      level: 18,
      followers: 721,
      following: 203,
      online: true,
      playing: "PUBG",
      gender: "male",
      isFriend: true,
    },
    {
      name: "Ali",
      username: "@ali",
      level: 12,
      followers: 312,
      following: 140,
      online: true,
      playing: "Fortnite",
      gender: "male",
      isFriend: true,
    },
    {
      name: "Sina2",
      username: "@sina2",
      level: 6,
      followers: 71,
      following: 48,
      online: false,
      gender: "male",
      isFriend: true,
    },
  ];

  const friendRequests = [
    {
      name: "Armin",
      username: "@armin",
      level: 12,
      followers: 214,
      online: true,
      playing: "Valorant",
    },
    {
      name: "Ali",
      username: "@ali",
      level: 9,
      followers: 91,
      online: false,
    },
    {
      name: "Mahan",
      username: "@mahan",
      level: 16,
      followers: 520,
      online: true,
      playing: "PUBG",
    },
  ];

  const value = search.trim().toLowerCase();

  const searchResults = value.length === 0 ? [] : users.filter((user) => user.username.toLowerCase().includes(value) || user.name.toLowerCase().includes(value));
  const handleFollow = (username: string) => {
    setFollowingUsers((current) => (current.includes(username) ? current.filter((item) => item !== username) : [...current, username]));
  };

  const handleAddFriend = (username: string) => {
    setFriends((current) => (current.includes(username) ? current : [...current, username]));
  };

  return (
    <main dir="rtl" className="font-vazir min-h-screen w-full overflow-x-hidden px-3 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6 sm:mb-8">
          <p className="mb-1.5 text-xs text-muted sm:mb-2 sm:text-sm">ارتباطات</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-black text-foreground sm:text-3xl">دوستان</h1>

              <p className="mt-2 text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">دوستان جدید پیدا کن، دنبال‌شان کن و با هم بازی کنید.</p>
            </div>

            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-bold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover active:scale-[.98] sm:h-12 sm:w-auto"
            >
              <FiUserPlus size={18} />
              افزودن دوست
            </button>
          </div>
        </header>

        <section className="rounded-3xl border border-border bg-surface/50 p-3 backdrop-blur-xl sm:p-5">
          <div className="relative">
            <FiSearch size={19} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted sm:right-5" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجوی نام کاربری یا نام..."
              className="h-12 w-full rounded-2xl border border-border bg-background-secondary pr-12 pl-12 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/15 sm:h-14 sm:pr-14 sm:pl-14 sm:text-base"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition hover:bg-surface-hover hover:text-foreground sm:left-4"
                aria-label="پاک کردن جستجو"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {search && (
            <div className="mt-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-foreground sm:text-base">نتایج جستجو</h2>

                  <p className="mt-1 text-[11px] text-muted sm:text-xs">
                    نتایج برای
                    <span className="mr-1 font-semibold text-primary">{search}</span>
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary sm:text-xs">{searchResults.length} نتیجه</span>
              </div>

              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((user) => (
                    <UserSearchCard
                      key={user.username}
                      user={user}
                      isFollowing={followingUsers.includes(user.username)}
                      isFriend={friends.includes(user.username)}
                      onFollow={() => handleFollow(user.username)}
                      onAddFriend={() => handleAddFriend(user.username)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-background-secondary/50 p-6 text-center sm:p-8">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FiSearch size={21} />
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-foreground sm:text-base">کاربری پیدا نشد</h3>

                  <p className="mt-1 text-xs text-muted sm:text-sm">نام کاربری دیگری را جستجو کن.</p>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:grid-cols-4 sm:gap-4">
          <StatCard label="کل دوستان" value="24" icon={<FiUsers size={19} />} />

          <StatCard label="دنبال‌کننده‌ها" value="128" icon={<FiHeart size={19} />} />

          <StatCard label="دنبال‌شونده‌ها" value="86" icon={<FiUserPlus size={19} />} />

          <StatCard label="آنلاین" value="8" icon={<span className="h-3 w-3 rounded-full bg-success" />} />
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:mt-8 sm:p-7">
          <div className="mb-5 sm:mb-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-foreground sm:text-lg">درخواست‌های دوستی</h2>

                <p className="mt-1 text-xs text-muted sm:text-sm">درخواست‌های جدیدی که دریافت کرده‌ای.</p>
              </div>

              <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary sm:px-3 sm:text-xs">3 درخواست</span>
            </div>
          </div>

          <div className="space-y-3">
            {friendRequests.map((request) => (
              <FriendRequest
                key={request.username}
                name={request.name}
                username={request.username}
                level={request.level}
                followers={request.followers}
                online={request.online}
                playing={request.playing}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:mt-8 sm:p-7">
          <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-base font-bold text-foreground sm:text-lg">دوستان من</h2>

              <p className="mt-1 text-xs text-muted sm:text-sm">لیست دوستان و وضعیت فعلی آن‌ها</p>
            </div>

            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold text-primary sm:text-xs">24 دوست</span>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {users
              .filter((user) => user.isFriend)
              .map((friend) => (
                <FriendCard
                  key={friend.username}
                  name={friend.name}
                  username={friend.username}
                  level={friend.level}
                  game={friend.playing || "آفلاین"}
                  online={friend.online}
                  followers={friend.followers}
                  following={friend.following}
                />
              ))}
          </div>

          <button
            type="button"
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-border text-xs font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:mt-5 sm:h-12 sm:text-sm"
          >
            مشاهده همه دوستان
            <FiChevronLeft size={15} />
          </button>
        </section>

        <div className="h-6 sm:h-8" />
      </div>
    </main>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-surface/50 p-3 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11">{icon}</div>

        <span className="truncate text-[10px] text-muted sm:text-sm">{label}</span>
      </div>

      <p className="mt-3 text-xl font-black text-foreground sm:mt-5 sm:text-3xl">{value}</p>
    </div>
  );
}

function UserSearchCard({ user, isFollowing, isFriend, onFollow, onAddFriend }: { user: User; isFollowing: boolean; isFriend: boolean; onFollow: () => void; onAddFriend: () => void }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background-secondary/60 p-3 transition-all duration-300 hover:border-primary/40 sm:p-4 lg:flex-row lg:items-center">
      <Link href={`/profile/${user.username.replace("@", "")}`} className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-base font-black text-primary sm:h-14 sm:w-14 sm:text-lg">{user.name.charAt(0)}</div>

          <span className={`absolute bottom-0 left-0 h-3.5 w-3.5 rounded-full border-2 border-background-secondary sm:h-4 sm:w-4 ${user.online ? "bg-success" : "bg-muted"}`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-bold text-foreground sm:text-base">{user.name}</h3>

            {user.verified && (
              <span title="حساب تأیید شده" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success text-white">
                <FiCheck size={12} strokeWidth={3} />
              </span>
            )}

            {user.gender && (
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${user.gender === "male" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"}`}>
                {user.gender === "male" ? "پسر" : "دختر"}
              </span>
            )}
          </div>

          <p className="mt-1 truncate text-[11px] text-muted sm:text-xs">{user.username}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-muted sm:gap-3 sm:text-xs">
            <span>Level {user.level}</span>

            <span className="h-1 w-1 rounded-full bg-border" />

            <span>{user.followers} دنبال‌کننده</span>

            <span className="h-1 w-1 rounded-full bg-border" />

            <span>{user.online ? user.playing || "آنلاین" : "آفلاین"}</span>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:w-auto lg:min-w-64">
        <button
          type="button"
          onClick={onFollow}
          className={`flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold transition-all duration-300 active:scale-[.97] sm:h-11 ${
            isFollowing ? "border border-primary/30 bg-primary/10 text-primary hover:bg-primary/15" : "bg-primary text-background hover:bg-primary-hover"
          }`}
        >
          <FiHeart size={15} />
          {isFollowing ? "دنبال می‌کنی" : "دنبال کردن"}
        </button>

        <button
          type="button"
          onClick={onAddFriend}
          disabled={isFriend}
          className={`flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-semibold transition-all duration-300 active:scale-[.97] sm:h-11 ${
            isFriend ? "cursor-default border-success/20 bg-success/5 text-success" : "border-border text-foreground hover:border-primary hover:text-primary"
          }`}
        >
          {isFriend ? <FiCheck size={15} /> : <FiUserPlus size={15} />}
          {isFriend ? "دوست شماست" : "درخواست دوستی"}
        </button>
      </div>
    </div>
  );
}

function FriendRequest({ name, username, level, followers, online, playing }: { name: string; username: string; level: number; followers: number; online: boolean; playing?: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background-secondary/60 p-3 transition-all duration-300 hover:border-primary/40 sm:p-4 lg:flex-row lg:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-bold text-primary sm:h-14 sm:w-14">{name.charAt(0)}</div>

          <span className={`absolute bottom-0 left-0 h-3.5 w-3.5 rounded-full border-2 border-background-secondary sm:h-4 sm:w-4 ${online ? "bg-success" : "bg-muted"}`} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">{name}</h3>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-muted sm:text-xs">
            <span>{username}</span>

            <span className="h-1 w-1 rounded-full bg-border" />

            <span>Level {level}</span>

            <span className="h-1 w-1 rounded-full bg-border" />

            <span>{followers} دنبال‌کننده</span>
          </div>

          <p className="mt-1 text-[10px] text-foreground-secondary sm:text-xs">{online ? `🟢 ${playing || "آنلاین"}` : "⚪ آفلاین"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:w-auto">
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-xs font-bold text-background transition-all duration-300 hover:bg-primary-hover active:scale-[.97] sm:h-11 sm:gap-2 sm:px-4 sm:text-sm"
        >
          <FiCheck size={16} />
          قبول
        </button>

        <button
          type="button"
          className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border px-3 text-xs font-semibold text-foreground transition-all duration-300 hover:border-error hover:text-error active:scale-[.97] sm:h-11 sm:gap-2 sm:px-4 sm:text-sm"
        >
          <FiX size={16} />
          رد
        </button>
      </div>
    </div>
  );
}

function FriendCard({
  name,
  username,
  level,
  game,
  online,
  followers,
  following,
}: {
  name: string;
  username: string;
  level: number;
  game: string;
  online: boolean;
  followers: number;
  following: number;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-border bg-background-secondary/60 p-3 transition-all duration-300 hover:border-primary/40 sm:p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative shrink-0">
          <div className="flex h-13 w-13 items-center justify-center rounded-full bg-primary/10 text-base font-black text-primary sm:h-14 sm:w-14 sm:text-lg">{name.charAt(0)}</div>

          <span className={`absolute bottom-0 left-0 h-3.5 w-3.5 rounded-full border-[3px] border-background-secondary sm:h-4 sm:w-4 ${online ? "bg-success" : "bg-muted"}`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-bold text-foreground sm:text-base">{name}</h3>

            <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold sm:px-2.5 sm:py-1 sm:text-[11px] ${online ? "bg-success/10 text-success" : "bg-muted/10 text-muted"}`}>
              {online ? "آنلاین" : "آفلاین"}
            </span>
          </div>

          <p className="mt-1 truncate text-[10px] text-muted sm:text-xs">{username}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl border border-border/60 bg-background/30 p-2">
        <div className="min-w-0 text-center">
          <p className="truncate text-sm font-bold text-foreground">{followers}</p>
          <p className="mt-0.5 text-[9px] text-muted">دنبال‌کننده</p>
        </div>

        <div className="border-x border-border/60 text-center">
          <p className="text-sm font-bold text-foreground">{following}</p>
          <p className="mt-0.5 text-[9px] text-muted">دنبال‌شونده</p>
        </div>

        <div className="text-center">
          <p className="text-sm font-bold text-primary">Lv.{level}</p>
          <p className="mt-0.5 text-[9px] text-muted">سطح</p>
        </div>
      </div>

      <div className="flex min-w-0 items-center justify-between gap-2">
        <p className="min-w-0 truncate text-[10px] text-foreground-secondary sm:text-xs">{online ? `🎮 در حال بازی ${game}` : "⚪ آفلاین"}</p>

        <Link
          href={`/profile/${username.replace("@", "")}`}
          className="flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-border px-3 text-[10px] font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:h-10 sm:px-4 sm:text-xs"
        >
          پروفایل
          <FiChevronLeft size={13} />
        </Link>
      </div>
    </div>
  );
}
