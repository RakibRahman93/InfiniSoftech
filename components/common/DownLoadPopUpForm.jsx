// components/common/DownLoadPopUpForm.jsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const DownLoadPopUpForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  // After the component mounts, wait 10 seconds then set isOpen=true
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 8000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
      style={{ zIndex: 99999,padding:"20px 10px" }}
    >
      <div
        className="bg-white rounded shadow-lg w-100 mx-3"
        style={{ maxWidth: "700px" }}
      >
        <div className="row g-0">
          {/* Left Side */}
          <div className="col-md-6 p-4 d-flex flex-column justify-content-center border-2 border-end">
            <h2
              className="fs-hero-desc mb-3 inter"
              style={{ color: "#1F2937" }}
            >
              Free Resource Download
            </h2>
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex align-items-center me-4 gap-3">
                <div className="">
                  <img src="./assets/images/figma.png" alt="figma" />
                </div>
                <div className="">
                  <div className="fw-semibold">UI Design Essentials</div>
                  <div className="text-muted small">
                    5 Landing Pages Template
                  </div>
                </div>
              </div>
            </div>
            <p className="fw-semibold mb-2">What you'll get:</p>
            <ul className="list-unstyled small mb-0 border-2 border-bottom pb-3">
              <li className="mb-1">
                ✅ 5 Fully‐Customizable Figma landing page templates
              </li>
              <li className="mb-1">✅ Just customize and ready for use</li>
              <li className="mb-1">✅ Directly use by changing texts</li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="col-md-6 p-4 bg-light d-flex flex-column align-items-center justify-content-center position-relative border-1 border-start">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-2"
              aria-label="Close"
              onClick={handleClose}
            ></button>
            <div className="mb-3" style={{ maxWidth: "200px", width: "100%" }}>
              <Image
                src="/assets/images/PopupImages.jpg"
                alt="figma"
                width={200}
                height={200}
                className="img-fluid"
              />
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc2IMkauYMSkmjpGzMHEG2okF883zmrp1XkVTsSUD4Jys4COw/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-100 rounded"
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <div className="d-flex justify-content-center align-items-center gap-2">
                <div>
                  <img src="./assets/images/Frame_icon.png" alt="figma" />
                </div>
                <div>Go to Figma Link</div>
              </div>
            </a>
            <p className="text-muted text-center small mt-2">
              Start designing and building with our ready-to-use templates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownLoadPopUpForm;
