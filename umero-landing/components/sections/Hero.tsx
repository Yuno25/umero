"use client";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative px-6"
    >
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Rent. Host. Connect.
        </h1>

        <p className="text-lg opacity-80">
          A smarter peer-to-peer rental platform built for trust and
          flexibility.
        </p>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-10 text-sm opacity-60 animate-bounce">
        ↓ Scroll
      </div>
    </section>
  );
}
