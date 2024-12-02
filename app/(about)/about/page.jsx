import AnimatedText from "@/components/common/AnimatedText";
import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import About from "@/components/homes/home-6/About";
import Aboutt from "@/components/homes/home-1/About";
import Features from "@/components/homes/home-6/Features";
import Testimonials from "@/components/homes/home-6/Testimonials";
import TestimonialsDark from "@/components/homes/home-6/TestimonialsDark";
import { fancyMultipage } from "@/data/menu";
import Image from "next/image";
import Link from "next/link";
import Team from "@/components/homes/home-1/Team";
import Benefits from "@/components/homes/home-1/Benefits";
import Faqs from "@/components/homes/home-1/Faq";
const onePage = false;
const dark = false;
export const metadata = {
  title:
    "ABOUT US",
  description:
    "",
};
export default function FancyAboutPage() {
  return (
    <>
      <div className="theme-fancy">
        <div className="page" id="top">
          <nav className="main-nav transparent stick-fixed wow-menubar wch-unset">
            <Header6 links={fancyMultipage} />
          </nav>
          <main id="main">
            <section className="page-section bg-gradient-gray-light-1 bg-scroll overflow-hidden">
              {/* <!-- Background Shape --> */}
              <div className="bg-shape-1 wow fadeIn">
                <Image
                  width="1443"
                  height="844"
                  src="/assets/images/demo-fancy/bg-shape-1.svg"
                  alt=""
                />
              </div>
              {/* <!-- End Background Shape --> */}

              <div className="container position-relative pt-10 pt-sm-40 text-center">
                <div className="row">
                  <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                    <h1 className="hs-title-10 mb-10">
                      <span className="wow charsAnimIn" data-splitting="chars">
                        <AnimatedText text="About" />
                        <span className="mark-decoration-3-wrap">
                          <AnimatedText text="Company
                          " />
                          <b
                            className="mark-decoration-3 wow scalexIn"
                            data-wow-delay="0.5s"
                          ></b>
                        </span>
                      </span>
                    </h1>

                    <p
                      className="section-descr mb-0 wow fadeIn"
                      data-wow-delay="0.2s"
                    >
                      Crafting immersive digital journeys for brands.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* <section
              className={`page-section  scrollSpysection ${
                dark ? "bg-dark-1 light-content" : ""
              } `}
              id="about"
            >
              <div className="container position-relative">
                <div className="row mb-xs-40">
                  <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2 text-center"> */}
                    {/* <p
                      className="section-descr mb-40 mb-sm-20 wow fadeInUp"
                      data-wow-delay="0.06s"
                    >
                      At InfiniSoft Technology, we turn visions into reality with tailored software solutions, including web development, mobile apps, and exceptional UI/UX design.
                    </p>
                    <div
                      className="local-scroll wow fadeInUp"
                      data-wow-delay="0.12s"
                    > */}
                      {/* <Link
                        href={`/fancy-services${dark ? "-dark" : ""}`}
                        className="link-hover-anim"
                        data-link-animate="y"
                      > */}
                        {/* <span className="link-strong link-strong-unhovered">
                          View our services{" "}
                          <i
                            className="mi-arrow-right size-24"
                            aria-hidden="true"
                          ></i>
                        </span> */}
                        {/* <span
                          className="link-strong link-strong-hovered"
                          aria-hidden="true"
                        >
                          View our services{" "}
                          <i
                            className="mi-arrow-right size-24"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div> */}
                {/* Images Composition */}
                {/* <About /> */}
                {/* End Images Composition */}
              {/* </div>
            </section> */}
            {/* <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} /> */}
            <section
              className={`page-section  ${
                dark ? "bg-dark-1 light-content" : ""
              } `}
            >
              {/* <Features /> */}
              <section
        className={` scrollSpysection ${
          dark ? "bg-dark-1 light-content" : ""
        }`}
        id="about"
      >
        <div className="container position-relative">
          <div className="row mb-60 mb-xs-30">
            <div className="col-md-6">
              <h2 className="section-caption mb-xs-10">Our Story</h2>
              <h3 className="section-title mb-0">
                <AnimatedText text="Transform Ideas Into Powerful Digital Solutions" />
              </h3>
            </div>
            <div className="col-md-5 offset-md-1 relative text-start text-md-end pt-40 pt-sm-20 local-scroll">
              {/* Decorative Dots */}
              <div
                className="decoration-2 d-none d-md-block"
                data-rellax-y=""
                data-rellax-speed="0.7"
                data-rellax-percentage="-0.2"
              >
                <Image
                  width="103"
                  height="223"
                  src="/assets/images/decoration-2.svg"
                  alt=""
                />
              </div>
              {/* End Decorative Dots */}

              {/* {onePage ? (
                <a
                  href="#team"
                  className="link-hover-anim underline align-middle"
                  data-link-animate="y"
                >
                  <span className="link-strong link-strong-unhovered">
                    Learn more about us{" "}
                    <i
                      className="mi-arrow-right size-18"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span
                    className="link-strong link-strong-hovered"
                    aria-hidden="true"
                  >
                    Learn more about us{" "}
                    <i
                      className="mi-arrow-right size-18"
                      aria-hidden="true"
                    ></i>
                  </span>
                </a>
              ) : (
                <Link
                  href={`/main-pages-about-1${dark ? "-dark" : ""}`}
                  className="link-hover-anim underline align-middle"
                  data-link-animate="y"
                >
                  <span className="link-strong link-strong-unhovered">
                    Learn more about us{" "}
                    <i
                      className="mi-arrow-right size-18"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span
                    className="link-strong link-strong-hovered"
                    aria-hidden="true"
                  >
                    Learn more about us{" "}
                    <i
                      className="mi-arrow-right size-18"
                      aria-hidden="true"
                    ></i>
                  </span>
                </Link>
              )} */}
            </div>
          </div>
          <Aboutt />
        </div>
      </section>
            </section>
            <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} />
            {/* <section
        className={`page-section  scrollSpysection  ${
          dark ? "bg-dark-2 light-content" : "bg-gray-light-1 "
        }`}
        id="team"
      > */}
        {/* <Team /> */}
      {/* </section> */}
      <section
        className={`page-section  ${dark ? "bg-dark-1 light-content" : ""}`}
      >
        <div className="container position-relative">
          <div className="row">
            {/* Images */}
            <div className="col-lg-7 d-flex align-items-start mb-md-60 mb-xs-30">
              <div className="call-action-2-images">
                <div
                  className="call-action-2-image-1"
                  data-rellax-y=""
                  data-rellax-speed="0.5"
                  data-rellax-percentage="0.7"
                >
                  <Image
                    width={386}
                    height={400}
                    src="/assets/images/sample design 3.png"
                    alt="Image Description"
                    className="wow scaleOutIn"
                    data-wow-duration="1.2s"
                    data-wow-offset={255}
                  />
                </div>
                <div className="call-action-2-image-2">
                  <Image
                    width={810}
                    height={512}
                    src="/assets/images/sample design 9.jpg"
                    alt="Image Description"
                    className="wow scaleOutIn"
                    data-wow-duration="1.2s"
                    data-wow-offset={134}
                  />
                </div>
                <div
                  className="call-action-2-image-3"
                  data-rellax-y=""
                  data-rellax-speed="-0.5"
                  data-rellax-percentage="0.5"
                >
                  <Image
                    width={386}
                    height={500}
                    src="/assets/images/sample design 4.png"
                    alt="Image Description"
                    className="wow scaleOutIn"
                    data-wow-duration="1.2s"
                    data-wow-offset={0}
                  />
                </div>
              </div>
            </div>
            {/* End Images */}
            {/* Text */}
            <div className="col-lg-5 d-flex align-items-center">
              <div
                className="wow fadeInUp"
                data-wow-duration="1.2s"
                data-wow-offset={255}
              >
                <h2 className="section-title mb-50 mb-sm-20">How we work?</h2>
                <Faqs />
                <div className="local-scroll">
                  {onePage ? (
                    <a
                      href="https://infinisoftech.setmore.com/"
                      target="_blank" rel="noopener noreferrer"
                      className="btn btn-mod btn-color btn-large btn-round btn-hover-anim"
                    >
                      <span>Book A Free Call</span>
                    </a>
                  ) : (
                    <Link
                      href="https://infinisoftech.setmore.com/"
                      target="_blank" rel="noopener noreferrer"
                      className="btn btn-mod btn-color btn-large btn-round btn-hover-anim"
                    >
                      <span>Book A Free Call</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {/* End Text */}
          </div>
        </div>
      </section>
      {/* <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} /> */}
      {/* <section
        className={`page-section  ${
          dark ? "bg-dark-1 light-content z-index-1" : ""
        }`}
      >
        <div className="container position-relative"> */}
          {/* Decorative Waves */}
          {/* <div
            className="decoration-3 d-none d-sm-block"
            data-rellax-y=""
            data-rellax-speed="-0.7"
            data-rellax-percentage="0.5"
          >
            <Image
              width={148}
              height={148}
              className="svg-shape"
              src="/assets/images/decoration-3.svg"
              alt=""
            />
          </div> */}
          {/* End Decorative Waves */}
          {/* <div className="row text-center wow fadeInUp">
            <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <p className="section-descr mb-50 mb-sm-30">
              Ready to bring your vision to life? Let’s build something amazing together. Contact us today to get started!
              </p>
              <div className="local-scroll">
                {onePage ? (
                  <a
                    href="#contact"
                    className="btn btn-mod btn-color btn-large btn-round btn-hover-anim"
                  >
                    <span>Contact us</span>
                  </a>
                ) : (
                  <Link
                    href={`/main-pages-contact-1${dark ? "-dark" : ""}`}
                    className="btn btn-mod btn-color btn-large btn-round btn-hover-anim"
                  >
                    <span>Contact us</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} />
      <section
        className={`page-section  ${dark ? "bg-dark-1 light-content" : ""}`}
      >
        <Benefits />{" "}
      </section>
      <hr className={`mt-0 mb-0 ${dark ? "white" : ""}`} />
      
            {/* <section
              className={`page-section  ${
                dark ? "bg-dark-1 light-content" : ""
              } `}
            >
              {dark ? <TestimonialsDark /> : <Testimonials />}
            </section> */}
          </main>
          <footer className="page-section footer bg-dark-1 light-content pb-30">
            <Footer6 />
          </footer>
        </div>{" "}
      </div>
    </>
  );
}
