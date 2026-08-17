import Background from "../compopnent/Background";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <Background />

      <div className="pointer-events-none absolute -top-40 left-1/2 h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-112.5 w-112.5 rounded-full bg-primary/10 blur-[180px]" />

      <div className="relative z-10 w-full max-w-7xl px-6">{children}</div>
    </main>
  );
}
