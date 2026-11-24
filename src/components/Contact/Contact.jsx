import { useEffect, useState } from "react";

import { scrollToSection } from "../../context/ui";
import { profile } from "../../data/profile";
import { ArrowUpRight, Check, Code, Copy, FileText, GitHub, LinkedIn, Mail } from "../common/Icons";
import { Reveal } from "../common/Reveal";
import styles from "./Contact.module.css";

const ICONS = { GitHub, LinkedIn, LeetCode: Code };
const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
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
    <section className={`section ${styles.section}`} id="contact" aria-labelledby="contact-title">
      <div className="page">
        <Reveal className={styles.card}>
          <p className="eyebrow">
            <b>04</b>Contact
          </p>
          <h2 id="contact-title" className={styles.title}>
            Let&apos;s build something <em className="serif">that doesn&apos;t fall over.</em>
          </h2>
          <p className={styles.lead}>Have a role or a hard problem in mind? My inbox is open.</p>

          <div className={styles.actions}>
            <a className="button button-primary" href={`mailto:${profile.email}`}>
              <Mail />
              {profile.email}
            </a>
            <button type="button" className="button" onClick={copyEmail}>
              {copied ? <Check /> : <Copy />}
              <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
            </button>
          </div>

          <ul className={styles.links}>
            {profile.socials.map((social) => {
              const Icon = ICONS[social.label];
              return (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    <Icon />
                    {social.label}
                    <ArrowUpRight className={styles.out} />
                  </a>
                </li>
              );
            })}
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer">
                <FileText />
                Résumé
                <ArrowUpRight className={styles.out} />
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <footer className={`page ${styles.footer}`}>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className={styles.hint}>
          Press <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>
          <kbd>K</kbd> to search, or <kbd>`</kbd> for a terminal
        </p>
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("top");
          }}
        >
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}
