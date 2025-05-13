import Footer6 from "@/components/footers/Footer6";
import { PopupWrapper } from "@/components/headers/components/PopupWrapper";
import Header6 from "@/components/headers/Header6";
import FooterTop from "@/components/homes/home-6/FooterTop";
import Portfolio from "@/components/homes/home-6/Portfolio";
import ServicePricing from "@/components/homes/home-6/ServicePricing";
import WebProcess from "@/components/homes/home-6/WebProcess";
import WebServices from "@/components/homes/home-6/WebServices";
import { reviews } from "@/data/features";

import { fancyMultipage } from "@/data/menu";
import Image from "next/image";
const onePage = false;
const dark = false;
export const metadata = {
  title: "SERVICES - Website Design & Development",
  description: "",
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
              className={`scrollSpysection mt-5 service-large-sections`}
              id="about"
            >
              <div className="pt-md-5 container position-relative">
                <div className="row mb-xs-40">
                  {/* left section */}
                  <div className="col-md-12 col-lg-6 pt-5 pb-lg-5">
                    <h1 className="fs-48 mb-30 mb-xs-20 wow fadeInUp">
                      Get High Performaning&nbsp;
                      <span
                        className="mark-decoration-3-wrap wow fadeInUp color-secondary-1-white fs-48"
                        style={{
                          background:
                            "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: "bold",
                        }}
                      >
                        Website Development
                      </span>
                    </h1>
                    <p className="wow fadeInUp section-title-ex-small">
                      We design user-centric, high-converting interfaces that
                      elevate your brand and enhance customer engagement.
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
                  <div className="col-md-12 col-lg-6 text-center mt-smd-5">
                    <img
                      style={{ maxWidth: "90%", width: "auto", height: "90%" }}
                      src="/assets/images/services/website/webDesign.png"
                      layout="intrinsic"
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
                        className="section-title mb-0"
                      >
                        Why Our
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
                        Services?
                      </h2>
                    </div>
                    {/* <div className="col-md-6 col-lg-5 d-flex row">
                      <p className="services-5-text mb-0 text-white">
                        Choosing holapep means opting for a partner who provides
                        more than just WordPress expertise. We deliver a legacy
                        of trust, quality, and innovation across a range of
                        roles essential for modern digital solutions.
                      </p>
                    </div> */}
                  </div>

                  <div className="col-md-4 col-lg-6 d-flex align-items-end">
                    <div className="local-scroll text-md-end w-100">
                      {onePage ? (
                        <>
                          {" "}
                          {/* <a
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
                          </a> */}
                        </>
                      ) : (
                        <> </>
                      )}
                    </div>
                  </div>
                </div>
                {/* UiuxMain Grid */}

                <WebServices />
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
                        Our Web Development Process <br />
                        (Step-by-Step)
                      </h2>
                      {/* <p
                        style={{
                          color: "#7E7E7E",
                          fontSize: "16px !important",
                        }}
                        className="mb-0 mb-sm-20 text-center fw-bolder"
                      >
                        Here’s how easy it is to get started with holapep’s
                        staff augmentation services
                      </p> */}
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
                <WebProcess />
              </div>
            </section>

            <section
              className={`scrollSpysection py-5 ${
                dark ? "bg-dark-1 light-content" : ""
              } `}
              id="pricing"
            >
              <ServicePricing />
            </section>
            {/* why chose us  */}
            <section
              className={`scrollSpysection mt-5 service-large-sections`}
              id="about"
            >
              <div className="pt-md-5 container position-relative">
                <div className="row mb-xs-40 justify-items-center align-items-center">
                  {/* right section */}
                  <div className="col-md-10 col-lg-6 text-center">
                    <Image
                      // style={{marginTop:"3.7rem"}}
                      src="/assets/images/services/website/whyChose.svg"
                      width={780}
                      height={0}
                      className="wow fadeInUp"
                      alt="Image Description"
                    />
                  </div>
                  {/* left section */}
                  <div className="col-md-12 col-lg-6 pt-5 pb-lg-5">
                    <h1 className="section-title-small mb-30 mb-xs-20 wow fadeInUp">
                      Why Choose Us?
                    </h1>
                    <p className="wow fadeInUp work-descr">
                      We are committed to delivering designs that are not only
                      aesthetically pleasing but also functionally effective.
                    </p>
                    <div className="mb-4 wow fadeInUp d-flex align-items-center justify-items-center gap-3">
                      <img
                        src="/assets/images/services/check.png"
                        alt="save time"
                      />

                      <p
                        className="section-descr mb-0 "
                        style={{ color: "#1C1C57 !important" }}
                      >
                        <span className="fw-bold">
                          Expert UI/UX designers with years of experience
                        </span>
                      </p>
                    </div>
                    <div className="mb-4 wow fadeInUp d-flex align-items-center justify-items-center gap-3">
                      <img
                        src="/assets/images/services/check.png"
                        alt="save time"
                      />

                      <p
                        className="section-descr mb-0 "
                        style={{ color: "#1C1C57 !important" }}
                      >
                        <span className="fw-bold">
                          User-first design approach to maximize engagement.
                        </span>
                      </p>
                    </div>
                    <div className="mb-4 wow fadeInUp d-flex align-items-center justify-items-center gap-3">
                      <img
                        src="/assets/images/services/check.png"
                        alt="save time"
                      />

                      <p
                        className="section-descr mb-0 "
                        style={{ color: "#1C1C57 !important" }}
                      >
                        <span className="fw-bold">
                          {" "}
                          Mobile & web-optimized designs that convert.
                        </span>
                      </p>
                    </div>
                    <div className="mb-4 wow fadeInUp d-flex align-items-center justify-items-center gap-3">
                      <img
                        src="/assets/images/services/check.png"
                        alt="save time"
                      />

                      <p
                        className="section-descr mb-0 "
                        style={{ color: "#1C1C57 !important" }}
                      >
                        <span className="fw-bold">
                          Data-driven design decisions powered by analytics.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
                      We believe in making the best work, and being the best to
                      work with.
                    </h3>
                  </div>
                </div>

                <Portfolio />
              </div>
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
