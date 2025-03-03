"use client";

import { ServicePricingData } from "@/data/pricing"; // Ensure the path is correct
import { useState } from "react";

export default function ServicePricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="container">
      <div className="row mb-50 mb-sm-30">
        <div className="col-md-8 offset-md-2 text-center">
          <h2 className="section-caption">Pricing</h2>
          <h3 className="section-title mb-10">Tech Staffing Cost</h3>
          <p
            className="services-5-text mb-0"
            style={{ fontWeight: "300", lineHeight: "25px" }}
          >
            Offshore tech staffing often comes with hidden fees, leaving clients
            frustrated and uncertain. At Infinisoft Technology , we do things
            differently. Our pricing is clear, fair, and transparent—because we
            believe that trust and honesty should be at the core of every
            partnership. No surprises, just reliable, top-tier talent. 🚀
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-10 offset-xl-1">
          {/* Nav Tabs */}
          <div className="mb-20 mb-sm-20 text-center d-flex justify-content-center">
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
                  Annual
                </a>
              </li>
            </ul>
          </div>
          {/* End Nav Tabs */}

          {/* Pricing Plans */}
          <div className="tab-content tpl-minimal-tabs-cont position-relative">
            <div className="tab-pane show active">
              <div className="row mt-n30">
                {ServicePricingData.map((plan, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card border-1 shadow p-4 rounded-3 mb-20">
                      <div className="d-flex align-items-center flex-row mb-20">
                        <span
                          className="fw-bold uppercase me-4"
                          style={{ fontSize: "19px" }}
                        >
                          {plan.title}
                        </span>
                        {plan.badge && (
                          <span
                            className="badge text-white p-2 rounded-pill"
                            style={{
                              backgroundColor: "#E25B72",
                              color: "white",
                            }}
                          >
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-muted fs-6">{plan.description}</p>
                      <div className="d-flex align-items-end">
                        <span className="fs-2 fw-bold mb-30">$</span>
                        <span className="fw-bold" style={{ fontSize: "48px" }}>
                          {isYearly ? plan.price * 12 : plan.price}
                        </span>
                        <span className="fs-6 text-muted ms-2">
                          {isYearly ? "per year" : "per month"}
                        </span>
                      </div>

                      {/* Dynamic Button */}
                      {index === 0 ? (
                        <button
                          className="btn btn-transparent w-50 mt-3 border-1 rounded-pill"
                          style={{ background: "#F6F6F6" }}
                          disabled
                        >
                          Current Plan
                        </button>
                      ) : (
                        <button
                          className="btn w-50 mt-3"
                          style={{
                            background:
                              "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                            color: "transparent",
                            fontWeight: "bold",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                            cursor: "pointer",
                            border: "1px solid transparent",
                            borderRadius: "50px",
                            borderImage:
                              "linear-gradient(90deg, #E75778 0%, #8876FF 100%) 1",
                            backgroundImage:
                              "linear-gradient(90deg, #E75778 0%, #8876FF 100%)", // Gradient for text
                            WebkitBackgroundClip: "text", // Apply the background to the text
                          }}
                        >
                          Upgrade
                        </button>
                      )}

                      <h5 className="mt-4">Include</h5>
                      <p className="text-muted">
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
                            className="d-flex align-items-center opacity-75"
                          >
                            <i className="mi-close me-2 text-danger"></i>{" "}
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <button
                        className="btn btn-lg w-100 mt-3"
                        style={{
                          borderRadius: "50px",
                          background:
                            "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                          color: "white",
                          fontWeight: "bold",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                          cursor: "pointer",
                        }}
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* End Pricing Plans */}
        </div>
      </div>
    </div>
  );
}
