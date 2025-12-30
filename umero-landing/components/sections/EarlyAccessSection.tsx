"use client";

import Link from "next/link";

export default function EarlyAccessSection() {
  return (
    <section id="early-access" className="py-28 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Get Early Access</h2>

      <p className="opacity-80 mb-12">
        Join before launch and be among the first to experience Umero
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-6">
        <Link
          href="/early-access/lister"
          className="px-6 py-4 rounded-xl transition hover:scale-105"
        >
          <div className="font-semibold">I’m a Property Owner</div>
          <div className="text-xs opacity-70 mt-1">
            List your property early
          </div>
        </Link>

        <Link
          href="/early-access/renter"
          className="px-6 py-4 rounded-xl transition hover:scale-105"
        >
          <div className="font-semibold">I’m a Renter</div>
          <div className="text-xs opacity-70 mt-1">Get early rental access</div>
        </Link>
      </div>
    </section>
  );
}
