import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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
          <Row className="align-items-center">
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Howdy!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                  {/* 🙏 */}
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> VARSHANI REDDY PATLOLLA</strong>
              </h1>

              <div className="home-role-slot">
                <Type />
              </div>
              <p className="home-hero-description">
                I build thoughtful technology solutions with a focus on performance, reliability, and real-world impact. I enjoy turning ambitious ideas into polished products, especially across cloud, data, and software systems.
              </p>
            </Col>
{/* 
            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col> */}

            <Col md={5} style={{ paddingBottom: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className="home-avatar">
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid"
                  style={{ maxHeight: "350px" }}
                />
              </div>
            </Col>


          </Row>
        </Container>
        <HomeLayers />
      </Container>
      {/* <Home2 /> */}
    </section>
  );
}

export default Home;



