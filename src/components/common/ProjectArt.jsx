import { categoryById } from "../../data/projects";
import styles from "./ProjectArt.module.css";

const TINT = {
  backend: "#d3e4e3",
  products: "#eadcd4",
  mobile: "#d9e6d3",
  algorithms: "#ead7de",
};

const KOI = [
  { body: "#fbf6ef", spot: "#e4512a" },
  { body: "#f1b53a", spot: "#fbe08a" },
  { body: "#2b2830", spot: "#e5582c" },
];

const hash = (text) => {
  let value = 2166136261;
  for (const char of text) value = Math.imul(value ^ char.charCodeAt(0), 16777619);
  return value >>> 0;
};

const seeded = (seed) => {
  let state = seed || 1;
  return () => {
    state = Math.imul(state ^ (state >>> 15), 2246822507);
    state = Math.imul(state ^ (state >>> 13), 3266489909);
    state ^= state >>> 16;
    return (state >>> 0) / 4294967296;
  };
};

const padPath = (cx, cy, r, notch) => {
  const a1 = notch + 0.22;
  const a2 = notch - 0.22;
  return `M ${cx} ${cy} L ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} A ${r} ${r} 0 1 1 ${cx + r * Math.cos(a2)} ${cy + r * Math.sin(a2)} Z`;
};

export function ProjectArt({ project, className = "" }) {
  const random = seeded(hash(project.slug));
  const id = `art-${project.slug}`;
  const pads = Array.from({ length: 3 }, (_, i) => ({
    cx: i === 0 ? 400 + random() * 60 : random() * 480,
    cy: i === 0 ? 40 + random() * 60 : 160 + random() * 110,
    r: i === 0 ? 62 + random() * 20 : 26 + random() * 22,
    notch: random() * Math.PI * 2,
  }));
  const koi = KOI[Math.floor(random() * KOI.length)];
  const fishX = 150 + random() * 160;
  const fishY = 100 + random() * 70;
  const fishAngle = -40 + random() * 80;
  const initials = project.title
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toLowerCase();

  return (
    <div className={`${styles.art} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 480 270" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`${id}-water`} cx="35%" cy="30%" r="90%">
            <stop offset="0%" stopColor="#f4f6f2" />
            <stop offset="100%" stopColor={TINT[project.category]} />
          </radialGradient>
          <radialGradient id={`${id}-pad`} cx="38%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#b3da92" />
            <stop offset="60%" stopColor="#7fb764" />
            <stop offset="100%" stopColor="#4f8c45" />
          </radialGradient>
        </defs>
        <rect width="480" height="270" fill={`url(#${id}-water)`} />
        {Array.from({ length: 7 }, (_, i) => (
          <ellipse
            key={i}
            cx={random() * 480}
            cy={random() * 270}
            rx={40 + random() * 50}
            ry={24 + random() * 30}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.55"
            strokeWidth="2"
          />
        ))}
        <g transform={`translate(${fishX} ${fishY}) rotate(${fishAngle})`}>
          <path d="M-58 0 C-48 -16 -10 -18 18 -9 C30 -5 38 -2 44 0 C38 2 30 5 18 9 C-10 18 -48 16 -58 0 Z" fill={koi.body} />
          <path d="M42 0 C54 -14 66 -16 72 -14 C64 -6 64 6 72 14 C66 16 54 14 42 0 Z" fill={koi.body} opacity="0.65" />
          <ellipse cx="-24" cy="-2" rx="13" ry="7" fill={koi.spot} />
          <ellipse cx="6" cy="2" rx="9" ry="5" fill={koi.spot} />
          <circle cx="-49" cy="-5" r="1.8" fill="#231a1f" />
          <circle cx="-49" cy="5" r="1.8" fill="#231a1f" />
        </g>
        {pads.map((pad, index) => (
          <path key={index} d={padPath(pad.cx, pad.cy, pad.r, pad.notch)} fill={`url(#${id}-pad)`} />
        ))}
        <text x="28" y="246" className={styles.mono}>
          {initials}
        </text>
        <text x="30" y="40" className={styles.label}>
          {categoryById[project.category].constellation}
        </text>
      </svg>
    </div>
  );
}
