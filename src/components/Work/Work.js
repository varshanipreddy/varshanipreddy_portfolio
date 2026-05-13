import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import WorkCard from "./WorkCards";
import huawei from "../../Assets/Work/Huawei.png";
import ittiam from "../../Assets/Work/ittiam.png";
import tamu from "../../Assets/Work/tamu.png";
import goldman from "../../Assets/Work/Goldman_Sachs.png";

const EXPERIENCES = [
  {
    key: "gs",
    imgPath: goldman,
    title: "Goldman Sachs",
    title2: "Software Engineer · Data",
    title3: "September 2024 — Present",
    tags: [
      "Python",
      "Kafka",
      "React",
      "Spark",
      "YARN",
      "Kubernetes",
      "BigQuery",
      "Splunk",
    ],
    bullets: [
      "Developed parallelized data ingestion pipelines in Python for streaming security telemetry (Prisma, Microsoft Graph, ServiceNow, and similar sources) via API endpoints into Kafka, with pagination, delivery callbacks, and DLQ retries to reliably process billions of events in real time.",
      "Developed a React app that injects synthetic events into Kafka for testing, speeding up detection query validation by about 60%.",
      "Designed and implemented a Spark-based SDLC framework in Python to deploy batch and streaming SQL detection queries on Kafka and S3, with jobs on YARN and Kubernetes—automating detection deployments and roughly doubling deployment speed.",
      "Built a Spark Structured Streaming ETL pipeline on YARN to ingest and normalize unstructured data from Kafka, with schema enforcement, de-duplication, and noise filtering—improving query reliability by about 30% and reducing false positives by about 20%.",
      "Migrated Splunk logs to Google BigQuery using Kafka and Logstash, and built a framework to automate lookup table sync from ECS to BigQuery—cutting manual effort by about 70% and keeping deployments consistent.",
    ],
  },
  {
    key: "tamu",
    imgPath: tamu,
    title: "Texas A&M University",
    title2: "Software Engineer · High Performance Computing",
    title3: "June 2023 — May 2024",
    tags: [
      "HPC",
      "Grafana",
      "MemVerge",
      "Kentico",
      "C#",
      "Azure DevOps",
      "Python",
    ],
    bullets: [
      "Analyzed CPU and memory usage in parallel batch workflows on HPC nodes using ps, free, meminfo, mvmcli, jobstats, and Grafana—reducing memory allocation by about 50% on MemVerge nodes.",
      "Reduced DRAM bottlenecks by comparing CPU nodes with DRAM up to 3 TB and up to 96 cores; added data visualizations for real-time resource utilization to shorten future analysis cycles.",
      "Managed university websites on Kentico CMS with access control, PBIs, and migrations in C#. Built Python automation on the Azure DevOps API, cutting manual work by about 40%.",
    ],
  },
  {
    key: "huawei",
    imgPath: huawei,
    title: "Huawei Technologies India Pvt. Ltd.",
    title2: "Software Engineer · Data",
    title3: "August 2020 — July 2022",
    tags: [
      "Python",
      "SQL",
      "Hive",
      "Spark",
      "Tableau",
      "ML",
      "MLOps",
    ],
    bullets: [
      "Used Python and SQL on Hive to analyze warehouse data and designed 15 data models with over 2,000 attributes for payment and account risk detection; engineered 50 distinct features for a rule engine to catch fraudulent payments.",
      "Orchestrated hundreds of ETL-style processes for predictive modeling in Hive and Spark at petabyte scale (Airflow-like tooling), with preprocessing and cleaning for feature engineering and statistical mining to lift model performance.",
      "Developed 15 predictive models with F1-scores above 0.91 for payment and account risk, using clustering, regression, tree ensembles, Random Forests, XGBoost, and other ensemble methods.",
      "Used Python visualization libraries to interpret model predictions and drivers for payment risk—raising model efficiency by about 20%—and added Tableau dashboards for fraud analytics stakeholders.",
      "Partnered across functions to stand up MLOps configuration and data sync workflows, improving model development efficiency by over 60%; delivered 20+ components to operate production services.",
      "Built web scraping with Selenium and Python for unstructured data; applied deep learning and NLP (tokenization, POS tagging, sentiment, RNNs, CNNs, transformers) to flag risky content in images and text.",
    ],
  },
  {
    key: "ittiam",
    imgPath: ittiam,
    title: "Ittiam Systems Pvt. Ltd.",
    title2: "Software Engineering Intern",
    title3: "May 2019 — July 2019",
    tags: ["Python", "C++", "OpenCV", "Computer vision"],
    bullets: [
      "Developed a Python and C++ video processing library that cut analysis and preprocessing time by about 50%.",
      "Implemented multi-model Gaussian foreground and background separation for surveillance video—histograms, GMM segmentation, and shadow removal in OpenCV—reducing noise by about 15%.",
    ],
  },
];

function useRevealOnce(threshold = 0.2, rootMargin = "0px 0px -5% 0px") {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return [ref, visible];
}

function scrollToRole(anchorId) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(anchorId);
  if (!el) return;
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "center",
  });
}

function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}

function useTimelineLineDrawn(timelineRef) {
  const [lineDrawn, setLineDrawn] = useState(false);
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setLineDrawn(true);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [timelineRef]);
  return lineDrawn;
}

function useTimelineSpineAndActive(timelineRef, lineDrawn, count) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [spineProgress, setSpineProgress] = useState(0);
  const rafRef = useRef(0);

  const tick = useCallback(() => {
    const root = timelineRef.current;
    if (!root || count < 1) return;

    const items = root.querySelectorAll(".work-timeline-item");
    if (!items.length) return;

    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const focusY = vh * 0.42;
    const bandTop = vh * 0.32;
    const bandBot = vh * 0.55;

    let bestIdx = 0;
    let bestOverlap = -1;
    items.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const overlap = Math.max(
        0,
        Math.min(r.bottom, bandBot) - Math.max(r.top, bandTop)
      );
      if (overlap > bestOverlap) {
        bestOverlap = overlap;
        bestIdx = i;
      }
    });

    if (bestOverlap < 8) {
      let bestDist = Infinity;
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const cy = r.top + r.height * 0.38;
        const d = Math.abs(cy - focusY);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      });
    }

    setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));

    const first = items[0].getBoundingClientRect();
    const last = items[items.length - 1].getBoundingClientRect();
    const span = last.bottom - first.top;
    let nextP = 0;
    if (span > 24) {
      nextP = clamp01((focusY - first.top) / span);
    }
    setSpineProgress((prev) =>
      Math.abs(prev - nextP) < 0.008 ? prev : nextP
    );
  }, [timelineRef, count]);

  useLayoutEffect(() => {
    if (!lineDrawn) return undefined;
    const run = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    run();
    window.addEventListener("scroll", run, { passive: true });
    window.addEventListener("resize", run);
    return () => {
      window.removeEventListener("scroll", run);
      window.removeEventListener("resize", run);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lineDrawn, tick]);

  return { activeIndex, spineProgress };
}

function TimelineRow({
  index,
  job,
  isLast,
  isActive,
  stepNumber,
  lastIdx,
  dotBtnRefs,
}) {
  const [ref, rowVisible] = useRevealOnce(0.08, "0px 0px -8% 0px");
  const anchorId = `work-role-${job.key}`;
  const [pulse, setPulse] = useState(false);
  const pulseTimer = useRef(0);

  const onDotActivate = useCallback(() => {
    scrollToRole(anchorId);
  }, [anchorId]);

  const onDotClick = useCallback(() => {
    onDotActivate();
    setPulse(true);
    if (pulseTimer.current) window.clearTimeout(pulseTimer.current);
    pulseTimer.current = window.setTimeout(() => setPulse(false), 700);
  }, [onDotActivate]);

  useEffect(() => {
    return () => {
      if (pulseTimer.current) window.clearTimeout(pulseTimer.current);
    };
  }, []);

  const onDotKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowDown" && index < lastIdx) {
        e.preventDefault();
        dotBtnRefs.current[index + 1]?.focus();
      } else if (e.key === "ArrowUp" && index > 0) {
        e.preventDefault();
        dotBtnRefs.current[index - 1]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        dotBtnRefs.current[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        dotBtnRefs.current[lastIdx]?.focus();
      }
    },
    [index, lastIdx, dotBtnRefs]
  );

  const tipTitle =
    job.title.length > 28 ? `${job.title.slice(0, 26)}…` : job.title;

  return (
    <div
      ref={ref}
      className={`work-timeline-item ${rowVisible ? "work-timeline-item--visible" : ""} ${isActive ? "work-timeline-item--active" : ""}`}
      style={{ "--work-row-index": index }}
    >
      <div className="work-timeline-track">
        <span className="work-timeline-step-badge" aria-hidden>
          {String(stepNumber).padStart(2, "0")}
        </span>
        <button
          type="button"
          ref={(el) => {
            dotBtnRefs.current[index] = el;
          }}
          className={`work-timeline-dot-btn ${pulse ? "work-timeline-dot-btn--pulse" : ""}`}
          aria-label={`${job.title}. ${job.title3}. Activate to scroll to details. Use arrow keys to move between roles, Home and End for ends.`}
          aria-current={isActive ? "step" : undefined}
          aria-controls={anchorId}
          onClick={onDotClick}
          onKeyDown={onDotKeyDown}
        >
          <span className="work-timeline-dot-tip" aria-hidden>
            <span className="work-timeline-dot-tip-title">{tipTitle}</span>
            <span className="work-timeline-dot-tip-dates">{job.title3}</span>
          </span>
          <span className="work-timeline-dot" aria-hidden />
        </button>
        {!isLast ? (
          <div className="work-timeline-connector" aria-hidden>
            <span className="work-timeline-connector-flow" aria-hidden />
          </div>
        ) : null}
      </div>
      <div className="work-timeline-card-wrap">
        <WorkCard
          imgPath={job.imgPath}
          title={job.title}
          title2={job.title2}
          title3={job.title3}
          bullets={job.bullets}
          tags={job.tags}
          revealed={rowVisible}
          animationDelay={`${index * 95}ms`}
          rowIndex={index}
          anchorId={anchorId}
        />
      </div>
    </div>
  );
}

function Work() {
  const [headRef, headVisible] = useRevealOnce(0.25, "0px 0px 0px 0px");
  const timelineRef = useRef(null);
  const lineDrawn = useTimelineLineDrawn(timelineRef);
  const lastIdx = EXPERIENCES.length - 1;
  const dotBtnRefs = useRef([]);

  const { activeIndex, spineProgress } = useTimelineSpineAndActive(
    timelineRef,
    lineDrawn,
    EXPERIENCES.length
  );

  return (
    <Container fluid className="work-section">
      <Particle />
      <Container>
        <header
          ref={headRef}
          className={`work-page-head ${headVisible ? "work-page-head--visible" : ""}`}
        >
          <h1 className="project-heading work-page-title">
            Work <strong className="purple">experience</strong>
          </h1>
          <p className="work-page-lead">
            Worked on building and improving production-grade software and data systems.
          </p>
        </header>

        <Row className="justify-content-center work-timeline-row-wrap">
          <Col lg={10} md={11}>
            <nav
              className={`work-timeline ${lineDrawn ? "work-timeline--line-drawn" : ""}`}
              ref={timelineRef}
              aria-label="Work history timeline"
              style={{
                "--work-spine-progress": String(spineProgress),
              }}
            >
              <div className="work-timeline-line" aria-hidden />
              <div className="work-timeline-progress" aria-hidden />
              <p className="work-timeline-sr-hint visually-hidden">
                Timeline controls: use Tab to reach a dot, Arrow up and down
                to jump between roles, Home and End for first and last role.
                Enter or Space scrolls the matching card into view.
              </p>
              {EXPERIENCES.map((job, idx) => (
                <TimelineRow
                  key={job.key}
                  index={idx}
                  job={job}
                  isLast={idx === lastIdx}
                  isActive={idx === activeIndex}
                  stepNumber={idx + 1}
                  lastIdx={lastIdx}
                  dotBtnRefs={dotBtnRefs}
                />
              ))}
            </nav>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Work;
