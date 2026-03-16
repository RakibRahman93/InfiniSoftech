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
                className={`work-item mix ${item.categories.join(" ")}`}
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
                        <h3 className="work-title">{item.title}</h3>
                        <div className="work-descr">{item.description}</div>
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
              fontWeight: "700",
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

        #work-grid.work-grid-fancy .work-item a {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #ffffff !important;
          border: none;
          box-shadow: var(--box-shadow-block);
        }

        #work-grid.work-grid-fancy .work-img {
          flex-shrink: 0;
        }

        #work-grid.work-grid-fancy .work-img img {
          aspect-ratio: 16 / 11;
          object-fit: cover;
        }

        #work-grid.work-grid-fancy .work-intro {
          min-height: 92px;
          padding: 22px 22px 20px !important;
          background: #ffffff;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        #work-grid.work-grid-fancy .work-title {
          color: #1c1c57;
          font-weight: 600;
        }

        #work-grid.work-grid-fancy .work-descr {
          color: #536174;
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
            min-height: 74px;
            padding: 16px 16px 15px !important;
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
        }
      `}</style>
    </>
  );
}
