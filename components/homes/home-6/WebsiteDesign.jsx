import { uiuxhireData,uiuxhireDatasecond } from "@/data/services";
const UiuxHireData = ({ src, title, text }) => (
  <>
    <div className="col-lg-4 col-md-6">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
          border: "1px solid #fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 18px rgba(49, 49, 49, 0.25)",
        }}
        className="services-5-item d-flex text-left text-xl-left"
      >
        <div className="wow fadeInUpShort d-flex lg:flex-row flex-column">
          <div className="text-left">
            <img
              src={src}
              alt="Image Description"
              className="img-fluid text-left"
            />
          </div>
          <div className="services-5-body d-flex align-items-left">
            <div className="w-100">
              <h4
                className="pt-4 text-left services-6-title"
                style={{ color: "#051D55" }}
              >
                {title}
              </h4>
              <p
                className="services-5-text mb-0"
                style={{ fontSize: "14px", color: "#7E7E7E" }}
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
const Uiuxsolution = ({ src, title, text }) => (
  <>
    <div className="col-lg-6 col-md-6 d-flex align-items-stretch">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
          border: "1px solid #fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 18px rgba(49, 49, 49, 0.25)",
        }}
        className="services-5-item d-flex text-left text-xl-left"
      >
        <div className="wow fadeInUpShort d-flex lg:flex-row flex-column">
          <div className="text-left">
            <img
              src={src}
              alt="Image Description"
              className="img-fluid text-left"
            />
          </div>
          <div className="services-5-body d-flex align-items-left">
            <div className="w-100">
              <h4
                className="pt-4 text-left services-6-title"
                style={{ color: "#051D55" }}
              >
                {title}
              </h4>
              <p
                className="services-5-text mb-0"
                style={{ fontSize: "14px", color: "#7E7E7E" }}
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

export default function WebsiteDesign() {
  return (
    <>
      <div className="row services-5-grid">
        {/* Services Item */}
        {uiuxhireData.map((service, index) => (
          <UiuxHireData key={index} {...service} />
        ))}
        {uiuxhireDatasecond.map((service, index) => (
          <Uiuxsolution key={index} {...service} />
        ))}
      </div>
    </>
  );
}
