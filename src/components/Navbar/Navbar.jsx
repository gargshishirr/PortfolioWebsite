import { useEffect, useState } from "react";

import { scrollToSection, sections } from "../../context/ui";
import { profile } from "../../data/profile";
import { useActiveSection, useTheme } from "../../hooks/hooks";
import { ArrowUpRight, Moon, Sun } from "../common/Icons";
import styles from "./Navbar.module.css";

const ids = sections.map((section) => section.id);

export function Navbar() {
  const active = useActiveSection(ids);
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header className={`${styles.header} ${scrolled || menuOpen ? styles.scrolled : ""}`}>
      <nav className={`page ${styles.nav}`} aria-label="Primary">
        <a className={styles.brand} href="#top" onClick={(event) => go(event, "top")}>
          {profile.name}
          <span className={styles.brandDot} aria-hidden="true" />
        </a>

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
          <li>
            <a className={styles.resume} href={profile.resume} target="_blank" rel="noreferrer">
              Résumé
              <ArrowUpRight />
            </a>
          </li>
        </ul>

        <div className={styles.tools}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggle}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
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
        </div>
      </nav>
    </header>
  );
}
