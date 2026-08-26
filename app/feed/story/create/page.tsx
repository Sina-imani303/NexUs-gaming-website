"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiCamera, FiX, FiSend } from "react-icons/fi";
import Image from "next/image";

export default function CreateStoryPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    router.push("/feed");
  };

  return (
    <div className="min-h-screen bg-black/95 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="text-white/60 hover:text-white transition">
            <FiX size={24} />
          </button>
          <span className="text-white font-bold">استوری جدید</span>
          <button onClick={handleSubmit} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-background hover:bg-primary-hover transition">
            <FiSend size={16} />
            انتشار
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div
            className="relative aspect-9/16 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition"
            onClick={() => document.getElementById("story-image")?.click()}
          >
            {image ? (
              <Image src={image} alt="استوری" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                  <FiCamera size={28} />
                </div>
                <p className="mt-3 text-white/60 text-sm">برای آپلود کلیک کنید</p>
              </div>
            )}
            <input id="story-image" type="file" accept="image/*,video/*" className="hidden" onChange={handleImageUpload} />
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="متن استوری..."
            className="w-full mt-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary transition resize-none"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
