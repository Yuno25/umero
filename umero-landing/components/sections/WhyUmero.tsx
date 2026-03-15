"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
      image: "/logo/haaha1.jpg",
    tag: "For Everyone",
    title: "Spaces that\nfeel like you.",
    body: "Handpicked rooftops, studios, farmhouses and creative offices across India — chosen for their character, not just their square footage. Every space on Umero is unique. None of them feel like a conference room.",
    stat: "6+ spaces · Delhi",
  },
  {
     image: "/logo/hahah2.jpg",
    tag: "For Renters",
    title: "Book in\nunder 2 minutes.",
    body: "Real photos. Verified reviews. Transparent pricing. Pick your slot, pay securely, get the address. No calls. No back-and-forth. Ever.",
    stat: "From ₹899/hr",
  },
  {
 image: "/logo/ahaha3.jpg",
    tag: "For Hosts",
    title: "Your space,\nyour rules.",
    body: "Set your own price. Approve every booking. Block dates whenever you want. List for free — commission only when you actually earn. First bookings at 0%.",
    stat: "₹0 to list · Always",
  },
];

export default function WhyUmero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const next = () => {
    setDirection(1);
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const slide = slides[current];

  return (
    <section id="why-umero">

      <div aria-hidden="true" className="why-bg-word">UMERO</div>

      <div className="why-row">

        {/* LEFT: Image */}
       <div className="why-image-wrap" style={{ maxWidth: "480px", maxHeight: "560px" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={`img-${current}`}
              src={slide.image}
              alt={slide.title}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            />
          </AnimatePresence>
          <div className="why-tag">{slide.tag}</div>
        </div>

        {/* RIGHT: Text + nav */}
        <div className="why-text">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            >
              <h2 className="why-title">{slide.title}</h2>
              <p className="why-body">{slide.body}</p>
              <div className="why-stat">{slide.stat}</div>
            </motion.div>
          </AnimatePresence>

          <div className="why-nav">
            <button className="why-arrow" onClick={prev} aria-label="Previous">←</button>
            <button className="why-arrow" onClick={next} aria-label="Next">→</button>

            <span className="why-counter">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>

            <div className="why-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`why-dot ${i === current ? "active" : "inactive"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}