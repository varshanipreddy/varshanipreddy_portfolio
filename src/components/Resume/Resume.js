import React from "react";
import { Container } from "react-bootstrap";

const CONTACT = {
  location: "Dallas, TX",
  email: "varshanipreddy@gmail.com",
  linkedin: "https://www.linkedin.com/in/varshanipreddy/",
  github: "https://github.com/varshanipreddy",
  leetcode: "https://leetcode.com/varshanipreddy/",
};

const EDUCATION = [
  {
    school: "Texas A&M University",
    campus: "College Station, TX",
    degree: "M.S., Computer Science",
    dates: "Aug 2022 — May 2024",
    detail:
      "Coursework: software engineering, operating systems, deep learning, parallel computing, analysis of algorithms, information storage & retrieval, software security, data mining, directed studies, and seminar.",
    honors: [
      "Scholarship for exceptional academic performance — Department of Computer Science & Engineering",
    ],
  },
  {
    school: "National Institute of Technology Raipur",
    campus: "Raipur, India",
    degree: "B.Tech, Computer Science & Engineering",
    dates: "Aug 2016 — Jun 2020",
    detail:
      "Coursework: data structures & algorithms, operating systems, DBMS, computer networks, OOP & software design, compiler design, AI/ML, parallel & distributed computing, cryptography, theory of computation, and discrete structures.",
  },
];

const EXPERIENCE = [
  {
    company: "Goldman Sachs",
    location: "Dallas, TX",
    role: "Software Engineer · Data",
    dates: "Sep 2024 — Present",
    bullets: [
      "Developed parallelized Python ingestion pipelines for streaming security telemetry (Prisma, Microsoft Graph, ServiceNow, and similar sources) into Kafka, with pagination, delivery callbacks, and DLQ retries to process billions of events in real time.",
      "Built a React app that injects synthetic events into Kafka for testing, speeding up detection query validation by about 60%.",
      "Designed and implemented a Spark-based SDLC framework in Python to deploy batch and streaming SQL detection queries on Kafka and S3 with jobs on YARN and Kubernetes—automating deployments and roughly doubling deployment speed.",
      "Built a Spark Structured Streaming ETL pipeline on YARN to ingest and normalize unstructured Kafka data with schema enforcement, de-duplication, and noise filtering—improving query reliability by about 30% and reducing false positives by about 20%.",
      "Migrated Splunk logs to Google BigQuery using Kafka and Logstash; automated lookup table sync from ECS to BigQuery—cutting manual effort by about 70%.",
    ],
  },
  {
    company: "Texas A&M University",
    location: "College Station, TX",
    role: "Software Engineer · High Performance Computing",
    dates: "Jun 2023 — May 2024",
    bullets: [
      "Analyzed CPU and memory usage in parallel batch workflows on HPC nodes using ps, free, meminfo, mvmcli, jobstats, and Grafana—reducing memory allocation by about 50% on MemVerge nodes.",
      "Compared CPU nodes with DRAM up to 3 TB and up to 96 cores; added data visualizations for real-time resource utilization.",
      "Managed university websites on Kentico CMS with access control, PBIs, and migrations in C#. Built Python automation on the Azure DevOps API, cutting manual work by about 40%.",
    ],
  },
  {
    company: "Huawei Technologies India Pvt. Ltd.",
    location: "Bengaluru, India",
    role: "Software Engineer · Data",
    dates: "Aug 2020 — Jul 2022",
    bullets: [
      "Used Python and SQL on Hive to analyze warehouse data; designed 15 data models with 2,000+ attributes for payment and account risk; engineered 50 features for a rule engine targeting fraudulent payments.",
      "Orchestrated ETL-style processes for predictive modeling in Hive and Spark at petabyte scale with preprocessing and feature engineering.",
      "Developed 15 predictive models with F1-scores above 0.91 using clustering, regression, tree ensembles, Random Forests, XGBoost, and related methods.",
      "Interpreted model drivers in Python and delivered Tableau dashboards for fraud analytics; improved model efficiency by about 20%.",
      "Stood up MLOps configuration and data sync workflows with 20+ production components; improved model development efficiency by over 60%.",
      "Built Selenium-based scraping and NLP/deep learning pipelines (tokenization, sentiment, CNNs/RNNs/transformers) for unstructured risk signals in text and images.",
    ],
  },
  {
    company: "Ittiam Systems Pvt. Ltd.",
    location: "Bengaluru, India",
    role: "Software Engineering Intern",
    dates: "May 2019 — Jul 2019",
    bullets: [
      "Developed a Python and C++ video processing library that cut analysis and preprocessing time by about 50%.",
      "Implemented Gaussian foreground/background separation for surveillance video (GMM segmentation, shadow removal in OpenCV)—reducing noise by about 15%.",
    ],
  },
];

const SKILL_GROUPS = [
  {
    label: "Languages & frameworks",
    items:
      "Python, SQL, Java, C#, JavaScript, TypeScript, React, Ruby on Rails, Flask, C++, HiveQL, Bash",
  },
  {
    label: "Data & platforms",
    items:
      "Apache Kafka, Apache Spark, YARN, Kubernetes, Apache Hive, Google BigQuery, Splunk, Logstash, Elasticsearch, Azure DevOps, Grafana, MemVerge, Kentico CMS",
  },
  {
    label: "ML & analytics",
    items:
      "Feature engineering, predictive modeling (XGBoost, Random Forest, ensembles), NLP & deep learning experimentation, Tableau, model diagnostics, ETL at scale, MLOps-style delivery",
  },
  {
    label: "Practices",
    items:
      "Agile collaboration, code review, detection/SDLC automation, technical documentation, cross-functional delivery",
  },
];

function Resume() {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="resume-page">
      <Container className="resume-page-inner px-3 px-md-4">
        <div className="resume-actions resume-no-print">
          <button type="button" className="resume-print-btn" onClick={handlePrint}>
            Print / Save as PDF
          </button>
          <p className="resume-print-hint">
            Use your browser print dialog — choose “Save as PDF” to download.
          </p>
        </div>

        <article className="resume-sheet" aria-label="Resume for Varshani Reddy Patlolla">
          <header className="resume-masthead">
            <h1 className="resume-name">Varshani Reddy Patlolla</h1>
            <p className="resume-headline">Software Engineer</p>
            <ul className="resume-contact-line">
              <li className="resume-contact-location">{CONTACT.location}</li>
              <li className="resume-contact-sep" aria-hidden>
                ·
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li className="resume-contact-sep" aria-hidden>
                ·
              </li>
              <li>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li className="resume-contact-sep" aria-hidden>
                ·
              </li>
              <li>
                <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li className="resume-contact-sep" aria-hidden>
                ·
              </li>
              <li>
                <a href={CONTACT.leetcode} target="_blank" rel="noopener noreferrer">
                  LeetCode
                </a>
              </li>
            </ul>
          </header>

          <section className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            <ul className="resume-edu-list">
              {EDUCATION.map((edu) => (
                <li key={edu.school} className="resume-edu-item">
                  <div className="resume-edu-row">
                    <div className="resume-edu-main">
                      <span className="resume-edu-school">{edu.school}</span>
                      <span className="resume-edu-campus">{edu.campus}</span>
                      <span className="resume-edu-degree">{edu.degree}</span>
                      {edu.honors?.length ? (
                        <ul className="resume-edu-honors">
                          {edu.honors.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : null}
                      {edu.detail ? (
                        <p className="resume-edu-detail">{edu.detail}</p>
                      ) : null}
                    </div>
                    <span className="resume-edu-dates">{edu.dates}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="resume-section">
            <h2 className="resume-section-title">Experience</h2>
            <ul className="resume-role-list">
              {EXPERIENCE.map((job) => (
                <li key={job.company + job.dates} className="resume-role">
                  <div className="resume-role-header">
                    <div className="resume-role-left">
                      <span className="resume-role-company">{job.company}</span>
                      {job.location ? (
                        <span className="resume-role-location">{job.location}</span>
                      ) : null}
                    </div>
                    <span className="resume-role-dates">{job.dates}</span>
                  </div>
                  <p className="resume-role-title">{job.role}</p>
                  <ul className="resume-bullets">
                    {job.bullets.map((b, idx) => (
                      <li key={`${job.company}-${idx}`}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className="resume-section resume-section--last">
            <h2 className="resume-section-title">Skills</h2>
            <dl className="resume-skills">
              {SKILL_GROUPS.map((g) => (
                <div key={g.label} className="resume-skill-row">
                  <dt>{g.label}</dt>
                  <dd>{g.items}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </Container>
    </div>
  );
}

export default Resume;
