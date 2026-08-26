"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiHeart, FiMessageCircle, FiSend, FiBookmark, FiMoreHorizontal, FiPlus } from "react-icons/fi";

type Post = {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  text: string;
  image?: string;
  time: string;
  likes: number;
  comments: number;
  liked: boolean;
  saved: boolean;
  verified?: boolean;
};

const initialPosts: Post[] = [
  {
    id: 1,
    user: { name: "Armin", username: "@armin", avatar: "A" },
    text: "تورنمنت جدید Valorant شروع شد! ثبت‌نام کنید 🎮",
    image: "https://picsum.photos/seed/valorant/600/500",
    time: "۲ ساعت پیش",
    likes: 142,
    comments: 23,
    liked: false,
    saved: false,
    verified: true,
  },
  {
    id: 2,
    user: { name: "jaki", username: "@jaki", avatar: "J" },
    text: "امشب ساعت ۱۰ بازی می‌کنیم. کی هست؟ 🔥",
    time: "۴ ساعت پیش",
    likes: 89,
    comments: 12,
    liked: true,
    saved: false,
  },
  {
    id: 3,
    user: { name: "Sina", username: "@sina", avatar: "S" },
    text: "آپدیت جدید NexUs منتشر شد! 🚀",
    image: "https://picsum.photos/seed/nexus/600/500",
    time: "۶ ساعت پیش",
    likes: 256,
    comments: 45,
    liked: false,
    saved: true,
  },
];

const stories = [
  { id: 1, name: "Armin", avatar: "A", seen: false },
  { id: 2, name: "jaki", avatar: "J", seen: false },
  { id: 3, name: "Sina", avatar: "S", seen: true },
  { id: 4, name: "Ali", avatar: "A", seen: true },
  { id: 5, name: "Reza", avatar: "R", seen: false },
  { id: 6, name: "Mahan", avatar: "M", seen: false },
  { id: 7, name: "Sara", avatar: "S", seen: true },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const toggleLike = (id: number) => {
    setPosts((prev) => prev.map((post) => (post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post)));
  };

  const toggleSave = (id: number) => {
    setPosts((prev) => prev.map((post) => (post.id === id ? { ...post, saved: !post.saved } : post)));
  };

  return (
    <div className="w-full min-h-screen pb-20">
      <div className="w-full bg-background border-b border-border px-4 py-6">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide w-full">
          <Link href="/feed/story/create" className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-24 h-24 rounded-full border-2 border-border p-1.5 relative">
              <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-3xl text-primary">
                <FiPlus size={32} />
              </div>
            </div>
            <span className="text-sm text-muted truncate w-24 text-center">شما</span>
          </Link>

          {stories.map((story) => (
            <Link key={story.id} href={`/feed/story/${story.id}`} className="flex flex-col items-center gap-2 shrink-0">
              <div className={`w-24 h-24 rounded-full p-1.5 ${story.seen ? "border-2 border-border" : "border-2 border-primary"}`}>
                <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">{story.avatar}</div>
              </div>
              <span className="text-sm text-muted truncate w-24 text-center">{story.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full">
        {posts.map((post) => (
          <div key={post.id} className="w-full bg-background border-b border-border">
            <div className="flex items-center justify-between px-4 py-3 w-full">
              <Link href={`/profile/${post.user.username.replace("@", "")}`} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-base text-primary">{post.user.avatar}</div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">{post.user.name}</span>
                    {post.verified && <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-success text-white text-[7px]">✓</span>}
                  </div>
                  <span className="text-xs text-muted">{post.time}</span>
                </div>
              </Link>
              <button className="text-muted hover:text-foreground transition">
                <FiMoreHorizontal size={20} />
              </button>
            </div>

            {post.image && (
              <div className="w-full max-h-125 overflow-hidden bg-background-secondary relative">
                <Image src={post.image} alt="پست" width={600} height={500} className="w-full h-auto max-h-125 object-cover" unoptimized />
              </div>
            )}

            {!post.image && post.text && (
              <div className="px-4 py-3 w-full">
                <p className="text-sm text-foreground">{post.text}</p>
              </div>
            )}

            <div className="px-4 py-2.5 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <button onClick={() => toggleLike(post.id)} className="text-muted hover:text-foreground transition">
                    <FiHeart size={26} className={post.liked ? "fill-primary text-primary" : ""} />
                  </button>
                  <button className="text-muted hover:text-foreground transition">
                    <FiMessageCircle size={26} />
                  </button>
                  <button className="text-muted hover:text-foreground transition">
                    <FiSend size={26} />
                  </button>
                </div>
                <button onClick={() => toggleSave(post.id)} className="text-muted hover:text-foreground transition">
                  <FiBookmark size={26} className={post.saved ? "fill-foreground text-foreground" : ""} />
                </button>
              </div>

              <div className="mt-1.5">
                <span className="text-sm font-semibold text-foreground">{post.likes.toLocaleString()} لایک</span>
              </div>

              {post.image && post.text && (
                <div className="mt-1">
                  <span className="text-sm text-foreground">
                    <span className="font-semibold">{post.user.name}</span> {post.text}
                  </span>
                </div>
              )}

              <div className="mt-1">
                <span className="text-xs text-muted">مشاهده همه {post.comments} کامنت</span>
              </div>

              <div className="mt-1">
                <span className="text-xs text-muted">{post.time}</span>
              </div>
            </div>

            <div className="border-t border-border px-4 py-2.5 w-full">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">J</div>
                <input type="text" placeholder="کامنت بنویس..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted outline-none py-1.5" />
                <button className="text-sm font-semibold text-primary hover:opacity-70 transition">ارسال</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
