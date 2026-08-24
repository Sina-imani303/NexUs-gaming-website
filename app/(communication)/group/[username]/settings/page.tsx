"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheck,
  FiChevronLeft,
  FiEdit3,
  FiLink,
  FiLock,
  FiMessageCircle,
  FiPaperclip,
  FiSave,
  FiSettings,
  FiTrash2,
  FiUserMinus,
  FiUserPlus,
  FiUsers,
  FiX,
} from "react-icons/fi";

type MemberRole = "مالک" | "مدیر" | "ادمین" | "عضو";

type Member = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  role: MemberRole;
  online: boolean;
};

type Permissions = {
  sendMessages: boolean;
  sendFiles: boolean;
  addMembers: boolean;
  pinMessages: boolean;
  deleteMessages: boolean;
};

const initialMembers: Member[] = [
  {
    id: 1,
    name: "Sina",
    username: "@sina",
    avatar: "S",
    role: "مالک",
    online: true,
  },
  {
    id: 2,
    name: "Armin",
    username: "@armin",
    avatar: "A",
    role: "مدیر",
    online: true,
  },
  {
    id: 3,
    name: "Mahan",
    username: "@mahan",
    avatar: "M",
    role: "ادمین",
    online: true,
  },
  {
    id: 4,
    name: "Reza",
    username: "@reza",
    avatar: "R",
    role: "عضو",
    online: false,
  },
  {
    id: 5,
    name: "Ali",
    username: "@ali",
    avatar: "A",
    role: "عضو",
    online: false,
  },
  {
    id: 6,
    name: "Amir",
    username: "@amir",
    avatar: "A",
    role: "عضو",
    online: true,
  },
];

const initialPermissions: Permissions = {
  sendMessages: true,
  sendFiles: true,
  addMembers: false,
  pinMessages: false,
  deleteMessages: false,
};

export default function GroupSettingsPage() {
  const [groupName, setGroupName] = useState("Gaming Team");
  const [username, setUsername] = useState("gamingteam");
  const [bio, setBio] = useState("تیم اصلی گیمرهای NexUs برای بازی، گفتگو و ساخت تیم‌های مختلف.");
  const [isPublic, setIsPublic] = useState(true);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [permissions, setPermissions] = useState<Permissions>(initialPermissions);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberSearch, setMemberSearch] = useState("");
  const [saved, setSaved] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);

  const filteredMembers = members.filter((member) => {
    const value = memberSearch.trim().toLowerCase();

    if (!value) {
      return true;
    }

    return member.name.toLowerCase().includes(value) || member.username.toLowerCase().includes(value);
  });

  const saveChanges = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2200);
  };

  const changeRole = (memberId: number, role: MemberRole) => {
    setMembers((current) => current.map((member) => (member.id === memberId ? { ...member, role } : member)));

    setSelectedMember((current) => (current && current.id === memberId ? { ...current, role } : current));
  };

  const removeMember = (memberId: number) => {
    setMembers((current) => current.filter((member) => member.id !== memberId));

    setSelectedMember(null);
  };

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText("https://nex.example.com/group/@gamingteam");

      setInviteCopied(true);

      window.setTimeout(() => {
        setInviteCopied(false);
      }, 1800);
    } catch {
      setInviteCopied(true);

      window.setTimeout(() => {
        setInviteCopied(false);
      }, 1800);
    }
  };

  return (
    <main dir="rtl" className="font-vazir min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-7">
          <div className="flex items-center gap-3">
            <Link
              href="/group/gamingteam"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface/50 text-muted transition hover:border-primary hover:text-primary"
              aria-label="بازگشت به گروه"
            >
              <FiArrowRight size={18} />
            </Link>

            <div>
              <p className="text-xs font-semibold text-primary">مدیریت گروه</p>

              <h1 className="mt-1 text-2xl font-black sm:text-3xl">تنظیمات Gaming Team</h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">اطلاعات گروه، اعضا، مدیران و دسترسی‌های گروه را از این بخش مدیریت کن.</p>
        </header>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="h-fit rounded-3xl border border-border bg-surface/50 p-2 backdrop-blur-xl lg:sticky lg:top-5">
            <SettingsNav icon={<FiSettings size={17} />} title="اطلاعات گروه" active />

            <SettingsNav icon={<FiUsers size={17} />} title="اعضا و مدیران" onClick={() => document.getElementById("members")?.scrollIntoView({ behavior: "smooth" })} />

            <SettingsNav icon={<FiLock size={17} />} title="دسترسی‌ها" onClick={() => document.getElementById("permissions")?.scrollIntoView({ behavior: "smooth" })} />

            <SettingsNav icon={<FiLink size={17} />} title="لینک دعوت" onClick={() => document.getElementById("invite")?.scrollIntoView({ behavior: "smooth" })} />

            <SettingsNav icon={<FiTrash2 size={17} />} title="حذف گروه" danger onClick={() => setDeleteOpen(true)} />
          </aside>

          <div className="min-w-0 space-y-5">
            <section className="overflow-hidden rounded-3xl border border-border bg-surface/50 backdrop-blur-xl">
              <div className="border-b border-border p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FiEdit3 size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold">اطلاعات گروه</h2>

                    <p className="mt-1 text-xs text-muted">اطلاعاتی که کاربران در صفحه گروه می‌بینند.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-7">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-linear-to-br from-primary/30 to-primary/5 text-2xl font-black text-primary">GT</div>

                  <div className="flex flex-1 flex-col gap-2">
                    <button
                      type="button"
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-border text-xs font-semibold transition hover:border-primary hover:text-primary sm:w-fit sm:px-5"
                    >
                      <FiEdit3 size={15} />
                      تغییر تصویر گروه
                    </button>

                    <p className="text-[10px] text-muted">JPG یا PNG، حداکثر 5MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="نام گروه" value={groupName} onChange={setGroupName} placeholder="نام گروه" />

                  <div>
                    <label className="mb-2 block text-xs font-semibold text-foreground">نام کاربری</label>

                    <div className="flex h-12 overflow-hidden rounded-xl border border-border bg-background-secondary focus-within:border-primary">
                      <span className="flex items-center border-l border-border px-3 text-sm font-bold text-primary">@</span>

                      <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value.replace(/\s/g, "").replace(/^@/, ""))}
                        className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
                        placeholder="username"
                      />
                    </div>

                    <p className="mt-2 text-[10px] text-muted">آدرس گروه: nex/@{username || "username"}</p>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">توضیحات گروه</label>

                  <textarea
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-border bg-background-secondary px-4 py-3 text-sm leading-7 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="توضیح کوتاهی درباره گروه..."
                  />

                  <p className="mt-2 text-[10px] text-muted">{bio.length} / 300</p>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background-secondary/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FiUsers size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-bold">گروه عمومی</p>

                      <p className="mt-1 text-xs leading-6 text-muted">همه کاربران می‌توانند گروه را پیدا کنند و وارد شوند.</p>
                    </div>
                  </div>

                  <Toggle checked={isPublic} onChange={setIsPublic} />
                </div>

                <div className="flex justify-end border-t border-border pt-5">
                  <button
                    type="button"
                    onClick={saveChanges}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-background transition hover:bg-primary-hover sm:w-auto"
                  >
                    {saved ? (
                      <>
                        <FiCheck size={17} />
                        ذخیره شد
                      </>
                    ) : (
                      <>
                        <FiSave size={17} />
                        ذخیره تغییرات
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            <section id="members" className="overflow-hidden rounded-3xl border border-border bg-surface/50 backdrop-blur-xl">
              <div className="border-b border-border p-5 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FiUsers size={20} />
                    </div>

                    <div>
                      <h2 className="font-bold">اعضا و مدیران</h2>

                      <p className="mt-1 text-xs text-muted">نقش و دسترسی اعضای گروه را مدیریت کن.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border px-4 text-xs font-semibold transition hover:border-primary hover:text-primary"
                  >
                    <FiUserPlus size={16} />
                    افزودن عضو
                  </button>
                </div>

                <div className="relative mt-5">
                  <FiUsers size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />

                  <input
                    value={memberSearch}
                    onChange={(event) => setMemberSearch(event.target.value)}
                    placeholder="جستجوی عضو با نام کاربری..."
                    className="h-11 w-full rounded-xl border border-border bg-background-secondary pr-10 pl-4 text-xs outline-none transition focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2 p-4 sm:p-5">
                {filteredMembers.map((member) => (
                  <MemberRow key={member.id} member={member} onManage={() => setSelectedMember(member)} />
                ))}

                {filteredMembers.length === 0 && (
                  <div className="rounded-2xl border border-border p-8 text-center">
                    <FiUsers size={26} className="mx-auto text-muted" />

                    <p className="mt-3 text-sm font-bold">عضوی پیدا نشد</p>

                    <p className="mt-1 text-xs text-muted">نام کاربری دیگری را جستجو کن.</p>
                  </div>
                )}
              </div>
            </section>

            <section id="permissions" className="overflow-hidden rounded-3xl border border-border bg-surface/50 backdrop-blur-xl">
              <div className="border-b border-border p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FiLock size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold">دسترسی‌های گروه</h2>

                    <p className="mt-1 text-xs text-muted">دسترسی‌های پیش‌فرض اعضای عادی گروه.</p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border">
                <PermissionRow
                  title="ارسال پیام"
                  description="اعضای گروه بتوانند پیام ارسال کنند."
                  checked={permissions.sendMessages}
                  onChange={(checked) =>
                    setPermissions((current) => ({
                      ...current,
                      sendMessages: checked,
                    }))
                  }
                  icon={<FiMessageCircle size={17} />}
                />

                <PermissionRow
                  title="ارسال فایل"
                  description="اعضای گروه بتوانند تصویر و فایل ارسال کنند."
                  checked={permissions.sendFiles}
                  onChange={(checked) =>
                    setPermissions((current) => ({
                      ...current,
                      sendFiles: checked,
                    }))
                  }
                  icon={<FiPaperclip size={17} />}
                />

                <PermissionRow
                  title="افزودن عضو"
                  description="اعضا بتوانند کاربران جدید را به گروه اضافه کنند."
                  checked={permissions.addMembers}
                  onChange={(checked) =>
                    setPermissions((current) => ({
                      ...current,
                      addMembers: checked,
                    }))
                  }
                  icon={<FiUserPlus size={17} />}
                />

                <PermissionRow
                  title="پین کردن پیام"
                  description="اعضا بتوانند پیام‌ها را در گروه پین کنند."
                  checked={permissions.pinMessages}
                  onChange={(checked) =>
                    setPermissions((current) => ({
                      ...current,
                      pinMessages: checked,
                    }))
                  }
                  icon={<FiLink size={17} />}
                />

                <PermissionRow
                  title="حذف پیام دیگران"
                  description="اعضا بتوانند پیام‌های دیگر کاربران را حذف کنند."
                  checked={permissions.deleteMessages}
                  onChange={(checked) =>
                    setPermissions((current) => ({
                      ...current,
                      deleteMessages: checked,
                    }))
                  }
                  icon={<FiTrash2 size={17} />}
                />
              </div>
            </section>

            <section id="invite" className="overflow-hidden rounded-3xl border border-border bg-surface/50 p-5 backdrop-blur-xl sm:p-7">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiLink size={20} />
                </div>

                <div>
                  <h2 className="font-bold">لینک دعوت</h2>

                  <p className="mt-1 text-xs leading-6 text-muted">این لینک را برای دعوت کاربران به گروه استفاده کن.</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <div className="flex h-12 min-w-0 flex-1 items-center rounded-xl border border-border bg-background-secondary px-4">
                  <span className="truncate text-xs text-primary">nex/@{username || "gamingteam"}</span>
                </div>

                <button
                  type="button"
                  onClick={copyInvite}
                  className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold text-background transition hover:bg-primary-hover"
                >
                  {inviteCopied ? (
                    <>
                      <FiCheck size={16} />
                      کپی شد
                    </>
                  ) : (
                    <>
                      <FiLink size={16} />
                      کپی لینک
                    </>
                  )}
                </button>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-error/20 bg-error/5 p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-error/10 text-error">
                    <FiAlertTriangle size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-error">منطقه خطر</h2>

                    <p className="mt-2 max-w-xl text-xs leading-6 text-muted">حذف گروه یک عملیات دائمی است و تمام پیام‌ها، اعضا و اطلاعات گروه حذف خواهند شد.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                  className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-error/30 px-5 text-xs font-bold text-error transition hover:bg-error hover:text-white"
                >
                  <FiTrash2 size={16} />
                  حذف گروه
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="بستن" onClick={() => setSelectedMember(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="font-bold">مدیریت عضو</h2>

              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted hover:border-primary hover:text-primary"
              >
                <FiX size={17} />
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 font-black text-primary">{selectedMember.avatar}</div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold">{selectedMember.name}</p>

                  <p className="mt-1 text-xs text-muted">{selectedMember.username}</p>
                </div>

                {selectedMember.online && <span className="text-[10px] font-semibold text-success">آنلاین</span>}
              </div>

              <div className="mt-5">
                <p className="mb-3 text-xs font-bold">تعیین نقش</p>

                <div className="grid grid-cols-2 gap-2">
                  {(["عضو", "ادمین", "مدیر"] as MemberRole[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      disabled={selectedMember.role === "مالک"}
                      onClick={() => changeRole(selectedMember.id, role)}
                      className={`h-11 rounded-xl border text-xs font-semibold transition ${
                        selectedMember.role === role ? "border-primary bg-primary/10 text-primary" : "border-border text-muted hover:border-primary hover:text-primary"
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {selectedMember.role !== "مالک" && (
                <button
                  type="button"
                  onClick={() => removeMember(selectedMember.id)}
                  className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-error/30 text-xs font-bold text-error transition hover:bg-error hover:text-white"
                >
                  <FiUserMinus size={16} />
                  حذف از گروه
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {deleteOpen && (
        <div className="fixed inset-0 z-60">
          <button type="button" aria-label="بستن" onClick={() => setDeleteOpen(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <div className="absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-error/20 bg-background p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-error/10 text-error">
              <FiAlertTriangle size={25} />
            </div>

            <h2 className="mt-5 text-center text-lg font-black">حذف گروه؟</h2>

            <p className="mt-3 text-center text-sm leading-7 text-muted">این عملیات قابل بازگشت نیست و تمام اطلاعات گروه برای همیشه حذف خواهد شد.</p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setDeleteOpen(false)} className="h-11 rounded-xl border border-border text-xs font-semibold transition hover:border-primary hover:text-primary">
                انصراف
              </button>

              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-error text-xs font-bold text-white transition hover:opacity-90"
              >
                <FiTrash2 size={15} />
                حذف کامل
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold">{label}</label>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-border bg-background-secondary px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
    </div>
  );
}

function SettingsNav({ icon, title, active, danger, onClick }: { icon: React.ReactNode; title: string; active?: boolean; danger?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-xs font-semibold transition ${
        active ? "bg-primary text-background" : danger ? "text-error hover:bg-error/5" : "text-muted hover:bg-surface-hover hover:text-foreground"
      }`}
    >
      {icon}

      <span className="flex-1 text-right">{title}</span>

      <FiChevronLeft size={15} />
    </button>
  );
}

function MemberRow({ member, onManage }: { member: Member; onManage: () => void }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background-secondary/50 p-3 transition hover:border-primary/30 sm:flex-row sm:items-center">
      <div className="relative shrink-0 self-start sm:self-auto">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 font-black text-primary">{member.avatar}</div>

        {member.online && <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-background-secondary bg-success" />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-bold">{member.name}</p>

          <span
            className={`rounded-full px-2 py-1 text-[9px] font-bold ${
              member.role === "مالک"
                ? "bg-primary/10 text-primary"
                : member.role === "مدیر"
                  ? "bg-blue-500/10 text-blue-400"
                  : member.role === "ادمین"
                    ? "bg-purple-500/10 text-purple-400"
                    : "bg-surface text-muted"
            }`}
          >
            {member.role}
          </span>
        </div>

        <p className="mt-1 truncate text-[10px] text-muted">{member.username}</p>
      </div>

      <button
        type="button"
        disabled={member.role === "مالک"}
        onClick={onManage}
        className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border px-4 text-xs font-semibold transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FiSettings size={15} />
        مدیریت
      </button>
    </div>
  );
}

function PermissionRow({ icon, title, description, checked, onChange }: { icon: React.ReactNode; title: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center gap-3 p-4 sm:p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold">{title}</p>

        <p className="mt-1 text-[10px] leading-5 text-muted">{description}</p>
      </div>

      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full p-1 transition ${checked ? "bg-primary" : "bg-border"}`}
    >
      <span className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? "-translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}
