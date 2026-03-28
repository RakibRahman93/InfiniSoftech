"use client";

import AnimatedText from "@/components/common/AnimatedText";
import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import FooterTop from "@/components/homes/home-6/FooterTop";
import Portfolio from "@/components/homes/home-6/Portfolio";
import { features2 } from "@/data/features";
import { fancyMultipage } from "@/data/menu";
import { portfolios11 } from "@/data/portfolio";
import Image from "next/image";
import { useMemo, useState } from "react";
import Modal from "react-modal";

const onePage = false;
const dark = false;

// Modal.setAppElement("#__next"); // Set root app element for accessibility

// export const metadata = {
//   title:
//     "Case Studies || Websites & Mobile Apps",
//   description:
//     "Infinisoft Technology case studies",
// };
export default function CorporatePortfolioPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAsset, setModalAsset] = useState(null);

  const caseStudyItems = useMemo(
    () => [
      {
        id: "tgp-case-study-video",
        imageUrl: "/assets/images/demo-fancy/portfolio/TGP/tgpCover.png",
        title: "Those Guys Print Case Study",
        number: "Video",
        description: "Video walkthrough",
        summary:
          "A focused walkthrough of the TGP redesign, showing how clearer structure, branding, and messaging shaped a stronger website experience.",
        metaChip: "Video Case Study",
        metaDate: "2025",
        videoUrl: "/assets/case-studies/tgp-casestudy.mp4",
        ctaLabel: "Watch Case Study",
      },
      ...portfolios11.map((item) => ({
        ...item,
        metaChip: item.metaChip || "PDF Case Study",
        metaDate: item.metaDate || "2025",
        summary:
          item.summary ||
          item.Description ||
          "A focused breakdown of the project goals, design process, and outcomes from strategy through execution.",
        ctaLabel: item.ctaLabel || "View Case Study",
      })),
    ],
    []
  );

  // useEffect(() => {
  //   Modal.setAppElement("#__next"); // Ensure the app element is set after DOM is loaded
  // }, []);

  const openModal = (asset) => {
    setModalAsset(asset);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAsset(null);
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
                    {caseStudyItems.map((elm, i) => {
                      const cardContent = (
                        <>
                          <div className="case-study-card__image-wrap">
                            <div className="wow fadeIn" data-wow-delay="1s">
                              <Image
                                src={elm.imageUrl}
                                width={660}
                                height={472}
                                alt={elm.title}
                                className="case-study-card__image"
                              />
                            </div>
                            {elm.videoUrl ? (
                              <div className="case-study-video-badge">
                                <span className="case-study-video-badge__icon" />
                                <span>{elm.ctaLabel || "Watch Video"}</span>
                              </div>
                            ) : null}
                          </div>
                          <div className="case-study-card__body">
                            <div className="case-study-card__meta-row">
                              <span className="case-study-card__meta-chip">
                                {elm.metaChip}
                              </span>
                              <span className="case-study-card__meta-date">
                                {elm.metaDate}
                              </span>
                            </div>
                            <h3 className="case-study-card__title">
                              <span>{elm.title}</span>
                            </h3>
                            <div className="case-study-card__descr">
                              {elm.description}
                            </div>
                            <p className="case-study-card__summary">
                              {elm.summary}
                            </p>
                            <div className="case-study-card__cta-row">
                              <span className="case-study-card__cta-pill">
                                {elm.ctaLabel}
                              </span>
                            </div>
                          </div>
                        </>
                      );

                      return (
                        <div
                          key={elm.id || i}
                          className="col-md-6 col-lg-4 mt-50 mt-sm-40"
                        >
                          {elm.videoUrl ? (
                            <button
                              type="button"
                              onClick={() => openModal(elm)}
                              className="portfolio-5-link portfolio-5-link-button"
                            >
                              {cardContent}
                            </button>
                          ) : (
                            <a
                              href={`/view-pdf-single?url=${encodeURIComponent(
                                elm.pdfUrl
                              )}`}
                              rel="noopener noreferrer"
                              className="portfolio-5-link"
                            >
                              {cardContent}
                            </a>
                          )}
                        </div>
                      );
                    })}
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
                        We believe in making the best work, and being the best
                        to work with.
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
                contentLabel={modalAsset?.title || "View Case Study"}
                className="custom-modal"
                overlayClassName="custom-modal-overlay"
              >
                <button onClick={closeModal} className="close-button">
                  Close
                </button>
                {modalAsset?.videoUrl && (
                  <div className="case-study-video-modal">
                    <video
                      src={modalAsset.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="case-study-video-modal__player"
                    />
                  </div>
                )}
              </Modal>
              {/* Styles for modal */}
            </>
          </main>
          <hr className={`mt-0 mb-0 ${dark ? "white" : ""} `} />
          <FooterTop />
          <footer
            className="footer bg-dark-1 light-content py-5"
            style={{
              background: "linear-gradient(220deg, #621ABE 0%, #051D55 50%)",
            }}
           >
            <Footer6 />
          </footer>
          {/* <footer className="bg-dark-1 light-content pb-50 pt-100">
            <Footer6 />
          </footer> */}
        </div>{" "}
        <style jsx>{`
          .portfolio-5-link-button {
            width: 100%;
            padding: 0;
            border: none;
            background: transparent;
            text-align: left;
            cursor: pointer;
          }

          .portfolio-5-link-button,
          .portfolio-5-link {
            display: flex;
            flex-direction: column;
            height: 100%;
            background: #ffffff !important;
            border: none;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: var(--box-shadow-block);
            text-decoration: none !important;
            font-family: Poppins, sans-serif;
          }

          .case-study-card__image-wrap {
            position: relative;
            flex-shrink: 0;
          }

          .case-study-card__image {
            display: block;
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 11;
            object-fit: cover;
          }

          .case-study-card__body {
            display: flex;
            flex: 1;
            flex-direction: column;
            min-height: 250px;
            padding: 20px 22px 22px;
            background: #ffffff;
            font-family: Poppins, sans-serif;
          }

          .case-study-card__meta-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 14px;
            color: #5f6f91;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          .case-study-card__meta-chip {
            display: inline-flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 999px;
            background: #eef3ff;
            color: #31436f;
            letter-spacing: 0.08em;
            line-height: 1;
          }

          .case-study-card__meta-date {
            flex-shrink: 0;
          }

          .case-study-card__title {
            margin-bottom: 8px !important;
            color: #1c1c57;
            font-weight: 600;
            line-height: 1.12;
          }

          .case-study-card__descr {
            margin-bottom: 10px;
            color: #536174;
            font-size: 15px;
            font-weight: 500;
            line-height: 1.4;
          }

          .case-study-card__summary {
            margin-bottom: 20px;
            color: #6c7696;
            font-size: 14px;
            line-height: 1.55;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .case-study-card__cta-row {
            margin-top: auto;
          }

          .case-study-card__cta-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: 3rem;
            padding: 0 20px;
            border-radius: 12px;
            background: linear-gradient(90deg, #e75778 0%, #8876ff 100%);
            color: #ffffff;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 0.01em;
            box-shadow: 0 14px 30px rgba(100, 74, 223, 0.18);
          }

          .portfolio-5-link-button:hover .case-study-video-badge,
          .portfolio-5-link:hover .case-study-video-badge {
            transform: translateY(-2px);
            box-shadow: 0 18px 30px rgba(95, 86, 210, 0.24);
          }

          .case-study-video-badge {
            position: absolute;
            left: 20px;
            bottom: 20px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 10px 16px;
            border-radius: 999px;
            background: rgba(17, 24, 39, 0.88);
            color: #fff;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.02em;
            backdrop-filter: blur(12px);
            transition:
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .case-study-video-badge__icon {
            position: relative;
            width: 22px;
            height: 22px;
            border-radius: 999px;
            background: linear-gradient(135deg, #e75778 0%, #8876ff 100%);
            box-shadow: 0 10px 18px rgba(104, 90, 211, 0.24);
          }

          .case-study-video-badge__icon::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-35%, -50%);
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 7px solid #fff;
          }

          .case-study-video-modal {
            margin-top: 24px;
          }

          .case-study-video-modal__player {
            display: block;
            width: 100%;
            max-height: 72vh;
            border-radius: 18px;
            background: #000;
            box-shadow: 0 18px 40px rgba(17, 24, 39, 0.24);
          }

          @media (max-width: 767.98px) {
            .case-study-card__body {
              min-height: 220px;
              padding: 16px 16px 18px;
            }

            .case-study-card__meta-row {
              margin-bottom: 12px;
              font-size: 11px;
            }

            .case-study-card__title {
              font-size: 22px !important;
              line-height: 1.08 !important;
              margin-bottom: 6px !important;
            }

            .case-study-card__descr {
              font-size: 13px !important;
              line-height: 1.45 !important;
            }

            .case-study-card__summary {
              margin-bottom: 16px;
              font-size: 13px;
              line-height: 1.5;
            }

            .case-study-card__cta-pill {
              min-height: 2.85rem;
              font-size: 14px;
            }

            .case-study-video-badge {
              left: 14px;
              right: 14px;
              bottom: 14px;
              justify-content: center;
              font-size: 11px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
