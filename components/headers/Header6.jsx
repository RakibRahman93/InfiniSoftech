"use client";

import { toggleMobileMenu } from "@/utlis/toggleMobileMenu";
import Link from "next/link";
import Nav from "./components/Nav";
import { PopupWrapper } from "./components/PopupWrapper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Popup from "./components/popup";
import Form from "./components/Form";

export default function Header6({ links }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const normalizePath = (path = "") => path.replace(/\/$/, "").split("?")[0];

  const mobileBottomLinks = [
    { href: "/", text: "Home" },
    { href: "/services/websiteDevelopment", text: "Services" },
    { href: "/pricing", text: "Pricing" },
    { href: "/portfolio", text: "Portfolio" },
  ];

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
      <div className="mobile-bottom-nav-spacer" aria-hidden="true" />
      {isMounted &&
        createPortal(
          <div className="mobile-bottom-nav" aria-label="Mobile quick navigation">
            <div className="mobile-bottom-nav__shell">
              <div className="mobile-bottom-nav__grid">
                {mobileBottomLinks.slice(0, 2).map((item) => {
                  const isActive =
                    normalizePath(pathname) === normalizePath(item.href) ||
                    (item.text === "Services" &&
                      normalizePath(pathname).startsWith("/services"));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`mobile-bottom-nav__item ${
                        isActive ? "is-active" : ""
                      }`}
                    >
                      <span className="mobile-bottom-nav__label">
                        {item.text}
                      </span>
                    </Link>
                  );
                })}

                <button
                  type="button"
                  onClick={togglePopup}
                  className="mobile-bottom-nav__cta"
                  aria-label="Book a free strategy call"
                >
                  <span className="mobile-bottom-nav__cta-ring">
                    <svg
                      className="mobile-bottom-nav__cta-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M6 7.75h12A2.25 2.25 0 0 1 20.25 10v6A2.25 2.25 0 0 1 18 18.25H11.5l-3.9 2.7c-.5.35-1.1-.08-.98-.68l.55-2.68H6A2.25 2.25 0 0 1 3.75 15.5V10A2.25 2.25 0 0 1 6 7.75Z" />
                    </svg>
                  </span>
                </button>

                {mobileBottomLinks.slice(2).map((item) => {
                  const isActive =
                    normalizePath(pathname) === normalizePath(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`mobile-bottom-nav__item ${
                        isActive ? "is-active" : ""
                      }`}
                    >
                      <span className="mobile-bottom-nav__label">
                        {item.text}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          ,
          document.body
        )}
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

        .mobile-bottom-nav,
        .mobile-bottom-nav-spacer {
          display: none;
        }

        @media (max-width: 991px) {
          .mobile-bottom-nav {
            position: fixed;
            left: 0;
            right: 0;
            top: auto;
            bottom: calc(14px + env(safe-area-inset-bottom));
            z-index: 9999;
            display: flex;
            justify-content: center;
            pointer-events: none;
          }

          .mobile-bottom-nav-spacer {
            display: block;
            height: 110px;
          }

          .mobile-bottom-nav__shell {
            width: min(calc(100% - 20px), 420px);
            position: relative;
            padding: 14px 18px calc(14px + env(safe-area-inset-bottom));
            border: 1px solid rgba(137, 118, 255, 0.18);
            border-radius: 28px;
            background:
              linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.96) 0%,
                rgba(246, 242, 255, 0.94) 100%
              );
            box-shadow:
              0 18px 40px rgba(39, 49, 111, 0.12),
              0 8px 18px rgba(136, 118, 255, 0.12);
            backdrop-filter: blur(16px);
            pointer-events: auto;
          }

          .mobile-bottom-nav__grid {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            align-items: end;
            gap: 8px;
          }

          .mobile-bottom-nav__item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            min-height: 46px;
            color: #49557f;
            text-decoration: none !important;
            transition:
              transform 0.2s ease,
              color 0.2s ease;
          }

          .mobile-bottom-nav__item:hover,
          .mobile-bottom-nav__item.is-active {
            color: #2d356c;
            text-decoration: none !important;
            transform: translateY(-2px);
          }

          .mobile-bottom-nav__label {
            font-family: Poppins, sans-serif;
            font-size: 11px;
            font-weight: 600;
            line-height: 1.15;
            text-align: center;
          }

          .mobile-bottom-nav__cta {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-width: 0;
            padding: 0;
            margin-top: -36px;
            border: none;
            background: transparent;
          }

          .mobile-bottom-nav__cta-ring {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 54px;
            height: 54px;
            border-radius: 999px;
            background: linear-gradient(135deg, #e75778 0%, #8876ff 100%);
            box-shadow:
              0 18px 28px rgba(104, 90, 211, 0.26),
              0 0 0 6px rgba(255, 255, 255, 0.88);
          }

          .mobile-bottom-nav__cta-icon {
            color: #fff;
            width: 22px;
            height: 22px;
            fill: none;
            stroke: currentColor;
            stroke-width: 1.9;
            stroke-linecap: round;
            stroke-linejoin: round;
            transform: translateY(0);
          }

          .mobile-bottom-nav :global(a),
          .mobile-bottom-nav :global(a:hover),
          .mobile-bottom-nav :global(a:focus),
          .mobile-bottom-nav :global(a:active) {
            text-decoration: none !important;
          }
        }
      `}</style>
    </>
  );
}
