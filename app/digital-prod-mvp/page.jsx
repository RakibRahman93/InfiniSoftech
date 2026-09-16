import Image from "next/image";
import Header6 from "@/components/headers/Header6";
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
        <b>For Founders • Product Owners • Entrepreneurs</b>
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
      <nav className="main-nav transparent stick-fixed wow-menubar wch-unset border-b">
        <Header6 links={fancyMultipage} />
      </nav>

      <main>
        <section className="mvp-hero">
          <div className="mvp-shell mvp-hero-grid">
            <div className="mvp-hero-copy">
              <Eyebrow>The Founder&apos;s Field Guide</Eyebrow>
              <h1>Build Fast. Learn Faster. <span>Launch With Confidence.</span></h1>
              <p>A practical, visual playbook that helps founders turn an idea into a focused MVP, without wasting months building the wrong product.</p>
              <div className="mvp-hero-values"><div><Target /><span>Define the<br />right problem</span></div><div><ClipboardList /><span>Choose only<br />essential features</span></div><div><BarChart3 /><span>Launch, measure<br />and improve</span></div></div>
              <div className="mvp-actions"><a href="#offer" className="mvp-btn mvp-btn-primary">Get The MVP Playbook <ArrowRight /></a><a href="#preview" className="mvp-btn mvp-btn-outline"><Play /> Preview The Book</a></div>
              <small className="mvp-access-note">Instant PDF access • Practical worksheets • Read online</small>
              <p className="mvp-author-line">Created by <strong>Rakib Rahman</strong> — Founder &amp; CTO, InfiniSoft Technology</p>
            </div>
            <div className="mvp-hero-art">
              <div className="mvp-hero-swoosh" />
              <span className="mvp-practical-note">Practical<br />templates<br />inside!</span>
              <div className="mvp-sheet sheet-one"><b>Feature Prioritization</b><i /><i /><i /><i /></div>
              <div className="mvp-sheet sheet-two"><b>02</b><strong>Identify Your<br />Core Customers</strong><i /><i /><i /></div>
              <BookMockup />
            </div>
          </div>
        </section>

        <section className="mvp-problem">
          <div className="mvp-shell">
            <div className="mvp-problem-grid">
              <div><Eyebrow>The Problem</Eyebrow><h2>Most MVPs Don&apos;t Fail Because of Bad Code.</h2><p>They fail because teams build too much, too early, for the wrong customer.</p></div>
              <div className="mvp-problem-cards"><article><Zap /><h3>Unclear Problem</h3><p>You start with features instead of customer pain.</p></article><article><PackageCheck /><h3>Bloated Scope</h3><p>Nice-to-have ideas delay real validation.</p></article><article><CircleHelp /><h3>Guesswork</h3><p>Decisions are made without user evidence.</p></article></div>
            </div>
            <div className="mvp-warning">⚠ <strong>The cost isn&apos;t only money.</strong> It&apos;s months of learning lost.</div>
          </div>
        </section>

        <section className="mvp-transformation">
          <div className="mvp-shell"><Eyebrow>The Transformation</Eyebrow><h2>From Scattered Idea to Testable Product</h2><p>The MVP Playbook gives you a repeatable path from assumption to evidence.</p><div className="mvp-transform-flow">{[[Lightbulb,"Vague Idea"],[ClipboardList,"Clear Problem"],[Users,"Core Customer"],[Gift,"Value Proposition"],[Box,"Lean Features"],[BarChart3,"Real Feedback"]].map(([Icon,label],index)=><div key={label}><span><Icon /></span><b>{label}</b>{index<5?<ArrowRight />:null}</div>)}</div></div>
        </section>

        <section className="mvp-section" id="learn">
          <div className="mvp-shell"><Eyebrow>What You Will Learn</Eyebrow><h2 className="mvp-section-title">A Complete MVP Roadmap, Without the Fluff</h2><div className="mvp-roadmap">{roadmap.map(([Icon,title,text],index)=><article key={title}><strong>0{index+1}</strong><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div>
        </section>

        <section className="mvp-preview" id="preview">
          <div className="mvp-shell mvp-preview-grid"><div><Eyebrow>See It Yourself</Eyebrow><h2>Flip Through Before You Buy</h2><p>Preview selected pages and experience the guide like a real book.</p><a href="#inside" className="mvp-btn mvp-btn-primary"><BookOpen /> Open Interactive Preview</a><small>Preview includes selected pages only.</small></div><div className="mvp-open-book"><button aria-label="Previous page">‹</button><div className="mvp-page-left"><b>02</b><h3>Identify Your<br />Core Customers</h3><p>The right product starts with the right customer.</p></div><div className="mvp-page-right"><strong>Customer Persona Canvas</strong><div className="persona-avatar"><UserRound /></div><i /><i /><i /><em>“Real problems solve real problems.”</em></div><button aria-label="Next page">›</button></div></div>
        </section>

        <section className="mvp-section" id="inside">
          <div className="mvp-shell mvp-inside-grid"><div><Eyebrow>What Is Inside</Eyebrow><h2>Practical Templates.<br />Real Guidance.</h2><p>A focused, beautifully designed guide with worksheets and frameworks you can apply right away.</p><ul>{["11 professionally designed pages","Problem Statement Canvas","Target Customer Canvas","Feature Prioritization Matrix","12-Day Build Plan","Metrics & Feedback Framework","Launch Checklist","Downloadable high-resolution PDF"].map(item=><li key={item}><CheckCircle2 />{item}</li>)}</ul></div><div className="mvp-template-stack">{["MVP Roadmap","Problem Canvas","Customer Canvas","Feature Matrix"].map((title,index)=><div className={`mvp-template-card card-${index+1}`} key={title}><b>{title}</b><span /><span /><span /><span /></div>)}</div></div>
        </section>

        <section className="mvp-audience" id="audience"><div className="mvp-shell"><Eyebrow>Who It Is For</Eyebrow><h2>Built for People Turning Ideas Into Products</h2><div className="mvp-audience-grid">{[[UserRound,"Founders & Co-Founders","Validate ideas before investing serious time and money."],[ShoppingCart,"Product Owners","Use a structured approach to build what matters."],[Rocket,"Entrepreneurs","Turn ideas into real solutions with less risk."],[ClipboardList,"Early-Stage Builders","Get clarity, focus and momentum."]].map(([Icon,title,text])=><article key={title}><Icon /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><div className="mvp-fit"><Users /> If you need clarity before committing serious time and money, this playbook is for you.</div></div></section>

        <section className="mvp-author"><div className="mvp-shell mvp-author-grid"><div><Eyebrow>Created by Rakib Rahman</Eyebrow><h2>Founder &amp; CTO, InfiniSoft Technology</h2><p>Built from practical product, design and development experience across websites, web applications, dashboards and MVP systems.</p></div><div className="mvp-signature">Rakib Rahman<small>RAKIB RAHMAN</small></div><Image src="/assets/images/InfiniSoftLogoblack.png" alt="InfiniSoft Technology" width={190} height={44} /></div></section>

        <section className="mvp-offer" id="offer"><div className="mvp-shell mvp-offer-grid"><div><Eyebrow>Instant Digital Access</Eyebrow><h2>The MVP Playbook</h2><p>Everything you need to go from idea to a validated MVP.</p><ul>{["Complete PDF guide","Interactive online flipbook","Printable worksheets","Future minor updates"].map(item=><li key={item}><CheckCircle2 />{item}</li>)}</ul></div><BookMockup compact /><div className="mvp-price-card"><div><small>Launch price</small><strong>$29</strong></div><a href="#" className="mvp-btn mvp-btn-orange">Get Instant Access <ArrowRight /></a><p><LockKeyhole /> Secure payment • Immediate delivery</p><aside><ShieldCheck /><span><b>Optional guarantee</b>7-day satisfaction guarantee</span></aside></div></div></section>

        <section className="mvp-access"><div className="mvp-shell"><Eyebrow>How Access Works</Eyebrow><h2>Get Your Copy in 4 Simple Steps</h2><div className="mvp-access-steps">{[[ShoppingCart,"Purchase securely"],[Mail,"Receive access by email"],[Download,"Read online or download"],[CheckCircle2,"Apply the worksheets"]].map(([Icon,text],index)=><div key={text}><strong>{index+1}</strong><Icon /><span>{text}</span>{index<3?<ArrowRight />:null}</div>)}</div></div></section>

        <section className="mvp-faq" id="faq"><div className="mvp-shell mvp-faq-grid"><div><Eyebrow>Frequently Asked Questions</Eyebrow><h2>Still Have Questions?</h2><p>Here are the most common answers. If you need more help, feel free to contact us.</p></div><div>{faqs.map(([question,answer])=><details key={question}><summary>{question}<ChevronDown /></summary><p>{answer}</p></details>)}</div></div></section>

        <section className="mvp-closing"><div className="mvp-shell"><BookMockup compact /><div><h2>Stop Building on Assumptions.</h2><p>Turn your idea into a focused MVP, and learn what the market actually wants.</p><a href="#offer" className="mvp-btn mvp-btn-orange">Get The MVP Playbook <ArrowRight /></a></div><blockquote>“A clearer, brighter future starts here.”</blockquote><Rocket /></div></section>
      </main>

      <footer className="mvp-footer"><div className="mvp-shell"><Image src="/assets/images/InfiniSoftLogoblack.png" alt="InfiniSoft Technology" width={170} height={39} /><nav><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:info@infinisoftech.com">Support</a></nav><span>www.infinisoftech.com</span><a href="tel:+8801858333238">+880 1858-333238</a></div></footer>
      <div className="mvp-sticky"><span><BookOpen /><b>The MVP Playbook</b></span><a href="#offer">Get Instant Access <ArrowRight /></a></div>
    </div>
  );
}
