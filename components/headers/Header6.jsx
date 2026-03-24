"use client";

import { toggleMobileMenu } from "@/utlis/toggleMobileMenu";
import Link from "next/link";
import Nav from "./components/Nav";
import { PopupWrapper } from "./components/PopupWrapper";
import Image from "next/image";
import { useState } from "react";
import Popup from "./components/popup";
import Form from "./components/Form";

export default function Header6({ links }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <div className="main-nav-sub container relative">
        {/* Logo */}
        <div className="nav-logo-wrap position-static local-scroll">
          <a href="/" className="logo">
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
            <li className="mobile-nav-display">
              <button
                type="button"
                onClick={togglePopup}
                className="header-mobile-cta"
              >
                Book A Free Strategy Call
              </button>
            </li>
          </ul>
        </div>

        {/* Right button */}
        <div
          className="inner-nav desktop-nav header-cta-wrap header-cta-glitter"
          style={{ display: "flex", alignItems: "center" }}
        >
          <PopupWrapper />
        </div>
      </div>
      <Popup isPopupVisible={isPopupVisible} onClose={togglePopup}>
        <Form onSuccess={togglePopup} />
      </Popup>
      <style jsx>{`
        .header-mobile-cta {
          width: calc(100% - 20px);
          margin: 12px 10px 18px;
          border: none;
          border-radius: 999px;
          padding: 14px 18px;
          background: linear-gradient(90deg, #e75778 0%, #8876ff 100%);
          color: #fff;
          font-family: Poppins, sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1;
          box-shadow: 0 14px 30px rgba(100, 74, 223, 0.22);
        }
      `}</style>
    </>
  );
}
