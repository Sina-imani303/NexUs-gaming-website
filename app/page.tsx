"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    const animate = (time: number) => {
      const elapsed = time - start;

      if (elapsed < 1200) {
        setProgress((elapsed / 1200) * 90);
        frame = requestAnimationFrame(animate);
        return;
      }

      if (elapsed < 2800) {
        setProgress(90 + ((elapsed - 1200) / 1600) * 10);
        frame = requestAnimationFrame(animate);
        return;
      }

      setProgress(100);
      router.replace("/chat");
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [router]);

  return (
    <main dir="rtl" className="font-vazir relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4 text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[150px]" />

        <div className="absolute -right-32 -top-32 h-125 w-125 rounded-full bg-primary/10 blur-[160px]" />

        <div className="absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-primary/7 blur-[170px]" />

        <div className="absolute right-[8%] top-[18%] h-48 w-48 rounded-full border border-primary/5" />

        <div className="absolute right-[11%] top-[21%] h-36 w-36 rounded-full border border-primary/5" />

        <div className="absolute bottom-[12%] left-[8%] h-56 w-56 rounded-full border border-primary/5" />

        <div className="absolute bottom-[17%] left-[13%] h-40 w-40 rounded-full border border-primary/5" />

        <div className="absolute left-0 top-1/2 h-px w-[38%] bg-linear-to-r from-transparent via-primary/10 to-transparent" />

        <div className="absolute right-0 top-[43%] h-px w-[32%] bg-linear-to-l from-transparent via-primary/10 to-transparent" />

        <div className="absolute left-[20%] top-[18%] h-1 w-1 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(212,175,55,.8)]" />

        <div className="absolute left-[12%] top-[62%] h-1.5 w-1.5 rounded-full bg-primary/30 shadow-[0_0_16px_rgba(212,175,55,.5)]" />

        <div className="absolute right-[17%] top-[30%] h-1.5 w-1.5 rounded-full bg-primary/50 shadow-[0_0_16px_rgba(212,175,55,.6)]" />

        <div className="absolute right-[25%] bottom-[24%] h-1 w-1 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(212,175,55,.7)]" />

        <div className="absolute left-[35%] bottom-[14%] h-1 w-1 rounded-full bg-primary/40 shadow-[0_0_12px_rgba(212,175,55,.5)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.15)_55%,rgba(0,0,0,.65)_100%)]" />

      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-10 rounded-full bg-primary/10 blur-[60px]" />

          <div className="absolute -inset-4 rounded-4xl border border-primary/10" />

          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.75rem] border border-primary/30 bg-[#0b0b0b]/90 shadow-[0_0_70px_rgba(212,175,55,.16)] backdrop-blur-xl">
            <Image src="/logo/logo.jpg" alt="NexUs" width={96} height={96} priority className="h-full w-full object-cover" />
          </div>
        </div>

        <h1 className="mt-8 text-5xl font-black tracking-[7px] text-primary drop-shadow-[0_0_25px_rgba(212,175,55,.2)] sm:text-6xl">NΞXUS</h1>

        <div className="mt-10 w-56 sm:w-64">
          <div className="relative h-1.5 overflow-hidden rounded-full bg-white/8">
            <div
              className="absolute right-0 top-0 h-full rounded-full bg-primary shadow-[0_0_18px_rgba(212,175,55,.75)]"
              style={{
                width: `${progress}%`,
              }}
            />

            <div
              className="absolute right-0 top-0 h-full rounded-full bg-white/25 blur-[2px]"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
