import { techSolutionsData } from "@/data/services";
const TechSolutions = ({ src, title, text }) => (
  <>
    <div className="col-md-3">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "280px",
          background:
            "linear-gradient(white, white) padding-box, linear-gradient(90deg, #E75778 0%, #8876FF 100%) border-box",
          border: "1px solid transparent", // Transparent border to allow gradient visibility
          borderRadius: "8px", // Optional for rounded corners
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
                className="pt-4 text-center"
                style={{ fontSize: "19px", color: "#051D55" }}
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
        {techSolutionsData.map((service, index) => (
          <TechSolutions key={index} {...service} />
        ))}
      </div>
    </>
  );
}
