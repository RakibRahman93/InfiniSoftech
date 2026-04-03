"use client";

import { useLocation } from "@/context/LocationContext";

const plans = [
  {
    name: "Starter",
    prices: {
      bd: "35,000 Tk",
      intl: "$850",
    },
    suffix: "/ month",
    description: "Perfect for small businesses & simple needs",
    detail:
      "Best if you need a reliable team for landing pages, small business websites, routine edits, and ongoing design updates without paying per project.",
    cta: "Get Started",
    accentClass: "agency-pricing-plan-starter",
    turnaround: "Most tasks in 2-4 business days",
    idealFor: "Small businesses, solo founders, simple websites",
    features: [
      "1 active request at a time so work stays focused",
      "Unlimited requests in queue, 1 active at a time",
      "Landing pages, brochure sites, and small business websites",
      "2-4 day delivery for most standard tasks",
      "Unlimited revisions until the work is right",
      "Email and WhatsApp support for quick communication",
    ],
  },
  {
    name: "Growth",
    prices: {
      bd: "65,000 Tk",
      intl: "$2450",
    },
    suffix: "/ month",
    description: "For growing businesses & agencies",
    detail:
      "Ideal for brands and agencies that need faster execution, more parallel work, and consistent improvements across multiple pages or campaigns.",
    cta: "Get Started",
    accentClass: "agency-pricing-plan-growth",
    badge: "Most Popular",
    turnaround: "Priority queue with faster turnaround",
    idealFor: "Growing brands, marketing teams, agencies",
    features: [
      "2 active requests at the same time",
      "Priority delivery over Starter",
      "Larger multi-site websites, website redesigns, and high-converting landing pages",
      "UI/UX improvements to improve usability and polish",
      "Basic SEO optimization for key pages",
      "Faster turnaround for growth-focused teams",
      "Unlimited revisions until the work is right",
      "Email and WhatsApp support for quick communication",
    ],
  },
  {
    name: "Pro",
    prices: {
      bd: "120,000+ Tk",
      intl: "$5000",
    },
    suffix: "/ month",
    description: "For serious scaling teams",
    detail:
      "Designed for high-volume teams that want a dedicated-team experience, deeper strategic support, and faster execution for ongoing growth work.",
    cta: "Get Started",
    accentClass: "agency-pricing-plan-pro",
    turnaround: "Same-day or next-day for small tasks",
    idealFor: "Scaling companies, agencies, high-output teams",
    features: [
      "3+ active requests depending on scope",
      "Dedicated team feel with ongoing momentum",
      "Advanced UI/UX systems and component consistency",
      "Conversion optimization for key landing pages",
      "Strategy support for prioritization and growth",
      "Same-day or next-day delivery for smaller tasks",
      "Unlimited revisions until the work is right",
      "Email and WhatsApp support for quick communication",
    ],
  },
];

const getPlanWhatsappHref = (plan, price) => {
  const message = `Hi, I'm interested in the ${plan.name} package (${price} ${plan.suffix}). I'd like to get started.`;
  return `https://wa.me/8801858333238?text=${encodeURIComponent(message)}`;
};

export default function AgencyPricingPlans() {
  const { location } = useLocation();
  const isBangladesh = location?.country === "Bangladesh";

  return (
    <div className="agency-pricing-plan-grid">
      {plans.map((plan) => {
        const price = isBangladesh ? plan.prices.bd : plan.prices.intl;

        return (
          <article
            key={plan.name}
            className={`agency-pricing-plan-card ${plan.accentClass} ${
              plan.badge ? "agency-pricing-plan-featured" : ""
            }`}
          >
            {plan.badge ? <div className="agency-pricing-badge">{plan.badge}</div> : null}
            <h3>{plan.name}</h3>
            <div className="agency-pricing-price">
              {price}
              <span>{plan.suffix}</span>
            </div>
            <p>{plan.description}</p>
            <p className="agency-pricing-plan-detail">{plan.detail}</p>
            <div className="agency-pricing-plan-meta">
              <div className="agency-pricing-plan-meta-item">
                <span>Ideal for</span>
                <strong>{plan.idealFor}</strong>
              </div>
              <div className="agency-pricing-plan-meta-item">
                <span>Turnaround</span>
                <strong>{plan.turnaround}</strong>
              </div>
            </div>
            <ul className="agency-pricing-list">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="cta-glitter-wrap">
              <a
                href={getPlanWhatsappHref(plan, price)}
                target="_blank"
                rel="noreferrer"
                className={`btn-lg fw-semibold text-white shadow-sm cta-glitter-button w-100 agency-pricing-package-cta ${
                  plan.badge
                    ? "agency-pricing-package-cta-primary"
                    : "agency-pricing-package-cta-secondary"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
