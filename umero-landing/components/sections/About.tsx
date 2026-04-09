"use client";

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
      {/* TITLE */}
      <div style={{ padding: "48px 0 0" }}>
        <div style={{ overflow: "hidden" }}>
          <h2
            style={{
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              fontSize: "clamp(48px, 12vw, 140px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              margin: 0,
              color: "#0A0A0A",
              paddingLeft: "16px",
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
              fontSize: "clamp(56px, 14vw, 180px)",
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
          marginTop: "24px",
          padding: "0 16px 80px",
          background:
            "linear-gradient(to bottom, transparent 0%, #F7F7F7 120px)",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          {cards.map((c, i) => (
            <Card key={c.id} card={c} index={i} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes um-title-in {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes um-card-in {
          from { opacity: 0; transform: translateY(48px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes um-card-out {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(48px); }
        }
        .um-card-wrap {
          transition: transform 0.35s cubic-bezier(.16,1,.3,1),
                      box-shadow 0.35s cubic-bezier(.16,1,.3,1);
          will-change: transform;
        }
        .um-card-wrap:hover {
          transform: translateY(-18px) scale(1.025) !important;
        }
        .um-card-wrap.light:hover {
          box-shadow: 0 32px 80px rgba(0,0,0,0.18) !important;
        }
        .um-card-wrap.dark-card:hover {
          box-shadow: 0 32px 80px rgba(0,0,255,0.22) !important;
        }
      `}</style>
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

  /* ---------- colours ---------- */
  const tagBg = dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,255,0.07)";
  const tagColor = dark ? "#93c5fd" : "#1d4ed8";
  const tagBorder = dark ? "rgba(255,255,255,0.15)" : "rgba(29,78,216,0.25)";
  const chipBg = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,255,0.06)";
  const chipColor = dark ? "#cbd5e1" : "#1e40af";
  const chipBorder = dark ? "rgba(255,255,255,0.12)" : "rgba(29,78,216,0.2)";

  return (
    <div
      className={`um-card ${dark ? "um-card-dark" : "um-card-light"} cursor-pointer`}
      style={{
        cursor: "pointer",
        width: "100%",
        background: dark ? "#0A0A0A" : "#FFFFFF",
        borderRadius: "20px",
        border: dark
          ? "1px solid rgba(255,255,255,.08)"
          : "1px solid rgba(0,0,0,.08)",
        boxShadow: dark
          ? "0 8px 32px rgba(0,0,0,.35)"
          : "0 4px 24px rgba(0,0,0,.09)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // ← keeps blue line flush
        animation: visible
          ? `um-card-in .8s cubic-bezier(.16,1,.3,1) ${delayIn}s both`
          : `um-card-out .5s cubic-bezier(.4,0,.2,1) ${delayOut}s both`,
      }}
    >
      {/* BLUE LINE — full width, no gap */}
      <div
        style={{
          height: "4px",
          flexShrink: 0,
          background:
            "linear-gradient(90deg, #1d4ed8 0%, #2563eb 40%, #3b82f6 70%, rgba(59,130,246,0.15) 100%)",
        }}
      />

      <div
        style={{
          padding: "26px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* TAG */}
        <span
          style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: "999px",
            background: tagBg,
            color: tagColor,
            border: `1px solid ${tagBorder}`,
            alignSelf: "flex-start",
          }}
        >
          {card.tag}
        </span>

        {/* TITLE */}
        <h3
          style={{
            marginTop: "12px",
            fontSize: "20px",
            fontWeight: 800,
            lineHeight: 1.25,
            color: dark ? "#ffffff" : "#111827",
          }}
        >
          {card.title}
        </h3>

        {/* DESC */}
        <p
          style={{
            marginTop: "10px",
            fontSize: "15px",
            lineHeight: 1.75,
            color: dark ? "#d1d5db" : "#374151",
            flex: 1,
          }}
        >
          {card.desc}
        </p>

        {/* CHIPS */}
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          {card.highlights.map((h, i) => (
            <span
              key={i}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: "999px",
                background: chipBg,
                color: chipColor,
                border: `1px solid ${chipBorder}`,
                letterSpacing: "0.01em",
              }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
