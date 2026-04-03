"use client";
import Form from "@/components/headers/components/Form";
import Popup from "@/components/headers/components/popup";
import BeforeAfterTrust from "@/components/homes/home-6/BeforeAfterTrust";
import FooterTop from "@/components/homes/home-6/FooterTop";
import InfinisoftPositioningSection from "@/components/homes/home-6/InfinisoftPositioningSection";
import ProcessShowcase from "@/components/homes/home-6/ProcessShowcase";
import { features10 } from "@/data/features";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Faqs from "../home-1/Faq";
import Portfolio from "./Portfolio";
import Service from "./Service";
import TechSolutions from "./TechSolutions";
import Testimonials from "./Testimonials";
import TestimonialsDark from "./TestimonialsDark";
import TwoService from "./TwoService";
import { PopupWrapper } from "@/components/headers/components/PopupWrapper";

export default function Home6({ onePage = false, dark = false }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  return (
    <>
      {/* <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} /> */}
      <section className={`scrollSpysection pb-0`} id="about">
        <div className="pt-md-5 container position-relative">
          <div className="row mb-xs-40">
            {/* right section */}
            <div className="wow fadeInLeft col-md-10 col-lg-6 text-center">
              <Image
                // style={{marginTop:"3.7rem"}}
                src="/assets/images/demo-fancy/growsecimage.png"
                width={780}
                height={0}
                alt="Image Description"
              />
            </div>

            {/* left section */}
            <div className=" wow fadeInUp col-md-12 col-lg-6 pt-5 pb-lg-5">
              <h2 className="section-caption mb-10 mb-xs-10 wow fadeInUp">
                Grow With Us
              </h2>
              <h4
                className="section-title-small mb-20 mb-xs-16 wow fadeInUp"
                style={{ fontWeight: 600 }}
              >
                Spending On Ads But Still Not Getting Customers?
                <span
                  className="mark-decoration-3-wrap color-secondary-1-white  "
                  style={{
                    background:
                      "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "normal",
                    fontSize: "1.8rem",
                    display: "block",
                    marginTop: "8px",
                  }}
                >
                  Your Website May Be The Problem.
                </span>
              </h4>
              <p
                className="section-descr mb-30 wow fadeInUp"
                style={{ maxWidth: "560px", color: "#4C4F75", lineHeight: "28px" }}
              >
                Our UI/UX audit shows what is blocking conversions and how to
                fix it, so your website can support sales instead of wasting
                ad spend.
              </p>
              {/* <h4> Your vision. Our technology. Limitless possibilities.</h4> */}
              {/* Features List */}
              <div
                style={{ paddingBottom: "28px" }}
                className="row features-list"
              >
                {/* Features List Item */}
                {features10.map((feature, index) => (
                  <div
                    key={index}
                    className="col-sm-6 col-lg-12 col-xl-6 d-flex mb-3"
                  >
                    <div className="features-list-icon">
                      <img
                        style={{ width: "20px" }}
                        src={feature.icon}
                        alt="Image Description"
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#1C1C57",
                      }}
                    >
                      {feature.text}
                    </div>
                  </div>
                ))}
                {/* End Features List Item */}
              </div>
              <div className="local-scroll wow fadeInUp" data-wow-delay="0.12s">
                <button
                  type="button"
                  onClick={togglePopup}
                  className="btn-lg fw-semibold text-white shadow-sm w-md-auto"
                  style={{
                    borderRadius: "50px",
                    background:
                      "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                    border: "none",
                    minWidth: "15rem",
                    padding: "13px 28px",
                    fontWeight: "700",
                    textDecoration: "none",
                    boxShadow: "0 16px 34px rgba(100, 74, 223, 0.22)",
                  }}
                >
                  Book A Free Strategy Call
                </button>
              </div>
            </div>
          </div>
          {/* Images Composition */}
          {/* <About /> */}
          {/* End Images Composition */}
        </div>
      <section
        style={{
          background: "#1C1B2A",
        }}
        className={`page-section testimonials-showcase-section ${dark ? "bg-dark-1 light-content" : ""} `}
      >
        {dark ? <TestimonialsDark /> : <Testimonials />}
      </section>
      </section>
      <InfinisoftPositioningSection />
      <ProcessShowcase />
      <section className="agency-pricing-home-banner-wrap">
        <div className="container position-relative">
          <div className="agency-pricing-home-banner">
            <div className="agency-pricing-home-banner-copy">
              <span className="agency-pricing-home-banner-kicker">
                Website Subscription
              </span>
              <h3>Unlimited websites and updates for one monthly fee.</h3>
              <p>
                Built for teams that want faster website execution without the
                usual per-project cost and delays.
              </p>
            </div>
            <div className="agency-pricing-home-banner-actions">
              <div className="cta-glitter-wrap">
                <Link
                  href="/pricing/agencyPricing"
                  className="btn-lg fw-semibold text-white shadow-sm cta-glitter-button w-md-auto agency-pricing-home-banner-link"
                >
                  View Agency Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Services */}
      
      <section
        style={{
          background:
            "linear-gradient(180deg, #0a2a78 0%, #102f78 16%, #1d357f 34%, #2c3d8d 62%, #3b4aa2 100%)",
        }}
        className={`page-section scrollSpysection services-home-section ${
          dark ? "bg-dark-1 bg-gradient-gray-dark-1 light-content" : ""
        } bg-scroll`}
        id="services"
      >
        <div className="container position-relative">
          <div className="row mb-60 mb-sm-40">
            <div
              className="col-md-8 col-lg-6 wow fadeInUp"
              data-wow-delay="0.08s"
            >
              <h2 className="section-caption mb-20 mb-xs-10">Our Services</h2>
              <h3
                style={{ color: "white", fontWeight: 600 }}
                className="section-title-small mb-0 mb-sm-20"
              >
                Building The Future Of Your Business,
                <span
                  className="mark-decoration-3-wrap wow fadeInUp color-secondary-1-white ms-2"
                  style={{
                    background:
                      "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                  }}
                >
                  Digitally.
                </span>
              </h3>
            </div>
            <div className="col-md-4 col-lg-6 d-flex align-items-end">
              <div className="local-scroll text-md-end w-100">
                {onePage ? (
                  <>
                    {" "}
                    <a
                      href="#portfolio"
                      className="link-hover-anim"
                      data-link-animate="y"
                    >
                      <span className="link-strong link-strong-unhovered">
                        View works{" "}
                        <i
                          className="mi-arrow-right size-24"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span
                        className="link-strong link-strong-hovered"
                        aria-hidden="true"
                      >
                        View works{" "}
                        <i
                          className="mi-arrow-right size-24"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                  </>
                ) : (
                  <>
                    {" "}
                    {/* <Link
                      href={`/fancy-services${dark ? "-dark" : ""}`}
                      className="link-hover-anim"
                      data-link-animate="y"
                    >
                      <span className="link-strong link-strong-unhovered">
                        ALl services{" "}
                        <i
                          className="mi-arrow-right size-24"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span
                        className="link-strong link-strong-hovered"
                        aria-hidden="true"
                      >
                        ALl services{" "}
                        <i
                          className="mi-arrow-right size-24"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </Link> */}
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Services Grid */}

          <Service />
        </div>
      </section>
      
      {/* <section
        className={`page-section  ${dark ? "bg-dark-1 light-content" : ""} `}
      >
        <Features />
      </section> */}
      <section
        className={`scrollSpysection py-6${
          dark ? "bg-dark-1 bg-gradient-gray-dark-1 light-content" : ""
        } bg-scroll`}
        id="technologies"
        style={{ paddingTop: "72px", paddingBottom: "72px" }}
      >
        <div className="container position-relative">
          <div className="row mb-60 mb-sm-40">
            <div className="container">
              <div
                className="d-flex flex-column justify-center align-items-center wow fadeInUp"
                data-wow-delay="0.08s"
              >
                <h2
                  className="text-center section-title-small mb-1"
                  style={{
                    color: "#1C1C57",
                    fontWeight: 600,
                  }}
                >
                  Technologies & Tools
                </h2>
              </div>
            </div>

            <div className="col-md-4 col-lg-6 d-flex align-items-end">
              <div className="local-scroll text-md-end w-100">
                {onePage ? (
                  <>
                    {" "}
                    <a
                      href="#portfolio"
                      className="link-hover-anim"
                      data-link-animate="y"
                    >
                      <span className="link-strong link-strong-unhovered">
                        View works{" "}
                        <i
                          className="mi-arrow-right size-24"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span
                        className="link-strong link-strong-hovered"
                        aria-hidden="true"
                      >
                        View works{" "}
                        <i
                          className="mi-arrow-right size-24"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </a>
                  </>
                ) : (
                  <> </>
                )}
              </div>
            </div>
          </div>
          <TechSolutions />
        </div>
      </section>
      <section
        style={{
          background: "linear-gradient(220deg, #0A2A78 0%, #051D55 50%)",
        }}
        className={`page-section scrollSpysection  ${
          dark ? "bg-dark-1 bg-gradient-gray-dark-1 light-content" : ""
        } bg-scroll`}
        id="why-choose-us"
      >
        <div className="container position-relative">
          <div className="row mb-60 mb-sm-40">
            <div
              className="col-md-12 col-lg-6 wow fadeInUp"
              data-wow-delay="0.08s"
            >
              <h2
                className="section-caption mb-20 mb-xs-10"
                style={{
                  background: "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                WHY CHOOSE US
              </h2>
              <h3
                style={{ color: "white", fontWeight: 600 }}
                className="section-title-small mb-0 mb-sm-20"
              >
                Why Businesses Choose InfiniSoft
              </h3>
              <p
                className="size-14 text-white mt-30 mb-0"
                style={{ maxWidth: "540px", lineHeight: "26px" }}
              >
                We build websites and digital products that look better, load
                faster, and help businesses turn more visitors into real
                customers.
              </p>
              <div
                className="d-flex flex-wrap gap-2 mt-30"
                style={{ maxWidth: "540px" }}
              >
                {[
                  "Fast Delivery",
                  "Better UX",
                  "Scalable Builds",
                  "After Launch Support",
                ].map((item) => (
                  <span
                    key={item}
                    style={{
                      border: "1px solid rgba(136, 118, 255, 0.42)",
                      background: "rgba(8, 28, 82, 0.5)",
                      color: "#FFFFFF",
                      borderRadius: "999px",
                      padding: "8px 14px",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: 1.2,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="services-5-body d-flex align-items-center mt-30">
                <div className="d-flex flex-column gap-4 mb-30">
                  <div className="w-100 d-flex align-items-start gap-3">
                    <span
                      className="why-choose-bullet"
                      style={{
                        width: "12px",
                        height: "12px",
                        minWidth: "12px",
                        borderRadius: "999px",
                        marginTop: "14px",
                        background:
                          "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                        boxShadow: "0 0 18px rgba(136, 118, 255, 0.55)",
                      }}
                    />
                    <div>
                      <h4
                        className="services-6-title why-choose-card-title why-choose-summary-title text-white mb-2"
                      >
                        Fast Delivery
                      </h4>
                      <p
                        className="size-14 why-choose-card-description why-choose-summary-description mb-0 text-white"
                      >
                        Clear timelines and focused execution so you can launch
                        without delays.
                      </p>
                    </div>
                  </div>
                  <div className="w-100 d-flex align-items-start gap-3">
                    <span
                      className="why-choose-bullet"
                      style={{
                        width: "12px",
                        height: "12px",
                        minWidth: "12px",
                        borderRadius: "999px",
                        marginTop: "14px",
                        background:
                          "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                        boxShadow: "0 0 18px rgba(136, 118, 255, 0.55)",
                      }}
                    />
                    <div>
                      <h4
                        className="services-6-title why-choose-card-title why-choose-summary-title text-white mb-2"
                      >
                        Conversion-Focused Design
                      </h4>
                      <p
                        className="size-14 why-choose-card-description why-choose-summary-description mb-0 text-white"
                      >
                        Cleaner user journeys that build trust and drive more
                        inquiries, bookings, and sales.
                      </p>
                    </div>
                  </div>
                  <div className="w-100 d-flex align-items-start gap-3">
                    <span
                      className="why-choose-bullet"
                      style={{
                        width: "12px",
                        height: "12px",
                        minWidth: "12px",
                        borderRadius: "999px",
                        marginTop: "14px",
                        background:
                          "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                        boxShadow: "0 0 18px rgba(136, 118, 255, 0.55)",
                      }}
                    />
                    <div>
                      <h4
                        className="services-6-title why-choose-card-title why-choose-summary-title text-white mb-2"
                      >
                        Post-Launch Support
                      </h4>
                      <p
                        className="size-14 why-choose-card-description why-choose-summary-description mb-0 text-white"
                      >
                        We stay involved after launch to fix issues, refine
                        details, and keep everything running smoothly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <TwoService />
            </div>
          </div>
        </div>
      </section>
      <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} />
      {/* portfolio section */}
      <section
        style={{
          background:
            "radial-gradient(circle at 14% 18%, rgba(231, 87, 120, 0.08) 0%, rgba(231, 87, 120, 0) 26%), radial-gradient(circle at 88% 24%, rgba(136, 118, 255, 0.12) 0%, rgba(136, 118, 255, 0) 28%), linear-gradient(180deg, #ffffff 0%, #f7f9ff 100%)",
        }}
        className={`page-section  scrollSpysection  ${
          dark ? "bg-dark-1 light-content" : ""
        } `}
        id="portfolio"
      >
        <div className="container position-relative">
          <div className="row mb-30 mb-sm-40">
            <div
              className="col-md-8 offset-md-2 text-center wow fadeInUp"
              data-wow-delay="0.08s"
            >
              <h2
                className="section-caption mb-20 mb-xs-10"
                style={{
                  background:
                    "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                Projects
              </h2>
              <h3 className="section-title mb-0">Our Portfolio.</h3>
            </div>
          </div>

          <Portfolio mobileLimit={4} desktopLimit={6} showViewAll={true} />
        </div>
      </section>
      {/* <section
        className={`page-section  scrollSpysection  ${
          dark ? "bg-dark-1 light-content" : ""
        } `}
        id="blog"
      >
        <Blog />
      </section> */}

      {/* <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} /> */}

      {/* <section
        className={`page-section ${
          dark
            ? "bg-dark-1 bg-gradient-gray-dark-1 light-content"
            : "bg-gradient-gray-light-1 "
        } bg-scroll`}
      > */}
      {/* <Newsletter /> */}

      {/* <section
        className={`page-section  scrollSpysection  ${
          dark ? "bg-dark-1 light-content" : ""
        } `}
        id="pricing"
      >
        <Pricing />
      </section> */}
      {/* Frequently Asked Questions */}
      <section className="page-section z-index-1">
        <div className="container position-relative">
          <div className="row position-relative">
            <div className="col-lg-6 col-xl-6">
              <img
                src="/assets/images/faq-img.png"
                alt="faq-img"
                className="img-fluid"
              />
            </div>

            <div
              className="col-lg-6 col-xl-6 wow fadeInUp"
              data-wow-delay="0.08s"
            >
              <h3 className="section-title-small mb-30" style={{ fontWeight: 600 }}>
                Frequently Asked <br />
                Questions
              </h3>
              <p className="text-gray mb-30">
                At InfiniSoft Technology, we bring your ideas to life with
                innovative solutions and cutting-edge technology. Specializing
                in website and mobile app development, UI/UX design, and
                prototyping, our mission is to help businesses thrive in the
                digital world.
              </p>
              {/* Accordion */}
              <Faqs />
              {/* End Accordion */}
              {/* <a
                onClick={togglePopup}
                //href="https://infinisoftech.setmore.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-mod btn-color btn-large btn-round btn-hover-anim me-1 mb-xs-10"
              >
                <span>Contact Us</span>
              </a>{" "} */}
            </div>
          </div>
          <div className="home6-bridge-banner home6-bridge-banner-faq">
            <div className="home6-bridge-main">
              <div className="home6-bridge-copy">
                <span className="home6-bridge-eyebrow">
                  See How We Can Improve Your Website
                </span>
                <h3 className="home6-bridge-title">
                  Get a clearer view of what is hurting trust and conversions.
                </h3>
                <p className="home6-bridge-text">
                  We review the parts of your website that affect first
                  impressions, clarity, and user action so you can see where
                  stronger design and structure could unlock better results.
                </p>
              </div>

              <div className="home6-bridge-note">
                A quick strategic review to spot the gaps that make a website
                feel weaker than the business behind it.
              </div>

              <button
                type="button"
                onClick={togglePopup}
                className="home6-bridge-button d-none d-md-inline-flex"
              >
                Book A Free Strategy Call
              </button>
            </div>

            <div className="home6-bridge-side">
              <div className="home6-bridge-points">
                {[
                  "Clarity and messaging gaps",
                  "Conversion blockers on key pages",
                  "Trust, layout and CTA weaknesses",
                  "Quick-win improvements worth fixing first",
                  "Sections that feel visually outdated",
                  "Mobile UX issues affecting user flow",
                ].map((point) => (
                  <div className="home6-bridge-point" key={point}>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={togglePopup}
                className="home6-bridge-button d-md-none"
              >
                Book A Free Strategy Call
              </button>
            </div>
          </div>
        </div>
      </section>
      <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} />
      {/* <section
        className={`container page-section  scrollSpysection  ${
          dark ? "bg-dark-1 light-content" : ""
        } `}
        id="contact"
      >
        <Contact />
       
        
      </section> */}
      {/* Popup */}
      <Popup isPopupVisible={isPopupVisible} onClose={togglePopup}>
        <Form onSuccess={togglePopup} />
      </Popup>
      <style jsx>{`
        .why-choose-bullet {
          align-self: flex-start;
        }

        .why-choose-summary-title {
          font-size: 15px !important;
        }

        .why-choose-summary-description {
          font-size: 11px !important;
          font-weight: 300 !important;
          line-height: 18px !important;
        }

        @media (min-width: 992px) {
          .why-choose-card-title {
            font-size: 23px !important;
          }

          .why-choose-card-description {
            font-size: 14px !important;
            line-height: 22px !important;
          }

          .why-choose-bullet {
            margin-top: 16px !important;
          }
        }

      `}</style>
      <FooterTop />
    </>
  );
}


