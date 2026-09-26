"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const videoSource = process.env.NEXT_PUBLIC_HERO_VIDEO_URL ||
  "https://res.cloudinary.com/dguuo3159/video/upload/v1790431519/infinisoft/hero-videomain-1790431497.mp4";

export default function HeroVideoModal({ onClose }) {
  const dialogRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const dialog = dialogRef.current;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="hero-video-modal"
      aria-labelledby="hero-video-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="hero-video-panel">
        <header>
          <div>
            <span>INFINISOFT TECHNOLOGY</span>
            <h2 id="hero-video-title">Design that sells. Development that scales.</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close video">×</button>
        </header>
        <video controls autoPlay playsInline preload="metadata" onError={() => setFailed(true)}>
          <source src={videoSource} type="video/mp4" />
          Your browser does not support embedded video. <a href={videoSource}>Watch the video</a>.
        </video>
        {failed && <p role="alert">The video couldn’t load. <a href={videoSource} target="_blank" rel="noreferrer">Open the video directly</a> or try again.</p>}
      </div>
      <style jsx>{`
        .hero-video-modal {
          position: fixed;
          inset: 0;
          width: min(1040px, calc(100% - 32px));
          max-width: none;
          max-height: calc(100dvh - 32px);
          margin: auto;
          padding: 0;
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 22px;
          background: #141020;
          color: #fff;
          box-shadow: 0 30px 100px rgba(0,0,0,.5);
          overflow: auto;
        }
        .hero-video-modal::backdrop {
          background: rgba(13,9,25,.8);
          backdrop-filter: blur(10px);
        }
        header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 22px 24px; }
        header span { color: #c5b6ef; font-size: 10px; font-weight: 700; letter-spacing: .16em; }
        header h2 { margin: 6px 0 0; color: #fff; font-size: 18px; line-height: 1.4; letter-spacing: normal; }
        header button { flex: 0 0 44px; height: 44px; padding: 0; border: 1px solid #665777; border-radius: 50%; background: #2a203b; color: #fff; font-size: 28px; cursor: pointer; }
        header button:hover { background: #49345f; }
        header button:focus-visible { outline: 3px solid #b8a6ff; outline-offset: 3px; }
        video { display: block; width: 100%; max-height: calc(100dvh - 160px); background: #000; }
        p { padding: 16px 24px; margin: 0; color: #fff; font-size: 14px; }
        p a { color: #cfbcff; text-decoration: underline; }
        @media (max-width: 575px) {
          .hero-video-modal { width: calc(100% - 20px); border-radius: 16px; }
          header { padding: 16px; gap: 12px; }
          header h2 { font-size: 14px; }
          header span { font-size: 9px; }
        }
      `}</style>
    </dialog>,
    document.body
  );
}
