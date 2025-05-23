import AnimatedText from "@/components/common/AnimatedText";
import Faq from "@/components/common/Faq";
import Footer6 from "@/components/footers/Footer6";
import PopupWithForm from "@/components/headers/components/PopupWithForm";
import Header6 from "@/components/headers/Header6";
import Faqs from "@/components/homes/home-1/Faq";
import Contact from "@/components/homes/home-4/Contact";

import { fancyMultipage } from "@/data/menu";
import Image from "next/image";
import Link from "next/link";

const onePage = false;
const dark = false;
export const metadata = {
  title:
    "CONTACT US",
  description:
    "",
};
export default function FancyContactPage() {
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
                        <AnimatedText text="Contact" />
                        <span className="mark-decoration-3-wrap">
                          <AnimatedText text="Us" />
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
                      Reach out and let's bring your vision to life.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section
              className={`container page-section  scrollSpysection  ${
                dark ? "bg-dark-1 light-content" : ""
              } `}
              id="contact"
            >
              <Contact />
            </section>
            <>
              <hr className="mt-0 mb-0" />
              {/* End Divider */}
              {/* FAQ Section */}
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
                      <Faqs />
                      <PopupWithForm triggerLabel="Book A Free Call" />
                      {/* <a
                    href="https://infinisoftech.setmore.com/"
                    target="_blank" rel="noopener noreferrer"
                    className="btn btn-mod btn-color btn-large btn-round btn-hover-anim me-1 mb-xs-10"
                  >
                    <span>Book A Free Call</span>
                  </a>{" "} */}
                      {/* End Accordion */}
                    </div>
                  </div>
                </div>
              </section>
            </>
          </main>
          <footer className="page-section footer bg-dark-1 light-content pb-30">
            <Footer6 />
          </footer>
        </div>{" "}
      </div>
    </>
  );
}
