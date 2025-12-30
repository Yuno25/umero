"use client";

import { useState } from "react";

export default function ReachUs() {
  const email = "contact@umero.in";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      id="reach"
      className="py-28 px-6 bg-slate-50 dark:bg-black transition-colors"
    >
      <div className="max-w-4xl mx-auto">
        {/* Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-950 shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 px-8 py-14 text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">
            Reach Us
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mb-12">
            We’d love to connect — reach out on socials or email us anytime
          </p>

          {/* Email Block */}
          <div className="flex flex-col items-center gap-3 mb-14">
            <a
              href={`mailto:${email}`}
              className="text-lg font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              {email}
            </a>

            <button
              onClick={handleCopy}
              className="text-sm px-4 py-1.5 rounded-full border border-slate-300 dark:border-slate-700
                         hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {copied ? "Copied ✓" : "Copy email"}
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-12">
            {[
              {
                label: "LinkedIn",
                link: "https://www.linkedin.com/in/YOUR_USERNAME",
                hover: "group-hover:text-cyan-500",
                svg: (
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8.98h4.6V24H.2zM8.98 8.98h4.42v2.05h.06c.62-1.18 2.14-2.42 4.4-2.42 4.7 0 5.56 3.1 5.56 7.14V24h-4.6v-6.68c0-1.6-.03-3.66-2.24-3.66-2.24 0-2.58 1.74-2.58 3.54V24h-4.6z" />
                ),
              },
              {
                label: "Instagram",
                link: "https://www.instagram.com/YOUR_HANDLE",
                hover: "group-hover:text-pink-500",
                svg: (
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm-5 3a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm4.5-8.5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z" />
                ),
              },
              {
                label: "X",
                link: "https://x.com/YOUR_HANDLE",
                hover: "group-hover:text-black dark:group-hover:text-white",
                svg: (
                  <path d="M18.244 2H21.996L13.996 11.147L23.426 22H15.934L10.074 15.271L4.278 22H0.516L9.07 12.214L0 2H7.684L12.978 8.147L18.244 2ZM17.098 20H19.174L6.684 4H4.468L17.098 20Z" />
                ),
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="relative group opacity-0 animate-fadeUp"
                style={{
                  animationDelay: `${i * 140}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`text-slate-500 dark:text-slate-400 ${item.hover}
                             transition transform hover:-translate-y-1`}
                >
                  <svg
                    className="w-9 h-9"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {item.svg}
                  </svg>
                </a>

                {/* Tooltip */}
                <span
                  className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2
                                 rounded bg-slate-900 px-2 py-1 text-xs text-white
                                 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition"
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}
