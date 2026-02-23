"use client";

import { useAuth } from "@/lib/useAuth";

export default function UserAvatar({ onClick }: { onClick: () => void }) {
  const { user } = useAuth();

  const firstLetter =
    user?.username?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "G";

  return (
    <button
      onClick={onClick}
      className="
        ml-4 h-9 w-9 rounded-full
        bg-purple-600 text-white
        flex items-center justify-center
        font-medium
        cursor-pointer
        hover:scale-105 transition
        relative z-50
      "
      aria-label="User menu"
    >
      {firstLetter}
    </button>
  );
}
