import React from "react";
import { Container } from "react-bootstrap";
import CertificationsSection from "../Certs/CertificationsSection";
import Particle from "../Particle";
import Techstack from "./Techstack";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function Skills() {
  return (
    <Container fluid className="skills-section">
      <div className="skills-section-bg" aria-hidden />
      <Particle />
      <Container className="skills-page-inner">
        <main className="skills-main">
          <header className="skills-page-head">
            <p className="skills-page-kicker">Skills & credentials</p>
            <h1 className="project-heading skills-page-title">
              What I <strong className="purple">ship with</strong>
            </h1>
            <p className="skills-intro">
              Browse stacks by category, search by name, then review certificates
              and courses below.
            </p>
            <nav className="skills-onpage-nav" aria-label="On this page">
              <ul className="skills-onpage-nav-list">
                <li>
                  <button
                    type="button"
                    className="skills-onpage-nav-btn"
                    onClick={() => scrollToSection("skills-inventory")}
                  >
                    Skill inventory
                  </button>
                </li>
                <li className="skills-onpage-nav-sep" aria-hidden>
                  ·
                </li>
                <li>
                  <button
                    type="button"
                    className="skills-onpage-nav-btn"
                    onClick={() => scrollToSection("skills-certificates")}
                  >
                    Certificates
                  </button>
                </li>
              </ul>
            </nav>
          </header>

          <div className="skills-page-stack">
            <section
              id="skills-inventory"
              className="skills-surface skills-inventory"
              aria-labelledby="skills-inventory-heading"
            >
              <h2 id="skills-inventory-heading" className="skills-section-eyebrow">
                Skill inventory
              </h2>
              <Techstack />
            </section>

            <section
              id="skills-certificates"
              className="skills-surface skills-certs-section"
              aria-labelledby="skills-certs-heading"
            >
              <h2
                id="skills-certs-heading"
                className="skills-section-eyebrow skills-certs-heading"
              >
                Certificates &amp; courses
              </h2>
              <CertificationsSection />
            </section>
          </div>
        </main>
      </Container>
    </Container>
  );
}

export default Skills;
