import React from "react";

export default function FooterSocials() {
  const socials = [
    { name: "Facebook", icon: "fa-facebook", url: "https://www.facebook.com/infinisoftt" },
    { name: "YouTube", icon: "fa-youtube", url: "https://www.youtube.com/@INFINISOFTTECHNOLOGY" },
    // { name: "Pinterest", icon: "fa-pinterest", url: "#" },
    { name: "LinkedIn", icon: "fa-linkedin", url: "https://www.linkedin.com/company/infinisoftech" },
  ];

  return (
    <>
      {socials.map((social, index) => (
        <li key={index}>
          <a href={social.url} rel="noopener nofollow" target="_blank">
            <i className={social.icon} /> {social.name}
          </a>
        </li>
      ))}
    </>
  );
}
