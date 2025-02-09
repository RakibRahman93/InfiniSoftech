"use client";

import { toggleMobileMenu } from "@/utlis/toggleMobileMenu";
import Image from "next/image";
import { useState } from "react"; // Import useState
import Form from "./components/Form";
import Nav from "./components/Nav";
import Popup from "./components/popup";
// Import the CSS file for transitions

export default function Header6({ links }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="main-nav-sub container relative">
      {/* Logo */}
      <div className="nav-logo-wrap position-static local-scroll">
        <a href="#top" className="logo">
          <Image
            src="/assets/images/InfiniSoftLogoblack.png"
            alt="Your Company Logo"
            width={80}
            height={100}
            className="light-mode-logo"
          />
          <Image
            src="/assets/images/logo.svg"
            alt="Your Company Logo"
            width={154}
            height={35}
            className="light-mode-logo"
          />
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div
        onClick={toggleMobileMenu}
        className="mobile-nav"
        role="button"
        tabIndex={0}
      >
        <i className="mobile-nav-icon" />
        <span className="visually-hidden">Menu</span>
      </div>

      {/* Main Menu */}
      <div className="inner-nav desktop-nav">
        <ul className="clearlist scroll-nav local-scroll justify-content-end scrollspyLinks">
          <Nav links={links} />
          {/* Book A Free Call Button */}
          
        </ul>
      </div>

      {/* Right button */}
      <div style={{alignContent:"center"}}  className="inner-nav desktop-nav">
        <ul className="clearlist scroll-nav local-scroll justify-content-end scrollspyLinks">
          {/* Book A Free Call Button */}
          <button
           style={{
             borderRadius: "50px",
             height: "2.7rem",
             minWidth: "12rem",
             background: "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
             border: "none",
             color: "white", // Ensures text remains visible
             fontSize: "14px",
             fontWeight: "bold",
             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
             cursor: "pointer",
             // transition: "all 0.3s ease-in-out",       
           }}
            onClick={togglePopup}
            className="btn btn-mod btn-color btn-secondary me-1 mb-xs-10"
          >
          HIRE US
        </button>
        </ul>
      </div>
    
      {/* Popup */}
      <Popup isPopupVisible={isPopupVisible} onClose={togglePopup}>
        <Form togglePopup={togglePopup} />
      </Popup>
    </div>
  );
}
