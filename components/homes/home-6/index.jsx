"use client";
import Form from "@/components/headers/components/Form";
import Popup from "@/components/headers/components/popup";
import FooterTop from "@/components/homes/home-6/FooterTop";
import { features10 } from "@/data/features";
import Image from "next/image";
import { useState } from "react";
import Faqs from "../home-1/Faq";

import { PopupWrapper } from "@/components/headers/components/PopupWrapper";
import Portfolio from "./Portfolio";
import Service from "./Service";
import Testimonials from "./Testimonials";
import TestimonialsDark from "./TestimonialsDark";
import TwoService from "./TwoService";

export default function Home6({ onePage = false, dark = false }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  return (
    <>
      {/* <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} /> */}
      <section className={`scrollSpysection pb-5`} id="about">
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
              <h2 className="section-caption mb-20 mb-xs-10 wow fadeInUp">
                Grow With Us
              </h2>
              <h3 className="section-title-small  mb-30 mb-xs-20 wow fadeInUp">
                Supercharge Sales with a Fast, Reliable Website Or A Mobile
                App,&nbsp;
                <span
                  className="mark-decoration-3-wrap color-secondary-1-white section-title-small "
                  style={{
                    background:
                      "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                  }}
                >
                  Powered by Analytics!
                </span>
              </h3>
              <h4> Your vision. Our technology. Limitless possibilities.</h4>
              {/* Features List */}
              <div className="row features-list">
                {/* Features List Item */}
                {features10.map((feature, index) => (
                  <div
                    key={index}
                    className="col-sm-6 col-lg-12 col-xl-6 d-flex mb-3"
                  >
                    <div className="features-list-icon">
                      <img src={feature.icon} alt="Image Description" />
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
                <>
                  <PopupWrapper buttonText="Book A Free Call" />
                </>
              </div>
            </div>
          </div>
          {/* Images Composition */}
          {/* <About /> */}
          {/* End Images Composition */}
        </div>
      </section>
      <section
        style={{ backgroundColor: "#FFF7FF" }}
        className={`page-section  ${dark ? "bg-dark-1 light-content" : ""} `}
      >
        {dark ? <TestimonialsDark /> : <Testimonials />}
      </section>
      <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} />
      <section
        style={{
          background: "linear-gradient(-80deg, #621ABE 0%, #051D55 50%)",
        }}
        className={`page-section scrollSpysection  ${
          dark ? "bg-dark-1 bg-gradient-gray-dark-1 light-content" : ""
        } bg-scroll`}
        id="services"
      >
        <div className="container position-relative">
          <div className="row mb-60 mb-sm-40">
            <div className="col-md-8 col-lg-6">
              <h2 className="section-caption mb-20 mb-xs-10">Our Services</h2>
              <h3
                style={{ color: "white" }}
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
      {/* Features Section */}
      {/* <section
        className={`page-section  ${dark ? "bg-dark-1 light-content" : ""} `}
      >
        <Features />
      </section> */}
      <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} />
      {/* portfolio section */}
      <section
        className={`page-section  scrollSpysection  ${
          dark ? "bg-dark-1 light-content" : ""
        } `}
        id="portfolio"
      >
        <div className="container position-relative">
          <div className="row mb-30 mb-sm-40">
            <div className="col-md-8 offset-md-2 text-center">
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
                our portfolio
              </h2>
              <h3 className="section-title mb-0">
                We believe in making the best work, and being the best to work
                with.
              </h3>
            </div>
          </div>

          <Portfolio />
        </div>
      </section>
      <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} />

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

      {/* power of design section start */}
      <section
        style={{
          background: "linear-gradient(220deg, #621ABE 0%, #051D55 50%)",
        }}
        className={`page-section scrollSpysection  ${
          dark ? "bg-dark-1 bg-gradient-gray-dark-1 light-content" : ""
        } bg-scroll`}
        id="services"
      >
        <div className="container position-relative">
          <div className="row mb-60 mb-sm-40">
            <div className="col-md-12 col-lg-6">
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
                WHY CHOOSE US
              </h2>
              <h3
                style={{ color: "white" }}
                className="section-title-small mb-0 mb-sm-20"
              >
                We Use The Power Of Design To Solve Complex Problems.
              </h3>
              <p className="size-14 text-white mt-30">
                At InfiniSoft Technology, we combine creativity, technical
                expertise, and a client-first approach to deliver solutions that
                truly make an impact. From tailored designs to seamless
                functionality, we ensure every project reflects your unique
                vision and drives measurable results.
              </p>
              <div className="services-5-body d-flex align-items-center">
                <div className="d-flex flex-column mb-30">
                  <div className="w-100">
                    <h4 className="services-6-title text-white pt-4">
                      We're Professional
                    </h4>
                    <p
                      style={{ fontWeight: "300", lineHeight: "25px" }}
                      className="size-14 mb-0 text-white"
                    >
                      Our team of experts are ready for all kinds of challenges
                    </p>
                  </div>
                  <div className="w-100">
                    <h4 className="services-6-title text-white pt-4">
                      Tailored Strategies
                    </h4>
                    <p
                      style={{ fontWeight: "300", lineHeight: "25px" }}
                      className="size-14 mb-0 text-white"
                    >
                      We understand your business needs and work accordingly
                    </p>
                  </div>
                  <div className="w-100">
                    <h4 className="services-6-title text-white pt-4">
                      Expert Developers
                    </h4>
                    <p
                      style={{ fontWeight: "300", lineHeight: "25px" }}
                      className="size-14 mb-0 text-white"
                    >
                      We have a highly skilled talent pool to work on your
                      projects
                    </p>
                  </div>
                  <div className="w-100">
                    <h4 className="services-6-title text-white pt-4">
                      Latest Technology
                    </h4>
                    <p
                      style={{ fontWeight: "300", lineHeight: "25px" }}
                      className="size-14 mb-0 text-white"
                    >
                      We have access to a wide range of technology so we can
                      allocate the necessary resources according to your needs
                    </p>
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
      {/* </section> */}
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

            <div className="col-lg-6 col-xl-6">
              <h3 className="section-title-small mb-30">
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
        <Form togglePopup={togglePopup} />
      </Popup>
      <FooterTop />
    </>
  );
}
