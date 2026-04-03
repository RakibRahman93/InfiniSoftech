import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import FooterTop from "@/components/homes/home-6/FooterTop";
import AgencyPricingPlans from "@/components/pricing/AgencyPricingPlans";
import { fancyMultipage } from "@/data/menu";
import Link from "next/link";

export const metadata = {
  title: "Agency Website Subscription Pricing | Infinisoft",
  description:
    "Unlimited websites and updates for one monthly fee. Explore conversion-focused subscription plans for businesses, agencies, and scaling teams.",
};

const requestItems = [
  "Landing pages",
  "Full websites",
  "Website redesigns",
  "UI/UX improvements",
  "Performance optimization",
  "New sections & pages",
];

const excludedItems = [
  "Complex backend systems",
  "Large custom web apps",
  "Third-party integrations (advanced)",
];

const faqs = [
  {
    question: "How is it unlimited?",
    answer:
      "You can submit unlimited requests, and we work through them one at a time based on your active plan.",
  },
  {
    question: "How fast is delivery?",
    answer: "Most tasks are completed within 2-4 days.",
  },
  {
    question: "Can I pause my subscription?",
    answer: "Yes, anytime. Pause when you do not need active work and restart when ready.",
  },
  {
    question: "Is there a minimum contract?",
    answer: "No. There are no long-term contracts.",
  },
  {
    question: "What kinds of work can I request?",
    answer:
      "You can request landing pages, website redesigns, new pages, UI improvements, content updates, and performance-focused website tasks.",
  },
  {
    question: "Do you only work on new websites?",
    answer:
      "No. We can improve, redesign, and maintain existing websites as well as build new pages and new website experiences.",
  },
  {
    question: "How do requests get prioritized?",
    answer:
      "Tasks are handled based on your plan level, number of active requests, and the order in which you submit them.",
  },
  {
    question: "What happens if I have a lot of requests?",
    answer:
      "You can queue as many requests as you want. We work through them in order and keep momentum moving each month.",
  },
  {
    question: "Can this replace hiring a freelancer or in-house developer?",
    answer:
      "For many website-focused businesses, yes. It gives you predictable monthly pricing, faster execution, and ongoing support without recruitment overhead.",
  },
  {
    question: "How do we communicate?",
    answer:
      "We keep communication simple through WhatsApp and email, so updates, feedback, and revisions move quickly.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Subscribe",
    description: "Choose a plan and get instant access to your dashboard.",
  },
  {
    number: "2",
    title: "Submit Requests",
    description: "Add as many website tasks as you want.",
  },
  {
    number: "3",
    title: "We Deliver",
    description: "We complete requests one by one, fast and efficiently.",
  },
];

const comparisonRows = [
  { option: "Freelancer", cost: "Inconsistent", speed: "Slow", flexibility: "Low" },
  { option: "In-house", cost: "Expensive", speed: "Medium", flexibility: "Low" },
  { option: "Us", cost: "Fixed monthly", speed: "Fast", flexibility: "High", featured: true },
];

const AgencyPricingPage = () => {
  return (
    <div className="theme-fancy">
      <div className="page" id="top">
        <nav className="main-nav transparent dark agency-pricing-nav stick-fixed wow-menubar wch-unset border-b">
          <Header6 links={fancyMultipage} />
        </nav>

        <main id="main" className="agency-pricing-page">
          <section className="agency-pricing-hero">
            <div className="container agency-pricing-shell">
              <div className="agency-pricing-kicker">Available for new projects</div>
              <div className="agency-pricing-hero-grid">
                <div>
                  <h1 className="agency-pricing-title">
                    Unlimited Websites &{" "}
                    <br />
                    <span className="agency-pricing-title-nowrap">
                      Updates For <span className="agency-pricing-title-inline">One Simple</span>
                    </span>
                    <br />
                    <span className="agency-pricing-title-block">Monthly Fee</span>
                  </h1>
                  <p className="agency-pricing-subtitle">
                    Stop paying per project. Get a dedicated web team that
                    builds, updates, and scales your website continuously.
                  </p>
                  <div className="agency-pricing-cta-row">
                    <div className="cta-glitter-wrap">
                      <a
                        href="#agency-pricing-plans"
                        className="btn-lg fw-semibold text-white shadow-sm cta-glitter-button w-md-auto agency-pricing-learn-more"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                  <div className="agency-pricing-trustline">
                    <span>No contracts</span>
                    <span>Pause anytime</span>
                    <span>Fast turnaround</span>
                  </div>
                </div>

                <div className="agency-pricing-hero-card">
                  <div className="agency-pricing-metric">
                    <strong>2-4 days</strong>
                    <span>Average delivery for most tasks</span>
                  </div>
                  <div className="agency-pricing-metric">
                    <strong>Unlimited requests</strong>
                    <span>Stack tasks, we execute them in order</span>
                  </div>
                  <div className="agency-pricing-metric">
                    <strong>Pause anytime</strong>
                    <span>No lock-in contracts or bloated retainers</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="agency-pricing-section" id="agency-pricing-plans">
            <div className="container agency-pricing-shell">
              <div className="agency-pricing-section-heading">
                <span>Why this works</span>
                <h2>Traditional website projects are expensive. Subscriptions are simpler.</h2>
              </div>

              <div className="agency-pricing-two-col">
                <article className="agency-pricing-panel">
                  <h3>Problem</h3>
                  <p>Building websites the traditional way is slow, expensive, and frustrating.</p>
                  <ul className="agency-pricing-list">
                    <li>Pay 50K-150K every time</li>
                    <li>Wait weeks for delivery</li>
                    <li>No ongoing support</li>
                  </ul>
                </article>

                <article className="agency-pricing-panel agency-pricing-panel-highlight">
                  <h3>Solution</h3>
                  <p>We replaced all that with a simple subscription.</p>
                  <ul className="agency-pricing-list">
                    <li>Unlimited requests</li>
                    <li>Fast delivery</li>
                    <li>One fixed monthly price</li>
                  </ul>
                </article>
              </div>
            </div>
          </section>

          <section className="agency-pricing-section">
            <div className="container agency-pricing-shell">
              <div className="agency-pricing-section-heading agency-pricing-section-heading-centered">
                <span>Plans</span>
                <h2>Choose the plan that fits your growth stage</h2>
              </div>

              <AgencyPricingPlans />
            </div>
          </section>

          <section className="agency-pricing-section">
            <div className="container agency-pricing-shell">
              <div className="agency-pricing-section-heading">
                <span>How it works</span>
                <h2>Simple workflow. No messy project cycles.</h2>
              </div>

              <div className="agency-pricing-steps">
                {processSteps.map((step) => (
                  <article key={step.number} className="agency-pricing-step-card">
                    <div className="agency-pricing-step-number">{step.number}</div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="agency-pricing-section">
            <div className="container agency-pricing-shell">
              <div className="agency-pricing-request-grid">
                <article className="agency-pricing-panel">
                  <div className="agency-pricing-section-heading">
                    <span>What you can request</span>
                    <h2>Built for fast-moving website work</h2>
                  </div>
                  <div className="agency-pricing-chip-grid">
                    {requestItems.map((item) => (
                      <span key={item} className="agency-pricing-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>

                <article className="agency-pricing-panel">
                  <div className="agency-pricing-section-heading">
                    <span>What&apos;s not included</span>
                    <h2>Clear scope keeps delivery fast and reliable</h2>
                  </div>
                  <ul className="agency-pricing-list">
                    {excludedItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="agency-pricing-note">
                    These can be quoted separately if needed.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="agency-pricing-section">
            <div className="container agency-pricing-shell">
              <div className="agency-pricing-request-grid">
                <article className="agency-pricing-panel agency-pricing-panel-highlight">
                  <div className="agency-pricing-section-heading">
                    <span>Testimonials</span>
                    <h2>Trusted for fast, modern website execution</h2>
                  </div>
                  <p className="agency-pricing-quote">
                    “Working with this team felt simple and efficient. Requests
                    were handled fast, communication was smooth, and the final
                    website quality felt far above the usual freelancer
                    experience.”
                  </p>
                  <div className="agency-pricing-testimonial-meta">
                    <strong>Client from Poland</strong>
                    <span>Website redesign project</span>
                  </div>
                </article>

                <article className="agency-pricing-panel">
                  <div className="agency-pricing-section-heading">
                    <span>Why teams switch</span>
                    <h2>No hiring drag. No per-project surprises.</h2>
                  </div>
                  <ul className="agency-pricing-list">
                    <li>Skip recruiting, onboarding, and management overhead</li>
                    <li>Keep costs predictable with one monthly fee</li>
                    <li>Get fast execution without sacrificing flexibility</li>
                  </ul>
                </article>
              </div>
            </div>
          </section>

          <section className="agency-pricing-section">
            <div className="container agency-pricing-shell">
              <div className="agency-pricing-section-heading">
                <span>Hiring alternative</span>
                <h2>A better option than freelancers or in-house hires</h2>
              </div>

              <div className="agency-pricing-table-wrap">
                <table className="agency-pricing-table">
                  <thead>
                    <tr>
                      <th>Option</th>
                      <th>Cost</th>
                      <th>Speed</th>
                      <th>Flexibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr
                        key={row.option}
                        className={row.featured ? "agency-pricing-table-featured" : ""}
                      >
                        <td>{row.option}</td>
                        <td>{row.cost}</td>
                        <td>{row.speed}</td>
                        <td>{row.flexibility}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="agency-pricing-section">
            <div className="container agency-pricing-shell">
              <div className="agency-pricing-section-heading">
                <span>FAQ</span>
                <h2>Answers to the usual objections</h2>
              </div>

              <div className="agency-pricing-faq-grid">
                {faqs.map((faq) => (
                  <article key={faq.question} className="agency-pricing-faq-card">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="agency-pricing-section agency-pricing-section-last">
            <div className="container agency-pricing-shell">
              <div className="agency-pricing-final-cta">
                <span>Pause anytime. No contracts.</span>
                <h2>Stop Paying Per Website. Start Scaling Smarter.</h2>
                <div className="agency-pricing-cta-row agency-pricing-cta-row-centered">
                  <div className="cta-glitter-wrap">
                    <a
                      href="https://wa.me/8801858333238?text=Hi%2C%20I%27d%20like%20to%20discuss%20the%20website%20subscription%20plans."
                      target="_blank"
                      rel="noreferrer"
                      className="btn-lg fw-semibold text-white shadow-sm cta-glitter-button w-md-auto agency-pricing-learn-more agency-pricing-package-cta-primary"
                    >
                      Lets discuss
                    </a>
                  </div>
                </div>
              </div>
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
  );
};

export default AgencyPricingPage;
