"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import SideDrawer from "./SideDrawer";
import UserAvatar from "./UserAvatar";

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
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const mobileRef = useRef<HTMLDivElement>(null);

  const handleSelectActivity = (activity: string) => {
    router.push(`/spaces?activity=${activity}`);
    setShowDropdown(false);
    setMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileRef.current &&
        !mobileRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    }

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:top-6 md:left-1/2 md:-translate-x-1/2 md:max-w-7xl">
        <div className="relative flex items-center justify-between h-16 md:h-auto">
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-lg tracking-wide absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:mr-6 transition-all duration-300 hover:scale-105 hover:brightness-110"
          >
            <Image
              src="/logo/UMERO-new-logo.svg"
              alt="Umero"
              width={100}
              height={90}
              priority
            />
            <span className="tracking-wider">UMERO</span>
          </Link>

          {/* DESKTOP GLASS NAVBAR */}
          <div
            className={`hidden md:flex flex-1 glass rounded-2xl px-6 py-3 items-center justify-between relative transition-all duration-300 ${
              scrolled
                ? "backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
                : "backdrop-blur-md"
            }`}
          >
            {/* SEARCH */}
            <div className="relative flex items-center gap-2 glass px-4 py-2 rounded-xl w-[280px] transition-all duration-300 focus-within:shadow-[0_0_0_2px_rgba(139,92,246,0.6)]">
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
                className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full cursor-pointer tracking-wide"
              />

              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white text-black rounded-xl shadow-xl z-50 overflow-hidden">
                  {ACTIVITIES.map((activity) => (
                    <button
                      key={activity}
                      onClick={() => handleSelectActivity(activity)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 capitalize transition-all duration-200"
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* NAV LINKS */}
            <nav className="flex items-center gap-6 text-sm font-bold text-gray-200">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/#about">About</NavItem>
              <NavItem href="/early-access">Early Access</NavItem>
              <NavItem href="#reach-us">Reach Us</NavItem>
            </nav>
          </div>
        </div>
      </header>

      {/* ================= MOBILE DROPDOWN MENU ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[9999] md:hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Menu Panel */}
          <div
            ref={mobileRef}
            className="absolute top-16 left-4 right-4 bg-neutral-900/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-5 duration-300"
          >
            {/* MOBILE SEARCH */}
            <div className="relative mb-2">
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-3 rounded-xl">
                <svg
                  className="w-4 h-4 text-gray-300 shrink-0"
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
                  className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full cursor-pointer tracking-wide"
                />
              </div>
              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white text-black rounded-xl shadow-xl z-50 overflow-hidden">
                  {ACTIVITIES.map((activity) => (
                    <button
                      key={activity}
                      onClick={() => handleSelectActivity(activity)}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100 capitalize transition-all duration-200 font-medium"
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <nav className="flex flex-col gap-5 text-white font-semibold text-base">
              <MobileNavItem href="/" onClick={() => setMobileOpen(false)}>
                Home
              </MobileNavItem>

              <MobileNavItem
                href="/#about"
                onClick={() => setMobileOpen(false)}
              >
                About
              </MobileNavItem>

              <MobileNavItem
                href="/early-access"
                onClick={() => setMobileOpen(false)}
              >
                Early Access
              </MobileNavItem>

              <MobileNavItem
                href="#reach-us"
                onClick={() => setMobileOpen(false)}
              >
                Reach Us
              </MobileNavItem>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

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
      className="relative px-4 py-2 rounded-lg text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-white group"
    >
      {children}
      <span className="absolute left-4 bottom-1 w-0 h-[2px] bg-white/80 transition-all duration-300 group-hover:w-[60%]"></span>
    </Link>
  );
}

function MobileNavItem({
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
      className="py-2 border-b border-white/10 hover:text-purple-400 transition-colors duration-200"
    >
      {children}
    </Link>
  );
}
