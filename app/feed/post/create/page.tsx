"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiX, FiImage, FiSend } from "react-icons/fi";
import Image from "next/image";

export default function CreatePostPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!text.trim() && !image) {
      alert("لطفاً متن یا عکس وارد کنید.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/feed");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface-hover hover:text-primary transition">
            <FiX size={22} />
          </button>
          <h1 className="text-lg font-bold text-foreground">پست جدید</h1>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || (!text.trim() && !image)}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-background hover:bg-primary-hover transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend size={16} />
            {isSubmitting ? "در حال ارسال..." : "انتشار"}
          </button>
        </div>

        <div className="rounded-3xl border border-border bg-surface/50 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">J</div>
            <div>
              <p className="font-semibold text-sm text-foreground">jaki</p>
              <p className="text-[10px] text-muted">@jaki</p>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="چیزی بنویس... 📝"
            className="w-full min-h-30 resize-none bg-transparent text-sm leading-7 text-foreground placeholder:text-muted outline-none"
            autoFocus
          />

          {image && (
            <div className="relative mt-3 rounded-2xl overflow-hidden">
              <Image src={image} alt="پست" className="w-full h-auto max-h-100 object-cover" />
              <button onClick={removeImage} className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition">
                <FiX size={16} />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-muted hover:bg-surface-hover hover:text-primary transition">
              <FiImage size={18} />
              افزودن عکس
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <span className="text-[10px] text-muted">{text.length} کاراکتر</span>
          </div>
        </div>
      </div>
    </div>
  );
}
