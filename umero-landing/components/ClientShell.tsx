"use client";

import { useState } from "react";
import Navbar from "./layout/Navbar";
import SideDrawer from "./layout/SideDrawer";
import useScrollReveal from "hooks/useScrollReveal";



export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useScrollReveal();

  return (
    <>
      <Navbar />

      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {children}
    </>
  );
}