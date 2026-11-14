import { experience } from "../../data/experience";
import { profile } from "../../data/profile";
import { Reveal } from "../common/Reveal";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="page">
        <Reveal className="section-head">
          <p className="eyebrow">Flight log</p>
          <h2 id="experience-title" className="section-title">
            Where I&apos;ve <span className="gradient-text">worked and learned.</span>
          </h2>
        </Reveal>

        <ol className={styles.timeline}>
          {experience.map((item, index) => (
            <Reveal as="li" key={`${item.organisation}-${item.start}`} delay={index * 90} className={styles.entry}>
              <div className={styles.when}>
                <span>{item.start}</span>
                <span aria-hidden="true">→</span>
                <span>{item.end}</span>
              </div>
              <span className={styles.marker} aria-hidden="true" />
              <article className={styles.card}>
                <header className={styles.cardHead}>
                  <span className={styles.logo}>
                    <img src={item.logo} alt="" width="40" height="40" />
                  </span>
                  <div>
                    <h3>{item.organisation}</h3>
                    <p>{item.role}</p>
                  </div>
                </header>
                <ul className={styles.points}>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <ul className={styles.tags} aria-label="Skills used">
                  {item.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <Reveal as="li" className={`${styles.entry} ${styles.education}`}>
            <div className={styles.when}>
              <span>Education</span>
            </div>
            <span className={styles.marker} aria-hidden="true" />
            <article className={styles.card}>
              <header className={styles.cardHead}>
                <span className={`${styles.logo} ${styles.cap}`} aria-hidden="true">
                  🎓
                </span>
                <div>
                  <h3>{profile.education.school}</h3>
                  <p>{profile.education.degree}</p>
                </div>
              </header>
            </article>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
