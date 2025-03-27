"use client";
import { useState } from "react";
import Form from "../components/Form";
import Popup from "./popup";

export function PopupWrapper({
  buttonText = "Free Consultation",
  plan,
  className = "",
  minWidth = "",
  height = "",
  isFullWidth = false, // New prop to control full-width
}) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentButtonText, setCurrentButtonText] = useState(buttonText);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <ul
        className={`clearlist scroll-nav local-scroll justify-content-end scrollspyLinks ${className}`}
      >
        {/* Button with conditional full-width */}
        <button
          onClick={togglePopup}
          className={`btn-lg fw-semibold text-white shadow-sm 
            ${isFullWidth ? "w-100" : "w-md-auto"}`}
          style={{
            borderRadius: "50px",
            background: "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
            border: "none",
            minWidth: isFullWidth ? "100%" : "14rem",
            padding: "12px 26px",
            fontWeight: "600",
          }}
        >
          <span className="btn-animate-y">
            <span className="btn-animate-y-1">{currentButtonText}</span>
            <span className="btn-animate-y-2" aria-hidden="true">
              {currentButtonText}
            </span>
          </span>
        </button>
      </ul>

      {/* Popup Component */}
      <Popup isPopupVisible={isPopupVisible} onClose={togglePopup} plan={plan}>
        <Form />
      </Popup>
    </>
  );
}
