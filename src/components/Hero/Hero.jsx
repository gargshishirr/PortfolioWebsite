import { profile } from "../../data/profile";
import { Pond } from "../Pond/Pond";
import styles from "./Hero.module.css";

const github = profile.socials.find((social) => social.label === "GitHub");
const linkedin = profile.socials.find((social) => social.label === "LinkedIn");

const PILLS = [
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
          currently at microsoft
        </p>
      </div>

      <ul className={styles.pills}>
        {PILLS.map((pill) => (
          <li key={pill.label} className={styles[pill.spot]}>
            <a
              className={styles.pill}
              href={pill.href}
              {...(pill.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
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
