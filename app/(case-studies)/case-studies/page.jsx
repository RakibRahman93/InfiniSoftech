
"use client";

import AnimatedText from "@/components/common/AnimatedText";
import Footer4 from "@/components/footers/Footer4";
import Header4 from "@/components/headers/Header4";

const onePage = false;
const dark = false;
import Image from "next/image";
import { corporateMultipage, fancyMultipage } from "@/data/menu";
import Link from "next/link";
import { portfolios11 } from "@/data/portfolio";
import { features2 } from "@/data/features";
import Header6 from "@/components/headers/Header6";
import Portfolio from "@/components/homes/home-6/Portfolio";
import Footer6 from "@/components/footers/Footer6";
import { useState } from "react";
import Modal from "react-modal";

// Modal.setAppElement("#__next"); // Set root app element for accessibility

// export const metadata = {
//   title:
//     "Case Studies || Websites & Mobile Apps",
//   description:
//     "Infinisoft Technology case studies",
// };
export default function CorporatePortfolioPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState("");

  // useEffect(() => {
  //   Modal.setAppElement("#__next"); // Ensure the app element is set after DOM is loaded
  // }, []);

  const openModal = (pdfUrl) => {
    setCurrentPdf(pdfUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPdf("");
  };

  return (
    <>
      <div className="theme-fancy">
        <div className="page" id="top">
          <nav className="main-nav transparent stick-fixed wow-menubar wch-unset">
            <Header6 links={fancyMultipage} />
            
          </nav>

          <main id="main">
            <section className="page-section bg-gradient-gray-light-1 bg-scroll overflow-hidden">
              {/* Background Shape */}
              <div className="bg-shape-1 wow fadeIn">
                <Image
                  className="opacity-05"
                  src="/assets/images/demo-corporate/bg-shape-1.svg"
                  alt=""
                  width={1443}
                  height={844}
                />
              </div>
              {/* End Background Shape */}
              <div className="container position-relative pt-10 pt-sm-40 text-center">
                <div className="row">
                  <div className="col-lg-10 offset-lg-1">
                    <h1 className="hs-title-9 mb-10">
                      <span className="wow charsAnimIn" data-splitting="chars">
                        <AnimatedText text="Case" />
                        <span className="mark-decoration-3-wrap">
                          <AnimatedText text="Studies" />
                          <b
                            className="mark-decoration-3 wow scalexIn"
                            data-wow-delay="0.5s"
                          />
                        </span>
                      </span>
                    </h1>
                    <p
                      className="hs-descr mb-0 wow fadeIn"
                      data-wow-delay="0.2s"
                    >
                      In-Depth case studies showcasing our working process.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <>
              {/* Portfolio Section */}
              <section className="page-section" id="portfolio">
                <div className="container position-relative">
                  <div
                    className="row mb-70 mb-sm-50 wow fadeInUp"
                    data-wow-offset={0}
                  >
                    <div className="col-lg-5 mb-md-40">
                      <p className="section-descr mb-0">
                        We help brands and businesses stand out in the changing
                        digital landscape through immersive uiux.
                      </p>
                    </div>
                    <div className="col-lg-6 offset-lg-1 d-flex align-items-end pb-10">
                      {/* Features List */}
                      <div className="row mt-n10">
                        {/* Features List Item */}
                        {features2.map((elm, i) => (
                          <div key={i} className="col-sm-6 d-flex mt-10">
                            <div className="features-list-icon features-list-color-1">
                              <i className="mi-check" />
                            </div>
                            <div className="features-list-text">{elm.text}</div>
                          </div>
                        ))}
                        {/* End Features List Item */}

                        {/* End Features List Item */}
                      </div>
                      {/* End Features List */}
                    </div>
                  </div>
                  {/* Portfolio Grid */}
                  <div className="row mt-n50 mt-sm-n40">
                    {/* Portfolio Item */}
                    {portfolios11.map((elm, i) => (
                      console.warn(elm.pdfUrl),
                      <div key={i} className="col-md-6 col-lg-4 mt-50 mt-sm-40">
                        <a
                          href={`/view-pdf-single?url=${encodeURIComponent(elm.pdfUrl)}`}
                          // target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-5-link"
                        >
                          <div className="portfolio-5-image">
                            <div className="portfolio-5-image-bg wow scalexIn" />
                            <div className="wow fadeIn" data-wow-delay="1s">
                              <Image
                                src={elm.imageUrl}
                                width={660}
                                height={472}
                                alt="Image Description"
                              />
                            </div>
                          </div>
                          <h3 className="portfolio-5-title">
                            <span>{elm.title}</span>
                          </h3>
                          <div className="portfolio-5-number">{elm.number}</div>
                          <div className="portfolio-5-number-descr">
                            {elm.description}
                          </div>
                        </a>
                      </div>
                    ))}
                    {/* End Portfolio Item */}

                    {/* End Portfolio Item */}
                  </div>
                  {/* End Portfolio Grid */}
                </div>
              </section>
              {/* End Portfolio Section */}
              {/* Divider */}
              <hr className="mt-0 mb-0" />
              {/* End Divider */}
              {/* Call to Action Section */}
              <section
                      className={`page-section  scrollSpysection  ${
                        dark ? "bg-dark-1 light-content" : ""
                      } `}
                      id="portfolio"
                    >
                      <div className="container position-relative">
                        <div className="row mb-60 mb-sm-40">
                          <div className="col-md-8 offset-md-2 text-center">
                            <h2 className="section-caption-fancy mb-20 mb-xs-10">
                              Selected Work
                            </h2>
                            <h3 className="section-title mb-0">
                              We believe in making the best work, and being the best to work
                              with.
                            </h3>
                          </div>
                        </div>
              
                        <Portfolio />
                      </div>
                    </section>

                     {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="View PDF"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <button onClick={closeModal} className="close-button">
          Close
        </button>
        {currentPdf && (
          <iframe
            src={currentPdf + "#toolbar=0"}
            width="100%"
            height="600px"
            style={{ border: "none" }}
            title="PDF Viewer"
          />
        )}
      </Modal>
       {/* Styles for modal */}
      
             
            </>
          </main>
          <hr className={`mt-0 mb-0 ${dark ? "white" : ""} `} />
          <footer className="bg-dark-1 light-content pb-50 pt-100">
            <Footer6 />
          </footer>
        </div>{" "}
      </div>
    </>
  );
}
