"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<null | { email: string }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
        setLoading(false);
      });
  }, []);

  return { user, loading };
}
