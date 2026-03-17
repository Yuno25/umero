"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/lib/useAuth";
import SideDrawer from "./SideDrawer";

const ACTIVITIES = [
  "birthday",
  "party",
  "photography",
  "videography",
  "podcast",
];
const LOCATIONS = ["Delhi", "Mumbai", "Bangalore", "Pune", "Hyderabad"];
const TIMES = ["Anytime", "This weekend", "This week", "This month"];

export default function Navbar() {
  const { user, loading } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Delhi");
  const [selectedTime, setSelectedTime] = useState("Anytime");

  const router = useRouter();
  const pathname = usePathname();

  const mobileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Pages where navbar is ALWAYS black (white background pages)
  const isHomePage = pathname === "/";
  const alwaysBlack = !isHomePage; // every page except home is always black

  const handleSearch = () => {
    const activity = selectedActivity || "any";
    router.push(
      `/spaces?activity=${activity}&location=${selectedLocation}&time=${selectedTime}`,
    );
    setShowActivityDropdown(false);
    setShowLocationDropdown(false);
    setShowTimeDropdown(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowActivityDropdown(false);
        setShowLocationDropdown(false);
        setShowTimeDropdown(false);
      }
      if (
        mobileRef.current &&
        !mobileRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navbar bg logic:
  // Home page → transparent until scroll then black
  // All other pages → always black
  const navBg = alwaysBlack
    ? "bg-black"
    : scrolled
      ? "bg-black"
      : "bg-transparent";

  const showSearch = isHomePage;

  return (
    <>
      <style>{`
        @keyframes dd-in {
          from { opacity:0; transform:translateY(6px) scale(.98); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .um-dropdown {
          animation: dd-in .18s cubic-bezier(.16,1,.3,1) both;
        }
      `}</style>

      <header className="fixed top-0 left-0 w-full z-50">
        {/* NAVBAR */}
        <div
          className={`flex items-center justify-between px-12 py-6 transition-all duration-300 ${navBg}`}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-1 text-white">
            <Image
              src="/logo/UMERO-new-logo.svg"
              alt="Umero"
              width={85}
              height={85}
              priority
            />
            <span
              className="text-3xl font-bold tracking-wide"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              UMERO
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-3">
              <TopNavItem href="/">Home</TopNavItem>
              <TopNavItem href="/#about">About</TopNavItem>
              <TopNavItem href="/early-access">Early Access</TopNavItem>
              <TopNavItem href="#reach-us">Reach Us</TopNavItem>
            </nav>
            {!loading && !user && (
              <Link
                href="/signup"
                className="ml-4 px-5 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
              >
                Sign Up
              </Link>
            )}

            {!loading && user && (
              <>
                <div
                  onClick={() => setDrawerOpen(true)}
                  className="ml-4 cursor-pointer"
                >
                  <UserAvatar user={user} />
                </div>

                <SideDrawer
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                />
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* SEARCH BAR — only on home */}
        {showSearch && (
          <div
            ref={searchRef}
            className={`hidden md:flex absolute left-1/2 -translate-x-1/2 top-[250px] w-full justify-center px-6 z-50 transition-all duration-300 ${
              scrolled
                ? "opacity-0 pointer-events-none -translate-y-2"
                : "opacity-100"
            }`}
          >
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                borderRadius: "14px",
                overflow: "visible",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                background: "rgba(255,255,255,0.18)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.3)",
                minWidth: "820px",
                maxWidth: "900px",
                width: "100%",
              }}
            >
              {/* ACTIVITY */}
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  borderRight: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <button
                  onClick={() => {
                    setShowActivityDropdown(!showActivityDropdown);
                    setShowLocationDropdown(false);
                    setShowTimeDropdown(false);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 24px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "14px 0 0 14px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.7)",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      margin: "0 0 3px",
                    }}
                  >
                    What are you planning?
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: selectedActivity
                        ? "#fff"
                        : "rgba(255,255,255,0.5)",
                      margin: 0,
                    }}
                  >
                    {selectedActivity || "Enter your activity"}
                  </p>
                </button>

                {showActivityDropdown && (
                  <div
                    className="um-dropdown"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: 0,
                      width: "100%",
                      zIndex: 100,
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
                      overflow: "hidden",
                    }}
                  >
                    {ACTIVITIES.map((a) => (
                      <button
                        key={a}
                        onClick={() => {
                          setSelectedActivity(a);
                          setShowActivityDropdown(false);
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "12px 20px",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#0A0A0A",
                          textTransform: "capitalize",
                          borderBottom: "1px solid rgba(0,0,0,.06)",
                          transition: "background .15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(0,0,255,.06)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* LOCATION */}
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  borderRight: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <button
                  onClick={() => {
                    setShowLocationDropdown(!showLocationDropdown);
                    setShowActivityDropdown(false);
                    setShowTimeDropdown(false);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 24px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.7)",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      margin: "0 0 3px",
                    }}
                  >
                    Where?
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {selectedLocation}
                  </p>
                </button>

                {showLocationDropdown && (
                  <div
                    className="um-dropdown"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: 0,
                      width: "100%",
                      zIndex: 100,
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
                      overflow: "hidden",
                    }}
                  >
                    {LOCATIONS.map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setSelectedLocation(l);
                          setShowLocationDropdown(false);
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "12px 20px",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#0A0A0A",
                          borderBottom: "1px solid rgba(0,0,0,.06)",
                          transition: "background .15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(0,0,255,.06)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* TIME */}
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  borderRight: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <button
                  onClick={() => {
                    setShowTimeDropdown(!showTimeDropdown);
                    setShowActivityDropdown(false);
                    setShowLocationDropdown(false);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 24px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.7)",
                      textTransform: "uppercase",
                      letterSpacing: ".1em",
                      margin: "0 0 3px",
                    }}
                  >
                    When?
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {selectedTime}
                  </p>
                </button>

                {showTimeDropdown && (
                  <div
                    className="um-dropdown"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: 0,
                      width: "100%",
                      zIndex: 100,
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
                      overflow: "hidden",
                    }}
                  >
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setSelectedTime(t);
                          setShowTimeDropdown(false);
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "12px 20px",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#0A0A0A",
                          borderBottom: "1px solid rgba(0,0,0,.06)",
                          transition: "background .15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(0,0,255,.06)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* SEARCH BUTTON */}
              <button
                onClick={handleSearch}
                style={{
                  background: "#0000FF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0 14px 14px 0",
                  padding: "14px 32px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: ".01em",
                  transition: "background .2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#0000CC")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#0000FF")
                }
              >
                Search
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function TopNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-base font-semibold text-white/90 hover:text-white hover:scale-105 transition-all duration-200"
    >
      {children}
    </Link>
  );
}
