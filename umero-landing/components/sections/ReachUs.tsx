"use client";

import { useEffect, useRef } from "react";
import { Mail, Linkedin, Instagram, X } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
  },
  {
    name: "X",
    href: "https://x.com",
    icon: X,
  },
  {
    name: "Email",
    href: "mailto:contact@umero.in",
    icon: Mail,
  },
];

export default function ReachUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="reach-us"
      className="relative flex flex-col items-center justify-center py-32 text-center"
    >
      {/* TITLE */}
      <h2 className="mb-4 text-3xl font-semibold text-white fade-up animate">
        Reach Us
      </h2>

      {/* SUBTITLE */}
      <p
        className="mb-10 max-w-md text-white/70 fade-up animate"
        style={{ animationDelay: "120ms" }}
      >
        Have questions or want to collaborate? Reach out to us anytime.
      </p>

      {/* ICON ROW */}
      <div
        ref={containerRef}
        className="flex gap-5 opacity-0 translate-y-6 transition-all duration-700"
      >
        {socialLinks.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target={item.name !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{ transitionDelay: `${index * 120}ms` }}
              className="group relative flex h-11 w-11 items-center justify-center
                         rounded-full bg-white/5 border border-white/10 backdrop-blur-md
                         transition-all duration-300
                         hover:border-purple-400/50 hover:bg-purple-500/10
                         hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.45)]
                         float-slow"
            >
              <Icon className="h-5 w-5 text-white/80 transition-colors group-hover:text-purple-400" />

              {/* TOOLTIP */}
              <span className="pointer-events-none absolute -top-10 scale-0 rounded bg-black px-2 py-1 text-xs text-white transition-all duration-200 group-hover:scale-100">
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
