"use client";

import { useEffect, useState } from "react";
import useInView from "@/hooks/useInView";

export default function EventsSection() {
  const { ref, visible } = useInView();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (visible) setAnimate(true);
  }, [visible]);

  return (
    <section ref={ref} id="events" className="py-28 px-6 text-center">
      {/* TITLE */}
      <h2
        className={`text-3xl font-bold mb-4 fade-up ${
          animate ? "animate" : ""
        }`}
      >
        Events & Offers
      </h2>

      {/* SUBTITLE */}
      <p
        className={`opacity-80 mb-12 fade-up ${animate ? "animate" : ""}`}
        style={{ animationDelay: "0.15s" }}
      >
        Something exciting is coming. Stay connected for exclusive events,
        discounts, and featured listings.
      </p>

      {/* SKELETON PROPERTY CARDS */}
      <div
        className={`grid md:grid-cols-3 gap-6 fade-up ${
          animate ? "animate" : ""
        }`}
        style={{ animationDelay: "0.3s" }}
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="relative p-4 rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden 
            opacity-60 hover:opacity-80 transition duration-300"
          >
            {/* IMAGE */}
            <div className="h-40 w-full rounded-xl bg-white/10 animate-pulse" />

            {/* TITLE */}
            <div className="h-4 w-3/4 bg-white/10 rounded mt-4 animate-pulse" />

            {/* LOCATION */}
            <div className="h-3 w-1/2 bg-white/10 rounded mt-2 animate-pulse" />

            {/* PRICE / OFFER */}
            <div className="h-4 w-1/3 bg-white/10 rounded mt-4 animate-pulse" />

            {/* OVERLAY */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <span className="text-sm font-medium tracking-wide">
                Coming Soon
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
