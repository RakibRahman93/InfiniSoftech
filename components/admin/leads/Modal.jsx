"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export default function Modal({ open, onClose, title, icon: Icon, size = "md", children }) {
  const scrollEl = useRef(null);

  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 cursor-pointer bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative z-10 flex max-h-[90vh] w-full flex-col rounded-2xl border border-ink/10 bg-background shadow-2xl ${sizeClasses[size]}`}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-ink/10 px-6 py-3">
            <div className="flex items-center gap-3">
              {Icon && (
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-green/10 text-green">
                  <Icon className="h-4 w-4" />
                </span>
              )}
              <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-sand/60 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div ref={scrollEl} className="overflow-y-auto px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}