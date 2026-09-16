"use client";

import { useState } from "react";

export default function NavToggle({ onPaymentClick }) {
  const [open, setOpen] = useState(false);

  const handlePayment = (e) => {
    setOpen(false);
    if (onPaymentClick) onPaymentClick(e);
  };

  return (
    <>
      <button
        className="mvp-menu"
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>
      {open && (
        <div className="mvp-mobile-menu" onClick={() => setOpen(false)}>
          <div className="mvp-mobile-menu-inner">
            <a href="#learn">What You&apos;ll Learn</a>
            <a href="#inside">Inside the Guide</a>
            <a href="#audience">Who It&apos;s For</a>
            <a href="#faq">FAQ</a>
            <a href="#offer" className="mvp-mobile-cta" onClick={handlePayment}>Get Instant Access</a>
          </div>
        </div>
      )}
    </>
  );
}
