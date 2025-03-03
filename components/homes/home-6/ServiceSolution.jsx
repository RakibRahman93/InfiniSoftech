import { serviceSolution } from "@/data/services";
const ServiceSolution = ({ src, title, text }) => (
  <>
    <div className="col-md-3">
      <div
        style={{
          backgroundColor: "#051D55",
          border: "1px solid rgb(95, 35, 186)",
          boxShadow: "-5px 0px 30px 10px rgba(63, 51, 223, 0.45)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "280px",
        }}
        className="services-5-item d-flex text-center text-xl-start"
      >
        <div className="wow fadeInUpShort d-flex lg:flex-row flex-column justify-center align-items-center">
          <div className="text-center">
            <img
              src={src}
              alt="Image Description"
              className="img-fluid text-center"
            />
          </div>
          <div className="services-5-body d-flex align-items-center">
            <div className="w-100">
              <h4
                className="text-white pt-4 text-center"
                style={{ fontSize: "19px" }}
              >
                {title}
              </h4>
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
        {serviceSolution.map((service, index) => (
          <ServiceSolution key={index} {...service} />
        ))}
      </div>
    </>
  );
}
