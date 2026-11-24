import { useState } from "react";

import { experience } from "../../data/experience";
import { profile } from "../../data/profile";
import { GraduationCap } from "../common/Icons";
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
    <article className={styles.role}>
      <header className={styles.head}>
        <span className={styles.logo}>
          <img src={item.logo} alt="" width="40" height="40" />
        </span>
        <div className={styles.titles}>
          <h3>{item.role}</h3>
          <p>
            <strong>{item.organisation}</strong>
            {item.team && <span> · {item.team}</span>}
          </p>
        </div>
        {item.current && <span className={styles.now}>Current</span>}
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
          <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
        </button>
      )}

      {item.tags && (
        <ul className={styles.tags} aria-label="Tools">
          {item.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
      )}

      {item.note && <p className={styles.note}>↪ {item.note}</p>}
    </article>
  );
}

export function Experience() {
  return (
    <section className={`section ${styles.section}`} id="experience" aria-labelledby="experience-title">
      <div className="page">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">
            <b>02</b>Experience
          </p>
          <h2 id="experience-title" className="section-title">
            Where I&apos;ve <em className="serif">worked</em>
          </h2>
        </Reveal>

        <ol className={styles.timeline}>
          {experience.map((item) => (
            <Reveal as="li" key={`${item.organisation}-${item.start}`} className={styles.entry}>
              <p className={styles.when}>
                {item.start} — {item.end}
              </p>
              <Role item={item} />
            </Reveal>
          ))}

          <Reveal as="li" className={styles.entry}>
            <p className={styles.when}>{profile.education.years}</p>
            <article className={styles.role}>
              <header className={styles.head}>
                <span className={`${styles.logo} ${styles.cap}`} aria-hidden="true">
                  <GraduationCap />
                </span>
                <div className={styles.titles}>
                  <h3>{profile.education.school}</h3>
                  <p>
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
