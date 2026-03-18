"use client";
import { useState } from "react";
import Form from "../components/Form";
import Popup from "./popup";

export function PopupWrapper({
  buttonText = "Book A Free Call",
  plan,
  className = "",
  minWidth = "",
  height = "",
  padding = "",
  isFullWidth = false, // New prop to control full-width
}) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentButtonText, setCurrentButtonText] = useState(buttonText);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false); // Close the popup on form success
  };

  return (
    <>
      <div className={className}>
        <button
          type="button"
          onClick={togglePopup}
          className={`btn-lg fw-semibold text-white shadow-sm 
            ${isFullWidth ? "w-100" : "w-md-auto"}`}
          style={{
            borderRadius: "50px",
            background: "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
            border: "none",
            minWidth: isFullWidth ? "100%" : "14rem",
            padding: "12px 26px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
            height: height,
            padding: padding,
          }}
        >
          {currentButtonText}
        </button>
      </div>

      {/* Popup Component */}
      <Popup
        isPopupVisible={isPopupVisible}
        onClose={handlePopupClose}
        plan={plan}
      >
        <Form onSuccess={handlePopupClose} />
      </Popup>
    </>
  );
}
