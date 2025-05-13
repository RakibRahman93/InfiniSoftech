import { reviews } from "@/data/features";
import Image from "next/image";
import Link from "next/link";

const PricingHero = () => {
  return (
    <>
      <div
        className="position-relative d-flex align-items-center pt-140 pt-sm-120"
        style={{ minHeight: "100vh" }}
      >
        {/* Home Section Content */}
        <div className="home-content text-start">
          <div className="row" style={{ justifyContent: "space-between" }}>
            {/* Home Section Text */}
            <div className="col-md-10 offset-md-1 offset-lg-1 col-xl-10 d-flex align-items-center mb-md-60 mb-sm-30">
              <div className="w-100 text-center container">
                <h1 className="hs-title-10 mb-30">
                  <span
                    className="wow charsAnimIn fadeInUp"
                    data-splitting="chars"
                  >
                    <span style={{ fontWeight: "bold", color: "#333" }}>
                      Choose the Perfect Plan for <br />
                      <span className="mark-decoration-3-wrap color-secondary-1-white"></span>{" "}
                    </span>{" "}
                    <span
                      className="mark-decoration-3-wrap wow fadeInUp color-secondary-1-white"
                      style={{
                        background:
                          "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bold",
                      }}
                    >
                      Your Business
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
                  Whether you're launching a new startup or upgrading your
                  existing brand, our website and app packages are designed to
                  deliver fast, professional, and affordable digital solutions —
                  all backed by local support and transparent pricing.
                </p>
                {/* add reviews section start */}
                <div className="container text-center mt-4 wow fadeInUp">
                  {/* Profile Images with Overlapping */}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ position: "relative" }}
                  >
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

                  {/* Yellow Stars */}
                  <div className="mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{ color: "#FFFF00", fontSize: "24px" }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <div
                    className="local-scroll wow fadeInUp wch-unset"
                    data-wow-delay="0.7s"
                    data-wow-duration="1.2s"
                  >
                    <Link
                      href={"/pricing/agencyPricing"}
                      className="btn btn-mod btn-color btn-border-c btn-white-c btn-large btn-round mb-xs-10 lightbox mfp-iframe"
                      data-btn-animate="y"
                      style={{
                        borderRadius: "50px",
                        // height: "2.7rem",
                        minWidth: "14rem",
                        background:
                          "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                        border: "none",
                        color: "white", // Ensures text remains visible
                        fontSize: "14px",
                        fontWeight: "bold",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                        cursor: "pointer",
                      }}
                    >
                      <span className="btn-animate-y">
                        <span
                          className="btn-animate-y-1"
                          style={{
                            fontFamily: "Raleway, sans-serif",
                            fontWeight: "bold",
                          }}
                        >
                          Agency Pricing
                        </span>
                        <span
                          className="btn-animate-y-2"
                          aria-hidden="true"
                          style={{
                            fontFamily: "Raleway, sans-serif",
                            fontWeight: "bold",
                          }}
                        >
                          Agency Pricing
                        </span>
                      </span>
                    </Link>{" "}
                  </div>
                </div>
                <p
                  style={{ justifySelf: "center", color: "#9E9E9E" }}
                  className="col-lg-6 section-descr mb-40 wow fadeInUp pt-3"
                  data-wow-delay="0.6s"
                  data-wow-duration="1.2s"
                  data-wow-offset={0}
                >
                  If you are an agency, checkout our exclusive pricing <br />{" "}
                  specially catered for agencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingHero;
