"use client";

const topRow = [
  {
    text:
      "Very professional process and attention to detail. The final website looked premium and was ready for clients immediately.",
    author: "Arefin Chowdhury",
    position: "Director, LiveSpace Bangladesh",
  },
  {
    text:
      "Beautifully redesigned our website to give a modern and aesthetic look. Now the website looks and performs better.",
    author: "831 Angels",
    position: "CEO",
  },
  {
    text:
      "InfiniSoft Technology built a fast, professional website with outstanding UI/UX design. Their expertise and attention to detail made all the difference. Highly recommended!",
    author: "Emagino (AI-first ad agency)",
    position: "Sana Choudary, CSO",
  },
  {
    text:
      "Rakib delivered exactly what we needed. Fast execution, clean design, and great communication from start to launch.",
    author: "Mahmud Hasan",
    position: "Founder, ThoseGuysPrint",
  },
  {
    text:
      "The landing page quality was excellent. Conversion-focused layout, strong visuals, and smooth performance across devices.",
    author: "Tania Rahman",
    position: "Marketing Lead, MAD Marketers",
  },
  {
    text:
      "Very professional process and attention to detail. The final website looked premium and was ready for clients immediately.",
    author: "Arefin Chowdhury",
    position: "Director, LiveSpace Bangladesh",
  },
];

const bottomRow = [
  {
    text:
      "Nice work. Very quickly completed the landing page. Also really liked the logo.",
    author: "HBS Nursing Care",
    position: "CEO",
  },
  {
    text:
      "Thank you so much for your help, you are incredibly understanding and very proactive. You displayed really amazing professionalism and the execution of your work is very impressive.",
    author: "Unity In Design Global Network",
    position: "Tare Isaac",
  },
  {
    text:
      "InfiniSoft exceeded our expectations in building our company website! Outstanding work, delivering a website that perfectly reflects our brand.",
    author: "Team Mahir",
    position: "Founder & CEO",
  },
  {
    text:
      "Nice work. Very quickly completed the landing page. Also really liked the logo.",
    author: "HBS Nursing Care",
    position: "CEO",
  },
  {
    text: "I appreciate their attention to details and timely execution.",
    author: "Hasibul Haque",
    position: "Business Owner & CEO",
  },
];

const topLoop = [...topRow, ...topRow];
const bottomLoop = [...bottomRow, ...bottomRow];

function TestimonialCard({ item }) {
  return (
    <article className="testimonials-film-card">
      <div className="testimonials-film-card-top">
        <span className="testimonials-film-quote">❞</span>
        <span className="testimonials-film-stars">★★★★★</span>
      </div>
      <p className="testimonials-film-copy">{item.text}</p>
      <footer className="testimonials-film-footer">
        <div className="testimonials-film-author">{item.author}</div>
        <div className="testimonials-film-role">{item.position}</div>
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
    </div>
  );
}
