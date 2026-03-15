import { twoService4 } from "@/data/services";
import Image from "next/image";
const serviceOverrides = {
  "Scalable Development": {
    text: "Built to stay fast, responsive, and ready for future growth.",
  },
  "Tailored For Growth": {
    text: "Every solution is shaped around your business goals, not a generic template.",
  },
  "Performance That Converts": {
    text: "We focus on speed, usability, and clarity so more visitors take action.",
  },
  "Reliable Support": {
    text: "You get guidance after launch so the product keeps performing smoothly.",
  },
};

const ServiceItem = ({ src, title, text }) => (
  <>
    <div className="col-md-3 d-flex align-items-stretch">
      <div
        style={{
          backgroundColor: "#051D55",
          border: "1px solid rgb(95, 35, 186)",
          boxShadow: "-5px 0px 30px 10px rgba(63, 51, 223, 0.45)",
        }}
        className="services-5-item d-flex align-items-stretch text-center text-xl-start"
      >
        <div className="wow fadeInUpShort">
          <div className="">
            <Image
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
          <div className="services-5-body d-flex align-items-center">
            <div className="w-100">
              <h4 className="services-5-title text-white pt-4">{title}</h4>
              <p
                style={{ fontWeight: "300", lineHeight: "25px" }}
                className="services-5-text text-white mb-0"
              >
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const ServiceItem2 = ({ src, title, text }) => {
  const content = serviceOverrides[title] || { text };

  return (
    <div className="col-6 col-md-6 d-flex align-items-stretch">
      <div
        style={{
          backgroundColor: "#051D55",
          border: "1px solid rgb(95, 35, 186)",
          boxShadow: "0px 10px 30px 10px rgba(63, 51, 223, 0.45)",
        }}
        className="services-5-item why-choose-card d-flex align-items-stretch text-center text-xl-start"
      >
        <div className="wow fadeInUpShort">
          <div className="">
            <Image
              className="why-choose-card-icon"
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
          <div className="services-5-body d-flex align-items-center">
            <div className="w-100">
              <h4
                className="services-6-title why-choose-card-title text-white pt-4"
              >
                {title}
              </h4>
              <p
                style={{ fontWeight: "300" }}
                className="services-5-text why-choose-card-text mb-0 text-white"
              >
                {content.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function twoService() {
  return (
    <>
      <div className="row services-5-grid">
        {/* Services Item */}

        {twoService4.map((service, index) => (
          <ServiceItem2 key={index} {...service} />
        ))}
        {/* End Services Item */}
      </div>
      <style jsx global>{`
        .why-choose-card .why-choose-card-title {
          font-size: 15px;
          line-height: 1.2;
        }

        .why-choose-card .why-choose-card-text {
          font-size: 11px;
          line-height: 1.45;
        }

        @media (min-width: 768px) {
          .why-choose-card .why-choose-card-title {
            font-size: 23px;
          }

          .why-choose-card .why-choose-card-text {
            font-size: 14px;
            line-height: 25px;
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
