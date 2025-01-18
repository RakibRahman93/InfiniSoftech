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
          <li className="desktop-nav-display">
            <div className="vr mt-2" />
          </li>

          {/* Book A Free Call Button */}
          <button
            onClick={togglePopup}
            className="btn btn-mod btn-color btn-secondary btn-round btn-hover-anim me-1 mb-xs-10"
          >
            <span>Book A Free Call</span>
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
