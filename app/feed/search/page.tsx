"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiX, FiUserPlus } from "react-icons/fi";

const users = [
  { name: "Armin", username: "@armin", avatar: "A", verified: true },
  { name: "jaki", username: "@jaki", avatar: "J", verified: false },
  { name: "Sina", username: "@sina", avatar: "S", verified: false },
  { name: "Ali", username: "@ali", avatar: "A", verified: false },
  { name: "Reza", username: "@reza", avatar: "R", verified: true },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredUsers = query.trim() ? users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.username.includes(query)) : [];

  return (
    <div className="px-4 pb-24 pt-4">
      <div className="relative">
        <FiSearch size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی کاربران..."
          className="w-full h-14 rounded-2xl border border-border bg-background-secondary pr-12 pl-12 text-foreground placeholder:text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition"
          autoFocus
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition">
            <FiX size={18} />
          </button>
        )}
      </div>

      {query && (
        <div className="mt-4 space-y-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.username} className="flex items-center gap-3 rounded-2xl border border-border bg-surface/50 p-3 backdrop-blur-xl">
                <Link href={`/profile/${user.username.replace("@", "")}`} className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">{user.avatar}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-sm truncate">{user.name}</p>
                      {user.verified && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success text-white text-[9px]">✓</span>}
                    </div>
                    <p className="text-xs text-muted truncate">{user.username}</p>
                  </div>
                </Link>
                <button className="flex h-9 items-center gap-1.5 rounded-xl bg-primary/10 px-3 text-xs font-semibold text-primary hover:bg-primary/20 transition">
                  <FiUserPlus size={14} />
                  دنبال
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <FiSearch size={32} className="mx-auto text-muted" />
              <p className="mt-3 text-muted">کاربری پیدا نشد</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
