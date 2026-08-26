"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiArrowRight, FiHeart, FiMessageCircle, FiSend, FiX, FiBookmark } from "react-icons/fi";

type Post = {
  id: number;
  user: { name: string; username: string; avatar: string };
  text: string;
  image?: string;
  time: string;
  likes: number;
  comments: number;
  liked: boolean;
  saved: boolean;
  verified?: boolean;
};

const samplePost: Post = {
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
};

type Comment = {
  id: number;
  user: { name: string; username: string; avatar: string };
  text: string;
  time: string;
  likes: number;
  liked: boolean;
};

const sampleComments: Comment[] = [
  {
    id: 1,
    user: { name: "Sina", username: "@sina", avatar: "S" },
    text: "من ثبت‌نام کردم! 🎯",
    time: "۱۰ دقیقه پیش",
    likes: 5,
    liked: false,
  },
  {
    id: 2,
    user: { name: "Ali", username: "@ali", avatar: "A" },
    text: "چطور می‌تونم ثبت‌نام کنم؟",
    time: "۵ دقیقه پیش",
    likes: 2,
    liked: true,
  },
];

export default function PostDetailPage() {
  const router = useRouter();
  const [post, setPost] = useState<Post>(samplePost);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [commentText, setCommentText] = useState("");

  const toggleLike = () => {
    setPost((prev) => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const toggleSave = () => {
    setPost((prev) => ({ ...prev, saved: !prev.saved }));
  };

  const toggleCommentLike = (commentId: number) => {
    setComments((prev) => prev.map((c) => (c.id === commentId ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c)));
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      user: { name: "jaki", username: "@jaki", avatar: "J" },
      text: commentText.trim(),
      time: "لحظاتی پیش",
      likes: 0,
      liked: false,
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  };

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <FiX size={32} className="mx-auto text-muted" />
          <h2 className="mt-4 text-xl font-bold text-foreground">پست پیدا نشد</h2>
          <Link href="/feed" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-background hover:bg-primary-hover transition">
            <FiArrowRight size={18} />
            بازگشت به فید
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center px-4 max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface-hover hover:text-primary transition">
            <FiArrowRight size={20} />
          </button>
          <h1 className="flex-1 text-center text-sm font-bold text-foreground">پست</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pb-24 pt-4">
        <div className="rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <Link href={`/profile/${post.user.username.replace("@", "")}`} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">{post.user.avatar}</div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-sm text-foreground">{post.user.name}</p>
                  {post.verified && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success text-white text-[9px]">✓</span>}
                </div>
                <p className="text-[10px] text-muted">{post.user.username}</p>
              </div>
            </Link>
            <span className="text-[10px] text-muted">{post.time}</span>
          </div>

          <p className="text-sm leading-7 whitespace-pre-wrap text-foreground mb-3">{post.text}</p>

          {post.image && (
            <div className="rounded-2xl overflow-hidden mb-3 relative aspect-square bg-background-secondary">
              <Image src={post.image} alt="پست" fill className="object-cover" unoptimized />
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-6">
              <button onClick={toggleLike} className={`flex items-center gap-2 text-sm transition ${post.liked ? "text-primary" : "text-muted hover:text-primary"}`}>
                <FiHeart size={18} className={post.liked ? "fill-primary" : ""} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-muted hover:text-primary transition">
                <FiMessageCircle size={18} />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-muted hover:text-primary transition">
                <FiSend size={18} />
              </button>
            </div>
            <button onClick={toggleSave} className="text-muted hover:text-foreground transition">
              <FiBookmark size={20} className={post.saved ? "fill-foreground" : ""} />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-bold text-foreground mb-4">کامنت‌ها ({comments.length})</h3>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">J</div>
            <div className="flex-1 relative">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
                placeholder="کامنت بنویس..."
                className="w-full h-11 rounded-2xl border border-border bg-background-secondary px-4 text-sm text-foreground placeholder:text-muted outline-none focus:border-primary transition"
              />
            </div>
            <button
              onClick={addComment}
              disabled={!commentText.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-background hover:bg-primary-hover transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiSend size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-2xl border border-border bg-surface/30 p-3 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <Link
                    href={`/profile/${comment.user.username.replace("@", "")}`}
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs shrink-0"
                  >
                    {comment.user.avatar}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-foreground">{comment.user.name}</p>
                        <p className="text-[9px] text-muted">{comment.user.username}</p>
                      </div>
                      <span className="text-[9px] text-muted">{comment.time}</span>
                    </div>
                    <p className="text-sm leading-6 text-foreground mt-1">{comment.text}</p>
                    <button
                      onClick={() => toggleCommentLike(comment.id)}
                      className={`flex items-center gap-1 mt-1 text-[10px] transition ${comment.liked ? "text-primary" : "text-muted hover:text-primary"}`}
                    >
                      <FiHeart size={12} className={comment.liked ? "fill-primary" : ""} />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted">هنوز کامنتی وجود ندارد.</p>
              <p className="text-xs text-muted">اولین نفری باشید که نظر می‌دهد!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
