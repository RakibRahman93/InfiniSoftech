import Image from "next/image";
import { fancyMultipage } from "@/data/menu";
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

export const metadata = {
  title: "The MVP Playbook | Build Fast, Learn Faster",
  description: "A practical field guide for founders who want to validate ideas, choose essential features, launch quickly, and learn from real customers.",
};

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
    <div className={`mvp-book ${compact ? "mvp-book-compact" : ""}`} aria-label="The MVP Playbook book cover">
      <div className="mvp-book-spine" />
      <div className="mvp-book-cover">
        <small>The Founder&apos;s Field Guide</small>
        <h3>THE MVP <span>PLAYBOOK</span></h3>
        <p>Build Fast. Learn Faster.</p>
        <div className="mvp-book-flight"><Rocket /></div>
        <div className="mvp-book-panels"><i /><i /><i /><i /></div>
        <b>For Founders &bull; Product Owners &bull; Entrepreneurs</b>
      </div>
    </div>
  );
}

function Eyebrow({ children }) {
  return <span className="mvp-eyebrow">{children}</span>;
}

export default function DigitalProductMvpPage() {
  return (
    <div className="mvp-page theme-fancy">
      {/* ===== Announcement Bar ===== */}
      <div className="mvp-announcement">
        <span>🚀 For founders who want to validate before they overspend.</span>
        <a href="#offer">Get the Playbook <ArrowRight /></a>
      </div>

      {/* ===== MVP Navigation ===== */}
      <nav className="mvp-nav">
        <div className="mvp-shell">
          <a href="/" className="mvp-logo">
            <Image src="/assets/images/InfiniSoftLogoblack.png" alt="InfiniSoft Technology" width={140} height={32} />
          </a>
          <nav className="mvp-nav-links">
            <a href="#learn">What You&apos;ll Learn</a>
            <a href="#inside">Inside the Guide</a>
            <a href="#audience">Who It&apos;s For</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#offer" className="mvp-nav-cta">Get Instant Access</a>
          <button className="mvp-menu" aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
        </div>
      </nav>

      <main>
        {/* ===== Hero Section ===== */}
        <section className="mvp-hero">
          <div className="mvp-hero-swoosh" />
          <span className="mvp-practical-note">Practical<br />templates<br />inside!</span>
          <div className="mvp-shell mvp-hero-grid">
            <div className="mvp-hero-copy">
              <Eyebrow>The Founder&apos;s Field Guide</Eyebrow>
              <h1>
                Build Fast. Learn Faster.
                <span>Launch With Confidence.</span>
              </h1>
              <p>A practical, visual playbook that helps founders turn an idea into a focused MVP, without wasting months building the wrong product.</p>
              <div className="mvp-hero-values">
                <div><Target /><span>Define the<br />right problem</span></div>
                <div><ClipboardList /><span>Choose only<br />essential features</span></div>
                <div><BarChart3 /><span>Launch, measure<br />and improve</span></div>
              </div>
              <div className="mvp-actions">
                <a href="#offer" className="mvp-btn mvp-btn-primary">Get the MVP Playbook <ArrowRight /></a>
                <a href="#preview" className="mvp-btn mvp-btn-outline"><Play /> Preview The Book</a>
              </div>
              <small className="mvp-access-note">Instant PDF access &bull; Practical worksheets &bull; Read online</small>
              <p className="mvp-author-line">Created by <strong>Rakib Rahman</strong> &mdash; Founder &amp; CTO, InfiniSoft Technology</p>
            </div>
            <div className="mvp-hero-art">
              <div className="mvp-sheet sheet-one"><b>Feature Prioritization</b><i /><i /><i /><i /></div>
              <div className="mvp-sheet sheet-two"><b>02</b><strong>Identify Your<br />Core Customers</strong><i /><i /><i /></div>
              <BookMockup />
            </div>
          </div>
        </section>

        {/* ===== Problem Section ===== */}
        <section className="mvp-problem">
          <div className="mvp-shell">
            <div className="mvp-problem-grid">
              <div>
                <Eyebrow>The Problem</Eyebrow>
                <h2>Most MVPs Don&apos;t Fail Because of Bad Code.</h2>
                <p>They fail because teams build too much, too early, for the wrong customer.</p>
              </div>
              <div className="mvp-problem-cards">
                <article><span style={{color:'#FF6B45'}}><Zap /></span><h3>Unclear Problem</h3><p>You start with features instead of customer pain.</p></article>
                <article><span style={{color:'#FF8A22'}}><PackageCheck /></span><h3>Bloated Scope</h3><p>Nice-to-have ideas delay real validation.</p></article>
                <article><span style={{color:'#8B5CF6'}}><CircleHelp /></span><h3>Guesswork</h3><p>Decisions are made without user evidence.</p></article>
              </div>
            </div>
            <div className="mvp-warning">⚠ <strong>The cost isn&apos;t only money.</strong> It&apos;s months of learning lost.</div>
          </div>
        </section>

        {/* ===== Transformation Section ===== */}
        <section className="mvp-transformation">
          <div className="mvp-shell">
            <Eyebrow>The Transformation</Eyebrow>
            <h2>From Scattered Idea to Testable Product</h2>
            <p>The MVP Playbook gives you a repeatable path from assumption to evidence.</p>
            <div className="mvp-transform-flow">
              {[[Lightbulb,"Vague Idea"],[ClipboardList,"Clear Problem"],[Users,"Core Customer"],[Gift,"Value Proposition"],[Box,"Lean Features"],[BarChart3,"Real Feedback"]].map(([Icon,label],index)=>(
                <div key={label}>
                  <span><Icon /></span>
                  <b>{label}</b>
                  {index<5?<ArrowRight />:null}
                </div>
              ))}
              <span className="mvp-handwritten">Ideas to impact</span>
            </div>
          </div>
        </section>

        {/* ===== Roadmap Section ===== */}
        <section className="mvp-section" id="learn">
          <div className="mvp-shell">
            <Eyebrow>What You Will Learn</Eyebrow>
            <h2 className="mvp-section-title">A Complete MVP Roadmap, Without the Fluff</h2>
            <div className="mvp-roadmap">
              {roadmap.map(([Icon,title,text],index)=>(
                <article key={title}>
                  <strong>0{index+1}</strong>
                  <Icon />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Preview Flipbook Section ===== */}
        <section className="mvp-preview" id="preview">
          <div className="mvp-shell mvp-preview-grid">
            <div>
              <Eyebrow>See It Yourself</Eyebrow>
              <h2>Flip Through Before You Buy</h2>
              <p>Preview selected pages and experience the guide like a real book.</p>
              <a href="#inside" className="mvp-btn mvp-btn-primary"><BookOpen /> Open Interactive Preview</a>
              <small>Preview includes selected pages only.</small>
            </div>
            <div className="mvp-open-book">
              <button aria-label="Previous page">&lsaquo;</button>
              <div className="mvp-page-left">
                <b>02</b>
                <h3>Identify Your<br />Core Customers</h3>
                <p>The right product starts with the right customer.</p>
              </div>
              <div className="mvp-page-right">
                <strong>Customer Persona Canvas</strong>
                <div className="persona-avatar"><UserRound /></div>
                <i /><i /><i />
                <em>&ldquo;Real products solve real problems.&rdquo;</em>
              </div>
              <button aria-label="Next page">&rsaquo;</button>
            </div>
          </div>
        </section>

        {/* ===== Inside Section ===== */}
        <section className="mvp-inside" id="inside">
          <div className="mvp-shell mvp-inside-grid">
            <div>
              <Eyebrow>What Is Inside</Eyebrow>
              <h2>Practical Templates.<br />Real Guidance.</h2>
              <p>A focused, beautifully designed guide with worksheets and frameworks you can apply right away.</p>
              <ul>
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
                  <li key={item}><span className="mvp-check-icon bg-blue"><Check /></span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mvp-template-stack">
              {["MVP Roadmap","Problem Canvas","Customer Canvas","Feature Matrix"].map((title,index)=>(
                <div className={`mvp-template-card card-${index+1}`} key={title}>
                  <b>{title}</b><span /><span /><span /><span />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Audience Section ===== */}
        <section className="mvp-audience" id="audience">
          <div className="mvp-shell">
            <Eyebrow>Who It Is For</Eyebrow>
            <h2>Built for People Turning Ideas Into Products</h2>
            <div className="mvp-audience-grid">
              {[[UserRound,"Founders & Co-Founders","Validate ideas before investing serious time and money."],[ShoppingCart,"Product Owners","Use a structured approach to build what matters."],[Rocket,"Entrepreneurs","Turn ideas into real solutions with less risk."],[ClipboardList,"Early-Stage Builders","Get clarity, focus and momentum."]].map(([Icon,title,text])=>(
                <article key={title}>
                  <Icon />
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
            <div className="mvp-fit">
              <Users /> If you need clarity before committing serious time and money, this playbook is for you.
            </div>
          </div>
        </section>

        {/* ===== Author Section ===== */}
        <section className="mvp-author">
          <div className="mvp-shell mvp-author-grid">
            <div>
              <Eyebrow>Created by Rakib Rahman</Eyebrow>
              <h2>Founder &amp; CTO, InfiniSoft Technology</h2>
              <p>Built from practical product, design and development experience across websites, web applications, dashboards and MVP systems.</p>
            </div>
            <div className="mvp-signature">
              Rakib Rahman
              <small>RAKIB RAHMAN</small>
            </div>
            <Image src="/assets/images/InfiniSoftLogoblack.png" alt="InfiniSoft Technology" width={190} height={44} />
          </div>
        </section>

        {/* ===== Offer Section ===== */}
        <section className="mvp-offer" id="offer">
          <div className="mvp-shell mvp-offer-grid">
            <div>
              <Eyebrow>Instant Digital Access</Eyebrow>
              <h2>The MVP Playbook</h2>
              <p>Everything you need to go from idea to a validated MVP.</p>
              <ul>
                {["Complete PDF guide","Interactive online flipbook","Printable worksheets","Future minor updates"].map(item=>(
                  <li key={item}><span className="mvp-check-icon bg-blue"><Check /></span>{item}</li>
                ))}
              </ul>
            </div>
            <BookMockup compact />
            <div className="mvp-price-card">
              <div><small>Launch price</small><strong>৳29</strong></div>
              <a href="#" className="mvp-btn-orange">Get Instant Access <ArrowRight /></a>
              <p><LockKeyhole /> Secure payment &bull; Immediate delivery</p>
              <aside><ShieldCheck /><span><b>Optional guarantee</b>7-day satisfaction guarantee (Optional)</span></aside>
            </div>
          </div>
        </section>

        {/* ===== Access Steps Section ===== */}
        <section className="mvp-access">
          <div className="mvp-shell">
            <div className="mvp-access-left">
              <Eyebrow>How Access Works</Eyebrow>
              <h2>Get Your Copy in 4 Simple Steps</h2>
            </div>
            <div className="mvp-access-steps">
              {[
                [ShoppingCart, "Purchase securely"],
                [Mail, "Receive access by email"],
                [Download, "Read online or download"],
                [CheckCircle2, "Apply the worksheets"]
              ].map(([Icon, text], index) => (
                <div key={text} className="mvp-access-step-wrap">
                  <div className="mvp-access-step">
                    <div className="mvp-access-step-top">
                      <strong>{index + 1}</strong>
                      <Icon />
                    </div>
                    <span>{text}</span>
                  </div>
                  {index < 3 && <span className="mvp-access-arrow" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ Section ===== */}
        <section className="mvp-faq" id="faq">
          <div className="mvp-shell mvp-faq-grid">
            <div className="mvp-faq-left">
              <Eyebrow>Frequently Asked Questions</Eyebrow>
              <h2>Still Have Questions?</h2>
              <p>Here are the most common answers. If you need more help, feel free to contact us.</p>
            </div>
            <div className="mvp-faq-list" id="mvp-faq">
              {faqs.map(([question,answer])=>(
                <details key={question} name="mvp-faq-toggle">
                  <summary>{question}<ChevronDown /></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Closing CTA Section ===== */}
        <section className="mvp-closing">
          <div className="mvp-shell mvp-closing-grid">
            <div className="mvp-closing-left">
              <BookMockup compact />
            </div>
            <div className="mvp-closing-center">
              <h2>Stop Building on Assumptions.</h2>
              <p>Turn your idea into a focused MVP, and learn what the market actually wants.</p>
              <a href="#offer" className="mvp-btn mvp-btn-orange">Get the MVP Playbook <ArrowRight /></a>
              <small>Start smarter. Learn faster.</small>
            </div>
            <div className="mvp-closing-right">
              <Rocket />
              <blockquote>&ldquo;A clearer path to a brighter future starts here.&rdquo;</blockquote>
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="mvp-footer">
        <div className="mvp-shell">
          <div className="mvp-footer-grid">
            <div className="mvp-footer-brand">
              <Image src="/assets/images/InfiniSoftLogoblack.png" alt="InfiniSoft Technology" width={170} height={39} />
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
                  <span>THE MVP<br />PLAYBOOK</span>
                </div>
              </div>
              <div className="mvp-sticky-text">
                <b>The MVP Playbook</b>
                <small>Build Fast. Learn Faster.</small>
              </div>
            </div>
            <a href="#offer" className="mvp-sticky-cta">Get Instant Access <ArrowRight /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
