import Footer6 from "@/components/footers/Footer6";
import { PopupWrapper } from "@/components/headers/components/PopupWrapper";
import Header6 from "@/components/headers/Header6";
import FooterTop from "@/components/homes/home-6/FooterTop";
import Portfolio from "@/components/homes/home-6/Portfolio";
import { reviews } from "@/data/features";
import { fancyMultipage } from "@/data/menu";
import Image from "next/image";

const onePage = false;
const dark = false;

const capabilityCards = [
  {
    title: "24/7 Call Handling",
    text: "Answer inbound calls instantly, capture lead details, and respond even outside working hours.",
  },
  {
    title: "Lead Qualification",
    text: "Ask the right questions, categorize callers, and route only the best-fit opportunities to your team.",
  },
  {
    title: "Appointment Booking",
    text: "Sync with your workflow and book consultations without manual back-and-forth.",
  },
  {
    title: "CRM Handoff",
    text: "Send transcripts, summaries, and caller intent directly into your internal sales process.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    text: "We map your call flow, business goals, FAQs, and conversion points.",
  },
  {
    step: "02",
    title: "AI Setup",
    text: "We configure your receptionist prompts, qualification logic, and fallback rules.",
  },
  {
    step: "03",
    title: "Integrations",
    text: "We connect calendars, CRMs, or handoff tools so every call becomes actionable.",
  },
  {
    step: "04",
    title: "Launch & Optimize",
    text: "We monitor real conversations, refine responses, and improve booking performance over time.",
  },
];

export const metadata = {
  title: "SERVICES - AI Receptionist",
  description: "",
};

export default function AIReceptionistPage() {
  return (
    <>
      <div className="theme-fancy">
        <div className="page" id="top">
          <nav className="main-nav transparent stick-fixed wow-menubar wch-unset">
            <Header6 links={fancyMultipage} />
          </nav>
          <main id="main">
            <section className="scrollSpysection mt-5 service-large-sections social-hero-section" id="about">
              <div className="pt-md-5 container position-relative">
                <div className="row mb-xs-40 align-items-center">
                  <div className="col-md-12 col-lg-6 pt-5 pb-lg-5">
                    <div className="social-hero-copy-shell">
                      <div className="social-hero-eyebrow wow fadeInUp">
                        AI-Powered Call Workflow
                      </div>
                      <h1 className="fs-64 mb-30 mb-xs-20 wow fadeInUp ml-1 social-hero-title">
                        Capture Every Lead with an&nbsp;
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
                          AI Receptionist
                        </span>
                      </h1>
                      <p className="wow fadeInUp fs-hero-desc no-margin adjust-lineheight social-hero-lead">
                        Let AI answer calls, qualify prospects, and book meetings so your team focuses on closing.
                      </p>
                      <p className="wow fadeInUp info-text no-margin social-hero-support">
                        Start with a free 30 minute consultation and design your ideal call workflow.
                      </p>

                      <div className="wow fadeInUp social-hero-rating-row">
                        <div className="social-hero-stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{"\u2605"}</span>
                          ))}
                        </div>
                        <span className="social-hero-rating-copy">Built for faster response and fewer missed leads</span>
                      </div>

                      <div className="mb-4 wow fadeInUp">
                        <div className="social-hero-review-stack">
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

                      <div className="local-scroll wow fadeInUp social-hero-cta-wrap" data-wow-delay="0.12s">
                        <PopupWrapper
                          minWidth="14rem"
                          buttonText="Get A Free Consultation"
                          height="3.5rem"
                        />
                      </div>

                    </div>
                  </div>

                  <div className="col-md-12 col-lg-6 text-center mt-smd-5">
                    <div className="wow fadeInUp social-hero-media-shell">
                      <div className="social-hero-media-frame">
                        <Image
                          src="/assets/images/services/aiReceptionist/hero.svg"
                          width={760}
                          height={620}
                          alt="AI Receptionist"
                          style={{ maxWidth: "100%", height: "auto", display: "block" }}
                        />
                      </div>
                      <div className="social-hero-floating-card social-hero-floating-card-top">
                        <strong>Call Qualification</strong>
                        <span>Ask better questions before your team joins in</span>
                      </div>
                      <div className="social-hero-floating-card social-hero-floating-card-bottom">
                        <strong>Appointment Booking</strong>
                        <span>Convert qualified calls into scheduled consultations</span>
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
                <div className="row mb-60 mb-sm-40">
                  <div className="col-lg-7">
                    <h2 className="section-caption mb-2 mb-xs-0">AI Receptionist</h2>
                    <p style={{ color: "white" }} className="section-title mb-0 mb-sm-20">
                      Automation that sounds
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
                      professional
                    </h2>
                  </div>
                </div>

                <div className="row">
                  {capabilityCards.map((item) => (
                    <div key={item.title} className="col-md-6 col-lg-3 d-flex align-items-stretch mb-4">
                      <div
                        className="services-5-item service-feature-card d-flex align-items-stretch text-center text-xl-start w-100"
                        style={{
                          padding: 18,
                          backgroundColor: "#051D55",
                          border: "1px solid rgb(95, 35, 186)",
                        }}
                      >
                        <div className="w-100">
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
                    How It Works
                  </h2>
                  <p className="section-descr mb-0" style={{ maxWidth: 720 }}>
                    We design an AI receptionist around your business, team availability, and sales workflow.
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


