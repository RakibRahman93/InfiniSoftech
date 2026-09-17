"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ---------- ScrollReveal (main wrapper) ---------- */
export default function ScrollReveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
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
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
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
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hero Heading (resilient pure CSS entrance) ---------- */
export function HeroHeading({ line1, line2, className = "" }) {
  return (
    <h1 className={className}>
      <span className="mvp-hero-line mvp-hero-line-1">{line1}</span>
      <span className="mvp-hero-line mvp-hero-line-2">{line2}</span>
    </h1>
  );
}

/* ---------- FadeUp ---------- */
export function FadeUp({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
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
      initial={{ opacity: 0, x: from === "left" ? -36 : 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
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
