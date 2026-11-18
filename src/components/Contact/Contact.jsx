import { profile } from "../../data/profile";
import { Reveal } from "../common/Reveal";
import { Pond } from "../Pond/Pond";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="page">
        <Reveal className={styles.panel}>
          <Pond fish={3} pads="corners" />
          <h2 id="contact-title" className={styles.title}>
            let&apos;s build something
            <br />
            <span className="gradient-text">that doesn&apos;t fall over.</span>
          </h2>
          <p className={styles.lead}>Have a role or a hard problem in mind? My inbox is open.</p>

          <div className={styles.emailRow}>
            <a className="button button-primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>

          <ul className={styles.socials}>
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.label.toLowerCase()}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer">
                résumé
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <footer className={`page ${styles.footer}`}>
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>
          psst, press <kbd>~</kbd>
        </p>
      </footer>
    </section>
  );
}
