"use client";

import { PopupWrapper } from "@/components/headers/components/PopupWrapper";
import { useState } from "react";

const developmentPlans = [
  {
    title: "Starter",
    badge: "Best For Launch",
    badgeBackground: "linear-gradient(30deg, rgba(76, 151, 255, 0.9) 0%, rgba(82, 100, 255, 0.9) 100%)",
    price: "$599",
    delivery: "10-14 Days",
    description:
      "Perfect for businesses that need a clean, professional website launched fast with all the essentials in place.",
    features: [
      "Custom UI Design",
      "Next.js Development",
      "Fully Responsive Design",
      "Up to 5 Pages",
      "SEO Optimized Structure",
      "Fast Performance Optimization",
      "Contact Form Integration",
      "Basic Animations",
      "Google Analytics Setup",
      "Basic On-Page SEO Setup",
      "Deployment (Vercel / Hostinger)",
    ],
    pages: [
      "Home",
      "About",
      "Services",
      "Blog / Portfolio",
      "FAQ",
      "Testimonials",
      "Contact",
      "Thank You Page",
    ],
    stack: ["Next.js", "TailwindCSS", "Vercel Deployment"],
  },
  {
    title: "Growth",
    badge: "Most Popular",
    badgeBackground: "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
    price: "$2,500",
    delivery: "3-4 Weeks",
    description:
      "Built for growing businesses that need a polished, high-converting website with stronger branding, smart integrations, and room to scale.",
    features: [
      "Up to 12 Pages",
      "Custom UI/UX Design",
      "Advanced Animations",
      "SEO Optimization",
      "Lead Capture Forms",
      "WhatsApp / Live Chat Integration",
      "Basic CMS / Blog Management",
      "Authentication System",
      "Database Integration",
      "Payment Gateway Integration",
      "API Integrations",
      "Performance Optimization",
      "Basic Admin Panel",
      "Analytics Setup",
      "Security & Optimization",
    ],
    pages: [
      "Home",
      "About",
      "Services",
      "Portfolio / Case Studies",
      "Blog",
      "Pricing",
      "FAQ",
      "Contact",
      "Testimonials",
      "Team",
      "Careers",
      "Service Detail Pages",
      "Case Study",
      "Resources",
      "Lead Magnet Page",
      "Newsletter / Subscribe",
      "Privacy Policy",
      "Dashboard Overview",
      "Leads Dashboard",
      "Analytics Dashboard",
      "Settings Dashboard",
    ],
    stack: [
      "Next.js",
      "TailwindCSS / Shadcn",
      "Headless CMS (Sanity / Strapi)",
      "Vercel / Cloud Deployment",
    ],
    featured: true,
  },
  {
    title: "Premium",
    badge: "Best For Scale",
    badgeBackground: "linear-gradient(30deg, rgba(168, 85, 247, 0.92) 0%, rgba(99, 102, 241, 0.92) 100%)",
    price: "$8,500",
    delivery: "6-10 Weeks",
    description:
      "Built for SaaS products, platforms, and custom web apps that need scalable architecture, premium UX, and revenue-ready functionality.",
    features: [
      "12-20 Pages",
      "Full Custom UI/UX System",
      "Advanced Next.js Architecture",
      "Authentication System",
      "Dashboard / Admin Panel",
      "Database Integration",
      "API Development",
      "Payment Gateway Integration",
      "Real-time Features",
      "Role-Based Access",
      "Advanced Analytics & Reporting",
      "CRM / ERP Integrations",
      "Notifications (Email / SMS / Push)",
      "CMS / Content Management",
      "Staging & Deployment Workflow",
      "Advanced Security",
      "After Sales Support",
      "Performance Scaling",
    ],
    pages: [
      "Home",
      "About",
      "Services",
      "Portfolio / Case Studies",
      "Pricing",
      "Blog",
      "Contact",
      "Login / Signup",
      "User Profile",
      "Billing / Subscription",
      "Notifications",
      "Dashboard Overview",
      "Users / Team Management",
      "Orders / Transactions",
      "Analytics Dashboard",
      "Reports",
      "Integrations",
      "Support / Help Center",
      "Settings & Security",
    ],
    stack: [
      "Next.js",
      "Node.js",
      "MongoDB / PostgreSQL",
      "Stripe / Payment Gateway",
      "Cloud Deployment",
    ],
  },
];

const designPlans = [
  {
    title: "Starter",
    badge: "Best For MVP",
    badgeBackground:
      "linear-gradient(30deg, rgba(76, 151, 255, 0.9) 0%, rgba(82, 100, 255, 0.9) 100%)",
    price: "$399",
    delivery: "1-2 Weeks",
    description:
      "Great for startups that need clean UI screens, wireframes, and a fast visual direction for launch.",
    features: [
      "UI/UX Audit",
      "Wireframes",
      "5-8 Core Screens",
      "Responsive Web or Mobile Layouts",
      "Clickable Prototype",
      "Basic Design System",
      "Developer Handoff",
      "2 Revision Rounds",
    ],
    pages: [
      "Landing Page",
      "About",
      "Services",
      "Contact",
      "FAQ",
      "Primary App Screens",
    ],
    stack: ["Figma", "Prototype", "Design System"],
  },
  {
    title: "Growth",
    badge: "Most Popular",
    badgeBackground: "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
    price: "$1,150",
    delivery: "2-4 Weeks",
    description:
      "Best for growing products that need stronger UX thinking, polished interfaces, and conversion-focused user flows.",
    features: [
      "Full UI/UX Strategy",
      "User Flow Mapping",
      "10-16 Core Screens",
      "Responsive Web & Mobile Layouts",
      "Interactive Prototype",
      "Design System Foundations",
      "Conversion-Focused Sections",
      "Developer Handoff",
      "3 Revision Rounds",
    ],
    pages: [
      "Homepage",
      "About",
      "Services",
      "Pricing",
      "Portfolio",
      "Case Study",
      "Team",
      "FAQ",
      "Dashboard Overview",
      "App Core Screens",
    ],
    stack: ["Figma", "FigJam", "Prototype", "Design QA"],
    featured: true,
  },
  {
    title: "Premium",
    badge: "Best For Scale",
    badgeBackground:
      "linear-gradient(30deg, rgba(168, 85, 247, 0.92) 0%, rgba(99, 102, 241, 0.92) 100%)",
    price: "$3,500+",
    delivery: "4-6 Weeks",
    description:
      "Built for SaaS products and advanced platforms that need premium UX strategy, scalable design systems, and polished product experiences.",
    features: [
      "Product UX Strategy",
      "User Journey Mapping",
      "Advanced Wireframing",
      "16-30+ High-Fidelity Screens",
      "Full Product Design System",
      "Dashboard / SaaS Interface Design",
      "Complex User Flows",
      "Interactive Prototypes",
      "Mobile + Web Experience Design",
      "Conversion-Focused UX",
      "Developer Handoff",
      "UI Quality Assurance",
      "Priority Revisions",
    ],
    pages: [
      "Marketing Pages",
      "Case Studies",
      "Pricing",
      "FAQ",
      "Support",
      "Dashboard",
      "Admin Panel",
      "Billing",
      "Settings",
      "Authentication",
      "User Profile",
      "Mobile App Flows",
    ],
    stack: ["Figma", "FigJam", "Prototype", "Component System", "Design QA"],
  },
];

const premiumFeatureExplanations = {
  "12-20 Pages":
    "A larger scope for advanced websites or platforms with multiple customer-facing and internal screens.",
  "Full Custom UI/UX System":
    "A tailored visual and user experience system designed specifically for your product, audience, and goals.",
  "Advanced Next.js Architecture":
    "A scalable frontend structure built for performance, maintainability, and future feature growth.",
  "Authentication System":
    "Secure login, signup, password reset, and protected user access flows for your platform.",
  "Dashboard / Admin Panel":
    "An internal control area for managing users, content, products, data, or operations.",
  "Database Integration":
    "Connecting your application to a database so content, users, transactions, and records can be stored and managed dynamically.",
  "API Development":
    "Custom backend endpoints or integrations that allow your app to exchange data securely with other systems.",
  "Payment Gateway Integration":
    "Connecting Stripe, SSLCommerz, or similar providers so customers can make payments inside your platform.",
  "Real-time Features":
    "Live updates such as notifications, chats, dashboards, or activity states without needing manual refresh.",
  "Role-Based Access":
    "Different user types can see and do different things based on permissions and access levels.",
  "Advanced Analytics & Reporting":
    "Custom reports and dashboards that help you monitor business performance and user activity.",
  "CRM / ERP Integrations":
    "Connecting your platform with sales, operations, or business systems like HubSpot, Salesforce, Odoo, or similar tools.",
  "Notifications (Email / SMS / Push)":
    "Automated communication flows to keep users informed through email, SMS, or in-app/push messages.",
  "CMS / Content Management":
    "An admin-friendly way to update content, pages, blogs, case studies, or marketing sections without developer help.",
  "Staging & Deployment Workflow":
    "We set up a safer process to review updates before they go live, making launches smoother and reducing mistakes.",
  "Advanced Security":
    "Stronger protection through secure architecture, validation, access control, and vulnerability-conscious implementation.",
  "After Sales Support":
    "Post-launch support to help with fixes, guidance, small adjustments, and smoother adoption after delivery.",
  "Performance Scaling":
    "Optimization for speed, stability, and growth as your traffic, users, and feature complexity increase.",
  "Product UX Strategy":
    "A deeper experience strategy focused on how users move through your product and complete valuable actions.",
  "User Journey Mapping":
    "Mapping how users move through the product to identify friction points and improve conversion or usability.",
  "Advanced Wireframing":
    "More detailed structural planning before visual design, especially useful for complex products and dashboards.",
  "16-30+ High-Fidelity Screens":
    "A broader design scope covering key user flows, edge cases, and more of the full product experience.",
  "Full Product Design System":
    "A reusable set of UI rules, components, and patterns that keeps the product consistent as it scales.",
  "Dashboard / SaaS Interface Design":
    "Designing data-heavy interfaces, admin experiences, and product workflows for software platforms.",
  "Complex User Flows":
    "Handling advanced journeys like onboarding, subscriptions, account settings, or multi-step actions.",
  "Interactive Prototypes":
    "Clickable product simulations that help validate ideas before development starts.",
  "Mobile + Web Experience Design":
    "Design coverage for both mobile and desktop experiences so the product feels unified across devices.",
  "Conversion-Focused UX":
    "Design decisions aimed at increasing signups, leads, purchases, or other business-critical actions.",
  "Developer Handoff":
    "Organizing design files, specs, and interactions so developers can build with clarity and fewer revisions.",
  "UI Quality Assurance":
    "We review the developed screens against the approved design and flag visual, spacing, responsive, and UI consistency issues before launch.",
  "Priority Revisions":
    "Faster iteration and refinement during the active project window for high-priority feedback.",
};

function Pill({ children }) {
  return (
    <span
      className="d-inline-flex align-items-center"
      style={{
        padding: "7px 12px",
        borderRadius: "999px",
        background: "rgba(10, 19, 61, 0.55)",
        border: "1px solid rgba(136, 118, 255, 0.28)",
        color: "rgba(255,255,255,0.78)",
        fontSize: "13px",
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

function InfoTooltip({ text }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      style={{ position: "relative", display: "inline-flex", verticalAlign: "middle" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="More information"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "18px",
          height: "18px",
          marginLeft: "8px",
          borderRadius: "999px",
          border: "1px solid rgba(136, 118, 255, 0.55)",
          background: "rgba(12, 18, 54, 0.55)",
          color: "#EAA0FF",
          fontSize: "11px",
          fontWeight: 700,
          cursor: "help",
          padding: 0,
          lineHeight: 1,
        }}
      >
        i
      </button>
      {open ? (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            left: "28px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "220px",
            padding: "10px 12px",
            borderRadius: "12px",
            background: "rgba(8, 16, 44, 0.96)",
            border: "1px solid rgba(136, 118, 255, 0.32)",
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.28)",
            color: "rgba(255,255,255,0.9)",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: 1.45,
            zIndex: 20,
          }}
        >
          {text}
        </span>
      ) : null}
    </span>
  );
}

function FeatureIcon() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "18px",
        height: "18px",
        borderRadius: "999px",
        border: "1px solid rgba(136, 118, 255, 0.55)",
        background: "rgba(12, 18, 54, 0.55)",
        color: "#EAA0FF",
        fontSize: "11px",
        fontWeight: 700,
        lineHeight: 1,
        flexShrink: 0,
        marginTop: "1px",
      }}
    >
      &#10003;
    </span>
  );
}

export default function PricingShowcase() {
  const [activeTab, setActiveTab] = useState("development");
  const plans = activeTab === "development" ? developmentPlans : designPlans;

  return (
    <section
      className="page-section scrollSpysection"
      id="pricing"
      style={{
        background: "linear-gradient(-80deg, #621ABE 0%, #051D55 50%)",
        paddingTop: "84px",
      }}
    >
      <div className="container position-relative">
        <div className="row mb-50 mb-sm-40">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div
              className="d-inline-flex align-items-center justify-content-center mb-20"
              style={{
                color: "#E75778",
                fontSize: "15px",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Pricing
            </div>
            <h3
              className="section-title-small mb-0"
              style={{ color: "#fff", lineHeight: 1.2, fontWeight: 600 }}
            >
              Flexible plans built for
              <br />
              <span
                className="pricing-showcase-heading-accent"
                style={{
                  background: "linear-gradient(30deg, #E75778 0%, #8876FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                Launches, Growth, and Scale.
              </span>
            </h3>
          </div>
        </div>

        <div className="row mb-40 mb-sm-30">
          <div className="col-12 d-flex justify-content-center">
            <div
              className="d-inline-flex align-items-center pricing-showcase-tabs"
              style={{
                padding: "6px",
                borderRadius: "999px",
                background: "rgba(5, 29, 85, 0.45)",
                border: "1px solid rgba(136, 118, 255, 0.35)",
                gap: "6px",
              }}
            >
              {[
                { id: "design", label: "Design" },
                { id: "development", label: "Development" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className="pricing-showcase-tab-button"
                  style={{
                    border: "none",
                    borderRadius: "999px",
                    padding: "12px 20px",
                    minWidth: "140px",
                    background:
                      activeTab === tab.id
                        ? "linear-gradient(30deg, #E75778 0%, #8876FF 100%)"
                        : "transparent",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    boxShadow:
                      activeTab === tab.id
                        ? "0 10px 22px rgba(136, 118, 255, 0.28)"
                        : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="row g-4">
          {plans.map((plan) => (
            <div key={plan.title} className="col-lg-4 d-flex">
              <div
                className="w-100 h-100 d-flex flex-column pricing-showcase-card"
                style={{
                  position: "relative",
                  padding: "24px 22px",
                  borderRadius: "22px",
                  background: plan.featured
                    ? "linear-gradient(180deg, rgba(12, 37, 108, 0.98) 0%, rgba(18, 36, 96, 0.98) 100%)"
                    : "rgba(5, 29, 85, 0.9)",
                  border: plan.featured
                    ? "1px solid rgba(231, 87, 120, 0.72)"
                    : "1px solid rgba(136, 118, 255, 0.55)",
                  boxShadow: plan.featured
                    ? "0 24px 60px rgba(17, 8, 54, 0.52), 0 0 0 1px rgba(136, 118, 255, 0.45), 0 0 36px rgba(231, 87, 120, 0.18)"
                    : "0 14px 34px rgba(10, 9, 44, 0.28)",
                  color: "#fff",
                  transform: plan.featured ? "translateY(-8px)" : "none",
                }}
              >
                <div
                  className="pricing-showcase-badge"
                  style={{
                    position: "absolute",
                    top: "-1px",
                    right: "20px",
                    padding: "10px 16px 11px",
                    borderRadius: "0 0 14px 14px",
                    background: plan.badgeBackground,
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    boxShadow: plan.featured
                      ? "0 12px 24px rgba(231, 87, 120, 0.24)"
                      : "0 10px 18px rgba(8, 18, 58, 0.2)",
                  }}
                >
                  {plan.badge}
                </div>
                <div
                  className="pricing-showcase-plan-title"
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "15px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  {plan.title}
                </div>
                <div className="pricing-showcase-spacer" style={{ height: "38px", marginBottom: "20px" }} />
                <div
                  className="pricing-showcase-price"
                  style={{
                    fontSize: "52px",
                    lineHeight: 1.05,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    marginBottom: "12px",
                  }}
                >
                  {plan.price}
                </div>
                <div
                  className="pricing-showcase-delivery"
                  style={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  Delivery: {plan.delivery}
                </div>
                <p
                  className="pricing-showcase-description"
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: "16px",
                    lineHeight: 1.55,
                    marginBottom: "20px",
                  }}
                >
                  {plan.description}
                </p>

                <ul className="list-unstyled mb-30 pricing-showcase-features">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="d-flex align-items-start pricing-showcase-feature-item"
                      style={{
                        gap: "12px",
                        marginBottom: "11px",
                        color: "rgba(255,255,255,0.88)",
                        fontSize: "16px",
                      }}
                    >
                      <FeatureIcon />
                      <span>
                        {feature}
                        {plan.title === "Premium" &&
                        premiumFeatureExplanations[feature] ? (
                          <InfoTooltip text={premiumFeatureExplanations[feature]} />
                        ) : feature === "UI Quality Assurance" ? (
                          <InfoTooltip text="We review the developed screens against the approved design and flag visual, spacing, responsive, and UI consistency issues before launch." />
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mb-20">
                  <div
                    className="pricing-showcase-meta-title"
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Pages Example
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {plan.pages.map((item) => (
                      <Pill key={item}>{item}</Pill>
                    ))}
                  </div>
                </div>

                <div className="mb-30">
                  <div
                    className="pricing-showcase-meta-title"
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Tech Stack
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {plan.stack.map((item) => (
                      <Pill key={item}>{item}</Pill>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  <PopupWrapper
                    minWidth="100%"
                    buttonText="Get A Free Consultation"
                    height="3rem"
                    plan={{ title: plan.title, price: plan.price }}
                    isFullWidth={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 992px) {
          #pricing {
            padding-top: 68px !important;
          }

          .pricing-showcase-card {
            padding: 18px 16px !important;
            border-radius: 18px !important;
          }

          .pricing-showcase-badge {
            right: 14px !important;
            padding: 8px 12px 9px !important;
            font-size: 10px !important;
          }

          .pricing-showcase-plan-title {
            font-size: 13px !important;
            margin-bottom: 7px !important;
          }

          .pricing-showcase-spacer {
            height: 22px !important;
            margin-bottom: 12px !important;
          }

          .pricing-showcase-price {
            font-size: 40px !important;
            margin-bottom: 8px !important;
          }

          .pricing-showcase-delivery {
            font-size: 14px !important;
            margin-bottom: 7px !important;
          }

          .pricing-showcase-description {
            font-size: 13px !important;
            line-height: 1.42 !important;
            margin-bottom: 14px !important;
          }

          .pricing-showcase-features {
            margin-bottom: 18px !important;
          }

          .pricing-showcase-feature-item {
            gap: 9px !important;
            margin-bottom: 8px !important;
            font-size: 13px !important;
          }

          .pricing-showcase-meta-title {
            font-size: 12px !important;
            margin-bottom: 9px !important;
          }
        }

        @media (max-width: 767.98px) {
          #pricing {
            padding-bottom: 32px !important;
          }

          .pricing-showcase-heading-accent {
            margin-left: 6px;
          }

          .pricing-showcase-tabs {
            width: 100%;
            justify-content: center;
          }

          .pricing-showcase-tab-button {
            min-width: 112px !important;
            padding: 10px 14px !important;
            font-size: 12px !important;
          }

          .pricing-showcase-card {
            padding: 18px 16px !important;
            border-radius: 18px !important;
            transform: none !important;
          }

          .pricing-showcase-badge {
            right: 14px !important;
            padding: 8px 12px 9px !important;
            font-size: 10px !important;
            letter-spacing: 0.05em !important;
          }

          .pricing-showcase-plan-title {
            font-size: 13px !important;
            margin-bottom: 8px !important;
          }

          .pricing-showcase-spacer {
            height: 28px !important;
            margin-bottom: 14px !important;
          }

          .pricing-showcase-price {
            font-size: 38px !important;
            margin-bottom: 8px !important;
          }

          .pricing-showcase-delivery {
            font-size: 14px !important;
            margin-bottom: 8px !important;
          }

          .pricing-showcase-description {
            font-size: 13px !important;
            line-height: 1.45 !important;
            margin-bottom: 16px !important;
          }

          .pricing-showcase-features {
            margin-bottom: 20px !important;
          }

          .pricing-showcase-feature-item {
            gap: 10px !important;
            margin-bottom: 9px !important;
            font-size: 14px !important;
          }

          .pricing-showcase-meta-title {
            font-size: 12px !important;
            margin-bottom: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
