"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FiBell, FiHash, FiMessageCircle, FiSearch, FiUsers } from "react-icons/fi";
import BottomNav from "../compopnent/BottomNav";

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

export default function CommunicationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>(() => {
    if (pathname?.startsWith("/group")) {
      return "groups";
    }
    if (pathname?.startsWith("/channel")) {
      return "channels";
    }
    return "chats";
  });

  const filteredConversations = useMemo(() => {
    if (activeTab === "chats") {
      return conversations.filter((c) => c.type === "private");
    }
    if (activeTab === "groups") {
      return conversations.filter((c) => c.type === "group");
    }
    return conversations.filter((c) => c.type === "channel");
  }, [activeTab]);

  const unreadTotal = conversations.reduce((total, c) => total + c.unread, 0);

  const openConversation = (conversation: Conversation) => {
    if (conversation.type === "private") {
      router.push(`/chat/${conversation.id}`);
      return;
    }
    const username = conversation.username?.replace(/^@/, "");
    if (!username) return;
    if (conversation.type === "group") {
      router.push(`/group/${username}`);
      return;
    }
    if (conversation.type === "channel") {
      router.push(`/channel/${username}`);
    }
  };

  const isChatPage = pathname?.startsWith("/chat/") || pathname?.startsWith("/group/") || pathname?.startsWith("/channel/");

  return (
    <div dir="rtl" className="h-screen overflow-hidden bg-background text-foreground">
      <div className="flex h-full w-full">
        <aside className={`flex h-full w-full flex-col border-l border-border bg-background ${isChatPage ? "hidden lg:flex" : "flex"} lg:max-w-100 pb-20`}>
          <header className="shrink-0 border-b border-border px-4 pb-4 pt-5 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="text-2xl font-black tracking-[4px] text-primary">
                NΞXUS
              </Link>

              <Link
                href="/notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/60 text-muted transition hover:border-primary hover:text-primary"
              >
                <FiBell size={18} />
                {unreadTotal > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />}
              </Link>
            </div>

            <div className="relative mt-5">
              <FiSearch size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="جستجوی گفتگو یا کاربر..."
                className="h-12 w-full rounded-2xl border border-border bg-background-secondary pr-11 pl-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-1 rounded-2xl bg-background-secondary/70 p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex h-10 items-center justify-center gap-1.5 rounded-xl text-xs font-semibold transition-all ${
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

          <div className="flex-1 overflow-y-auto px-2 pb-24 pt-2 sm:p-3">
            {filteredConversations.length > 0 ? (
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() => openConversation(conversation)}
                    className="group flex w-full items-center gap-3 rounded-2xl p-3 text-right transition-all hover:bg-surface-hover active:scale-[0.99]"
                  >
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
                ))}
              </div>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FiSearch size={22} />
                </div>
                <h2 className="mt-4 font-bold text-foreground">چیزی پیدا نشد</h2>
                <p className="mt-2 text-xs leading-6 text-muted">هنوز گفتگویی در این بخش وجود ندارد.</p>
              </div>
            )}
          </div>

          <BottomNav />
        </aside>

        <main className={`flex-1 overflow-hidden ${isChatPage ? "block w-full" : "hidden lg:block"}`}>{children}</main>
      </div>
    </div>
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
        <span className="text-lg">◖</span>
      </div>
    );
  }

  return <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${conversation.color} text-xs font-black text-primary`}>{conversation.icon}</div>;
}
