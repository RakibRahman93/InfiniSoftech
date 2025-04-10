"use client";

import { toggleMobileMenu } from "@/utlis/toggleMobileMenu";
import Link from "next/link";
import Nav from "./components/Nav";
import { PopupWrapper } from "./components/PopupWrapper";
import Image from "next/image";

export default function Header6({ links }) {
  return (
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
          {/* Book A Free Call Button */}
          
        </ul>
      </div>

      {/* Right button */}
      <div style={{ alignContent: "center" }} className="inner-nav desktop-nav">
        <PopupWrapper />
      </div>
    </div>
  );
}
