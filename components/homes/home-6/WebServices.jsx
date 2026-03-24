import { webServicesData } from "@/data/services";
import Image from "next/image";
const ServiceMain = ({ src, title, text }) => (
  <>
    <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
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
              <h4 className="services-web-title text-white pt-4">{title}</h4>
              <p
                style={{
                  fontWeight: "300",
                  lineHeight: "25px",
                  fontSize: "14px",
                }}
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

const ServiceItem2 = ({ src, title, text }) => (
  <>
    <div className="col-lg-6 col-md-6 d-flex align-items-stretch">
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
                className="services-5-text mb-0 text-white"
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
export default function WebServices() {
  return (
    <>
      <div className="row services-5-grid">
        {/* Services Item */}
        {webServicesData.map((service, index) => (
          <ServiceMain key={index} {...service} />
        ))}

        {/* End Services Item */}
      </div>
    </>
  );
}
