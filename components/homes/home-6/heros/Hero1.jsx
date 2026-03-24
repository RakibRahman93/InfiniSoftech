"use client";

import Form from "@/components/headers/components/Form";
import Popup from "@/components/headers/components/popup";
import { PopupWrapper } from "@/components/headers/components/PopupWrapper";
import { reviews } from "@/data/features";
import Image from "next/image";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import Slider from "../Slider";

export default function Hero1() {
  const [isOpen, setOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const heroBadges = [
    "Growth-Focused",
    "Sales-Driven",
    "Built to Scale",
    "High-Converting",
  ];

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <div className="position-relative d-flex align-items-center pt-140 pt-sm-120">
        <div className="home-content text-start">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="col-md-10 offset-md-1 offset-lg-1 col-xl-10 d-flex align-items-center mb-md-60 mb-sm-30">
              <div className="w-100 text-center container">
                <h1 className="fs-74 mb-30">
                  <span
                    className="wow charsAnimIn fadeInUp"
                    data-splitting="chars"
                  >
                    <span style={{ fontWeight: "bold", color: "#333" }}>
                      Design that sells.
                    </span>
                    <span
                      className="mark-decoration-3-wrap wow fadeInUp color-secondary-1-white"
                      style={{
                        background:
                          "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bold",
                        display: "block",
                      }}
                    >
                      Development that scales.
                    </span>
                  </span>
                </h1>

                <p
                  style={{ justifySelf: "center" }}
                  className="col-lg-8 section-descr mb-40 wow fadeInUp"
                  data-wow-delay="0.6s"
                  data-wow-duration="1.2s"
                  data-wow-offset={0}
                >
                  Custom websites, apps, and dashboards built to increase
                  sales, support growth, and drive measurable revenue.
                </p>

                <div
                  className="d-flex flex-wrap justify-content-center gap-2 mb-30 wow fadeInUp"
                  data-wow-delay="0.45s"
                >
                  {heroBadges.map((badge) => (
                    <span
                      key={badge}
                      className="hero-premium-badge"
                      style={{
                        border: "1px solid rgba(255, 255, 255, 0.58)",
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(247, 242, 255, 0.84) 100%)",
                        color: "#1A1C52",
                        borderRadius: "999px",
                        padding: "10px 18px",
                        fontSize: "11px",
                        fontWeight: "700",
                        fontFamily: "Raleway, sans-serif",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow:
                          "0 16px 34px rgba(63, 51, 223, 0.14), 0 4px 12px rgba(24, 28, 82, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.86)",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="container text-center mb-4 wow fadeInUp">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ position: "relative" }}
                  >
                    {reviews.map((user) => (
                      <div
                        key={user.id}
                        className="position-relative hero-review-avatar"
                        style={{
                          width: 58,
                          height: 58,
                          marginRight: "-14px",
                          boxShadow:
                            "0 12px 24px rgba(33, 26, 84, 0.12), 0 3px 10px rgba(78, 62, 178, 0.08), 0 0 0 4px rgba(136, 118, 255, 0.10), 0 0 18px rgba(231, 87, 120, 0.22)",
                        }}
                      >
                        <div className="hero-review-avatar-inner">
                          <Image
                            src={user.img}
                            alt={user.name}
                            width={50}
                            height={50}
                            sizes="50px"
                            className="img-fluid rounded-circle hero-review-avatar-image"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-2 d-flex justify-content-center align-items-center gap-1"
                    style={{ lineHeight: 1 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: "#FFC94A",
                          fontSize: "18px",
                          textShadow: "0 4px 10px rgba(255, 201, 74, 0.22)",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div
                    className="mt-2"
                    style={{
                      color: "#4C4F75",
                      fontSize: "13px",
                      fontWeight: "600",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Trusted by high-growth startups
                  </div>
                </div>

                <div
                  className="local-scroll mb-4 wow fadeInUp wch-unset"
                  data-wow-delay="0.7s"
                  data-wow-duration="1.2s"
                >
                  <PopupWrapper
                    className="btn me-2 popupButtons"
                    minWidth="16rem"
                    height="3.6rem"
                    buttonText="Book A Free Call"
                  />
                </div>
              </div>
            </div>

            <div
              className="mob-hide w-100 wow fadeInLeft"
              data-wow-delay="0.7s"
            >
              <div
                className="decoration-5 d-none d-sm-block"
                data-rellax-y=""
                data-rellax-speed="-0.7"
                data-rellax-percentage="0.5"
              ></div>
            </div>

            <div className="position-relative">
              <Slider />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="mob-hide w-100 wow fadeInLeft p-50"
          data-wow-delay="0.7s"
        >
          <div
            className="decoration-5 d-none d-sm-block"
            data-rellax-y=""
            data-rellax-speed="-0.7"
            data-rellax-percentage="0.5"
          ></div>
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="viFaDMFAlLo"
        onClose={() => setOpen(false)}
      />

      <Popup isPopupVisible={isPopupVisible} onClose={togglePopup}>
        <Form togglePopup={togglePopup} />
      </Popup>
      <style jsx>{`
        .hero-review-avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: linear-gradient(135deg, #e75778 0%, #8876ff 100%);
          padding: 2px;
        }

        .hero-review-avatar-inner {
          width: 100%;
          height: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.96);
          padding: 2px;
        }

        .hero-review-avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 999px;
          display: block;
        }

        @media (max-width: 767.98px) {
          .hero-premium-badge {
            padding: 7px 12px !important;
            font-size: 9px !important;
            letter-spacing: 0.05em !important;
          }
        }
      `}</style>
    </>
  );
}
