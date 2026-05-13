import React from "react";
import { Container } from "react-bootstrap";
import AwardsCards from "./AwardsCards";
import Particle from "../Particle";
import tamu from "../../Assets/Education/tamu.png";
import huawei from "../../Assets/Work/Huawei.png";

const AWARDS = [
  {
    variant: "huawei",
    imgPath: huawei,
    title: "Excellent Contributor Award",
    issuer: "Huawei Technologies India Pvt. Ltd.",
    description:
      "I am privileged and honored to have been presented with the Excellent Contributor Award at Huawei Technologies India Pvt. Ltd., a testament to my unwavering dedication and impactful contributions.",
  },
  {
    variant: "tamu",
    imgPath: tamu,
    title: "Scholarship for exceptional academic performance",
    issuer: "Texas A&M University · Department of Computer Science & Engineering",
    description:
      "Recognized for my outstanding academic performance, I was awarded a distinguished scholarship by the Department of Computer Science and Engineering at Texas A&M University. This esteemed honor serves as a testament to my dedication, commitment, and passion for the field.",
  },
  {
    variant: "huawei",
    imgPath: huawei,
    title: "Management Improvement Award",
    issuer: "Huawei Technologies India Pvt. Ltd.",
    description:
      "Secured the distinguished Management Improvement Award at Huawei Technologies India Pvt. Ltd. by skillfully orchestrating collaborative efforts among cross-functional teams, leading to the proficient resolution of complex DevOps challenges during model development and deployment.",
  },
];

function Awards() {
  return (
    <div className="awards-page">
      <div className="awards-page-bg" aria-hidden />
      <Container fluid className="awards-section">
        <Particle />
        <Container className="awards-inner px-3 px-md-4">
          <header className="awards-header awards-header--hero">
            <p className="awards-eyebrow">Recognition</p>
            <h1 className="awards-title">
              Awards &amp;{" "}
              <span className="awards-title-accent">honours</span>
            </h1>
            <p className="awards-lede">
              Highlights from industry and academia — scholarships and excellence awards
              that mean a lot on the journey.
            </p>
          </header>

          <div className="awards-list">
            {AWARDS.map((award, index) => (
              <AwardsCards key={award.title} {...award} index={index} />
            ))}
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default Awards;
