"use client";

import { useEffect, useRef, useState } from "react";
import useInView from "@/hooks/useInView";

const lines = [
  { text: "Café open 9am to 9pm —", highlight: "what about the other hours?" },
  {
    text: "Airbnb not running on weekends —",
    highlight: "those days are money left behind.",
  },
  { text: "Farmhouse used once a month —", highlight: "list it by the hour." },
  {
    text: "Factory floor sitting empty —",
    highlight: "someone needs it right now.",
  },
];

export default function HostSection() {
  const { ref, visible } = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        @keyframes hs-fade-up {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hs-title-in {
          from { opacity:0; transform:translateY(64px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hs-img-in {
          from { opacity:0; transform:scale(.97) translateY(20px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes hs-pulse {
          0%,100% { box-shadow:0 0 0 0 rgba(0,0,255,.35); }
          50%      { box-shadow:0 0 0 7px rgba(0,0,255,0); }
        }
        @keyframes hs-line-x {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        .hs-cta {
          transition: transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s;
          cursor: pointer;
        }
        .hs-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 48px rgba(0,0,255,.32) !important;
        }
        .hs-line-item { transition: opacity .2s; }
        .hs-line-item:hover { opacity: .75; }
      `}</style>

      <section
        id="host"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "1px", background: "rgba(0,0,0,.08)" }} />

        <div
          ref={ref}
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "100px 48px 110px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "72px",
            alignItems: "center",
          }}
        >
          {/* ══ LEFT ══ */}
          <div>
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "32px",
                opacity: visible ? 1 : 0,
                animation: visible
                  ? "hs-fade-up .6s cubic-bezier(.16,1,.3,1) both"
                  : "none",
              }}
            >
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#0000FF",
                  flexShrink: 0,
                  animation: "hs-pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#0000FF",
                }}
              >
                For Space Owners
              </span>
            </div>

            {/* Headline */}
            <div style={{ marginBottom: "36px" }}>
              <div style={{ overflow: "hidden" }}>
                <h2
                  style={{
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                    fontSize: "clamp(44px, 5.5vw, 76px)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.95,
                    color: "#0A0A0A",
                    margin: "0 0 4px",
                    opacity: visible ? 1 : 0,
                    animation: visible
                      ? "hs-title-in .85s .1s cubic-bezier(.16,1,.3,1) both"
                      : "none",
                  }}
                >
                  Own a Space?
                </h2>
              </div>
              <div style={{ overflow: "hidden" }}>
                <h2
                  style={{
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                    fontSize: "clamp(44px, 5.5vw, 76px)",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.95,
                    color: "#0000EE",
                    margin: 0,
                    opacity: visible ? 1 : 0,
                    animation: visible
                      ? "hs-title-in .9s .18s cubic-bezier(.16,1,.3,1) both"
                      : "none",
                  }}
                >
                  Start Earning.
                </h2>
              </div>
            </div>

            {/* Punchy lines */}
            <div
              style={{
                marginBottom: "40px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {lines.map((l, i) => (
                <div
                  key={i}
                  className="hs-line-item"
                  style={{
                    padding: "14px 0",
                    borderBottom:
                      i < lines.length - 1
                        ? "1px solid rgba(0,0,0,.06)"
                        : "none",
                    opacity: visible ? 1 : 0,
                    animation: visible
                      ? `hs-fade-up .65s ${0.3 + i * 0.1}s cubic-bezier(.16,1,.3,1) both`
                      : "none",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 300,
                      color: "rgba(0,0,0,.38)",
                    }}
                  >
                    {l.text}{" "}
                    <em
                      style={{
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "#0000EE",
                      }}
                    >
                      {l.highlight}
                    </em>
                  </p>
                </div>
              ))}
            </div>

            {/* Unlock line */}
            <p
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "clamp(18px, 2vw, 24px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0A0A0A",
                margin: "0 0 36px",
                lineHeight: 1.25,
                opacity: visible ? 1 : 0,
                animation: visible
                  ? "hs-fade-up .7s .72s cubic-bezier(.16,1,.3,1) both"
                  : "none",
              }}
            >
              Give your space by the hour.
              <br />
              Unlock endless possibilities to earn.
            </p>

            {/* CTA */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                animation: visible
                  ? "hs-fade-up .65s .82s cubic-bezier(.16,1,.3,1) both"
                  : "none",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="hs-cta"
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSd-f3OruVj0m_PUsYoBIyRNYtmvUGnjMYX45Bk4S9tJ0qt0cA/viewform?usp=dialog",
                    "_blank",
                  )
                }
                style={{
                  background: "#0000FF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "16px 34px",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: ".01em",
                  boxShadow: "0 8px 28px rgba(0,0,255,.22)",
                }}
              >
                List Your Space →
              </button>
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(0,0,0,.3)",
                  fontWeight: 400,
                  letterSpacing: ".01em",
                }}
              >
                Free to list · Zero commission on first event
              </span>
            </div>
          </div>

          {/* ══ RIGHT — Photo ══ */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              animation: visible
                ? "hs-img-in 1s .2s cubic-bezier(.16,1,.3,1) both"
                : "none",
              position: "relative",
            }}
          >
            {/* Photo frame */}
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
                aspectRatio: "4/5",
                boxShadow:
                  "0 24px 72px rgba(0,0,0,.18), 0 4px 16px rgba(0,0,0,.1)",
              }}
            >
              {/* Image — no fallback div, just the real photo */}
              <img
                src="/uploads/listers/ownaspace.jpg"
                alt="Own a space on Umero"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />

              {/* Bottom gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "60%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,.8), transparent)",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />

              {/* Founding Host badge — top right */}
              <div
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  zIndex: 2,
                  background: "#0000FF",
                  borderRadius: "100px",
                  padding: "6px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#fff",
                    animation: "hs-pulse 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Founding Host
                </span>
              </div>

              {/* Earning badge — bottom left */}
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "24px",
                  zIndex: 2,
                  background: "rgba(255,255,255,.12)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,.18)",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,.55)",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Earning potential
                </span>
                <span
                  style={{
                    fontSize: "22px",
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                    fontWeight: 900,
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  ₹899 / hr
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,.4)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  avg. listing starts from
                </span>
              </div>
            </div>

            {/* Floating 0% card */}
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,.08)",
                borderRadius: "16px",
                padding: "16px 20px",
                boxShadow: "0 8px 32px rgba(0,0,0,.1)",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                minWidth: "140px",
                zIndex: 3,
              }}
            >
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,.3)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Commission
              </span>
              <span
                style={{
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                  fontSize: "28px",
                  fontWeight: 900,
                  color: "#0000EE",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                0%
              </span>
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(0,0,0,.35)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                }}
              >
                on your first event
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(0,0,0,.07)",
            margin: "0 48px",
          }}
        />
      </section>
    </>
  );
}
