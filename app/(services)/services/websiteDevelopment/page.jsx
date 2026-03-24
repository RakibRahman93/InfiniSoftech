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
    title: "Custom Website Design",
    text: "Shape the structure, messaging, and interface around your brand so the first impression feels clear and credible.",
    metric: "Brand Fit",
    accent: "pink",
    image: "/assets/images/demo-fancy/services/custom-web-design.png",
  },
  {
    title: "Responsive Development",
    text: "Build fast, mobile-ready pages that stay polished across desktop, tablet, and phone without breaking the user journey.",
    metric: "All Devices",
    accent: "violet",
    image: "/assets/images/demo-fancy/services/responsive-dev.png",
  },
  {
    title: "Conversion-Focused Pages",
    text: "Turn visits into inquiries with better hierarchy, stronger CTAs, and page layouts that guide people toward action.",
    metric: "+Leads",
    accent: "cyan",
    image: "/assets/images/demo-fancy/services/leads-conversion-focused.png",
  },
  {
    title: "Ongoing Optimization",
    text: "Refine the launch with performance improvements, content updates, and practical adjustments that keep the site growing.",
    metric: "Live Updates",
    accent: "amber",
    image: "/assets/images/demo-fancy/services/ongoing-optmization.png",
  },
];

const websiteJourneyStages = [
  {
    stage: "01",
    label: "Clarity",
    title: "Start with a sharper offer",
    text: "We define what the site needs to say, who it serves, and how the message should land within the first few seconds.",
    stat: "Message Clarity",
    value: "100%",
    width: "100%",
    accent: "pink",
    points: ["Offer positioning", "Audience-first messaging", "Stronger trust cues"],
  },
  {
    stage: "02",
    label: "Structure",
    title: "Design the path people should follow",
    text: "The sitemap, content flow, and section order are built to remove confusion and make the next action feel obvious.",
    stat: "Page Flow",
    value: "76%",
    width: "74%",
    accent: "violet",
    points: ["Page hierarchy", "CTA placement", "Information architecture"],
  },
  {
    stage: "03",
    label: "Experience",
    title: "Build confidence through execution",
    text: "We translate the strategy into a premium, responsive front end that feels reliable on every device and screen size.",
    stat: "UX Confidence",
    value: "48%",
    width: "52%",
    accent: "cyan",
    points: ["Responsive UI", "Visual consistency", "Performance-focused build"],
  },
  {
    stage: "04",
    label: "Growth",
    title: "Improve after launch",
    text: "A strong site is not static. We review performance, refine bottlenecks, and help you keep momentum after go-live.",
    stat: "Growth Potential",
    value: "20%",
    width: "34%",
    accent: "amber",
    points: ["Post-launch review", "Quick-win updates", "Ongoing refinement"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    text: "We understand your business, audience, goals, and the gaps in your current website or offer.",
  },
  {
    step: "02",
    title: "Structure & Messaging",
    text: "We plan the page flow, content priorities, and calls to action so visitors know where to go next.",
  },
  {
    step: "03",
    title: "Design & Development",
    text: "We design and build a modern, responsive website that feels polished, fast, and brand-aligned.",
  },
  {
    step: "04",
    title: "Launch & Refine",
    text: "We launch smoothly, review performance, and recommend the next improvements worth making.",
  },
];

const ecommerceHighlights = [
  {
    title: "Storefronts That Feel Premium",
    text: "Clean product presentation, stronger hierarchy, and a shopping flow that feels credible from first click.",
  },
  {
    title: "Checkout Paths That Reduce Drop-Off",
    text: "We simplify the buying journey so customers move from product pages to checkout with less friction.",
  },
  {
    title: "Built To Scale With Your Catalog",
    text: "From a focused launch collection to a growing inventory, the store structure stays manageable and conversion-ready.",
  },
];

export const metadata = {
  title: "SERVICES - Website Design & Development",
  description: "",
};

export default function FancyServicesPage() {
  return (
    <>
      <div className="theme-fancy">
        <div className="page" id="top">
          <nav className="main-nav transparent stick-fixed wow-menubar wch-unset">
            <Header6 links={fancyMultipage} />
          </nav>
          <main id="main">
            <section
              style={{
                background:
                  "radial-gradient(circle at 14% 18%, rgba(231, 87, 120, 0.08) 0%, rgba(231, 87, 120, 0) 26%), radial-gradient(circle at 88% 24%, rgba(136, 118, 255, 0.12) 0%, rgba(136, 118, 255, 0) 28%), linear-gradient(180deg, #ffffff 0%, #f7f9ff 100%)",
              }}
              className="scrollSpysection service-large-sections social-hero-section website-dev-hero"
              id="about"
            >
              <div
                className="container position-relative website-dev-hero-container"
                style={{ paddingTop: "184px", paddingBottom: "40px" }}
              >
                  <div className="row mb-xs-40 justify-content-center">
                    <div className="col-12 text-center pb-4">
                      <div
                        style={{ height: "clamp(32px, 4vw, 56px)" }}
                        aria-hidden="true"
                      />
                      <div
                        className="social-hero-copy-shell mx-auto website-dev-hero-copy"
                        style={{ maxWidth: "820px", paddingTop: "8px" }}
                      >
                      <div className="social-hero-eyebrow wow fadeInUp website-dev-hero-reveal website-dev-hero-reveal-1">
                        Conversion-Focused Web Experience
                      </div>

                      <p
                        className="wow fadeInUp fs-hero-desc no-margin adjust-lineheight social-hero-lead mx-auto website-dev-hero-reveal website-dev-hero-reveal-2"
                        style={{ maxWidth: "760px", fontSize: "clamp(28px, 5vw, 35px)", fontWeight: 600 }}
                      >
                        Launch faster with a website that feels premium, communicates clearly, and turns more visitors into real inquiries.
                      </p>
                      <p
                        className="wow fadeInUp info-text no-margin social-hero-support mx-auto website-dev-hero-reveal website-dev-hero-reveal-3"
                        style={{ maxWidth: "700px" }}
                      >
                        Start with a free 30 minute consultation and map out the smartest next version of your website.
                      </p>

                      <div className="wow fadeInUp social-hero-rating-row justify-content-center website-dev-hero-reveal website-dev-hero-reveal-4">
                        <div className="social-hero-stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{"\u2605"}</span>
                          ))}
                        </div>
                        <span className="social-hero-rating-copy">
                          Trusted by businesses that need stronger online credibility
                        </span>
                      </div>

                      <div className="mb-4 wow fadeInUp d-flex justify-content-center website-dev-hero-reveal website-dev-hero-reveal-5">
                        <div className="social-hero-review-stack justify-content-center">
                          {reviews.map((user) => (
                            <div
                              key={user.id}
                              className="rounded-circle overflow-hidden position-relative social-hero-review-avatar"
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

                      <div
                        className="local-scroll wow fadeInUp social-hero-cta-wrap d-flex justify-content-center website-dev-hero-reveal website-dev-hero-reveal-6"
                        data-wow-delay="0.12s"
                      >
                        <PopupWrapper
                          className="hero-cta-glitter"
                          minWidth="14rem"
                          buttonText="Get A Free Consultation"
                          height="3.5rem"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-xl-10 text-center mt-4 mt-lg-5">
                    <div
                      className="wow fadeInUp social-hero-media-shell mx-auto website-dev-hero-media"
                      style={{ maxWidth: "920px" }}
                    >
                      <div className="social-hero-media-frame">
                        <Image
                          src="/assets/images/demo-fancy/portfolio/heroImage.jpg"
                          width={1200}
                          height={1200}
                          alt="Website development showcase"
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            display: "block",
                          }}
                        />
                      </div>
                      <div className="social-hero-floating-card social-hero-floating-card-top website-dev-hero-float website-dev-hero-float-top">
                        <strong>Clearer Messaging</strong>
                        <span>Pages structured to build trust faster</span>
                      </div>
                      <div className="social-hero-floating-card social-hero-floating-card-bottom website-dev-hero-float website-dev-hero-float-bottom">
                        <strong>Better Conversion Path</strong>
                        <span>Sharper calls to action from hero to inquiry</span>
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
              className={`page-section scrollSpysection social-services-section ${
                dark ? "bg-dark-1 bg-gradient-gray-dark-1 light-content" : ""
              } bg-scroll`}
              id="services"
            >
              <div className="container position-relative">
                <div className="row mb-40 mb-sm-30">
                  <div className="col-lg-8 social-services-heading">
                    <h2 className="section-caption mb-2 mb-xs-0">Website Development</h2>
                    <p style={{ color: "white" }} className="section-title mb-0 mb-sm-20">
                      The website system that turns
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
                      attention into trust and inquiries
                    </h2>
                  </div>
                </div>

                <div className="row">
                  {capabilityCards.map((item) => (
                    <div
                      key={item.title}
                      className="col-md-6 col-lg-3 d-flex align-items-stretch mb-3"
                    >
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

            <section className="page-section scrollSpysection marketing-funnel-section" id="strategy">
              <div className="container position-relative">
                <div className="row align-items-center g-4 g-lg-5">
                  <div className="col-lg-5">
                    <div className="marketing-funnel-copy">
                      <div className="marketing-funnel-eyebrow">How The Website Framework Works</div>
                      <h2 className="marketing-funnel-title" style={{ fontSize: "clamp(28px, 5vw, 42px)" }}>
                        A strong website performs because every stage has a clear job.
                      </h2>
                      <p className="marketing-funnel-text">
                        We do not treat a website as decoration. We build it as a system that clarifies the offer,
                        creates trust, guides the visitor, and supports growth after launch.
                      </p>

                      <div className="marketing-funnel-kpis">
                        <div className="marketing-funnel-kpi">
                          <strong>4 stages</strong>
                          <span>from first impression to post-launch refinement</span>
                        </div>
                        <div className="marketing-funnel-kpi">
                          <strong>1 workflow</strong>
                          <span>strategy, design, development, and optimization working together</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <a
                          className="cta-glitter-link"
                          href="/pricing?tab=development#pricing"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "15rem",
                            minHeight: "3.5rem",
                            padding: "0 28px",
                            borderRadius: "999px",
                            background: "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                            color: "#ffffff",
                            fontWeight: 700,
                            textDecoration: "none",
                            boxShadow: "0 18px 40px rgba(104, 90, 211, 0.24)",
                          }}
                        >
                          See Website Pricing
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-7">
                    <div className="funnel-visual-shell">
                      {websiteJourneyStages.map((item) => (
                        <div
                          key={item.stage}
                          className={`funnel-stage-row funnel-stage-row-${item.accent}`}
                        >
                          <div className="funnel-stage-top">
                            <div className="funnel-stage-meta">
                              <span className="funnel-stage-step">{item.stage}</span>
                              <span className="funnel-stage-label">{item.label}</span>
                            </div>
                            <div className="funnel-stage-value">{item.value}</div>
                          </div>
                          <div className="funnel-stage-bar">
                            <div className="funnel-stage-fill" style={{ width: item.width }} />
                          </div>
                          <div className="funnel-stage-stat">{item.stat}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row mt-5">
                  {websiteJourneyStages.map((item) => (
                    <div key={item.label} className="col-md-6 col-xl-3 mb-4">
                      <div className={`marketing-funnel-card marketing-funnel-card-${item.accent}`}>
                        <div className="marketing-funnel-card-stage">{item.label}</div>
                        <h3 className="marketing-funnel-card-title">{item.title}</h3>
                        <p className="marketing-funnel-card-text">{item.text}</p>
                        <ul className="marketing-funnel-points">
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section
              className={`scrollSpysection py-5 process-showcase-section ${
                dark ? "bg-dark-1 bg-gradient-gray-dark-1 light-content" : ""
              } bg-scroll`}
              id="process"
            >
              <div className="container position-relative">
                <div className="d-flex flex-column align-items-center text-center mb-5 process-showcase-heading">
                  <h2 className="section-title-small mb-1" style={{ color: "#1C1C57" }}>
                    Our Process
                  </h2>
                  <p className="section-descr mb-0" style={{ maxWidth: 720 }}>
                    We guide the website project from discovery to launch with a process built around clarity,
                    quality, and conversion.
                  </p>
                </div>

                <div className="row">
                  {processSteps.map((item) => (
                    <div
                      key={item.step}
                      className="col-md-6 col-lg-3 mb-4 process-showcase-col"
                    >
                      <div className="services-5-item h-100 process-showcase-card">
                        <div className="process-showcase-step">{item.step}</div>
                        <h4 className="services-6-title process-showcase-title">{item.title}</h4>
                        <p className="services-5-text mb-0 process-showcase-text">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section
              className="page-section scrollSpysection"
              id="ecommerce-development"
              style={{
                background:
                  "radial-gradient(circle at 18% 16%, rgba(231, 87, 120, 0.08) 0%, rgba(231, 87, 120, 0) 24%), radial-gradient(circle at 82% 20%, rgba(136, 118, 255, 0.14) 0%, rgba(136, 118, 255, 0) 28%), linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)",
              }}
            >
              <div className="container position-relative">
                <div className="row align-items-center g-4 g-xl-5">
                  <div className="col-lg-6">
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px 16px",
                        borderRadius: "999px",
                        border: "1px solid rgba(136, 118, 255, 0.18)",
                        background: "rgba(255, 255, 255, 0.9)",
                        boxShadow: "0 18px 50px rgba(19, 29, 79, 0.08)",
                        color: "#26356B",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "20px",
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                        }}
                      />
                      Ecommerce Development
                    </div>

                    <h2
                      style={{
                        fontSize: "42px",
                        lineHeight: 1.02,
                        letterSpacing: "-0.04em",
                        color: "#1C255A",
                        marginBottom: "18px",
                      }}
                    >
                      Build an online store that looks polished and sells with less friction.
                    </h2>

                    <p
                      style={{
                        fontSize: "18px",
                        lineHeight: 1.75,
                        color: "#5A678D",
                        maxWidth: "620px",
                        marginBottom: "28px",
                      }}
                    >
                      We design ecommerce experiences that help visitors browse faster, trust the brand sooner,
                      and move through product pages, carts, and checkout with more confidence.
                    </p>

                    <div className="row">
                      {ecommerceHighlights.map((item) => (
                        <div key={item.title} className="col-12 mb-3">
                          <div
                            style={{
                              padding: "20px 22px",
                              borderRadius: "22px",
                              background: "rgba(255, 255, 255, 0.88)",
                              border: "1px solid rgba(136, 118, 255, 0.16)",
                              boxShadow: "0 20px 60px rgba(19, 29, 79, 0.08)",
                            }}
                          >
                            <h3
                              style={{
                                fontSize: "22px",
                                lineHeight: 1.2,
                                color: "#1C255A",
                                marginBottom: "8px",
                              }}
                            >
                              {item.title}
                            </h3>
                            <p
                              style={{
                                marginBottom: 0,
                                color: "#5A678D",
                                lineHeight: 1.7,
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <a
                        className="cta-glitter-link"
                        href="/pricing?tab=ecommerce#pricing"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "15rem",
                          minHeight: "3.5rem",
                          padding: "0 28px",
                          borderRadius: "999px",
                          background: "linear-gradient(90deg, #E75778 0%, #8876FF 100%)",
                          color: "#ffffff",
                          fontWeight: 700,
                          textDecoration: "none",
                          boxShadow: "0 18px 40px rgba(104, 90, 211, 0.24)",
                        }}
                      >
                        See Ecommerce Pricing
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div
                      style={{
                        position: "relative",
                        padding: "18px",
                        borderRadius: "30px",
                        background:
                          "linear-gradient(135deg, rgba(231, 87, 120, 0.18) 0%, rgba(136, 118, 255, 0.22) 100%)",
                        boxShadow: "0 30px 80px rgba(19, 29, 79, 0.18)",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "24px",
                          overflow: "hidden",
                          background: "#ffffff",
                        }}
                      >
                        <Image
                          src="/assets/images/demo-fancy/portfolio/ecommerceCover.png"
                          width={1200}
                          height={1200}
                          alt="Ecommerce development showcase"
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                          }}
                        />
                      </div>

                      <div
                        className="d-none d-md-block"
                        style={{
                          position: "absolute",
                          top: "-18px",
                          left: "18px",
                          padding: "14px 18px",
                          borderRadius: "18px",
                          background: "rgba(28, 37, 90, 0.92)",
                          color: "#ffffff",
                          boxShadow: "0 16px 34px rgba(19, 29, 79, 0.2)",
                          maxWidth: "220px",
                        }}
                      >
                        <strong style={{ display: "block", fontSize: "18px", marginBottom: "4px" }}>
                          Faster Buying Flow
                        </strong>
                        <span style={{ fontSize: "14px", lineHeight: 1.5, color: "rgba(255,255,255,0.8)" }}>
                          Product discovery, cart logic, and checkout steps built to reduce hesitation.
                        </span>
                      </div>

                      <div
                        className="d-none d-md-block"
                        style={{
                          position: "absolute",
                          right: "18px",
                          bottom: "-18px",
                          padding: "14px 18px",
                          borderRadius: "18px",
                          background: "rgba(255, 255, 255, 0.96)",
                          color: "#1C255A",
                          boxShadow: "0 16px 34px rgba(19, 29, 79, 0.16)",
                          maxWidth: "220px",
                          border: "1px solid rgba(136, 118, 255, 0.18)",
                        }}
                      >
                        <strong style={{ display: "block", fontSize: "18px", marginBottom: "4px" }}>
                          Conversion-Ready Merchandising
                        </strong>
                        <span style={{ fontSize: "14px", lineHeight: 1.5, color: "#5A678D" }}>
                          Smarter product grouping, stronger CTAs, and a cleaner path to purchase.
                        </span>
                      </div>

                      <div className="d-md-none mt-3">
                        <div
                          style={{
                            padding: "16px 18px",
                            borderRadius: "18px",
                            background: "rgba(28, 37, 90, 0.92)",
                            color: "#ffffff",
                            boxShadow: "0 16px 34px rgba(19, 29, 79, 0.16)",
                            marginBottom: "12px",
                          }}
                        >
                          <strong style={{ display: "block", fontSize: "17px", marginBottom: "4px" }}>
                            Faster Buying Flow
                          </strong>
                          <span style={{ fontSize: "14px", lineHeight: 1.5, color: "rgba(255,255,255,0.82)" }}>
                            Product discovery, cart logic, and checkout steps built to reduce hesitation.
                          </span>
                        </div>

                        <div
                          style={{
                            padding: "16px 18px",
                            borderRadius: "18px",
                            background: "rgba(255, 255, 255, 0.96)",
                            color: "#1C255A",
                            boxShadow: "0 16px 34px rgba(19, 29, 79, 0.14)",
                            border: "1px solid rgba(136, 118, 255, 0.18)",
                          }}
                        >
                          <strong style={{ display: "block", fontSize: "17px", marginBottom: "4px" }}>
                            Conversion-Ready Merchandising
                          </strong>
                          <span style={{ fontSize: "14px", lineHeight: 1.5, color: "#5A678D" }}>
                            Smarter product grouping, stronger CTAs, and a cleaner path to purchase.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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











