"use client";

import { toggleMobileMenu } from "@/utlis/toggleMobileMenu";
import Link from "next/link";
import Nav from "./components/Nav";
import { PopupWrapper } from "./components/PopupWrapper";

export default function Header6({ links }) {
  return (
    <div className="main-nav-sub container relative">
      {/* Logo */}
      <div className="nav-logo-wrap position-static local-scroll">
        <Link href="/" className="logo">
          <img
            src="/assets/images/logo.png"
            alt="Your Company Logo"
            className="light-mode-logo"
          />
          {/* <Image
            src="/assets/images/logo.svg"
            alt="Your Company Logo"
            width={154}
            height={35}
            className="light-mode-logo"
          /> */}
        </Link>
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
