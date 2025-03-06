export default function FooterVertical() {
  const socials = [
    {
      name: "Facebook",
      icon: "fa-facebook",
      url: "https://www.facebook.com/infinisoftt",
    },
    {
      name: "YouTube",
      icon: "fa-youtube",
      url: "https://www.youtube.com/@INFINISOFTTECHNOLOGY",
    },
    // { name: "Pinterest", icon: "fa-pinterest", url: "#" },
    {
      name: "LinkedIn",
      icon: "fa-linkedin",
      url: "https://www.linkedin.com/company/infinisoftech",
    },
  ];

  return (
    <>
      <ul className="d-flex flex-row gap-3 p-0">
        {socials.map((social, index) => (
          <li key={index} className="d-flex align-items-center gap-2">
            <a href={social.url} rel="noopener nofollow" target="_blank">
              <i className={social.icon} />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
