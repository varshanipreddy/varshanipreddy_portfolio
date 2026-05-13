import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { WorkTechIcon } from "./workTechIcons";

const PREVIEW_BULLETS = 3;

function parseDelayMs(delayStr) {
  const n = parseInt(String(delayStr).replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function WorkCards(props) {
  const {
    imgPath,
    title,
    title2,
    title3,
    bullets = [],
    tags = [],
    animationDelay = "0ms",
    revealed = false,
    rowIndex = 0,
    anchorId,
  } = props;

  const [expanded, setExpanded] = useState(false);
  const hasMore = bullets.length > PREVIEW_BULLETS;
  const previewBullets = hasMore ? bullets.slice(0, PREVIEW_BULLETS) : bullets;
  const extraBullets = hasMore ? bullets.slice(PREVIEW_BULLETS) : [];
  const skillsList = props.skills ? props.skills.split(",") : [];

  return (
    <article
      id={anchorId || undefined}
      className={`work-exp-card ${revealed ? "work-exp-card--visible" : ""}`}
      style={{
        transitionDelay: revealed ? animationDelay : "0ms",
        "--work-card-row": rowIndex,
      }}
    >
      <div className="work-exp-card-shine" aria-hidden />
      <div className="work-exp-card-inner">
        <div className="work-exp-media">
          <div className="work-exp-logo-ring">
            <img src={imgPath} alt="" className="work-exp-logo" loading="lazy" />
          </div>
        </div>
        <div className="work-exp-content">
          <header className="work-exp-header">
            <h2 className="work-exp-company">{title}</h2>
            <p className="work-exp-role">{title2}</p>
            <p className="work-exp-dates">{title3}</p>
          </header>
          {Array.isArray(tags) && tags.length > 0 ? (
            <ul className="work-exp-tags" aria-label="Technologies and tools">
              {tags.map((t) => (
                <li key={t} className="work-exp-tag" title={t}>
                  <WorkTechIcon label={t} className="work-exp-tag-icon" />
                  <span className="work-exp-tag-text">{t}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {skillsList.length > 0 ? (
            <p className="work-exp-skills-fallback">{props.skills}</p>
          ) : null}
          {previewBullets.length > 0 ? (
            <ul className="work-exp-bullets">
              {previewBullets.map((line, idx) => {
                const staggerBase = parseDelayMs(animationDelay);
                const bulletDelay = revealed
                  ? `${staggerBase + 90 + idx * 60}ms`
                  : "0ms";
                return (
                <li
                  key={`p-${idx}-${line.slice(0, 48)}`}
                  className="work-exp-bullet"
                  style={{ animationDelay: bulletDelay }}
                >
                  {line}
                </li>
              );
              })}
            </ul>
          ) : null}
          {hasMore ? (
            <div
              className={`work-exp-more ${expanded ? "work-exp-more--open" : ""}`}
            >
              <div className="work-exp-more-inner">
                <ul className="work-exp-bullets work-exp-bullets--extra">
                  {extraBullets.map((line, idx) => (
                    <li
                      key={`e-${idx}-${line.slice(0, 48)}`}
                      className="work-exp-bullet work-exp-bullet--extra"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          {!previewBullets.length && props.description ? (
            <p className="work-exp-fallback-desc">{props.description}</p>
          ) : null}
          {hasMore ? (
            <button
              type="button"
              className={`work-exp-toggle ${expanded ? "work-exp-toggle--open" : ""}`}
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? (
                <>
                  <AiOutlineUp aria-hidden className="work-exp-toggle-icon" />
                  Show less
                </>
              ) : (
                <>
                  <AiOutlineDown aria-hidden className="work-exp-toggle-icon" />
                  Show all highlights ({bullets.length})
                </>
              )}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default WorkCards;
