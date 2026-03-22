"use client";

import { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import SideDrawer from "./layout/SideDrawer";
import useScrollReveal from "hooks/useScrollReveal";
import SplashScreen from "./SplashScreen";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useScrollReveal();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1700); //ensures animation runs

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <SplashScreen />}

      {!loading && (
        <>
          <Navbar />
          <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
          {children}
        </>
      )}
    </>
  );
}
