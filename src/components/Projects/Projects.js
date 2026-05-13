import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import crm from "../../Assets/Projects/crm.png";
import vote from "../../Assets/Projects/vote.png";
import chat from "../../Assets/Projects/chat.png";
import fridge from "../../Assets/Projects/fridge.png";
import genqus from "../../Assets/Projects/genq1.png"
import multiline from "../../Assets/Projects/multiline.png"
import mnist from "../../Assets/Projects/mnist.png"


function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Academic/Other <strong className="purple">Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          Presenting a selection of projects I have undertaken, excluding my work experience.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={fridge}
              isBlog={false}
              title="Fridge2Table"
              description="To enhance the personalized recipe recommendation system, we can incorporate a hybrid approach that combines content-based and collaborative filtering techniques. By leveraging user preferences, dietary restrictions, and available ingredients, the system can provide more accurate and diverse recipe suggestions. Additionally, implementing incremental learning and context-aware recommendations will ensure that the system stays up-to-date and offers timely and relevant recipes based on user interactions and situational context."
              techStack={["Python", "Flask", "React", "Firebase", "ML"]}
              ghLink="https://github.com/varshanipreddy/fridge2table"
              // demoLink=""
            />
          </Col>
          
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={genqus}
              isBlog={false}
              title="GenQus.ai"
              description="GenQus.ai  is designed to handle both question and answer generation from text inputs and question answering when provided with queries. Utilizing state-of-the-art Natural Language Processing (NLP) techniques and implemented in Python with Flask framework, our application offers a comprehensive solution for generarting questions and answers. This project harnesses the capabilities of the most advanced question generation AI, leveraging state-of-the-art transformer models such as T5, BERT, and OpenAI GPT-2."
              techStack={["Python", "Flask", "NLP", "Transformers", "GPT-2"]}
              ghLink="https://github.com/varshanipreddy/GenQus"
              // demoLink=""
            />
          </Col>


          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chat}
              isBlog={false}
              title="HealthBot"
              description="HealthBot is an innovative Android application that utilizes Machine Learning and Google DialogFlow to serve as a chatbot focused on detecting early-stage disability symptoms in children. Through interactive conversations, the app collects relevant information, analyzes it using ML algorithms, and provides valuable insights to caregivers and parents. This user-friendly tool aims to enhance early intervention and support, contributing to better healthcare outcomes for children."
              techStack={["Android", "Java", "DialogFlow", "ML"]}
              ghLink="https://github.com/varshanipreddy/HealthBot"
              // demoLink=""              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={vote}
              isBlog={false}
              title="Blockchain-Enabled Electronic Voting System"
              description="An innovative e-voting platform that combines Hyperledger Fabric, the IBM Blockchain Platform, and JavaScript. With the integration of IoT devices, it enhances security for e-polling and counting. The system guarantees tamper-proof voting and transparent electoral outcomes, ensuring a trustworthy and reliable e-voting experience."
              techStack={["Hyperledger", "JavaScript", "IoT", "Blockchain"]}
              ghLink="https://github.com/varshanipreddy/blockchain_enhanced_e_voting"
              // demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={crm}
              isBlog={false}
              title="FashioNXT-CRM-Service"
              description="FashioNXT CRM Service is a robust solution built on Ruby on Rails and PostgreSQL, catering to the needs of the FashioNXT agency. It offers a feature-rich CRM system encompassing event invites, website analytics, user access management, and efficient data handling. This comprehensive platform empowers the agency with streamlined operations and improved customer engagement, fostering growth and success in the fashion industry."
              techStack={["Ruby on Rails", "PostgreSQL", "JavaScript", "Bootstrap"]}
              ghLink="https://github.com/varshanipreddy/FashioNXT-CRM-Service"
              // demoLink=""
            />
          </Col>


          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={multiline}
              isBlog={false}
              title="Multi-Line Fitting"
              description="This Python project addresses the challenge of fitting points on a graph with multiple lines, aiming to find the optimal number of lines for accurate modeling. It acknowledges the complexity of determining the ideal number of lines beforehand and the triviality of using unlimited lines, which renders the problem meaningless. Inspired by the rod cutting problem, the solution aims to strike a balance between fitting the points well and maintaining simplicity in the model."
              techStack={["Python", "Data Analysis", "Graphing", "Optimization"]}
              ghLink="https://github.com/varshanipreddy/Multi_line_fitting/"
              // demoLink=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mnist}
              isBlog={false}
              title="Hybrid Autoencoder-Classifier for Noisy MNIST Digit Recognition"
              description="This project employs TensorFlow and Keras libraries to develop a hybrid model for recognizing handwritten digits from the MNIST dataset, particularly focusing on robustness against noise. It implements an autoencoder for denoising noisy input images and combines it with a classifier for digit recognition. The process involves preprocessing the data with added noise, training the model, and evaluating its performance. Additionally, early stopping and model checkpointing techniques are applied to ensure effective training and prevent overfitting."
              techStack={["TensorFlow", "Keras", "Python", "Computer Vision"]}
              ghLink="https://github.com/varshanipreddy/Noisy_MNIST"
              // demoLink=""
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
