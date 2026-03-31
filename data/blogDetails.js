export const blogDetails = [
  {
    id: 15,
    slug: "heavy-slow-website-to-lightning-fast-experience",
    category: "Case Study",
    readTime: "6 min read",
    title: "How We Turned a Heavy, Slow Website into a Lightning-Fast Experience",
    excerpt:
      "How we helped ThoseGuysPrint move from a slow, heavy WordPress experience to a fast, modern site without sacrificing visuals.",
    intro:
      "We recently worked with ThoseGuysPrint, a custom apparel brand that needed premium product visuals without the performance problems that were holding their WordPress site back.",
    image: "/assets/portfolio/tgp.png",
    author: "InfiniSoft Team",
    authorRole: "Product and Growth",
    authorImage: "/assets/images/logo.svg",
    date: "March 30",
    sections: [
      {
        heading: "The Challenge",
        paragraphs: [
          "ThoseGuysPrint wanted high-quality visuals to showcase their products, but their existing WordPress site could not handle the experience they were aiming for.",
          "The result was a frustrating mix of slow loading, weak communication, and a user experience that did not match the quality of the brand itself.",
        ],
        bullets: [
          "Slow loading speeds",
          "Heavy images affecting performance",
          "Poor user experience",
          "Messaging not clearly communicated",
        ],
      },
      {
        heading: "Where They Were Stuck",
        paragraphs: [
          "They were stuck in the tradeoff most businesses assume is unavoidable.",
          "Great visuals were hurting performance, and better performance seemed to require sacrificing the visual quality that helped sell the products.",
        ],
      },
      {
        heading: "What We Did",
        paragraphs: [
          "We rebuilt the website using Next.js so the team no longer had to choose between speed and presentation.",
          "Alongside the technical rebuild, we redesigned how the apparel was displayed so the experience felt cleaner, more engaging, and more conversion-focused.",
        ],
        bullets: [
          "High-quality visuals",
          "Lightning-fast performance",
          "Smooth, modern UX",
          "Clear product presentation",
          "Stronger communication of value",
        ],
      },
      {
        heading: "The Result",
        paragraphs: [
          "The finished website feels sharper, faster, and far more aligned with the brand ThoseGuysPrint wanted customers to see.",
        ],
        bullets: [
          "Fast-loading website even with rich visuals",
          "Strong first impression",
          "Better product showcase",
          "A site built for growth, not just looks",
        ],
      },
      {
        heading: "The Bigger Lesson",
        paragraphs: [
          "Most businesses think they have to choose between speed or visuals. That is not true.",
          "With the right technology and the right UX strategy, you can absolutely have both. If a website is slow because of heavy design, the real issue is usually not ambition. It is how the experience was built.",
        ],
      },
    ],
    quote:
      "With the right tech and UX strategy, you do not have to choose between speed and visuals.",
  },
  {
    id: 18,
    slug: "marketing-problem-or-conversion-problem",
    category: "Marketing",
    readTime: "6 min read",
    title:
      "Why Most Businesses Don't Have a Marketing Problem — They Have a Conversion Problem",
    excerpt:
      "Many businesses focus on getting more traffic, but the real revenue leak often starts after the click.",
    intro:
      "Most businesses believe their biggest challenge is getting traffic, so they invest in ads, social campaigns, and SEO. Traffic goes up, but revenue does not. That is where the real problem begins.",
    image: "/assets/images/blog/marketing-to-conversion/mar-to-conv-prob.png",
    author: "InfiniSoft Team",
    authorRole: "Growth and Conversion",
    authorImage: "/assets/images/logo.svg",
    date: "March 31",
    sections: [
      {
        heading: "The Hidden Problem: Traffic Without Conversion",
        paragraphs: [
          "You can run high-performing ads, generate thousands of clicks, and build strong brand awareness, but if your website fails to convert, you are simply burning money.",
          "The issue is not marketing alone. The issue is what happens after the click.",
        ],
      },
      {
        heading: "The Reality Most Businesses Ignore",
        paragraphs: [
          "Traffic plus poor UX leads to wasted budget.",
          "Visitors land on your website, but they do not understand what you offer, they do not know what to do next, and they do not trust your brand. So they leave.",
        ],
        bullets: ["No inquiries", "No sales", "No ROI"],
      },
      {
        heading: "Why Marketing Alone Doesn't Work",
        paragraphs: [
          "Marketing brings attention, but your website is what converts attention into action.",
          "Without a strong conversion system, even the best campaigns fail.",
          "A business can spend $1,000 to $5,000 on ads, get 10,000 or more visitors, and still convert less than 1%. That is not a traffic issue. It is a conversion failure.",
        ],
      },
      {
        heading: "What's Actually Killing Your Conversions",
        paragraphs: [
          "Most websites fail for the same set of reasons. The problem is rarely one thing in isolation. It is usually a chain of friction points working together.",
        ],
        bullets: [
          "Confusing user experience",
          "No clear direction or weak CTA",
          "Lack of trust",
          "Poor mobile experience",
          "Slow website performance",
        ],
      },
      {
        heading: "The Real Shift: Website as a Growth Engine",
        paragraphs: [
          "Most businesses treat their website like a digital brochure. That is a mistake.",
          "A high-performing website should guide users step by step, communicate value instantly, build trust within seconds, and drive specific actions.",
          "Think of it this way: your website is your 24/7 salesperson. If it fails, you lose customers every day.",
        ],
      },
      {
        heading: "Why UX Matters More Than You Think",
        paragraphs: [
          "User experience is not just about design. It is about psychology, behavior, and decision-making.",
          "A well-designed UX reduces confusion, increases trust, improves engagement, and boosts conversions.",
        ],
      },
      {
        heading: "The Cost of Ignoring UX",
        paragraphs: [
          "You are not just losing conversions. You are losing marketing ROI, customer trust, and brand credibility.",
          "If you spend $2,000 on ads, good UX at a 5% conversion rate can generate 100 leads, while poor UX at 1% generates only 20. That means 80 potential customers are lost because of the experience, not the campaign.",
        ],
      },
      {
        heading: "Fix What Happens After the Click",
        paragraphs: [
          "Instead of increasing your marketing budget, fix your conversion system first.",
        ],
        bullets: [
          "Clear messaging",
          "Structured layout",
          "Fast performance",
          "Trust-building elements",
          "Conversion-focused design",
        ],
      },
      {
        heading: "Final Thought",
        paragraphs: [
          "Marketing gets attention. UX turns attention into revenue.",
          "If your website is not converting, you do not need more traffic. You need a better experience.",
          "If your marketing is not giving results, do not just spend more. Fix what happens after the click.",
        ],
      },
    ],
    quote:
      "You do not need more traffic if the experience after the click is what is failing.",
  },
];

export const getBlogDetail = (slug) =>
  blogDetails.find((post) => post.slug === slug);

export const getNextBlogDetail = (slug) => {
  const currentIndex = blogDetails.findIndex(
    (post) => post.slug === slug
  );

  if (currentIndex === -1) return null;

  return blogDetails[(currentIndex + 1) % blogDetails.length];
};
