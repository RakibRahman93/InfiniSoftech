"use client";

const topRow = [
  {
    text:
      "Beautifully redesigned our website to give a modern and aesthetic look. Now the website looks and performs better.",
    author: "831 Angels",
    position: "CEO",
    avatarSrc: "/assets/images/testimonials/avatar-angels.svg",
  },
  {
    text:
      "InfiniSoft Technology built a fast, professional website with outstanding UI/UX design. Their expertise and attention to detail made all the difference. Highly recommended!",
    author: "Emagino (AI-first ad agency)",
    position: "Sana Choudary, CSO",
    avatarSrc: "/assets/images/testimonials/avatar-emagino.svg",
  },
  {
    text:
      "InfiniSoft delivered exactly what we needed. Fast execution, clean design, and great communication from start to launch.",
    author: "Steve & Dave",
    position: "Founders, Those Guys Print",
    avatarSrc: "/assets/images/testimonials/avatar-mahmud.svg",
  },
];

const bottomRow = [
  {
    text:
      "Nice work. Very quickly completed the landing page. Also really liked the logo.",
    author: "HBS Nursing Care",
    position: "CEO",
    avatarSrc: "/assets/images/testimonials/avatar-hbs.svg",
  },
  {
    text:
      "Thank you so much for your help, you are incredibly understanding and very proactive. You displayed really amazing professionalism and the execution of your work is very impressive.",
    author: "Unity In Design Global Network",
    position: "Tare Isaac",
    avatarSrc: "/assets/images/testimonials/avatar-unity.svg",
  },
  {
    text:
      "InfiniSoft exceeded our expectations in building our company website. Outstanding work, delivering a website that perfectly reflects our brand.",
    author: "Team Mahir",
    position: "Founder & CEO",
    avatarSrc: "/assets/images/testimonials/avatar-mahir.svg",
  },
  {
    text:
      "Nice work. Very quickly completed the landing page. Also really liked the logo.",
    author: "HBS Nursing Care",
    position: "CEO",
    avatarSrc: "/assets/images/testimonials/avatar-hbs.svg",
  },
  {
    text: "I appreciate their attention to details and timely execution.",
    author: "Hasibul Haque",
    position: "Business Owner & CEO",
    avatarSrc: "/assets/images/testimonials/avatar-hasibul.svg",
  },
];

const topLoop = [...topRow, ...topRow, ...topRow, ...topRow];
const bottomLoop = [...bottomRow, ...bottomRow, ...bottomRow];

function TestimonialCard({ item }) {
  return (
    <article className="testimonials-film-card">
      <div className="testimonials-film-card-top">
        <span className="testimonials-film-quote">&quot;</span>
        <span className="testimonials-film-stars">{"\u2605\u2605\u2605\u2605\u2605"}</span>
      </div>
      <p className="testimonials-film-copy">{item.text}</p>
      <footer className="testimonials-film-footer">
        <div className="testimonials-film-identity">
          <div className="testimonials-film-meta">
            <div className="testimonials-film-author">{item.author}</div>
            <div className="testimonials-film-role">{item.position}</div>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default function Testimonials() {
  return (
    <div className="container-fluid px-0">
      <div className="testimonials-film-shell testimonials-film-shell--brand">
        <div
          className="testimonials-film-header wow fadeInUp"
          data-wow-delay="0.08s"
        >
          <div className="testimonials-film-badge">TESTIMONIALS</div>
          <h2 className="testimonials-film-title">Feedback From Clients</h2>
        </div>

        <div className="testimonials-film-rows">
          <div className="testimonials-film-row testimonials-film-row-top">
            {topLoop.map((item, index) => (
              <TestimonialCard key={`top-${index}`} item={item} />
            ))}
          </div>

          <div className="testimonials-film-row testimonials-film-row-bottom">
            {bottomLoop.map((item, index) => (
              <TestimonialCard key={`bottom-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .testimonials-film-shell--brand {
          position: relative;
          background:
            radial-gradient(circle at 12% 18%, rgba(231, 87, 120, 0.14), transparent 26%),
            radial-gradient(circle at 88% 18%, rgba(136, 118, 255, 0.16), transparent 28%),
            linear-gradient(180deg, #1b1b2f 0%, #201f39 52%, #1c1b2f 100%);
        }

        .testimonials-film-shell--brand .testimonials-film-badge {
          color: #f067a2;
          letter-spacing: 0.08em;
        }

        .testimonials-film-shell--brand .testimonials-film-title {
          background: linear-gradient(
            90deg,
            #f8f3ff 0%,
            #efe4ff 34%,
            #d7b9ff 68%,
            #a68eff 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .testimonials-film-shell--brand .testimonials-film-rows::before {
          background: linear-gradient(
            90deg,
            rgba(28, 27, 47, 0.98) 0%,
            rgba(28, 27, 47, 0) 100%
          );
        }

        .testimonials-film-shell--brand .testimonials-film-rows::after {
          background: linear-gradient(
            270deg,
            rgba(28, 27, 47, 0.98) 0%,
            rgba(28, 27, 47, 0) 100%
          );
        }

        .testimonials-film-shell--brand .testimonials-film-card,
        .testimonials-film-shell--brand .testimonials-film-card.is-featured {
          border: 1px solid rgba(144, 116, 255, 0.18);
          background:
            radial-gradient(circle at top right, rgba(136, 118, 255, 0.1), transparent 36%),
            radial-gradient(circle at bottom left, rgba(231, 87, 120, 0.08), transparent 34%),
            linear-gradient(180deg, rgba(42, 31, 73, 0.94) 0%, rgba(28, 24, 55, 0.98) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 18px 40px rgba(14, 11, 31, 0.24);
        }

        .testimonials-film-shell--brand .testimonials-film-card::before {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.16) 0%,
            rgba(255, 255, 255, 0.02) 100%
          );
        }

        .testimonials-film-shell--brand .testimonials-film-card::after {
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.04) 0%,
              rgba(255, 255, 255, 0.015) 26%,
              rgba(255, 255, 255, 0) 56%,
              rgba(255, 255, 255, 0.03) 100%
            );
        }

        .testimonials-film-shell--brand .testimonials-film-quote {
          color: rgba(223, 200, 255, 0.42);
        }

        .testimonials-film-shell--brand .testimonials-film-stars {
          color: #ffc94a;
          text-shadow: 0 3px 12px rgba(255, 201, 74, 0.18);
        }

        .testimonials-film-shell--brand .testimonials-film-copy {
          color: rgba(246, 240, 255, 0.78);
        }

        .testimonials-film-shell--brand .testimonials-film-author {
          color: #ffffff;
        }

        .testimonials-film-shell--brand .testimonials-film-role {
          color: rgba(203, 183, 255, 0.72);
        }

        @media (hover: hover) and (pointer: fine) {
          .testimonials-film-shell--brand .testimonials-film-card:hover {
            transform: translateY(-6px);
            border-color: rgba(177, 146, 255, 0.3);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.06),
              0 26px 60px rgba(18, 12, 39, 0.3);
          }
        }
      `}</style>
    </div>
  );
}
