"use client";

import { useEffect, useState } from "react";
import WelcomeCard from "@/components/WelcomeCard";

export default function HomeClient() {
  const [homeReady, setHomeReady] = useState(false);
  const [lastAuthAction, setLastAuthAction] = useState<
    "signup" | "login" | null
  >(null);

  useEffect(() => {
    // Signal that homepage content has mounted
    setHomeReady(true);

    // Fetch auth state
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user?.lastAuthAction) {
          setLastAuthAction(data.user.lastAuthAction);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {homeReady && lastAuthAction && (
        <WelcomeCard type={lastAuthAction} showAfterLoad={homeReady} />
      )}
    </>
  );
}
