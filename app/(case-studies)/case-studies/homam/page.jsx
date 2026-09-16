import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import FooterTop from "@/components/homes/home-6/FooterTop";
import { fancyMultipage } from "@/data/menu";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  CheckCircle2,
  ExternalLink,
  Filter,
  Gauge,
  Globe2,
  LayoutDashboard,
  Leaf,
  LockKeyhole,
  MonitorSmartphone,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Tag,
  UserRound,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const goals = [
  { icon: ShieldCheck, title: "Build customer trust", text: "Showcase authentic products with transparent information." },
  { icon: Search, title: "Simplify product discovery", text: "Make it easy to find the right products for individual skin goals." },
  { icon: ShoppingCart, title: "Create a frictionless purchase journey", text: "Deliver a smooth, secure shopping experience from browsing to checkout." },
];

const challenges = [
  { icon: ShoppingBag, title: "Too many choices", text: "A wide range of products can make it hard to find the right fit." },
  { icon: Sparkles, title: "Uncertainty about authenticity", text: "Customers want to know they are buying genuine, high-quality skincare." },
  { icon: ShoppingCart, title: "Complex shopping journeys", text: "Lengthy flows can cause shoppers to abandon their purchase." },
];

const strategy = [
  { icon: Search, title: "Discover", text: "Understand products and customer needs." },
  { icon: LayoutDashboard, title: "Guide", text: "Make categories and information easy to navigate." },
  { icon: ShieldCheck, title: "Reassure", text: "Highlight authenticity and trusted sourcing." },
  { icon: ShoppingCart, title: "Convert", text: "Remove friction from cart to checkout." },
];

const features = [
  { icon: ShoppingBag, title: "Smart product catalog", text: "Organized, easy-to-browse product structure." },
  { icon: Filter, title: "Advanced filtering", text: "Find the right products faster." },
  { icon: MonitorSmartphone, title: "Responsive interface", text: "Seamless across every device." },
  { icon: LockKeyhole, title: "Secure checkout", text: "Safe, reliable payment processing." },
  { icon: PackageCheck, title: "Order management", text: "Streamlined order processing." },
  { icon: LayoutDashboard, title: "Admin dashboard", text: "Easy product and content management." },
];

export const metadata = {
  title: "HOMAM Skincare E-commerce Case Study | InfiniSoft",
  description: "How InfiniSoft designed a trust-first, conversion-focused skincare shopping experience for HOMAM.",
};

function SectionHeading({ eyebrow, children, intro }) {
  return (
    <div className="homam-heading">
      <span>{eyebrow}</span>
      <h2>{children}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

export default function HomamCaseStudyPage() {
  return (
    <div className="theme-fancy homam-case-study">
      <div className="page" id="top">
        <nav className="main-nav transparent stick-fixed wow-menubar wch-unset">
          <Header6 links={fancyMultipage} />
        </nav>

        <main>
          <section className="homam-hero">
            <div className="container">
              <div className="homam-breadcrumb">Portfolio / E-commerce / Homam</div>
              <div className="homam-hero-grid">
                <div className="homam-hero-copy">
                  <h1>
                    <span className="homam-hero-line">Building a skincare</span>
                    <span className="homam-hero-line">
                      experience <b>customers</b>
                    </span>
                    <span className="homam-hero-line homam-hero-accent">can trust.</span>
                  </h1>
                  <p>A conversion-focused e-commerce platform designed to make product discovery simpler, purchasing faster, and authentic skincare easier to access.</p>
                  <div className="homam-pills">
                    <span><ShoppingBag /> E-commerce</span>
                    <span><LayoutDashboard /> UX/UI Design</span>
                    <span><MonitorSmartphone /> Web Development</span>
                  </div>
                  <div className="homam-actions">
                    <a href="https://homam.shop" target="_blank" rel="noopener noreferrer" className="homam-button homam-button-primary">Visit Live Website <ExternalLink /></a>
                    <a href="#project" className="homam-button homam-button-secondary">View the Process</a>
                  </div>
                </div>
                <div className="homam-hero-media">
                  <div className="homam-orb" />
                  <Image src="/assets/images/demo-fancy/homam-showcase.png" alt="HOMAM store on laptop and mobile" width={1776} height={887} priority />
                </div>
              </div>
            </div>
          </section>

          <section className="homam-meta">
            <div className="container homam-meta-grid">
              <div><i><UserRound /></i><p><span>Client</span><strong>Homam</strong></p></div>
              <div><i><Leaf /></i><p><span>Industry</span><strong>Beauty &amp; Skincare</strong></p></div>
              <div><i><MonitorSmartphone /></i><p><span>Platform</span><strong>Responsive Web</strong></p></div>
              <div><i><Globe2 /></i><p><span>Website</span><strong>homam.shop</strong></p></div>
            </div>
          </section>

          <section className="homam-section" id="project">
            <div className="container homam-project-layout">
              <div>
                <SectionHeading eyebrow="The Project">More than an online store. <span>A trusted skincare destination.</span></SectionHeading>
              </div>
              <div className="homam-project-content">
                <p>We partnered with Homam to create a clean, conversion-focused e-commerce platform that helps customers discover authentic skincare products, understand what suits them, and shop with confidence.</p>
                <div className="homam-card-grid homam-card-grid-3">
                  {goals.map(({ icon: Icon, title, text }) => <article className="homam-info-card" key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}
                </div>
              </div>
            </div>
          </section>

          <section className="homam-section homam-challenge">
            <div className="container homam-challenge-grid">
              <SectionHeading eyebrow="The Challenge" intro="With so many products, ingredients, and claims, customers often feel confused, skeptical, or unsure about what to choose. Homam needed a digital experience that removes this friction and builds confidence at every step.">Skincare shopping can quickly become overwhelming.</SectionHeading>
              <div className="homam-challenge-list">
                {challenges.map(({ icon: Icon, title, text }, index) => <article key={title}><Icon /><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
              </div>
              <div className="homam-challenge-art" aria-hidden="true">
                <Image src="/assets/images/demo-fancy/homam-showcase.png" alt="" width={1776} height={887} />
              </div>
            </div>
          </section>

          <section className="homam-section">
            <div className="container">
              <div className="homam-project-intro">
                <SectionHeading eyebrow="The Strategy">We designed every interaction around <span>clarity and confidence.</span></SectionHeading>
                <p>Our strategy combined user-centered design, clear product storytelling, and a seamless shopping experience to create a storefront that feels as thoughtful as the products it offers.</p>
              </div>
              <div className="homam-strategy-line">
                {strategy.map(({ icon: Icon, title, text }, index) => <article key={title}><div><Icon /></div><h3>{title}</h3><p>{text}</p>{index < strategy.length - 1 ? <ArrowRight className="homam-step-arrow" /> : null}</article>)}
              </div>
            </div>
          </section>

          <section className="homam-section homam-closer">
            <div className="container">
              <SectionHeading eyebrow="A Closer Look">A thoughtfully designed experience.</SectionHeading>
              <div className="homam-closer-stage">
                <Image src="/assets/images/demo-fancy/homam-showcase.png" alt="Responsive HOMAM skincare shopping experience" width={1776} height={887} />
                <div className="homam-callout homam-callout-a"><Search /><strong>Clear product hierarchy</strong><span>Clean layouts help shoppers find products faster.</span></div>
                <div className="homam-callout homam-callout-b"><ShieldCheck /><strong>Trust signals</strong><span>Build confidence with authenticity cues.</span></div>
                <div className="homam-callout homam-callout-c"><Smartphone /><strong>Responsive experience</strong><span>A seamless experience across devices.</span></div>
                <div className="homam-callout homam-callout-d"><ShoppingCart /><strong>Focused calls to action</strong><span>Guide customers toward the next step.</span></div>
              </div>
            </div>
          </section>

          <section className="homam-section homam-journey">
            <div className="container">
              <SectionHeading eyebrow="Designed for the Full Journey">Key experience screens.</SectionHeading>
              <div className="homam-journey-grid">
                {["Product discovery", "Confident product decisions", "Faster checkout"].map((title, index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{["An intuitive catalog with search and filters makes it easy to find the right products.", "Detailed pages explain ingredients, benefits, and authenticity information.", "A streamlined checkout gets customers from cart to confirmation faster."][index]}</p><div className={`homam-screen homam-screen-${index + 1}`}><div className="homam-screen-nav">HOMAM <i /><i /><i /></div><div className="homam-screen-body"><div className="homam-product-shape" /><div className="homam-product-shape tall" /><div className="homam-product-shape" /></div></div></article>)}
              </div>
            </div>
          </section>

          <section className="homam-section homam-features">
            <div className="container">
              <SectionHeading eyebrow="Features Delivered">Everything needed for modern e-commerce.</SectionHeading>
              <div className="homam-card-grid homam-card-grid-6">
                {features.map(({ icon: Icon, title, text }) => <article className="homam-info-card" key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}
              </div>
            </div>
          </section>

          <section className="homam-technology">
            <div className="container homam-tech-grid">
              <div><span>Technology and Delivery</span><h2>Built for performance. Ready to grow.</h2><p>A modern, scalable technology stack and best practices deliver a reliable foundation for long-term success.</p></div>
              <div><h3>Technology Stack</h3><div className="homam-tech-pills"><span><Boxes /> React</span><span><Sparkles /> Tailwind CSS</span><span><Zap /> Node.js</span></div></div>
              <div><h3>Our Delivery Principles</h3><ul><li><Gauge /> <span><strong>Fast</strong>Efficient development and deployment.</span></li><li><CheckCircle2 /> <span><strong>Scalable</strong>Built to grow with the business.</span></li><li><ShieldCheck /> <span><strong>Maintainable</strong>Clean, well-documented foundations.</span></li></ul></div>
            </div>
          </section>

          <section className="homam-section homam-outcome">
            <div className="container">
              <div className="homam-project-intro"><SectionHeading eyebrow="The Outcome">A premium storefront designed to turn product interest into confident purchases.</SectionHeading><p>The result is a beautiful, easy-to-use e-commerce experience that reflects Homam&apos;s values and helps customers feel informed, confident, and excited about their skincare journey.</p></div>
              <div className="homam-card-grid homam-card-grid-3">
                <article className="homam-info-card"><ShieldCheck /><h3>Stronger brand trust</h3><p>A clean, credible experience that reflects the quality of Homam&apos;s products.</p></article>
                <article className="homam-info-card"><Tag /><h3>Clearer buying journey</h3><p>Customers can find, learn, and buy the right products with ease.</p></article>
                <article className="homam-info-card"><Gauge /><h3>Scalable commerce foundation</h3><p>A flexible platform ready to support future growth and new product lines.</p></article>
              </div>
              <div className="homam-project-nav"><Link href="/case-studies"><ArrowLeft /> All Case Studies</Link><Link href="/case-studies">Next Project <ArrowRight /></Link></div>
              <div className="homam-final-cta"><div><span>Have a project in mind?</span><h2>Let&apos;s build an experience your customers <b>remember.</b></h2></div><p>Book a free strategy call and discover how we can turn your idea into a growth-focused digital product.</p><Link href="/#contact" className="homam-button homam-button-primary cta-glitter-button">Book A Free Strategy Call <ArrowRight /></Link></div>
            </div>
          </section>
        </main>

        <FooterTop />
        <footer className="footer bg-dark-1 light-content py-5"><Footer6 /></footer>
      </div>
    </div>
  );
}
