"use client";

import addScrollspy from "@/utlis/addScrollSpy";
import { init_classic_menu_resize } from "@/utlis/menuToggle";
import { scrollToElement } from "@/utlis/scrollToElement";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./menu.css"

export default function OnePageNav({ links, animateY = false }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      scrollToElement();
    }, 1000);
    init_classic_menu_resize();
    window.addEventListener("scroll", addScrollspy);

    window.addEventListener("resize", init_classic_menu_resize);

    return () => {
      window.removeEventListener("scroll", addScrollspy);
      window.removeEventListener("resize", init_classic_menu_resize);
    };
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <>
      {links.map((link, index) => (
        <li
          key={index}
          className={`menu-item ${link.dropdown ? "dropdown" : ""}`}
        >
          <Link
            className={
              pathname.split("/")[1] === link.href.split("/")[1] ? "active" : ""
            }
            href={link.href}
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

          {/* Render dropdown if it exists */}
          {link.dropdown && dropdownOpen === index && (
            <ul className="dropdown-menu" id="dropdown-menus">
              {link.dropdown.map((dropdownLink, dropdownIndex) => (
                <li key={dropdownIndex}>
                  <Link
                    className={
                      pathname.split("/")[1] === dropdownLink.href.split("/")[1]
                        ? "active"
                        : ""
                    }
                    href={dropdownLink.href}
                  >
                    {dropdownLink.text}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
}
