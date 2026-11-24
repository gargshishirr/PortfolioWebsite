import { scrollToSection } from "../../context/ui";
import { profile } from "../../data/profile";
import { ArrowDown, ArrowUpRight, Code, GitHub, LinkedIn, Mail } from "../common/Icons";
import styles from "./Hero.module.css";

const ICONS = { GitHub, LinkedIn, LeetCode: Code };

export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={`page ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.status}>
            <span className={styles.pulse} aria-hidden="true" />
            <span>
              {profile.role} at {profile.company}
              <span className={styles.team}> · {profile.team}</span>
            </span>
          </p>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.hello}>Hi, I&apos;m {profile.firstName}.</span> I build the{" "}
            <em className="serif">invisible parts</em> of software.
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
              <ArrowDown />
            </a>
            <a className="button" href={profile.resume} target="_blank" rel="noreferrer">
              Résumé
              <ArrowUpRight />
            </a>
            <ul className={styles.socials} aria-label="Find me elsewhere">
              {profile.socials.map((social) => {
                const Icon = ICONS[social.label];
                return (
                  <li key={social.label}>
                    <a
                      className="icon-button"
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${social.label}: ${social.handle}`}
                      title={social.label}
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
              <li>
                <a className="icon-button" href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} title="Email">
                  <Mail />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <figure className={styles.portrait}>
          <img
            src={profile.photo}
            alt="Shishir smiling in a beanie on a snowy mountain ridge"
            width="640"
            height="618"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
