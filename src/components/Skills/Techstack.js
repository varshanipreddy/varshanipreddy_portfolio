import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CgCPlusPlus } from "react-icons/cg";
import { DiJava } from "react-icons/di";
import {
  SiAmazonaws,
  SiApacheairflow,
  SiApachehive,
  SiApachehadoop,
  SiApachekafka,
  SiApachespark,
  SiAzuredevops,
  SiCsharp,
  SiCss3,
  SiDjango,
  SiDocker,
  SiElasticsearch,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGithub,
  SiGnubash,
  SiGooglecloud,
  SiGrafana,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiKentico,
  SiKeras,
  SiKubernetes,
  SiLaravel,
  SiLinux,
  SiLogstash,
  SiMicrosoftazure,
  SiMlflow,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNumpy,
  SiOpencv,
  SiPandas,
  SiPhp,
  SiPostgresql,
  SiPytorch,
  SiPython,
  SiReact,
  SiRedis,
  SiRuby,
  SiRubyonrails,
  SiScikitlearn,
  SiSelenium,
  SiSpacy,
  SiSplunk,
  SiSqlite,
  SiTableau,
  SiTensorflow,
} from "react-icons/si";
import { TbApi, TbBrandWindows, TbCpu2, TbSql } from "react-icons/tb";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "data", label: "Data" },
  { id: "ml", label: "ML & analytics" },
  { id: "web", label: "Web & APIs" },
  { id: "cloud", label: "Cloud & ops" },
];

const SKILLS = [
  { id: "python", name: "Python", Icon: SiPython, tags: ["languages", "data", "ml"] },
  { id: "sql", name: "SQL", Icon: TbSql, tags: ["languages", "data"] },
  { id: "cpp", name: "C++", Icon: CgCPlusPlus, tags: ["languages"] },
  { id: "csharp", name: "C#", Icon: SiCsharp, tags: ["languages", "web"] },
  { id: "java", name: "Java", Icon: DiJava, tags: ["languages"] },
  { id: "javascript", name: "JavaScript", Icon: SiJavascript, tags: ["languages", "web"] },
  { id: "bash", name: "Bash", Icon: SiGnubash, tags: ["languages", "cloud"] },
  { id: "ruby", name: "Ruby", Icon: SiRuby, tags: ["languages", "web"] },
  { id: "php", name: "PHP", Icon: SiPhp, tags: ["languages", "web"] },
  { id: "html", name: "HTML", Icon: SiHtml5, tags: ["languages", "web"] },
  { id: "css", name: "CSS", Icon: SiCss3, tags: ["languages", "web"] },
  { id: "kafka", name: "Kafka", Icon: SiApachekafka, tags: ["data", "cloud"] },
  { id: "spark", name: "Apache Spark", Icon: SiApachespark, tags: ["data", "cloud"] },
  { id: "hive", name: "Apache Hive", Icon: SiApachehive, tags: ["data"] },
  { id: "hadoop", name: "Hadoop / YARN", Icon: SiApachehadoop, tags: ["data", "cloud"] },
  { id: "postgres", name: "PostgreSQL", Icon: SiPostgresql, tags: ["data"] },
  { id: "mysql", name: "MySQL", Icon: SiMysql, tags: ["data"] },
  { id: "mongo", name: "MongoDB", Icon: SiMongodb, tags: ["data"] },
  { id: "redis", name: "Redis", Icon: SiRedis, tags: ["data", "cloud"] },
  { id: "sqlite", name: "SQLite", Icon: SiSqlite, tags: ["data"] },
  { id: "pandas", name: "Pandas", Icon: SiPandas, tags: ["data", "ml"] },
  { id: "numpy", name: "NumPy", Icon: SiNumpy, tags: ["data", "ml"] },
  { id: "logstash", name: "Logstash", Icon: SiLogstash, tags: ["data", "cloud"] },
  { id: "elastic", name: "Elasticsearch", Icon: SiElasticsearch, tags: ["data", "cloud"] },
  { id: "gcp", name: "Google Cloud", Icon: SiGooglecloud, tags: ["data", "cloud"] },
  { id: "aws", name: "AWS", Icon: SiAmazonaws, tags: ["cloud"] },
  { id: "react", name: "React", Icon: SiReact, tags: ["web"] },
  { id: "node", name: "Node.js", Icon: SiNodedotjs, tags: ["web"] },
  { id: "django", name: "Django", Icon: SiDjango, tags: ["web"] },
  { id: "flask", name: "Flask", Icon: SiFlask, tags: ["web"] },
  { id: "rails", name: "Ruby on Rails", Icon: SiRubyonrails, tags: ["web"] },
  { id: "laravel", name: "Laravel", Icon: SiLaravel, tags: ["web"] },
  { id: "kentico", name: "Kentico CMS", Icon: SiKentico, tags: ["web"] },
  { id: "rest", name: "REST APIs", Icon: TbApi, tags: ["web"] },
  { id: "tensorflow", name: "TensorFlow", Icon: SiTensorflow, tags: ["ml"] },
  { id: "pytorch", name: "PyTorch", Icon: SiPytorch, tags: ["ml"] },
  { id: "keras", name: "Keras", Icon: SiKeras, tags: ["ml"] },
  { id: "sklearn", name: "scikit-learn", Icon: SiScikitlearn, tags: ["ml"] },
  { id: "jupyter", name: "Jupyter", Icon: SiJupyter, tags: ["ml"] },
  { id: "tableau", name: "Tableau", Icon: SiTableau, tags: ["ml"] },
  { id: "opencv", name: "OpenCV", Icon: SiOpencv, tags: ["ml"] },
  { id: "spacy", name: "spaCy", Icon: SiSpacy, tags: ["ml"] },
  { id: "selenium", name: "Selenium", Icon: SiSelenium, tags: ["ml", "web"] },
  { id: "airflow", name: "Airflow", Icon: SiApacheairflow, tags: ["data", "cloud"] },
  { id: "mlflow", name: "MLflow", Icon: SiMlflow, tags: ["ml", "cloud"] },
  { id: "k8s", name: "Kubernetes", Icon: SiKubernetes, tags: ["cloud"] },
  { id: "docker", name: "Docker", Icon: SiDocker, tags: ["cloud"] },
  { id: "azure", name: "Microsoft Azure", Icon: SiMicrosoftazure, tags: ["cloud"] },
  { id: "azuredevops", name: "Azure DevOps", Icon: SiAzuredevops, tags: ["cloud"] },
  { id: "git", name: "Git", Icon: SiGit, tags: ["cloud"] },
  { id: "github", name: "GitHub", Icon: SiGithub, tags: ["cloud"] },
  { id: "grafana", name: "Grafana", Icon: SiGrafana, tags: ["cloud"] },
  { id: "splunk", name: "Splunk", Icon: SiSplunk, tags: ["cloud"] },
  { id: "linux", name: "Linux", Icon: SiLinux, tags: ["cloud"] },
  { id: "hpc", name: "HPC / clusters", Icon: TbCpu2, tags: ["cloud"] },
  { id: "windows", name: "Windows", Icon: TbBrandWindows, tags: ["cloud"] },
  { id: "firebase", name: "Firebase", Icon: SiFirebase, tags: ["web", "cloud"] },
];

function useSkillsSectionVisible() {
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
      { threshold: 0.06, rootMargin: "0px 0px -5% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Techstack() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [wrapRef, wrapVisible] = useSkillsSectionVisible();

  const filterCounts = useMemo(() => {
    const counts = { all: SKILLS.length };
    FILTERS.forEach((f) => {
      if (f.id === "all") return;
      counts[f.id] = SKILLS.filter((s) => s.tags.includes(f.id)).length;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = SKILLS.filter((s) => {
      const tagOk = filter === "all" || s.tags.includes(filter);
      const qOk = !q || s.name.toLowerCase().includes(q);
      return tagOk && qOk;
    });
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [filter, query]);

  return (
    <div
      ref={wrapRef}
      className={`skills-mosaic-wrap ${wrapVisible ? "skills-mosaic-wrap--visible" : ""}`}
    >
      <div className="skills-toolbar">
        <div className="skills-search-wrap">
          <label className="skills-search-label" htmlFor="skills-search-input">
            <span className="visually-hidden">Search skills by name</span>
            <input
              id="skills-search-input"
              type="search"
              className="skills-search-input"
              placeholder="Search (e.g. Spark, Kafka, React…)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
          </label>
          {query.trim() ? (
            <button
              type="button"
              className="skills-search-clear"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <AiOutlineCloseCircle aria-hidden />
            </button>
          ) : null}
        </div>
        <div className="skills-filters" role="tablist" aria-label="Skill categories">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              aria-label={`${f.label}, ${filterCounts[f.id] ?? 0} skills`}
              className={`skills-filter-btn ${filter === f.id ? "skills-filter-btn--active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              <span className="skills-filter-label">{f.label}</span>
              <span className="skills-filter-count" aria-hidden="true">
                {filterCounts[f.id] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="skills-results-meta" aria-live="polite">
        <span className="skills-results-count">{filtered.length}</span>
        <span className="skills-results-label">
          {filtered.length === 1 ? " skill" : " skills"}
          {filter !== "all" || query.trim()
            ? ` · filtered from ${SKILLS.length} total`
            : ""}
        </span>
      </p>

      <div className="skills-mosaic">
        {filtered.map((s, idx) => {
          const Icon = s.Icon;
          const accent = s.tags[0];
          return (
            <article
              key={s.id}
              className="skills-tile"
              data-accent={accent}
              style={{ "--skills-stagger": `${Math.min(idx, 28) * 12}ms` }}
              aria-label={s.name}
            >
              <span className="skills-tile-glow" aria-hidden />
              <span className="skills-tile-icon" aria-hidden>
                <Icon />
              </span>
              <span className="skills-tile-name">{s.name}</span>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="skills-empty" role="status">
          No skills match that filter. Try another category or clear the search.
        </p>
      ) : null}
    </div>
  );
}

export default Techstack;
