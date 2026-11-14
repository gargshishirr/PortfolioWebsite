import { memo, useEffect, useRef } from "react";

import styles from "./Hero.module.css";

const ORBITS = [
  { rx: 250, ry: 74, tilt: -26, speed: 0.11, color: "var(--cyan)" },
  { rx: 205, ry: 64, tilt: 24, speed: -0.15, color: "var(--pink)" },
  { rx: 160, ry: 52, tilt: 84, speed: 0.19, color: "var(--violet)" },
];

const BODIES = [
  { orbit: 0, phase: 0 },
  { orbit: 0, phase: 3.3 },
  { orbit: 1, phase: 1.2 },
  { orbit: 1, phase: 4.4 },
  { orbit: 2, phase: 2.4 },
];

const position = (orbit, angle) => {
  const tilt = (orbit.tilt * Math.PI) / 180;
  const x = orbit.rx * Math.cos(angle);
  const y = orbit.ry * Math.sin(angle);
  return {
    x: x * Math.cos(tilt) - y * Math.sin(tilt),
    y: x * Math.sin(tilt) + y * Math.cos(tilt),
    depth: Math.sin(angle),
  };
};

export const OrbitSystem = memo(function OrbitSystem() {
  const wrapRef = useRef(null);
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const bodyRefs = useRef([]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start = performance.now();

    const place = (time) => {
      const seconds = (time - start) / 1000;
      BODIES.forEach((body, index) => {
        const node = bodyRefs.current[index];
        if (!node) return;
        const orbit = ORBITS[body.orbit];
        const { x, y, depth } = position(orbit, body.phase + seconds * orbit.speed * Math.PI);
        const scale = 0.78 + 0.32 * (depth + 1) * 0.5;
        node.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(3)})`);
        node.style.opacity = (0.45 + 0.55 * (depth + 1) * 0.5).toFixed(3);
        const layer = depth >= 0 ? frontRef.current : backRef.current;
        if (node.parentNode !== layer) layer.appendChild(node);
      });
    };

    const loop = (time) => {
      place(time);
      frame = requestAnimationFrame(loop);
    };

    const run = () => {
      cancelAnimationFrame(frame);
      start = performance.now();
      if (motion.matches) place(start);
      else frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else if (!motion.matches) frame = requestAnimationFrame(loop);
    };

    run();
    motion.addEventListener("change", run);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", run);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fine = window.matchMedia("(pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMove = (event) => {
      if (!fine.matches || motion.matches) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      wrap.style.setProperty("--tilt-x", `${(-y * 14).toFixed(2)}deg`);
      wrap.style.setProperty("--tilt-y", `${(x * 18).toFixed(2)}deg`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className={styles.orbitWrap} aria-hidden="true">
      <svg className={styles.orbit} viewBox="-300 -300 600 600">
        <defs>
          <radialGradient id="core" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#e6fff8" />
            <stop offset="45%" stopColor="#5ee8cb" />
            <stop offset="100%" stopColor="#1a6f73" />
          </radialGradient>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="rgba(78,230,196,0.55)" />
            <stop offset="100%" stopColor="rgba(78,230,196,0)" />
          </radialGradient>
        </defs>

        {ORBITS.map((orbit) => (
          <ellipse
            key={orbit.tilt}
            rx={orbit.rx}
            ry={orbit.ry}
            transform={`rotate(${orbit.tilt})`}
            fill="none"
            stroke={orbit.color}
            strokeOpacity="0.28"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        ))}

        <g ref={backRef} />

        <circle r="120" fill="url(#coreGlow)" className={styles.coreGlow} />
        <circle r="62" fill="none" stroke="rgba(78,230,196,0.35)" className={styles.corePulse} />
        <circle r="44" fill="url(#core)" />
        <text className={styles.coreText} textAnchor="middle" dy="9">
          SG
        </text>

        <g ref={frontRef}>
          {BODIES.map((body, index) => {
            const color = ORBITS[body.orbit].color;
            const start = position(ORBITS[body.orbit], body.phase);
            return (
              <g
                key={`${body.orbit}-${body.phase}`}
                ref={(node) => {
                  bodyRefs.current[index] = node;
                }}
                transform={`translate(${start.x} ${start.y})`}
              >
                <circle r="16" fill={color} opacity="0.18" />
                <circle r="6.5" fill={color} />
                <circle r="2" cx="-2" cy="-2" fill="#fff" opacity="0.9" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
});
