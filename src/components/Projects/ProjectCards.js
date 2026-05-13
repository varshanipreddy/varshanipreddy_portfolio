import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";

const DESC_PREVIEW_LEN = 158;

function truncateAtWord(text, max) {
  const t = text.trim();
  if (t.length <= max) return t;
  const slice = t.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > 48 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trim()}…`;
}

function ProjectCards({
  imgPath,
  title,
  description,
  techStack = [],
  ghLink,
  demoLink,
  isBlog,
  index = 0,
}) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = description.length > DESC_PREVIEW_LEN;
  const preview = truncateAtWord(description, DESC_PREVIEW_LEN);
  const showFull = expanded || !needsToggle;

  return (
    <article className="project-card-article">
      <Card
        className="project-card-view"
        style={{ "--project-stagger": `${index * 75}ms` }}
      >
        <div className="project-card-media">
          <Card.Img
            variant="top"
            src={imgPath}
            alt=""
            className="project-card-img"
            loading="lazy"
          />
          <div className="project-card-media-shade" aria-hidden />
          <a
            href={ghLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-media-link"
            aria-label={`${title} — open GitHub repository`}
            onClick={(e) => e.stopPropagation()}
          >
            <BsGithub aria-hidden />
            <span>Repo</span>
          </a>
        </div>

        <Card.Body className="project-card-body">
          <Card.Title className="project-card-title">{title}</Card.Title>

          <div className="project-card-desc-block">
            <p className={`project-card-desc ${showFull ? "project-card-desc--full" : ""}`}>
              {showFull ? description : preview}
            </p>
            {needsToggle ? (
              <button
                type="button"
                className="project-desc-toggle"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
              >
                <span>{expanded ? "Show less" : "Read more"}</span>
                <IoChevronDown
                  className="project-desc-toggle-icon"
                  aria-hidden
                  style={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
            ) : null}
          </div>

          {techStack.length > 0 ? (
            <div className="tech-stack">
              {techStack.map((tech) => (
                <span key={`${title}-${tech}`} className="tech-chip">
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          {!isBlog && demoLink ? (
            <div className="project-card-actions">
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-btn project-card-btn--demo"
              >
                <CgWebsite aria-hidden />
                Live demo
              </a>
            </div>
          ) : null}
        </Card.Body>
      </Card>
    </article>
  );
}

export default ProjectCards;
