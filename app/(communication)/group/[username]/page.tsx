"use client";

import Link from "next/link";
import { use, useMemo, useState, useRef, useEffect } from "react";
import {
  FiArrowRight,
  FiBell,
  FiBellOff,
  FiCheck,
  FiCheckCircle,
  FiChevronLeft,
  FiFile,
  FiHash,
  FiImage,
  FiInfo,
  FiLink,
  FiMoreHorizontal,
  FiPaperclip,
  FiSearch,
  FiSend,
  FiSmile,
  FiUsers,
  FiVolume2,
  FiX,
} from "react-icons/fi";

type Message = {
  id: number;
  sender: "me" | "other";
  name: string;
  avatar: string;
  text?: string;
  time: string;
  read: boolean;
  file?: {
    name: string;
    size: string;
  };
};

type Group = {
  username: string;
  name: string;
  avatar: string;
  members: number;
  online: number;
  verified: boolean;
  description: string;
  type: string;
  messages: Message[];
  membersList: {
    name: string;
    username: string;
    avatar: string;
    role: string;
    online: boolean;
  }[];
};

const baseMembers = [
  { name: "Sina", username: "@sina", avatar: "S", role: "مالک", online: true },
  { name: "Armin", username: "@armin", avatar: "A", role: "مدیر", online: true },
  { name: "Mahan", username: "@mahan", avatar: "M", role: "عضو", online: true },
  { name: "Reza", username: "@reza", avatar: "R", role: "عضو", online: false },
  { name: "Ali", username: "@ali", avatar: "A", role: "عضو", online: false },
];

const groups: Record<string, Group> = {
  gamingteam: {
    username: "gamingteam",
    name: "Gaming Team",
    avatar: "GT",
    members: 128,
    online: 34,
    verified: true,
    description: "تیم اصلی گیمرهای NexUs برای بازی، گفتگو و ساخت تیم‌های مختلف.",
    type: "عمومی",
    messages: [
      { id: 1, sender: "other", name: "Armin", avatar: "A", text: "سلام بچه‌ها 👋", time: "19:42", read: true },
      { id: 2, sender: "other", name: "Mahan", avatar: "M", text: "امشب کسی برای بازی هست؟", time: "19:43", read: true },
      { id: 3, sender: "me", name: "Sina", avatar: "S", text: "آره من هستم، ساعت ۱۰ خوبه؟", time: "19:44", read: true },
      { id: 4, sender: "other", name: "Reza", avatar: "R", text: "برای من اوکیه.", time: "19:45", read: true },
      { id: 5, sender: "other", name: "Armin", avatar: "A", text: "پس ساعت ۱۰ شروع می‌کنیم.", time: "19:46", read: true },
      { id: 6, sender: "other", name: "Mahan", avatar: "M", text: "https://nexus.example.com/game", time: "19:48", read: true },
      { id: 7, sender: "other", name: "Armin", avatar: "A", text: "این فایل تنظیمات بازیه.", time: "19:50", read: true, file: { name: "game-config.zip", size: "2.4 MB" } },
    ],
    membersList: baseMembers,
  },
  valorant: {
    username: "valorant",
    name: "Valorant Club",
    avatar: "VC",
    members: 96,
    online: 27,
    verified: true,
    description: "جامعه بازیکنان Valorant برای تمرین، مسابقات و پیدا کردن هم‌تیمی.",
    type: "عمومی",
    messages: [
      { id: 101, sender: "other", name: "Admin", avatar: "A", text: "به Valorant Club خوش آمدید 🎮", time: "17:10", read: true },
      { id: 102, sender: "other", name: "Sina", avatar: "S", text: "تورمنت جدید شروع شد.", time: "17:15", read: true },
      { id: 103, sender: "me", name: "Sina", avatar: "S", text: "چه ساعتی مسابقه داریم؟", time: "17:18", read: true },
      { id: 104, sender: "other", name: "Armin", avatar: "A", text: "امشب ساعت ۹.", time: "17:20", read: true },
    ],
    membersList: [
      { name: "Sina", username: "@sina", avatar: "S", role: "مالک", online: true },
      { name: "Admin", username: "@admin", avatar: "A", role: "مدیر", online: true },
      { name: "Armin", username: "@armin", avatar: "A", role: "عضو", online: true },
      { name: "Mahan", username: "@mahan", avatar: "M", role: "عضو", online: false },
      { name: "Ali", username: "@ali", avatar: "A", role: "عضو", online: false },
    ],
  },
  friends: {
    username: "friends",
    name: "Friends",
    avatar: "FR",
    members: 54,
    online: 18,
    verified: false,
    description: "گروه دوستان و گپ روزانه برای هماهنگی بازی و گفتگو.",
    type: "خصوصی",
    messages: [
      { id: 201, sender: "other", name: "Mahan", avatar: "M", text: "کسی امشب بازی می‌کنه؟", time: "16:40", read: true },
      { id: 202, sender: "other", name: "Reza", avatar: "R", text: "من هستم.", time: "16:42", read: true },
      { id: 203, sender: "me", name: "Sina", avatar: "S", text: "پس ساعت ۱۰ آنلاین میشم.", time: "16:44", read: true },
      { id: 204, sender: "other", name: "Armin", avatar: "A", text: "اوکی 👌", time: "16:45", read: true },
    ],
    membersList: [
      { name: "Sina", username: "@sina", avatar: "S", role: "مالک", online: true },
      { name: "Mahan", username: "@mahan", avatar: "M", role: "مدیر", online: true },
      { name: "Reza", username: "@reza", avatar: "R", role: "عضو", online: false },
      { name: "Armin", username: "@armin", avatar: "A", role: "عضو", online: true },
    ],
  },
};

export default function GroupPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const [notifications, setNotifications] = useState(true);
  const normalizedUsername = username?.toLowerCase().replace(/^@/, "");
  const group = groups[normalizedUsername] ?? groups.gamingteam;

  const [messages, setMessages] = useState<Message[]>(group.messages);
  const [message, setMessage] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return messages;
    return messages.filter((item) => item.text?.toLowerCase().includes(query));
  }, [messages, search]);

  const sendMessage = () => {
    const value = message.trim();
    if (!value) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: "me",
        name: "Sina",
        avatar: "S",
        text: value,
        time: new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()),
        read: false,
      },
    ]);
    setMessage("");
  };

  return (
    <div dir="rtl" className="flex h-screen flex-col bg-background text-foreground">
      <header className="shrink-0 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="flex items-center gap-3 px-3 h-16 sm:px-5">
          <Link href="/chat" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted hover:border-primary hover:text-primary transition-colors">
            <FiArrowRight size={18} />
          </Link>

          <button
            onClick={() => {
              setInfoOpen(true);
              setMembersOpen(false);
              setMenuOpen(false);
            }}
            className="flex flex-1 min-w-0 items-center gap-3 text-right"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">{group.avatar}</div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="truncate text-sm font-bold">{group.name}</h1>
                {group.verified && <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-black text-white">✓</span>}
              </div>
              <p className="text-[10px] text-muted truncate">
                @{group.username} • {group.members} عضو • {group.online} آنلاین
              </p>
            </div>
          </button>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMenuOpen(false);
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${searchOpen ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface-hover hover:text-primary"}`}
            >
              <FiSearch size={17} />
            </button>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${notifications ? "text-primary hover:bg-primary/10" : "text-muted hover:bg-surface-hover"}`}
            >
              {notifications ? <FiBell size={17} /> : <FiBellOff size={17} />}
            </button>
            <button
              onClick={() => {
                setMembersOpen(true);
                setInfoOpen(false);
                setMenuOpen(false);
              }}
              className="hidden sm:flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-muted hover:bg-surface-hover hover:text-primary transition-colors"
            >
              <FiUsers size={16} /> اعضا
            </button>
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setSearchOpen(false);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-hover hover:text-primary transition-colors"
            >
              <FiMoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border px-3 py-2.5">
            <div className="relative">
              <FiSearch size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`جستجو در پیام‌ها...`}
                className="w-full h-9 rounded-lg border border-border bg-background-secondary pr-9 pl-8 text-xs outline-none focus:border-primary transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {menuOpen && (
          <div className="absolute left-3 top-14 z-50 w-52 rounded-xl border border-border bg-surface py-1 shadow-xl">
            {[
              {
                icon: <FiInfo size={15} />,
                label: "اطلاعات گروه",
                action: () => {
                  setInfoOpen(true);
                  setMenuOpen(false);
                },
              },
              {
                icon: <FiUsers size={15} />,
                label: "مشاهده اعضا",
                action: () => {
                  setMembersOpen(true);
                  setMenuOpen(false);
                },
              },
              { icon: <FiLink size={15} />, label: "لینک دعوت", action: () => setMenuOpen(false) },
              { icon: <FiVolume2 size={15} />, label: "تنظیمات اعلان‌ها", action: () => setMenuOpen(false) },
            ].map((item, i) => (
              <button key={i} onClick={item.action} className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-medium hover:bg-surface-hover hover:text-primary transition-colors">
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto bg-background-secondary/30 px-3 py-4 sm:px-5">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 text-center">
            <div className="inline-block rounded-xl border border-primary/10 bg-primary/5 px-4 py-2">
              <p className="text-xs font-bold text-primary">{group.name}</p>
              <p className="mt-0.5 text-[10px] text-muted">{group.description}</p>
            </div>
          </div>

          <div className="mb-4 text-center">
            <span className="rounded-full border border-border bg-surface/80 px-3 py-1 text-[9px] font-medium text-muted">امروز</span>
          </div>

          <div className="space-y-2">
            {filteredMessages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {filteredMessages.length === 0 && (
            <div className="flex h-48 items-center justify-center text-center">
              <div>
                <FiSearch size={24} className="mx-auto text-muted" />
                <p className="mt-2 text-sm font-medium">پیامی پیدا نشد</p>
                <p className="text-xs text-muted">عبارت دیگری امتحان کن</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="shrink-0 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 p-2.5">
        {attachmentOpen && (
          <div className="mx-auto mb-2 flex max-w-3xl gap-2 overflow-x-auto pb-1">
            {[
              { icon: <FiImage size={16} />, label: "تصویر" },
              { icon: <FiFile size={16} />, label: "فایل" },
              { icon: <FiLink size={16} />, label: "لینک" },
            ].map((item, i) => (
              <button
                key={i}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary transition-colors"
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        )}

        <div className="mx-auto flex max-w-3xl items-end gap-2">
          <button
            onClick={() => setAttachmentOpen(!attachmentOpen)}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
              attachmentOpen ? "bg-primary/10 text-primary" : "border border-border bg-surface/60 text-muted hover:border-primary hover:text-primary"
            }`}
          >
            <FiPaperclip size={16} />
          </button>

          <div className="relative flex-1 min-h-10 rounded-xl border border-border bg-surface/60 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              placeholder="پیام بنویس..."
              className="w-full min-h-10 max-h-32 resize-none bg-transparent px-3 py-2.5 pl-9 text-sm leading-5 outline-none placeholder:text-muted"
            />
            <button className="absolute bottom-1.5 left-1.5 flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-primary/10 hover:text-primary transition-colors">
              <FiSmile size={16} />
            </button>
          </div>

          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <FiSend size={16} />
          </button>
        </div>
      </footer>

      {(infoOpen || membersOpen) && (
        <div className="fixed inset-0 z-50">
          <button
            onClick={() => {
              setInfoOpen(false);
              setMembersOpen(false);
            }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <aside className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-background border-r border-border shadow-xl flex flex-col">
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <h2 className="font-bold text-sm">{membersOpen ? "اعضا" : "اطلاعات گروه"}</h2>
              <button
                onClick={() => {
                  setInfoOpen(false);
                  setMembersOpen(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted hover:border-primary hover:text-primary transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            {membersOpen ? (
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <div className="rounded-xl border border-primary/10 bg-primary/5 p-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FiUsers size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{group.members} عضو</p>
                    <p className="text-xs text-emerald-500">{group.online} نفر آنلاین</p>
                  </div>
                </div>
                {group.membersList.map((member) => (
                  <div key={member.username} className="flex items-center gap-3 rounded-xl border border-border bg-surface/40 p-3">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-sm">{member.avatar}</div>
                      {member.online && <span className="absolute bottom-0 left-0 h-2.5 w-2.5 rounded-full border-2 border-surface bg-emerald-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-bold">{member.name}</p>
                        {member.role !== "عضو" && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[8px] font-bold text-primary">{member.role}</span>}
                      </div>
                      <p className="text-[10px] text-muted truncate">{member.username}</p>
                    </div>
                    {member.online && <span className="text-[9px] font-medium text-emerald-500">آنلاین</span>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="border-b border-border p-5 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary">{group.avatar}</div>
                  <h3 className="mt-3 font-bold">{group.name}</h3>
                  <p className="text-xs text-primary">@{group.username}</p>
                  <p className="mt-3 text-xs leading-6 text-muted">{group.description}</p>
                </div>
                <div className="p-4 space-y-2">
                  {[
                    {
                      icon: <FiUsers size={15} />,
                      label: "اعضا",
                      value: `${group.members} عضو`,
                      action: () => {
                        setInfoOpen(false);
                        setMembersOpen(true);
                      },
                    },
                    { icon: <FiHash size={15} />, label: "نام کاربری", value: `@${group.username}` },
                    { icon: <FiVolume2 size={15} />, label: "اعلان‌ها", value: "فعال" },
                    { icon: <FiInfo size={15} />, label: "نوع گروه", value: group.type },
                  ].map((item, i) => (
                    <button
                      key={i}
                      onClick={item.action}
                      className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface/40 p-3 text-right hover:border-primary/30 hover:bg-surface-hover transition-colors"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold">{item.label}</p>
                        <p className="truncate text-[10px] text-muted">{item.value}</p>
                      </div>
                      <FiChevronLeft size={14} className="text-muted" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-start" : "justify-end"}`}>
      <div className={`flex max-w-[85%] items-end gap-2 ${isMe ? "flex-row" : "flex-row-reverse"}`}>
        {!isMe && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{message.avatar}</div>}
        <div className={`flex min-w-0 flex-col ${isMe ? "items-start" : "items-end"}`}>
          {!isMe && <span className="mb-0.5 px-1 text-[9px] font-bold text-primary">{message.name}</span>}
          <div className={`rounded-3xl px-4 py-2.5 text-sm leading-relaxed ${isMe ? "bg-primary text-white rounded-br-none" : "bg-surface border border-border rounded-bl-none"}`}>
            {message.text && <LinkifiedText text={message.text} />}
            {message.file && (
              <div className={`mt-2 flex items-center gap-2.5 rounded-xl p-2.5 ${isMe ? "bg-white/10" : "bg-background-secondary"}`}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiFile size={14} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{message.file.name}</p>
                  <p className={`text-[9px] ${isMe ? "text-white/70" : "text-muted"}`}>{message.file.size}</p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-1 px-1">
            <span className="text-[8px] text-muted">{message.time}</span>
            {isMe && (message.read ? <FiCheckCircle size={10} className="text-primary" /> : <FiCheck size={10} className="text-muted" />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return (
    <p className="whitespace-pre-wrap break-word">
      {parts.map((part, i) => {
        if (part.startsWith("http://") || part.startsWith("https://")) {
          return (
            <a key={i} href={part} target="_blank" rel="noreferrer" className="font-medium text-yellow-400 underline decoration-yellow-400/30 underline-offset-2 hover:text-yellow-300">
              {part}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}
