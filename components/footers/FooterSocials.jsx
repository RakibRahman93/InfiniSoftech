import "./FooterSocials.css"; // optional, if you prefer separate CSS

export default function FooterSocials({ variant = "both" }) {
  const socials = [
    {
      name: "Facebook",
      icon: "fa fa-facebook",
      url: "https://www.facebook.com/infinisoftt",
    },
    {
      name: "YouTube",
      icon: "fa fa-youtube",
      url: "https://www.youtube.com/@INFINISOFTTECHNOLOGY",
    },
    {
      name: "LinkedIn",
      icon: "fa fa-linkedin",
      url: "https://www.linkedin.com/company/infinisoftech",
    },
  ];

  return (
    <>
      {/* First Layout (Name beside Icon) */}
      {(variant === "both" || variant === "first") && (
        <ul className="d-flex flex-column gap-2 p-0">
          {socials.map((social, index) => (
            <li key={index} className="d-flex align-items-center">
              <a
                href={social.url}
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="text-decoration-none text-light d-flex align-items-center gap-2"
              >
                <i className={social.icon} aria-hidden="true" /> {social.name}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Second Layout (Icons in a row) */}
      {(variant === "both" || variant === "second") && (
        <ul className="d-flex flex-row gap-3 p-0">
          {socials.map((social, index) => (
            <li key={index} className="d-flex align-items-center">
              <a
                href={social.url}
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="text-decoration-none"
              >
                <i className={social.icon} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Third Layout (Vertical, circular icons) */}
      {(variant === "both" || variant === "third") && (
        <ul className="d-flex flex-column align-items-left gap-3 p-0 third-layout">
          {socials.map((social, index) => (
            <li key={index} className="">
              <a
                href={social.url}
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="circular-link text-decoration-none"
              >
                <i
                  className={social.icon}
                  aria-hidden="true"
                  style={{ color: "#fff" }}
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
