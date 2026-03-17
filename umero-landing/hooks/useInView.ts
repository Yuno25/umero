"use client";

import { useEffect, useRef, useState } from "react";

export default function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
