"use client";

import { PopupWrapper } from "@/components/headers/components/PopupWrapper";
import { ServicePricingData } from "@/data/pricing"; // Ensure the path is correct
import { useState } from "react";

export default function ServicePricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="container">
      <div className="row mb-50 mb-sm-30">
        <div className="col-md-8 offset-md-2 text-center">
          <h2 className="section-caption mb-0">Pricing</h2>
          <h3 className="section-title-small mb-10">
            🚀 Invest in Great Design
          </h3>
          <p
            className="mb-0 portfolio-1-descr"
            style={{ fontWeight: "500", lineHeight: "25px" }}
          >
            UI/UX packages that drive clarity, usability, and growth.
          </p>
        </div>
      </div>

      <div className="row py-4">
        <div className="col-xl-12">
          {/* Nav Tabs */}
          {/* <div className="mb-20 mb-sm-20 text-center d-flex justify-content-center">
            <ul
              className="works-filter works-filter-fancy text-center mb-60 mb-sm-40 z-1 animate"
              role="tablist"
            >
              <li
                className="nav-item"
                onClick={() => setIsYearly(false)}
                role="presentation"
              >
                <a
                  href="#tab-monthly"
                  className={`nav-link ${!isYearly ? "active" : ""}`}
                  data-bs-toggle="tab"
                >
                  Monthly
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => setIsYearly(true)}
                role="presentation"
              >
                <a
                  href="#tab-annual"
                  className={`nav-link ${isYearly ? "active" : ""}`}
                  data-bs-toggle="tab"
                >
                  Yearly
                </a>
              </li>
              
            </ul>
          </div> */}
          {/* End Nav Tabs */}

          {/* Pricing Plans */}
          <div className="tab-content tpl-minimal-tabs-cont position-relative">
            <div className="tab-pane show active">
              <div className="row mt-n30">
                {ServicePricingData.map((plan, index) => {
                  const updatePrice = isYearly ? plan.price * 12 : plan.price;
                  return (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="card card-pricing p-4 rounded-3 mb-20">
                        <div className="d-flex align-items-center flex-row mb-20">
                          <span className="fw-bold me-4 fs-30">
                            {plan.title}
                          </span>
                          {plan.badge && (
                            <span
                              className={`badge text-white p-2 rounded-pill`}
                              style={{
                                backgroundColor: plan.bgColor,
                                color: "white",
                                fontSize: "10px",
                              }}
                            >
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-muted fs-6 m-h-30">
                          {plan.description}
                        </p>
                        <div className="d-flex align-items-end">
                          <span className="fs-2 fw-bold mb-30">$</span>
                          <span
                            className="fw-bold"
                            style={{ fontSize: "48px" }}
                          >
                            {isYearly ? plan.price * 12 : plan.price}
                          </span>
                          {/* <span className="fs-6 text-muted ms-2">
                            {isYearly ? "per year" : "per month"}
                          </span> */}
                        </div>

                        <h5
                          className="mt-4"
                          style={{ fontWeight: "500", color: "#464646" }}
                        >
                          Includes
                        </h5>
                        <p className="work-descr" style={{ color: "#536174" }}>
                          Everything you get in this plan
                        </p>

                        <ul className="list-unstyled">
                          {plan.features.map((feature, i) => (
                            <li
                              key={i}
                              className="d-flex align-items-center mb-10"
                            >
                              <i className="mi-check me-2 text-success"></i>{" "}
                              {feature}
                            </li>
                          ))}
                          {plan.disabledFeatures?.map((feature, i) => (
                            <li
                              key={i}
                              className="d-flex align-items-baseline opacity-75"
                            >
                              <i className="mi-circle-error me-2 text-danger"></i>{" "}
                              <span> {feature}</span>
                            </li>
                          ))}
                        </ul>

                        <PopupWrapper
                          className="get-started-btn"
                          buttonText="Get Started"
                          plan={{ ...plan, price: updatePrice }}
                          isFullWidth={true}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* End Pricing Plans */}
        </div>
      </div>
    </div>
  );
}
