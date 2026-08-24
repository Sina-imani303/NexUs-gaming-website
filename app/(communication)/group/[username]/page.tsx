"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";
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
  {
    name: "Sina",
    username: "@sina",
    avatar: "S",
    role: "مالک",
    online: true,
  },
  {
    name: "Armin",
    username: "@armin",
    avatar: "A",
    role: "مدیر",
    online: true,
  },
  {
    name: "Mahan",
    username: "@mahan",
    avatar: "M",
    role: "عضو",
    online: true,
  },
  {
    name: "Reza",
    username: "@reza",
    avatar: "R",
    role: "عضو",
    online: false,
  },
  {
    name: "Ali",
    username: "@ali",
    avatar: "A",
    role: "عضو",
    online: false,
  },
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
      {
        id: 1,
        sender: "other",
        name: "Armin",
        avatar: "A",
        text: "سلام بچه‌ها 👋",
        time: "19:42",
        read: true,
      },
      {
        id: 2,
        sender: "other",
        name: "Mahan",
        avatar: "M",
        text: "امشب کسی برای بازی هست؟",
        time: "19:43",
        read: true,
      },
      {
        id: 3,
        sender: "me",
        name: "Sina",
        avatar: "S",
        text: "آره من هستم، ساعت ۱۰ خوبه؟",
        time: "19:44",
        read: true,
      },
      {
        id: 4,
        sender: "other",
        name: "Reza",
        avatar: "R",
        text: "برای من اوکیه.",
        time: "19:45",
        read: true,
      },
      {
        id: 5,
        sender: "other",
        name: "Armin",
        avatar: "A",
        text: "پس ساعت ۱۰ شروع می‌کنیم.",
        time: "19:46",
        read: true,
      },
      {
        id: 6,
        sender: "other",
        name: "Mahan",
        avatar: "M",
        text: "https://nexus.example.com/game",
        time: "19:48",
        read: true,
      },
      {
        id: 7,
        sender: "other",
        name: "Armin",
        avatar: "A",
        text: "این فایل تنظیمات بازیه.",
        time: "19:50",
        read: true,
        file: {
          name: "game-config.zip",
          size: "2.4 MB",
        },
      },
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
      {
        id: 101,
        sender: "other",
        name: "Admin",
        avatar: "A",
        text: "به Valorant Club خوش آمدید 🎮",
        time: "17:10",
        read: true,
      },
      {
        id: 102,
        sender: "other",
        name: "Sina",
        avatar: "S",
        text: "تورمنت جدید شروع شد.",
        time: "17:15",
        read: true,
      },
      {
        id: 103,
        sender: "me",
        name: "Sina",
        avatar: "S",
        text: "چه ساعتی مسابقه داریم؟",
        time: "17:18",
        read: true,
      },
      {
        id: 104,
        sender: "other",
        name: "Armin",
        avatar: "A",
        text: "امشب ساعت ۹.",
        time: "17:20",
        read: true,
      },
    ],
    membersList: [
      {
        name: "Sina",
        username: "@sina",
        avatar: "S",
        role: "مالک",
        online: true,
      },
      {
        name: "Admin",
        username: "@admin",
        avatar: "A",
        role: "مدیر",
        online: true,
      },
      {
        name: "Armin",
        username: "@armin",
        avatar: "A",
        role: "عضو",
        online: true,
      },
      {
        name: "Mahan",
        username: "@mahan",
        avatar: "M",
        role: "عضو",
        online: false,
      },
      {
        name: "Ali",
        username: "@ali",
        avatar: "A",
        role: "عضو",
        online: false,
      },
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
      {
        id: 201,
        sender: "other",
        name: "Mahan",
        avatar: "M",
        text: "کسی امشب بازی می‌کنه؟",
        time: "16:40",
        read: true,
      },
      {
        id: 202,
        sender: "other",
        name: "Reza",
        avatar: "R",
        text: "من هستم.",
        time: "16:42",
        read: true,
      },
      {
        id: 203,
        sender: "me",
        name: "Sina",
        avatar: "S",
        text: "پس ساعت ۱۰ آنلاین میشم.",
        time: "16:44",
        read: true,
      },
      {
        id: 204,
        sender: "other",
        name: "Armin",
        avatar: "A",
        text: "اوکی 👌",
        time: "16:45",
        read: true,
      },
    ],
    membersList: [
      {
        name: "Sina",
        username: "@sina",
        avatar: "S",
        role: "مالک",
        online: true,
      },
      {
        name: "Mahan",
        username: "@mahan",
        avatar: "M",
        role: "مدیر",
        online: true,
      },
      {
        name: "Reza",
        username: "@reza",
        avatar: "R",
        role: "عضو",
        online: false,
      },
      {
        name: "Armin",
        username: "@armin",
        avatar: "A",
        role: "عضو",
        online: true,
      },
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

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return messages;
    }

    return messages.filter((item) => item.text?.toLowerCase().includes(query));
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
        name: "Sina",
        avatar: "S",
        text: value,
        time: new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
        read: false,
      },
    ]);

    setMessage("");
  };

  return (
    <main dir="rtl" className="font-vazir flex min-h-screen bg-background text-foreground">
      <section className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
          <div className="flex min-h-16 items-center gap-3 px-3 sm:px-5">
            <Link
              href="/group"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-muted transition hover:border-primary hover:text-primary"
              aria-label="بازگشت"
            >
              <FiArrowRight size={19} />
            </Link>

            <button
              type="button"
              onClick={() => {
                setInfoOpen(true);
                setMembersOpen(false);
                setMenuOpen(false);
              }}
              className="flex min-w-0 flex-1 items-center gap-3 text-right"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary/30 to-primary/5 text-sm font-black text-primary">{group.avatar}</div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="truncate text-sm font-black sm:text-base">{group.name}</h1>

                  {group.verified && <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-[9px] font-black text-white">✓</span>}
                </div>

                <p className="mt-0.5 truncate text-[10px] text-muted">
                  @{group.username} • {group.members} عضو • {group.online} آنلاین
                </p>
              </div>
            </button>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setSearchOpen((current) => !current);
                  setMenuOpen(false);
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${searchOpen ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface-hover hover:text-primary"}`}
                aria-label="جستجو"
              >
                <FiSearch size={18} />
              </button>
              <button
                type="button"
                onClick={() => setNotifications((value) => !value)}
                aria-label="اعلان‌ها"
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${notifications ? "text-primary hover:bg-primary/10" : "text-muted hover:bg-surface-hover"}`}
              >
                {notifications ? <FiBell size={18} /> : <FiBellOff size={18} />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMembersOpen(true);
                  setInfoOpen(false);
                  setMenuOpen(false);
                }}
                className="hidden h-10 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-muted transition hover:bg-surface-hover hover:text-primary sm:flex"
              >
                <FiUsers size={17} />
                اعضا
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
                  placeholder={`جستجو در پیام‌های ${group.name}...`}
                  className="h-11 w-full rounded-xl border border-border bg-background-secondary pr-10 pl-4 text-xs outline-none transition focus:border-primary"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:text-foreground"
                  >
                    <FiX size={15} />
                  </button>
                )}
              </div>
            </div>
          )}

          {menuOpen && (
            <div className="absolute left-3 top-14 z-50 w-56 overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-2xl">
              <GroupMenuButton
                icon={<FiInfo size={16} />}
                title="اطلاعات گروه"
                onClick={() => {
                  setInfoOpen(true);
                  setMenuOpen(false);
                }}
              />

              <GroupMenuButton
                icon={<FiUsers size={16} />}
                title="مشاهده اعضا"
                onClick={() => {
                  setMembersOpen(true);
                  setMenuOpen(false);
                }}
              />

              <GroupMenuButton icon={<FiLink size={16} />} title="لینک دعوت گروه" onClick={() => setMenuOpen(false)} />

              <GroupMenuButton icon={<FiVolume2 size={16} />} title="تنظیمات اعلان‌ها" onClick={() => setMenuOpen(false)} />
            </div>
          )}
        </header>

        <div className="relative flex-1 overflow-y-auto bg-background-secondary/20 px-3 py-5 sm:px-6 lg:px-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-[140px]" />
            <div className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-primary/5 blur-[140px]" />
          </div>

          <div className="relative mx-auto max-w-4xl">
            <div className="mb-6 flex justify-center">
              <div className="rounded-2xl border border-primary/15 bg-primary/5 px-5 py-3 text-center">
                <p className="text-xs font-bold text-primary">{group.name}</p>

                <p className="mt-1 text-[10px] text-muted">{group.description}</p>
              </div>
            </div>

            <div className="mb-5 flex justify-center">
              <span className="rounded-full border border-border bg-surface/80 px-4 py-1.5 text-[10px] font-semibold text-muted">امروز</span>
            </div>

            <div className="space-y-2">
              {filteredMessages.map((item) => (
                <GroupMessage key={item.id} message={item} />
              ))}
            </div>

            {filteredMessages.length === 0 && (
              <div className="flex min-h-64 items-center justify-center text-center">
                <div>
                  <FiSearch size={28} className="mx-auto text-muted" />

                  <p className="mt-3 text-sm font-bold">پیامی پیدا نشد</p>

                  <p className="mt-1 text-xs text-muted">عبارت دیگری را امتحان کن.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="border-t border-border bg-background p-2.5 sm:p-3">
          {attachmentOpen && (
            <div className="mx-auto mb-2 flex max-w-4xl gap-2 overflow-x-auto rounded-2xl border border-border bg-surface/80 p-2">
              <AttachmentButton icon={<FiImage size={18} />} title="تصویر" />

              <AttachmentButton icon={<FiFile size={18} />} title="فایل" />

              <AttachmentButton icon={<FiLink size={18} />} title="لینک" />
            </div>
          )}

          <div className="mx-auto flex max-w-4xl items-end gap-2">
            <button
              type="button"
              onClick={() => setAttachmentOpen((current) => !current)}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                attachmentOpen ? "bg-primary/10 text-primary" : "border border-border bg-surface/60 text-muted hover:border-primary hover:text-primary"
              }`}
              aria-label="پیوست"
            >
              <FiPaperclip size={18} />
            </button>

            <div className="relative flex min-h-11 flex-1 items-end rounded-2xl border border-border bg-surface/60 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
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
                placeholder={`پیامی برای ${group.name} بنویس...`}
                className="max-h-32 min-h-11 w-full resize-none bg-transparent px-4 py-3 pl-11 text-sm leading-6 outline-none placeholder:text-muted"
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
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-background transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="ارسال"
            >
              <FiSend size={18} />
            </button>
          </div>
        </footer>
      </section>

      {(infoOpen || membersOpen) && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="بستن"
            onClick={() => {
              setInfoOpen(false);
              setMembersOpen(false);
            }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <aside className="absolute inset-y-0 left-0 flex w-[88%] max-w-md flex-col border-r border-border bg-background shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <h2 className="font-bold">{membersOpen ? "اعضای گروه" : "اطلاعات گروه"}</h2>

              <button
                type="button"
                onClick={() => {
                  setInfoOpen(false);
                  setMembersOpen(false);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted transition hover:border-primary hover:text-primary"
              >
                <FiX size={18} />
              </button>
            </div>

            {membersOpen ? (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <FiUsers size={21} />
                    </div>

                    <div>
                      <p className="font-bold">{group.members} عضو</p>

                      <p className="mt-1 text-xs text-success">{group.online} نفر آنلاین</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {group.membersList.map((member) => (
                    <div key={member.username} className="flex items-center gap-3 rounded-2xl border border-border bg-surface/50 p-3">
                      <div className="relative">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 font-black text-primary">{member.avatar}</div>

                        {member.online && <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-surface bg-success" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-bold">{member.name}</p>

                          {member.role !== "عضو" && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[8px] font-bold text-primary">{member.role}</span>}
                        </div>

                        <p className="mt-1 truncate text-[10px] text-muted">{member.username}</p>
                      </div>

                      {member.online && <span className="text-[9px] font-semibold text-success">آنلاین</span>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="border-b border-border p-6 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-linear-to-br from-primary/30 to-primary/5 text-xl font-black text-primary">{group.avatar}</div>

                  <h3 className="mt-4 text-lg font-black">{group.name}</h3>

                  <p className="mt-1 text-xs text-primary">@{group.username}</p>

                  <p className="mt-4 text-xs leading-6 text-muted">{group.description}</p>
                </div>

                <div className="space-y-2 p-4">
                  <InfoRow
                    icon={<FiUsers size={17} />}
                    title="اعضا"
                    value={`${group.members} عضو`}
                    onClick={() => {
                      setInfoOpen(false);
                      setMembersOpen(true);
                    }}
                  />

                  <InfoRow icon={<FiHash size={17} />} title="نام کاربری گروه" value={`@${group.username}`} />

                  <InfoRow icon={<FiVolume2 size={17} />} title="اعلان‌ها" value="فعال" />

                  <InfoRow icon={<FiInfo size={17} />} title="نوع گروه" value={group.type} />
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

function GroupMessage({ message }: { message: Message }) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-start" : "justify-end"}`}>
      <div className={`flex max-w-[90%] items-end gap-2 sm:max-w-[72%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
        {!isMe && <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-black text-primary sm:flex">{message.avatar}</div>}

        <div className={`flex min-w-0 flex-col ${isMe ? "items-start" : "items-end"}`}>
          {!isMe && <span className="mb-1 px-1 text-[10px] font-bold text-primary">{message.name}</span>}

          <div className={`rounded-2xl px-4 py-2.5 ${isMe ? "rounded-bl-md bg-primary text-background" : "rounded-br-md border border-border bg-surface/80"}`}>
            {message.text && <LinkifiedText text={message.text} />}

            {message.file && (
              <div className={`mt-2 flex items-center gap-3 rounded-xl p-3 ${isMe ? "bg-background/10" : "bg-background-secondary"}`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
          <a key={index} href={part} target="_blank" rel="noreferrer" className="font-semibold text-yellow-400 underline decoration-yellow-400/30 underline-offset-4 hover:text-yellow-300">
            {part}
          </a>
        );
      })}
    </p>
  );
}

function GroupMenuButton({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-xs font-semibold transition hover:bg-surface-hover hover:text-primary">
      {icon}
      {title}
    </button>
  );
}

function AttachmentButton({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <button
      type="button"
      className="flex h-10 shrink-0 items-center gap-2 rounded-xl border border-border bg-background-secondary px-4 text-xs font-semibold transition hover:border-primary hover:text-primary"
    >
      {icon}
      {title}
    </button>
  );
}

function InfoRow({ icon, title, value, onClick }: { icon: React.ReactNode; title: string; value: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-16 w-full items-center gap-3 rounded-2xl border border-border bg-surface/50 p-3 text-right transition hover:border-primary/40 hover:bg-surface-hover"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold">{title}</p>

        <p className="mt-1 truncate text-[10px] text-muted">{value}</p>
      </div>

      <FiChevronLeft size={16} className="text-muted" />
    </button>
  );
}
