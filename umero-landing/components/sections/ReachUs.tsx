"use client";

import { useEffect, useRef } from "react";
import { Mail, Linkedin, Instagram, X } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/umero/posts/?feedView=all",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/umero.in/",
    icon: Instagram,
  },
  {
    name: "X",
    href: "https://x.com/umero", // change if you have a different handle
    icon: X,
  },
  {
    name: "Email",
    href: "mailto:contact@umero.in?subject=Hello%20Umero&body=Hi%20Umero%20Team,",
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
      { threshold: 0.2 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="reach-us" className="relative w-full bg-black pt-32 pb-14">
      {/* TOP DIVIDER (signals footer start) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* MAIN CONTENT */}
        <div className="flex flex-col items-center text-center">
          {/* TITLE */}
          <h2 className="mb-4 text-3xl font-semibold text-white fade-up animate">
            Reach Us
          </h2>

          {/* SUBTITLE */}
          <p
            className="mb-12 max-w-md text-white/70 fade-up animate"
            style={{ animationDelay: "120ms" }}
          >
            Have questions or want to collaborate? Reach out to us anytime.
          </p>

          {/* ICON ROW */}
          <div
            ref={containerRef}
            className="flex gap-6 opacity-0 translate-y-6 transition-all duration-700"
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
                  className="
                    group relative flex h-11 w-11 items-center justify-center
                    rounded-full
                    border border-white/15
                    bg-white/10 backdrop-blur-md
                    transition-all duration-300
                    hover:border-purple-400/60
                    hover:bg-purple-500/10
                    hover:scale-110
                    hover:shadow-[0_0_20px_rgba(168,85,247,0.45)]
                    float-slow
                  "
                >
                  <Icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-purple-400" />

                  {/* TOOLTIP */}
                  <span className="pointer-events-none absolute -top-10 scale-0 rounded bg-black px-2 py-1 text-xs text-white transition-all duration-200 group-hover:scale-100">
                    {item.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* FOOTER BASE */}
        <div className="mt-20 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
          <span>© {new Date().getFullYear()} Umero</span>
          <span className="mt-2 md:mt-0">Built for modern living</span>
        </div>
      </div>
    </section>
  );
}
