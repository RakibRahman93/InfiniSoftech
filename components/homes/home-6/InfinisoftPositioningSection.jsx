"use client";

import Image from "next/image";
import Link from "next/link";

const outcomes = [
  "Conversion-led UX",
  "Clean development systems",
  "Fast launch cycles",
];

const capabilities = [
  "Websites that explain the offer clearly",
  "Dashboards that simplify daily operations",
  "Product design that feels premium and credible",
];

export default function InfinisoftPositioningSection() {
  return (
    <section className="page-section infinisoft-positioning-section scrollSpysection">
      <div className="container position-relative">
        <div className="infinisoft-positioning-shell">
          <div className="infinisoft-positioning-copy wow fadeInUp" data-wow-delay="0.08s">
            <span className="infinisoft-positioning-kicker">
              Infinisoft Growth Engine
            </span>

            <h2 className="infinisoft-positioning-title">
              Turn scattered ideas
              <span className="infinisoft-positioning-title-accent">
                into clear digital systems.
              </span>
            </h2>

            <p className="infinisoft-positioning-text mb-0">
              Infinisoft helps ambitious brands move from patchy websites,
              confusing funnels, and slow internal workflows to polished
              experiences that sell, support growth, and make operations easier.
            </p>

            <div className="infinisoft-positioning-chip-row">
              {outcomes.map((item) => (
                <span key={item} className="infinisoft-positioning-chip">
                  {item}
                </span>
              ))}
            </div>

            <div className="infinisoft-positioning-list">
              {capabilities.map((item) => (
                <div key={item} className="infinisoft-positioning-list-item">
                  <span className="infinisoft-positioning-list-icon" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="infinisoft-positioning-cta-row">
              <div className="cta-glitter-wrap">
                <Link
                  href="/case-studies"
                  className="btn-lg fw-semibold text-white shadow-sm cta-glitter-button w-md-auto infinisoft-positioning-cta"
                  style={{
                    borderRadius: "50px",
                    background:
                      "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                    border: "none",
                    minWidth: "18.5rem",
                    padding: "12px 26px",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "600",
                    height: "3.6rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>

          <div
            className="infinisoft-positioning-visual wow fadeInUp"
            data-wow-delay="0.16s"
          >
            <div className="infinisoft-dashboard">
              <div className="infinisoft-dashboard-topbar">
                <span className="infinisoft-dashboard-appdot" />
                <span className="infinisoft-dashboard-search" />
                <div className="infinisoft-dashboard-topicons">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="infinisoft-dashboard-body">
                <div className="infinisoft-dashboard-metric-row">
                  <div>
                    <div className="infinisoft-dashboard-label">
                      Better conversion flow
                    </div>
                    <div className="infinisoft-dashboard-value">+42%</div>
                  </div>
                  <div className="infinisoft-dashboard-trend">Faster path to action</div>
                </div>

                <div className="infinisoft-dashboard-card-row">
                  <div className="infinisoft-dashboard-mini-card">
                    <span />
                    <span />
                  </div>
                  <div className="infinisoft-dashboard-mini-card">
                    <span />
                    <span />
                  </div>
                  <div className="infinisoft-dashboard-mini-card">
                    <span />
                    <span />
                  </div>
                </div>

                <div className="infinisoft-dashboard-showcase">
                  <div className="infinisoft-dashboard-showcase-copy">
                    <div className="infinisoft-dashboard-showcase-kicker">
                      Built for sales, trust, and scale
                    </div>
                    <div className="infinisoft-dashboard-showcase-title">
                      Websites, apps, and dashboards that work together.
                    </div>
                  </div>
                  <div className="infinisoft-dashboard-showcase-shot">
                    <Image
                      src="/assets/portfolio/madmarketers.png"
                      alt="Infinisoft dashboard showcase"
                      width={800}
                      height={520}
                      className="infinisoft-dashboard-showcase-image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="infinisoft-founder-quote">
              <p className="infinisoft-founder-quote-text mb-0">
                "Infinisoft is built to remove friction. We combine strategy,
                design, and development so businesses can stop patching things
                together and start growing with confidence."
              </p>

              <div className="infinisoft-founder-meta">
                <div className="infinisoft-founder-avatar">
                  <Image
                    src="/assets/images/team/Rakib Rahman.png"
                    alt="Rakib Rahman"
                    width={80}
                    height={80}
                    className="infinisoft-founder-avatar-image"
                  />
                </div>
                <div>
                  <div className="infinisoft-founder-name">Rakib Rahman</div>
                  <div className="infinisoft-founder-role">
                    Founder, Infinisoft Technology
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .infinisoft-positioning-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 14% 18%, rgba(231, 87, 120, 0.16), transparent 30%),
            radial-gradient(circle at 86% 18%, rgba(136, 118, 255, 0.16), transparent 28%),
            linear-gradient(135deg, #141528 0%, #191a33 42%, #221f3d 100%);
          color: #f5f8ff;
        }

        .infinisoft-positioning-shell {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: 52px;
          align-items: center;
        }

        .infinisoft-positioning-copy {
          position: relative;
          z-index: 2;
        }

        .infinisoft-positioning-kicker {
          display: inline-flex;
          align-items: center;
          min-height: 2.1rem;
          padding: 0 18px;
          border: 1px solid rgba(231, 87, 120, 0.34);
          border-radius: 999px;
          background: rgba(38, 29, 60, 0.82);
          color: #f39ab0;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .infinisoft-positioning-title {
          margin: 26px 0 22px;
          color: #ffffff;
          font-size: 48px;
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.04em;
        }

        .infinisoft-positioning-title-accent {
          display: block;
          margin-top: 10px;
          background: linear-gradient(90deg, #e75778 0%, #8876ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .infinisoft-positioning-text {
          max-width: 560px;
          color: rgba(214, 223, 244, 0.84);
          font-size: 1.12rem;
          line-height: 1.65;
        }

        .infinisoft-positioning-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
          align-items: center;
        }

        .infinisoft-positioning-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.55rem;
          padding: 0 16px;
          border: 1px solid rgba(168, 146, 255, 0.18);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: #dfe7fb;
          font-size: 13px;
          font-weight: 600;
        }

        .infinisoft-positioning-list {
          display: grid;
          gap: 14px;
          margin-top: 28px;
          max-width: 580px;
        }

        .infinisoft-positioning-list-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          color: #edf2ff;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.55;
        }

        .infinisoft-positioning-list-icon {
          position: relative;
          top: 3px;
          width: 20px;
          height: 20px;
          flex: 0 0 20px;
          border-radius: 999px;
          background: linear-gradient(135deg, #e75778 0%, #8876ff 100%);
          box-shadow: 0 10px 22px rgba(120, 94, 224, 0.24);
        }

        .infinisoft-positioning-list-icon::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 5px;
          border-left: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transform: translate(-50%, -65%) rotate(-45deg);
        }

        .infinisoft-positioning-cta-row {
          margin-top: 32px;
        }

        .infinisoft-positioning-cta {
          text-decoration: none;
        }

        .infinisoft-positioning-visual {
          position: relative;
          min-height: 560px;
        }

        .infinisoft-dashboard {
          position: relative;
          margin-left: auto;
          width: min(100%, 640px);
          border: 1px solid rgba(123, 104, 194, 0.22);
          border-radius: 34px;
          background:
            linear-gradient(180deg, rgba(10, 17, 32, 0.96) 0%, rgba(9, 14, 27, 0.98) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 24px 60px rgba(3, 8, 18, 0.42);
          overflow: hidden;
        }

        .infinisoft-dashboard-topbar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 22px 28px;
          border-bottom: 1px solid rgba(67, 92, 141, 0.2);
        }

        .infinisoft-dashboard-appdot {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: linear-gradient(135deg, #e75778 0%, #8876ff 100%);
          box-shadow: 0 12px 24px rgba(120, 94, 224, 0.24);
        }

        .infinisoft-dashboard-search {
          width: 128px;
          height: 12px;
          border-radius: 999px;
          background: #253455;
        }

        .infinisoft-dashboard-topicons {
          display: flex;
          gap: 10px;
          margin-left: auto;
        }

        .infinisoft-dashboard-topicons span {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: #263455;
        }

        .infinisoft-dashboard-topicons span:first-child {
          background: #5b2f34;
        }

        .infinisoft-dashboard-topicons span:nth-child(2) {
          background: #77602e;
        }

        .infinisoft-dashboard-topicons span:last-child {
          background: #223d63;
        }

        .infinisoft-dashboard-body {
          padding: 32px 30px 34px;
        }

        .infinisoft-dashboard-metric-row {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 30px;
        }

        .infinisoft-dashboard-label {
          color: #a6b3d0;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .infinisoft-dashboard-value {
          margin-top: 10px;
          color: #ffffff;
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.04em;
        }

        .infinisoft-dashboard-trend {
          display: inline-flex;
          align-items: center;
          min-height: 2.2rem;
          padding: 0 16px;
          border-radius: 999px;
          background: rgba(136, 118, 255, 0.16);
          color: #b3a7ff;
          font-size: 12px;
          font-weight: 700;
        }

        .infinisoft-dashboard-card-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 22px;
        }

        .infinisoft-dashboard-mini-card {
          padding: 18px 18px;
          border: 1px solid rgba(76, 98, 142, 0.26);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.05);
        }

        .infinisoft-dashboard-mini-card span {
          display: block;
          height: 8px;
          border-radius: 999px;
          background: #3a4b6f;
        }

        .infinisoft-dashboard-mini-card span:first-child {
          width: 42%;
          margin-bottom: 12px;
        }

        .infinisoft-dashboard-mini-card span:last-child {
          width: 100%;
        }

        .infinisoft-dashboard-showcase {
          display: grid;
          grid-template-columns: minmax(0, 0.84fr) minmax(0, 1.16fr);
          gap: 18px;
          align-items: stretch;
        }

        .infinisoft-dashboard-showcase-copy {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 168px;
          padding: 24px;
          border-radius: 24px;
          background:
            linear-gradient(180deg, rgba(16, 23, 40, 0.92) 0%, rgba(12, 18, 31, 0.98) 100%);
          border: 1px solid rgba(86, 111, 162, 0.22);
        }

        .infinisoft-dashboard-showcase-kicker {
          color: #8da6d6;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .infinisoft-dashboard-showcase-title {
          color: #ffffff;
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.45;
        }

        .infinisoft-dashboard-showcase-shot {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          border-radius: 24px;
          background: linear-gradient(135deg, #e75778 0%, #8876ff 100%);
          overflow: hidden;
          min-height: 168px;
        }

        .infinisoft-dashboard-showcase-image {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 14px;
          box-shadow: 0 18px 32px rgba(2, 10, 24, 0.28);
        }

        .infinisoft-founder-quote {
          position: absolute;
          left: 0;
          bottom: -34px;
          width: min(100%, 390px);
          padding: 28px 30px;
          border: 1px solid rgba(123, 104, 194, 0.28);
          border-radius: 30px;
          background:
            linear-gradient(180deg, rgba(7, 12, 22, 0.98) 0%, rgba(4, 9, 17, 0.98) 100%);
          box-shadow: 0 24px 48px rgba(2, 8, 18, 0.4);
        }

        .infinisoft-founder-quote-text {
          color: #d9e4fb;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.85;
        }

        .infinisoft-founder-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 24px;
        }

        .infinisoft-founder-avatar {
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.08);
          padding: 0;
          box-shadow: 0 12px 24px rgba(7, 10, 22, 0.22);
          overflow: hidden;
        }

        .infinisoft-founder-avatar-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          border-radius: 20px;
          background: #0f1726;
        }

        .infinisoft-founder-name {
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
        }

        .infinisoft-founder-role {
          margin-top: 3px;
          color: #b59bff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @media (max-width: 1199.98px) {
          .infinisoft-positioning-shell {
            grid-template-columns: 1fr;
            gap: 42px;
          }

          .infinisoft-positioning-visual {
            min-height: auto;
          }

          .infinisoft-founder-quote {
            position: relative;
            left: auto;
            bottom: auto;
            margin: 24px auto 0;
          }

          .infinisoft-dashboard {
            margin: 0 auto;
          }
        }

        @media (max-width: 767.98px) {
          .infinisoft-positioning-section {
            padding-top: 80px;
            padding-bottom: 80px;
          }

          .infinisoft-positioning-title {
            margin: 20px 0 18px;
            font-size: 36px;
            line-height: 1.02;
          }

          .infinisoft-positioning-text {
            font-size: 1rem;
          }

          .infinisoft-positioning-chip-row {
            gap: 8px;
            justify-content: flex-start;
          }

          .infinisoft-positioning-chip {
            flex: 0 1 auto;
            font-size: 11px;
            min-height: 2rem;
            padding: 0 12px;
            max-width: calc(50% - 4px);
            white-space: nowrap;
          }

          .infinisoft-dashboard-body {
            padding: 24px 18px 20px;
          }

          .infinisoft-dashboard-topbar {
            padding: 18px 18px 16px;
          }

          .infinisoft-dashboard-search {
            width: 96px;
          }

          .infinisoft-dashboard-metric-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .infinisoft-dashboard-card-row,
          .infinisoft-dashboard-showcase {
            grid-template-columns: 1fr;
          }

          .infinisoft-dashboard-card-row {
            gap: 10px;
            margin-bottom: 16px;
          }

          .infinisoft-dashboard-mini-card {
            padding: 14px 16px;
            border-radius: 16px;
          }

          .infinisoft-dashboard-mini-card:nth-child(n + 2) {
            display: none;
          }

          .infinisoft-dashboard-mini-card span:first-child {
            margin-bottom: 10px;
          }

          .infinisoft-dashboard-showcase-copy,
          .infinisoft-dashboard-showcase-shot {
            min-height: auto;
          }

          .infinisoft-founder-quote {
            width: 100%;
            padding: 22px 20px;
            border-radius: 24px;
          }

          .infinisoft-founder-quote-text {
            font-size: 13px;
            line-height: 1.75;
          }
        }
      `}</style>
    </section>
  );
}
