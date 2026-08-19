"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiBell, FiHash, FiMenu, FiMessageCircle, FiSearch, FiUsers, FiVolume2 } from "react-icons/fi";

type Tab = "chats" | "groups" | "channels";

type Conversation = {
  id: string;
  name: string;
  username?: string;
  message: string;
  time: string;
  unread: number;
  online?: boolean;
  verified?: boolean;
  type: "private" | "group" | "channel";
  icon?: string;
  color: string;
};

const conversations: Conversation[] = [
  {
    id: "armin",
    name: "Armin",
    username: "@armin",
    message: "امشب بازی میای؟",
    time: "20:18",
    unread: 3,
    online: true,
    verified: true,
    type: "private",
    color: "from-blue-500/20 to-primary/10",
  },
  {
    id: "ali",
    name: "Ali",
    username: "@ali",
    message: "اون بازی جدید رو دیدی؟",
    time: "19:42",
    unread: 0,
    online: false,
    type: "private",
    color: "from-purple-500/20 to-primary/10",
  },
  {
    id: "sina",
    name: "Sina",
    username: "@sina",
    message: "فردا ساعت ۸ آنلاین باش",
    time: "18:54",
    unread: 1,
    online: true,
    type: "private",
    color: "from-cyan-500/20 to-primary/10",
  },

  {
    id: "gaming-team",
    name: "Gaming Team",
    username: "@gamingteam",
    message: "Sina: مسابقه ساعت ۱۰ شروع میشه",
    time: "18:30",
    unread: 7,
    type: "group",
    icon: "GT",
    color: "from-primary/25 to-orange-500/10",
  },
  {
    id: "valorant-club",
    name: "Valorant Club",
    username: "@valorant",
    message: "Admin: تورنمنت جدید شروع شد",
    time: "17:15",
    unread: 12,
    type: "group",
    icon: "VC",
    color: "from-red-500/20 to-primary/10",
  },
  {
    id: "friends-group",
    name: "Friends",
    username: "@friends",
    message: "Mahan: کسی امشب بازی میکنه؟",
    time: "16:40",
    unread: 2,
    type: "group",
    icon: "FR",
    color: "from-green-500/20 to-primary/10",
  },

  {
    id: "nexus-news",
    name: "NexUs News",
    username: "@news",
    message: "آپدیت جدید NexUs منتشر شد",
    time: "16:20",
    unread: 5,
    verified: true,
    type: "channel",
    icon: "N",
    color: "from-primary/30 to-yellow-500/10",
  },
  {
    id: "gaming-news",
    name: "Gaming News",
    username: "@gamingnews",
    message: "اخبار جدید دنیای گیم",
    time: "14:45",
    unread: 0,
    type: "channel",
    icon: "GN",
    color: "from-cyan-500/20 to-primary/10",
  },
  {
    id: "nexus-official",
    name: "NexUs Official",
    username: "@nexus",
    message: "به کانال رسمی NexUs خوش آمدید",
    time: "12:30",
    unread: 8,
    verified: true,
    type: "channel",
    icon: "NX",
    color: "from-primary/25 to-blue-500/10",
  },
];

const tabs = [
  {
    id: "chats" as const,
    label: "چت‌ها",
    icon: FiMessageCircle,
  },
  {
    id: "groups" as const,
    label: "گروه‌ها",
    icon: FiUsers,
  },
  {
    id: "channels" as const,
    label: "کانال‌ها",
    icon: FiHash,
  },
];

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<Tab>("chats");

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      if (activeTab === "chats") {
        return conversation.type === "private";
      }

      if (activeTab === "groups") {
        return conversation.type === "group";
      }

      return conversation.type === "channel";
    });
  }, [activeTab]);

  const unreadTotal = conversations.reduce((total, conversation) => total + conversation.unread, 0);

  return (
    <main dir="rtl" className="font-vazir min-h-screen bg-background px-0 py-0 text-foreground">
      <Link
        href="/dashboard"
        aria-label="داشبورد"
        title="داشبورد"
        className="fixed left-4 top-4 z-100 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface/80 text-muted shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95 sm:left-6 sm:top-6"
      >
        <FiMenu size={21} />
      </Link>

      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] overflow-hidden border-x border-border bg-background">
        <section className="flex min-h-screen w-full flex-col lg:w-97.5 lg:shrink-0 lg:border-l lg:border-border">
          <header className="border-b border-border px-4 pb-4 pt-5 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <div className="pr-14 sm:pr-12">
                <p className="text-xs font-bold tracking-[3px] text-primary">NΞXUS</p>

                <h1 className="mt-1 text-xl font-black text-foreground">ارتباطات</h1>
              </div>

              <Link
                href="/notifications"
                aria-label="اعلان‌ها"
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface/60 text-muted transition-all duration-300 hover:border-primary hover:text-primary"
              >
                <FiBell size={18} />

                {unreadTotal > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />}
              </Link>
            </div>
            <Link href="/chat/search" className="group relative mt-5 block">
              <FiSearch size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition-colors group-hover:text-primary" />

              <div className="flex h-12 w-full items-center rounded-2xl border border-border bg-background-secondary pr-11 pl-4 text-sm text-muted transition-all duration-300 group-hover:border-primary group-hover:ring-4 group-hover:ring-primary/10">
                جستجوی گفتگو یا کاربر...
              </div>
            </Link>
            <div className="mt-4 hidden grid-cols-3 gap-1 rounded-2xl bg-background-secondary/70 p-1 sm:grid">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex h-10 items-center justify-center gap-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                      active ? "bg-primary text-background shadow-sm" : "text-muted hover:text-foreground"
                    }`}
                  >
                    <Icon size={15} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </header>
          <div className="flex-1 overflow-y-auto px-2 pb-24 pt-2 sm:p-3 sm:pb-3">
            {filteredConversations.length > 0 ? (
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <ConversationItem key={conversation.id} conversation={conversation} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-87.5 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FiSearch size={22} />
                </div>

                <h2 className="mt-4 font-bold text-foreground">چیزی پیدا نشد</h2>

                <p className="mt-2 text-xs leading-6 text-muted">هنوز گفتگویی در این بخش وجود ندارد.</p>
              </div>
            )}
          </div>
          <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 p-2 backdrop-blur-2xl sm:hidden">
            <div className="mx-auto grid max-w-md grid-cols-3 gap-1 rounded-2xl bg-surface/60 p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition-all duration-300 ${
                      active ? "bg-primary text-background shadow-sm" : "text-muted hover:text-foreground"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </section>

        <section className="hidden min-h-screen flex-1 lg:flex">
          <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-8 text-center">
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-[140px]" />

            <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-[140px]" />

            <div className="relative">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_70px_rgba(212,175,55,.08)]">
                <FiMessageCircle size={38} />
              </div>

              <h2 className="mt-7 text-2xl font-black text-foreground">به NΞXUS خوش آمدی</h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-8 text-muted">یک گفتگو را انتخاب کن یا برای پیدا کردن کاربر موردنظر از جستجو استفاده کن.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ConversationItem({ conversation }: { conversation: Conversation }) {
  const router = useRouter();

  const handleOpen = () => {
    if (conversation.type === "private") {
      router.push(`/chat/${conversation.id}`);
      return;
    }

    if (conversation.type === "group") {
      const username = conversation.username?.replace(/^@/, "");

      if (!username) {
        return;
      }

      router.push(`/group/${username}`);
      return;
    }

    if (conversation.type === "channel") {
      const username = conversation.username?.replace(/^@/, "");

      if (!username) {
        return;
      }

      router.push(`/channel/${username}`);
    }
  };

  return (
    <button type="button" onClick={handleOpen} className="group flex w-full items-center gap-3 rounded-2xl p-3 text-right transition-all duration-300 hover:bg-surface-hover active:scale-[0.99]">
      <ConversationAvatar conversation={conversation} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <h2 className="truncate text-sm font-bold text-foreground">{conversation.name}</h2>

            {conversation.verified && <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-[9px] font-black text-white">✓</span>}
          </div>

          <span className="shrink-0 text-[10px] text-muted">{conversation.time}</span>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <p className="min-w-0 flex-1 truncate text-xs text-muted">{conversation.message}</p>

          {conversation.unread > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[9px] font-black text-background">
              {conversation.unread > 99 ? "99+" : conversation.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function ConversationAvatar({ conversation }: { conversation: Conversation }) {
  if (conversation.type === "private") {
    return (
      <div className="relative shrink-0">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${conversation.color} text-base font-black text-primary`}>
          {conversation.name.charAt(0).toUpperCase()}
        </div>

        {conversation.online && <span className="absolute bottom-0 left-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-success" />}
      </div>
    );
  }

  if (conversation.type === "channel") {
    return (
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${conversation.color} text-xs font-black text-primary`}>
        <FiVolume2 size={18} />
      </div>
    );
  }

  return <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${conversation.color} text-xs font-black text-primary`}>{conversation.icon}</div>;
}
