"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiArrowLeft, FiHash, FiSearch, FiUsers, FiZap } from "react-icons/fi";

type Group = {
  id: string;
  name: string;
  username: string;
  description: string;
  members: number;
  online: number;
  messages: number;
  icon: string;
  verified?: boolean;
  owner?: boolean;
  active?: boolean;
};

const groups: Group[] = [
  {
    id: "gaming-team",
    name: "Gaming Team",
    username: "@gamingteam",
    description: "تیم اصلی گیمرهای NexUs برای بازی و ساخت تیم",
    members: 128,
    online: 34,
    messages: 18,
    icon: "GT",
    owner: true,
    active: true,
  },
  {
    id: "valorant-club",
    name: "Valorant Club",
    username: "@valorant",
    description: "جامعه بازیکنان Valorant و برگزاری مسابقات",
    members: 842,
    online: 196,
    messages: 27,
    icon: "VC",
    verified: true,
  },
  {
    id: "friends",
    name: "Friends",
    username: "@friends",
    description: "گروه دوستان و گپ روزانه",
    members: 24,
    online: 8,
    messages: 6,
    icon: "FR",
    active: true,
  },
  {
    id: "cs2-community",
    name: "CS2 Community",
    username: "@cs2",
    description: "بازیکنان Counter Strike 2",
    members: 1260,
    online: 328,
    messages: 42,
    icon: "CS",
    verified: true,
  },
  {
    id: "pubg-iran",
    name: "PUBG Iran",
    username: "@pubgiran",
    description: "جامعه بازیکنان PUBG",
    members: 2940,
    online: 641,
    messages: 51,
    icon: "PI",
  },
  {
    id: "nexus-gamers",
    name: "NexUs Gamers",
    username: "@gamers",
    description: "محل دورهمی گیمرهای NexUs",
    members: 531,
    online: 102,
    messages: 15,
    icon: "NG",
  },
];

export default function GroupsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "mine" | "popular">("all");

  const filteredGroups = useMemo(() => {
    const value = search.trim().toLowerCase();

    return groups.filter((group) => {
      const matchesSearch = !value || group.name.toLowerCase().includes(value) || group.username.toLowerCase().includes(value) || group.description.toLowerCase().includes(value);

      const matchesFilter = filter === "all" ? true : filter === "mine" ? Boolean(group.owner) : group.members >= 500;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <main dir="rtl" className="font-vazir min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <header className="mb-7">
          <div>
            <p className="mb-2 text-sm font-semibold text-primary">ارتباطات NexUs</p>

            <h1 className="text-2xl font-black sm:text-3xl">گروه‌ها</h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">گروه‌های مورد علاقه‌ات را پیدا کن و وارد گفتگو شو.</p>
          </div>
        </header>

        {/* Search */}
        <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-surface/50 p-4 backdrop-blur-xl sm:p-6">
          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-[100px]" />

          <div className="relative">
            <div className="relative">
              <FiSearch size={19} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="جستجوی گروه با نام یا نام کاربری..."
                className="h-14 w-full rounded-2xl border border-border bg-background-secondary pr-14 pl-5 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
                همه گروه‌ها
              </FilterButton>

              <FilterButton active={filter === "mine"} onClick={() => setFilter("mine")}>
                گروه‌های من
              </FilterButton>

              <FilterButton active={filter === "popular"} onClick={() => setFilter("popular")}>
                محبوب‌ترین‌ها
              </FilterButton>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard icon={<FiUsers size={19} />} label="گروه‌های من" value="3" />

          <StatCard icon={<FiHash size={19} />} label="عضویت‌ها" value="18" />

          <StatCard icon={<FiZap size={19} />} label="گروه‌های فعال" value="12" />

          <StatCard icon={<FiUsers size={19} />} label="اعضای آنلاین" value="742" />
        </section>

        {/* Groups */}
        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">گروه‌های NexUs</h2>

              <p className="mt-1 text-xs text-muted">گروه‌هایی که می‌توانی وارد آن‌ها شوی</p>
            </div>

            <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-bold text-primary">{filteredGroups.length} گروه</span>
          </div>

          {filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-surface/50 p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FiSearch size={24} />
              </div>

              <h3 className="mt-4 font-bold">گروهی پیدا نشد</h3>

              <p className="mt-2 text-sm text-muted">نام یا نام کاربری دیگری را امتحان کن.</p>
            </div>
          )}
        </section>

        <div className="h-8" />
      </div>
    </main>
  );
}

function GroupCard({ group }: { group: Group }) {
  return (
    <Link
      href={`/group/${group.username.replace("@", "")}`}
      className="group relative overflow-hidden rounded-3xl border border-border bg-surface/50 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-hover"
    >
      <div className="pointer-events-none absolute -left-16 -top-16 h-36 w-36 rounded-full bg-primary/10 blur-[70px] transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary/25 to-primary/5 text-sm font-black text-primary">{group.icon}</div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate font-bold">{group.name}</h3>

                {group.verified && <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-[9px] font-black text-white">✓</span>}
              </div>

              <p className="mt-1 text-xs text-muted">{group.username}</p>
            </div>
          </div>

          {group.owner && <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-bold text-primary">مدیر</span>}
        </div>

        <p className="mt-5 min-h-12 text-xs leading-6 text-muted">{group.description}</p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-background-secondary/70 p-3">
            <div className="flex items-center gap-2 text-muted">
              <FiUsers size={14} />

              <span className="text-[10px]">اعضا</span>
            </div>

            <p className="mt-2 text-sm font-black">{group.members.toLocaleString("fa-IR")}</p>
          </div>

          <div className="rounded-xl bg-background-secondary/70 p-3">
            <div className="flex items-center gap-2 text-muted">
              <span className="h-2 w-2 rounded-full bg-success" />

              <span className="text-[10px]">آنلاین</span>
            </div>

            <p className="mt-2 text-sm font-black text-success">{group.online.toLocaleString("fa-IR")}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2 text-[10px] text-muted">
            <FiMessageIcon />

            <span>{group.messages.toLocaleString("fa-IR")} پیام جدید</span>
          </div>

          <span className="flex items-center gap-1 text-xs font-semibold text-primary">
            ورود
            <FiArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>

        <span className="truncate text-[10px] text-muted">{label}</span>
      </div>

      <p className="mt-4 text-xl font-black sm:text-2xl">{value}</p>
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 shrink-0 rounded-xl px-4 text-xs font-semibold transition-all duration-300 ${
        active ? "bg-primary text-background" : "border border-border bg-background-secondary text-muted hover:border-primary/50 hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

function FiMessageIcon() {
  return (
    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-current">
      <span className="h-1 w-1 rounded-full bg-current" />
    </span>
  );
}
