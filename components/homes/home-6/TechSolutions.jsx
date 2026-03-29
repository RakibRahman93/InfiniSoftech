"use client";

import { techSolutionsData } from "@/data/services";
const TechSolutions = ({ src, title, text, animationClass, delay }) => (
  <>
    <div className="col-4 col-md-4 col-lg-2 d-flex">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(white, white) padding-box, linear-gradient(90deg, #E75778 0%, #8876FF 100%) border-box",
          border: "1px solid transparent", // Transparent border to allow gradient visibility
          borderRadius: "8px", // Optional for rounded corners
        }}
        className="services-5-item tech-solution-card d-flex text-center text-xl-start w-100"
      >
        <div
          className={`wow ${animationClass} d-flex lg:flex-row flex-column justify-center align-items-center w-100`}
          data-wow-delay={delay}
        >
          <div className="text-center">
            <img
              style={{ maxWidth: "40%" }}
              src={src}
              alt="Image Description"
              className="img-fluid text-center tech-solution-icon"
            />
          </div>
          <div className="services-5-body d-flex align-items-center">
            <div className="w-100">
              <h4
                className="pt-4 text-center tech-solution-title"
                style={{ fontSize: "15px", color: "#051D55" }}
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
      <div className="row services-5-grid tech-solutions-grid">
        {/* Services Item */}
        {techSolutionsData.map((service, index) => (
          <TechSolutions
            key={index}
            {...service}
            animationClass={index % 2 === 0 ? "fadeInLeftShort" : "fadeInRightShort"}
            delay={`${0.08 + index * 0.07}s`}
          />
        ))}
      </div>
      <style jsx global>{`
        .tech-solutions-grid .tech-solution-card {
          min-height: 168px;
        }

        .tech-solutions-grid .tech-solution-title {
          margin-bottom: 0;
        }

        @media (max-width: 767.98px) {
          .tech-solutions-grid {
            row-gap: 8px !important;
          }

          .tech-solutions-grid .tech-solution-card {
            min-height: 104px;
            padding: 10px 6px;
            border-radius: 10px !important;
          }

          .tech-solutions-grid .tech-solution-icon {
            max-width: 30px !important;
          }

          .tech-solutions-grid .tech-solution-title {
            padding-top: 8px !important;
            font-size: 11px !important;
            line-height: 1.15;
          }
        }
      `}</style>
    </>
  );
}
