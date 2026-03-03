"use client";

import { useEffect, useState } from "react";

const images = [
  "/logo/1.jpg",
  "/logo/2.jpg",
  "/logo/3.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden"
    >
      {/* Background slideshow */}
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Dark transparent overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* YOUR ORIGINAL CONTENT (UNCHANGED) */}
      <div className="relative z-20 max-w-3xl text-center text-white">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Rent. Host. Connect.
        </h1>

        <p className="text-lg opacity-80">
         Your Moment Deserves the Right Space
        </p>
      </div>

      {/* Scroll Cue (UNCHANGED) */}
      <div className="absolute bottom-10 text-sm opacity-60 animate-bounce z-20 text-white">
        ↓ Scroll
      </div>
    </section>
  );
}
