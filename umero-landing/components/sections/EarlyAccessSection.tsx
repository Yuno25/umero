"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function EarlyAccessSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section id="early-access" className="py-28 px-6 text-center">
      
      {/* TITLE */}
      <h2
        className={`text-3xl font-bold mb-4 fade-up ${
          animate ? "animate" : ""
        }`}
      >
        Get Early Access
      </h2>

      {/* SUBTITLE */}
      <p
        className={`opacity-80 mb-12 fade-up ${
          animate ? "animate" : ""
        }`}
        style={{ animationDelay: "0.15s" }}
      >
        Join before launch and be among the first to experience Umero
      </p>

      {/* CARDS */}
      <div className="flex flex-col md:flex-row justify-center gap-6">
        
        {/* LISTER */}
        <Link
          href="/early-access/lister"
          className={`px-6 py-4 rounded-xl transition hover:scale-105 fade-up ${
            animate ? "animate" : ""
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="font-semibold">I’m a Property Owner</div>
          <div className="text-xs opacity-70 mt-1">
            List your property early
          </div>
        </Link>

        {/* RENTER */}
        <Link
          href="/early-access/renter"
          className={`px-6 py-4 rounded-xl transition hover:scale-105 fade-up ${
            animate ? "animate" : ""
          }`}
          style={{ animationDelay: "0.45s" }}
        >
          <div className="font-semibold">I’m a Renter</div>
          <div className="text-xs opacity-70 mt-1">
            Get early rental access
          </div>
        </Link>

      </div>
    </section>
  );
}
