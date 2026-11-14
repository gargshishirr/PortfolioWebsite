import { achievements } from "../../data/experience";
import { profile } from "../../data/profile";
import { Reveal } from "../common/Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className={`page ${styles.grid}`}>
        <Reveal className={styles.copy}>
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="section-title">
            A little more <span className="gradient-text">about me.</span>
          </h2>
          {profile.about.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={100}>
          <ul className={styles.achievements} aria-label="Achievements and leadership">
            {achievements.map((item) => (
              <li key={item.title}>
                <span className={styles.achievementIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <p className={styles.achievementTitle}>{item.title}</p>
                  <p className={styles.achievementDetail}>{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
