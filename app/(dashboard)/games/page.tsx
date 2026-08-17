"use client";

import Image from "next/image";
import { useState } from "react";
import { FiCheck, FiHeart, FiPlay, FiPlus, FiSearch, FiStar, FiUsers, FiX } from "react-icons/fi";

type Game = {
  name: string;
  category: string;
  players: string;
  rating: string;
  color: string;
  image?: string;
};

const initialGames: Game[] = [
  {
    name: "Valorant",
    category: "FPS",
    players: "5v5",
    rating: "4.9",
    color: "from-red-500/25",
    image: "/games/valorant.jpg",
  },
  {
    name: "Counter Strike 2",
    category: "FPS",
    players: "5v5",
    rating: "4.8",
    color: "from-orange-500/25",
    image: "/games/cs2.jpg",
  },
  {
    name: "PUBG",
    category: "Battle Royale",
    players: "100 Players",
    rating: "4.7",
    color: "from-yellow-500/25",
    image: "/games/pubg.jpg",
  },
  {
    name: "Fortnite",
    category: "Battle Royale",
    players: "100 Players",
    rating: "4.6",
    color: "from-blue-500/25",
    image: "/games/fortnite.jpg",
  },
  {
    name: "League of Legends",
    category: "MOBA",
    players: "5v5",
    rating: "4.9",
    color: "from-cyan-500/25",
    image: "/games/lol.jpg",
  },
  {
    name: "Dota 2",
    category: "MOBA",
    players: "5v5",
    rating: "4.7",
    color: "from-red-500/25",
    image: "/games/dota2.jpg",
  },
  {
    name: "Apex Legends",
    category: "Battle Royale",
    players: "60 Players",
    rating: "4.6",
    color: "from-purple-500/25",
    image: "/games/apex.jpg",
  },
  {
    name: "Rocket League",
    category: "Sports",
    players: "3v3",
    rating: "4.5",
    color: "from-sky-500/25",
    image: "/games/rocket-league.jpg",
  },
];

const categories = ["همه", "FPS", "Battle Royale", "MOBA", "Sports"];

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");

  const [favoriteGames, setFavoriteGames] = useState<string[]>(["Valorant", "Counter Strike 2", "PUBG"]);

  const toggleFavorite = (gameName: string) => {
    setFavoriteGames((current) => (current.includes(gameName) ? current.filter((name) => name !== gameName) : [...current, gameName]));
  };

  const filteredGames = initialGames.filter((game) => {
    const normalizedSearch = search.trim().toLowerCase();

    const matchesSearch = normalizedSearch.length === 0 || game.name.toLowerCase().includes(normalizedSearch);

    const matchesCategory = selectedCategory === "همه" || game.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const favoriteGamesList = initialGames.filter((game) => favoriteGames.includes(game.name));

  return (
    <main dir="rtl" className="font-vazir min-h-screen w-full overflow-x-hidden px-3 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6 sm:mb-8">
          <p className="mb-1.5 text-xs text-muted sm:mb-2 sm:text-sm">Gaming</p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-black text-foreground sm:text-3xl">بازی‌ها</h1>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">بازی‌های مورد علاقه‌ات را پیدا کن، به پروفایلت اضافه کن و برای رقابت آماده شو.</p>
            </div>

            <div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 sm:w-fit">
              <div className="flex items-center gap-2">
                <FiPlay size={18} className="text-primary" />

                <span className="text-xs font-semibold text-primary sm:text-sm">بازی‌های من</span>
              </div>

              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-black text-primary sm:text-xs">{favoriteGames.length}</span>
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-border bg-surface/50 p-3 backdrop-blur-xl sm:p-5">
          <div className="relative">
            <FiSearch size={19} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted sm:right-5" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجوی بازی..."
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
        </section>

        <section className="mt-4 overflow-x-auto sm:mt-5">
          <div className="flex min-w-max gap-2 pb-1">
            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`flex h-10 items-center justify-center rounded-xl px-4 text-xs font-semibold transition-all duration-300 sm:h-11 sm:px-5 sm:text-sm ${
                    active
                      ? "bg-primary text-background shadow-[0_8px_25px_rgba(212,175,55,.12)]"
                      : "border border-border bg-surface/60 text-foreground-secondary hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6 sm:mt-8">
          <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
            <div className="min-w-0">
              <h2 className="text-base font-bold text-foreground sm:text-lg">بازی‌های من</h2>

              <p className="mt-1 truncate text-[11px] text-muted sm:text-sm">بازی‌هایی که در پروفایل خود انتخاب کرده‌ای</p>
            </div>

            <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary sm:px-3 sm:text-xs">{favoriteGames.length} بازی</span>
          </div>

          {favoriteGamesList.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteGamesList.map((game) => (
                <GameCard key={game.name} game={game} favorite={true} onToggleFavorite={() => toggleFavorite(game.name)} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-surface/50 p-8 text-center sm:p-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FiHeart size={21} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-foreground sm:text-base">هنوز بازی‌ای انتخاب نکرده‌ای</h3>

              <p className="mt-2 text-xs text-muted sm:text-sm">از لیست بازی‌ها، بازی مورد علاقه‌ات را به پروفایل اضافه کن.</p>
            </div>
          )}
        </section>

        <section className="mt-8 sm:mt-10">
          <div className="mb-4 sm:mb-5">
            <h2 className="text-base font-bold text-foreground sm:text-lg">همه بازی‌ها</h2>

            <p className="mt-1 text-xs text-muted sm:text-sm">بازی مورد علاقه خودت را انتخاب کن.</p>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {filteredGames.map((game) => (
                <GameCard key={game.name} game={game} favorite={favoriteGames.includes(game.name)} onToggleFavorite={() => toggleFavorite(game.name)} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-surface/50 p-10 text-center sm:p-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FiSearch size={22} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-foreground sm:text-base">بازی پیدا نشد</h3>

              <p className="mt-2 text-xs text-muted sm:text-sm">عبارت دیگری را برای جستجو امتحان کنید.</p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("همه");
                }}
                className="mt-5 h-10 rounded-xl border border-border px-4 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                پاک کردن فیلترها
              </button>
            </div>
          )}
        </section>

        <div className="h-6 sm:h-8" />
      </div>
    </main>
  );
}

function GameCard({ game, favorite, onToggleFavorite }: { game: Game; favorite: boolean; onToggleFavorite: () => void }) {
  const initials = game.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-3.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_15px_50px_rgba(0,0,0,.25)] sm:p-5">
      <div
        className={`pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-linear-to-br ${game.color} to-transparent blur-3xl opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative">
        <div className="relative h-36 overflow-hidden rounded-2xl border border-border bg-background-secondary sm:h-40">
          {game.image ? (
            <Image src={game.image} alt={game.name} width={800} height={450} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-linear-to-br ${game.color} to-background-secondary`}>
              <span className="text-3xl font-black tracking-widest text-primary">{initials}</span>
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-3 right-3 left-3 flex items-end justify-between gap-2">
            <span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">{game.category}</span>

            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] text-white backdrop-blur-md">
              <FiStar size={12} className="fill-current text-primary" />
              {game.rating}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleFavorite}
          className={`absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-300 sm:left-3.5 sm:top-3.5 sm:h-10 sm:w-10 ${
            favorite ? "border-primary/30 bg-primary/15 text-primary" : "border-white/10 bg-black/40 text-white hover:border-primary/50 hover:text-primary"
          }`}
          aria-label={favorite ? "حذف از بازی‌های من" : "افزودن به بازی‌های من"}
        >
          <FiHeart size={17} className={favorite ? "fill-current" : ""} />
        </button>

        <div className="mt-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="min-w-0 truncate text-base font-bold text-foreground sm:text-lg">{game.name}</h3>

            <div className="flex shrink-0 items-center gap-1 text-[10px] text-foreground-secondary sm:text-xs">
              <FiUsers size={13} />
              <span>{game.players}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[10px] text-muted sm:text-xs">
            <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-primary">{game.category}</span>

            <span className="flex items-center gap-1">
              <FiStar size={12} className="fill-current text-primary" />
              {game.rating}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleFavorite}
          className={`mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all duration-300 sm:h-11 sm:text-sm ${
            favorite ? "border border-border bg-background-secondary text-foreground hover:border-primary hover:text-primary" : "bg-primary text-background hover:bg-primary-hover"
          }`}
        >
          {favorite ? (
            <>
              <FiCheck size={16} />
              اضافه شده
            </>
          ) : (
            <>
              <FiPlus size={16} />
              افزودن به بازی‌های من
            </>
          )}
        </button>
      </div>
    </div>
  );
}
