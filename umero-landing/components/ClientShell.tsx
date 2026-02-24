"use client";

import { useState } from "react";
import Navbar from "./layout/Navbar";
import SideDrawer from "./layout/SideDrawer";
import UserAvatar from "./layout/UserAvatar";
import useScrollReveal from "hooks/useScrollReveal";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Global scroll reveal activation
  useScrollReveal();

  return (
    <>
      <Navbar />

      {/* USER AVATAR */}
      <div className="fixed top-6 right-6 z-[9999]">
        <UserAvatar onClick={() => setDrawerOpen(true)} />
      </div>

      {/* SIDE DRAWER */}
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {children}
    </>
  );
}
