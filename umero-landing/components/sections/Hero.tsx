"use client";

import { useEffect, useState } from "react";
import useInView from "@/hooks/useInView";

const images = ["/logo/1.jpg", "/logo/2.jpg", "/logo/3.jpg"];

export default function Hero() {
  const { ref, visible } = useInView(0.1);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* HERO TEXT */}
      <div className="absolute bottom-16 left-8 md:left-16 z-20 text-white max-w-4xl">
        <h1
          className="text-6xl md:text-[82px] font-light tracking-[-0.02em] leading-none mb-4"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          The Right Space.
          <br />
          <span
            className="text-[0.95em] font-light italic opacity-90"
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            Changes Everything.
          </span>
        </h1>

        <p
          className="text-sm font-light tracking-[0.15em] opacity-50 mt-3"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          Your Moment Deserves The Right Space
        </p>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 right-8 text-sm opacity-40 animate-bounce z-20 text-white tracking-widest"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        ↓ scroll
      </div>
    </section>
  );
}
