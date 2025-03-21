"use client";
import { useState } from "react";
import Form from "../components/Form";
import Popup from "./popup";

export function PopupWrapper({ buttonText = "Free Consultation",minWidth="12rem" }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentButtonText, setCurrentButtonText] = useState(buttonText);
  

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  return (
    <>
      <ul className="clearlist scroll-nav local-scroll justify-content-end scrollspyLinks">
        {/* Book A Free Call Button */}
        <button
          style={{
            borderRadius: "50px",
            height: "2.7rem",
            minWidth: minWidth,
            background: "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
            border: "none",
            color: "white", // Ensures text remains visible
            fontSize: "12px",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            cursor: "pointer",
            // transition: "all 0.3s ease-in-out",
          }}
          onClick={togglePopup}
          className="btn btn-mod btn-color btn-secondary me-1 mb-xs-10"
        >
          <span className="btn-animate-y">
            <span className="btn-animate-y-1">
              {/* <i
                className="icon-play size-13 me-1"
                aria-hidden="true"
              ></i>{" "} */}
              {currentButtonText}
            </span>
            <span className="btn-animate-y-2" aria-hidden="true">
              {/* <i
                className="icon-play size-13 me-1"
                aria-hidden="true"
              ></i>{" "} */}
              {currentButtonText}
            </span>
          </span>
        </button>
      </ul>
      {/* Popup Component */}
      <Popup isPopupVisible={isPopupVisible} onClose={togglePopup}>
        <Form />
      </Popup>
    </>
  );
}
