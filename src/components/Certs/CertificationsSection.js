import React, { useEffect, useRef, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import awsccp from "../../Assets/Certs/awsccp.png";
import udemy from "../../Assets/Certs/udemy.jpg";
import huawei from "../../Assets/Work/Huawei.png";

const CERT_ITEMS = [
  {
    id: "aws-ccp",
    kind: "credential",
    accent: "credential",
    provider: "aws",
    title: "AWS Certified Cloud Practitioner",
    img: awsccp,
    href: "https://www.credly.com/badges/4cec4a8c-d1ec-4261-96c4-d0ce3264fb6e/public_url",
  },
  {
    id: "nlp-udemy",
    kind: "course",
    accent: "course",
    provider: "udemy",
    title: "NLP — Natural Language Processing with Python",
    img: udemy,
    href: "https://www.udemy.com/certificate/UC-66c19d1c-88cd-4e4d-9627-fae02997222d/",
  },
  {
    id: "ds-bootcamp",
    kind: "course",
    accent: "course",
    provider: "udemy",
    title: "The Data Science Course 2021 — Complete Data Science Bootcamp",
    img: udemy,
    href: "https://www.udemy.com/certificate/UC-5068a549-cf97-49fa-988b-0215b99a31c2/",
  },
  {
    id: "huawei-ecq",
    kind: "credential",
    accent: "vendor",
    provider: "huawei",
    title: "Java ECQ — Enhance Code Quality Exam (Huawei)",
    img: huawei,
    href: null,
  },
  {
    id: "blockchain-udemy",
    kind: "course",
    accent: "course",
    provider: "udemy",
    title: "Blockchain A–Z — Build your first blockchain",
    img: udemy,
    href: "https://www.udemy.com/certificate/UC-e094fc4b-1d2f-4eb9-b05a-e937d5558d44/",
  },
];

function useCertsSectionVisible() {
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

function CertificationsSection() {
  const [wrapRef, wrapVisible] = useCertsSectionVisible();

  return (
    <div
      ref={wrapRef}
      className={`skills-cert-list-wrap ${wrapVisible ? "skills-cert-list-wrap--visible" : ""}`}
    >
      <ul className="skills-cert-list">
        {CERT_ITEMS.map((c, idx) => (
          <li key={c.id} className="skills-cert-list-item">
            <article
              className="skills-cert-row"
              data-accent={c.accent}
              data-kind={c.kind}
              data-provider={c.provider}
              style={{ "--cert-stagger": `${idx * 55}ms` }}
            >
              <div className="skills-cert-row-media" data-provider={c.provider}>
                <img src={c.img} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="skills-cert-row-text">
                <div className="skills-cert-row-head">
                  <span className="skills-cert-kind">
                    {c.kind === "credential" ? "Credential" : "Course"}
                  </span>
                  {c.href ? (
                    <a
                      className="skills-cert-row-link"
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open certificate: ${c.title}`}
                    >
                      Open
                      <HiOutlineExternalLink aria-hidden className="skills-cert-row-link-icon" />
                    </a>
                  ) : null}
                </div>
                <h3 className="skills-cert-row-title">{c.title}</h3>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className="skills-cert-meta" aria-live="polite">
        {CERT_ITEMS.length} credentials &amp; courses
      </p>
    </div>
  );
}

export default CertificationsSection;
