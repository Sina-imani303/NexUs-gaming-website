"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiX, FiHeart, FiSend } from "react-icons/fi";

export default function StoryViewPage() {
  const params = useParams();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);

  const storyId = params?.id as string;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          router.back();
          return 100;
        }
        return p + 0.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [router]);

  const storyData = {
    id: storyId || "1",
    user: "jaki",
    avatar: "J",
    text: "چالش جدید امروز 🔥",
    time: "۲ ساعت پیش",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex gap-1">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white transition-all duration-100" style={{ width: i === 0 ? `${progress}%` : i < 0 ? "100%" : "0%" }} />
          </div>
        ))}
      </div>

      <button onClick={() => router.back()} className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition">
        <FiX size={28} />
      </button>

      <div className="flex h-full items-center justify-center px-4">
        <div className="text-center text-white">
          <div className="w-24 h-24 rounded-full bg-[#262626] mx-auto flex items-center justify-center text-4xl font-bold border-2 border-primary">{storyData.avatar}</div>
          <p className="mt-4 text-xl font-bold">{storyData.user}</p>
          <p className="mt-6 text-lg">{storyData.text}</p>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8">
        <button onClick={() => setLiked(!liked)} className={`transition ${liked ? "text-primary" : "text-white/40 hover:text-white/80"}`}>
          <FiHeart size={32} className={liked ? "fill-primary" : ""} />
        </button>
        <button className="text-white/40 hover:text-white/80 transition">
          <FiSend size={28} />
        </button>
      </div>
    </div>
  );
}
