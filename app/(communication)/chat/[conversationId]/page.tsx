"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import {
  FiArrowRight,
  FiBell,
  FiBellOff,
  FiCheck,
  FiCheckCircle,
  FiCopy,
  FiFile,
  FiImage,
  FiLink,
  FiMoreHorizontal,
  FiPaperclip,
  FiPhone,
  FiPlus,
  FiSearch,
  FiSend,
  FiSmile,
  FiUser,
  FiVideo,
  FiX,
} from "react-icons/fi";

type Message = {
  id: number;
  sender: "me" | "other";
  text?: string;
  time: string;
  read: boolean;
  file?: {
    name: string;
    size: string;
  };
};

type User = {
  name: string;
  username: string;
  status: string;
  online: boolean;
  verified: boolean;
  avatar: string;
};

const users: Record<string, User> = {
  armin: {
    name: "Armin",
    username: "@armin",
    status: "آنلاین",
    online: true,
    verified: true,
    avatar: "A",
  },
  ali: {
    name: "Ali",
    username: "@ali",
    status: "آخرین بازدید اخیراً",
    online: false,
    verified: false,
    avatar: "A",
  },
  sina: {
    name: "Sina",
    username: "@sina",
    status: "آنلاین",
    online: true,
    verified: false,
    avatar: "S",
  },
};

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "other",
    text: "سلام سینا 👋",
    time: "20:01",
    read: true,
  },
  {
    id: 2,
    sender: "me",
    text: "سلام، خوبی؟",
    time: "20:02",
    read: true,
  },
  {
    id: 3,
    sender: "other",
    text: "آره خوبم. امشب بازی میای؟",
    time: "20:03",
    read: true,
  },
  {
    id: 4,
    sender: "me",
    text: "آره حتماً. ساعت چند؟",
    time: "20:04",
    read: true,
  },
  {
    id: 5,
    sender: "other",
    text: "حدود ساعت ۱۰ آنلاین میشم.",
    time: "20:05",
    read: true,
  },
  {
    id: 6,
    sender: "other",
    text: "این لینک رو هم ببین، فکر کنم به کارت بیاد:",
    time: "20:06",
    read: true,
  },
  {
    id: 7,
    sender: "other",
    text: "https://nexus.example.com/game",
    time: "20:06",
    read: true,
  },
  {
    id: 8,
    sender: "me",
    text: "اوکی، الان نگاهش می‌کنم.",
    time: "20:07",
    read: true,
  },
  {
    id: 9,
    sender: "other",
    text: "یه فایل هم برات فرستادم.",
    time: "20:08",
    read: true,
    file: {
      name: "game-config.zip",
      size: "2.4 MB",
    },
  },
];

function getEnglishTime() {
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}`;
}

export default function ConversationPage() {
  const params = useParams<{ conversationId?: string }>();

  const conversationId = String(params?.conversationId ?? "armin")
    .toLowerCase()
    .replace("@", "");

  const user = users[conversationId] ?? users.armin;
  const [notifications, setNotifications] = useState(true);

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachmentOpen, setAttachmentOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredMessages = useMemo(() => {
    if (!search.trim()) {
      return messages;
    }
    const query = search.trim().toLowerCase();
    return messages.filter((item) => item.text?.toLowerCase().includes(query));
  }, [messages, search]);

  const sendMessage = () => {
    const value = message.trim();
    if (!value) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "me",
      text: value,
      time: getEnglishTime(),
      read: false,
    };

    setMessages((current) => [...current, newMessage]);
    setMessage("");
  };

  return (
    <div dir="rtl" className="flex h-screen flex-col bg-background text-foreground">
      <header className="shrink-0 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="flex h-16 items-center gap-3 px-3 sm:px-5">
          <Link
            href="/chat"
            aria-label="بازگشت"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted hover:border-primary hover:text-primary transition-colors"
          >
            <FiArrowRight size={18} />
          </Link>

          <Link href={`/profile/${user.username.replace("@", "")}`} className="relative shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">{user.avatar}</div>
            {user.online && <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />}
          </Link>

          <Link href={`/profile/${user.username.replace("@", "")}`} className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="truncate text-sm font-bold text-foreground">{user.name}</h2>
              {user.verified && <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-black text-white">✓</span>}
            </div>
            <p className={`mt-0.5 truncate text-[10px] ${user.online ? "text-emerald-500" : "text-muted"}`}>{user.status}</p>
          </Link>

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => {
                setSearchOpen((current) => !current);
                setMenuOpen(false);
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${searchOpen ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface-hover hover:text-primary"}`}
              aria-label="جستجوی پیام"
            >
              <FiSearch size={17} />
            </button>
            <button
              type="button"
              onClick={() => setNotifications((value) => !value)}
              aria-label="اعلان‌ها"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${notifications ? "text-primary hover:bg-primary/10" : "text-muted hover:bg-surface-hover"}`}
            >
              {notifications ? <FiBell size={17} /> : <FiBellOff size={17} />}
            </button>
            <button
              type="button"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-hover hover:text-primary transition-colors"
              aria-label="تماس صوتی"
            >
              <FiPhone size={17} />
            </button>
            <button
              type="button"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-hover hover:text-primary transition-colors"
              aria-label="تماس تصویری"
            >
              <FiVideo size={17} />
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen((current) => !current);
                setSearchOpen(false);
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${menuOpen ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface-hover hover:text-primary"}`}
              aria-label="بیشتر"
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
                onChange={(event) => setSearch(event.target.value)}
                placeholder="جستجو در پیام‌ها..."
                className="w-full h-9 rounded-lg border border-border bg-background-secondary pr-9 pl-8 text-xs text-foreground outline-none focus:border-primary transition-colors"
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground" aria-label="پاک کردن جستجو">
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {menuOpen && (
          <>
            <button type="button" aria-label="بستن منو" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 cursor-default" />
            <div className="absolute left-3 top-14 z-50 w-52 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-xl">
              <Link
                href={`/profile/${user.username.replace("@", "")}`}
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-full items-center gap-3 px-3 text-xs font-medium text-foreground hover:bg-surface-hover hover:text-primary transition-colors"
              >
                <FiUser size={15} />
                مشاهده پروفایل
              </Link>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(user.username);
                  setMenuOpen(false);
                }}
                className="flex h-9 w-full items-center gap-3 px-3 text-xs font-medium text-foreground hover:bg-surface-hover hover:text-primary transition-colors"
              >
                <FiCopy size={15} />
                کپی نام کاربری
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-full items-center gap-3 px-3 text-xs font-medium text-foreground hover:bg-surface-hover hover:text-primary transition-colors"
              >
                <FiLink size={15} />
                گزارش تخلف
              </button>
            </div>
          </>
        )}
      </header>

      <div className="flex-1 overflow-y-auto bg-background-secondary/30 px-3 py-4 sm:px-5">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-4 text-center">
            <span className="rounded-full border border-border bg-surface/80 px-3 py-1 text-[9px] font-medium text-muted backdrop-blur-md">امروز</span>
          </div>

          <div className="space-y-2">
            {filteredMessages.map((item) => (
              <MessageBubble key={item.id} message={item} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {filteredMessages.length === 0 && (
            <div className="flex h-48 items-center justify-center">
              <div className="text-center">
                <FiSearch size={24} className="mx-auto text-muted" />
                <p className="mt-2 text-sm font-medium text-foreground">پیامی پیدا نشد</p>
                <p className="mt-0.5 text-xs text-muted">عبارت دیگری را جستجو کنید.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="shrink-0 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 p-2.5">
        {attachmentOpen && (
          <div className="mx-auto mb-2 flex max-w-3xl gap-2 overflow-x-auto pb-1">
            <AttachmentButton icon={<FiImage size={16} />} title="تصویر" />
            <AttachmentButton icon={<FiFile size={16} />} title="فایل" />
            <AttachmentButton icon={<FiLink size={16} />} title="لینک" />
            <AttachmentButton icon={<FiPlus size={16} />} title="بیشتر" />
          </div>
        )}

        <div className="mx-auto flex max-w-3xl items-end gap-2">
          <button
            type="button"
            onClick={() => setAttachmentOpen((current) => !current)}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
              attachmentOpen ? "bg-primary/10 text-primary" : "border border-border bg-surface/50 text-muted hover:border-primary hover:text-primary"
            }`}
            aria-label="پیوست"
          >
            <FiPaperclip size={16} />
          </button>

          <div className="relative flex-1 min-h-10 rounded-xl border border-border bg-surface/60 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              placeholder="پیامت را بنویس..."
              className="w-full min-h-10 max-h-32 resize-none bg-transparent px-3 py-2.5 pl-9 text-sm leading-5 text-foreground outline-none placeholder:text-muted"
            />
            <button
              type="button"
              className="absolute bottom-1.5 left-1.5 flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="ایموجی"
            >
              <FiSmile size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={sendMessage}
            disabled={!message.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="ارسال پیام"
          >
            <FiSend size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-start" : "justify-end"}`}>
      <div className={`flex max-w-[85%] flex-col sm:max-w-[70%] ${isMe ? "items-start" : "items-end"}`}>
        <div className={`rounded-3xl px-4 py-2.5 text-sm leading-relaxed ${isMe ? "bg-primary text-white rounded-br-none" : "bg-surface border border-border text-foreground rounded-bl-none"}`}>
          {message.text && <LinkifiedText text={message.text} />}

          {message.file && (
            <div className={`mt-2 flex items-center gap-2.5 rounded-xl p-2.5 ${isMe ? "bg-white/10" : "bg-background-secondary"}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${isMe ? "bg-white/10" : "bg-primary/10 text-primary"}`}>
                <FiFile size={14} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{message.file.name}</p>
                <p className={`mt-0.5 text-[9px] ${isMe ? "text-white/70" : "text-muted"}`}>{message.file.size}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-0.5 flex items-center gap-1 px-1">
          <span className="text-[8px] text-muted" dir="ltr">
            {message.time}
          </span>
          {isMe && (message.read ? <FiCheckCircle size={10} className="text-primary" /> : <FiCheck size={10} className="text-muted" />)}
        </div>
      </div>
    </div>
  );
}

function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);

  return (
    <p className="whitespace-pre-wrap break-word">
      {parts.map((part, index) => {
        const isLink = part.startsWith("http://") || part.startsWith("https://");

        if (!isLink) {
          return <span key={index}>{part}</span>;
        }

        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-yellow-400 underline decoration-yellow-400/30 underline-offset-2 hover:text-yellow-300 transition-colors"
          >
            {part}
          </a>
        );
      })}
    </p>
  );
}

function AttachmentButton({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <button
      type="button"
      className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background-secondary px-3 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
    >
      {icon}
      {title}
    </button>
  );
}
