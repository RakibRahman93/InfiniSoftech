import { services3, services3a } from "@/data/services";
import Image from "next/image";
import Link from "next/link";
const ServiceItem = ({ src, title, text, link, animationClass, delay }) => (
  <>
    <div style={{padding:4}} className="col-6 col-md-6 col-lg-3 d-flex align-items-stretch">
      <div
        style={{
          padding: "24px 22px",
          background:
            "linear-gradient(180deg, rgba(10, 31, 92, 0.96) 0%, rgba(8, 24, 74, 0.98) 100%)",
          border: "1px solid rgba(136, 118, 255, 0.28)",
          boxShadow: "0 18px 38px rgba(10, 18, 44, 0.22)",
        }}
        className="services-5-item service-feature-card d-flex align-items-stretch text-start"
      >
        <div
          className={`p-0 wow ${animationClass} d-flex flex-column w-100`}
          data-wow-delay={delay}
        >
          <div className="service-feature-icon-wrap">
            <Image
              className="service-feature-icon"
              style={{
                border: "1px solid rgb(95, 35, 186)",
                padding: "1em",
                borderRadius: "9px",
              }}
              src={src}
              width={90}
              height={198}
              alt="Image Description"
            />
          </div>
          <div className="services-5-body d-flex align-items-center flex-grow-1">
            <div className="w-100 service-height d-flex flex-column h-100">
              <h4
                className="services-6-title pt-4"
                style={{ color: "#ffffff" }}
              >
                {title}
              </h4>
              <p
                style={{
                  fontWeight: "300",
                  textAlign: "left",
                  color: "rgba(240, 243, 255, 0.84)",
                  // lineHeight: "18px",
                  // fontSize: "14px",
                }}
                className="services-5-text services-5-text-responsive"
              >
                {text}
              </p>
              <Link
                href={link} // Use dynamic link here
                className="service-feature-link"
                style={{
                  background:
                    "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const ServiceItem2 = ({ src, title, text, link, animationClass, delay }) => (
  <>
    <div style={{padding:4}} className="col-6 col-md-6 col-lg-3 d-flex align-items-stretch">
      <div
        style={{
          padding: "24px 22px",
          background:
            "linear-gradient(180deg, rgba(10, 31, 92, 0.96) 0%, rgba(8, 24, 74, 0.98) 100%)",
          border: "1px solid rgba(136, 118, 255, 0.28)",
          boxShadow: "0 18px 38px rgba(10, 18, 44, 0.22)",
        }}
        className="services-5-item service-feature-card d-flex align-items-stretch text-start"
      >
        <div
          className={`wow ${animationClass} d-flex flex-column w-100`}
          data-wow-delay={delay}
        >
          <div className="service-feature-icon-wrap">
            <Image
              className="service-feature-icon"
              style={{
                border: "1px solid rgb(95, 35, 186)",
                padding: "1em",
                borderRadius: "9px",
              }}
              src={src}
              width={90}
              height={198}
              alt="Image Description"
            />
          </div>
          <div className="services-5-body d-flex align-items-center flex-grow-1">
            <div className="w-100 d-flex flex-column h-100">
              <h4
                className="services-6-title pt-4"
                style={{ color: "#ffffff" }}
              >
                {title}
              </h4>
              <p
                style={{
                  fontWeight: "300",
                  textAlign: "left",
                  color: "rgba(240, 243, 255, 0.84)",
                  // lineHeight: "18px",
                  // fontSize: "14px",
                }}
                className="services-5-text services-5-text-responsive mb-4"
              >
                {text}
              </p>
              <Link
                href={link} // Use dynamic link here
                className="service-feature-link"
                style={{
                  background:
                    "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
export default function Service() {
  return (
    <>
      <div className="row services-5-grid">
        {/* Services Item */}
        {services3.map((service, index) => (
          <ServiceItem
            key={index}
            {...service}
            animationClass="fadeInUp"
            delay={`${0.08 + index * 0.08}s`}
          />
        ))}
        {services3a.map((service, index) => (
          <ServiceItem2
            key={index}
            {...service}
            animationClass="fadeInUp"
            delay={`${0.08 + (index + services3.length) * 0.08}s`}
          />
        ))}
        {/* End Services Item */}
      </div>
      <style jsx global>{`
        @media (max-width: 767.98px) {
          .service-feature-card {
            padding: 16px 14px !important;
          }

          .service-feature-icon {
            width: 68px !important;
            height: auto !important;
            padding: 0.75em !important;
          }

          .service-feature-link,
          .service-feature-link:hover {
            padding-top: 12px;
          }
        }
      `}</style>
      {/* End Services Grid */}
      {/* <div className="small text-gray text-center mt-60 mt-sm-40">
        Illustrations by{" "}
        <a
          href="https://www.instagram.com/b0g3nta"
          rel="noopener nofollow"
          target="_blank"
        >
          bogenta
        </a>{" "}
        from{" "}
        <a
          href="https://icons8.com/illustrations"
          rel="noopener nofollow"
          target="_blank"
        >
          Ouch
        </a>
        !
      </div> */}{" "}
    </>
  );
}
