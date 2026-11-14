import { categoryById } from "../../data/projects";
import styles from "./ProjectArt.module.css";

const PALETTE = {
  backend: ["#5fe7f0", "#1b6f8a", "#07263a"],
  products: ["#cdb9ff", "#6a4fd1", "#1d1147"],
  mobile: ["#7cf2d6", "#1f9a80", "#05302a"],
  algorithms: ["#ffc0d2", "#d1557f", "#3d0d22"],
};

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

export function ProjectArt({ project, className = "" }) {
  const random = seeded(hash(project.slug));
  const [light, mid, dark] = PALETTE[project.category];
  const id = `art-${project.slug}`;
  const hasRing = random() > 0.35;
  const ringTilt = -30 + random() * 60;
  const planetX = 180 + random() * 140;
  const planetY = 120 + random() * 40;
  const radius = 62 + random() * 26;
  const bands = Array.from({ length: 4 }, () => ({
    y: -radius + random() * radius * 2,
    h: 4 + random() * 12,
    o: 0.08 + random() * 0.18,
  }));
  const stars = Array.from({ length: 34 }, () => ({
    x: random() * 480,
    y: random() * 270,
    r: 0.4 + random() * 1.2,
    o: 0.25 + random() * 0.6,
  }));
  const initials = project.title
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={`${styles.art} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 480 270" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`${id}-sky`} cx="70%" cy="20%" r="90%">
            <stop offset="0%" stopColor={dark} />
            <stop offset="100%" stopColor="#04050b" />
          </radialGradient>
          <radialGradient id={`${id}-planet`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={light} />
            <stop offset="55%" stopColor={mid} />
            <stop offset="100%" stopColor={dark} />
          </radialGradient>
          <clipPath id={`${id}-clip`}>
            <circle cx={planetX} cy={planetY} r={radius} />
          </clipPath>
        </defs>
        <rect width="480" height="270" fill={`url(#${id}-sky)`} />
        {stars.map((star, index) => (
          <circle key={index} cx={star.x} cy={star.y} r={star.r} fill="#fff" opacity={star.o} />
        ))}
        <circle cx={planetX} cy={planetY} r={radius * 1.9} fill={light} opacity="0.06" />
        {hasRing && (
          <ellipse
            cx={planetX}
            cy={planetY}
            rx={radius * 1.75}
            ry={radius * 0.38}
            transform={`rotate(${ringTilt} ${planetX} ${planetY})`}
            fill="none"
            stroke={light}
            strokeOpacity="0.35"
            strokeWidth="5"
          />
        )}
        <circle cx={planetX} cy={planetY} r={radius} fill={`url(#${id}-planet)`} />
        <g clipPath={`url(#${id}-clip)`}>
          {bands.map((band, index) => (
            <rect
              key={index}
              x={planetX - radius}
              y={planetY + band.y}
              width={radius * 2}
              height={band.h}
              fill="#fff"
              opacity={band.o}
            />
          ))}
        </g>
        {hasRing && (
          <path
            d={`M ${planetX - radius * 1.75} ${planetY} A ${radius * 1.75} ${radius * 0.38} 0 0 0 ${planetX + radius * 1.75} ${planetY}`}
            transform={`rotate(${ringTilt} ${planetX} ${planetY})`}
            fill="none"
            stroke={light}
            strokeOpacity="0.55"
            strokeWidth="5"
          />
        )}
        <text x="28" y="246" className={styles.mono} fill={light}>
          {initials}
        </text>
        <text x="28" y="40" className={styles.label} fill={light}>
          {categoryById[project.category].constellation.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
