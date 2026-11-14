import { useEffect, useState } from "react";

import { scrollToSection, sections, useUI } from "../../context/ui";
import { useActiveSection } from "../../hooks/hooks";
import styles from "./Navbar.module.css";

const ids = sections.map((section) => section.id);

export function Navbar() {
  const { openPalette } = useUI();
  const active = useActiveSection(ids);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 12);
      setProgress(max > 0 ? window.scrollY / max : 0);
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
          <span className={styles.logo} aria-hidden="true">
            SG
          </span>
          <span className={styles.brandName}>Shishir Garg</span>
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
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={active === section.id ? styles.active : undefined}
                aria-current={active === section.id ? "location" : undefined}
                onClick={(event) => go(event, section.id)}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.tools}>
          <button type="button" className={styles.search} onClick={openPalette}>
            <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
              <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className={styles.searchLabel}>Search</span>
            <span className={styles.shortcut} aria-hidden="true">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </button>
        </div>
      </nav>
      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}
