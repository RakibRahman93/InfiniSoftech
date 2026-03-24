"use client";

import addScrollspy from "@/utlis/addScrollSpy";
import { init_classic_menu_resize } from "@/utlis/menuToggle";
import { scrollToElement } from "@/utlis/scrollToElement";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./menu.css";

export default function OnePageNav({ links, animateY = false }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const pathname = usePathname();
  const menuRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => scrollToElement(), 1000);
    init_classic_menu_resize();
    window.addEventListener("scroll", addScrollspy);
    window.addEventListener("resize", init_classic_menu_resize);

    const handleClickOutside = (event) => {
      if (
        dropdownOpen !== null &&
        menuRefs.current[dropdownOpen] &&
        !menuRefs.current[dropdownOpen].contains(event.target)
      ) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", addScrollspy);
      window.removeEventListener("resize", init_classic_menu_resize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const normalizePath = (path) => path.replace(/\/$/, "").split("?")[0];

  return (
    <>
      {links.map((link, index) => {
        const isLinkActive =
          normalizePath(pathname) === normalizePath(link.href);

        return (
          <li
            key={index}
            ref={(el) => (menuRefs.current[index] = el)}
            className={`menu-item desktop-menus ${
              link.dropdown ? "dropdown" : ""
            }`}
          >
            <Link
              href={link.href}
              className={isLinkActive ? "active" : ""}
              onClick={
                link.dropdown
                  ? (e) => {
                      e.preventDefault();
                      toggleDropdown(index);
                    }
                  : undefined
              }
            >
              {animateY ? (
                <span className="btn-animate-y">
                  <span className="btn-animate-y-1">{link.text}</span>
                  <span className="btn-animate-y-2" aria-hidden="true">
                    {link.text}
                  </span>
                </span>
              ) : (
                link.text
              )}
            </Link>

            {link.dropdown && dropdownOpen === index && (
              <ul className="dropdown-menu" id="dropdown-menus">
                {link.dropdown.map((dropdownLink, dropdownIndex) => {
                  const isDropdownActive =
                    normalizePath(pathname) ===
                    normalizePath(dropdownLink.href);

                  return (
                    <li key={dropdownIndex}>
                      <Link
                        href={dropdownLink.href}
                        className={isDropdownActive ? "active" : ""}
                      >
                        {dropdownLink.text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
}
