"use client";
import React, { useState } from "react";
import About from "./About";
import Service from "./Service";
import Features from "./Features";
import Portfolio from "./Portfolio";
import Testimonials from "./Testimonials";
import Blog from "./Blog";
import Newsletter from "./Newsletter";
import Pricing from "./Pricing";
import Contact from "@/components/homes/home-6/Contact";
import Link from "next/link";
import TestimonialsDark from "./TestimonialsDark";
import Faqs from "../home-1/Faq";
import Popup from "@/components/headers/components/popup";
import Form from "@/components/headers/components/Form";
import Image from "next/image";

export default function Home6({ onePage = false, dark = false }) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
  
    const togglePopup = () => {
      setIsPopupVisible(!isPopupVisible);
    };
  return (
    <>
      {/* <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} /> */}
      <section
        className={`scrollSpysection pb-5`}
        id="about"
      >
        <div className="pt-md-5 container position-relative">
          <div className="row mb-xs-40">
            {/* right section */}
            <div className="col-md-10 col-lg-6 text-center">
              <Image
                // style={{marginTop:"3.7rem"}}
                src="/assets/images/demo-fancy/growsecimage.png"
                 width={780}
                height={0}
                alt="Image Description"
               /> 
            </div>
            
            {/* left section */}
            <div className="col-md-6 col-lg-6 pt-5 pb-lg-5">
              <h2 className="section-caption-fancy mb-20 mb-xs-10 wow fadeInUp">Grow With Us</h2>
              <h3 className="section-title mb-30 mb-xs-20 wow fadeInUp">
              
              <span
                    className="mark-decoration-3-wrap wow fadeInUp color-secondary-1-white"
                        style={{
                          background: "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                         WebkitBackgroundClip: "text",
                         WebkitTextFillColor: "transparent",
                         fontWeight: "bold",
                       }}
                     >
                       Supercharge Sales{" "}
                     </span> with a Fast, Reliable Website Or A Mobile App, Powered by Analytics!
              </h3>
              <p
                className="section-descr mb-40 mb-sm-20 wow fadeInUp"
                data-wow-delay="0.06s"
              >
                At InfiniSoft Technology, we don’t just build websites and apps—we engineer high-performance digital solutions that accelerate growth, drive engagement, and maximize conversions.
                 <br />      
                 <br />      
              </p>
              <div className="local-scroll wow fadeInUp" data-wow-delay="0.12s">
               
                  <>
                  <Link
                    href={"/case-studies"}
                    className="btn btn-mod btn-color btn-border-c btn-white-c btn-large btn-round mb-xs-10 lightbox mfp-iframe"
                    data-btn-animate="y"
                    style={{
                      borderRadius: "50px",
                      // height: "2.7rem",
                      minWidth: "14rem",
                      background: "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                      border: "none",
                      color: "white", // Ensures text remains visible
                      fontSize: "14px",
                      fontWeight: "bold",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      cursor: "pointer",
                      }}
                     >
                    <span className="btn-animate-y">
                      <span className="btn-animate-y-1">
                        {/* <i
                          className="icon-play size-13 me-1"
                          aria-hidden="true"
                        ></i>{" "} */}
                        View Portflio
                      </span>
                      <span className="btn-animate-y-2" aria-hidden="true">
                        {/* <i
                          className="icon-play size-13 me-1"
                          aria-hidden="true"
                        ></i>{" "} */}
                        View Portflio
                      </span>
                    </span>
                  </Link>{" "}
                  </>
           
              </div>
            </div>
          </div>
          {/* Images Composition */}
          {/* <About /> */}
          {/* End Images Composition */}
        </div>
      </section>
      <section  style={{backgroundColor:"#FFF7FF"}}
        className={`page-section  ${dark ? "bg-dark-1 light-content" : ""} `}
      >
        {dark ? <TestimonialsDark /> : <Testimonials />}
      </section>
      <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} />
      <section
        style={{background: "linear-gradient(220deg, #621ABE 0%, #24214B 50%)"}}
        className={`page-section scrollSpysection  ${
          dark
            ? "bg-dark-1 bg-gradient-gray-dark-1 light-content"
            : ""
        } bg-scroll`}
        id="services"
      >
        <div className="container position-relative">
          <div className="row mb-60 mb-sm-40">
            <div className="col-md-8 col-lg-6">
              <h2 className="section-caption-fancy mb-20 mb-xs-10">
                Our Services
              </h2>
              <h3  style={{color:"white",}} className="section-title mb-0 mb-sm-20">
              <span
                    className="mark-decoration-3-wrap wow fadeInUp color-secondary-1-white"
                        style={{
                          background: "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                         WebkitBackgroundClip: "text",
                         WebkitTextFillColor: "transparent",
                         fontWeight: "bold",
                       }}
                     >
                       Smart Solutions{" "}
                     </span> for Every Business.
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
      <section
        className={`page-section  ${dark ? "bg-dark-1 light-content" : ""} `}
      >
        <Features />
      </section>
      <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} /> 
      <section
        className={`page-section  scrollSpysection  ${
          dark ? "bg-dark-1 light-content" : ""
        } `}
        id="portfolio"
      >
        <div className="container position-relative">
          <div className="row mb-60 mb-sm-40">
            <div className="col-md-8 offset-md-2 text-center">
              <h2 className="section-caption-fancy mb-20 mb-xs-10">
                Selected Work
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
      {/* </section> */}
      {/* <section
        className={`page-section  scrollSpysection  ${
          dark ? "bg-dark-1 light-content" : ""
        } `}
        id="pricing"
      >
        <Pricing />
      </section> */}
      <section className="page-section z-index-1">
                <div className="container position-relative">
                  <div className="row position-relative">
                    <div className="col-md-6 col-lg-5 mb-md-50 mb-sm-30">
                      <h3 className="section-title mb-30">
                        Frequently Asked Questions
                      </h3>
                      <p className="text-gray mb-0">
                      At InfiniSoft Technology, we bring your ideas to life with innovative solutions and cutting-edge technology. Specializing in website and mobile app development, UI/UX design, and prototyping, our mission is to help businesses thrive in the digital world.
                      </p>
                    </div>
                    <div className="col-md-6 offset-lg-1 pt-10 pt-sm-0">
                      {/* Accordion */}
                      <Faqs/>
                      {/* End Accordion */}
                      <a
                    onClick={togglePopup}
                    //href="https://infinisoftech.setmore.com/"
                    target="_blank" rel="noopener noreferrer"
                    className="btn btn-mod btn-color btn-large btn-round btn-hover-anim me-1 mb-xs-10"
                  >
                    <span>Contact Us</span>
                  </a>{" "}
                    </div>
                  </div>
                </div>
              </section>
      <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} />
      <section
        className={`container page-section  scrollSpysection  ${
          dark ? "bg-dark-1 light-content" : ""
        } `}
        id="contact"
      >
        <Contact />
         {/* Popup */}
      <Popup isPopupVisible={isPopupVisible} onClose={togglePopup}>
        <Form togglePopup={togglePopup} />
      </Popup>
      </section>
    </>
  );
}
