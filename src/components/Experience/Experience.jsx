import { useState } from "react";

import { experience } from "../../data/experience";
import { profile } from "../../data/profile";
import { Reveal } from "../common/Reveal";
import styles from "./Experience.module.css";

function Role({ item }) {
  const [expanded, setExpanded] = useState(false);
  // Roles with a summary hide every bullet until expanded; the others lead with their first bullet.
  const collapsedCount = item.summary ? 0 : 1;
  const extra = item.points.length - collapsedCount;
  const points = expanded || extra <= 0 ? item.points : item.points.slice(0, collapsedCount);
  const listId = `points-${item.organisation}-${item.start}`.replace(/\W+/g, "-");

  return (
    <article className={styles.card}>
      <header className={styles.cardHead}>
        <span className={styles.logo}>
          <img src={item.logo} alt="" width="40" height="40" />
        </span>
        <div className={styles.titles}>
          <h3>
            {item.role}
            <span className={styles.at}> · {item.organisation}</span>
          </h3>
          {item.team && <p className={styles.team}>{item.team}</p>}
        </div>
        {item.current && (
          <span className={styles.now}>
            <i aria-hidden="true" /> Current
          </span>
        )}
      </header>

      {item.summary && <p className={styles.summary}>{item.summary}</p>}

      {item.metrics && (
        <dl className={styles.metrics}>
          {item.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul id={listId} className={styles.points} hidden={points.length === 0}>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      {extra > 0 && (
        <button
          type="button"
          className={styles.more}
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show less" : item.summary ? "What I worked on" : "More"}
          <span aria-hidden="true">{expanded ? " ↑" : " ↓"}</span>
        </button>
      )}

      {item.note && <p className={styles.note}>↪ {item.note}</p>}

    </article>
  );
}

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="page">
        <Reveal className="section-head">
          <h2 id="experience-title" className="section-title">
            where i&apos;ve <span className="gradient-text">worked</span>
          </h2>
        </Reveal>

        <ol className={styles.timeline}>
          {experience.map((item, index) => (
            <Reveal
              as="li"
              key={`${item.organisation}-${item.start}`}
              delay={index * 90}
              className={styles.entry}
            >
              <div className={styles.when}>
                <span>{item.start}</span>
                <span aria-hidden="true">→</span>
                <span>{item.end}</span>
              </div>
              <Role item={item} />
            </Reveal>
          ))}

          <Reveal as="li" className={styles.entry}>
            <div className={styles.when}>
              <span>{profile.education.years}</span>
            </div>
            <article className={styles.card}>
              <header className={styles.cardHead}>
                <span className={`${styles.logo} ${styles.cap}`} aria-hidden="true">
                  🎓
                </span>
                <div className={styles.titles}>
                  <h3>{profile.education.school}</h3>
                  <p className={styles.team}>
                    {profile.education.degree} · {profile.education.grade}
                  </p>
                </div>
              </header>
            </article>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
