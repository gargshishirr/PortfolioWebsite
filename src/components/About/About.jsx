import { achievements } from "../../data/experience";
import { profile } from "../../data/profile";
import { Reveal } from "../common/Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section className={`section ${styles.section}`} id="about" aria-labelledby="about-title">
      <div className={`page ${styles.grid}`}>
        <Reveal className={styles.portrait}>
          <div className={styles.rings} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <img
            src={profile.photo}
            alt="Shishir smiling in a beanie on a snowy mountain ridge"
            width="640"
            height="618"
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <Reveal delay={100} className={styles.copy}>
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="section-title">
            Hi, I&apos;m {profile.firstName}.
          </h2>
          {profile.about.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}

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
