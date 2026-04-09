"use client";
import { parallaxMouseMovement, parallaxScroll } from "@/utlis/parallax";
import "jarallax/dist/jarallax.min.css";
import { usePathname } from "next/navigation";
import "photoswipe/dist/photoswipe.css";
import { useEffect } from "react";
import "react-modal-video/css/modal-video.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "../public/assets/css/styles.css";
import FBPixelTracker from "@/components/others/FBPixelTracker";
import LocationProvider from "@/context/LocationContext";
import { headerChangeOnScroll } from "@/utlis/changeHeaderOnScroll";
import { init_wow } from "@/utlis/initWowjs";
import Script from "next/script";
import "tippy.js/dist/tippy.css";

export default function RootLayout({ children }) {
  const path = usePathname();
  const whatsappNumber = "8801858333238";
  const whatsappMessage = encodeURIComponent(
    "Hi, I'd like to discuss a project."
  );
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    init_wow();
    parallaxMouseMovement();
    var mainNav = document.querySelector(".main-nav");
    if (mainNav?.classList.contains("transparent")) {
      mainNav.classList.add("js-transparent");
    } else if (!mainNav?.classList?.contains("dark")) {
      mainNav?.classList.add("js-no-transparent-white");
    }

    window.addEventListener("scroll", headerChangeOnScroll);
    parallaxScroll();
    return () => {
      window.removeEventListener("scroll", headerChangeOnScroll);
    };
  }, [path]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm").then(() => {});

      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-NYWXCXR8JT`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-NYWXCXR8JT");
        gtag("event", "page_view", {
          page_path: window.location.pathname,
        });
      };

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: path,
      });
    }
  }, [path]);

  return (
    <LocationProvider>
      <html lang="en" className="no-mobile no-touch">
        <head>
          {/* Meta Pixel */}
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1329540948306269');
              fbq('track', 'PageView');
            `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=1329540948306269&ev=PageView&noscript=1"
            />
          </noscript>
          {/* Google Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@200;300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,400;1,500&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500&family=Poppins&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Outfit:wght@100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
          {/* Umami Analytics */}
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="dde1d23e-a1b5-4d8e-b1f3-e3b47b9a1dde"
          ></script>

          {/* Hotjar Tracking Code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(h, o, t, j, a, r) {
                h.hj = h.hj || function() {
                  (h.hj.q = h.hj.q || []).push(arguments);
                };
                h._hjSettings = { hjid: 5272640, hjsv: 6 };
                a = o.getElementsByTagName('head')[0];
                r = o.createElement('script');
                r.async = 1;
                r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
                a.appendChild(r);
              })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
            `,
            }}
          />
        </head>
        <body className="appear-animate body">
          <FBPixelTracker />
          {children}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="whatsapp-float-button"
            style={{
              position: "fixed",
              zIndex: 9999,
              borderRadius: "999px",
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              boxShadow: "0 16px 34px rgba(18, 140, 126, 0.32)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              width: "64px",
              height: "64px",
              overflow: "visible",
            }}
          >
            <span
              className="whatsapp-float-button__icon-shell"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "999px",
                background: "rgba(255, 255, 255, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.24)",
              }}
              >
              <i
                className="fa-whatsapp"
                aria-hidden="true"
                style={{ color: "#FFFFFF", fontSize: "26px" }}
              />
            </span>
          </a>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .whatsapp-float-button {
                  right: 28px;
                  bottom: 28px;
                  animation: whatsapp-float-vibrate 3.2s ease-in-out infinite;
                }

                .whatsapp-float-button::before,
                .whatsapp-float-button::after {
                  content: "";
                  position: absolute;
                  inset: 0;
                  border-radius: 999px;
                  pointer-events: none;
                }

                .whatsapp-float-button::before {
                  background: rgba(37, 211, 102, 0.22);
                  animation: whatsapp-pill-ripple 2.8s ease-out infinite;
                }

                .whatsapp-float-button::after {
                  background: rgba(255, 255, 255, 0.12);
                  animation: whatsapp-pill-ripple 2.8s ease-out 1.1s infinite;
                }

                .whatsapp-float-button__icon-shell {
                  position: relative;
                  z-index: 1;
                  animation: whatsapp-icon-bob 1.8s ease-in-out infinite;
                }

                .whatsapp-float-button__icon-shell::before,
                .whatsapp-float-button__icon-shell::after {
                  content: "";
                  position: absolute;
                  inset: -6px;
                  border-radius: 999px;
                  border: 2px solid rgba(255, 255, 255, 0.26);
                  opacity: 0;
                  transform: scale(0.9);
                  pointer-events: none;
                }

                .whatsapp-float-button__icon-shell::before {
                  animation: whatsapp-icon-ripple 2.2s ease-out infinite;
                }

                .whatsapp-float-button__icon-shell::after {
                  animation: whatsapp-icon-ripple 2.2s ease-out 1.1s infinite;
                }

                @keyframes whatsapp-float-vibrate {
                  0%, 70%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
                  74% { transform: translate3d(-1px, 0, 0) rotate(-1.2deg); }
                  78% { transform: translate3d(1px, 0, 0) rotate(1.2deg); }
                  82% { transform: translate3d(-1px, 0, 0) rotate(-0.8deg); }
                  86% { transform: translate3d(1px, 0, 0) rotate(0.8deg); }
                }

                @keyframes whatsapp-pill-ripple {
                  0% {
                    opacity: 0;
                    transform: scale(0.94);
                  }
                  20% {
                    opacity: 0.55;
                  }
                  100% {
                    opacity: 0;
                    transform: scale(1.12);
                  }
                }

                @keyframes whatsapp-icon-ripple {
                  0% {
                    opacity: 0;
                    transform: scale(0.82);
                  }
                  25% {
                    opacity: 0.55;
                  }
                  100% {
                    opacity: 0;
                    transform: scale(1.45);
                  }
                }

                @keyframes whatsapp-icon-bob {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-1px); }
                }

                @media (max-width: 991px) {
                  .whatsapp-float-button {
                    right: 14px;
                    bottom: calc(110px + env(safe-area-inset-bottom));
                    width: 58px !important;
                    height: 58px !important;
                  }

                  .whatsapp-float-button::before,
                  .whatsapp-float-button::after {
                    inset: -2px;
                  }
                }
              `,
            }}
          />
          <script
            type="text/javascript"
            src="https://onsite.optimonk.com/script.js?account=248646"
            async
          ></script>
        </body>
      </html>
    </LocationProvider>
  );
}
