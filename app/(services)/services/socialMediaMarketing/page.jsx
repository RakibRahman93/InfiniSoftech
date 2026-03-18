import Footer6 from "@/components/footers/Footer6";
import { PopupWrapper } from "@/components/headers/components/PopupWrapper";
import Header6 from "@/components/headers/Header6";
import FooterTop from "@/components/homes/home-6/FooterTop";
import Portfolio from "@/components/homes/home-6/Portfolio";
import { reviews } from "@/data/features";
import { fancyMultipage } from "@/data/menu";
import Image from "next/image";

const dark = false;

const capabilityCards = [
  {
    title: "Content Strategy",
    text: "Plan content pillars, campaign themes, and posting schedules around your business goals.",
    metric: "Monthly Plan",
    accent: "pink",
    image: "/assets/images/demo-fancy/portfolio/content-strategy.png",
  },
  {
    title: "Creative Production",
    text: "Design posts, reels, ad creatives, and branded assets that feel consistent and conversion-ready.",
    metric: "12 Assets",
    accent: "violet",
    image: "/assets/images/demo-fancy/portfolio/creative-production.png",
  },
  {
    title: "Audience Growth",
    text: "Reach the right people through platform-specific targeting, optimization, and trend-aware execution.",
    metric: "+148%",
    accent: "cyan",
    image: "/assets/images/demo-fancy/portfolio/aud-grow.png",
  },
  {
    title: "Performance Tracking",
    text: "Measure engagement, leads, and campaign performance with clear reporting and next-step insights.",
    metric: "Live Data",
    accent: "amber",
    image: "/assets/images/demo-fancy/portfolio/perf-track.png",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Audit & Positioning",
    text: "We review your current channels, brand voice, audience, and competitor landscape.",
  },
  {
    step: "02",
    title: "Content Planning",
    text: "We define monthly content themes, campaign ideas, and platform-specific posting plans.",
  },
  {
    step: "03",
    title: "Launch Campaigns",
    text: "We publish content, manage creative rollout, and align messaging with your marketing goals.",
  },
  {
    step: "04",
    title: "Optimize Results",
    text: "We monitor performance, refine messaging, and improve reach and conversions over time.",
  },
];

export const metadata = {
  title: "SERVICES - Social Media Marketing",
  description: "",
};

export default function SocialMediaMarketingPage() {
  return (
    <>
      <div className="theme-fancy">
        <div className="page" id="top">
          <nav className="main-nav transparent stick-fixed wow-menubar wch-unset">
            <Header6 links={fancyMultipage} />
          </nav>
          <main id="main">
            <section className="scrollSpysection service-large-sections social-hero-section" id="about">
              <div className="container position-relative" style={{ paddingTop: "48px", paddingBottom: "28px" }}>
                <div className="row mb-xs-40 align-items-center">
                  <div className="col-md-12 col-lg-6 pt-3 pb-lg-4" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <h1 className="fs-64 mb-30 mb-xs-20 wow fadeInUp ml-1 social-hero-title">
                      Grow Faster with&nbsp;
                      <span
                        className="fs-64 mark-decoration-3-wrap wow fadeInUp color-secondary-1-white social-hero-accent"
                        style={{
                          background:
                            "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: "bold",
                        }}
                      >
                        Social Media Marketing
                      </span>
                    </h1>
                    <p className="wow fadeInUp fs-hero-desc no-margin adjust-lineheight social-hero-lead">
                      Build a stronger brand presence, attract the right audience, and turn attention into leads.
                    </p>
                    <p className="wow fadeInUp info-text no-margin social-hero-support">
                      Start with a free 30 minute consultation and map out your next growth campaign.
                    </p>
                    <div className="wow fadeInUp" style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: "#ffae00", fontSize: "24px", lineHeight: 1 }}>{"\u2605"}</span>
                      ))}
                    </div>
                    <div className="mb-4 wow fadeInUp">
                      <div style={{ position: "relative", display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
                        {reviews.map((user) => (
                          <div
                            key={user.id}
                            className="rounded-circle overflow-hidden position-relative"
                            style={{
                              width: 60,
                              height: 60,
                              border: "1px solid #D9D9D9",
                              marginRight: "-15px",
                              borderRadius: "50%",
                              backgroundColor: "#fff",
                            }}
                          >
                            <Image
                              src={user.img}
                              alt={user.name}
                              width={60}
                              height={60}
                              className="img-fluid rounded-circle"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="local-scroll wow fadeInUp" data-wow-delay="0.12s">
                      <PopupWrapper
                        minWidth="14rem"
                        buttonText="Get A Free Consultation"
                        height="3.5rem"
                      />
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-6 text-lg-end text-center mt-smd-5">
                    <div
                      className="wow fadeInUp"
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "12px",
                        borderRadius: "30px",
                        background:
                          "linear-gradient(135deg, rgba(231, 87, 120, 0.18) 0%, rgba(136, 118, 255, 0.2) 100%)",
                        border: "1px solid rgba(136, 118, 255, 0.24)",
                        boxShadow:
                          "0 28px 60px rgba(55, 43, 142, 0.14), inset 0 1px 0 rgba(255,255,255,0.55)",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "24px",
                          overflow: "hidden",
                          background: "#fff",
                        }}
                      >
                        <Image
                          src="/assets/images/demo-fancy/portfolio/social-media-market.png"
                          width={1200}
                          height={1200}
                          alt="Social Media Marketing"
                          style={{ maxWidth: "100%", height: "auto", display: "block" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              style={{
                background: "linear-gradient(220deg, #621ABE 0%, #051D55 50%)",
              }}
              className={`page-section scrollSpysection ${
                dark ? "bg-dark-1 bg-gradient-gray-dark-1 light-content" : ""
              } bg-scroll`}
              id="services"
            >
              <div className="container position-relative">
                <div className="row mb-40 mb-sm-30">
                  <div className="col-lg-8 social-services-heading">
                    <h2 className="section-caption mb-2 mb-xs-0">Social Media Marketing</h2>
                    <p style={{ color: "white" }} className="section-title mb-0 mb-sm-20">
                      Creative campaigns that move
                    </p>
                    <h2
                      className="mark-decoration-3-wrap wow fadeInUp color-secondary-1-white text-transparent bg-clip-text font-extrabold fs-40 py-0"
                      style={{
                        background:
                          "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bolder",
                      }}
                    >
                      attention into action
                    </h2>
                  </div>
                </div>

                <div className="row">
                  {capabilityCards.map((item) => (
                    <div key={item.title} className="col-md-6 col-lg-3 d-flex align-items-stretch mb-3">
                      <div
                        className="services-5-item service-feature-card d-flex align-items-stretch text-center text-xl-start w-100"
                        style={{
                          padding: 16,
                          backgroundColor: "#051D55",
                          border: "1px solid rgb(95, 35, 186)",
                        }}
                      >
                        <div className="w-100">
                          <div className={`social-service-visual social-service-visual-${item.accent}`}>
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={540}
                              height={220}
                              className="social-service-image"
                            />
                            <div className="social-service-visual-overlay">
                              <span className="social-service-chip">{item.metric}</span>
                            </div>
                          </div>
                          <h4 className="services-6-title text-white">{item.title}</h4>
                          <p className="services-5-text services-5-text-responsive text-white mb-0">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section
              className={`scrollSpysection py-5 ${
                dark ? "bg-dark-1 bg-gradient-gray-dark-1 light-content" : ""
              } bg-scroll`}
              id="process"
            >
              <div className="container position-relative">
                <div className="d-flex flex-column align-items-center text-center mb-5">
                  <h2 className="section-title-small mb-1" style={{ color: "#1C1C57" }}>
                    Our Process
                  </h2>
                  <p className="section-descr mb-0" style={{ maxWidth: 720 }}>
                    We build a social media system around your audience, message, and business outcomes.
                  </p>
                </div>

                <div className="row">
                  {processSteps.map((item) => (
                    <div key={item.step} className="col-md-6 col-lg-3 mb-4">
                      <div
                        className="services-5-item h-100"
                        style={{
                          background: "#fff",
                          border: "1px solid rgba(23, 31, 68, 0.08)",
                          boxShadow: "0 12px 32px rgba(45, 39, 93, 0.06)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            letterSpacing: "0.12em",
                            color: "#8876FF",
                            marginBottom: "14px",
                          }}
                        >
                          {item.step}
                        </div>
                        <h4 className="services-6-title" style={{ color: "#151b38" }}>
                          {item.title}
                        </h4>
                        <p className="services-5-text mb-0">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="page-section scrollSpysection" id="portfolio">
              <div className="container position-relative">
                <div className="row mb-30 mb-sm-40">
                  <div className="col-md-8 offset-md-2 text-center">
                    <h2
                      className="section-caption mb-20 mb-xs-10"
                      style={{
                        background:
                          "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Portfolio
                    </h2>
                    <h3 className="section-title mb-0">Our Portfolio.</h3>
                  </div>
                </div>
                <Portfolio />
              </div>
            </section>
          </main>
          <FooterTop />
          <footer
            className="footer bg-dark-1 light-content py-5"
            style={{
              background: "linear-gradient(220deg, #621ABE 0%, #051D55 50%)",
            }}
          >
            <Footer6 />
          </footer>
        </div>
      </div>
    </>
  );
}



















