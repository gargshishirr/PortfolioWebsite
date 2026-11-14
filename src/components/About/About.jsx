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
            Hi, I&apos;m {profile.firstName}. <span className="gradient-text">Nice to meet you.</span>
          </h2>
          {profile.about.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}

          <dl className={styles.facts}>
            <div>
              <dt>Working at</dt>
              <dd>
                {profile.company} · {profile.team}
              </dd>
            </div>
            <div>
              <dt>Studied</dt>
              <dd>
                {profile.education.short} · {profile.education.grade}
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>

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

          <ul className={styles.fun} aria-label="Fun facts">
            {profile.funFacts.map((fact) => (
              <li key={fact.text}>
                <span aria-hidden="true">{fact.icon}</span>
                {fact.text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
