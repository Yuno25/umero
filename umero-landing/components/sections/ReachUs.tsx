"use client";

import { useEffect, useRef } from "react";
import { Mail, Linkedin, Instagram, X } from "lucide-react";
import useInView from "@/hooks/useInView";

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
    href: "https://x.com/umero",
    icon: X,
  },
  {
    name: "Email",
    href: "mailto:contact@umero.in?subject=Hello%20Umero&body=Hi%20Umero%20Team,",
    icon: Mail,
  },
];

export default function ReachUs() {
  const { ref, visible } = useInView();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const icons = containerRef.current?.children;
    if (!icons) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          Array.from(icons).forEach((icon, index) => {
            setTimeout(() => {
              icon.classList.add("icon-visible");
            }, index * 180);
          });
        }
      },
      { threshold: 0.2 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="reach-us"
      className="relative w-full bg-black pt-36 md:pb-20 overflow-hidden"
    >
      {/* WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="watermark-umero opacity-100">UMERO</h1>
      </div>

      {/* TOP DIVIDER */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* IMPROVED TITLE */}
          <h2 className="mb-4 text-4xl md:text-5xl font-semibold text-white tracking-wide">
            Let’s Connect
          </h2>

          {/* BETTER SUBTEXT */}
          <p className="mb-14 max-w-lg text-white/60 text-lg leading-relaxed">
            Whether you're looking for a space, listing one, or exploring
            partnerships — we’d love to hear from you.
          </p>

          {/* ICON ROW */}
          <div ref={containerRef} className="flex gap-8">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.name !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="
                    icon-base
                    group relative flex h-14 w-14 items-center justify-center
                    rounded-full
                    border border-white/15
                    bg-white/5 backdrop-blur-md
                    transition-all duration-300
                    hover:border-purple-400/60
                    hover:bg-purple-500/10
                    hover:scale-110
                    hover:shadow-[0_0_25px_rgba(168,85,247,0.45)]
                  "
                >
                  <Icon className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-purple-400" />

                  <span className="pointer-events-none absolute -top-10 scale-0 rounded bg-black px-2 py-1 text-xs text-white transition-all duration-200 group-hover:scale-100">
                    {item.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* NEW: FOOTER LINKS (LIKE IMAGE, SAME LAYOUT ZONE) */}
        <div className="mt-32 md:mt-40 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm text-white/60">
          <div>
            <h4 className="text-white mb-4 font-medium">Product</h4>
            <ul className="space-y-2">
              <li className="hover:text-white transition">Browse Listings</li>
              <li className="hover:text-white transition">Post a Space</li>
              <li className="hover:text-white transition">Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 font-medium">Company</h4>
            <ul className="space-y-2">
              <li className="hover:text-white transition">About Us</li>
              <li className="hover:text-white transition">Careers</li>
              <li className="hover:text-white transition">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 font-medium">Support</h4>
            <ul className="space-y-2">
              <li className="hover:text-white transition">Help Center</li>
              <li className="hover:text-white transition">FAQs</li>
              <li className="hover:text-white transition">Report Issue</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 font-medium">Legal</h4>
            <ul className="space-y-2">
              <li className="hover:text-white transition">Privacy Policy</li>
              <li className="hover:text-white transition">Terms of Service</li>
            </ul>
          </div>
        </div>

        {/* FOOTER BASE */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
          <span>© {new Date().getFullYear()} Umero. All rights reserved.</span>

          <div className="flex gap-6 mt-2 md:mt-0">
            <span className="hover:text-white transition cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Terms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
