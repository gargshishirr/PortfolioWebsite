import { useEffect, useRef, useState } from "react";

import { profile } from "../../data/profile";
import { categoryById, projectBySlug, projects } from "../../data/projects";
import { ArrowUpRight, Mail } from "../common/Icons";
import { ProjectArt } from "../common/ProjectArt";
import styles from "./ProjectDrawer.module.css";

function Gallery({ project }) {
  const [active, setActive] = useState(0);

  if (!project.images.length) {
    return <ProjectArt project={project} className={styles.art} />;
  }

  const image = project.images[active];
  return (
    <div className={styles.gallery}>
      <figure className={styles.stage} data-kind={image.kind}>
        <img key={image.src} src={image.src} alt={image.alt} decoding="async" />
      </figure>
      {project.images.length > 1 && (
        <div className={styles.thumbs} role="group" aria-label="Screenshots">
          {project.images.map((item, index) => (
            <button
              key={item.src}
              type="button"
              aria-pressed={index === active}
              aria-label={`Show screenshot ${index + 1}: ${item.alt}`}
              onClick={() => setActive(index)}
            >
              <img src={item.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectDrawer({ slug, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const scrollRef = useRef(null);
  const project = slug ? projectBySlug[slug] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (project && !dialog.open) {
      dialog.showModal();
      dialog.querySelector("[data-autofocus]")?.focus();
    }
    else if (!project && dialog.open) dialog.close();
  }, [project]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [slug]);

  const index = project ? projects.indexOf(project) : -1;
  const previous = index >= 0 ? projects[(index - 1 + projects.length) % projects.length] : null;
  const next = index >= 0 ? projects[(index + 1) % projects.length] : null;

  const onKeyDown = (event) => {
    if (event.target instanceof HTMLElement && ["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName)) return;
    if (event.key === "ArrowRight" && next) onNavigate(next.slug);
    if (event.key === "ArrowLeft" && previous) onNavigate(previous.slug);
  };

  const category = project ? categoryById[project.category] : null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="dossier-title"
      onClose={() => slug && onClose()}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      onKeyDown={onKeyDown}
      style={category ? { "--cat": category.color } : undefined}
    >
      {project && (
        <div className={styles.panel}>
          <header className={styles.header}>
            <p className={styles.crumbs}>
              <span className={styles.dot} aria-hidden="true" />
              {category.label} · {project.year}
            </p>
            <div className={styles.headerActions}>
              <button type="button" onClick={() => onNavigate(previous.slug)} aria-label={`Previous project: ${previous.title}`}>
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" onClick={() => onNavigate(next.slug)} aria-label={`Next project: ${next.title}`}>
                <span aria-hidden="true">→</span>
              </button>
              <button type="button" className={styles.close} onClick={onClose} aria-label="Close project details" data-autofocus>
                <span aria-hidden="true">✕</span>
              </button>
            </div>
          </header>

          <div ref={scrollRef} className={styles.scroll}>
            <div className={styles.titleBlock}>
              <p className={styles.meta}>
                <span>{project.visibility === "public" ? "Open source" : "Private repository"}</span>
                <span>
                  {index + 1} / {projects.length}
                </span>
              </p>
              <h2 id="dossier-title" className={styles.title}>
                {project.title}
              </h2>
              <p className={styles.tagline}>{project.tagline}</p>

              <div className={styles.links}>
                {project.links.live && (
                  <a className="button button-primary" href={project.links.live} target="_blank" rel="noreferrer">
                    Live demo
                    <ArrowUpRight />
                  </a>
                )}
                {project.links.source && (
                  <a className="button" href={project.links.source} target="_blank" rel="noreferrer">
                    View source
                    <ArrowUpRight />
                  </a>
                )}
                {project.visibility === "private" && (
                  <a
                    className="button"
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(`Walkthrough of ${project.title}`)}`}
                  >
                    <Mail />
                    Ask for a walkthrough
                  </a>
                )}
              </div>
            </div>

            <Gallery key={project.slug} project={project} />

            {project.metrics.length > 0 && (
              <dl className={styles.metrics}>
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <section className={styles.block} aria-labelledby="dossier-overview">
              <h3 id="dossier-overview">Overview</h3>
              <p>{project.summary}</p>
            </section>

            <section className={styles.block} aria-labelledby="dossier-highlights">
              <h3 id="dossier-highlights">Highlights</h3>
              <ul className={styles.highlights}>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>

            <section className={styles.block} aria-labelledby="dossier-stack">
              <h3 id="dossier-stack">Built with</h3>
              <ul className={styles.stack}>
                {project.stack.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <nav className={styles.pager} aria-label="More projects">
              <button type="button" onClick={() => onNavigate(previous.slug)}>
                <span>← Previous</span>
                {previous.title}
              </button>
              <button type="button" onClick={() => onNavigate(next.slug)}>
                <span>Next →</span>
                {next.title}
              </button>
            </nav>
          </div>
        </div>
      )}
    </dialog>
  );
}
