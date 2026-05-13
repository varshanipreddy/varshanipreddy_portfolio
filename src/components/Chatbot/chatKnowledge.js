/** Client-side replies — no API keys; safe for static hosting. */

export const DEFAULT_SUGGESTIONS = [
  "Who is Varshani?",
  "Skills & certifications",
  "Projects & work",
  "How to contact",
];

const CONTACT =
  "You can reach out via **varshanipreddy@gmail.com** or **varshanipreddy@tamu.edu**. Links: [GitHub](https://github.com/varshanipreddy) · [LinkedIn](https://www.linkedin.com/in/varshanipreddy/) · [LeetCode](https://leetcode.com/varshanipreddy/).";

/**
 * Renders **bold** and [label](url). Matches `**[label](url)**` as a link first so
 * markdown is not mis-parsed as bold-only (which broke in-app navigation).
 */
export function botTextToParts(text) {
  const parts = [];
  const re =
    /\*\*\[([^\]]+)\]\(([^)]+)\)\*\*|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m = re.exec(text);
  while (m !== null) {
    if (m.index > last) {
      parts.push({ type: "text", value: text.slice(last, m.index) });
    }
    if (m[1] !== undefined && m[2] !== undefined) {
      parts.push({ type: "link", value: m[1], href: m[2] });
    } else if (m[3] !== undefined) {
      parts.push({ type: "bold", value: m[3] });
    } else if (m[4] !== undefined && m[5] !== undefined) {
      parts.push({ type: "link", value: m[4], href: m[5] });
    }
    last = re.lastIndex;
    m = re.exec(text);
  }
  if (last < text.length) {
    parts.push({ type: "text", value: text.slice(last) });
  }
  return parts.length ? parts : [{ type: "text", value: text }];
}

export function replyToMessage(raw) {
  const q = raw.trim().toLowerCase();
  if (!q) {
    return {
      message:
        "Ask me anything about this site — **About**, **Education**, **Work**, **Skills**, **Projects**, or **Awards**. You can also type a question in your own words.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (/^(hi|hello|hey|howdy|hiya)\b|^help\b|^start\b/.test(q)) {
    return {
      message:
        "Hi — I’m Varshani’s portfolio assistant. I can point you to sections of this site or summarize her background. What would you like to explore?",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (
    /who (is|are)|about (you|varshani|her)|introduction|bio\b|tell me about (you|her|varshani)/.test(
      q
    ) ||
    (q.includes("varshani") && !/project|portfolio/.test(q))
  ) {
    return {
      message:
        "**Varshani Reddy Patlolla** is a **software engineer** at **Goldman Sachs**, focused on reliable **data pipelines** and analytics (e.g. **Kafka**, **Spark**, **Python**, cloud data platforms). She holds an **M.S. in Computer Science** from **Texas A&M University** and a **B.Tech in Computer Science and Engineering** from **NIT Raipur**, with strong prior experience at **Huawei** (data / ML / risk) and **Texas A&M** (HPC engineering & web systems).\n\nShe cares about **performance**, **maintainable systems**, and **real-world impact**; off the clock she follows **Formula 1**, **cooking**, and **travel**. For personality and interests, see **[About](/about)**; for roles and tech detail, **[Work](/work)** and **[Education](/education)**.",
      suggestions: ["Work experience", "Skills & certifications", "How to contact"],
    };
  }

  if (/^about\s*$|\babout (the )?site\b|\babout (this )?portfolio\b/.test(q)) {
    return {
      message:
        "Use the **[About](/about)** page for a personal introduction and interests. **[Home](/)** has the hero overview.",
      suggestions: ["Education", "Work experience", "Skills & certifications"],
    };
  }

  if (/skill|cert|stack|tech|language|framework/.test(q)) {
    return {
      message:
        "Skills, tools, and certifications live on **[Skills & certs](/skills)** — including badges and links where relevant.",
      suggestions: ["Projects", "Work experience", "Awards"],
    };
  }

  if (/project|portfolio|github|built|app/.test(q)) {
    return {
      message:
        "Highlighted work and builds are on **[Projects](/project)**. The site’s source is on [GitHub](https://github.com/varshanipreddy/varshanipreddy_portfolio).",
      suggestions: ["Work experience", "Skills & certifications", "How to contact"],
    };
  }

  if (
    /\b(work|working|job|jobs|career|employer|employment|role|position)\b|work experience|goldman|goldman sachs/.test(
      q
    )
  ) {
    return {
      message:
        "**Work:** She is currently a **software engineer** at **Goldman Sachs** (since Sept 2024), focused on **data platforms** and streaming analytics. Earlier roles include **Texas A&M** (HPC engineering) and **Huawei** (data / ML), with an internship at **Ittiam** — full bullets and tech stack are on **[Work](/work)**.",
      suggestions: ["Education", "Projects", "How to contact"],
    };
  }

  if (
    /\beducation\b|\bacademic\b|\bacademics?\b|\bdegree\b|\bschool\b|\buniversity\b|\bcollege\b|texas a&m|\btamu\b|masters?|master of|\bundergrad\b|bachelor|b\.?tech|\bnit\b|raipur|\bstudy\b|\bstudied\b|\bstudying\b|\bstudies\b|\bstudent\b|\bcoursework\b|\bcourses\b|\bgraduate\b|\bgraduated\b|\bgraduation\b|\bgrad school\b|\bgraduate school\b|\balumni\b|\balumnus\b|\balumna\b|\bmajor\b|\bminor\b|\bgpa\b|\binstitute\b|\btranscript\b|\bdiploma\b|\bscholastic\b|\bcampus\b|\bthesis\b|\bdissertation\b|\bqualification\b|\bqualifications\b/.test(
      q
    )
  ) {
    return {
      message:
        "**Education:** **M.S. in Computer Science** at **Texas A&M University**, College Station (Aug 2022 — May 2024), and **B.Tech in Computer Science and Engineering** at **National Institute of Technology (NIT) Raipur** (Aug 2016 — June 2020) — coursework, highlights, and dates are on **[Education](/education)**.",
      suggestions: ["Work experience", "Skills & certifications", "Projects"],
    };
  }

  if (/award|honor|recognition|achievement/.test(q)) {
    return {
      message:
        "Awards and recognitions are listed on **[Awards](/awards)**.",
      suggestions: ["Projects", "Education", "How to contact"],
    };
  }

  if (/contact|email|reach|linkedin|social|hire|collab/.test(q)) {
    return {
      message: CONTACT,
      suggestions: ["Who is Varshani?", "Projects & work", "Skills & certifications"],
    };
  }

  if (/home|landing|main page|homepage|\bhome page\b/.test(q)) {
    return {
      message: "The landing page is **[Home](/)** — intro, roles, and quick links.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (/thank|thanks|ty\b|great|awesome/.test(q)) {
    return {
      message:
        "You’re welcome — glad I could help. If you’re hiring or collaborating, **contact** is the best next step.",
      suggestions: ["How to contact", "Projects & work"],
    };
  }

  return {
    message: `I’m not sure about that yet — try rephrasing, or pick a topic below. This assistant runs entirely in your browser (no chat server). For anything specific, use **How to contact** and reach out directly.\n\nTip: you can ask about **education**, **work**, **skills**, **projects**, or **awards**.`,
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

export function suggestionToPrompt(label) {
  const map = {
    "Who is Varshani?": "Who is Varshani?",
    "Skills & certifications": "What are your skills and certifications?",
    "Projects & work": "Tell me about projects and work",
    "How to contact": "How can I contact you?",
    Education: "Tell me about education",
    "Work experience": "Tell me about work experience",
    Awards: "Tell me about awards",
    Projects: "Tell me about projects",
  };
  return map[label] || label;
}
