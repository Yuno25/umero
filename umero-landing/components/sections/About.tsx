"use client";

import { useEffect, useRef, useState } from "react";

const cards = [
  {
    id: "01",
    tag: "What We Do",
    title: "A Platform Built for Creation",
    desc: "Whether it's a product shoot, brand event, team meeting, or creative session — Umero connects you to the perfect space. Studios, rooftops, cafés, warehouses, turfs and more.",
    highlights: ["Photography Studios", "Brand Events", "Team Meetings", "Creative Shoots"],
    dark: false,
  },
  {
    id: "02",
    tag: "The Problem We Solve",
    title: "No More Unanswered DMs",
    desc: "Tired of DMing studios on Instagram and getting no reply? Messaging café owners and waiting days? We built Umero so you never have to do that again.",
    highlights: ["No more cold DMs", "No unanswered calls", "No back and forth", "Instant confirmation"],
    dark: true,
  },
  {
    id: "03",
    tag: "For Hosts Too",
    title: "List Any Space. Earn Effortlessly.",
    desc: "Still managing bookings over WhatsApp? Umero gives every host a smart listing page, booking management, and real visibility — without the old way hassle.",
    highlights: ["Smart listing page", "Booking dashboard", "Zero commission early", "Real visibility"],
    dark: false,
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function About() {
  const { ref: sRef, visible: sVis } = useInView(0.05);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes um-fade-up {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes um-title-in {
          from { opacity:0; transform:translateY(60px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .um-card {
          transition: transform .4s cubic-bezier(.16,1,.3,1),
                      box-shadow .4s cubic-bezier(.16,1,.3,1);
        }
        .um-card:hover { transform: translateY(-7px) !important; }
        .um-card-light:hover {
          box-shadow: 0 24px 56px rgba(0,0,0,.14) !important;
        }
        .um-card-dark:hover {
          box-shadow: 0 24px 56px rgba(0,0,0,.55) !important;
        }
        .um-tag {
          transition: background .25s, color .25s, border-color .25s;
        }
        .um-card-light:hover .um-tag {
          background: #0000FF !important;
          color: #fff !important;
          border-color: #0000FF !important;
        }
        .um-card-dark:hover .um-tag {
          background: #fff !important;
          color: #0000FF !important;
          border-color: #fff !important;
        }
      `}</style>

      <section
        id="about"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >

        {/* ══ SOLID MASSIVE TEXT — exactly like Peerspace ══ */}
        <div style={{
          padding: "72px 0 0",
          position: "relative",
          zIndex: 0,
        }}>
          {/* WHY — black, indented left */}
          <div style={{ overflow: "hidden" }}>
            <h2
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "clamp(80px, 14vw, 200px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                margin: 0,
                color: "#0A0A0A",
                paddingLeft: "48px",
                opacity: sVis ? 1 : 0,
                animation: sVis
                  ? "um-title-in .85s cubic-bezier(.16,1,.3,1) both"
                  : "none",
              }}
            >
              Why
            </h2>
          </div>

          {/* UMERO — blue, massive, bleeds right edge */}
          <div style={{ overflow: "hidden", position: "relative" }}>
            <h2
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "clamp(80px, 20vw, 280px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.88,
                margin: 0,
                color: "#0000EE",
                whiteSpace: "nowrap",
                opacity: sVis ? 1 : 0,
                animation: sVis
                  ? "um-title-in .95s .08s cubic-bezier(.16,1,.3,1) both"
                  : "none",
              }}
            >
              Umero
            </h2>
          </div>
        </div>

        {/* ══ CARDS — overlap the text from below, like Peerspace image overlaps text ══ */}
        <div
          ref={sRef}
          style={{
            position: "relative",
            zIndex: 1,
            /* Negative margin pulls cards UP to overlap the text */
            marginTop: "-60px",
            padding: "0 48px 100px",
            background: "linear-gradient(to bottom, transparent 0%, #F7F7F7 120px)",
          }}
        >
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            /* Cards start at the overlap point */
            paddingTop: "0",
          }}>
            {cards.map((c, i) => (
              <Card key={c.id} card={c} index={i} visible={sVis} />
            ))}
          </div>
        </div>

      </section>
    </>
  );
}

function Card({
  card, index, visible,
}: {
  card: typeof cards[0];
  index: number;
  visible: boolean;
}) {
  const { dark } = card;

  return (
    <div
      className={`um-card ${dark ? "um-card-dark" : "um-card-light"}`}
      style={{
        background: dark ? "#0A0A0A" : "#FFFFFF",
        borderRadius: "20px",
        overflow: "hidden",
        border: dark
          ? "1px solid rgba(255,255,255,.08)"
          : "1px solid rgba(0,0,0,.08)",
        boxShadow: dark
          ? "0 8px 32px rgba(0,0,0,.35)"
          : "0 4px 24px rgba(0,0,0,.09)",
        opacity: visible ? 1 : 0,
        animation: visible
          ? `um-fade-up .65s ${index * .14}s cubic-bezier(.16,1,.3,1) both`
          : "none",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Blue top bar */}
      <div style={{
        height: "3px",
        background: "linear-gradient(90deg, #0000FF, rgba(0,0,255,.2))",
        flexShrink: 0,
      }} />

      <div style={{
        padding: "28px 28px 32px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>

        {/* Tag */}
        <div style={{ marginBottom: "18px" }}>
          <span
            className="um-tag"
            style={{
              display: "inline-block",
              padding: "5px 14px",
              borderRadius: "100px",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              background: dark ? "rgba(0,0,255,.12)" : "rgba(0,0,255,.06)",
              color: dark ? "rgba(120,140,255,.9)" : "#0000FF",
              border: dark
                ? "1px solid rgba(0,0,255,.18)"
                : "1px solid rgba(0,0,255,.1)",
            }}
          >
            {card.tag}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontSize: "clamp(19px, 1.8vw, 23px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          color: dark ? "#FFFFFF" : "#0A0A0A",
          margin: "0 0 14px",
        }}>
          {card.title}
        </h3>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: dark
            ? "rgba(255,255,255,.07)"
            : "rgba(0,0,0,.07)",
          marginBottom: "14px",
        }} />

        {/* Desc */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          lineHeight: 1.82,
          color: dark ? "rgba(255,255,255,.48)" : "rgba(0,0,0,.44)",
          margin: "0 0 22px",
          fontWeight: 400,
          flex: 1,
        }}>
          {card.desc}
        </p>

        {/* Chips */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "22px",
        }}>
          {card.highlights.map((h, i) => (
            <span key={i} style={{
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "10px",
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              background: dark
                ? "rgba(255,255,255,.05)"
                : "rgba(0,0,0,.04)",
              color: dark
                ? "rgba(255,255,255,.4)"
                : "rgba(0,0,0,.38)",
              border: dark
                ? "1px solid rgba(255,255,255,.07)"
                : "1px solid rgba(0,0,0,.06)",
            }}>
              {h}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "16px",
          borderTop: dark
            ? "1px solid rgba(255,255,255,.06)"
            : "1px solid rgba(0,0,0,.06)",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: "#0000FF",
            letterSpacing: ".02em",
          }}>
            Learn more →
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "9px",
            color: dark
              ? "rgba(255,255,255,.18)"
              : "rgba(0,0,0,.18)",
            letterSpacing: ".08em",
          }}>
            {card.id}
          </span>
        </div>

      </div>
    </div>
  );
}
