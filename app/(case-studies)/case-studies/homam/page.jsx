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

const experienceHighlights = [
  { icon: Search, title: "Easy Product Discovery", text: "Browse by country, skin concern, category, and trusted brands to find the right products faster." },
  { icon: ShieldCheck, title: "Shop With Confidence", text: "Clear authenticity cues, secure payments, and product information help customers make informed decisions." },
  { icon: PackageCheck, title: "Convenient Shopping", text: "From consultation to cart and nationwide delivery, every step feels simple." },
];

const globalBeautyHighlights = [
  { icon: Globe2, title: "Discover Global Brands", text: "Explore handpicked products from your favorite beauty destinations." },
  { icon: ShieldCheck, title: "Authentic & Trusted", text: "100% original products from verified international brands and distributors." },
  { icon: Tag, title: "Find What Suits You", text: "Compare products, read details, and choose the best for your routine — by country, by need." },
];

const bestSellerHighlights = [
  { icon: ShoppingBag, title: "Curated Selections", text: "Discover top-rated products chosen by real customers for real results." },
  { icon: Sparkles, title: "Real-Time Availability", text: "See stock status and make confident shopping decisions without the guesswork." },
  { icon: Globe2, title: "Global Beauty, One Place", text: "Explore authentic products from Korea, Japan, Thailand, India, the UK, the USA and more." },
];

const bundleHighlights = [
  { icon: Boxes, title: "Complete Routines", text: "Expertly curated bundles for targeted skincare goals." },
  { icon: Tag, title: "Better Value", text: "Get more of what you love with exclusive bundle savings." },
  { icon: Leaf, title: "Trusted & Authentic", text: "100% original products from globally trusted brands." },
];

const discoveryHighlights = [
  { icon: LayoutDashboard, title: "Browse by Category", text: "Explore top categories like serum, moisturizer, cleanser, toner and more — all in one place." },
  { icon: Filter, title: "Smart Filters", text: "Refine by skin concern, country, brand, gender and availability to find your perfect match." },
  { icon: ShoppingBag, title: "Product Details at a Glance", text: "See real product images, prices, stock status and best seller tags to shop with confidence." },
];

const navigationHighlights = [
  { icon: Search, title: "Explore Multiple Ways", text: "Browse by country, category or skin concern to find the right products faster." },
  { icon: Boxes, title: "Curated Collections", text: "Discover bestsellers, new arrivals and complete routines for every need." },
  { icon: ShieldCheck, title: "Authentic & Global", text: "Shop trusted beauty brands from Korea, India, Thailand, the UK, the USA and more." },
];

const consultationHighlights = [
  { icon: UserRound, title: "Expert-Led Guidance", text: "Get personalized recommendations from experienced beauty advisors." },
  { icon: Sparkles, title: "Tailored to Your Needs", text: "Share your skin type, concerns and budget to find the perfect routine." },
  { icon: ShieldCheck, title: "Secure & Confidential", text: "Your information is safe and only used for consultation purposes." },
];

const dashboardHighlights = [
  { icon: Gauge, title: "Real-Time Insights", text: "Track revenue, orders, customers and inventory at a glance." },
  { icon: Boxes, title: "Quick Store Management", text: "Add products, manage orders, handle customers and more — all in one place." },
  { icon: UserRound, title: "Grow with Confidence", text: "Make data-driven decisions and deliver a better shopping experience." },
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
        <nav className="main-nav stick-fixed wow-menubar wch-unset">
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

          <section className="homam-experience" id="homam-experience" aria-labelledby="homam-experience-title">
            <div className="homam-experience-grid">
              <div className="homam-experience-visual">
                <Image
                  src="/assets/images/demo-fancy/homam-case-study-1.png"
                  alt="Homam beauty store homepage featuring skincare products and shopping benefits"
                  fill
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <div className="homam-experience-copy">
                <div className="homam-experience-inner">
                  <span className="homam-experience-eyebrow">The Homam Experience</span>
                  <h2 id="homam-experience-title">Everything you need to shop with <em>confidence</em></h2>
                  <p>Explore authentic beauty products from trusted brands, discover what suits your skin, and move from browsing to checkout through a simple, reassuring shopping experience.</p>
                  <div className="homam-experience-highlights">
                    {experienceHighlights.map(({ icon: Icon, title, text }, index) => (
                      <article className="homam-experience-highlight" key={title}>
                        <span className="homam-experience-icon"><Icon aria-hidden="true" /></span>
                        <div><h3>{title}</h3><p>{text}</p></div>
                        <span className="homam-experience-number">0{index + 1}</span>
                      </article>
                    ))}
                  </div>
                  <div className="homam-experience-badges" aria-label="Shopping benefits">
                    <span><Leaf aria-hidden="true" /> 100% Original Products</span>
                    <span><LockKeyhole aria-hidden="true" /> Secure Payments</span>
                    <span><PackageCheck aria-hidden="true" /> Nationwide Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="homam-experience homam-global-beauty" aria-labelledby="homam-global-beauty-title">
            <div className="homam-experience-grid">
              <div className="homam-experience-visual">
                <Image
                  src="/assets/images/demo-fancy/homam-case-study-2.png"
                  alt="Homam shop by country experience with skincare collections from Korea, India, Thailand, the UK, and the USA"
                  fill
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <div className="homam-experience-copy">
                <div className="homam-experience-inner">
                  <span className="homam-experience-eyebrow">Curated Global Beauty</span>
                  <h2 id="homam-global-beauty-title">Explore beauty from around <em>the world</em></h2>
                  <p>Discover authentic skincare and beauty products from Korea, India, Thailand, the UK, the USA and more — all in one place. Browse by country to explore trusted brands, unique formulations and beauty traditions tailored to your needs.</p>
                  <div className="homam-experience-highlights">
                    {globalBeautyHighlights.map(({ icon: Icon, title, text }, index) => (
                      <article className="homam-experience-highlight" key={title}>
                        <span className="homam-experience-icon"><Icon aria-hidden="true" /></span>
                        <div><h3>{title}</h3><p>{text}</p></div>
                        <span className="homam-experience-number">0{index + 1}</span>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="homam-experience homam-best-sellers" aria-labelledby="homam-best-sellers-title">
            <div className="homam-experience-grid">
              <div className="homam-experience-visual">
                <Image
                  src="/assets/images/demo-fancy/homam-case-study-3.png"
                  alt="Homam best sellers storefront showing a selection of popular skincare products"
                  fill
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <div className="homam-experience-copy">
                <div className="homam-experience-inner">
                  <span className="homam-experience-eyebrow">Shopping Made Simple</span>
                  <h2 id="homam-best-sellers-title">Handpicked best sellers. <em>Loved worldwide.</em></h2>
                  <p>Explore customer-favourite skincare and beauty essentials, carefully curated from trusted global brands. Find what works for you — with clear product details, real availability, and a smoother shopping experience.</p>
                  <div className="homam-experience-highlights">
                    {bestSellerHighlights.map(({ icon: Icon, title, text }, index) => (
                      <article className="homam-experience-highlight" key={title}>
                        <span className="homam-experience-icon"><Icon aria-hidden="true" /></span>
                        <div><h3>{title}</h3><p>{text}</p></div>
                        <span className="homam-experience-number">0{index + 1}</span>
                      </article>
                    ))}
                  </div>
                  <div className="homam-experience-badges" aria-label="Shopping benefits">
                    <span><Leaf aria-hidden="true" /> 100% Original Products</span>
                    <span><ShieldCheck aria-hidden="true" /> Secure Payments</span>
                    <span><PackageCheck aria-hidden="true" /> Nationwide Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="homam-experience homam-bundles" aria-labelledby="homam-bundles-title">
            <div className="homam-experience-grid">
              <div className="homam-experience-visual">
                <Image
                  src="/assets/images/demo-fancy/homam-case-study-4.png"
                  alt="Homam bundle deals storefront showing curated skincare routines and savings"
                  fill
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <div className="homam-experience-copy">
                <div className="homam-experience-inner">
                  <span className="homam-experience-eyebrow">More Value, More Radiance</span>
                  <h2 id="homam-bundles-title">Curated bundle deals for every <em>beauty journey</em></h2>
                  <p>Save more with thoughtfully curated bundles, designed for real skincare needs. From brightening to anti-aging, find complete routines with trusted global brands — all in one place.</p>
                  <div className="homam-experience-highlights">
                    {bundleHighlights.map(({ icon: Icon, title, text }, index) => (
                      <article className="homam-experience-highlight" key={title}>
                        <span className="homam-experience-icon"><Icon aria-hidden="true" /></span>
                        <div><h3>{title}</h3><p>{text}</p></div>
                        <span className="homam-experience-number">0{index + 1}</span>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="homam-experience homam-discovery" aria-labelledby="homam-discovery-title">
            <div className="homam-experience-grid">
              <div className="homam-experience-visual">
                <Image
                  src="/assets/images/demo-fancy/homam-case-study-5.png"
                  alt="Homam skincare catalog with product categories, filters, and detailed product cards"
                  fill
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <div className="homam-experience-copy">
                <div className="homam-experience-inner">
                  <span className="homam-experience-eyebrow">A Seamless Shopping Experience</span>
                  <h2 id="homam-discovery-title">Make skincare <em>discovery effortless</em></h2>
                  <p>Explore a wide range of authentic skincare products with intuitive filters, curated categories and detailed product information — all designed to help you find exactly what your skin needs.</p>
                  <div className="homam-experience-highlights">
                    {discoveryHighlights.map(({ icon: Icon, title, text }, index) => (
                      <article className="homam-experience-highlight" key={title}>
                        <span className="homam-experience-icon"><Icon aria-hidden="true" /></span>
                        <div><h3>{title}</h3><p>{text}</p></div>
                        <span className="homam-experience-number">0{index + 1}</span>
                      </article>
                    ))}
                  </div>
                  <div className="homam-experience-badges" aria-label="Shopping benefits">
                    <span><Leaf aria-hidden="true" /> 100% Original Products</span>
                    <span><ShieldCheck aria-hidden="true" /> Secure Payments</span>
                    <span><PackageCheck aria-hidden="true" /> Nationwide Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="homam-experience homam-navigation" aria-labelledby="homam-navigation-title">
            <div className="homam-experience-grid">
              <div className="homam-experience-visual">
                <Image
                  src="/assets/images/demo-fancy/homam-case-study-6.png"
                  alt="Homam store navigation with shopping by country, category, skin concern and curated collections"
                  fill
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <div className="homam-experience-copy">
                <div className="homam-experience-inner">
                  <span className="homam-experience-eyebrow">A World of Beauty, Organized for You</span>
                  <h2 id="homam-navigation-title">Find exactly what you need, <em>with ease</em></h2>
                  <p>Shop by country, category or skin concern and discover carefully curated collections. A simpler way to explore authentic global beauty — all in one place.</p>
                  <div className="homam-experience-highlights">
                    {navigationHighlights.map(({ icon: Icon, title, text }, index) => (
                      <article className="homam-experience-highlight" key={title}>
                        <span className="homam-experience-icon"><Icon aria-hidden="true" /></span>
                        <div><h3>{title}</h3><p>{text}</p></div>
                        <span className="homam-experience-number">0{index + 1}</span>
                      </article>
                    ))}
                  </div>
                  <div className="homam-experience-badges" aria-label="Shopping benefits">
                    <span><ShieldCheck aria-hidden="true" /> 100% Original Products</span>
                    <span><PackageCheck aria-hidden="true" /> Nationwide Delivery</span>
                    <span><LockKeyhole aria-hidden="true" /> Secure Payments</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="homam-experience homam-consultation" aria-labelledby="homam-consultation-title">
            <div className="homam-experience-grid">
              <div className="homam-experience-visual">
                <Image
                  src="/assets/images/demo-fancy/homam-case-study-7.png"
                  alt="Homam personalized skincare consultation page and booking form"
                  fill
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <div className="homam-experience-copy">
                <div className="homam-experience-inner">
                  <span className="homam-experience-eyebrow">Expert Guidance, Just for You</span>
                  <h2 id="homam-consultation-title">Your Personal Skincare Consultation, <em>Made Simple</em></h2>
                  <p>Get expert advice tailored to your skin type, concerns and budget. Share a few details, and our beauty advisors will recommend the right products and routines — all in one easy consultation.</p>
                  <div className="homam-experience-highlights">
                    {consultationHighlights.map(({ icon: Icon, title, text }, index) => (
                      <article className="homam-experience-highlight" key={title}>
                        <span className="homam-experience-icon"><Icon aria-hidden="true" /></span>
                        <div><h3>{title}</h3><p>{text}</p></div>
                        <span className="homam-experience-number">0{index + 1}</span>
                      </article>
                    ))}
                  </div>
                  <div className="homam-experience-badges" aria-label="Consultation benefits">
                    <span><Leaf aria-hidden="true" /> 100% Original Products</span>
                    <span><ShieldCheck aria-hidden="true" /> Secure Your Information</span>
                    <span><UserRound aria-hidden="true" /> Dedicated Support</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="homam-experience homam-dashboard" aria-labelledby="homam-dashboard-title">
            <div className="homam-experience-grid">
              <div className="homam-experience-visual">
                <Image
                  src="/assets/images/demo-fancy/homam-case-study-8.png"
                  alt="Homam store dashboard with revenue, orders, customer, inventory, and consultation insights"
                  fill
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <div className="homam-experience-copy">
                <div className="homam-experience-inner">
                  <span className="homam-experience-eyebrow">Powerful Tools, Smoother Operations</span>
                  <h2 id="homam-dashboard-title">A Smarter Way to Manage Your <em>Beauty Business</em></h2>
                  <p>Get a complete view of your store performance, manage products, orders, customers and consultations — all from a clean, easy-to-use dashboard.</p>
                  <div className="homam-experience-highlights">
                    {dashboardHighlights.map(({ icon: Icon, title, text }, index) => (
                      <article className="homam-experience-highlight" key={title}>
                        <span className="homam-experience-icon"><Icon aria-hidden="true" /></span>
                        <div><h3>{title}</h3><p>{text}</p></div>
                        <span className="homam-experience-number">0{index + 1}</span>
                      </article>
                    ))}
                  </div>
                  <div className="homam-experience-badges" aria-label="Dashboard benefits">
                    <span><ShieldCheck aria-hidden="true" /> Secure &amp; Reliable</span>
                    <span><Zap aria-hidden="true" /> Built for Growth</span>
                    <span><Gauge aria-hidden="true" /> All-in-One Control</span>
                  </div>
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
