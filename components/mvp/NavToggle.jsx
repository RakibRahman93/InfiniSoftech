"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function NavToggle({ onPaymentClick }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
      {open && mounted && createPortal(
        <div className="mvp-mobile-menu" onClick={() => setOpen(false)}>
          <div className="mvp-mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
            <div className="mvp-mobile-menu-header">
              <a href="/" className="mvp-logo">
                <img src="/assets/images/mvp/logo-mvp.png" alt="InfiniSoft Technology" width={140} height={32} />
              </a>
              <button
                type="button"
                className="mvp-mobile-close"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <a href="#learn" onClick={() => setOpen(false)}>What You&apos;ll Learn</a>
            <a href="#inside" onClick={() => setOpen(false)}>Inside the Guide</a>
            <a href="#audience" onClick={() => setOpen(false)}>Who It&apos;s For</a>
            <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
            <a href="#offer" className="mvp-mobile-cta" onClick={handlePayment}>Get Instant Access</a>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
