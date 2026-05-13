import React from "react";
import { CgCPlusPlus } from "react-icons/cg";
import { TbCamera, TbCpu2, TbServer2 } from "react-icons/tb";
import {
  SiApachehadoop,
  SiApachehive,
  SiApachekafka,
  SiApachespark,
  SiAzuredevops,
  SiCsharp,
  SiGooglecloud,
  SiGrafana,
  SiKentico,
  SiKubernetes,
  SiMlflow,
  SiOpencv,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSplunk,
  SiTableau,
  SiTensorflow,
} from "react-icons/si";

/** Normalized label → icon component for work experience tags */
const WORK_TECH_ICON_MAP = {
  python: SiPython,
  kafka: SiApachekafka,
  react: SiReact,
  spark: SiApachespark,
  yarn: SiApachehadoop,
  kubernetes: SiKubernetes,
  bigquery: SiGooglecloud,
  splunk: SiSplunk,
  hpc: TbCpu2,
  grafana: SiGrafana,
  memverge: TbServer2,
  kentico: SiKentico,
  "c#": SiCsharp,
  csharp: SiCsharp,
  "azure devops": SiAzuredevops,
  sql: SiPostgresql,
  hive: SiApachehive,
  tableau: SiTableau,
  ml: SiTensorflow,
  mlops: SiMlflow,
  "c++": CgCPlusPlus,
  cpp: CgCPlusPlus,
  opencv: SiOpencv,
  "computer vision": TbCamera,
};

function normalizeTag(label) {
  return String(label || "")
    .trim()
    .toLowerCase();
}

export function getWorkTechIconComponent(label) {
  return WORK_TECH_ICON_MAP[normalizeTag(label)] || null;
}

/**
 * Renders a brand icon for known tags; returns null when no mapping exists.
 */
export function WorkTechIcon({ label, className }) {
  const Icon = getWorkTechIconComponent(label);
  if (!Icon) return null;
  return (
    <span className={className} aria-hidden>
      <Icon />
    </span>
  );
}
