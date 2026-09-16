"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ---------- ScrollReveal (main wrapper) ---------- */
export default function ScrollReveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Stagger Container ---------- */
export function StaggerContainer({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Stagger Item ---------- */
export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hero Heading (CSS-based, always visible) ---------- */
export function HeroHeading({ line1, line2, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <h1 ref={ref} className={className}>
      <span className="mvp-hero-line mvp-hero-line-1" style={{
        display: "block",
        transform: mounted && inView ? "translateY(0)" : "translateY(105%)",
        opacity: mounted && inView ? 1 : 0,
        transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
        transitionDelay: "0.2s",
      }}>
        {line1}
      </span>
      <span className="mvp-hero-line mvp-hero-line-2" style={{
        display: "block",
        transform: mounted && inView ? "translateY(0)" : "translateY(105%)",
        opacity: mounted && inView ? 1 : 0,
        transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
        transitionDelay: "0.4s",
      }}>
        {line2}
      </span>
    </h1>
  );
}

/* ---------- FadeUp ---------- */
export function FadeUp({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- SlideReveal ---------- */
export function SlideReveal({ children, className = "", from = "left", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: from === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- ScaleReveal ---------- */
export function ScaleReveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- GlowPulse (for CTAs) ---------- */
export function GlowPulse({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      whileInView={{
        boxShadow: [
          "0 0 0 0 rgba(255,138,34,0)",
          "0 0 24px 6px rgba(255,138,34,0.3)",
          "0 0 0 0 rgba(255,138,34,0)",
        ],
      }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
