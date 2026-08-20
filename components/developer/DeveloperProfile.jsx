"use client";

import { useState } from "react";
import AvatarUpload from "@/components/common/AvatarUpload";

export default function DeveloperProfileClient({ user }) {
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || null);
  return (
    <div className="space-y-6 pb-10 max-w-2xl">
      <div>
        <h1 className="font-display text-lg font-semibold text-ink lg:text-xl">My Profile</h1>
        <p className="text-xs text-muted-foreground">Your developer account information and credentials.</p>
      </div>

      <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-4 border-b border-ink/5 pb-4">
          <AvatarUpload role="developer" name={user.name} avatarUrl={avatarUrl} onChanged={setAvatarUrl} />
          <div>
            <h2 className="font-semibold text-lg text-ink">{user.name}</h2>
            <span className="inline-flex rounded-full bg-green/10 px-2.5 py-0.5 text-xs font-semibold text-green">
              {user.role || "DEVELOPER"}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Full Name</label>
            <div className="rounded-xl border border-ink/10 bg-sand/20 p-3 text-ink font-medium">{user.name}</div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Email Address</label>
            <div className="rounded-xl border border-ink/10 bg-sand/20 p-3 text-ink font-medium">{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
