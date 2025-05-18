"use client";

import { PopupWrapper } from "@/components/headers/components/PopupWrapper";
import { ServicePricingData } from "@/data/pricing"; // Ensure the path is correct
import { useState } from "react";

export default function ServicePricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="container new-theme">
      <div className="row mb-50 mb-sm-30">
        <div className="col-md-8 offset-md-2 text-center">
          <h2 className="section-caption mb-0">Pricing</h2>

          <div className="d-flex">
            <img
              src="/assets/images/rocket.png"
              alt="rocket"
              className="me-2 img-fluid"
              style={{ height: "50px" }}
            />
            <h3 className="section-title-small mb-10">
              WordPress Website Development Packages
            </h3>
          </div>
          <div className="d-flex text-center justify-content-center align-items-center">
            <img
              className="img-fluid"
              style={{ height: "40px" }}
              src="/assets/images/g_base.png"
              alt="g_base"
            />
            <p
              className="mb-0 portfolio-1-descr"
              style={{ fontWeight: "400", lineHeight: "25px" }}
            >
              We Offer 100% Money Back Guarantee On All Our Packages !
            </p>
          </div>
        </div>
      </div>

      <div className="row py-4">
        <div className="col-xl-12">
          {/* Pricing Plans */}
          <div className="tab-content tpl-minimal-tabs-cont position-relative">
            <div className="tab-pane show active">
              <div className="row mt-n30">
                {ServicePricingData.map((plan, index) => {
                  const updatePrice = isYearly ? plan.price * 12 : plan.price;

                  const isSecondColumn = index === 1;

                  return (
                    <div key={index} className="col-md-6 col-lg-4 new-theme">
                      <div
                        className="card wp-pricing p-4 mb-20"
                        style={{
                          background: isSecondColumn
                            ? "linear-gradient(135deg, #1a1a1a  0%, #5334A1  90%)"
                            : "white",
                          color: isSecondColumn ? "#fff" : "#000",
                          boxShadow: isSecondColumn
                            ? "0px 4px 19px 0px #000"
                            : "0px 0px 19px 0px #ccc",
                          borderRadius: "8px",
                          zIndex: 1,
                          border: "none",
                        }}
                      >
                        <div className="mb-20">
                          <div className="">
                            <img
                              className="img-fluid"
                              style={{ height: "40px" }}
                              src="/assets/images/g_base.png"
                              alt="g_base"
                            />
                          </div>
                          <div className="d-flex align-items-center flex-row justify-content-between">
                            <h4 className="fw-bold me-2 fs-30 Anton">
                              {plan.title}
                            </h4>
                            {plan.badge && (
                              <span
                                className={`badge text-white p-3 rounded-pill Anton`}
                                style={{
                                  background: Array.isArray(plan.bgColor)
                                    ? `linear-gradient(to bottom, ${plan.bgColor[0]} 0%, ${plan.bgColor[1]} 150%)`
                                    : plan.bgColor,
                                  color: "white",
                                  fontSize: "14px",
                                }}
                              >
                                {plan.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <p
                          className="fs-6 m-h-30"
                          style={{ color: isSecondColumn ? "#fff" : "#000" }}
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: plan.description._html,
                            }}
                          ></span>
                        </p>
                        <div className="d-flex align-items-end">
                          <span className="fs-2 fw-bold mb-30">$</span>
                          <span
                            className="fw-bold Anton"
                            style={{ fontSize: "48px" }}
                          >
                            {updatePrice}
                          </span>
                        </div>

                        <h5
                          className="mt-4"
                          style={{
                            fontWeight: "500",
                            color: isSecondColumn ? "#fff" : "#464646",
                          }}
                        >
                          Includes
                        </h5>
                        <p
                          className="work-descr"
                          style={{ color: isSecondColumn ? "#fff" : "#536174" }}
                        >
                          Everything you get in this plan
                        </p>

                        <ul className="list-unstyled">
                          {plan.features.map((feature, i) => (
                            <li
                              key={i}
                              className="d-flex align-items-center mb-10"
                            >
                              <i
                                className="mi-check me-2"
                                style={{
                                  color: isSecondColumn ? "#14F886" : "#159C7C",
                                }}
                              ></i>{" "}
                              {feature}
                            </li>
                          ))}
                          {plan.disabledFeatures?.map((feature, i) => (
                            <li
                              key={i}
                              className={`d-flex align-items-baseline mb-10 ${
                                isSecondColumn && feature ? "" : "opacity-75"
                              }`}
                            >
                              <i className="mi-circle-error me-2 text-danger"></i>{" "}
                              <span>{feature}</span>
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
