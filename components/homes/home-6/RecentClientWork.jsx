"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  Link as LinkIcon,
  Monitor,
  Palette,
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

const projects = [
  {
    number: "01",
    name: "HOMAM",
    type: "Skincare E-commerce",
    description:
      "A clean, conversion-focused storefront that helps customers discover authentic skincare products, understand what suits them, and shop with confidence.",
    image: "/assets/images/demo-fancy/homam-showcase.png",
    imageAlt: "Homam skincare store displayed on a laptop and mobile phone",
    website: "https://homam.shop",
    websiteLabel: "homam.shop",
    projectUrl: "/case-studies/homam",
    features: projectFeatures,
  },
  {
    number: "02",
    name: "OFFIZONEE",
    type: "Business Website",
    description:
      "A modern business website designed to present OffiZonee clearly, build trust faster, and support stronger conversion through a cleaner digital experience.",
    image: "/assets/portfolio/offizonee123.png",
    imageAlt: "OffiZonee business website displayed on a laptop",
    website: "https://offizonee.com",
    websiteLabel: "offizonee.com",
    projectUrl: "/portfolio",
    features: [
      { icon: BriefcaseBusiness, label: "Business Strategy" },
      { icon: Monitor, label: "Responsive Design" },
      { icon: Palette, label: "Clear Brand Story" },
      { icon: Zap, label: "Conversion Ready" },
    ],
  },
];

export default function RecentClientWork() {
  const [activeProject, setActiveProject] = useState(0);
  const project = projects[activeProject];

  function changeProject(direction) {
    setActiveProject((current) => (current + direction + projects.length) % projects.length);
  }

  return (
    <section className="recent-client-work" aria-labelledby="recent-client-work-title">
      <div className="container position-relative">
        <header className="recent-client-work-header">
          <span className="recent-client-work-kicker">Recent Client Work</span>
          <h2 id="recent-client-work-title">
            Digital experiences built
            <span>to build trust and convert.</span>
          </h2>
          <p>
            A selection of thoughtful digital products and websites designed to
            make ambitious businesses easier to discover and choose.
          </p>
        </header>

        <article className="recent-client-work-card" key={project.name}>
          <div className="recent-client-work-visual">
            <div className="recent-client-work-index">
              <strong>{project.number}</strong>
              <span aria-hidden="true">/</span>
              Featured Project
            </div>
            <Image
              src={project.image}
              width={1776}
              height={887}
              sizes="(max-width: 991px) 100vw, 61vw"
              alt={project.imageAlt}
              className="recent-client-work-image"
            />
          </div>

          <div className="recent-client-work-details">
            <div>
              <h3>{project.name}</h3>
              <p className="recent-client-work-type">{project.type}</p>
              <p className="recent-client-work-description">{project.description}</p>
            </div>

            <div className="recent-client-work-features">
              {project.features.map(({ icon: Icon, label }) => (
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
              <a href={project.website} target="_blank" rel="noopener noreferrer" className="recent-client-work-primary cta-glitter-button">
                View Live Website <ExternalLink size={18} aria-hidden="true" />
              </a>
              <a href={project.projectUrl} className="recent-client-work-secondary">
                Explore the project
              </a>
            </div>

            <a href={project.website} target="_blank" rel="noopener noreferrer" className="recent-client-work-url">
              <LinkIcon size={17} aria-hidden="true" /> {project.websiteLabel}
            </a>
          </div>
        </article>

        <div className="recent-client-work-controls" aria-label="Project slider controls">
          <button type="button" onClick={() => changeProject(-1)} aria-label="Previous project">
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <div className="recent-client-work-dots">
            {projects.map((item, index) => (
              <button
                type="button"
                key={item.name}
                className={index === activeProject ? "is-active" : ""}
                onClick={() => setActiveProject(index)}
                aria-label={`Show ${item.name} project`}
                aria-current={index === activeProject ? "true" : undefined}
              />
            ))}
          </div>
          <button type="button" onClick={() => changeProject(1)} aria-label="Next project">
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
