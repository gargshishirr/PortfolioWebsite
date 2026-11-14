import { useEffect, useState } from "react";

import { profile } from "../../data/profile";
import { Reveal } from "../common/Reveal";
import styles from "./Contact.module.css";

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="page">
        <Reveal className={styles.panel}>
          <div className={styles.glow} aria-hidden="true" />
          <p className="eyebrow">Open channel</p>
          <h2 id="contact-title" className={styles.title}>
            Let&apos;s build something
            <br />
            <span className="gradient-text">that doesn&apos;t fall over.</span>
          </h2>
          <p className={styles.lead}>Have a role or a hard problem in mind? My inbox is open.</p>

          <div className={styles.emailRow}>
            <a className="button button-primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <button type="button" className="button" onClick={copyEmail}>
              {copied ? "Copied ✓" : "Copy email"}
            </button>
            <span className="visually-hidden" aria-live="polite">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </div>

          <ul className={styles.socials}>
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <footer className={`page ${styles.footer}`}>
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>
          Psst, press <kbd>~</kbd>
        </p>
      </footer>
    </section>
  );
}
