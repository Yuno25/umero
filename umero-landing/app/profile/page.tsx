"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .finally(() => setInitialLoading(false));
  }, []);

  const handleChange = (field: string, value: string) => {
    setUser((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const res = await fetch("/api/auth/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      setUser(data.user);
      setEdit(false);

      alert("Profile updated successfully ✅");
    } catch {
      alert("Failed to update profile ❌");
    } finally {
      setSaving(false);
    }
  };

  // ✅ FIXED LOADING BUG
  if (initialLoading) {
    return (
      <main className="min-h-screen bg-[#020617] pt-40 flex justify-center text-white">
        Loading profile...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#020617] pt-40 flex justify-center text-red-400">
        Not logged in
      </main>
    );
  }

  // 🧠 PROFILE COMPLETION
  const fields = ["username", "phone", "city", "state", "address"];
  const completed = fields.filter((f) => user?.[f]).length;
  const completion = Math.round((completed / fields.length) * 100);

  return (
    <main className="min-h-screen bg-[#020617] pt-40 px-4 pb-20 text-white">
      <div className="max-w-2xl mx-auto">
        {/* 🔥 USER HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-xl font-semibold">
            {user.username?.[0]?.toUpperCase()}
          </div>

          <div>
            <p className="text-lg font-semibold">
              {user.username?.trim() || user.email?.split("@")[0]}
            </p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* 🔥 PROFILE COMPLETION */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Profile Completion</span>
            <span>{completion}%</span>
          </div>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        {/* 🔥 HEADER ACTION */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Profile Details</h1>

          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        {/* 🔥 PROFILE CARD */}
        <div className="border border-white/10 rounded-2xl p-6 space-y-5 bg-white/[0.02] backdrop-blur">
          <Field
            label="Username"
            value={user.username}
            edit={edit}
            onChange={(v) => handleChange("username", v)}
          />
          <Field label="Email" value={user.email} edit={false} />
          <Field
            label="Phone"
            value={user.phone}
            edit={edit}
            onChange={(v) => handleChange("phone", v)}
          />
          <Field
            label="Gender"
            value={user.gender}
            edit={edit}
            onChange={(v) => handleChange("gender", v)}
          />
          <Field
            label="Age"
            value={user.age}
            edit={edit}
            onChange={(v) => handleChange("age", v)}
          />
          <Field
            label="Address"
            value={user.address}
            edit={edit}
            onChange={(v) => handleChange("address", v)}
          />
          <Field
            label="City"
            value={user.city}
            edit={edit}
            onChange={(v) => handleChange("city", v)}
          />
          <Field
            label="State"
            value={user.state}
            edit={edit}
            onChange={(v) => handleChange("state", v)}
          />
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  edit,
  onChange,
}: {
  label: string;
  value: any;
  edit: boolean;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>

      <input
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={!edit}
        placeholder={edit ? `Enter ${label}` : ""}
        className={`w-full mt-1 px-3 py-2 rounded-lg border transition ${
          edit
            ? "border-white/20 bg-white/5 focus:border-white/40"
            : "border-white/10 bg-transparent"
        } text-white focus:outline-none`}
      />

      {/* 🔥 Missing field hint */}
      {!value && !edit && (
        <p className="text-xs text-yellow-400 mt-1">
          Add this to complete your profile
        </p>
      )}
    </div>
  );
}
