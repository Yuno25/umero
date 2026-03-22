"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [zoom, setZoom] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setZoom(true), 400); // zoom starts
    const t2 = setTimeout(() => setFade(true), 1100); // fade starts

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      style={{
        opacity: fade ? 0 : 1,
        transition: "opacity 600ms ease",
      }}
    >
      <img
        src="/logo/android-chrome-512x512.png"
        alt="Umero"
        style={{
          width: "120px",
          height: "120px",
          transform: zoom ? "scale(8)" : "scale(1)",
          transition: "transform 1.1s cubic-bezier(.16,1,.3,1)",
          filter: "drop-shadow(0 0 25px rgba(0,0,255,0.25))",
        }}
      />
    </div>
  );
}
