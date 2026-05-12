import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello, I am <strong className="purple">Varshani Reddy</strong>.
            <br/>
            <br />I’m a software engineer driven by curiosity and a love for solving problems. I’m always looking for new challenges that push me to learn, think deeper, and grow.
            <br/>
            <br />I enjoy breaking down complex ideas, brainstorming creative solutions, and building things that can create meaningful real-world impact.
            <br/>
            <br />For me, every day is an opportunity to learn something new, improve my craft, and contribute in my own way to building a better world.
            <br/>
            <br />Apart from coding, some of my other interests are:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Formula 1
            </li>
            <li className="about-activity">
              <ImPointRight /> Cooking
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "#3da9fc" }}>
            "It's Not Over Until You Give Up"{" "}
          </p>
          <footer className="blockquote-footer">Varsha</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
