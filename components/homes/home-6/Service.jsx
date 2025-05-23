import { services3, services3a } from "@/data/services";
import Image from "next/image";
import Link from "next/link";
const ServiceItem = ({ src, title, text, link }) => (
  <>
    <div className="col-md-6 col-lg-3 d-flex align-items-stretch">
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
            <div className="w-100 service-height">
              <h4 className="services-6-title text-white pt-4">{title}</h4>
              <p
                style={{
                  fontWeight: "300",
                  lineHeight: "25px",
                  fontSize: "14px",
                }}
                className="services-5-text text-white"
              >
                {text}
              </p>
              <Link
                href={link} // Use dynamic link here
                className=""
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

const ServiceItem2 = ({ src, title, text, link }) => (
  <>
    <div className="col-md-6 d-flex align-items-stretch">
      <div
        style={{
          backgroundColor: "#051D55",
          border: "1px solid rgb(95, 35, 186)",
          boxShadow: "0px 10px 30px 10px rgba(63, 51, 223, 0.45)",
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
              <h4 className="services-6-title text-white pt-4">{title}</h4>
              <p
                style={{
                  fontWeight: "300",
                  lineHeight: "25px",
                  fontSize: "14px",
                }}
                className="services-5-text mb-4 text-white"
              >
                {text}
              </p>
              <Link
                href={link} // Use dynamic link here
                className=""
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
          <ServiceItem key={index} {...service} />
        ))}
        {services3a.map((service, index) => (
          <ServiceItem2 key={index} {...service} />
        ))}
        {/* End Services Item */}
      </div>
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
