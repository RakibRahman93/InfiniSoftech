"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomamSliderControls() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    const track = document.querySelector(".homam-showcase-slider-track");
    if (!track) return undefined;

    const updatePosition = () => {
      const width = track.clientWidth || 1;
      setActiveIndex(Math.round(track.scrollLeft / width));
      setSlideCount(track.children.length);
    };

    updatePosition();
    track.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      track.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  const move = (direction) => {
    const track = document.querySelector(".homam-showcase-slider-track");
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="homam-showcase-arrow-controls" aria-label="Project screen controls">
      <button type="button" onClick={() => move(-1)} disabled={activeIndex === 0} aria-label="Previous screen">
        <ArrowLeft aria-hidden="true" />
      </button>
      <span>{String(activeIndex + 1).padStart(2, "0")} / {String(slideCount || 8).padStart(2, "0")}</span>
      <button type="button" onClick={() => move(1)} disabled={activeIndex >= slideCount - 1} aria-label="Next screen">
        <ArrowRight aria-hidden="true" />
      </button>
    </div>
  );
}
