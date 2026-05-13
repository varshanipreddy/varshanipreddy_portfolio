import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import tamuEdu from "../../Assets/Education/tamu.png";
import nitrr from "../../Assets/Education/nitrr.png";
import goldmanLogo from "../../Assets/Work/Goldman_Sachs.png";
import huaweiLogo from "../../Assets/Work/Huawei.png";
import ittiamLogo from "../../Assets/Work/ittiam.png";
import tamuAltMark from "../../Assets/Work/tamu2.png";

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function useRevealOnScroll(threshold = 0.08) {
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
      { threshold, rootMargin: "0px 0px -5% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const EDU_STEPS = [
  {
    key: "tamu",
    logo: tamuAltMark,
    logoAlt: "Texas A&M University",
    years: "2022 — 2024",
    title: "Texas A&M University, College Station",
    detail: "M.S. Computer Science",
    side: "Graduate chapter: systems, data, and a lot of late-night debugging.",
  },
  {
    key: "nit",
    logo: nitrr,
    logoAlt: "National Institute of Technology Raipur",
    years: "2016 — 2020",
    title: "National Institute of Technology, Raipur",
    detail: "B.Tech in Computer Science & Engineering",
    side: "Where curiosity turned into a career in building things that scale.",
  },
];

const PERSON_LAYERS = [
  {
    emoji: "🧠",
    title: "How I think",
    text: "I like problems that need patience—breaking them down, sketching options, then shipping something dependable.",
  },
  {
    emoji: "🏎️",
    title: "Race weekends",
    text: "Formula 1 is my favorite excuse to wake up early: strategy, pace, and tiny margins.",
  },
  {
    emoji: "🍳",
    title: "Off-screen experiments",
    text: "Cooking is debugging with spices—taste, adjust, repeat until it feels right.",
  },
  {
    emoji: "✈️",
    title: "Wander mode",
    text: "Travel keeps me grounded in new perspectives, languages, and good stories.",
  },
];

const WORK_ITEMS = [
  {
    key: "gs",
    logo: goldmanLogo,
    logoAlt: "Goldman Sachs",
    org: "Goldman Sachs",
    role: "Software Engineer · Data",
    dates: "Sep 2024 — Present",
    blurb:
      "Parallel Python ingestion into Kafka, Spark batch and streaming on YARN/Kubernetes, a React synthetic-event harness for detections, and Splunk→BigQuery with automated ECS lookups.",
  },
  {
    key: "tamu",
    logo: tamuAltMark,
    logoAlt: "Texas A&M University",
    org: "Texas A&M University",
    role: "Software Engineer · High Performance Computing",
    dates: "Jun 2023 — May 2024",
    blurb:
      "HPC resource analysis (Grafana, MemVerge), DRAM vs core studies for batch workflows, and campus web on Kentico and C# with Azure DevOps automation in Python.",
  },
  {
    key: "huawei",
    logo: huaweiLogo,
    logoAlt: "Huawei",
    org: "Huawei Technologies India",
    role: "Software Engineer · Data",
    dates: "Aug 2020 — Jul 2022",
    blurb:
      "Hive and Spark at petabyte scale, 15+ risk models with strong F1 scores, Tableau and MLOps workflows, plus scraping and NLP/vision for unstructured signals.",
  },
  {
    key: "ittiam",
    logo: ittiamLogo,
    logoAlt: "Ittiam Systems",
    org: "Ittiam Systems",
    role: "Software Engineering Intern",
    dates: "May 2019 — Jul 2019",
    blurb:
      "Python and C++ video preprocessing with OpenCV—multi-model GMM foreground/background, shadow removal, and faster analysis pipelines.",
  },
];

/** Full-color logos + emoji hobby tiles. Tiles match by `matchId` (pair key), not by image URL. */
const MEMORY_TWIN_PAIRS = [
  {
    pairKey: "tamu-edu",
    face: { kind: "img", src: tamuEdu, label: "Texas A&M University" },
  },
  {
    pairKey: "nit",
    face: { kind: "img", src: nitrr, label: "NIT Raipur" },
  },
  {
    pairKey: "goldman",
    face: { kind: "img", src: goldmanLogo, label: "Goldman Sachs" },
  },
  {
    pairKey: "huawei",
    face: { kind: "img", src: huaweiLogo, label: "Huawei" },
  },
  {
    pairKey: "ittiam",
    face: { kind: "img", src: ittiamLogo, label: "Ittiam Systems" },
  },
  {
    pairKey: "hobby-race",
    face: { kind: "emoji", symbol: "🏎️", label: "Racing" },
  },
  {
    pairKey: "hobby-cook",
    face: { kind: "emoji", symbol: "🍳", label: "Cooking" },
  },
  {
    pairKey: "hobby-travel",
    face: { kind: "emoji", symbol: "✈️", label: "Travel" },
  },
];

const MEMORY_GRID_COLUMNS = 4;
if (
  process.env.NODE_ENV === "development" &&
  MEMORY_TWIN_PAIRS.length * 2 % MEMORY_GRID_COLUMNS !== 0
) {
  // eslint-disable-next-line no-console
  console.warn(
    "[memory] MEMORY_TWIN_PAIRS must yield a tile count divisible by 4."
  );
}

function buildDeck() {
  const seenSrc = new Map();
  const cards = [];
  MEMORY_TWIN_PAIRS.forEach((p) => {
    const visualKey =
      p.face.kind === "img" ? `img:${p.face.src}` : `emoji:${p.face.symbol}`;
    if (seenSrc.has(visualKey)) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.warn(
          "[memory] two pairs share the same visual; match is still by pair:",
          seenSrc.get(visualKey),
          p.pairKey
        );
      }
    }
    seenSrc.set(visualKey, p.pairKey);
    const matchId = p.pairKey;
    const faceA = { ...p.face };
    const faceB = { ...p.face };
    cards.push({
      id: `${p.pairKey}-a`,
      matchId,
      face: faceA,
    });
    cards.push({
      id: `${p.pairKey}-b`,
      matchId,
      face: faceB,
    });
  });
  return shuffle(cards);
}

function MemoryPairGame() {
  const [deck, setDeck] = useState(() => buildDeck());
  const [faceUp, setFaceUp] = useState([]);
  const [matched, setMatched] = useState(() => new Set());
  const lock = useRef(false);
  const deckRef = useRef(deck);
  const matchedRef = useRef(matched);
  deckRef.current = deck;
  matchedRef.current = matched;

  const totalPairs = MEMORY_TWIN_PAIRS.length;
  const won = matched.size === totalPairs;

  const reset = useCallback(() => {
    lock.current = false;
    setDeck(buildDeck());
    setFaceUp([]);
    setMatched(new Set());
  }, []);

  const onPick = useCallback(
    (index) => {
      if (lock.current || won) return;
      const d = deckRef.current;
      const m = matchedRef.current;
      const card = d[index];
      if (!card || m.has(card.matchId)) return;

      setFaceUp((prev) => {
        if (prev.includes(index) || prev.length >= 2) return prev;
        return [...prev, index];
      });
    },
    [won]
  );

  useEffect(() => {
    if (faceUp.length !== 2) return undefined;
    const [i, j] = faceUp;
    const d = deckRef.current;
    const a = d[i];
    const b = d[j];
    if (!a || !b) return undefined;
    if (lock.current) return undefined;

    lock.current = true;
    const isMatch = a.matchId === b.matchId;
    const delay = isMatch ? 400 : 780;
    const tid = window.setTimeout(() => {
      if (isMatch) {
        setMatched((prev) => new Set(prev).add(a.matchId));
      }
      setFaceUp([]);
      lock.current = false;
    }, delay);

    return () => {
      window.clearTimeout(tid);
      lock.current = false;
    };
  }, [faceUp]);

  const isShowing = (index) => {
    const c = deck[index];
    if (!c) return false;
    return faceUp.includes(index) || matched.has(c.matchId);
  };

  return (
    <div className="home-memory">
      <div
        className="home-memory-grid"
        role="group"
        aria-labelledby="home-game-heading"
      >
        {deck.map((card, index) => {
          const showing = isShowing(index);
          const matchedHere = matched.has(card.matchId);
          const faceLabel = card.face.label;
          return (
            <button
              key={card.id}
              type="button"
              className={`home-memory-card${showing ? " is-flipped" : ""}${
                matchedHere ? " is-matched" : ""
              }`}
              onClick={() => onPick(index)}
              disabled={matchedHere || (faceUp.length === 2 && !showing)}
              aria-pressed={showing}
              aria-label={
                matchedHere
                  ? "Matched"
                  : showing
                    ? faceLabel
                    : "Hidden"
              }
            >
              <span className="home-memory-card-inner">
                <span className="home-memory-face home-memory-back" aria-hidden="true">
                  ?
                </span>
                <span className="home-memory-face home-memory-front">
                  {card.face.kind === "img" ? (
                    <img
                      src={card.face.src}
                      alt=""
                      role="presentation"
                      className="home-memory-img"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span
                      className="home-memory-emoji home-memory-emoji--tile"
                      aria-hidden
                    >
                      {card.face.symbol}
                    </span>
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="home-memory-footer">
        <span
          className="home-memory-score"
          aria-label={`Pairs ${matched.size} of ${totalPairs}`}
        >
          {matched.size}/{totalPairs}
        </span>
        <button type="button" className="home-memory-reset" onClick={reset}>
          Again
        </button>
      </div>
      {won && (
        <p className="home-memory-win" role="status">
          Done.
        </p>
      )}
    </div>
  );
}

function HomeLayers() {
  const [rootRef, rootVisible] = useRevealOnScroll(0.06);

  return (
    <div
      className={`home-layers${rootVisible ? " home-layers--visible" : ""}`}
      ref={rootRef}
    >
      <div className="home-layers-bg" aria-hidden="true" />
      <Container className="home-layers-container">
        <header className="home-layers-header">
          <p className="home-layers-kicker">More on this page</p>
          <h2 className="home-layers-title">School, work, life &amp; a small game</h2>
          <p className="home-layers-sub">
            Everything below is extra detail—education, roles, personal notes,
            and a quick logo match—so you can keep scrolling in one place.
          </p>
        </header>

        <section className="home-layers-section" aria-labelledby="home-edu-heading">
          <div className="home-layers-section-head">
            <h3 id="home-edu-heading" className="home-layers-h3">
              Education journey
            </h3>
            <p className="home-layers-lead">
              Two places that shaped how I build software today.
            </p>
          </div>

          <div className="home-timeline">
            {EDU_STEPS.map((step, idx) => (
              <article
                key={step.key}
                className="home-timeline-node"
                style={{ transitionDelay: `${120 + idx * 140}ms` }}
              >
                <div className="home-timeline-card">
                  <div className="home-timeline-card-top">
                    <div className="home-timeline-logo-wrap">
                      <img
                        src={step.logo}
                        alt={step.logoAlt}
                        className="home-timeline-logo"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="home-timeline-text">
                      <span className="home-timeline-years">{step.years}</span>
                      <h4 className="home-timeline-school">{step.title}</h4>
                      <p className="home-timeline-degree">{step.detail}</p>
                    </div>
                  </div>
                  <p className="home-timeline-aside">{step.side}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="home-layers-more">
            <Link to="/education">See the full education page →</Link>
          </p>
        </section>

        <section className="home-layers-section" aria-labelledby="home-work-heading">
          <div className="home-layers-section-head">
            <h3 id="home-work-heading" className="home-layers-h3">
              Work highlights
            </h3>
            <p className="home-layers-lead">
              A skim of where I&apos;ve shipped systems—from security telemetry
              and Spark to campus web stacks and an algorithms classroom.
            </p>
          </div>
          <div className="home-work-grid">
            {WORK_ITEMS.map((job, idx) => (
              <article
                key={job.key}
                className="home-work-card"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="home-work-card-top">
                  <div className="home-work-logo-wrap">
                    <img
                      src={job.logo}
                      alt={job.logoAlt}
                      className="home-work-logo"
                    />
                  </div>
                  <div className="home-work-meta">
                    <h4 className="home-work-org">{job.org}</h4>
                    <p className="home-work-role">{job.role}</p>
                    <p className="home-work-dates">{job.dates}</p>
                  </div>
                </div>
                <p className="home-work-blurb">{job.blurb}</p>
              </article>
            ))}
          </div>
          <p className="home-layers-more">
            <Link to="/work">Full work experience &amp; details →</Link>
          </p>
        </section>

        <section className="home-layers-section" aria-labelledby="home-person-heading">
          <div className="home-layers-section-head">
            <h3 id="home-person-heading" className="home-layers-h3">
              Me, in layers
            </h3>
            <p className="home-layers-lead">
              Not a résumé—just the stuff that shows up when the laptop closes.
            </p>
          </div>
          <div className="home-person-deck">
            {PERSON_LAYERS.map((layer, idx) => (
              <div
                key={layer.title}
                className="home-person-card"
                style={{ animationDelay: `${idx * 0.12}s` }}
              >
                <span className="home-person-emoji" aria-hidden="true">
                  {layer.emoji}
                </span>
                <h4 className="home-person-title">{layer.title}</h4>
                <p className="home-person-text">{layer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-layers-section home-layers-section--game" aria-labelledby="home-game-heading">
          <div className="home-layers-section-head">
            <h3 id="home-game-heading" className="home-layers-h3">
              Logo memory
            </h3>
            <p className="home-layers-lead">
              Flip two tiles. Pair matching logos or emoji.
            </p>
          </div>
          <MemoryPairGame />
        </section>
      </Container>
    </div>
  );
}

export default HomeLayers;
