import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import FooterTop from "@/components/homes/home-6/FooterTop";
import HomamSliderControls from "@/components/homam/HomamSliderControls";
import { fancyMultipage } from "@/data/menu";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  CirclePlay,
  CircleUserRound,
  ExternalLink,
  Filter,
  Gauge,
  Globe2,
  LayoutDashboard,
  Leaf,
  LockKeyhole,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Tag,
  UserRound,
  UsersRound,
  XCircle,
  Zap,
} from "lucide-react";
import Image from "next/image";

const challengeFlow = [
  { icon: Boxes, title: "A Large Catalog", text: "Thousands of products across countries, brands and categories" },
  { icon: Search, title: "Discovery", text: "Help customers find relevant products faster" },
  { icon: ShieldCheck, title: "Confidence", text: "Build trust with clear information and authenticity" },
  { icon: ShoppingBag, title: "Purchase", text: "A smooth, secure checkout experience" },
];

const frictionPoints = [
  { icon: LayoutDashboard, title: "Too many ways to choose", text: "Customers can shop by product category, country, brand, skin concern, routine and collection. Without a clear hierarchy, a large catalog can quickly become overwhelming." },
  { icon: Search, title: "Finding the right product", text: "Beauty shopping is highly personal. A customer looking for pigmentation care, for example, needs a faster path to relevant products to trim unnecessary browsing." },
  { icon: ShieldCheck, title: "Trust before purchase", text: "For imported skincare, authenticity, product origin, secure payment and clear product information are important confidence signals throughout the experience." },
  { icon: ShoppingCart, title: "Moving from discovery to checkout", text: "The experience needs to connect browsing, product comparison, bundles, consultation, cart and checkout without making customers feel they are navigating separate systems." },
];

const discoveryPaths = [
  { icon: Globe2, title: "By Country" }, { icon: LayoutDashboard, title: "By Category" },
  { icon: Sparkles, title: "By Skin Concern" }, { icon: Boxes, title: "Collections" },
  { icon: CircleUserRound, title: "Personal Guidance" },
];

const experienceGoals = [
  { icon: Leaf, title: "Make discovery intuitive", text: "Create clear entry points for country, category, skin concern, collections and best sellers." },
  { icon: ShieldCheck, title: "Build confidence throughout", text: "Surface authenticity, imported-product positioning, secure payment and useful product information where purchase decisions happen." },
  { icon: UsersRound, title: "Support different shoppers", text: "Allow confident shoppers to browse directly while customers who need guidance can use skin-concern discovery or consultation." },
  { icon: BarChart3, title: "Encourage higher-value shopping", text: "Introduce curated routines, bundles, complementary products and relevant recommendations naturally instead of relying only on individual product listings." },
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
                  <div className="homam-actions">
                    <a href="https://homam.shop" target="_blank" rel="noopener noreferrer" className="homam-button homam-button-primary">Visit Live Website <ExternalLink /></a>
                    <a href="#homam-experience" className="homam-button homam-button-secondary"><CirclePlay aria-hidden="true" />View Case Study</a>
                  </div>
                </div>
                <div className="homam-hero-media">
                  <div className="homam-orb" />
                  <Image src="/assets/images/demo-fancy/homam-showcase.png" alt="HOMAM store on laptop and mobile" width={1776} height={887} priority />
                </div>
              </div>
            </div>
          </section>

          <section className="homam-case-intro" aria-label="HOMAM case study introduction">
            <div className="container">
              <div className="homam-case-intro-banner">
                <div className="homam-case-intro-mark" aria-hidden="true"><Sparkles /></div>
                <div className="homam-case-intro-copy">
                  <span>Inside the case study</span>
                  <h2>From a crowded catalog to a guided beauty journey.</h2>
                </div>
                <dl className="homam-case-intro-facts">
                  <div><dt>Client</dt><dd>HOMAM</dd></div>
                  <div><dt>Industry</dt><dd>Beauty commerce</dd></div>
                  <div><dt>Focus</dt><dd>Trust and discovery</dd></div>
                </dl>
              </div>
            </div>
          </section>

          <section className="homam-section homam-challenge" id="challenge" aria-labelledby="homam-challenge-title">
            <div className="container">
              <div className="homam-challenge-opening">
                <div className="homam-challenge-copy">
                  <span className="homam-challenge-kicker"><b>01</b> The challenge <i /></span>
                  <h2 id="homam-challenge-title">Making a large beauty catalog feel <span>simple, trustworthy and easy to shop.</span></h2>
                  <p>HOMAM brings together skincare and beauty products across multiple countries, brands, categories and skin concerns. The challenge wasn&apos;t simply displaying more products. It was helping customers quickly understand where to start, find products relevant to them, trust what they were buying, and move confidently toward checkout.</p>
                </div>
                <div className="homam-challenge-flow" aria-label="From a large catalog to confident purchase">
                  <span className="homam-script-note">From overwhelming<br />to effortless</span>
                  <div className="homam-flow-row">
                    {challengeFlow.map(({ icon: Icon, title, text }, index) => <div className="homam-flow-step" key={title}><span className="homam-flow-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p>{index < challengeFlow.length - 1 ? <ArrowRight className="homam-flow-arrow" aria-hidden="true" /> : null}</div>)}
                  </div>
                </div>
                <div className="homam-challenge-photo">
                  <Image src="/assets/images/demo-fancy/homam-challenge-products.png" alt="Olive serum and skincare cream arranged on travertine with green leaves" fill sizes="(max-width: 900px) 100vw, 24vw" />
                  <span>Beauty<br />without<br />borders</span>
                </div>
              </div>

              <div className="homam-challenge-panel homam-friction-panel">
                <div className="homam-panel-heading"><span><b>02</b> Where the friction happens <i /></span><small>Real customer pain points</small></div>
                <div className="homam-friction-grid">
                  {frictionPoints.map(({ icon: Icon, title, text }, index) => <article key={title}><div><span className="homam-card-icon"><Icon aria-hidden="true" /></span><b>0{index + 1}</b></div><h3>{title}</h3><p>{text}</p></article>)}
                </div>
              </div>

              <div className="homam-ux-grid">
                <div className="homam-ux-copy">
                  <div className="homam-panel-heading"><span><b>03</b> The UX challenge <i /></span></div>
                  <h3>One storefront.<br />Multiple ways to find<br />the right product.</h3>
                  <p>We needed to design an experience that works for different types of shoppers, from first-time visitors to skincare experts, with flexible entry points and a clear path to purchase.</p>
                  <div className="homam-ux-quote"><span className="homam-card-icon"><Leaf /></span><p>Different journeys.<br />Same beautiful destination.</p></div>
                </div>
                <div className="homam-journey-map">
                  <svg className="homam-journey-lines" viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <marker id="homam-arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#6f8e75" strokeWidth="1.5" /></marker>
                    </defs>
                    <g className="homam-lines-top">
                      <path d="M60 72 C66 112 94 123 150 126 C210 129 238 143 252 178" />
                      <path d="M180 72 C180 105 195 125 220 130 C252 136 265 142 274 174" />
                      <path d="M300 72 C300 105 298 140 305 176" />
                      <path d="M420 72 C420 105 405 125 380 130 C348 136 335 142 326 174" />
                      <path d="M540 72 C534 112 506 123 450 126 C390 129 362 143 348 178" />
                    </g>
                    <g className="homam-lines-bottom">
                      <path d="M300 222 L300 246" markerEnd="url(#homam-arrow-green)" />
                      <path d="M300 246 L300 270" />
                      <path d="M300 252 L60 252 Q48 252 48 264 L48 272" />
                      <path d="M300 252 L540 252 Q552 252 552 264 L552 272" />
                    </g>
                  </svg>
                  <div className="homam-paths">{discoveryPaths.map(({ icon: Icon, title }) => <article key={title}><span><Icon /></span><b>{title}</b></article>)}</div>
                  <div className="homam-map-customer"><span><CircleUserRound /></span><b>Customer</b><small>Different needs. One place.</small></div>
                  <div className="homam-map-results"><article><span><Search /></span><b>Relevant Products</b><small>Curated results that match their needs</small></article><article><span><PackageCheck /></span><b>Product Details</b><small>Clear information, reviews and recommendations</small></article><article><span><ShoppingCart /></span><b>Secure Checkout</b><small>A seamless and trusted purchase experience</small></article></div>
                </div>
                <div className="homam-phone-preview" aria-label="HOMAM mobile storefront preview">
                  <Image className="homam-phone-screen" src="/assets/images/demo-fancy/homam-mobile-homepage.png" alt="HOMAM mobile storefront homepage" fill sizes="250px" />
                </div>
              </div>

              <div className="homam-challenge-panel homam-goals-panel">
                <div className="homam-panel-heading"><span><b>04</b> What the experience needed to achieve <i /></span><small>A better shopping experience</small></div>
                <div className="homam-goals-grid">{experienceGoals.map(({ icon: Icon, title, text }, index) => <article key={title}><div><span className="homam-card-icon"><Icon aria-hidden="true" /></span><b>0{index + 1}</b></div><h3>{title}</h3><p>{text}</p></article>)}</div>
              </div>

              <div className="homam-challenge-panel homam-result-panel">
                <div className="homam-panel-heading"><span><b>05</b> The result <i /></span></div>
                <div className="homam-result-grid">
                  <article className="homam-result-before"><span>Before</span><h3>A complex and fragmented experience</h3>{["Large product catalog with little guidance", "Fragmented browsing experience", "Generic product discovery", "Uncertainty about product authenticity", "Mostly individual-product shopping"].map(item => <p key={item}><XCircle />{item}</p>)}<Image src="/assets/images/demo-fancy/homam-challenge-before.png" alt="Customer overwhelmed by too many skincare choices" width={440} height={550} /><i className="homam-thought homam-thought-a">Too many options...</i><i className="homam-thought homam-thought-b">Which product is right?</i><i className="homam-thought homam-thought-c">Can I trust this?</i></article>
                  <div className="homam-result-arrow"><ArrowRight /></div>
                  <article className="homam-result-after"><span>After</span><h3>A guided, trusted and seamless journey</h3>{["Multiple entry points for easy discovery", "Concern-based and personalized navigation", "Clear trust signals and product information", "Guided assistance through consultation", "Bundles and routines for better value", "A smooth and secure purchase journey"].map(item => <p key={item}><CheckCircle2 />{item}</p>)}<Image src="/assets/images/demo-fancy/homam-challenge-after.png" alt="Customer confident in her skincare choices" width={440} height={550} /><i className="homam-thought homam-thought-after">So easy<br />to find what I need!</i><span className="homam-result-heart">♥</span></article>
                </div>
                <div className="homam-result-quote"><span className="homam-card-icon"><Leaf /></span><p>The goal wasn&apos;t to make HOMAM look like it had fewer products.<br />It was to make a large catalog feel easier to understand.</p><small>Real people. Real beauty. A brighter you.</small></div>
              </div>
            </div>
          </section>

          <section className="homam-showcase-transition" aria-labelledby="homam-showcase-transition-title">
            <div className="container">
              <div className="homam-showcase-transition-card">
                <div className="homam-showcase-transition-copy">
                  <span>From strategy to screens</span>
                  <h2 id="homam-showcase-transition-title">The thinking is complete.<br />Now see it come to life.</h2>
                  <p>Explore the key pages and interactions that turn HOMAM&apos;s product range into a clear, confident shopping experience.</p>
                </div>
                <div className="homam-showcase-transition-previews" aria-hidden="true">
                  <div className="homam-transition-preview homam-transition-preview-left"><Image src="/assets/images/demo-fancy/homam-case-study-2.png" alt="" fill sizes="220px" /></div>
                  <div className="homam-transition-preview homam-transition-preview-main"><Image src="/assets/images/demo-fancy/homam-case-study-1.png" alt="" fill sizes="300px" /></div>
                  <div className="homam-transition-preview homam-transition-preview-right"><Image src="/assets/images/demo-fancy/homam-case-study-3.png" alt="" fill sizes="220px" /></div>
                </div>
              </div>
            </div>
          </section>

          <section className="homam-showcase-slider" aria-label="HOMAM project screens">
            <div className="homam-showcase-slider-heading">
              <div><span>Explore the experience</span><p>Swipe through the key screens</p></div>
              <HomamSliderControls />
            </div>
            <div className="homam-showcase-slider-track" tabIndex="0">
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

          <section className="homam-experience homam-global-beauty" id="homam-slide-global" aria-labelledby="homam-global-beauty-title">
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

          <section className="homam-experience homam-best-sellers" id="homam-slide-best-sellers" aria-labelledby="homam-best-sellers-title">
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

          <section className="homam-experience homam-bundles" id="homam-slide-bundles" aria-labelledby="homam-bundles-title">
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

          <section className="homam-experience homam-discovery" id="homam-slide-discovery" aria-labelledby="homam-discovery-title">
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

          <section className="homam-experience homam-navigation" id="homam-slide-navigation" aria-labelledby="homam-navigation-title">
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

          <section className="homam-experience homam-consultation" id="homam-slide-consultation" aria-labelledby="homam-consultation-title">
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

          <section className="homam-experience homam-dashboard" id="homam-slide-dashboard" aria-labelledby="homam-dashboard-title">
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
            </div>
            <nav className="homam-showcase-slider-nav" aria-label="Choose a project screen">
              <a href="#homam-experience"><span>01</span> Storefront</a>
              <a href="#homam-slide-global"><span>02</span> Global beauty</a>
              <a href="#homam-slide-best-sellers"><span>03</span> Best sellers</a>
              <a href="#homam-slide-bundles"><span>04</span> Bundles</a>
              <a href="#homam-slide-discovery"><span>05</span> Discovery</a>
              <a href="#homam-slide-navigation"><span>06</span> Navigation</a>
              <a href="#homam-slide-consultation"><span>07</span> Consultation</a>
              <a href="#homam-slide-dashboard"><span>08</span> Dashboard</a>
            </nav>
          </section>

        </main>

        <FooterTop />
        <footer
          className="footer bg-dark-1 light-content py-5"
          style={{ background: "linear-gradient(220deg, #621ABE 0%, #051D55 50%)" }}
        >
          <Footer6 />
        </footer>
      </div>
    </div>
  );
}
