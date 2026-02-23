"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

export default function SideDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useAuth(); // ✅ get logged-in user
  const [propertyOpen, setPropertyOpen] = useState(false);

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

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`fixed top-0 right-0 z-[9999] h-full w-[280px]
        bg-[#0b0f1a]/80 backdrop-blur-xl
        border-l border-white/10
        transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full text-white">
          {/* ===== IF USER LOGGED IN ===== */}
          {user ? (
            <>
              {/* User Info */}
              <div className="mb-8">
                <div className="text-lg font-semibold">
                  {user.name || user.email}
                </div>
                <div className="text-sm text-white/60">{user.email}</div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => navigate("/profile")}
                  className="nav-glow relative px-4 py-3 rounded-xl text-white/90 transition-all duration-300 hover:text-white text-left"
                >
                  Profile
                </button>

                {/* My Properties Dropdown */}
                <div>
                  <button
                    onClick={() => setPropertyOpen(!propertyOpen)}
                    className="nav-glow relative px-4 py-3 rounded-xl text-white/90 transition-all duration-300 hover:text-white text-left w-full"
                  >
                    My Properties
                  </button>

                  {propertyOpen && (
                    <div className="ml-4 mt-2 flex flex-col gap-2 text-sm text-white/70">
                      <button
                        onClick={() => navigate("/properties/listed")}
                        className="text-left hover:text-white"
                      >
                        Listed
                      </button>
                      <button
                        onClick={() => navigate("/properties/rented")}
                        className="text-left hover:text-white"
                      >
                        Rented
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate("/events")}
                  className="nav-glow relative px-4 py-3 rounded-xl text-white/90 transition-all duration-300 hover:text-white text-left"
                >
                  Events
                </button>

                <button
                  onClick={() => navigate("/refer")}
                  className="nav-glow relative px-4 py-3 rounded-xl text-white/90 transition-all duration-300 hover:text-white text-left"
                >
                  Refer to Friend
                </button>
              </div>

              {/* Push Logout to Bottom */}
              <div className="mt-auto pt-6">
                <button
                  onClick={handleLogout}
                  className="nav-glow relative px-4 py-3 rounded-xl text-red-400 transition-all duration-300 hover:text-red-500 text-left w-full"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            /* ===== IF NOT LOGGED IN ===== */
            <div className="flex flex-col gap-4">
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
          )}
        </div>
      </aside>
    </>
  );
}
