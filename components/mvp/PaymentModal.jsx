"use client";

import { useState, useEffect, useRef } from "react";
import { X, Copy, Check, ArrowRight } from "lucide-react";

const BKASH_NUMBER = "01858333238";
const WHATSAPP_NUMBER = "01858333238";

export default function PaymentModal({ open, onClose }) {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", txid: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(BKASH_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = BKASH_NUMBER;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.txid.trim()) e.txid = "Transaction ID is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const sendToWhatsApp = () => {
    const now = new Date().toLocaleString("en-BD", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
    const msg = `NEW MVP PLAYBOOK PAYMENT

Product:
The MVP Playbook

Amount:
৳29

Payment Method:
bKash Personal

bKash Number:
${BKASH_NUMBER}

Transaction ID:
${form.txid.trim()}

CUSTOMER DETAILS

Name:
${form.name.trim()}

Email:
${form.email.trim()}

Phone:
${form.phone.trim()}

Submitted:
${now}

Please verify the bKash transaction and provide access after confirmation.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const resetAndClose = () => {
    setForm({ name: "", email: "", phone: "", txid: "" });
    setErrors({});
    setSubmitted(false);
    setSubmitting(false);
    setCopied(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="pm-overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) resetAndClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Payment modal"
    >
      <div className="pm-modal">
        <button className="pm-close" onClick={resetAndClose} aria-label="Close">
          <X />
        </button>

        {submitted ? (
          <div className="pm-confirm">
            <div className="pm-confirm-icon"><Check /></div>
            <h3>Payment Confirmation Submitted</h3>
            <p>Your payment details are ready. Please send the WhatsApp message to complete your request.</p>
            <button className="pm-btn pm-btn-whatsapp" onClick={sendToWhatsApp}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Send to WhatsApp
            </button>
            <button className="pm-btn pm-btn-edit" onClick={() => setSubmitted(false)}>
              Edit Details
            </button>
          </div>
        ) : (
          <>
            <div className="pm-header">
              <span className="pm-eyebrow">Get Instant Access</span>
              <h3>The MVP Playbook</h3>
              <div className="pm-price">৳29</div>
            </div>

            <div className="pm-bkash-section">
              <div className="pm-bkash-label">Pay with bKash</div>
              <div className="pm-bkash-type">bKash Personal</div>
              <div className="pm-bkash-number">
                <span>{BKASH_NUMBER}</span>
                <button className="pm-copy-btn" onClick={copyNumber} type="button">
                  {copied ? <><Check /> Number copied!</> : <><Copy /> Copy Number</>}
                </button>
              </div>
              <p className="pm-instruction">Send ৳29 to this bKash Personal number. After completing payment, enter your information below.</p>
            </div>

            <div className="pm-form">
              <div className="pm-field">
                <label htmlFor="pm-name">Full Name</label>
                <input
                  ref={firstInputRef}
                  id="pm-name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange("name")}
                  className={errors.name ? "pm-error" : ""}
                />
                {errors.name && <span className="pm-err">{errors.name}</span>}
              </div>
              <div className="pm-field">
                <label htmlFor="pm-email">Email Address</label>
                <input
                  id="pm-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  className={errors.email ? "pm-error" : ""}
                />
                {errors.email && <span className="pm-err">{errors.email}</span>}
              </div>
              <div className="pm-field">
                <label htmlFor="pm-phone">Phone Number</label>
                <input
                  id="pm-phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  className={errors.phone ? "pm-error" : ""}
                />
                {errors.phone && <span className="pm-err">{errors.phone}</span>}
              </div>
              <div className="pm-field">
                <label htmlFor="pm-txid">bKash Transaction ID</label>
                <input
                  id="pm-txid"
                  type="text"
                  placeholder="Enter your transaction ID"
                  value={form.txid}
                  onChange={handleChange("txid")}
                  className={errors.txid ? "pm-error" : ""}
                />
                {errors.txid && <span className="pm-err">{errors.txid}</span>}
              </div>
              <button
                className="pm-btn pm-btn-submit"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Processing..." : <>I Have Paid — Send Details <ArrowRight /></>}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
