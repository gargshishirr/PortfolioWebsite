import { useEffect, useMemo, useRef, useState } from "react";

import { scrollToSection, sections, useUI } from "../../context/ui";
import { profile } from "../../data/profile";
import { categoryById, projects } from "../../data/projects";
import styles from "./CommandPalette.module.css";

const score = (item, query) => {
  if (!query) return 1;
  const label = item.label.toLowerCase();
  const haystack = `${label} ${item.keywords || ""}`.toLowerCase();
  if (label.startsWith(query)) return 100;
  if (label.includes(query)) return 80;
  if (haystack.includes(query)) return 50;
  let position = 0;
  for (const char of query) {
    position = label.indexOf(char, position);
    if (position === -1) return 0;
    position += 1;
  }
  return 20;
};

export function CommandPalette({ open, onClose }) {
  const { openProject, openTerminal } = useUI();
  const dialogRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo(
    () => [
      ...sections.map((section) => ({
        id: `go-${section.id}`,
        group: "Navigate",
        icon: "↳",
        label: `Go to ${section.label}`,
        run: () => scrollToSection(section.id),
      })),
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        group: "Projects",
        icon: "✦",
        label: project.title,
        hint: categoryById[project.category].label,
        accent: categoryById[project.category].color,
        keywords: `${project.tagline} ${project.stack.join(" ")}`,
        run: () => openProject(project.slug),
      })),
      {
        id: "resume",
        group: "Links",
        icon: "↗",
        label: "Open résumé",
        keywords: "cv resume",
        run: () => window.open(profile.resume, "_blank", "noopener"),
      },
      ...profile.socials.map((social) => ({
        id: `social-${social.label}`,
        group: "Links",
        icon: "↗",
        label: `Open ${social.label}`,
        hint: social.handle,
        run: () => window.open(social.href, "_blank", "noopener"),
      })),
      {
        id: "copy-email",
        group: "Actions",
        icon: "⧉",
        label: "Copy email address",
        hint: profile.email,
        keywords: "contact mail",
        run: () => navigator.clipboard?.writeText(profile.email),
      },
      {
        id: "send-email",
        group: "Actions",
        icon: "✉",
        label: "Send me an email",
        keywords: "contact hire mail",
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "terminal",
        group: "Actions",
        icon: ">_",
        label: "Open the terminal",
        hint: "~",
        keywords: "shell console command line",
        run: () => openTerminal(),
      },
    ],
    [openProject, openTerminal],
  );

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items
      .map((item, order) => ({ item, order, score: score(item, normalized) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.order - b.order)
      .map((entry) => entry.item);
  }, [items, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) {
      setQuery("");
      setActive(0);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const execute = (item) => {
    if (!item) return;
    onClose();
    requestAnimationFrame(() => item.run());
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => (results.length ? (value + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => (results.length ? (value - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      execute(results[active]);
    }
  };

  let lastGroup = null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Command palette"
      onClose={() => open && onClose()}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      {open && (
        <div className={styles.panel}>
          <div className={styles.inputRow}>
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search projects, tech, sections or actions…"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-results"
              aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
              aria-autocomplete="list"
              aria-label="Search commands"
              spellCheck="false"
              autoComplete="off"
            />
            <kbd>esc</kbd>
          </div>

          <ul id="palette-results" ref={listRef} className={styles.list} role="listbox" aria-label="Results">
            {results.map((item, index) => {
              const heading = item.group !== lastGroup ? item.group : null;
              lastGroup = item.group;
              return (
                <li
                  key={item.id}
                  id={`palette-${item.id}`}
                  role="option"
                  aria-selected={index === active}
                  data-index={index}
                  data-group={heading || undefined}
                  className={styles.option}
                  style={item.accent ? { "--item": item.accent } : undefined}
                  onPointerMove={() => setActive(index)}
                  onClick={() => execute(item)}
                >
                  <span className={styles.icon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className={styles.label}>{item.label}</span>
                  {item.hint && <span className={styles.hint}>{item.hint}</span>}
                </li>
              );
            })}
            {!results.length && <li className={styles.empty}>No matches for “{query}”.</li>}
          </ul>

          <footer className={styles.footer}>
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> navigate
            </span>
            <span>
              <kbd>↵</kbd> select
            </span>
            <span>
              <kbd>⌘</kbd>
              <kbd>K</kbd> toggle
            </span>
          </footer>
        </div>
      )}
    </dialog>
  );
}
