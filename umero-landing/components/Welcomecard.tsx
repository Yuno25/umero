"use client";

import { useEffect, useState } from "react";

interface WelcomeCardProps {
  type: "signup" | "login";
  showAfterLoad: boolean;
}

export default function WelcomeCard({ type, showAfterLoad }: WelcomeCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!showAfterLoad) return;

    // show only after home signals readiness
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showAfterLoad]);

  if (!visible) return null;

  return (
    <div
      className="
        fixed
        top-6
        right-6
        z-50
        max-w-xs
        rounded-xl
        p-4
        shadow-lg
      "
    >
      <h3 className="text-base font-semibold">
        {type === "signup" ? "Welcome to Umero" : "Great to have you back"}
      </h3>
    </div>
  );
}
