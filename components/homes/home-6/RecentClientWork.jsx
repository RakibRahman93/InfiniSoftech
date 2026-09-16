import Image from "next/image";
import {
  ExternalLink,
  Link as LinkIcon,
  Search,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react";

const projectFeatures = [
  { icon: Search, label: "Product Discovery" },
  { icon: Smartphone, label: "Mobile Responsive" },
  { icon: ShieldCheck, label: "Trust-first UX" },
  { icon: Zap, label: "Fast Checkout" },
];

export default function RecentClientWork() {
  return (
    <section className="recent-client-work" aria-labelledby="recent-client-work-title">
      <div className="container position-relative">
        <header className="recent-client-work-header wow fadeInUp">
          <span className="recent-client-work-kicker">Recent Client Work</span>
          <h2 id="recent-client-work-title">
            A skincare shopping experience
            <span>designed to build trust and convert.</span>
          </h2>
          <p>
            A clean, conversion-focused storefront that helps customers discover
            authentic skincare products, understand what suits them, and shop
            with confidence.
          </p>
        </header>

        <article className="recent-client-work-card wow fadeInUp" data-wow-delay="0.08s">
          <div className="recent-client-work-visual">
            <div className="recent-client-work-index">
              <strong>01</strong>
              <span aria-hidden="true">/</span>
              Featured Project
            </div>
            <Image
              src="/assets/images/demo-fancy/homam-showcase.png"
              width={1776}
              height={887}
              sizes="(max-width: 991px) 100vw, 61vw"
              alt="Homam skincare store displayed on a laptop and mobile phone"
              className="recent-client-work-image"
            />
          </div>

          <div className="recent-client-work-details">
            <div>
              <h3>HOMAM</h3>
              <p className="recent-client-work-type">Skincare E-commerce</p>
              <p className="recent-client-work-description">
                A clean, conversion-focused storefront that helps customers
                discover authentic skincare products, understand what suits them,
                and shop with confidence.
              </p>
            </div>

            <div className="recent-client-work-features">
              {projectFeatures.map(({ icon: Icon, label }) => (
                <div className="recent-client-work-feature" key={label}>
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="recent-client-work-proof">
              <div>
                <ShieldCheck aria-hidden="true" />
                <span>Trust-first UX</span>
              </div>
              <div>
                <TrendingUp aria-hidden="true" />
                <span>Built for conversion</span>
              </div>
            </div>

            <div className="recent-client-work-actions">
              <a href="https://homam.shop" target="_blank" rel="noopener noreferrer" className="recent-client-work-primary cta-glitter-button">
                View Live Website <ExternalLink size={18} aria-hidden="true" />
              </a>
              <a href="/case-studies/homam" className="recent-client-work-secondary">
                Explore the project
              </a>
            </div>

            <a href="https://homam.shop" target="_blank" rel="noopener noreferrer" className="recent-client-work-url">
              <LinkIcon size={17} aria-hidden="true" /> homam.shop
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
