import AnimatedText from "@/components/common/AnimatedText";
import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import RelatedProjects5 from "@/components/portfolio/relatedProjects/RelatedProjects5";
import PortFolioMockUp from "@/components/PortfolioPhonePreview/PortFolioMockUp";
import { fancyMultipage } from "@/data/menu";
import { portfolios6 } from "@/data/portfolio";
import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "Portfolio Single",
  description: "",
};
export default function FancyPortfolioSinglePage({ params }) {
  const portfolioItem =
    portfolios6.filter((elm) => elm.id == params.id)[0] || portfolios6[0];

  // const object = params
  // console.warn('portfolioItem', portfolioItem)
  // console.warn('Date', Date);

  const {
    Date,
    Client,
    Services,
    Description,
    Features,
    website,
    imgSrc,
    imgSrc2,
    imgExtra,
    mockupType
  } = portfolioItem;
  const prototypeLink = portfolioItem?.prototypeLink;
  const showPrototype = !!prototypeLink;
  return (
    <>
      <div className="theme-fancy">
        <div className="page" id="top">
          <nav className="main-nav transparent stick-fixed wow-menubar wch-unset">
            <Header6 links={fancyMultipage} />
          </nav>
          <main id="main">
            <section className="page-section bg-gradient-gray-light-1 bg-scroll overflow-hidden">
              {/* <!-- Background Shape --> */}
              <div className="bg-shape-1 wow fadeIn">
                <Image
                  width="1443"
                  height="844"
                  src="/assets/images/demo-fancy/bg-shape-1.svg"
                  alt=""
                />
              </div>
              {/* <!-- End Background Shape --> */}

              <div className="container position-relative pt-10 pt-sm-40 text-center">
                <div className="row">
                  <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                    <h1 className="hs-title-10 mb-10">
                      <span className="wow charsAnimIn" data-splitting="chars">
                        <AnimatedText
                          text={portfolioItem.title
                            .split(" ")
                            .slice(0, 1)
                            .join(" ")}
                        />
                        <span className="mark-decoration-3-wrap">
                          <AnimatedText
                            text={portfolioItem.title
                              .split(" ")
                              .slice(1)
                              .join(" ")}
                          />
                          <b
                            className="mark-decoration-3 wow scalexIn"
                            data-wow-delay="0.5s"
                          ></b>
                        </span>
                      </span>
                    </h1>

                    <p
                      className="section-descr mb-0 wow fadeIn"
                      data-wow-delay="0.2s"
                    >
                      Branding, UI/UX Design, Mobile & Web App Development
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <>
              {/* Section */}
              <section className="page-section">
                <div className="container position-relative">
                  <div className="row">
                    {/* Project Details */}
                    <div className="col-lg-4 mb-md-40 wow fadeInUp">
                      <div className="block-sticky">
                        <h2 className="h3 mb-20">Project Details</h2>
                        <hr className="mb-20" />
                        <div className="row text-gray small">
                          <div className="col-sm-4">
                            <b>Date:</b>
                          </div>
                          <div className="col-sm-8">{Date}</div>
                        </div>
                        <hr className="mb-20" />
                        <div className="row text-gray small">
                          <div className="col-sm-4">
                            <b>Client:</b>
                          </div>
                          <div className="col-sm-8">{Client}</div>
                        </div>
                        <hr className="mb-20" />
                        <div className="row text-gray small">
                          <div className="col-sm-4">
                            <b>Services:</b>
                          </div>
                          <div className="col-sm-8">{Services}</div>
                        </div>
                        <hr className="mb-20" />
                        <div className="text-gray small">
                          <div>
                            <b>Description:</b>
                          </div>
                          <div>{Description}</div>
                        </div>
                        {website ? (
                          <>
                            <hr className="mb-20" />
                            <div className="text-gray small">
                              <div>
                                <b>website:</b>
                              </div>
                              <a
                                href={`https://${website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {website}
                              </a>
                            </div>
                          </>
                        ) : null}
                        {/* <hr className="mb-20" />
                        <div className="text-gray small">
                          <div>
                            <b>Features:</b>
                          </div>
                          <div>
                            {Features}
                          </div>
                        </div> */}
                      </div>
                    </div>
                    {/* End Project Details */}
                    <div className="col-lg-8">
                      <div className="mb-n30">
                        {/* Photo Item */}
                        <div className="mb-30 wow fadeInUp">
                          <Image
                            src={portfolioItem.imgExtra}
                            className="round"
                            loading="lazy"
                            width={1200}
                            height={800}
                            alt="Image Description"
                          />
                        </div>
                        {/* End Photo Item */}
                        {/* Photo Item */}
                        <div className="mb-30 wow fadeInUp">
                          <Image
                            src={portfolioItem.imgSrc}
                            className="round"
                            loading="lazy"
                            width={1200}
                            height={800}
                            alt="Image Description"
                          />
                        </div>
                        {/* End Photo Item */}
                        {/* Photo Item */}
                        {imgSrc2 && (
                          <div className="mb-30 wow fadeInUp">
                            <Image
                              src={imgSrc2}
                              className="round"
                              loading="lazy"
                              width={1200}
                              height={800}
                              alt="Image Description"
                            />
                          </div>
                        )}

                        {/* End Photo Item */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* End Section */}
              {/* Divider */}
              <hr className="mt-0 mb-0" />
              {/* ===== Prototype Preview Section ===== */}
              {showPrototype && (
                <section className="mt-3">
                  <div className="container position-relative">
                    <div>
                      <h2 className="h3 mb-4">Project Prototype</h2>
                    </div>
                  </div>

                  {/* Show this only on mobile (xs, sm) */}
                  <div className="d-block d-md-none px-3 text-primary mb-2 small text-dark">
                    📱 For better experience, open this prototype in a new tab:
                    <Link
                      href={prototypeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-underline ms-1"
                    >
                      Open Link
                    </Link>
                  </div>

                  <div className="px-2">
                    <PortFolioMockUp src={prototypeLink} mockupType={mockupType} />
                  </div>
                </section>
              )}
            </>
            <section className="page-section">
              <RelatedProjects5 />
            </section>

            <>
              {/* Divider */}
              <hr className="mt-0 mb-0" />
              {/* End Divider */}
              {/* Work Navigation */}
              {/* <div className="work-navigation clearfix">
                <Link href={`/main-portfolio-single-3/1`} className="work-prev">
                  <span>
                    <i className="mi-arrow-left size-24 align-middle color-primary-1" />
                    Previous
                  </span>
                </Link>
                <a href="#" className="work-all">
                  <span>
                    <i className="mi-close size-24 align-middle color-primary-1" />{" "}
                    All works
                  </span>
                </a>
                <Link href={`/main-portfolio-single-2/1`} className="work-next">
                  <span>
                    Next
                    <i className="mi-arrow-right size-24 align-middle color-primary-1" />
                  </span>
                </Link>
              </div> */}
              {/* End Work Navigation */}
            </>
          </main>
          <footer className="page-section footer bg-dark-1 light-content pb-30">
            <Footer6 />
          </footer>
        </div>{" "}
      </div>
    </>
  );
}
