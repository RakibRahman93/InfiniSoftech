"use client";

import { portfolios6 } from "@/data/portfolio";
import Image from "next/image";
import Link from "next/link";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useEffect, useState } from "react";

export default function Portfolio({
  limit,
  mobileLimit,
  desktopLimit,
  showViewAll = false,
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 992px)");

    const syncViewport = () => {
      setIsDesktop(mediaQuery.matches);
    };

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  const resolvedLimit =
    typeof desktopLimit === "number" || typeof mobileLimit === "number"
      ? isDesktop
        ? desktopLimit ?? limit
        : mobileLimit ?? limit
      : limit;

  const displayedProjects =
    typeof resolvedLimit === "number"
      ? portfolios6.slice(0, resolvedLimit)
      : portfolios6;

  return (
    <>
      <div className="position-relative">
        <div
          className="decoration-6 d-none d-sm-block opacity-055"
          data-rellax-y=""
          data-rellax-speed="-0.7"
          data-rellax-percentage="0.5"
        >
          <Image
            src="/assets/images/demo-fancy/decoration-6.svg"
            width={148}
            height={148}
            alt=""
          />
        </div>

        <ul
          className="works-grid work-grid-3 work-grid-gut work-grid-fancy"
          id="work-grid"
        >
          <Gallery>
            {displayedProjects.map((item, index) => (
              <li
                key={index}
                className={`work-item mix wow fadeInRightShort ${item.categories.join(" ")}`}
                data-wow-delay={`${0.08 + index * 0.08}s`}
              >
                <div>
                  {item.lightbox ? (
                    <Item
                      original={item.imgExtra}
                      thumbnail={item.imgSrc}
                      width={746}
                      height={524}
                    >
                      {({ ref, open }) => (
                        <a
                          onClick={open}
                          className={"work-lightbox-link mfp-image"}
                        >
                          <div className="work-img">
                            <Image
                              ref={ref}
                              src={item.imgSrc}
                              width={746}
                              height={524}
                              alt="Work Description"
                            />
                          </div>
                          <div className="work-intro text-start">
                            <h3 className="work-title">{item.title}</h3>
                            <div className="work-descr">{item.description}</div>
                          </div>
                        </a>
                      )}
                    </Item>
                  ) : (
                    <Link
                      href={`/portfolio-single/${item.id}`}
                      className={"work-ext-link"}
                    >
                      <div className="work-img">
                        <Image
                          src={item.imgSrc}
                          width={746}
                          height={524}
                          alt="Work Description"
                        />
                      </div>
                      <div className="work-intro text-start">
                        <div className="work-meta-row">
                          <span className="work-meta-chip">
                            {item.Client || item.categories?.[0] || "Project"}
                          </span>
                          <span className="work-meta-date">{item.Date || "Recent"}</span>
                        </div>
                        <h3 className="work-title">{item.title}</h3>
                        <div className="work-descr">{item.description}</div>
                        <p className="work-summary">
                          {item.Description || item.description}
                        </p>
                        <div className="work-cta-row">
                          <span className="work-cta-pill">View Project</span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </Gallery>
        </ul>
      </div>

      {showViewAll ? (
        <div className="text-center mt-40 mt-sm-30">
          <Link
            href="/portfolio"
            className="btn btn-mod btn-large btn-round"
            style={{
              borderRadius: "50px",
              padding: "13px 28px",
              minWidth: "15rem",
              fontFamily: "Raleway, sans-serif",
              fontWeight: "600",
              background: "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
              border: "none",
              color: "#fff",
              boxShadow: "0 16px 34px rgba(100, 74, 223, 0.18)",
            }}
          >
            View Full Portfolio
          </Link>
        </div>
      ) : null}
      <style jsx global>{`
        #work-grid.work-grid-fancy .work-item > div {
          height: 100%;
        }

        #work-grid.work-grid-fancy .work-item {
          display: flex;
        }

        #work-grid.work-grid-fancy .work-item a {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          background: #ffffff !important;
          border: none;
          box-shadow: var(--box-shadow-block);
          border-radius: 18px;
          overflow: hidden;
        }

        #work-grid.work-grid-fancy .work-img {
          flex-shrink: 0;
        }

        #work-grid.work-grid-fancy .work-img img {
          aspect-ratio: 16 / 11;
          object-fit: cover;
        }

        #work-grid.work-grid-fancy .work-intro {
          min-height: 250px;
          padding: 20px 22px 22px !important;
          background: #ffffff;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          display: flex;
          flex-direction: column;
        }

        #work-grid.work-grid-fancy .work-meta-row {
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

        #work-grid.work-grid-fancy .work-meta-chip {
          display: inline-flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: #eef3ff;
          color: #31436f;
          letter-spacing: 0.08em;
          line-height: 1;
        }

        #work-grid.work-grid-fancy .work-meta-date {
          flex-shrink: 0;
        }

        #work-grid.work-grid-fancy .work-title {
          color: #1c1c57;
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 8px !important;
          line-height: 1.12;
        }

        #work-grid.work-grid-fancy .work-descr {
          color: #536174;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 15px;
          font-weight: 500;
          margin-bottom: 10px;
        }

        #work-grid.work-grid-fancy .work-summary {
          color: #6c7696;
          font-size: 14px;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 20px;
        }

        #work-grid.work-grid-fancy .work-cta-row {
          margin-top: auto;
        }

        #work-grid.work-grid-fancy .work-cta-pill {
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

        @media (max-width: 767.98px) {
          #work-grid.work-grid-fancy .work-item {
            margin-bottom: 18px !important;
          }

          #work-grid.work-grid-fancy .work-img img {
            aspect-ratio: 16 / 11;
            object-fit: cover;
          }

          #work-grid.work-grid-fancy .work-intro {
            min-height: 220px;
            padding: 16px 16px 18px !important;
          }

          #work-grid.work-grid-fancy .work-meta-row {
            margin-bottom: 12px;
            font-size: 11px;
          }

          #work-grid.work-grid-fancy .work-title {
            font-size: 22px !important;
            line-height: 1.08 !important;
            margin-bottom: 6px !important;
          }

          #work-grid.work-grid-fancy .work-descr {
            font-size: 13px !important;
            line-height: 1.45 !important;
          }

          #work-grid.work-grid-fancy .work-summary {
            font-size: 13px;
            line-height: 1.5;
            -webkit-line-clamp: 3;
            margin-bottom: 16px;
          }

          #work-grid.work-grid-fancy .work-cta-pill {
            width: 100%;
            min-height: 2.85rem;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
