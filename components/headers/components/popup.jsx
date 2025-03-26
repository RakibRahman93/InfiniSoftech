"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../Popup.css";

const Popup = ({ children, isPopupVisible, onClose, plan }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted state to true after component mounts
  }, []);

  if (!isMounted || typeof document === "undefined") {
    return null; // Don't render on the server
  }

  return ReactDOM.createPortal(
    <div
      className={`popup-overlay ${
        isPopupVisible ? "popup-show" : "popup-hide"
      }`}
      onClick={onClose}
    >
      <div
        className="popup-container"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button onClick={onClose} className="popup-close-btn">
          ✕
        </button>

        {/* Popup Content */}
        <div className="popup-content">{React.cloneElement(children, { plan })}</div>
      </div>
    </div>,
    document.body // Render directly into the body
  );
};

export default Popup;
