"use client";

import Link from "next/link";
import { use, useState } from "react";
import { FiArrowRight, FiBell, FiBellOff, FiCheck, FiCopy, FiHeart, FiMessageCircle, FiMoreVertical, FiSearch, FiShare2, FiVolume2 } from "react-icons/fi";

type Message = {
  id: number;
  text: string;
  time: string;
  views: number;
  likes: number;
  comments: number;
  image?: boolean;
};

type Channel = {
  username: string;
  name: string;
  avatar: string;
  members: number;
  online: number;
  verified: boolean;
  description: string;
  messages: Message[];
};

const channels: Record<string, Channel> = {
  nexus: {
    username: "nexus",
    name: "NexUs Official",
    avatar: "N",
    members: 18420,
    online: 3260,
    verified: true,
    description: "کانال رسمی NexUs برای انتشار اخبار، اطلاعیه‌ها و اتفاقات مهم پلتفرم.",
    messages: [
      {
        id: 1,
        text: "به NΞXUS خوش آمدید 🎮\nاینجا جدیدترین اخبار، اطلاعیه‌ها، مسابقات و اتفاقات مهم پلتفرم را منتشر می‌کنیم.",
        time: "20:18",
        views: 2840,
        likes: 428,
        comments: 67,
      },
      {
        id: 2,
        text: "آپدیت جدید NΞXUS منتشر شد.\nامکانات جدید بخش ارتباطات، بازی‌ها و پروفایل کاربران در دسترس قرار گرفت.",
        time: "18:42",
        views: 5210,
        likes: 812,
        comments: 124,
        image: true,
      },
      {
        id: 3,
        text: "🎮 مسابقه جدید شروع شد!\nبا شرکت در چالش‌های این هفته می‌توانید NEX COIN دریافت کنید.",
        time: "16:30",
        views: 3180,
        likes: 531,
        comments: 83,
      },
      {
        id: 4,
        text: "به‌زودی بازی‌های جدیدی به بخش بازی‌های NΞXUS اضافه خواهند شد.",
        time: "14:15",
        views: 1960,
        likes: 274,
        comments: 31,
      },
    ],
  },

  nexusnews: {
    username: "nexusnews",
    name: "NexUs News",
    avatar: "N",
    members: 12640,
    online: 2180,
    verified: true,
    description: "جدیدترین اخبار و آپدیت‌های NexUs را از این کانال دنبال کنید.",
    messages: [
      {
        id: 101,
        text: "📰 جدیدترین اخبار NexUs\nآخرین تغییرات و اتفاقات پلتفرم را اینجا دنبال کنید.",
        time: "16:20",
        views: 2840,
        likes: 412,
        comments: 58,
      },
      {
        id: 102,
        text: "آپدیت جدید NexUs منتشر شد.\nچند قابلیت جدید به بخش ارتباطات اضافه شده است.",
        time: "15:10",
        views: 4210,
        likes: 620,
        comments: 94,
        image: true,
      },
      {
        id: 103,
        text: "سیستم پروفایل کاربران به‌روزرسانی شد و امکانات جدیدی در دسترس قرار گرفت.",
        time: "13:45",
        views: 3120,
        likes: 488,
        comments: 61,
      },
    ],
  },

  gamingnews: {
    username: "gamingnews",
    name: "Gaming News",
    avatar: "G",
    members: 9820,
    online: 1740,
    verified: false,
    description: "اخبار جدید دنیای گیم، مسابقات و اتفاقات مهم بازی‌ها.",
    messages: [
      {
        id: 201,
        text: "🎮 اخبار جدید دنیای گیم\nجدیدترین اتفاقات و اخبار بازی‌ها را دنبال کنید.",
        time: "14:45",
        views: 3520,
        likes: 610,
        comments: 87,
      },
      {
        id: 202,
        text: "مسابقات جدید این هفته شروع شدند.\nتیم خودت را آماده کن!",
        time: "13:20",
        views: 4180,
        likes: 724,
        comments: 112,
        image: true,
      },
      {
        id: 203,
        text: "بازی‌های جدیدی در راه هستند و به‌زودی اطلاعات بیشتری منتشر خواهد شد.",
        time: "11:50",
        views: 2360,
        likes: 341,
        comments: 45,
      },
    ],
  },

  gaming: {
    username: "gaming",
    name: "Gaming News",
    avatar: "G",
    members: 9820,
    online: 1740,
    verified: false,
    description: "اخبار جدید دنیای گیم، مسابقات و اتفاقات مهم بازی‌ها.",
    messages: [
      {
        id: 301,
        text: "🎮 اخبار جدید دنیای گیم\nجدیدترین اتفاقات و اخبار بازی‌ها را دنبال کنید.",
        time: "14:45",
        views: 3520,
        likes: 610,
        comments: 87,
      },
      {
        id: 302,
        text: "مسابقات جدید این هفته شروع شدند.\nتیم خودت را آماده کن!",
        time: "13:20",
        views: 4180,
        likes: 724,
        comments: 112,
        image: true,
      },
    ],
  },
};

export default function ChannelPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);

  const normalizedUsername = username?.toLowerCase().replace(/^@/, "");

  const channel = channels[normalizedUsername] ?? channels.nexus;

  const [joined, setJoined] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedPosts((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <main dir="rtl" className="font-vazir h-screen w-full overflow-hidden bg-background text-foreground">
      <div className="flex h-screen w-full flex-col bg-background">
        <header className="relative z-50 flex h-17 shrink-0 items-center border-b border-border bg-background/95 px-3 backdrop-blur-xl sm:px-5">
          <Link href="/chat" aria-label="بازگشت" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted transition hover:bg-surface-hover hover:text-primary">
            <FiArrowRight size={20} />
          </Link>

          <div className="mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-black text-primary">{channel.avatar}</div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="truncate text-sm font-black">{channel.name}</h1>

              {channel.verified && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-white">
                  <FiCheck size={10} />
                </span>
              )}
            </div>

            <p className="mt-0.5 truncate text-[10px] text-muted">
              {channel.members.toLocaleString("fa-IR")} مشترک
              {" • "}
              {channel.online.toLocaleString("fa-IR")} آنلاین
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button type="button" aria-label="جستجو" className="flex h-10 w-10 items-center justify-center rounded-xl text-muted transition hover:bg-surface-hover hover:text-primary">
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
              onClick={() => setShowMenu((value) => !value)}
              aria-label="بیشتر"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-muted transition hover:bg-surface-hover hover:text-primary"
            >
              <FiMoreVertical size={19} />
            </button>
          </div>

          {showMenu && (
            <div className="absolute left-3 top-15.5 z-100 w-56 overflow-hidden rounded-2xl border border-border bg-surface/95 p-1.5 shadow-2xl backdrop-blur-xl">
              <MenuItem icon={<FiShare2 size={16} />}>اشتراک‌گذاری کانال</MenuItem>

              <MenuItem icon={<FiCopy size={16} />}>کپی لینک کانال</MenuItem>

              <MenuItem icon={<FiCopy size={16} />}>کپی نام کاربری</MenuItem>

              <MenuItem
                icon={notifications ? <FiBellOff size={16} /> : <FiBell size={16} />}
                onClick={() => {
                  setNotifications((value) => !value);
                  setShowMenu(false);
                }}
              >
                {notifications ? "خاموش کردن اعلان‌ها" : "روشن کردن اعلان‌ها"}
              </MenuItem>
            </div>
          )}
        </header>

        <section className="flex min-h-0 flex-1 flex-col">
          <div className="relative flex-1 overflow-y-auto px-2 py-4 sm:px-4">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-1">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full border border-border bg-surface/80 px-3 py-1 text-[9px] text-muted backdrop-blur-xl">{channel.name}</div>
              </div>

              {channel.messages.map((message) => {
                const liked = likedPosts.includes(message.id);

                return (
                  <article key={message.id} className="flex w-full justify-start">
                    <div className="flex max-w-[92%] items-start gap-2 sm:max-w-[80%]">
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">{channel.avatar}</div>

                      <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-1.5 px-1">
                          <span className="text-xs font-bold text-primary">{channel.name}</span>

                          {channel.verified && (
                            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-success text-white">
                              <FiCheck size={8} />
                            </span>
                          )}
                        </div>

                        <div className="rounded-2xl rounded-tr-md border border-border bg-surface/80 px-3.5 py-3 shadow-sm backdrop-blur-xl">
                          {message.image && (
                            <div className="mb-3 flex aspect-video w-full min-w-55 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-primary/15 via-surface to-background sm:min-w-55">
                              <div className="text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                  <FiVolume2 size={25} />
                                </div>

                                <p className="mt-2 text-[10px] text-muted">محتوای تصویری</p>
                              </div>
                            </div>
                          )}

                          <p className="whitespace-pre-line text-sm leading-7 text-foreground">{message.text}</p>

                          <div className="mt-2 flex items-center justify-end gap-2">
                            <span className="text-[9px] text-muted">{message.time}</span>

                            <span className="text-[9px] text-muted">✓</span>
                          </div>
                        </div>

                        <div className="mt-1 flex items-center gap-1 px-1">
                          <span className="flex h-7 items-center gap-1 rounded-lg px-2 text-[9px] text-muted">
                            👁
                            {message.views.toLocaleString("fa-IR")}
                          </span>

                          <button
                            type="button"
                            onClick={() => toggleLike(message.id)}
                            className={`flex h-7 items-center gap-1 rounded-lg px-2 text-[9px] transition ${liked ? "bg-error/10 text-error" : "text-muted hover:bg-surface-hover hover:text-error"}`}
                          >
                            <FiHeart size={12} className={liked ? "fill-current" : ""} />

                            {(message.likes + (liked ? 1 : 0)).toLocaleString("fa-IR")}
                          </button>

                          <button type="button" className="flex h-7 items-center gap-1 rounded-lg px-2 text-[9px] text-muted transition hover:bg-surface-hover hover:text-primary">
                            <FiMessageCircle size={12} />

                            {message.comments.toLocaleString("fa-IR")}
                          </button>

                          <button type="button" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition hover:bg-surface-hover hover:text-primary">
                            <FiShare2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="shrink-0 border-t border-border bg-background/95 p-2.5 backdrop-blur-xl sm:p-3">
            <div className="mx-auto flex w-full max-w-3xl items-center gap-2">
              {!joined ? (
                <button
                  type="button"
                  onClick={() => setJoined(true)}
                  className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary text-xs font-bold text-background transition hover:bg-primary-hover"
                >
                  <FiVolume2 size={14} />
                  عضویت در کانال
                </button>
              ) : (
                <>
                  <div className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-surface/60 text-[10px] text-muted">
                    <FiBell size={13} />
                    فقط مدیران می‌توانند پیام ارسال کنند
                  </div>

                  <button
                    type="button"
                    onClick={() => setNotifications((value) => !value)}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition ${
                      notifications ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-surface text-muted"
                    }`}
                  >
                    {notifications ? <FiBell size={14} /> : <FiBellOff size={14} />}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function MenuItem({ icon, children, onClick }: { icon: React.ReactNode; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-xs font-semibold text-foreground transition hover:bg-primary/10 hover:text-primary">
      {icon}
      {children}
    </button>
  );
}
