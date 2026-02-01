"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SideDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  const navigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[9998] bg-black/40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        ref={drawerRef}
        className={`fixed top-0 right-0 z-[9999] h-full w-[280px]
        bg-[#0b0f1a]/80 backdrop-blur-xl
        border-l border-white/10
        transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col gap-4 text-white">
          <div className="text-lg font-semibold">Welcome</div>

          <button
            onClick={() => navigate("/login")}
            className="nav-glow relative px-4 py-3 rounded-xl text-white/90 transition-all duration-300 hover:text-white text-left"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="nav-glow relative px-4 py-3 rounded-xl text-white/90 transition-all duration-300 hover:text-white text-left"
          >
            Create Account
          </button>
        </div>
      </aside>
    </>
  );
}
