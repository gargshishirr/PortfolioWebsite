import { scrollToSection } from "../../context/ui";
import { profile } from "../../data/profile";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={`page ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.status}>
            <span className={styles.pulse} aria-hidden="true" />
            {profile.role} @ {profile.company}
          </p>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.hello}>Hi, I&apos;m</span>
            <span className={styles.titleLine}>Shishir</span>
            <span className={`${styles.titleLine} gradient-text`}>Garg</span>
          </h1>

          <p className={styles.lead}>{profile.intro}</p>

          <div className={styles.actions}>
            <a
              className="button button-primary"
              href="#work"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("work");
              }}
            >
              See my work
            </a>
            <a className="button" href={profile.resume} target="_blank" rel="noreferrer">
              Resume <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className={styles.portrait}>
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
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
