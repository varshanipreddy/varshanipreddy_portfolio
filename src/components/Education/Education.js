import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EducationCard from "./EducationCards";
import nitrr from "../../Assets/Education/nitrr.png";
import tamu from "../../Assets/Education/tamu.png";

const COURSEWORK = [
  {
    id: "csce606-f22",
    school: "tamu",
    term: "Fall 2022 · College Station",
    code: "CSCE 606",
    name: "Software engineering",
    tags: ["Agile software development", "Scrum"],
  },
  {
    id: "csce611-f22",
    school: "tamu",
    term: "Fall 2022 · College Station",
    code: "CSCE 611",
    name: "Operating systems",
    tags: ["Multithreading", "Virtual memory"],
  },
  {
    id: "ecen758-f22",
    school: "tamu",
    term: "Fall 2022 · College Station",
    code: "ECEN 758",
    name: "Data mining & analysis",
    tags: ["Data cleaning", "Predictive modeling"],
  },
  {
    id: "csce629-s23",
    school: "tamu",
    term: "Spring 2023 · College Station",
    code: "CSCE 629",
    name: "Analysis of algorithms",
    tags: ["Time complexity", "Algorithm design"],
  },
  {
    id: "csce670-s23",
    school: "tamu",
    term: "Spring 2023 · College Station",
    code: "CSCE 670",
    name: "Information storage & retrieval",
    tags: ["Search engine optimisation", "Recommendation systems"],
  },
  {
    id: "csce681-s23",
    school: "tamu",
    term: "Spring 2023 · College Station",
    code: "CSCE 681",
    name: "Seminar",
    tags: ["Research talks", "Literature review"],
  },
  {
    id: "csce702-s23",
    school: "tamu",
    term: "Spring 2023 · College Station",
    code: "CSCE 702",
    name: "Law & policy in cybersecurity",
    tags: ["Privacy law", "Compliance frameworks"],
  },
  {
    id: "csce636-f23",
    school: "tamu",
    term: "Fall 2023 · College Station",
    code: "CSCE 636",
    name: "Deep learning",
    tags: ["Neural networks", "Backpropagation"],
  },
  {
    id: "csce689-f23",
    school: "tamu",
    term: "Fall 2023 · College Station",
    code: "CSCE 689",
    name: "Special topics — network security",
    tags: ["Firewalls", "VPNs"],
  },
  {
    id: "csce735-f23",
    school: "tamu",
    term: "Fall 2023 · College Station",
    code: "CSCE 735",
    name: "Parallel computing",
    tags: ["Cluster computing", "Distributed file systems"],
  },
  {
    id: "csce685-s24",
    school: "tamu",
    term: "Spring 2024 · College Station",
    code: "CSCE 685",
    name: "Directed studies",
    tags: ["Technical writing", "Milestone planning"],
  },
  {
    id: "csce713-s24",
    school: "tamu",
    term: "Spring 2024 · College Station",
    code: "CSCE 713",
    name: "Software security",
    tags: ["Buffer overflows", "Secure coding"],
  },
  {
    id: "nit-dsa",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Data structures & algorithms",
    tags: ["Data structures", "Algorithm complexity"],
  },
  {
    id: "nit-os",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Operating systems",
    tags: ["Shell scripting", "Process scheduling"],
  },
  {
    id: "nit-cn",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Computer networks",
    tags: ["TCP/IP", "Routing protocols"],
  },
  {
    id: "nit-dbms",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Database management systems",
    tags: ["SQL queries", "Normalization"],
  },
  {
    id: "nit-oop",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Object-oriented programming & software design",
    tags: ["Inheritance", "Design patterns"],
  },
  {
    id: "nit-coa",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Computer organization & architecture",
    tags: ["Instruction pipelines", "Cache memory"],
  },
  {
    id: "nit-toc",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Theory of computation",
    tags: ["Finite automata", "Regular languages"],
  },
  {
    id: "nit-compiler",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Compiler design",
    tags: ["Lexical analysis", "Parsing"],
  },
  {
    id: "nit-se",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Software engineering (undergraduate)",
    tags: ["Requirements", "System integration"],
  },
  {
    id: "nit-ai",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Artificial intelligence & machine learning fundamentals",
    tags: ["Heuristic search", "Supervised learning"],
  },
  {
    id: "nit-parallel",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Parallel & distributed computing",
    tags: ["Multithreading", "Message passing"],
  },
  {
    id: "nit-discrete",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Discrete structures for computer science",
    tags: ["Graph theory", "Combinatorics"],
  },
  {
    id: "nit-daa",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Design & analysis of algorithms",
    tags: ["Greedy algorithms", "Dynamic programming"],
  },
  {
    id: "nit-crypto",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Cryptography & information security",
    tags: ["Symmetric encryption", "Public-key cryptography"],
  },
  {
    id: "nit-web",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Web technologies & internet programming",
    tags: ["HTTP", "JavaScript"],
  },
  {
    id: "nit-testing",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Software testing & quality assurance",
    tags: ["Unit testing", "Regression testing"],
  },
  {
    id: "nit-dm",
    school: "nit",
    term: "B.Tech · NIT Raipur (CS & engineering)",
    name: "Data mining & knowledge discovery",
    tags: ["Clustering", "Association rules"],
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "tamu", label: "Texas A&M (M.S.)" },
  { id: "nit", label: "NIT Raipur (B.Tech)" },
];

function useRevealOnScroll(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Education() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [rootRef, rootVisible] = useRevealOnScroll(0.08);
  const degreesRef = useRef(null);
  const courseworkRef = useRef(null);

  const filteredBySchool = useMemo(
    () =>
      filter === "all"
        ? COURSEWORK
        : COURSEWORK.filter((c) => c.school === filter),
    [filter]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filteredBySchool;
    return filteredBySchool.filter((c) => {
      const inTags =
        Array.isArray(c.tags) &&
        c.tags.some((t) => t.toLowerCase().includes(q));
      return (
        c.name.toLowerCase().includes(q) ||
        (c.code && c.code.toLowerCase().includes(q)) ||
        (c.term && c.term.toLowerCase().includes(q)) ||
        inTags
      );
    });
  }, [filteredBySchool, query]);

  const scrollToSection = useCallback((ref) => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
      inline: "nearest",
    });
  }, []);

  return (
    <div ref={rootRef} className={`edu-page${rootVisible ? " edu-page--visible" : ""}`}>
      <div className="edu-page-bg" aria-hidden="true" />
      <Container fluid className="education-section edu-page-section">
        <Container className="edu-inner">
          <header className="edu-header">
            <h1 className="education-heading edu-title">
              <strong className="purple">Education</strong>
            </h1>
            <p className="edu-lead">
              M.S. in Computer Science from Texas A&amp;M; B.Tech in Computer
              Science and Engineering from NIT Raipur.
            </p>
          </header>

          <nav className="edu-jump" aria-label="On this page">
            <button
              type="button"
              className="edu-jump-btn"
              onClick={() => scrollToSection(degreesRef)}
            >
              Degrees
            </button>
            <button
              type="button"
              className="edu-jump-btn"
              onClick={() => scrollToSection(courseworkRef)}
            >
              Coursework
            </button>
          </nav>

          <section
            id="edu-section-degrees"
            className="edu-degrees edu-degrees--reveal"
            aria-labelledby="edu-degrees-heading"
          >
            <h2
              id="edu-degrees-heading"
              ref={degreesRef}
              className="edu-h2 edu-h2--scroll-target"
              tabIndex={-1}
            >
              Degrees
            </h2>
            <Row className="edu-degree-rows justify-content-center gx-3 gx-xl-4 gy-3">
              <Col xs={12} xl={6} lg={10} className="edu-degree-col mb-3 mb-xl-0">
                <EducationCard
                  accent="tamu"
                  imgPath={tamu}
                  title="Texas A&amp;M University, College Station"
                  title2="Master of Science in Computer Science"
                  description="August 2022 — May 2024"
                />
              </Col>
              <Col xs={12} xl={6} lg={10} className="edu-degree-col">
                <EducationCard
                  accent="nit"
                  imgPath={nitrr}
                  title="National Institute of Technology, Raipur"
                  title2="Bachelor of Technology in Computer Science and Engineering"
                  description="August 2016 — June 2020"
                />
              </Col>
            </Row>
          </section>

          <section
            id="edu-section-coursework"
            className="edu-coursework"
            aria-labelledby="edu-coursework-heading"
          >
            <h2
              id="edu-coursework-heading"
              ref={courseworkRef}
              className="edu-h2 edu-h2--scroll-target"
              tabIndex={-1}
            >
              Coursework
            </h2>
            <p className="edu-course-intro">
              Classes from the two degrees above. Texas A&amp;M: course code and
              semester. NIT Raipur: course name. Filter or search.
            </p>
            <label className="edu-search-wrap" htmlFor="edu-course-search">
              <span className="edu-search-label">Search</span>
              <input
                id="edu-course-search"
                type="search"
                className="edu-search-input"
                placeholder="e.g. security, ML, networks…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
            </label>
            <div
              className="edu-filters"
              role="tablist"
              aria-label="Filter coursework by program"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.id}
                  className={`edu-filter-btn${filter === f.id ? " is-active" : ""}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="edu-course-toolbar">
              <span className="edu-course-count">
                Showing <strong>{filtered.length}</strong> of {filteredBySchool.length}{" "}
                in view
                {filter !== "all" ? ` (${FILTERS.find((x) => x.id === filter)?.label})` : ""}
              </span>
            </div>
            <div className="edu-course-grid" role="list">
              {filtered.length === 0 ? (
                <p className="edu-course-empty" role="status">
                  No courses match that search. Try another keyword or clear the
                  search box.
                </p>
              ) : (
                filtered.map((c, idx) => {
                  return (
                    <article
                      key={c.id}
                      className="edu-course-card"
                      role="listitem"
                      style={{
                        transitionDelay: rootVisible
                          ? `${Math.min(idx, 10) * 40}ms`
                          : "0ms",
                      }}
                    >
                      <div className="edu-course-row">
                        {c.term ? (
                          <span className="edu-course-term">{c.term}</span>
                        ) : null}
                        <span className="edu-course-meta">
                          {c.code ? (
                            <span className="edu-course-code">{c.code}</span>
                          ) : null}
                          <span
                            className="edu-course-school-badge"
                            data-school={c.school}
                          >
                            {c.school === "tamu" ? "M.S." : "B.Tech"}
                          </span>
                        </span>
                        <span className="edu-course-name">{c.name}</span>
                        {Array.isArray(c.tags) && c.tags.length > 0 ? (
                          <span className="edu-course-tags">
                            {c.tags.map((t) => (
                              <span key={t} className="edu-course-tag">
                                {t}
                              </span>
                            ))}
                          </span>
                        ) : null}
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </section>
        </Container>
      </Container>
    </div>
  );
}

export default Education;
