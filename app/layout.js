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
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if needed
      });

      // Google Analytics Script
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

        // Track initial page load
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
    // Track page views when the path changes
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
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
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
          <script
            src="//code.tidio.co/vaexsx9gz9fcjuvbw5tetd1axii88rzq.js"
            async
          ></script>
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
