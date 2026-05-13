import React, { useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import crm from "../../Assets/Projects/crm.png";
import vote from "../../Assets/Projects/vote.png";
import chat from "../../Assets/Projects/chat.png";
import fridge from "../../Assets/Projects/fridge.png";
import genqus from "../../Assets/Projects/genq1.png";
import multiline from "../../Assets/Projects/multiline.png";
import mnist from "../../Assets/Projects/mnist.png";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "ml", label: "ML & AI" },
  { id: "web", label: "Web & APIs" },
  { id: "mobile", label: "Mobile" },
  { id: "blockchain", label: "Blockchain" },
  { id: "data", label: "Data & research" },
];

const PROJECTS = [
  {
    filter: "web",
    imgPath: fridge,
    title: "Fridge2Table",
    description:
      "To enhance the personalized recipe recommendation system, we can incorporate a hybrid approach that combines content-based and collaborative filtering techniques. By leveraging user preferences, dietary restrictions, and available ingredients, the system can provide more accurate and diverse recipe suggestions. Additionally, implementing incremental learning and context-aware recommendations will ensure that the system stays up-to-date and offers timely and relevant recipes based on user interactions and situational context.",
    techStack: ["Python", "Flask", "React", "Firebase", "ML"],
    ghLink: "https://github.com/varshanipreddy/fridge2table",
  },
  {
    filter: "ml",
    imgPath: genqus,
    title: "GenQus.ai",
    description:
      "GenQus.ai is designed to handle both question and answer generation from text inputs and question answering when provided with queries. Utilizing state-of-the-art Natural Language Processing (NLP) techniques and implemented in Python with Flask framework, our application offers a comprehensive solution for generating questions and answers. This project harnesses the capabilities of advanced question generation AI, leveraging transformer models such as T5, BERT, and OpenAI GPT-2.",
    techStack: ["Python", "Flask", "NLP", "Transformers", "GPT-2"],
    ghLink: "https://github.com/varshanipreddy/GenQus",
  },
  {
    filter: "mobile",
    imgPath: chat,
    title: "HealthBot",
    description:
      "HealthBot is an innovative Android application that utilizes Machine Learning and Google DialogFlow to serve as a chatbot focused on detecting early-stage disability symptoms in children. Through interactive conversations, the app collects relevant information, analyzes it using ML algorithms, and provides valuable insights to caregivers and parents. This user-friendly tool aims to enhance early intervention and support, contributing to better healthcare outcomes for children.",
    techStack: ["Android", "Java", "DialogFlow", "ML"],
    ghLink: "https://github.com/varshanipreddy/HealthBot",
  },
  {
    filter: "blockchain",
    imgPath: vote,
    title: "Blockchain-Enabled Electronic Voting System",
    description:
      "An innovative e-voting platform that combines Hyperledger Fabric, the IBM Blockchain Platform, and JavaScript. With the integration of IoT devices, it enhances security for e-polling and counting. The system guarantees tamper-proof voting and transparent electoral outcomes, ensuring a trustworthy and reliable e-voting experience.",
    techStack: ["Hyperledger", "JavaScript", "IoT", "Blockchain"],
    ghLink: "https://github.com/varshanipreddy/blockchain_enhanced_e_voting",
  },
  {
    filter: "web",
    imgPath: crm,
    title: "FashioNXT-CRM-Service",
    description:
      "FashioNXT CRM Service is a robust solution built on Ruby on Rails and PostgreSQL, catering to the needs of the FashioNXT agency. It offers a feature-rich CRM system encompassing event invites, website analytics, user access management, and efficient data handling. This comprehensive platform empowers the agency with streamlined operations and improved customer engagement, fostering growth and success in the fashion industry.",
    techStack: ["Ruby on Rails", "PostgreSQL", "JavaScript", "Bootstrap"],
    ghLink: "https://github.com/varshanipreddy/FashioNXT-CRM-Service",
  },
  {
    filter: "data",
    imgPath: multiline,
    title: "Multi-Line Fitting",
    description:
      "This Python project addresses the challenge of fitting points on a graph with multiple lines, aiming to find the optimal number of lines for accurate modeling. It acknowledges the complexity of determining the ideal number of lines beforehand and the triviality of using unlimited lines, which renders the problem meaningless. Inspired by the rod cutting problem, the solution aims to strike a balance between fitting the points well and maintaining simplicity in the model.",
    techStack: ["Python", "Data Analysis", "Graphing", "Optimization"],
    ghLink: "https://github.com/varshanipreddy/Multi_line_fitting/",
  },
  {
    filter: "ml",
    imgPath: mnist,
    title: "Hybrid Autoencoder-Classifier for Noisy MNIST Digit Recognition",
    description:
      "This project employs TensorFlow and Keras libraries to develop a hybrid model for recognizing handwritten digits from the MNIST dataset, particularly focusing on robustness against noise. It implements an autoencoder for denoising noisy input images and combines it with a classifier for digit recognition. The process involves preprocessing the data with added noise, training the model, and evaluating its performance. Additionally, early stopping and model checkpointing techniques are applied to ensure effective training and prevent overfitting.",
    techStack: ["TensorFlow", "Keras", "Python", "Computer Vision"],
    ghLink: "https://github.com/varshanipreddy/Noisy_MNIST",
  },
];

function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visible = useMemo(() => {
    if (activeFilter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.filter === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(() => {
    const c = { all: PROJECTS.length };
    PROJECTS.forEach((p) => {
      c[p.filter] = (c[p.filter] || 0) + 1;
    });
    return c;
  }, []);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container className="projects-page-inner px-3 px-md-4">
        <header className="projects-page-header projects-page-header--hero">
          <p className="projects-eyebrow">Selected work</p>
          <h1 className="projects-page-title">
            Academic &amp; personal <span className="projects-page-title-accent">projects</span>
          </h1>
          <p className="projects-intro">
            Things I&apos;ve built outside of day-job roles — research, coursework, and experiments
            in ML, web, mobile, and systems.
          </p>
        </header>

        <div
          className="projects-toolbar"
          role="toolbar"
          aria-label="Filter projects by category"
        >
          {FILTERS.map(({ id, label }) => {
            const count = id === "all" ? counts.all : counts[id] || 0;
            const isActive = activeFilter === id;
            return (
              <button
                key={id}
                type="button"
                className={`projects-filter-chip${isActive ? " projects-filter-chip--active" : ""}`}
                onClick={() => setActiveFilter(id)}
                aria-pressed={isActive}
                disabled={count === 0 && id !== "all"}
              >
                {label}
                <span className="projects-filter-chip-count">{count}</span>
              </button>
            );
          })}
        </div>

        <Row className="projects-grid gx-4 gy-4">
          {visible.map(
            (
              { imgPath, title, description, techStack, ghLink, demoLink },
              index
            ) => (
              <Col key={title} xs={12} md={6} xl={4} className="project-card-col">
                <ProjectCard
                  imgPath={imgPath}
                  title={title}
                  description={description}
                  techStack={techStack}
                  ghLink={ghLink}
                  demoLink={demoLink}
                  isBlog={false}
                  index={index}
                />
              </Col>
            )
          )}
        </Row>

        {visible.length === 0 ? (
          <p className="projects-empty">Nothing in this category yet — try another filter.</p>
        ) : null}
      </Container>
    </Container>
  );
}

export default Projects;
