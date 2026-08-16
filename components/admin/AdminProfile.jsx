"use client";

import { useState } from "react";
import { User, Mail } from "lucide-react";
import AvatarUpload from "@/components/common/AvatarUpload";

export default function AdminProfile({ email, avatarUrl: initial }) {
  const [avatarUrl, setAvatarUrl] = useState(initial || null);

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="font-display text-lg font-semibold text-ink lg:text-xl">Profile</h1>
        <p className="text-xs text-muted-foreground">Manage your administrator account.</p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-ink/5 bg-background p-6 shadow-sm sm:p-8">
        <AvatarUpload
          role="admin"
          name="Administrator"
          avatarUrl={avatarUrl}
          onChanged={setAvatarUrl}
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2.5 rounded-xl bg-[#F8F9FB] px-3 py-2.5">
            <User className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
            <span className="text-sm text-ink">Administrator</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-[#F8F9FB] px-3 py-2.5">
            <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
            <span className="truncate text-sm text-ink">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}