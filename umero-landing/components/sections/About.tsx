"use client";

import { useEffect, useRef, useState } from "react";
import useInView from "@/hooks/useInView";

const cards = [
  {
    id: "01",
    tag: "What We Do",
    title: "A Platform Built for Creation",
    desc: "Whether it's a product shoot, brand event, team meeting, or creative session — Umero connects you to the perfect space. Studios, rooftops, cafés, warehouses, turfs and more.",
    highlights: [
      "Photography Studios",
      "Brand Events",
      "Team Meetings",
      "Creative Shoots",
    ],
    dark: false,
  },
  {
    id: "02",
    tag: "The Problem We Solve",
    title: "No More Unanswered DMs",
    desc: "Tired of DMing studios on Instagram and getting no reply? Messaging café owners and waiting days? We built Umero so you never have to do that again.",
    highlights: [
      "No more cold DMs",
      "No unanswered calls",
      "No back and forth",
      "Instant confirmation",
    ],
    dark: true,
  },
  {
    id: "03",
    tag: "For Hosts Too",
    title: "List Any Space. Earn Effortlessly.",
    desc: "Still managing bookings over WhatsApp? Umero gives every host a smart listing page, booking management, and real visibility — without the old way hassle.",
    highlights: [
      "Smart listing page",
      "Booking dashboard",
      "Zero commission early",
      "Real visibility",
    ],
    dark: false,
  },
];

export default function About() {
  const { ref, visible } = useInView();

  return (
    <section
      id="about"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* MASSIVE TITLE */}
      <div
        style={{
          padding: "48px 0 0",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <h2
            style={{
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              fontSize: "clamp(48px, 12vw, 140px)", // ✅ fixed
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              margin: 0,
              color: "#0A0A0A",
              paddingLeft: "16px", // ✅ mobile padding
              opacity: visible ? 1 : 0,
              animation: visible
                ? "um-title-in .85s cubic-bezier(.16,1,.3,1) both"
                : "none",
            }}
          >
            Why
          </h2>
        </div>

        <div style={{ overflow: "hidden" }}>
          <h2
            style={{
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              fontSize: "clamp(56px, 14vw, 180px)", // ✅ fixed
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.88,
              margin: 0,
              color: "#0000FF",
              paddingLeft: "16px",
              opacity: visible ? 1 : 0,
              animation: visible
                ? "um-title-in .85s cubic-bezier(.16,1,.3,1) both"
                : "none",
            }}
          >
            Umero
          </h2>
        </div>
      </div>

      {/* CARDS */}
      <div
        ref={ref}
        style={{
          marginTop: "24px", // ✅ removed negative margin
          padding: "0 16px 80px", // ✅ mobile safe padding
          background:
            "linear-gradient(to bottom, transparent 0%, #F7F7F7 120px)",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4" // ✅ FIXED GRID
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {cards.map((c, i) => (
            <Card key={c.id} card={c} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
function Card({
  card,
  index,
  visible,
}: {
  card: (typeof cards)[0];
  index: number;
  visible: boolean;
}) {
  const { dark } = card;

  const delayIn = 0.6 + index * 0.2;
  const delayOut = (2 - index) * 0.15;

  return (
    <div
      style={{
        width: "100%", // ✅ prevents stretch issues
        background: dark ? "#0A0A0A" : "#FFFFFF",
        borderRadius: "20px",
        overflow: "hidden",
        border: dark
          ? "1px solid rgba(255,255,255,.08)"
          : "1px solid rgba(0,0,0,.08)",
        boxShadow: dark
          ? "0 8px 32px rgba(0,0,0,.35)"
          : "0 4px 24px rgba(0,0,0,.09)",
        display: "flex",
        flexDirection: "column",

        animation: visible
          ? `um-card-in .8s cubic-bezier(.16,1,.3,1) ${delayIn}s both`
          : `um-card-out .5s cubic-bezier(.4,0,.2,1) ${delayOut}s both`,
      }}
    >
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg,#0000FF,rgba(0,0,255,.2))",
        }}
      />

      <div style={{ padding: "24px" }}>
        <span className="um-tag">{card.tag}</span>

        <h3
          style={{
            marginTop: "12px",
            fontSize: "20px",
            fontWeight: 800,
            color: dark ? "#fff" : "#0A0A0A",
          }}
        >
          {card.title}
        </h3>

        <p
          style={{
            marginTop: "10px",
            fontSize: "13px",
            lineHeight: 1.6,
            color: dark ? "rgba(255,255,255,.5)" : "rgba(0,0,0,.5)",
          }}
        >
          {card.desc}
        </p>

        <div
          style={{
            marginTop: "14px",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          {card.highlights.map((h, i) => (
            <span key={i} className="chip">
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
