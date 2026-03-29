"use client";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    text: "We understand your business, your website goals, and what the new site needs to accomplish.",
  },
  {
    number: "02",
    title: "Structure And Messaging",
    text: "We map the pages, content flow, and conversion journey so visitors know what to do next.",
  },
  {
    number: "03",
    title: "Design And Development",
    text: "We design the experience, build the website, and keep feedback loops short and practical.",
  },
  {
    number: "04",
    title: "Launch And Improve",
    text: "We help launch the site smoothly, review performance, and recommend the next refinements worth making.",
  },
];

export default function ProcessShowcase() {
  return (
    <section
      className="page-section home-process-section scrollSpysection"
      id="process"
    >
      <div className="container position-relative">
        <div className="row justify-content-center mb-30 mb-sm-20 text-center">
          <div className="col-lg-8 wow fadeInUp" data-wow-delay="0.08s">
            <h2 className="section-caption mb-15 mb-xs-10">Our Process</h2>
            <h3 className="section-title-small mb-18 home-process-title">
              The journey we guide clients through when building a website.
            </h3>
            <p className="home-process-intro mb-0 mx-auto">
              From the first strategy call to launch, we keep the website process clear,
              collaborative, and focused on trust, clarity, and conversion.
            </p>
          </div>
        </div>

        <div className="row g-2 justify-content-center">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="col-6 col-md-6 col-xl-3 d-flex wow fadeInUp"
              data-wow-delay={`${0.12 + index * 0.08}s`}
            >
              <article className="home-process-card w-100">
                <div className="home-process-card-line" />
                <div className="home-process-number">{step.number}</div>
                <h4 className="home-process-card-title">{step.title}</h4>
                <p className="home-process-card-text mb-0">{step.text}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
