"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import { fancyMultipage } from "@/data/menu";
import ScrollReveal, { StaggerContainer, StaggerItem, HeroHeading, FadeUp, SlideReveal, ScaleReveal, GlowPulse } from "@/components/mvp/ScrollReveal";
import NavToggle from "@/components/mvp/NavToggle";
import FlipBook from "@/components/mvp/FlipBook";
import PaymentModal from "@/components/mvp/PaymentModal";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Box,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Crosshair,
  Download,
  Gauge,
  Gift,
  Lightbulb,
  LockKeyhole,
  Mail,
  PackageCheck,
  Play,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Star,
  Target,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

const roadmap = [
  [Target, "Define the Problem", "Turn your idea into a clear, testable problem statement."],
  [Users, "Identify Core Customers", "Find and understand your earliest users."],
  [ClipboardList, "Craft Your Value Proposition", "Communicate real value, not just features."],
  [Box, "Decide Core Features", "Focus only on what matters for validation."],
  [Rocket, "Build & Release", "Get to market quickly with a lean MVP."],
  [BarChart3, "Measure & Iterate", "Use real feedback to improve and grow."],
];

const faqs = [
  ["Is this only for technology startups?", "No. The validation framework works for digital services, SaaS, marketplaces, internal tools, and many other product ideas."],
  ["How will I receive the playbook?", "You will receive instant digital access after checkout, along with a download link by email."],
  ["Do I need technical knowledge?", "No. The guide uses practical language and step-by-step worksheets for both technical and non-technical founders."],
  ["Can I print the worksheets?", "Yes. Every worksheet is designed to be completed digitally or printed."],
  ["Is this a physical book?", "No. This is a digital playbook so you can access it immediately from anywhere."],
  ["Will I receive future updates?", "Yes. Your purchase includes future updates to this edition of the playbook."],
];

function BookMockup({ compact = false }) {
  return (
    <div>
      <img
        src="/assets/images/mvp/mvp-ebook.png"
        alt="MVP Playbook"
      />
    </div>
  );
}

function Eyebrow({ children }) {
  return <span className="mvp-eyebrow">{children}</span>;
}

export default function DigitalProductMvpPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openPayment = (e) => { e.preventDefault(); setModalOpen(true); };

  return (
    <div className="mvp-page theme-fancy">
      <PaymentModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {/* ===== Announcement Bar ===== */}
      <div className="mvp-announcement">
        <span>🚀 For founders who want to validate before they overspend.</span>
        <a href="#offer">Get the Playbook <ArrowRight /></a>
      </div>

      {/* ===== MVP Navigation ===== */}
      <nav className="mvp-nav mvp-nav-animate">
        <div className="mvp-shell">
          <a href="/" className="mvp-logo">
            <Image src="/assets/images/mvp/logo-mvp.png" alt="InfiniSoft Technology" width={140} height={32} />
          </a>
          <nav className="mvp-nav-links">
            <a href="#learn">What You&apos;ll Learn</a>
            <a href="#inside">Inside the Guide</a>
            <a href="#audience">Who It&apos;s For</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#offer" className="mvp-nav-cta" onClick={openPayment}>Get Instant Access</a>
          <NavToggle onPaymentClick={openPayment} />
        </div>
      </nav>

      <main>
       {/* ===== Hero Section ===== */}
<section className="mvp-hero">
  <div className="mvp-hero-background" aria-hidden="true" />

  <div className="mvp-shell mvp-hero-grid">
    <div className="mvp-hero-copy">

      <FadeUp delay={0.2}>
        <Eyebrow>The Founder&apos;s Field Guide</Eyebrow>
      </FadeUp>

      <HeroHeading
        line1="Build Fast. Learn Faster."
        line2="Launch With Confidence."
      />

      <FadeUp delay={0.5}>
        <p>
          A practical, visual playbook that helps founders turn an idea
          into a focused MVP—without wasting months building the wrong product.
        </p>
      </FadeUp>

      <StaggerContainer
        className="mvp-hero-values"
        delay={0.6}
      >
        <StaggerItem>
          <div>
            <Target />
            <span>
              Define the
              <br />
              right problem
            </span>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div>
            <ClipboardList />
            <span>
              Choose only
              <br />
              essential features
            </span>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div>
            <BarChart3 />
            <span>
              Launch, measure
              <br />
              and improve
            </span>
          </div>
        </StaggerItem>
      </StaggerContainer>

      <StaggerContainer
        className="mvp-actions"
        delay={0.8}
      >
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
          <a
            href="#preview"
            className="mvp-btn mvp-btn-outline"
          >
            <Play />
            Preview The Book
          </a>
        </StaggerItem>
      </StaggerContainer>

      <FadeUp delay={1.0}>
        <small className="mvp-access-note">
          Instant PDF access &bull; Practical worksheets &bull; Read online
        </small>
      </FadeUp>

      <FadeUp delay={1.1}>
        <p className="mvp-author-line">
          Created by <strong>Rakib Rahman</strong>
          &mdash; Founder &amp; CTO, InfiniSoft Technology
        </p>
      </FadeUp>

    </div>
    {/* Mobile/tablet artwork strip: shown only <= 768px (see custom.css).
        On desktop the same artwork remains the hero background. */}
    <div className="mvp-hero-artwork" aria-hidden="true">
      <Image
        src="/assets/images/mvp-playbook-hero.png"
        alt=""
        width={1672}
        height={941}
        sizes="100vw"
      />
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
                  <p>They fail because teams build too much, too early, for the wrong customer.</p>
                </div>
              </SlideReveal>
              <StaggerContainer className="mvp-problem-cards">
                <StaggerItem><article><span style={{color:'#FF6B45'}}><Zap /></span><h3>Unclear Problem</h3><p>You start with features instead of customer pain.</p></article></StaggerItem>
                <StaggerItem><article><span style={{color:'#FF8A22'}}><PackageCheck /></span><h3>Bloated Scope</h3><p>Nice-to-have ideas delay real validation.</p></article></StaggerItem>
                <StaggerItem><article><span style={{color:'#8B5CF6'}}><CircleHelp /></span><h3>Guesswork</h3><p>Decisions are made without user evidence.</p></article></StaggerItem>
              </StaggerContainer>
            </div>
            <FadeUp delay={0.3}>
              <div className="mvp-warning">⚠ <strong>The cost isn&apos;t only money.</strong> It&apos;s months of learning lost.</div>
            </FadeUp>
          </div>
        </section>

        {/* ===== Transformation Section ===== */}
        <ScrollReveal>
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
              <p>The MVP Playbook gives you a repeatable path from assumption to evidence.</p>
            </FadeUp>
            <div className="mvp-transform-timeline">
              {[
                [Lightbulb, "Vague Idea"],
                [ClipboardList, "Clear Problem"],
                [Users, "Core Customer"],
                [Gift, "Value Proposition"],
                [Box, "Lean Features"],
                [BarChart3, "Real Feedback"]
              ].map(([Icon, label], index) => (
                <Fragment key={label}>
                  <div className="mvp-transform-step-wrap">
                    <StaggerItem>
                      <div className="mvp-transform-step">
                        <div className="mvp-transform-icon">
                          <Icon />
                        </div>
                        <span className="mvp-transform-label">{label}</span>
                      </div>
                    </StaggerItem>
                  </div>
                  {index < 5 && <div className="mvp-transform-arrow"><ArrowRight /></div>}
                </Fragment>
              ))}
              <div className="mvp-transform-rocket">
                <Rocket />
                <span className="mvp-transform-handwritten">Ideas to<br />impact</span>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* ===== Roadmap Section ===== */}
        <section className="mvp-section" id="learn">
          <div className="mvp-shell">
            <FadeUp>
              <Eyebrow>What You Will Learn</Eyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mvp-section-title">A Complete MVP Roadmap, Without the Fluff</h2>
            </FadeUp>
            <StaggerContainer className="mvp-roadmap">
              {roadmap.map(([Icon,title,text],index)=>(
                <StaggerItem key={title}>
                  <article>
                    <strong>0{index+1}</strong>
                    <Icon />
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
                <h2>Flip Through<br />Before You Buy</h2>
                <p>Preview selected pages and experience the guide like a real book.</p>
                <GlowPulse>
                  <a href="#inside" className="mvp-btn mvp-btn-primary"><BookOpen /> Open Interactive Preview</a>
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
                <h2>Practical Templates.<br />Real Guidance.</h2>
                <p>A focused, beautifully designed guide with worksheets and frameworks you can apply right away.</p>
                <StaggerContainer>
                  {[
                    "11 professionally designed pages",
                    "Problem Statement Canvas",
                    "Target Customer Canvas",
                    "Feature Prioritization Matrix",
                    "12-Day Build Plan",
                    "Metrics & Feedback Framework",
                    "Launch Checklist",
                    "Downloadable high-resolution PDF"
                  ].map((item)=>(
                    <StaggerItem key={item}>
                      <li><span className="mvp-check-icon bg-blue"><Check /></span>{item}</li>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </SlideReveal>
            <ScaleReveal delay={0.2}>
              <div className="mvp-template-stack">
                {["MVP Roadmap","Problem Canvas","Customer Canvas","Feature Matrix"].map((title,index)=>(
                  <div className={`mvp-template-card card-${index+1}`} key={title}>
                    <b>{title}</b><span /><span /><span /><span />
                  </div>
                ))}
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
              {[[UserRound,"Founders & Co-Founders","Validate ideas before investing serious time and money."],[ShoppingCart,"Product Owners","Use a structured approach to build what matters."],[Rocket,"Entrepreneurs","Turn ideas into real solutions with less risk."],[ClipboardList,"Early-Stage Builders","Get clarity, focus and momentum."]].map(([Icon,title,text])=>(
                <StaggerItem key={title}>
                  <article>
                    <Icon />
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <FadeUp delay={0.4}>
              <div className="mvp-fit">
                <Users /> If you need clarity before committing serious time and money, this playbook is for you.
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ===== Author Section ===== */}
        <ScrollReveal>
        <section className="mvp-author">
          <div className="mvp-shell mvp-author-grid">
            <SlideReveal from="left">
              <div>
                <Eyebrow>Created by Rakib Rahman</Eyebrow>
                <h2>Founder &amp; CTO, InfiniSoft Technology</h2>
                <p>Built from practical product, design and development experience across websites, web applications, dashboards and MVP systems.</p>
              </div>
            </SlideReveal>
            <ScaleReveal delay={0.2}>
              <div className="mvp-signature">
                Rakib Rahman
                <small>RAKIB RAHMAN</small>
              </div>
            </ScaleReveal>
            <FadeUp delay={0.3}>
              <Image src="/assets/images/mvp/logo-mvp.png" alt="InfiniSoft Technology" width={190} height={44} />
            </FadeUp>
          </div>
        </section>
        </ScrollReveal>

        {/* ===== Offer Section ===== */}
        <section className="mvp-offer" id="offer">
          <div className="mvp-shell mvp-offer-grid">
            <SlideReveal from="left">
              <div>
                <Eyebrow>Instant Digital Access</Eyebrow>
                <h2>The MVP Playbook</h2>
                <p>Everything you need to go from idea to a validated MVP.</p>
                <StaggerContainer>
                  {["Complete PDF guide","Interactive online flipbook","Printable worksheets","Future minor updates"].map(item=>(
                    <StaggerItem key={item}>
                      <li><span className="mvp-check-icon bg-blue"><Check /></span>{item}</li>
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
                <div><small>Launch price</small><strong>৳29</strong></div>
                <GlowPulse>
                  <a href="#" className="mvp-btn-orange" onClick={openPayment}>Get Instant Access <ArrowRight /></a>
                </GlowPulse>
                <p><LockKeyhole /> Secure payment &bull; Immediate delivery</p>
                <aside><ShieldCheck /><span><b>Optional guarantee</b>7-day satisfaction guarantee (Optional)</span></aside>
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
                [CheckCircle2, "Apply the worksheets"]
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
                <p>Here are the most common answers. If you need more help, feel free to contact us.</p>
              </div>
            </SlideReveal>
            <StaggerContainer className="mvp-faq-list" id="mvp-faq">
              {faqs.map(([question,answer])=>(
                <StaggerItem key={question}>
                  <details name="mvp-faq-toggle">
                    <summary>{question}<ChevronDown /></summary>
                    <p>{answer}</p>
                  </details>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ===== Closing CTA Section ===== */}
        <ScrollReveal>
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
                <p>Turn your idea into a focused MVP, and learn what the market actually wants.</p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <GlowPulse>
                  <a href="#offer" className="mvp-btn mvp-btn-orange" onClick={openPayment}>Get the MVP Playbook <ArrowRight /></a>
                </GlowPulse>
              </FadeUp>
              <FadeUp delay={0.3}>
                <small>Start smarter. Learn faster.</small>
              </FadeUp>
            </div>
            <SlideReveal from="right" delay={0.2}>
              <div className="mvp-closing-right">
                <Rocket />
                <blockquote>&ldquo;A clearer path to a brighter future starts here.&rdquo;</blockquote>
              </div>
            </SlideReveal>
          </div>
        </section>
        </ScrollReveal>
      </main>

      {/* ===== Footer ===== */}
      <footer className="mvp-footer">
        <div className="mvp-shell">
          <div className="mvp-footer-grid">
            <div className="mvp-footer-brand">
              <Image src="/assets/images/mvp/logo-mvp.png" alt="InfiniSoft Technology" width={170} height={39} />
              <span>Build Smarter. Scale Faster.</span>
            </div>
            <nav className="mvp-footer-links">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="mailto:info@infinisoftech.com">Support</a>
            </nav>
          <div className="mvp-footer-contact">
            <span>🌐 www.infinisoftech.com</span>
            <a href="https://wa.me/8801858333238" target="_blank" rel="noopener noreferrer" className="mvp-whatsapp-link">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              +880 1858-333238
            </a>
          </div>
          </div>
        </div>
      </footer>

      {/* ===== Sticky Bar ===== */}
      <div className="mvp-sticky">
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
            <a href="#offer" className="mvp-sticky-cta" onClick={openPayment}>Get Instant Access <ArrowRight /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
