"use client";

import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { fancyMultipage } from "@/data/menu";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
  HeroHeading,
  FadeUp,
  SlideReveal,
  ScaleReveal,
  GlowPulse,
} from "@/components/mvp/ScrollReveal";
import NavToggle from "@/components/mvp/NavToggle";
import FlipBook from "@/components/mvp/FlipBook";
import PaymentModal from "@/components/mvp/PaymentModal";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Box,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Crosshair,
  Download,
  FileText,
  Gauge,
  Gift,
  Hourglass,
  Lightbulb,
  List,
  LockKeyhole,
  Mail,
  PackageCheck,
  Play,
  Rocket,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Star,
  Target,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

const roadmap = [
  [
    Target,
    "Define the Problem",
    "Turn your idea into a clear, testable problem statement.",
  ],
  [
    Users,
    "Identify Core Customers",
    "Find and understand your earliest users.",
  ],
  [
    FileText,
    "Craft Your Value Proposition",
    "Communicate real value, not just features.",
  ],
  [Box, "Decide Core Features", "Focus only on what matters for validation."],
  [Rocket, "Build & Release", "Get to market quickly with a lean MVP."],
  [BarChart3, "Measure & Iterate", "Use real feedback to improve and grow."],
];

const faqs = [
  [
    "Is this only for technology startups?",
    "No. The validation framework works for digital services, SaaS, marketplaces, internal tools, and many other product ideas.",
  ],
  [
    "How will I receive the playbook?",
    "You will receive instant digital access after checkout, along with a download link by email.",
  ],
  [
    "Do I need technical knowledge?",
    "No. The guide uses practical language and step-by-step worksheets for both technical and non-technical founders.",
  ],
  [
    "Can I print the worksheets?",
    "Yes. Every worksheet is designed to be completed digitally or printed.",
  ],
  [
    "Is this a physical book?",
    "No. This is a digital playbook so you can access it immediately from anywhere.",
  ],
  [
    "Will I receive future updates?",
    "Yes. Your purchase includes future updates to this edition of the playbook.",
  ],
];

function BookMockup({ compact = false }) {
  return (
    <div>
      <img src="/assets/images/mvp/mvp-ebook.png" alt="MVP Playbook" />
    </div>
  );
}

function Eyebrow({ children }) {
  return <span className="mvp-eyebrow">{children}</span>;
}

export default function DigitalProductMvpPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setStickyVisible(window.scrollY > 420);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openPayment = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <div className="mvp-page theme-fancy">
      <PaymentModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {/* ===== Announcement Bar ===== */}
      <div className="mvp-announcement">
        <span>🚀 For founders who want to validate before they overspend.</span>
        <a href="#offer">
          Get the Playbook <ArrowRight />
        </a>
      </div>

      {/* ===== MVP Navigation ===== */}
      <nav className="mvp-nav mvp-nav-animate">
        <div className="mvp-shell">
          <a href="/" className="mvp-logo">
            <Image
              src="/assets/images/mvp/logo-mvp.png"
              alt="InfiniSoft Technology"
              width={140}
              height={32}
            />
          </a>
          <nav className="mvp-nav-links">
            <a href="#learn">What You&apos;ll Learn</a>
            <a href="#inside">Inside the Guide</a>
            <a href="#audience">Who It&apos;s For</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#offer" className="mvp-nav-cta" onClick={openPayment}>
            Get Instant Access
          </a>
          <NavToggle onPaymentClick={openPayment} />
        </div>
      </nav>

      <main>
        {/* ===== Hero Section ===== */}
        <section className="mvp-hero">
          <div className="mvp-hero-background" aria-hidden="true" />
          <div className="mvp-hero-bg-art" aria-hidden="true" />

          <div className="mvp-shell">
            <div className="mvp-hero-grid">
              <div className="mvp-hero-copy">
                <FadeUp delay={0.05}>
                  <Eyebrow>The Founder&apos;s Field Guide</Eyebrow>
                </FadeUp>

                <HeroHeading
                  line1="Build Fast. Learn Faster."
                  line2="Launch With Confidence."
                />

                <FadeUp delay={0.1}>
                  <p>
                    A practical, visual playbook that helps founders turn an idea
                    into a focused MVP—without wasting months building the wrong
                    product.
                  </p>
                </FadeUp>

                <StaggerContainer className="mvp-hero-values" delay={0.15}>
                  <StaggerItem>
                    <div className="mvp-hero-val-item">
                      <div className="mvp-hero-val-badge">
                        <Target />
                      </div>
                      <span className="mvp-hero-val-text">
                        Define the{" "}
                        <br />
                        right problem
                      </span>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="mvp-hero-val-item">
                      <div className="mvp-hero-val-badge">
                        <List />
                      </div>
                      <span className="mvp-hero-val-text">
                        Choose only{" "}
                        <br />
                        essential features
                      </span>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="mvp-hero-val-item">
                      <div className="mvp-hero-val-badge">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          aria-hidden="true"
                        >
                          <rect x="2" y="11" width="3.6" height="7" rx="1.8" fill="currentColor" />
                          <rect x="8.2" y="6.5" width="3.6" height="11.5" rx="1.8" fill="currentColor" />
                          <rect x="14.4" y="2" width="3.6" height="16" rx="1.8" fill="currentColor" />
                        </svg>
                      </div>
                      <span className="mvp-hero-val-text">
                        Launch, measure{" "}
                        <br />
                        and improve
                      </span>
                    </div>
                  </StaggerItem>
                </StaggerContainer>

                <StaggerContainer className="mvp-actions" delay={0.2}>
                  <StaggerItem>
                    <GlowPulse>
                      <a
                        href="#offer"
                        className="mvp-btn mvp-btn-primary"
                        onClick={openPayment}
                      >
                        Get the MVP Playbook
                        <ArrowRight />
                      </a>
                    </GlowPulse>
                  </StaggerItem>

                  <StaggerItem>
                    <a href="#preview" className="mvp-btn mvp-btn-outline">
                      <Play />
                      Preview The Book
                    </a>
                  </StaggerItem>
                </StaggerContainer>

                <FadeUp delay={0.25}>
                  <small className="mvp-access-note">
                    Instant PDF access &bull; Practical worksheets &bull; Read
                    online
                  </small>
                </FadeUp>

                <FadeUp delay={0.3}>
                  <p className="mvp-author-line">
                    Created by <strong>Rakib Rahman</strong>
                    &mdash; Founder &amp; CTO, InfiniSoft Technology
                  </p>
                </FadeUp>
              </div>
              <div className="mvp-hero-artwork" aria-hidden="true">
                <Image
                  src="/assets/images/mvp/mvp-playbook-hero.jpg"
                  alt="The MVP Playbook — Build Fast. Learn Faster."
                  width={966}
                  height={941}
                  sizes="(max-width: 768px) 100vw, 530px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== Problem Section ===== */}
        <section className="mvp-problem">
          <div className="mvp-shell">
            <div className="mvp-problem-grid">
              <SlideReveal from="left">
                <div>
                  <Eyebrow>The Problem</Eyebrow>
                  <h2>Most MVPs Don&apos;t Fail Because of Bad Code.</h2>
                  <p>
                    They fail because teams build too much, too early, for the
                    wrong customer.
                  </p>
                </div>
              </SlideReveal>
              <StaggerContainer className="mvp-problem-cards">
                <StaggerItem>
                  <article>
                    <div className="mvp-problem-icon bg-red">
                      <Zap />
                    </div>
                    <h3>Unclear Problem</h3>
                    <p>You start with features instead of customer pain.</p>
                  </article>
                </StaggerItem>
                <StaggerItem>
                  <article>
                    <div className="mvp-problem-icon bg-orange">
                      <PackageCheck />
                    </div>
                    <h3>Bloated Scope</h3>
                    <p>Nice-to-have ideas delay real validation.</p>
                  </article>
                </StaggerItem>
                <StaggerItem>
                  <article>
                    <div className="mvp-problem-icon bg-purple">
                      <CircleHelp />
                    </div>
                    <h3>Guesswork</h3>
                    <p>Decisions are made without user evidence.</p>
                  </article>
                </StaggerItem>
              </StaggerContainer>
            </div>
            <div className="mvp-warning">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#C02B13"
                aria-hidden="true"
                style={{ display: "inline-block", verticalAlign: "-3px", marginRight: "7px" }}
              >
                <path d="M12 2L1 21h22L12 2zm0 3.8l8.5 14.2H3.5L12 5.8zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
              </svg>
              <strong>The cost isn&apos;t only money.</strong> It&apos;s
              months of learning lost.
            </div>
          </div>
        </section>

        {/* ===== Transformation Section ===== */}
        <section className="mvp-transformation">
          <div className="mvp-transform-stars" />
          <div className="mvp-transform-glow" />
          <div className="mvp-shell mvp-transform-inner">
            <FadeUp>
              <Eyebrow>The Transformation</Eyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2>From Scattered Idea to Testable Product</h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p>
                The MVP Playbook gives you a repeatable path from assumption
                to evidence.
              </p>
            </FadeUp>
            <div className="mvp-transform-timeline">
              {[
                { icon: <Lightbulb />, label: "Vague Idea" },
                { icon: <FileText />, label: "Clear Problem" },
                { icon: <Users />, label: "Core Customer" },
                { icon: <Gift />, label: "Value Proposition" },
                { icon: <Settings />, label: "Lean Features" },
                {
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <rect x="2" y="11" width="3.6" height="7" rx="1.8" fill="currentColor" />
                      <rect x="8.2" y="6.5" width="3.6" height="11.5" rx="1.8" fill="currentColor" />
                      <rect x="14.4" y="2" width="3.6" height="16" rx="1.8" fill="currentColor" />
                    </svg>
                  ),
                  label: "Real Feedback",
                },
              ].map((step, index) => (
                <Fragment key={step.label}>
                  <div className="mvp-transform-step-wrap">
                    <StaggerItem>
                      <div className="mvp-transform-step">
                        <div className="mvp-transform-icon">
                          {step.icon}
                        </div>
                        <span className="mvp-transform-label">{step.label}</span>
                      </div>
                    </StaggerItem>
                  </div>
                  {index < 5 && (
                    <div className="mvp-transform-arrow" aria-hidden="true">
                      <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
                        <line x1="1" y1="6" x2="23" y2="6" stroke="#4ecaff" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M19 2.5L23.5 6L19 9.5" stroke="#4ecaff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </Fragment>
              ))}
              <div className="mvp-transform-rocket" aria-hidden="true">
                <span className="mvp-transform-handwritten">
                  Ideas to
                  <br />
                  impact
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Roadmap Section ===== */}
        <section className="mvp-section" id="learn">
          <div className="mvp-shell">
            <FadeUp>
              <Eyebrow>What You Will Learn</Eyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mvp-section-title">
                A Complete MVP Roadmap&mdash;Without the Fluff
              </h2>
            </FadeUp>
            <StaggerContainer className="mvp-roadmap">
              {roadmap.map(([Icon, title, text], index) => (
                <StaggerItem key={title}>
                  <article>
                    <div className="mvp-roadmap-header">
                      <strong>0{index + 1}</strong>
                      <Icon />
                    </div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ===== Preview Flipbook Section ===== */}
        <section className="mvp-preview" id="preview">
          <div className="mvp-shell mvp-preview-grid">
            <SlideReveal from="left">
              <div className="mvp-preview-copy">
                <Eyebrow>See It Yourself</Eyebrow>
                <h2>
                  Flip Through <br />
                  Before You Buy
                </h2>
                <p>
                  Preview selected pages and experience the guide like a real
                  book.
                </p>
                <GlowPulse>
                  <a
                    href="#preview"
                    className="mvp-btn mvp-btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent("open-flipbook-modal"));
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M11 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7V4z" />
                      <path d="M13 4h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-7V4z" />
                    </svg>
                    Open Interactive Preview
                  </a>
                </GlowPulse>
                <small>Preview includes selected pages only.</small>
              </div>
            </SlideReveal>
            <ScaleReveal delay={0.2}>
              <FlipBook />
            </ScaleReveal>
          </div>
        </section>

        {/* ===== Inside Section ===== */}
        <section className="mvp-inside" id="inside">
          <div className="mvp-shell mvp-inside-grid">
            <SlideReveal from="left">
              <div>
                <Eyebrow>What Is Inside</Eyebrow>
                <h2>
                  <span className="mvp-inside-h2-line">Practical Templates.</span>
                  <span className="mvp-inside-h2-line">Real Guidance.</span>
                </h2>
                <p>
                  A focused, beautifully designed guide with worksheets and
                  frameworks you can apply right away.
                </p>
                <StaggerContainer>
                  {[
                    "11 professionally designed pages",
                    "Problem Statement Canvas",
                    "Target Customer Canvas",
                    "Feature Prioritization Matrix",
                    "12-Day Build Plan",
                    "Metrics & Feedback Framework",
                    "Launch Checklist",
                    "Downloadable high-resolution PDF",
                  ].map((item) => (
                    <StaggerItem key={item}>
                      <li>
                        <span className="mvp-check-icon bg-blue">
                          <Check />
                        </span>
                        {item}
                      </li>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </SlideReveal>
            <ScaleReveal delay={0.2}>
              <div className="mvp-inside-image">
                <img
                  src="/assets/images/mvp/inside-paper.png"
                  alt="Inside the MVP Playbook"
                  width={1200}
                  height={800}
                />
              </div>
            </ScaleReveal>
          </div>
        </section>

        {/* ===== Audience Section ===== */}
        <section className="mvp-audience" id="audience">
          <div className="mvp-shell">
            <FadeUp>
              <Eyebrow>Who It Is For</Eyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2>Built for People Turning Ideas Into Products</h2>
            </FadeUp>
            <StaggerContainer className="mvp-audience-grid">
              {[
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#0878e8" aria-hidden="true">
                      <circle cx="12" cy="6.5" r="4.2" />
                      <path d="M4 20.2c0-4.4 3.6-7.2 8-7.2s8 2.8 8 7.2v.8H4v-.8z" />
                    </svg>
                  ),
                  title: "Founders & Co-Founders",
                  text: "Validate ideas before investing serious time and money.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#0878e8" aria-hidden="true">
                      <path d="M12 2a4 4 0 0 1 4 4c0 1.2-.5 2.3-1.3 3l-.7.6V11h-4V9.6l-.7-.6C8.5 8.3 8 7.2 8 6a4 4 0 0 1 4-4z" />
                      <path d="M4 17.5c0-2.8 2.2-4.8 5-4.8h6c2.8 0 5 2 5 4.8v3.5H4v-3.5z" />
                      <path d="M10.8 13h2.4v3.5l-1.2 1-1.2-1V13z" fill="#ffffff" />
                    </svg>
                  ),
                  title: "Product Owners",
                  text: "Use a structured approach to build what matters.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#0878e8" aria-hidden="true">
                      <circle cx="12" cy="4.8" r="3.2" />
                      <path d="M7 9.5c0 2.8 3.5 4.8 5 5.7 1.5-.9 5-2.9 5-5.7H7z" />
                      <path d="M6 20.2c0-2.8 4-4.8 6-5.8 2 1 6 3 6 5.8v.8H6v-.8z" />
                    </svg>
                  ),
                  title: "Entrepreneurs",
                  text: "Turn ideas into real solutions with less risk.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="4.5" y="2" width="15" height="20" rx="3.5" fill="#0878e8" />
                      <rect x="7" y="4.5" width="10" height="12" rx="1.5" fill="#ffffff" />
                      <circle cx="12" cy="19" r="1" fill="#ffffff" />
                      <path d="M9 7.5h6M9 10.5h4M9 13.5h5" stroke="#0878e8" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  ),
                  title: "Early-Stage Builders",
                  text: "Get clarity, focus and momentum.",
                },
              ].map(({ icon, title, text }) => (
                <StaggerItem key={title}>
                  <article>
                    <div className="mvp-audience-icon">
                      {icon}
                    </div>
                    <div className="mvp-audience-content">
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <div className="mvp-fit">
              <Users /> If you need clarity before committing serious time and
              money, this playbook is for you.
            </div>
          </div>
        </section>

        {/* ===== Author Section ===== */}
        <section className="mvp-author">
          <div className="mvp-shell mvp-author-grid">
            <SlideReveal from="left">
              <div>
                <Eyebrow>Created by Rakib Rahman</Eyebrow>
                <h2>Founder &amp; CTO, InfiniSoft Technology</h2>
                <p>
                  Built from practical product, design and development
                  experience across websites, web applications, dashboards and
                  MVP systems.
                </p>
              </div>
            </SlideReveal>
            <ScaleReveal delay={0.2}>
              <div className="mvp-signature">
                Rakib Rahman
                <small>RAKIB RAHMAN</small>
              </div>
            </ScaleReveal>
            <FadeUp delay={0.3}>
              <div className="mvp-author-brand">
                <Image
                  src="/assets/images/mvp/logo-mvp.png"
                  alt="InfiniSoft Technology"
                  width={180}
                  height={42}
                />
                <span className="mvp-author-tagline">Build Smarter. Scale Faster.</span>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ===== Offer Section ===== */}
        <section className="mvp-offer" id="offer">
          <div className="mvp-shell mvp-offer-grid">
            <SlideReveal from="left">
              <div>
                <Eyebrow>Instant Digital Access</Eyebrow>
                <h2>The MVP Playbook</h2>
                <p>Everything you need to go from idea to a validated MVP.</p>
                <StaggerContainer>
                  {[
                    "Complete PDF guide",
                    "Interactive online flipbook",
                    "Printable worksheets",
                    "Future minor updates",
                  ].map((item) => (
                    <StaggerItem key={item}>
                      <li>
                        <span className="mvp-check-icon bg-blue">
                          <Check />
                        </span>
                        {item}
                      </li>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </SlideReveal>
            <ScaleReveal delay={0.2}>
              <BookMockup compact />
            </ScaleReveal>
            <ScaleReveal delay={0.3}>
              <div className="mvp-price-card">
                <div>
                  <small>Launch price</small>
                  <strong>৳29</strong>
                </div>
                <GlowPulse>
                  <a href="#" className="mvp-btn-orange" onClick={openPayment}>
                    Get Instant Access <ArrowRight />
                  </a>
                </GlowPulse>
                <p>
                  <LockKeyhole /> Secure payment &bull; Immediate delivery
                </p>
                <aside>
                  <ShieldCheck />
                  <span>
                    <b>Optional guarantee</b>7-day satisfaction guarantee
                    (Optional)
                  </span>
                </aside>
              </div>
            </ScaleReveal>
          </div>
        </section>

        {/* ===== Access Steps Section ===== */}
        <section className="mvp-access">
          <div className="mvp-shell">
            <SlideReveal from="left">
              <div className="mvp-access-left">
                <Eyebrow>How Access Works</Eyebrow>
                <h2>Get Your Copy in 4 Simple Steps</h2>
              </div>
            </SlideReveal>
            <StaggerContainer className="mvp-access-steps">
              {[
                [ShoppingCart, "Purchase securely"],
                [Mail, "Receive access by email"],
                [Download, "Read online or download"],
                [CheckCircle2, "Apply the worksheets"],
              ].map(([Icon, text], index) => (
                <StaggerItem key={text}>
                  <div className="mvp-access-step-wrap">
                    <div className="mvp-access-step">
                      <div className="mvp-access-step-top">
                        <strong>{index + 1}</strong>
                        <Icon />
                      </div>
                      <span>{text}</span>
                    </div>
                    {index < 3 && <span className="mvp-access-arrow" />}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ===== FAQ Section ===== */}
        <section className="mvp-faq" id="faq">
          <div className="mvp-shell mvp-faq-grid">
            <SlideReveal from="left">
              <div className="mvp-faq-left">
                <Eyebrow>Frequently Asked Questions</Eyebrow>
                <h2>Still Have Questions?</h2>
                <p>
                  Here are the most common answers. If you need more help, feel
                  free to contact us.
                </p>
              </div>
            </SlideReveal>
            <StaggerContainer className="mvp-faq-list" id="mvp-faq">
              {faqs.map(([question, answer]) => (
                <StaggerItem key={question}>
                  <details name="mvp-faq-toggle">
                    <summary>
                      {question}
                      <ChevronDown />
                    </summary>
                    <p>{answer}</p>
                  </details>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ===== Closing CTA Section ===== */}
        <section className="mvp-closing">
          <div className="mvp-shell mvp-closing-grid">
            <ScaleReveal>
              <div className="mvp-closing-left">
                <div>
                  <img
                    src="/assets/images/mvp/mvp-ebook.png"
                    alt="MVP Playbook"
                  />
                </div>
              </div>
            </ScaleReveal>
            <div className="mvp-closing-center">
              <FadeUp>
                <h2>Stop Building on Assumptions.</h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p>
                  Turn your idea into a focused MVP&mdash;and learn what the market
                  actually wants.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="mvp-closing-cta-row">
                  <GlowPulse>
                    <a
                      href="#offer"
                      className="mvp-btn mvp-btn-orange"
                      onClick={openPayment}
                    >
                      Get the MVP Playbook <ArrowRight />
                    </a>
                  </GlowPulse>
                  <small>Start smaller. Learn faster. Build smarter.</small>
                </div>
              </FadeUp>
            </div>
            <SlideReveal from="right" delay={0.2}>
              <div className="mvp-closing-right">
                <blockquote>
                  &ldquo;A clearer
                  <br />
                  brighter future
                  <br />
                  starts here.&rdquo;
                </blockquote>
              </div>
            </SlideReveal>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="mvp-footer">
        <div className="mvp-shell">
          <div className="mvp-footer-grid">
            <div className="mvp-footer-brand">
              <Image
                src="/assets/images/mvp/logo-mvp.png"
                alt="InfiniSoft Technology"
                width={170}
                height={39}
              />
              <span>Build Smarter. Scale Faster.</span>
            </div>
            <nav className="mvp-footer-links">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="mailto:info@infinisoftech.com">Support</a>
            </nav>
            <div className="mvp-footer-contact">
              <span>🌐 www.infinisoftech.com</span>
              <a
                href="https://wa.me/8801858333238"
                target="_blank"
                rel="noopener noreferrer"
                className="mvp-whatsapp-link"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                +880 1858-333238
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== Sticky Bar ===== */}
      <div className={`mvp-sticky ${stickyVisible ? "is-visible" : ""}`}>
        <div className="mvp-shell">
          <div className="mvp-sticky-inner">
            <div className="mvp-sticky-left">
              <div className="mvp-sticky-thumb">
                <div className="mvp-sticky-book-mini">
                  <img
                    src="/assets/images/mvp/mvp-ebook.png"
                    alt="MVP Playbook"
                  />
                </div>
              </div>
              <div className="mvp-sticky-text">
                <b>The MVP Playbook</b>
                <small>Build Fast. Learn Faster.</small>
              </div>
            </div>
            <a href="#offer" className="mvp-sticky-cta" onClick={openPayment}>
              Get Instant Access <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
