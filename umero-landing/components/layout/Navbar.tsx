"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all backdrop-blur 
      ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <span className="font-bold text-xl">UMERO</span>

        <div className="flex items-center gap-6">
          <Link href="#home">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#reach">Reach Us</Link>

          <Link
            href="#early-access"
            className="px-4 py-2 rounded-lg font-medium transition hover:scale-105"
          >
            Get Early Access
          </Link>
        </div>
      </div>
    </nav>
  );
}
