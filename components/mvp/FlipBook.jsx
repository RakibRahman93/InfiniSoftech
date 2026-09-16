"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from "lucide-react";

const pages = [
  {
    num: "01",
    left: {
      title: "Define the Problem",
      desc: "Turn your idea into a clear, testable problem statement that matters to real customers.",
      icon: "🎯",
    },
    right: {
      title: "Problem Statement Canvas",
      fields: ["Problem:", "Who affected?", "Current solution?", "Why it fails?"],
      quote: "A problem well defined is half solved.",
    },
  },
  {
    num: "02",
    left: {
      title: "Identify Your Core Customers",
      desc: "The right product starts with the right customer. Focus on a specific segment, understand their real problems, and validate before you build.",
      icon: "👥",
    },
    right: {
      title: "Customer Persona Canvas",
      fields: ["Name / Role", "Goals", "Pain Points", "How can we help?", "Validation method"],
      quote: "Real products solve real problems.",
    },
  },
  {
    num: "03",
    left: {
      title: "Craft Your Value Proposition",
      desc: "Communicate real value, not just features. Show customers why your solution matters.",
      icon: "💎",
    },
    right: {
      title: "Value Proposition Canvas",
      fields: ["Customer job:", "Pain:", "Gain:", "Our solution:", "Why us?"],
      quote: "Value is perceived, not given.",
    },
  },
  {
    num: "04",
    left: {
      title: "Decide Core Features",
      desc: "Focus only on what matters for validation. Cut everything else.",
      icon: "📦",
    },
    right: {
      title: "Feature Prioritization Matrix",
      fields: ["Must have:", "Nice to have:", "Later:", "Cut:", "Impact vs Effort"],
      quote: "Less is more when building an MVP.",
    },
  },
  {
    num: "05",
    left: {
      title: "Build & Release",
      desc: "Get to market quickly with a lean MVP. Ship fast, learn faster.",
      icon: "🚀",
    },
    right: {
      title: "12-Day Build Plan",
      fields: ["Day 1-3:", "Day 4-6:", "Day 7-9:", "Day 10-12:", "Launch checklist"],
      quote: "Done is better than perfect.",
    },
  },
  {
    num: "06",
    left: {
      title: "Measure & Iterate",
      desc: "Use real feedback to improve and grow. Let data guide your next steps.",
      icon: "📊",
    },
    right: {
      title: "MVP-to-Feedback Framework",
      fields: ["Metric:", "Target:", "Actual:", "Learn:", "Next action:"],
      quote: "What gets measured gets improved.",
    },
  },
];

export default function FlipBook() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const autoPlayRef = useRef(null);
  const total = pages.length;
  const current = pages[page];

  const go = (dir) => {
    setDirection(dir);
    setPage((p) => {
      const next = p + dir;
      if (next < 0) return total - 1;
      if (next >= total) return 0;
      return next;
    });
  };

  const goTo = (i) => {
    setDirection(i > page ? 1 : -1);
    setPage(i);
  };

  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setPage((p) => (p + 1) % total);
      }, 3000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, total]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isFullscreen]);

  const toggleAutoPlay = () => setIsAutoPlay((a) => !a);

  const BookContent = () => (
    <>
      <div className="mvp-flipbook-book">
        <div className="mvp-flipbook-page mvp-flipbook-left" key={`l-${page}`}>
          <div className="mvp-flipbook-page-inner">
            <span className="mvp-flipbook-num">{current.num}</span>
            <h3 className="mvp-flipbook-page-title">{current.left.title}</h3>
            <p className="mvp-flipbook-page-desc">{current.left.desc}</p>
            <div className="mvp-flipbook-page-icon">{current.left.icon}</div>
          </div>
        </div>
        <div className="mvp-flipbook-spine" />
        <div className="mvp-flipbook-page mvp-flipbook-right" key={`r-${page}`}>
          <div className="mvp-flipbook-page-inner">
            <h4 className="mvp-flipbook-canvas-title">{current.right.title}</h4>
            <div className="mvp-flipbook-fields">
              {current.right.fields.map((f, i) => (
                <div key={i} className="mvp-flipbook-field">
                  <span>{f}</span>
                  <div className="mvp-flipbook-field-line" />
                </div>
              ))}
            </div>
            <em className="mvp-flipbook-quote">&ldquo;{current.right.quote}&rdquo;</em>
          </div>
        </div>
        <button className="mvp-flipbook-prev" onClick={() => go(-1)} aria-label="Previous page">
          <ChevronLeft />
        </button>
        <button className="mvp-flipbook-next" onClick={() => go(1)} aria-label="Next page">
          <ChevronRight />
        </button>
      </div>
      <div className="mvp-flipbook-bottom">
        <div className="mvp-flipbook-dots">
          {pages.map((_, i) => (
            <button
              key={i}
              className={`mvp-flipbook-dot ${i === page ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
        <span className="mvp-flipbook-counter">
          {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="mvp-flipbook-actions">
          <button
            className={`mvp-flipbook-autoplay ${isAutoPlay ? "active" : ""}`}
            onClick={toggleAutoPlay}
            aria-label="Auto play"
          >
            {isAutoPlay ? "⏸" : "▶"}
          </button>
          <button className="mvp-flipbook-fullscreen" onClick={() => setIsFullscreen(true)} aria-label="Fullscreen">
            <Maximize2 />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="mvp-flipbook">
        <BookContent />
      </div>

      {isFullscreen && (
        <div className="mvp-flipbook-modal" onClick={() => setIsFullscreen(false)}>
          <div className="mvp-flipbook-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="mvp-flipbook-modal-close" onClick={() => setIsFullscreen(false)} aria-label="Close">
              <X />
            </button>
            <BookContent />
          </div>
        </div>
      )}
    </>
  );
}
