import { useEffect, useState } from "react";

import { scrollToSection, useUI } from "../../context/ui";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { useReducedMotion } from "../../hooks/hooks";
import styles from "./Hero.module.css";
import { OrbitSystem } from "./OrbitSystem";

const PHRASES = [
  "systems that fail safely.",
  "real-time apps that feel instant.",
  "tools people enjoy using.",
  "things that actually ship.",
];

const stats = [
  { value: "Billions", label: "requests a month through APIs I built at Microsoft" },
  { value: "−96%", label: "p99 latency cut on OneLake partner APIs" },
  { value: projects.length, label: "side projects in the constellation" },
  { value: projects.filter((project) => project.links.live).length, label: "live demos you can try" },
];

export function Hero() {
  const { openPalette, openTerminal } = useUI();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = setInterval(() => setIndex((value) => (value + 1) % PHRASES.length), 2800);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={`page ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.status}>
            <span className={styles.pulse} aria-hidden="true" />
            {profile.role} @ {profile.company} · {profile.team}
          </p>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleLine}>Shishir</span>
            <span className={`${styles.titleLine} gradient-text`}>Garg</span>
          </h1>

          <p className={styles.rotator}>
            <span className="visually-hidden">{profile.intro}</span>
            <span aria-hidden="true">
              I build{" "}
              <span className={styles.phraseWindow}>
                <span key={index} className={styles.phrase}>
                  {PHRASES[index]}
                </span>
              </span>
            </span>
          </p>

          <p className={styles.lead}>
            By day I build OneLake&apos;s access-control APIs for Microsoft Fabric,
            which SQL, Kusto, Spark and Power BI call billions of times a month.
            Outside work I ship side projects, from a fail-closed ad gate to a
            multiplayer coding arena, all mapped below as a constellation.
          </p>

          <div className={styles.actions}>
            <a
              className="button button-primary"
              href="#projects"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("projects");
              }}
            >
              Explore the constellation
              <span aria-hidden="true">✦</span>
            </a>
            <a className="button" href={profile.resume} target="_blank" rel="noreferrer">
              Resume <span aria-hidden="true">↗</span>
            </a>
          </div>

          <p className={styles.hint}>
            <button type="button" onClick={openPalette}>
              <kbd>⌘</kbd>
              <kbd>K</kbd> jump anywhere
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={openTerminal}>
              <kbd>~</kbd> open the terminal
            </button>
          </p>
        </div>

        <OrbitSystem />
      </div>

      <div className="page">
        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
