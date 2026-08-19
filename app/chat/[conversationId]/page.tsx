"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiArrowRight, FiCheck, FiCheckCircle, FiCopy, FiFile, FiImage, FiLink, FiMoreHorizontal, FiPaperclip, FiPhone, FiPlus, FiSearch, FiSend, FiSmile, FiUser, FiVideo, FiX } from "react-icons/fi";

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

const users = {
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

export default function ConversationPage() {
  const [conversationId, setConversationId] = useState("armin");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachmentOpen, setAttachmentOpen] = useState(false);

  const user = users[conversationId as keyof typeof users] ?? users.armin;

  const filteredMessages = useMemo(() => {
    if (!search.trim()) {
      return messages;
    }

    return messages.filter((item) => item.text?.toLowerCase().includes(search.toLowerCase()));
  }, [messages, search]);

  const sendMessage = () => {
    const value = message.trim();

    if (!value) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: "me",
        text: value,
        time: new Intl.DateTimeFormat("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
        read: false,
      },
    ]);

    setMessage("");
  };

  const handleConversationChange = (id: keyof typeof users) => {
    setConversationId(id);
    setMessages(initialMessages);
    setSearch("");
    setSearchOpen(false);
    setMenuOpen(false);
  };

  return (
    <main dir="rtl" className="font-vazir flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-80 shrink-0 flex-col border-l border-border bg-surface/50 lg:flex">
        <div className="border-b border-border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-[3px] text-primary">NΞXUS</p>

              <h1 className="mt-1 text-lg font-black text-foreground">گفتگوها</h1>
            </div>

            <Link
              href="/chat"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition hover:border-primary hover:text-primary"
              aria-label="بازگشت به چت‌ها"
            >
              <FiArrowRight size={18} />
            </Link>
          </div>

          <div className="relative mt-4">
            <FiSearch size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />

            <input
              type="text"
              placeholder="جستجو..."
              className="h-11 w-full rounded-xl border border-border bg-background-secondary pr-10 pl-4 text-xs text-foreground outline-none transition focus:border-primary"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <ConversationPreview name="Armin" username="@armin" avatar="A" active={conversationId === "armin"} online onClick={() => handleConversationChange("armin")} />

          <ConversationPreview name="Ali" username="@ali" avatar="A" active={conversationId === "ali"} onClick={() => handleConversationChange("ali")} />

          <ConversationPreview name="Sina" username="@sina" avatar="S" active={conversationId === "sina"} online onClick={() => handleConversationChange("sina")} />
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-3 sm:px-5">
            <Link
              href="/chat"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-muted transition hover:border-primary hover:text-primary lg:hidden"
              aria-label="بازگشت"
            >
              <FiArrowRight size={19} />
            </Link>

            <Link href={`/profile/${user.username.replace("@", "")}`} className="relative shrink-0">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 font-black text-primary">{user.avatar}</div>

              {user.online && <span className="absolute bottom-0 left-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-success" />}
            </Link>

            <Link href={`/profile/${user.username.replace("@", "")}`} className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate text-sm font-bold text-foreground">{user.name}</h2>

                {user.verified && <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-[9px] font-black text-white">✓</span>}
              </div>

              <p className={`mt-0.5 truncate text-[10px] ${user.online ? "text-success" : "text-muted"}`}>{user.status}</p>
            </Link>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setSearchOpen((current) => !current);
                  setMenuOpen(false);
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${searchOpen ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface-hover hover:text-primary"}`}
                aria-label="جستجوی پیام"
              >
                <FiSearch size={18} />
              </button>

              <button type="button" className="hidden h-10 w-10 items-center justify-center rounded-xl text-muted transition hover:bg-surface-hover hover:text-primary sm:flex" aria-label="تماس صوتی">
                <FiPhone size={18} />
              </button>

              <button
                type="button"
                className="hidden h-10 w-10 items-center justify-center rounded-xl text-muted transition hover:bg-surface-hover hover:text-primary sm:flex"
                aria-label="تماس تصویری"
              >
                <FiVideo size={18} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen((current) => !current);
                  setSearchOpen(false);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-muted transition hover:bg-surface-hover hover:text-primary"
                aria-label="بیشتر"
              >
                <FiMoreHorizontal size={19} />
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="border-t border-border p-3">
              <div className="relative">
                <FiSearch size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />

                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="جستجو در پیام‌ها..."
                  className="h-11 w-full rounded-xl border border-border bg-background-secondary pr-10 pl-4 text-xs text-foreground outline-none focus:border-primary"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute left-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:text-foreground"
                  >
                    <FiX size={15} />
                  </button>
                )}
              </div>
            </div>
          )}

          {menuOpen && (
            <div className="absolute left-3 top-14 z-50 w-52 overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-2xl">
              <MenuButton icon={<FiUser size={16} />} title="مشاهده پروفایل" />

              <MenuButton icon={<FiLink size={16} />} title="لینک‌های این گفتگو" />

              <MenuButton icon={<FiCopy size={16} />} title="کپی نام کاربری" />

              <MenuButton icon={<FiMoreHorizontal size={16} />} title="گزینه‌های بیشتر" />
            </div>
          )}
        </header>

        <div className="relative flex-1 overflow-y-auto bg-background-secondary/20 px-3 py-5 sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-primary/5 blur-[120px]" />

            <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-primary/5 blur-[120px]" />
          </div>

          <div className="relative mx-auto flex max-w-4xl flex-col gap-2">
            <div className="mb-5 flex justify-center">
              <span className="rounded-full border border-border bg-surface/80 px-4 py-1.5 text-[10px] font-semibold text-muted backdrop-blur-md">امروز</span>
            </div>

            {filteredMessages.map((item) => (
              <MessageBubble key={item.id} message={item} />
            ))}

            {filteredMessages.length === 0 && (
              <div className="flex min-h-60 items-center justify-center">
                <div className="text-center">
                  <FiSearch size={28} className="mx-auto text-muted" />

                  <p className="mt-3 text-sm font-semibold text-foreground">پیامی پیدا نشد</p>

                  <p className="mt-1 text-xs text-muted">عبارت دیگری را جستجو کنید.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="border-t border-border bg-background p-2.5 sm:p-3">
          {attachmentOpen && (
            <div className="mx-auto mb-2 flex max-w-4xl gap-2 overflow-x-auto rounded-2xl border border-border bg-surface/70 p-2">
              <AttachmentButton icon={<FiImage size={18} />} title="تصویر" />

              <AttachmentButton icon={<FiFile size={18} />} title="فایل" />

              <AttachmentButton icon={<FiLink size={18} />} title="لینک" />

              <AttachmentButton icon={<FiPlus size={18} />} title="بیشتر" />
            </div>
          )}

          <div className="mx-auto flex max-w-4xl items-end gap-2">
            <button
              type="button"
              onClick={() => setAttachmentOpen((current) => !current)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all ${
                attachmentOpen ? "bg-primary/10 text-primary" : "border border-border bg-surface/50 text-muted hover:border-primary hover:text-primary"
              }`}
              aria-label="پیوست"
            >
              <FiPaperclip size={18} />
            </button>

            <div className="relative flex min-h-11 flex-1 items-end rounded-2xl border border-border bg-surface/60 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
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
                className="max-h-32 min-h-11 w-full resize-none bg-transparent px-4 py-3 pl-12 text-sm leading-6 text-foreground outline-none placeholder:text-muted"
              />

              <button
                type="button"
                className="absolute bottom-1.5 left-1.5 flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-primary/10 hover:text-primary"
                aria-label="ایموجی"
              >
                <FiSmile size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={sendMessage}
              disabled={!message.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-background transition-all duration-300 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="ارسال پیام"
            >
              <FiSend size={18} />
            </button>
          </div>

          <p className="mx-auto mt-2 hidden max-w-4xl text-[9px] text-muted sm:block">Enter برای ارسال پیام • Shift + Enter برای خط جدید</p>
        </footer>
      </section>
    </main>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[88%] sm:max-w-[70%] ${isMe ? "items-start" : "items-end"} flex flex-col`}>
        <div className={`rounded-2xl px-4 py-2.5 ${isMe ? "rounded-bl-md bg-primary text-background" : "rounded-br-md border border-border bg-surface/80 text-foreground"}`}>
          {message.text && <LinkifiedText text={message.text} />}

          {message.file && (
            <div className={`mt-2 flex items-center gap-3 rounded-xl p-3 ${isMe ? "bg-background/10" : "bg-background-secondary"}`}>
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isMe ? "bg-background/10" : "bg-primary/10 text-primary"}`}>
                <FiFile size={18} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-bold">{message.file.name}</p>

                <p className={`mt-1 text-[10px] ${isMe ? "text-background/70" : "text-muted"}`}>{message.file.size}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-1 flex items-center gap-1.5 px-1">
          <span className="text-[9px] text-muted">{message.time}</span>

          {isMe && (message.read ? <FiCheckCircle size={12} className="text-primary" /> : <FiCheck size={12} className="text-muted" />)}
        </div>
      </div>
    </div>
  );
}

function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);

  return (
    <p className="whitespace-pre-wrap wrap-break-words text-sm leading-6">
      {parts.map((part, index) => {
        const isLink = part.startsWith("http://") || part.startsWith("https://");

        if (!isLink) {
          return <span key={index}>{part}</span>;
        }

        return (
          <a key={index} href={part} target="_blank" rel="noreferrer" className="font-semibold text-yellow-400 underline decoration-yellow-400/30 underline-offset-4 transition hover:text-yellow-300">
            {part}
          </a>
        );
      })}
    </p>
  );
}

function ConversationPreview({ name, username, avatar, active, online, onClick }: { name: string; username: string; avatar: string; active: boolean; online?: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`flex w-full items-center gap-3 rounded-2xl p-3 text-right transition-all duration-300 ${active ? "bg-primary/10" : "hover:bg-surface-hover"}`}>
      <div className="relative shrink-0">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl font-black ${active ? "bg-primary text-background" : "bg-primary/10 text-primary"}`}>{avatar}</div>

        {online && <span className="absolute bottom-0 left-0 h-3.5 w-3.5 rounded-full border-2 border-surface bg-success" />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-foreground">{name}</p>

        <p className="mt-1 truncate text-[10px] text-muted">{username}</p>
      </div>

      {active && <span className="h-2 w-2 rounded-full bg-primary" />}
    </button>
  );
}

function MenuButton({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <button type="button" className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-xs font-semibold text-foreground transition hover:bg-surface-hover hover:text-primary">
      {icon}
      {title}
    </button>
  );
}

function AttachmentButton({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <button
      type="button"
      className="flex h-10 shrink-0 items-center gap-2 rounded-xl border border-border bg-background-secondary px-4 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary"
    >
      {icon}
      {title}
    </button>
  );
}
