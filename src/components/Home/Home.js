import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import homeLogo from "../../Assets/p3.jpeg";
import Particle from "../Particle";
import Type from "./Type";
import HomeLayers from "./HomeLayers";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <header className="home-hero">
            <Row className="home-hero-row align-items-center gy-4 gy-lg-5">
              <Col md={7} className="home-hero-copy">
                <p className="home-hero-greeting">
                  <span className="home-hero-greeting-wave wave" role="img" aria-hidden>
                    👋🏻
                  </span>
                  Howdy — welcome to my portfolio
                </p>

                <h1 className="home-hero-title">
                  <span className="home-hero-title-intro">I&apos;m</span>
                  <span className="home-hero-title-name">Varshani Reddy Patlolla</span>
                </h1>

                <div className="home-role-slot home-hero-roles" aria-label="Professional roles">
                  <div className="home-hero-type">
                    <Type />
                  </div>
                </div>

                <p className="home-hero-description">
                  I build thoughtful technology solutions with a focus on performance,
                  reliability, and real-world impact. I enjoy turning ambitious ideas into
                  polished products — especially across cloud, data, and software systems.
                </p>

                <div className="home-hero-actions">
                  <Link className="home-hero-btn home-hero-btn--primary" to="/work">
                    Experience
                  </Link>
                  <Link className="home-hero-btn home-hero-btn--ghost" to="/education">
                    Education
                  </Link>
                </div>
              </Col>

              <Col
                md={5}
                className="home-hero-visual-col d-flex justify-content-center align-items-center"
              >
                <div className="home-hero-visual">
                  <div className="home-avatar">
                    <img src={homeLogo} alt="Varshani Reddy Patlolla" className="img-fluid" />
                  </div>
                </div>
              </Col>
            </Row>
          </header>
        </Container>
        <HomeLayers />
      </Container>
    </section>
  );
}

export default Home;
