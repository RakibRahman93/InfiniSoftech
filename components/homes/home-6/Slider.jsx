"use client";

import Image from "next/image";

const portraitImages = new Set([
  "mobile-mockup-uiux.jpg",
  "showcase-ecommerce-app.jpg",
  "showcase-fitness-app.jpg",
  "showcase-food-app.jpg",
  "showcase-social-app.jpg",
  "showcase-travel-app.jpg",
]);

const portfolioImages = [
  "demo-dashboard-1.jpg",
  "demo-dashboard-2.jpg",
  "demo-fitness-app.jpg",
  "demo-landing.jpg",
  "demo-mobile-app.jpg",
  "demo-social-dashboard.jpg",
  "dreamproperty.png",
  "glamhub.png",
  "infinisoft.png",
  "infinisoftech.png",
  "livespace.png",
  "madmarketers.png",
  "mobileapp-uiux.png",
  "mobile-mockup-uiux.jpg",
  "offizonee123.png",
  "printshop.png",
  "showcase-automobile.jpg",
  "showcase-dashboard.jpg",
  "showcase-ecommerce-app.jpg",
  "showcase-fitness-app.jpg",
  "showcase-interior-landing.jpg",
  "showcase-luxury-brand.jpg",
  "showcase-realestate.jpg",
  "showcase-social-app.jpg",
  "showcase-travel-app.jpg",
  "tgp.png",
].map((fileName) => ({
  src: `/assets/portfolio/${fileName}`,
  alt: fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()),
  variant: portraitImages.has(fileName) ? "portrait" : "landscape",
}));

const row1 = portfolioImages.filter((_, index) => index % 3 === 0);
const row2 = portfolioImages.filter((_, index) => index % 3 === 1);
const row3 = portfolioImages.filter((_, index) => index % 3 === 2);

function MarqueeRow({ images, reverse = false, duration = 30 }) {
  const doubled = [...images, ...images];

  return (
    <div className="design-showcase-row-shell">
      <div
        className={`design-showcase-row ${reverse ? "is-reverse" : "is-forward"}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((img, index) => (
          <div
            key={`${img.alt}-${index}`}
            className={`design-showcase-card ${
              img.variant === "portrait" ? "is-portrait" : "is-landscape"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="design-showcase-image"
              style={img.position ? { objectPosition: img.position } : undefined}
              sizes="(max-width: 767px) 70vw, (max-width: 1199px) 32vw, 420px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Slider() {
  return (
    <section className="design-showcase">
      <div className="design-showcase-glow design-showcase-glow-left" />
      <div className="design-showcase-glow design-showcase-glow-right" />

      <div className="design-showcase-perspective">
        <div className="design-showcase-plane">
          <MarqueeRow images={row1} duration={35} />
          <MarqueeRow images={row2} reverse duration={40} />
          <MarqueeRow images={row3} duration={35} />
        </div>
      </div>

      <div className="design-showcase-fade design-showcase-fade-left" />
      <div className="design-showcase-fade design-showcase-fade-right" />
    </section>
  );
}
