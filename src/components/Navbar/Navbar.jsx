import { useEffect, useState } from "react";

import { scrollToSection, sections, useUI } from "../../context/ui";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/hooks";
import styles from "./Navbar.module.css";

const ids = sections.map((section) => section.id);

export function Navbar() {
  const { openPalette } = useUI();
  const active = useActiveSection(ids);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={`page ${styles.nav}`} aria-label="Primary">
        <a className={styles.brand} href="#top" onClick={(event) => go(event, "top")}>
          shishir <em>garg</em>
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="primary-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className={styles.burger} data-open={menuOpen} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>

        <ul id="primary-links" className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {sections
            .filter((section) => section.id !== "contact")
            .map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={active === section.id ? styles.active : undefined}
                  aria-current={active === section.id ? "location" : undefined}
                  onClick={(event) => go(event, section.id)}
                >
                  {section.label.toLowerCase()}
                </a>
              </li>
            ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noreferrer">
              résumé <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li className={styles.menuOnly}>
            <a href="#contact" onClick={(event) => go(event, "contact")}>
              contact
            </a>
          </li>
        </ul>

        <div className={styles.tools}>
          <button type="button" className={styles.search} onClick={openPalette}>
            <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
              <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="visually-hidden">Search (⌘K)</span>
          </button>
          <a className={styles.talk} href="#contact" onClick={(event) => go(event, "contact")}>
            let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
