"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-6 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-6">
        {/* LOGO — OUTSIDE GLASS */}
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
        <div className="flex-1 glass rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* SEARCH BAR — DESKTOP ONLY (UNCHANGED) */}
          <div className="hidden md:flex items-center gap-2 glass px-4 py-2 rounded-xl w-[280px]">
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
              placeholder="Search spaces, cities..."
              className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
            />
          </div>

          {/* NAV LINKS — DESKTOP ONLY (UNCHANGED) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-200">
            <Link href="/" className="hover:text-accent transition">
              Home
            </Link>
            <Link href="/#about" className="hover:text-accent transition">
              About
            </Link>
            <Link href="/early-access" className="hover:text-accent transition">
              Early Access
            </Link>
            <Link href="#reach-us" className="hover:text-accent transition">
              Reach Us
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON — NEW */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU — NEW */}
      {mobileOpen && (
        <div className="md:hidden mt-3 mx-6 glass rounded-2xl px-6 py-4">
          <nav className="flex flex-col gap-4 text-sm font-bold text-gray-200">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="hover:text-accent transition"
            >
              Home
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileOpen(false)}
              className="hover:text-accent transition"
            >
              About
            </Link>
            <Link
              href="/early-access"
              onClick={() => setMobileOpen(false)}
              className="hover:text-accent transition"
            >
              Early Access
            </Link>
            <Link
              href="#reach-us"
              onClick={() => setMobileOpen(false)}
              className="hover:text-accent transition"
            >
              Reach Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
