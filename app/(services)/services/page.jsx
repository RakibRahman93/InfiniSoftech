import Footer6 from "@/components/footers/Footer6";
import { PopupWrapper } from "@/components/headers/components/PopupWrapper";
import Header6 from "@/components/headers/Header6";
import FooterTop from "@/components/homes/home-6/FooterTop";
import ProcessHire from "@/components/homes/home-6/ProcessHire";
import ServiceMain from "@/components/homes/home-6/ServiceMain";
import ServicePricing from "@/components/homes/home-6/ServicePricing";
import ServiceSolution from "@/components/homes/home-6/ServiceSolution";
import TechSolutions from "@/components/homes/home-6/TechSolutions";
import { reviews } from "@/data/features";

import { fancyMultipage } from "@/data/menu";
import Image from "next/image";
const onePage = false;
const dark = false;
export const metadata = {
  title: "SERVICES",
  description:
    "Resonance &mdash; One & Multi Page React Nextjs Creative Template",
};
export default function FancyServicesPage() {
  return (
    <>
      <div className="theme-fancy">
        <div className="page" id="top">
          <nav className="main-nav transparent stick-fixed wow-menubar wch-unset">
            <Header6 links={fancyMultipage} />
          </nav>
          <main id="main">
            {/* your team section */}
            <section
              className={`scrollSpysection pb-5 mt-5 service-large-sections`}
              id="about"
            >
              <div className="pt-md-5 container position-relative">
                <div className="row mb-xs-40">
                  {/* left section */}
                  <div className="col-md-12 col-lg-6 pt-5 pb-lg-5">
                    <h3 className="section-title-small  mb-30 mb-xs-20 wow fadeInUp">
                      Boost Your Team with
                      <span
                        className="mark-decoration-3-wrap wow fadeInUp color-secondary-1-white section-title-small"
                        style={{
                          background:
                            "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: "bold",
                        }}
                      >
                        Expert Talent, On Demand
                      </span>
                    </h3>
                    <p className="wow fadeInUp">
                      Strategic staffing solutions designed for flexibility and
                      growth. Whether you require specialized expertise for
                      short-term projects or long-term team expansion, we
                      deliver top-tier talent to optimize performance and drive
                      sustainable success.
                    </p>

                    {/* Yellow Stars */}
                    <div className="wow fadeInUp">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          style={{ color: "#FFD700", fontSize: "24px" }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="mb-4 wow fadeInUp">
                      {/* Profile Images with Overlapping */}
                      <div className="d-flex" style={{ position: "relative" }}>
                        {reviews.map((user, index) => (
                          <div
                            key={user.id}
                            className="rounded-circle overflow-hidden position-relative"
                            style={{
                              width: 60,
                              height: 60,
                              border: "1px solid #D9D9D9",
                              marginRight: "-15px", // Overlap effect
                              // zIndex: reviews.length - index, // Stacking order
                              borderRadius: "50%",
                              backgroundColor: "#fff", // Ensures circular appearance
                            }}
                          >
                            <Image
                              src={user.img}
                              alt={user.name}
                              width={60}
                              height={60}
                              className="img-fluid rounded-circle"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="local-scroll wow fadeInUp"
                      data-wow-delay="0.12s"
                    >
                      <>
                        <PopupWrapper
                          minWidth="14rem"
                          buttonText="Get A Free Consultation"
                          height="3.5rem"
                        />
                      </>
                    </div>
                  </div>
                  {/* right section */}
                  <div className="col-md-10 col-lg-6 text-center">
                    <Image
                      // style={{marginTop:"3.7rem"}}
                      src="/assets/images/services/service-main.svg"
                      width={780}
                      height={0}
                      className="wow fadeInUp"
                      alt="Image Description"
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* why staff start */}
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
                  <div className="d-flex flex-wrap">
                    <div className="col-md-6 col-lg-7 d-flex flex-column">
                      <h2 className="section-caption mb-2 mb-xs-0">
                        Our Services
                      </h2>
                      <p
                        style={{ color: "white", fontSize: "40px !important" }}
                        className="section-title mb-0 mb-sm-20"
                      >
                        Why Staff
                      </p>
                      <h2
                        className="mark-decoration-3-wrap wow fadeInUp color-secondary-1-white text-transparent bg-clip-text font-extrabold fs-64 fs-md-2 fs-lg-3 fs-xl-4 py-0"
                        style={{
                          background:
                            "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: "bolder",
                        }}
                      >
                        Augmentation?
                      </h2>
                    </div>
                    <div className="col-md-6 col-lg-5 d-flex row">
                      <p className="services-5-text mb-0 text-white">
                        <span className="fw-bold">Staff augmentation</span> is a
                        flexible outsourcing approach that helps businesses hire
                        skilled professionals for a set period. Instead of
                        permanent hires, companies expand their in-house teams
                        with external IT experts who work under their processes
                        and guidelines, ensuring a smooth and efficient
                        workflow.
                      </p>
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
                {/* Services Grid */}

                <ServiceMain />
              </div>
            </section>
            {/* process start */}
            <section
              className={`scrollSpysection  py-5${
                dark ? "bg-dark-1 bg-gradient-gray-dark-1 light-content" : ""
              } bg-scroll`}
              id="services"
            >
              <div className="container position-relative">
                <div className="row mb-60 mb-sm-40">
                  <div className="container">
                    <div className="d-flex flex-column">
                      <h2
                        className="text-center section-title-small mb-1"
                        style={{
                          color: "#1C1C57",
                        }}
                      >
                        A simple 3-step process to hire
                      </h2>
                      <p
                        style={{
                          color: "#7E7E7E",
                          fontSize: "16px !important",
                        }}
                        className="mb-0 mb-sm-20 text-center fw-bolder"
                      >
                        Getting started with InfiniSoft's staff augmentation is
                        quick and seamless. Here's how:
                      </p>
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
                {/* process Grid */}
                <ProcessHire />
              </div>
            </section>
            {/* Technologies start */}
            <section
              className={`scrollSpysection py-5${
                dark ? "bg-dark-1 bg-gradient-gray-dark-1 light-content" : ""
              } bg-scroll`}
              id="services"
            >
              <div className="container position-relative">
                <div className="row mb-60 mb-sm-40">
                  <div className="container">
                    <div className="d-flex flex-column justify-center align-items-center">
                      <h2
                        className="text-center section-title-small mb-1"
                        style={{
                          color: "#1C1C57",
                        }}
                      >
                        Technologies & Tools
                      </h2>
                      <p
                        style={{
                          color: "#7E7E7E",
                          fontSize: "16px !important",
                          width: "70%",
                        }}
                        className="mb-0 mb-sm-20 text-center fw-bolder"
                      >
                        At InfiniSoft Technology, we offer expertise across a
                        diverse range of technologies, ensuring the perfect fit
                        for any project requirement.
                      </p>
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
                {/* Services Grid */}
                <TechSolutions />
              </div>
            </section>
            {/* Solution start */}
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
                  <div className="container">
                    <div className="d-flex flex-column">
                      <h2
                        className="mark-decoration-3-wrap wow fadeInUp color-secondary-1-white text-transparent bg-clip-text font-extrabold section-title-small text-center mb-1"
                        style={{
                          background:
                            "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: "bolder",
                          fontSize: "40px !important",
                        }}
                      >
                        Solution
                      </h2>
                      <p
                        style={{
                          color: "white",
                          fontSize: "18px !important",
                          fontWeight: "400 !important",
                        }}
                        className="section-title mb-0 mb-sm-20 text-center"
                      >
                        You Can Expect from Our Teams
                      </p>
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
                {/* Services Grid */}
                <ServiceSolution />
              </div>
            </section>
            <div className="container py-5 d-flex justify-content-center dshape">
              <div
                class="card p-4 res-card"
                style={{
                  borderRadius: "12px",
                  border: "12px solid #051D551A", // Border with transparency
                }}
              >
                <div class="row align-items-center">
                  <div className="container mb-3">
                    <h2
                      class="fw-bold text-dark mb-0 section-title-small"
                      style={{ color: "#1C1C57" }}
                    >
                      Hire high-performance on-demand
                    </h2>
                    <span
                      class="section-title-small"
                      style={{
                        background:
                          "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bolder",
                      }}
                    >
                      Software Developers
                    </span>
                  </div>
                  <div class="col-md-3 text-center">
                    <img
                      src="assets/images/services/solution-man.png"
                      alt="Profile Image"
                      class="rounded-circle img-fluid"
                    />
                  </div>
                  <div class="col-md-9">
                    <p class="text-muted fw-bold">
                      Share your project requirements or desired skill set, and
                      we'll find the perfect professionals for you. The more
                      details you provide, the better we can tailor our
                      expertise to meet your needs.
                    </p>
                    <p class="fw-bolder mb-0" style={{ color: "#1C1C57" }}>
                      Md Rakib Rahman
                    </p>
                    <small class="text-muted" style={{ fontSize: "14px" }}>
                      Founder & CTO at INFINISOFT TECHNOLOGY
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <section
              className={`scrollSpysection py-4 ${
                dark ? "bg-dark-1 light-content" : ""
              } `}
              id="pricing"
            >
              <ServicePricing />
            </section>
          </main>
          <FooterTop />
          <footer
            className="footer bg-dark-1 light-content py-5"
            style={{
              background: "linear-gradient(220deg, #621ABE 0%, #051D55 50%)",
            }}
          >
            <Footer6 />
          </footer>
        </div>{" "}
      </div>
    </>
  );
}
