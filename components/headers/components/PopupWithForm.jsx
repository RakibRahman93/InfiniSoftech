"use client";

import { useState } from "react";
import Popup from "@/components/headers/components/popup";
import Form from "@/components/headers/components/Form";

export default function PopupWithForm({ triggerLabel }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <>
      {/* Trigger Button */}
      <a
        onClick={togglePopup}
        className="btn btn-mod btn-color btn-large btn-round btn-hover-anim me-1 mb-xs-10"
      >
        <span>{triggerLabel}</span>
      </a>

      {/* Popup Component */}
      <Popup isPopupVisible={isPopupVisible} onClose={togglePopup}>
        <Form togglePopup={togglePopup} />
      </Popup>
    </>
  );
}
