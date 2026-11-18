import { scrollToSection } from "../../context/ui";
import { profile } from "../../data/profile";
import { Pond } from "../Pond/Pond";
import styles from "./Hero.module.css";

const github = profile.socials.find((social) => social.label === "GitHub");
const linkedin = profile.socials.find((social) => social.label === "LinkedIn");

const PILLS = [
  { label: "selected work", href: "#work", section: "work", spot: "work" },
  { label: "github", href: github.href, spot: "github" },
  { label: "linkedin", href: linkedin.href, spot: "linkedin" },
  { label: "say hi", href: `mailto:${profile.email}`, spot: "hi" },
];

export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <Pond />

      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          hi, i&apos;m <em>shishir</em>
        </h1>
        <p className={styles.subtitle}>
          software engineer building large-scale distributed systems
        </p>
        <p className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          currently at microsoft, on onelake
          <span aria-hidden="true"> •</span>
        </p>
      </div>

      <ul className={styles.pills}>
        {PILLS.map((pill) => (
          <li key={pill.label} className={styles[pill.spot]}>
            <a
              className={styles.pill}
              href={pill.href}
              {...(pill.section
                ? {
                    onClick: (event) => {
                      event.preventDefault();
                      scrollToSection(pill.section);
                    },
                  }
                : { target: pill.href.startsWith("mailto:") ? undefined : "_blank", rel: "noreferrer" })}
            >
              {pill.label} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>

      <p className={styles.hint} aria-hidden="true">
        tap the water
      </p>
    </section>
  );
}
