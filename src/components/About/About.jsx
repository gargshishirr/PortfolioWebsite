import { achievements } from "../../data/experience";
import { profile } from "../../data/profile";
import { skillGroups } from "../../data/skills";
import { Reveal } from "../common/Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="page">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">
            <b>03</b>About
          </p>
          <h2 id="about-title" className="section-title">
            A little more <em className="serif">about me</em>
          </h2>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.copy}>
            {profile.about.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            <h3 className={styles.label}>Toolbox</h3>
            <dl className={styles.toolbox}>
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <dt>{group.title}</dt>
                  <dd>{group.skills.map((skill) => skill.name).join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal as="aside" delay={120} className={styles.side} aria-labelledby="beyond-title">
            <h3 id="beyond-title" className={styles.label}>
              Beyond code
            </h3>
            <ul className={styles.achievements}>
              {achievements.map((item) => (
                <li key={item.title}>
                  <span className={styles.icon} aria-hidden="true">
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
      </div>
    </section>
  );
}
