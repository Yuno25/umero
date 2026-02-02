"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

/* ACTIVITIES LIST */
const ACTIVITIES = [
  "birthday",
  "party",
  "photography",
  "videography",
  "podcast",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleSelectActivity = (activity: string) => {
    router.push(`/spaces?activity=${activity}`);
    setShowDropdown(false);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4">
      <div className="flex items-center gap-6">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-bold text-lg tracking-wide shrink-0"
        >
          <Image
            src="/logo/UMERO-new-logo.svg"
            alt="Umero"
            width={100}
            height={90}
            priority
          />
          <span>UMERO</span>
        </Link>

        {/* GLASS NAVBAR */}
        <div className="flex-1 glass rounded-2xl px-6 py-3 flex items-center justify-between relative">
          {/* SEARCH — DESKTOP */}
          <div className="relative hidden md:flex items-center gap-2 glass px-4 py-2 rounded-xl w-[280px]">
            <svg
              className="w-4 h-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search activities"
              readOnly
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full cursor-pointer"
            />

            {/* DROPDOWN */}
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white text-black rounded-xl shadow-lg z-50 overflow-hidden">
                {ACTIVITIES.map((activity) => (
                  <button
                    key={activity}
                    onClick={() => handleSelectActivity(activity)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 capitalize"
                  >
                    {activity}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* NAV LINKS — DESKTOP */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-200">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/#about">About</NavItem>
            <NavItem href="/early-access">Early Access</NavItem>
            <NavItem href="#reach-us">Reach Us</NavItem>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white nav-glow p-2 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden mt-3 glass rounded-2xl px-6 py-4 space-y-4">
          {/* MOBILE ACTIVITY LIST */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Search activities
            </p>
            {ACTIVITIES.map((activity) => (
              <button
                key={activity}
                onClick={() => handleSelectActivity(activity)}
                className="text-left text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10 capitalize"
              >
                {activity}
              </button>
            ))}
          </div>

          <nav className="flex flex-col gap-4 text-sm font-bold text-gray-200">
            <NavItem href="/" onClick={() => setMobileOpen(false)}>
              Home
            </NavItem>
            <NavItem href="/#about" onClick={() => setMobileOpen(false)}>
              About
            </NavItem>
            <NavItem href="/early-access" onClick={() => setMobileOpen(false)}>
              Early Access
            </NavItem>
            <NavItem href="#reach-us" onClick={() => setMobileOpen(false)}>
              Reach Us
            </NavItem>
          </nav>
        </div>
      )}
    </header>
  );
}

/* NAV ITEM */
function NavItem({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="nav-glow relative px-4 py-2 rounded-lg transition-all duration-300 text-white/90"
    >
      {children}
    </Link>
  );
}
