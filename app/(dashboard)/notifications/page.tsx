"use client";

import { useState } from "react";
import { FiBell, FiCheck, FiCheckCircle, FiPlay, FiUsers, FiZap } from "react-icons/fi";

type NotificationType = "all" | "friends" | "games" | "system";

type Notification = {
  id: number;
  type: Exclude<NotificationType, "all">;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "friends",
    title: "درخواست دوستی جدید",
    description: "Armin برای شما درخواست دوستی فرستاده است.",
    time: "۵ دقیقه پیش",
    read: false,
  },
  {
    id: 2,
    type: "games",
    title: "بازی جدید اضافه شد",
    description: "Valorant به لیست بازی‌های مورد علاقه شما اضافه شد.",
    time: "۲ ساعت پیش",
    read: false,
  },
  {
    id: 3,
    type: "system",
    title: "Level Up!",
    description: "تبریک! شما به Level 8 رسیدید.",
    time: "امروز",
    read: true,
  },
  {
    id: 4,
    type: "friends",
    title: "درخواست دوستی قبول شد",
    description: "Reza درخواست دوستی شما را قبول کرد.",
    time: "دیروز",
    read: true,
  },
  {
    id: 5,
    type: "games",
    title: "بازی مورد علاقه",
    description: "CS2 در لیست بازی‌های مورد علاقه شما قرار گرفت.",
    time: "۲ روز پیش",
    read: true,
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<NotificationType>("all");
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") {
      return true;
    }

    return notification.type === filter;
  });

  const markAsRead = (id: number) => {
    setNotifications((current) => current.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)));
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  return (
    <main dir="rtl" className="font-vazir min-h-screen w-full overflow-x-hidden px-3 py-5 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6 sm:mb-8">
          <p className="mb-1.5 text-xs text-muted sm:mb-2 sm:text-sm">مرکز اعلان‌ها</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="flex items-center gap-2.5 text-2xl font-black text-foreground sm:gap-3 sm:text-3xl">
                اعلان‌ها
                {unreadCount > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-black text-background sm:h-7 sm:min-w-7 sm:px-2 sm:text-xs">
                    {unreadCount}
                  </span>
                )}
              </h1>

              <p className="mt-2 text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">آخرین اتفاقات حساب کاربری خود را اینجا ببینید.</p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface/60 px-4 text-xs font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:w-auto sm:text-sm"
              >
                <FiCheck size={16} />
                خواندن همه
              </button>
            )}
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          <StatCard icon={<FiBell size={18} />} label="کل اعلان‌ها" value={String(notifications.length)} />

          <StatCard icon={<FiZap size={18} />} label="خوانده نشده" value={String(unreadCount)} primary />

          <div className="col-span-2 rounded-2xl border border-border bg-surface/50 p-4 backdrop-blur-xl sm:col-span-1 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success sm:h-10 sm:w-10">
                <FiCheckCircle size={18} />
              </div>

              <span className="text-[10px] text-muted sm:text-xs">وضعیت</span>
            </div>

            <p className="mt-3 truncate text-sm font-bold text-success sm:mt-4">{unreadCount === 0 ? "همه اعلان‌ها خوانده شده" : `${unreadCount} اعلان جدید`}</p>
          </div>
        </section>

        <section className="mt-6 overflow-x-auto sm:mt-8">
          <div className="flex min-w-max gap-2 pb-1">
            <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
              همه
            </FilterButton>

            <FilterButton active={filter === "friends"} onClick={() => setFilter("friends")}>
              دوستان
            </FilterButton>

            <FilterButton active={filter === "games"} onClick={() => setFilter("games")}>
              بازی‌ها
            </FilterButton>

            <FilterButton active={filter === "system"} onClick={() => setFilter("system")}>
              سیستم
            </FilterButton>
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-border bg-surface/50 p-3 backdrop-blur-xl sm:mt-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-foreground sm:text-base">اعلان‌های اخیر</h2>

              <p className="mt-1 text-[10px] text-muted sm:text-xs">آخرین فعالیت‌ها و اتفاقات</p>
            </div>

            <span className="shrink-0 rounded-full bg-background-secondary px-2.5 py-1 text-[10px] text-muted sm:text-xs">{filteredNotifications.length} اعلان</span>
          </div>

          {filteredNotifications.length > 0 ? (
            <div className="space-y-2">
              {filteredNotifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} onRead={() => markAsRead(notification.id)} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-background-secondary/40 p-8 text-center sm:p-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FiBell size={21} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-foreground sm:text-base">اعلانی وجود ندارد</h3>

              <p className="mt-2 text-xs text-muted sm:text-sm">در این دسته‌بندی اعلان جدیدی برای نمایش وجود ندارد.</p>
            </div>
          )}
        </section>

        <div className="h-6 sm:h-8" />
      </div>
    </main>
  );
}

function StatCard({ icon, label, value, primary = false }: { icon: React.ReactNode; label: string; value: string; primary?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/50 p-3 backdrop-blur-xl sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${primary ? "bg-primary/10 text-primary" : "bg-primary/10 text-primary"}`}>{icon}</div>

        <span className="truncate text-[10px] text-muted sm:text-xs">{label}</span>
      </div>

      <p className={`mt-3 text-xl font-black sm:mt-4 sm:text-2xl ${primary ? "text-primary" : "text-foreground"}`}>{value}</p>
    </div>
  );
}

function NotificationItem({ notification, onRead }: { notification: Notification; onRead: () => void }) {
  const getIcon = () => {
    if (notification.type === "friends") {
      return <FiUsers size={18} />;
    }

    if (notification.type === "games") {
      return <FiPlay size={18} />;
    }

    return <FiZap size={18} />;
  };

  return (
    <div
      className={`group flex flex-col gap-3 rounded-2xl border p-3 transition-all duration-300 sm:flex-row sm:items-center sm:gap-4 sm:p-4 ${
        notification.read ? "border-transparent bg-background-secondary/40" : "border-primary/20 bg-primary/5"
      } hover:border-primary/30`}
    >
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl ${notification.read ? "bg-surface text-muted" : "bg-primary/10 text-primary"}`}>
        {getIcon()}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">{notification.title}</h3>

            {!notification.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary sm:h-2 sm:w-2" />}
          </div>

          <span className="shrink-0 text-[10px] text-muted sm:text-xs">{notification.time}</span>
        </div>

        <p className="mt-1 text-xs leading-6 text-foreground-secondary sm:text-sm sm:leading-7">{notification.description}</p>
      </div>

      {!notification.read && (
        <button
          type="button"
          onClick={onRead}
          className="flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-border px-3 text-[10px] font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:h-10 sm:w-auto sm:px-4 sm:text-xs"
        >
          <FiCheck size={14} />
          خوانده شد
        </button>
      )}
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 rounded-xl px-4 text-xs font-semibold transition-all duration-300 sm:h-11 sm:px-5 sm:text-sm ${
        active ? "bg-primary text-background" : "border border-border bg-surface/60 text-foreground-secondary hover:border-primary/50 hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}
