"use client";

const topRow = [
  {
    text:
      "Very professional process and attention to detail. The final website looked premium and was ready for clients immediately.",
    author: "Arefin Chowdhury",
    position: "Director, LiveSpace Bangladesh",
    avatarSrc: "/assets/images/testimonials/avatar-arefin.svg",
  },
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
      "Rakib delivered exactly what we needed. Fast execution, clean design, and great communication from start to launch.",
    author: "Mahmud Hasan",
    position: "Founder, ThoseGuysPrint",
    avatarSrc: "/assets/images/testimonials/avatar-mahmud.svg",
  },
  {
    text:
      "The landing page quality was excellent. Conversion-focused layout, strong visuals, and smooth performance across devices.",
    author: "Tania Rahman",
    position: "Marketing Lead, MAD Marketers",
    avatarSrc: "/assets/images/testimonials/avatar-tania.svg",
  },
  {
    text:
      "Very professional process and attention to detail. The final website looked premium and was ready for clients immediately.",
    author: "Arefin Chowdhury",
    position: "Director, LiveSpace Bangladesh",
    avatarSrc: "/assets/images/testimonials/avatar-arefin.svg",
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
      "InfiniSoft exceeded our expectations in building our company website! Outstanding work, delivering a website that perfectly reflects our brand.",
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

const topLoop = [...topRow, ...topRow];
const bottomLoop = [...bottomRow, ...bottomRow];

function TestimonialCard({ item, featured = false }) {
  return (
    <article
      className={`testimonials-film-card${featured ? " is-featured" : ""}`}
    >
      <div className="testimonials-film-card-top">
        <span className="testimonials-film-quote">"</span>
        <span className="testimonials-film-stars">★★★★★</span>
      </div>
      <p className="testimonials-film-copy">{item.text}</p>
      <footer className="testimonials-film-footer">
        <div className="testimonials-film-identity">
          <img
            className="testimonials-film-avatar"
            src={item.avatarSrc}
            alt={item.author}
          />
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
      <div className="testimonials-film-shell">
        <div className="testimonials-film-header">
          <div className="testimonials-film-badge">TESTIMONIALS</div>
          <h2 className="testimonials-film-title">Client feedback in motion</h2>
        </div>

        <div className="testimonials-film-rows">
          <div className="testimonials-film-row testimonials-film-row-top">
            {topLoop.map((item, index) => (
              <TestimonialCard
                key={`top-${index}`}
                item={item}
                featured={index % 4 === 1}
              />
            ))}
          </div>

          <div className="testimonials-film-row testimonials-film-row-bottom">
            {bottomLoop.map((item, index) => (
              <TestimonialCard
                key={`bottom-${index}`}
                item={item}
                featured={index % 4 === 2}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
