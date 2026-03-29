"use client";

import Image from "next/image";

const improvements = [
  "Clearer offer",
  "Stronger trust",
  "Better CTA flow",
  "More premium feel",
];

export default function BeforeAfterTrust() {
  return (
    <section
      className="page-section home-before-after-section scrollSpysection"
      id="before-after"
    >
      <div className="container position-relative">
        <div className="home-before-after-compact">
          <div className="home-before-after-head wow fadeInUp" data-wow-delay="0.08s">
            <h2 className="section-caption mb-10 mb-xs-10">Before And After</h2>
            <h3 className="section-title-small mb-12 home-before-after-title">
              Small design changes can make the business feel far more trustworthy.
            </h3>
            <p className="home-before-after-intro mb-0">
              The difference is not decoration. It is clearer messaging, stronger
              structure, and a more confident first impression.
            </p>
            <div className="home-before-after-chip-row">
              {improvements.map((item) => (
                <span className="home-before-after-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="home-before-after-stage wow fadeInUp" data-wow-delay="0.14s">
            <article className="home-before-after-panel is-before">
              <div className="home-before-after-panel-top">
                <div>
                  <span className="home-before-after-label">Before</span>
                  <div className="home-before-after-panel-note">Older presentation</div>
                </div>
              </div>
              <div className="home-before-after-shot">
                <Image
                  src="/assets/images/demo-fancy/portfolio/TGP/before.png"
                  alt="Before website design example"
                  width={1400}
                  height={980}
                  className="home-before-after-shot-image"
                />
              </div>
              <p className="home-before-after-panel-copy mb-0">
                Feels less refined and communicates less confidence.
              </p>
            </article>

            <div className="home-before-after-divider" aria-hidden="true">
              <span>Upgrade</span>
            </div>

            <article className="home-before-after-panel is-after">
              <div className="home-before-after-panel-top">
                <div>
                  <span className="home-before-after-label is-after">After</span>
                  <div className="home-before-after-panel-note">Improved presentation</div>
                </div>
              </div>
              <div className="home-before-after-shot">
                <Image
                  src="/assets/images/demo-fancy/portfolio/TGP/after.png"
                  alt="After website design example"
                  width={1400}
                  height={980}
                  className="home-before-after-shot-image"
                />
              </div>
              <p className="home-before-after-panel-copy mb-0">
                Feels cleaner, more premium, and easier to trust quickly.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
