import { PopupWrapper } from "@/components/headers/components/PopupWrapper";
import Header6 from "@/components/headers/Header6";
import { fancyMultipage } from "@/data/menu";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "System Development | InfiniSoft Technology",
  description:
    "Premium system development landing page for businesses that need more than a website. Build a connected growth system that drives sales, automation, and scale.",
};

const painPoints = [
  {
    title: "Leads are",
    accent: "slipping away",
    text: "Visitors enquire, but there's no reliable system to capture, qualify, and follow up.",
  },
  {
    title: "Manual work is",
    accent: "slowing growth",
    text: "Your team spends time on repetitive tasks instead of activities that actually drive growth.",
  },
  {
    title: "Your tools",
    accent: "don't connect",
    text: "Website, CRM, payments, analytics and operations work in silos, creating gaps and data loss.",
  },
  {
    title: "You lack clear",
    accent: "business visibility",
    text: "You have data, but no clear view of what's driving sales, what's working, and what's not.",
  },
  {
    title: "Growth creates",
    accent: "more complexity",
    text: "More customers, more orders, more data - yet your operations become harder to manage.",
  },
];

const transformationLeft = [
  "Manual processes",
  "Missed leads and slow follow-up",
  "Disconnected software",
  "No clear analytics",
  "Repetitive admin work",
  "Difficult scaling",
];

const transformationRight = [
  "Automated workflows",
  "Centralized customer data",
  "Conversion-focused website",
  "Real-time business analytics",
  "Integrated operations",
  "Scalable infrastructure",
];

const systemNodes = [
  {
    title: "Conversion-Focused Website",
    text: "Turn visitors into enquiries and customers with better page flow and stronger calls to action.",
  },
  {
    title: "E-commerce System",
    text: "Connect products, orders, customers, inventory, and buying journeys into one smoother system.",
  },
  {
    title: "CRM & Lead Management",
    text: "Capture, organize, and follow up with leads from one central place.",
  },
  {
    title: "Business Automation",
    text: "Remove repetitive work with simple workflows that save time and reduce errors.",
  },
  {
    title: "Analytics & Intelligence",
    text: "Understand revenue, customers, conversions, and opportunities without guessing.",
  },
  {
    title: "Customer Experience",
    text: "Create smoother journeys before, during, and after purchase.",
  },
  {
    title: "Admin Dashboard",
    text: "Manage the business from one clear operating layer.",
  },
  {
    title: "Integrations",
    text: "Connect payment gateways, WhatsApp, email, APIs, and third-party tools.",
  },
];

const outcomeCards = [
  {
    title: "More Sales Opportunities",
    text: "Build journeys designed to turn traffic into enquiries and customers.",
  },
  {
    title: "Less Manual Work",
    text: "Automate repetitive processes so your team can focus on higher-value activities.",
  },
  {
    title: "Better Decisions",
    text: "See the numbers that matter instead of guessing what is driving growth.",
  },
  {
    title: "Faster Operations",
    text: "Connect your tools and remove unnecessary steps from everyday workflows.",
  },
  {
    title: "Better Customer Experience",
    text: "Create a smoother journey from first visit to repeat purchase.",
  },
  {
    title: "Easier Scaling",
    text: "Build an infrastructure that can support your next stage of growth.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Understand",
    text: "We study your business, customers, workflows, bottlenecks, and growth goals.",
  },
  {
    step: "02",
    title: "Identify",
    text: "We identify opportunities to improve conversion, automate processes, and reduce friction.",
  },
  {
    step: "03",
    title: "Architect",
    text: "We design the complete digital system around how your business actually works.",
  },
  {
    step: "04",
    title: "Build",
    text: "Our team designs, develops, integrates, and tests the system.",
  },
  {
    step: "05",
    title: "Grow",
    text: "After launch, we continue helping you optimize the system as your business evolves.",
  },
];

const businessFlow = [
  "Traffic",
  "Website",
  "Lead / Customer",
  "CRM",
  "Automation",
  "Sales",
  "Customer Retention",
  "Analytics",
  "Business Decisions",
];

const ecommerceStats = [
  ["Orders today", "32"],
  ["Revenue this month", "£24,580"],
  ["Conversion rate", "3.24%"],
  ["Abandoned carts", "18"],
  ["Returning customers", "152"],
  ["Best sellers", "12"],
];

const manualSteps = [
  "Customer enquiry",
  "Employee checks message",
  "Enters information",
  "Sends email",
  "Updates spreadsheet",
  "Contacts customer",
];

const automatedSteps = [
  "Customer enquiry",
  "CRM",
  "Automated notification",
  "Follow-up",
  "Dashboard",
  "Sales team",
];

const principles = [
  {
    title: "Business First",
    text: "Technology should solve business problems, not create more complexity.",
  },
  {
    title: "Built Around You",
    text: "We do not force businesses into generic templates or one-size-fits-all flows.",
  },
  {
    title: "Designed to Scale",
    text: "What works today should still work as your team, revenue, and operations expand.",
  },
  {
    title: "Long-Term Support",
    text: "We continue supporting and improving the system after launch.",
  },
];

const trustBlocks = [
  {
    title: "Client Logos",
    text: "Use this area for logo placeholders, partner marks, or selected customer brands.",
  },
  {
    title: "Selected Projects",
    text: "Showcase a few system builds, dashboards, or conversion-focused case studies.",
  },
  {
    title: "Industries Served",
    text: "E-commerce, SMEs, founders, professional services, and operations-led businesses.",
  },
  {
    title: "Video Testimonials",
    text: "Drop in short client clips or a quote carousel once you have the assets.",
  },
];

const qualification = {
  yes: [
    "Your business is growing",
    "You are losing opportunities because of inefficient systems",
    "You want to automate operations",
    "You need better business visibility",
    "Your current website is not producing enough results",
    "You want technology designed around long-term growth",
  ],
  no: [
    "You only want the cheapest website available",
    "You only need a basic template website",
    "You are not ready to improve existing business processes",
  ],
};

const faqs = [
  {
    question: "How much does a system like this cost?",
    answer:
      "Every business is different. After understanding your requirements, we'll recommend the appropriate scope and investment.",
  },
  {
    question: "Do you only build websites?",
    answer:
      "No. Websites are often just one part of the system. We also develop dashboards, e-commerce platforms, automation, integrations, CRM workflows, and custom applications.",
  },
  {
    question: "Can you improve my existing website?",
    answer:
      "Yes. We can redesign, optimize, or integrate existing platforms where appropriate.",
  },
  {
    question: "Do you work with specific platforms?",
    answer:
      "We choose the right stack for the job and keep the solution flexible around your business needs and growth goals.",
  },
];

function SectionHeading({ eyebrow, title, text, centered = false }) {
  return (
    <div className={`${styles.sectionHeading} ${centered ? styles.centered : ""}`}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function ProblemIcon({ index }) {
  const icons = [
    <><circle cx="12" cy="8" r="3" /><path d="M6.8 19c.4-3.3 2.1-5 5.2-5 3.2 0 4.9 1.7 5.2 5M17 6l3 3m0-3-3 3" /></>,
    <><rect x="6" y="4" width="12" height="16" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
    <><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="7" r="2.5" /><circle cx="12" cy="17" r="2.5" /><path d="m9 8.5 2 6m4-6-2 6M9.5 7h5" /></>,
    <><rect x="4" y="5" width="16" height="12" rx="2" /><path d="M8 14v-3m4 3V8m4 6v-5M9 20h6" /></>,
    <><rect x="5" y="5" width="14" height="14" rx="2" /><path d="m8 15 3-3 2 2 4-5M8 9h3" /></>,
  ];

  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[index]}</svg>;
}

function ProblemVisual({ index }) {
  if (index === 0) {
    return (
      <div className={`${styles.problemVisual} ${styles.leadVisual}`} aria-hidden="true">
        <i className={styles.personOne} /><i className={styles.personTwo} />
        <span className={styles.dottedPath} />
        <strong>?</strong>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className={`${styles.problemVisual} ${styles.taskVisual}`} aria-hidden="true">
        {[0, 1, 2].map((item) => <span key={item}><i /><b /></span>)}
        <strong>⌚</strong>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className={`${styles.problemVisual} ${styles.networkVisual}`} aria-hidden="true">
        <span className={styles.networkLineOne} /><span className={styles.networkLineTwo} />
        <i className={styles.networkTop}>▣</i><i className={styles.networkRight}>▤</i>
        <i className={styles.networkBottom}>▰</i><i className={styles.networkLeft}>▥</i>
        <strong>!</strong>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className={`${styles.problemVisual} ${styles.visibilityVisual}`} aria-hidden="true">
        <span /><span /><span /><span />
        <svg viewBox="0 0 180 92"><path d="M4 75 C26 72 30 42 52 50 S82 62 98 34 S128 52 151 19 S166 22 176 8" /></svg>
        <strong>?</strong>
      </div>
    );
  }

  return (
    <div className={`${styles.problemVisual} ${styles.complexityVisual}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((item) => <span key={item} />)}
      <i className={styles.complexityOne}>●</i><i className={styles.complexityTwo}>♙</i>
      <i className={styles.complexityThree}>$</i><i className={styles.complexityFour}>▧</i>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className={styles.heroVisual}>
      <div className={styles.heroVisualGlowOne} />
      <div className={styles.heroVisualGlowTwo} />

      <div className={styles.heroPanel}>
        <div className={styles.panelHeader}>
          <span className={styles.windowDots}>
            <i />
            <i />
            <i />
          </span>
          <span>Business Operating System</span>
        </div>

        <div className={styles.metricGrid}>
          <div className={styles.metricCard}>
            <span>Website Traffic</span>
            <strong>12.4K</strong>
            <em>+18.5% vs last 30 days</em>
          </div>
          <div className={styles.metricCard}>
            <span>Leads</span>
            <strong>458</strong>
            <em>+21.8% vs last 30 days</em>
          </div>
          <div className={styles.metricCard}>
            <span>Orders</span>
            <strong>145</strong>
            <em>+8.2% vs last 30 days</em>
          </div>
          <div className={styles.metricCard}>
            <span>Revenue</span>
            <strong>£48,250</strong>
            <em>+32.7% vs last 30 days</em>
          </div>
        </div>

        <div className={styles.heroCharts}>
          <div className={styles.pipelineCard}>
            <div className={styles.cardLabel}>CRM Pipeline</div>
            <div className={styles.pipelineRows}>
              {[
                ["New Leads", "152", 78],
                ["Contacted", "85", 62],
                ["Qualified", "47", 40],
                ["Proposal", "23", 30],
                ["Won", "18", 20],
              ].map(([label, value, width]) => (
                <div key={label} className={styles.pipelineRow}>
                  <span>{label}</span>
                  <div className={styles.pipelineBar}>
                    <i style={{ width: `${width}%` }} />
                  </div>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.cardLabel}>Analytics</div>
            <div className={styles.lineChart}>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <svg viewBox="0 0 280 120" aria-hidden="true">
                <path d="M8 92 C34 88, 54 68, 78 74 S120 100, 146 63 S192 28, 220 42 S252 71, 272 30" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.floatingCard} ${styles.floatingCardTop}`}>
        <strong>New Lead</strong>
        <span>John D. from CA</span>
      </div>
      <div className={`${styles.floatingCard} ${styles.floatingCardBottom}`}>
        <strong>Order Received</strong>
        <span>£1,250.00</span>
      </div>
    </div>
  );
}

function HeroVisualV2() {
  const pipeline = [
    ["New Leads", "152", 78],
    ["Contacted", "85", 62],
    ["Qualified", "47", 40],
    ["Proposal", "23", 30],
    ["Won", "18", 20],
  ];

  return (
    <div className={styles.heroVisual}>
      <div className={styles.heroVisualGlowOne} />
      <div className={styles.heroVisualGlowTwo} />

      <div className={styles.heroPanelV2}>
        <aside className={styles.heroSidebar} aria-hidden="true">
          <span className={styles.sidebarMark}>I</span>
          {Array.from({ length: 6 }).map((_, index) => <i key={index} />)}
          <span className={styles.sidebarActive} />
        </aside>

        <div className={styles.heroPanelMain}>
          <div className={styles.panelHeader}>
            <span className={styles.windowDots}><i /><i /><i /></span>
            <span>Business Operating System</span>
          </div>

          <div className={styles.metricGrid}>
            {[
              ["Website Traffic", "12.4K", "+18.5% vs last 30 days"],
              ["Leads", "458", "+21.8% vs last 30 days"],
              ["Orders", "145", "+8.2% vs last 30 days"],
              ["Revenue", "\u00A348,250", "+32.7% vs last 30 days"],
            ].map(([label, value, change]) => (
              <div key={label} className={styles.metricCard}>
                <span>{label}</span><strong>{value}</strong><em>{change}</em>
              </div>
            ))}
          </div>

          <div className={styles.heroChartsV2}>
            <div className={styles.pipelineCard}>
              <div className={styles.cardLabel}>CRM Pipeline</div>
              <div className={styles.pipelineRows}>
                {pipeline.map(([label, value, width]) => (
                  <div key={label} className={styles.pipelineRow}>
                    <span>{label}</span>
                    <div className={styles.pipelineBar}><i style={{ width: `${width}%` }} /></div>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.automationMiniCard}>
              <div className={styles.cardLabel}>Automation</div>
              <div className={styles.automationMetric}><span>Active workflows</span><strong>24</strong></div>
              <div className={styles.automationMetric}><span>Tasks executed</span><strong>1,284</strong></div>
              <div className={styles.automationMetric}><span>Time saved</span><strong>196 hrs</strong></div>
              <span className={styles.workflowLink}>View workflows</span>
            </div>

            <div className={styles.chartCard}>
              <div className={styles.cardLabel}>Analytics</div>
              <div className={styles.chartMeta}><span>Sessions</span><strong>+18.6%</strong></div>
              <div className={styles.lineChart}>
                <span /><span /><span /><span /><span /><span />
                <svg viewBox="0 0 280 120" aria-hidden="true">
                  <path d="M8 92 C34 88, 54 68, 78 74 S120 100, 146 63 S192 28, 220 42 S252 71, 272 30" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.floatingCard} ${styles.floatingCardTop}`}>
        <strong>New Lead</strong><span>John D. from CA</span>
      </div>
      <div className={`${styles.floatingCard} ${styles.floatingCardBottom}`}>
        <strong>Order Received</strong><span>{"\u00A3"}1,250.00</span>
      </div>
      <div className={`${styles.floatingCard} ${styles.floatingRevenue}`}>
        <span>Revenue This Month</span><strong>{"\u00A3"}48,250</strong><em>+32.7% vs last month</em>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <Link href="/" className={styles.brand} aria-label="InfiniSoft Technology home">
      <Image src="/assets/images/InfiniSoftLogoblack.png" alt="" width={52} height={52} priority />
      <span>
        <strong>INFINISOFT</strong>
        <small>TECHNOLOGY</small>
      </span>
    </Link>
  );
}

function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Brand />
          <p>Bringing your vision to reality with connected systems built for sustainable growth.</p>
        </div>
        <div className={styles.footerLinks}>
          <strong>Explore</strong>
          <Link href="/about">About</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/case-studies">Case Studies</Link>
        </div>
        <div className={styles.footerLinks}>
          <strong>Contact</strong>
          <a href="tel:+8801858333238">+880 1858-333238</a>
          <a href="mailto:info@infinisoftech.com">info@infinisoftech.com</a>
          <Link href="#top">Back to top</Link>
        </div>
      </div>
      <div className={styles.footerBottom}>InfiniSoft Technology. {new Date().getFullYear()}.</div>
    </footer>
  );
}

export default function SystemDevelopmentPage() {
  return (
    <div className={`theme-fancy ${styles.siteShell}`}>
      <div className="page" id="top">
        <nav className="main-nav transparent dark agency-pricing-nav stick-fixed wow-menubar wch-unset border-b">
          <Header6 links={fancyMultipage} />
        </nav>

        <main id="main" className={styles.pageRoot}>
          <section className={styles.heroSection}>
            <div className="container">
              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <div className={styles.heroKicker}>SCALABLE DIGITAL GROWTH SYSTEMS</div>
                  <h1>
                    Your Business Doesn't
                    <br />
                    Need Another Website.
                    <br />
                    It Needs a <span>System</span>
                    <br />
                    Built to <span>Grow.</span>
                  </h1>
                  <p className={styles.heroLead}>
                    Turn more opportunities into revenue, replace repetitive work with automation, and gain the
                    clarity to scale your business with confidence.
                  </p>

                  <div className={styles.heroCtas}>
                    <PopupWrapper buttonText="Book A Free Growth Strategy Call" />
                    <Link href="#system-audit" className={styles.secondaryCta}>
                      Get a Free Audit
                    </Link>
                  </div>

                  <div className={styles.trustRow}>
                    <span>No Contracts</span>
                    <span>Pause Anytime</span>
                    <span>Fast Turnaround</span>
                  </div>
                </div>

                <HeroVisualV2 />
              </div>
            </div>
          </section>

          <section className={styles.darkSection}>
            <div className="container">
              <div className={styles.problemPanel}>
                <div className={styles.problemIntro}>
                  <span className={styles.problemKicker}>The Real Bottleneck</span>
                  <h2 className={styles.problemHeading}>
                    Your Website May Not Be the Problem.
                    <br />
                    Your <strong>System</strong> Might Be.
                  </h2>
                  <p>When your tools, data and processes aren't connected,<br />growth becomes harder than it needs to be.</p>
                </div>

                <div className={styles.painGrid}>
                  {painPoints.map((item, index) => (
                    <article key={item.title} className={styles.painCard}>
                      <div className={styles.painCopy}>
                        <div className={styles.painIcon}><ProblemIcon index={index} /></div>
                        <h3>{item.title}<br /><span>{item.accent}</span></h3>
                        <p>{item.text}</p>
                      </div>
                      <ProblemVisual index={index} />
                    </article>
                  ))}
                </div>

                <div className={styles.problemCallout}>
                  <span className={styles.calloutCheck}>✓</span>
                  <p>These aren't five separate problems.<br />They're symptoms of a <strong>disconnected system.</strong></p>
                  <Link href="#transformation">See the transformation <span>→</span></Link>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.transitionSection} id="transformation">
            <div className="container">
              <SectionHeading
                eyebrow="Transformation"
                title="We move your business from digital chaos to a connected growth system."
                text="The shift is not just visual. The goal is to change how leads, operations, and customer experiences flow through the business."
                centered
              />

              <div className={styles.beforeAfterGrid}>
                <article className={styles.beforeCard}>
                  <span>BEFORE</span>
                  <ul>
                    {transformationLeft.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <div className={styles.centerBridge}>
                  <strong>Digital chaos</strong>
                  <span>→</span>
                  <strong>Connected system</strong>
                </div>

                <article className={styles.afterCard}>
                  <span>AFTER</span>
                  <ul>
                    {transformationRight.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </section>

          <section className={styles.systemSection} id="system">
            <div className="container">
              <SectionHeading
                eyebrow="The system"
                title="One Connected System. Built Around Your Business."
                text="Your business is the center. Every moving part around it should support conversion, operations, and scalable growth."
                centered
              />

              <div className={styles.systemCanvas}>
                <div className={styles.systemCenter}>
                  <strong>Your Business</strong>
                  <span>One operating layer for growth</span>
                </div>
                {systemNodes.map((item, index) => (
                  <article key={item.title} className={`${styles.systemNode} ${styles[`node${index + 1}`]}`}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.outcomesSection}>
            <div className="container">
              <SectionHeading
                eyebrow="Outcomes"
                title="What Changes After the System Is Built?"
                text="The goal is not more technology. The goal is better business outcomes."
                centered
              />

              <div className={styles.outcomeGrid}>
                {outcomeCards.map((item) => (
                  <article key={item.title} className={styles.outcomeCard}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.processSection} id="how-it-works">
            <div className="container">
              <SectionHeading
                eyebrow="How it works"
                title="We Don't Start With Technology. We Start With Your Business."
                text="The process is designed to uncover the real constraints first, then build the right system around them."
                centered
              />

              <div className={styles.timeline}>
                {processSteps.map((item) => (
                  <article key={item.step} className={styles.timelineStep}>
                    <div className={styles.timelineNumber}>{item.step}</div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.flowSection}>
            <div className="container">
              <SectionHeading
                eyebrow="Business flow"
                title="A connected system should move data, decisions, and revenue in one direction."
                text="This visual shows how traffic becomes customers, customers become data, and data becomes better business decisions."
                centered
              />

              <div className={styles.flowCard}>
                {businessFlow.map((item, index) => (
                  <div key={item} className={styles.flowItem}>
                    <span>{item}</span>
                    {index < businessFlow.length - 1 ? <i aria-hidden="true">↓</i> : null}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.ecommerceSection} id="ecommerce">
            <div className="container">
              <div className={styles.ecommerceGrid}>
                <div className={styles.ecommerceCopy}>
                  <SectionHeading
                    eyebrow="E-commerce use case"
                    title="For E-commerce Businesses, Your Website Should Do More Than Take Orders."
                    text="Imagine knowing exactly what's happening inside your business without manually checking five different platforms."
                  />

                  <div className={styles.ecommerceBulletGrid}>
                    {[
                      "Orders today",
                      "Revenue this month",
                      "Conversion rate",
                      "Abandoned carts",
                      "Returning customers",
                      "Best-selling products",
                      "Low stock products",
                      "Customer lifetime value",
                    ].map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <Link href="#strategy-call" className={styles.primaryLink}>
                    Build My E-commerce Growth System
                  </Link>
                </div>

                <div className={styles.ecommerceMockup}>
                  <div className={styles.mockupGlow} />
                  <div className={styles.mockupPanel}>
                    <div className={styles.panelHeader}>
                      <span className={styles.windowDots}>
                        <i />
                        <i />
                        <i />
                      </span>
                      <span>E-commerce dashboard</span>
                    </div>
                    <div className={styles.ecommerceStats}>
                      {ecommerceStats.map(([label, value]) => (
                        <div key={label} className={styles.statCard}>
                          <span>{label}</span>
                          <strong>{value}</strong>
                        </div>
                      ))}
                    </div>
                    <div className={styles.stockBars}>
                      <div>
                        <span>Revenue trend</span>
                        <i />
                      </div>
                      <div>
                        <span>Conversion trend</span>
                        <i />
                      </div>
                      <div>
                        <span>Stock alerts</span>
                        <i />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.automationSection}>
            <div className="container">
              <SectionHeading
                eyebrow="Automation"
                title="If Your Team Repeats It Every Day, It Should Probably Be Automated."
                text="We identify repetitive workflows and turn them into connected processes that save time and reduce operational errors."
                centered
              />

              <div className={styles.automationGrid}>
                <article className={styles.manualCard}>
                  <span>Manual Workflow</span>
                  {manualSteps.map((step, index) => (
                    <div key={step} className={styles.workflowStep}>
                      <strong>{index + 1}</strong>
                      <p>{step}</p>
                    </div>
                  ))}
                </article>

                <article className={styles.automationArrow}>
                  <div />
                  <span>Automate</span>
                  <div />
                </article>

                <article className={styles.automatedCard}>
                  <span>Automated Workflow</span>
                  {automatedSteps.map((step, index) => (
                    <div key={step} className={styles.workflowStep}>
                      <strong>{index + 1}</strong>
                      <p>{step}</p>
                    </div>
                  ))}
                </article>
              </div>
            </div>
          </section>

          <section className={styles.partnerSection}>
            <div className="container">
              <SectionHeading
                eyebrow="Why InfiniSoft"
                title="We're Not Looking to Become Another Vendor. We Want to Become Your Technology Growth Partner."
                text="1 Year Growth & Technical Support Included."
                centered
              />

              <div className={styles.principlesGrid}>
                {principles.map((item) => (
                  <article key={item.title} className={styles.principleCard}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.trustSection}>
            <div className="container">
              <SectionHeading
                eyebrow="Trust / authority"
                title="Built for Businesses That Take Growth Seriously"
                text="Use this area for real logos, selected work, industries, testimonials, and proof once you have it ready."
                centered
              />

              <div className={styles.trustGrid}>
                {trustBlocks.map((item) => (
                  <article key={item.title} className={styles.trustCard}>
                    <span>{item.title}</span>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.qualificationSection} id="system-audit">
            <div className="container">
              <SectionHeading
                eyebrow="Qualification"
                title="Is This Right for Your Business?"
                centered
              />

              <div className={styles.qualificationGrid}>
                <article className={styles.goodFitCard}>
                  <h3>This is for you if:</h3>
                  <ul>
                    {qualification.yes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className={styles.notFitCard}>
                  <h3>This probably isn't for you if:</h3>
                  <ul>
                    {qualification.no.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </section>

          <section className={styles.strategySection} id="strategy-call">
            <div className="container">
              <div className={styles.strategyCard}>
                <SectionHeading
                  eyebrow="Free strategy call"
                  title="Let's Find Out Where Technology Can Create the Most Leverage in Your Business."
                  text="Book a complimentary 30-minute Growth Strategy Call. We'll look at your current digital setup, identify bottlenecks, and discuss where better systems could increase sales or reduce operational workload."
                  centered
                />

                <div className={styles.strategyList}>
                  {[
                    "Business system assessment",
                    "Growth opportunities",
                    "Automation opportunities",
                    "Website & conversion review",
                    "No obligation",
                  ].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className={styles.strategyActions}>
                  <PopupWrapper buttonText="Book My Free Strategy Call" />
                  <Link href="#faq" className={styles.secondaryStrategyLink}>
                    Request a Free Audit
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.faqSection} id="faq">
            <div className="container">
              <SectionHeading
                eyebrow="FAQ"
                title="A few common questions"
                centered
              />

              <div className={styles.faqGrid}>
                {faqs.map((item) => (
                  <article key={item.question} className={styles.faqCard}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
