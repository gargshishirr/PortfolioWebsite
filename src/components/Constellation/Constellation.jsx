import { useMemo, useState } from "react";

import { useUI } from "../../context/ui";
import { categories, categoryById, projectBySlug, projects } from "../../data/projects";
import { useMediaQuery } from "../../hooks/hooks";
import { ProjectArt } from "../common/ProjectArt";
import { Reveal } from "../common/Reveal";
import styles from "./Constellation.module.css";
import { Pond } from "../Pond/Pond";
import { LABELS, POSITIONS, VIEW } from "./layout";

function Lotus() {
  return (
    <svg className={styles.lotus} viewBox="-10 -10 20 20" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-5" rx="2.6" ry="5" fill="#f2a7bb" transform={`rotate(${i * 45})`} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={`inner-${i}`} cx="0" cy="-3.2" rx="1.8" ry="3.4" fill="#fbd6e0" transform={`rotate(${i * 60 + 20})`} />
      ))}
      <circle r="1.8" fill="#f5cf5a" />
    </svg>
  );
}

const matches = (project, filter) => {
  if (filter.type === "category") return project.category === filter.value;
  if (filter.type === "skill") return project.stack.includes(filter.value);
  return true;
};

function StarMap({ visible, onOpen }) {
  const [hovered, setHovered] = useState(null);
  const hoveredProject = hovered ? projectBySlug[hovered] : null;

  return (
    <div className={styles.mapFrame}>
      <div className={styles.map} onPointerLeave={() => setHovered(null)}>
        <Pond fish={4} pads="none" ambient={false} />
        <ul className={styles.labels} aria-hidden="true">
          {categories.map((category) => {
            const [x, y] = LABELS[category.id];
            return (
              <li
                key={category.id}
                style={{
                  left: `${(x / VIEW.width) * 100}%`,
                  top: `${(y / VIEW.height) * 100}%`,
                  color: category.color,
                }}
              >
                {category.constellation}
              </li>
            );
          })}
        </ul>

        <ul className={styles.stars}>
          {projects.map((project, index) => {
            const [x, y] = POSITIONS[project.slug];
            const category = categoryById[project.category];
            const isVisible = visible.has(project.slug);
            return (
              <li
                key={project.slug}
                className={styles.starItem}
                style={{
                  left: `${(x / VIEW.width) * 100}%`,
                  top: `${(y / VIEW.height) * 100}%`,
                  "--accent": category.color,
                  "--notch": `${(index * 137) % 360}deg`,
                }}
                data-dim={!isVisible}
                data-featured={project.featured}
                data-active={hovered === project.slug}
              >
                <button
                  type="button"
                  className={styles.star}
                  onPointerEnter={() => setHovered(project.slug)}
                  onFocus={() => setHovered(project.slug)}
                  onBlur={() => setHovered(null)}
                  onClick={() => onOpen(project.slug)}
                  aria-label={`${project.title}: ${project.tagline} ${category.label}, ${project.year}.`}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  {project.featured && <Lotus />}
                  <span className={styles.starLabel} aria-hidden="true">
                    {project.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {hoveredProject && (
          <Preview
            project={hoveredProject}
            position={POSITIONS[hoveredProject.slug]}
          />
        )}
      </div>
    </div>
  );
}

function Preview({ project, position }) {
  const [x, y] = position;
  const category = categoryById[project.category];
  const flipX = x > VIEW.width * 0.58;
  const flipY = y > VIEW.height * 0.55;
  return (
    <div
      className={styles.preview}
      data-flip-x={flipX}
      data-flip-y={flipY}
      style={{
        left: `${(x / VIEW.width) * 100}%`,
        top: `${(y / VIEW.height) * 100}%`,
        "--accent": category.color,
      }}
      aria-hidden="true"
    >
      <p className={styles.previewMeta}>
        <span>{category.label}</span>
        <span>{project.year}</span>
      </p>
      <p className={styles.previewTitle}>{project.title}</p>
      <p className={styles.previewTagline}>{project.tagline}</p>
      <p className={styles.previewStack}>{project.stack.slice(0, 4).join(" · ")}</p>
      <p className={styles.previewHint}>Click to open →</p>
    </div>
  );
}

function ProjectGrid({ items, onOpen }) {
  if (!items.length) {
    return <p className={styles.empty}>No projects match this filter yet.</p>;
  }
  return (
    <ul className={styles.grid}>
      {items.map((project) => {
        const category = categoryById[project.category];
        const cover = project.images[0];
        return (
          <li key={project.slug} className={styles.card} style={{ "--accent": category.color }}>
            <div className={styles.cover}>
              {cover ? (
                <img src={cover.src} alt="" loading="lazy" decoding="async" data-kind={cover.kind} />
              ) : (
                <ProjectArt project={project} className={styles.art} />
              )}
              <span className={styles.badges}>
                {project.links.live && <span className={styles.live}>● Live</span>}
              </span>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardMeta}>
                <span>{category.label}</span>
                <span>{project.year}</span>
              </p>
              <h3 className={styles.cardTitle}>
                <button type="button" onClick={() => onOpen(project.slug)}>
                  {project.title}
                </button>
              </h3>
              <p className={styles.cardTagline}>{project.tagline}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function Constellation() {
  const { filter, setFilter, openProject } = useUI();
  const wide = useMediaQuery("(min-width: 760px)");
  const [viewChoice, setViewChoice] = useState(null);
  const view = wide ? viewChoice ?? "map" : "list";

  const filtered = useMemo(() => projects.filter((project) => matches(project, filter)), [filter]);
  const visible = useMemo(() => new Set(filtered.map((project) => project.slug)), [filtered]);

  return (
    <div className={`page ${styles.block}`} id="projects">
      <Reveal className={styles.head}>
        <div>
          <h3 className={styles.heading}>
            the whole <em>pond</em>
          </h3>
          <p className={styles.sub}>
            All {projects.length} projects float here as lily pads. Hover one to peek, click to open.
          </p>
        </div>
        <div className={styles.viewToggle} role="group" aria-label="View">
          {["map", "list"].map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={view === option}
              onClick={() => setViewChoice(option)}
            >
              {option === "map" ? "Map" : "List"}
            </button>
          ))}
        </div>
      </Reveal>

      <div className={styles.chips} role="group" aria-label="Filter by category">
        <button
          type="button"
          className={styles.filterChip}
          aria-pressed={filter.type === "all"}
          onClick={() => setFilter({ type: "all", value: null })}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={styles.filterChip}
            style={{ "--accent": category.color }}
            aria-pressed={filter.type === "category" && filter.value === category.id}
            onClick={() =>
              setFilter(
                filter.type === "category" && filter.value === category.id
                  ? { type: "all", value: null }
                  : { type: "category", value: category.id },
              )
            }
          >
            <i aria-hidden="true" />
            {category.label}
          </button>
        ))}
      </div>

      <p className={styles.status} aria-live="polite">
        {filter.type === "skill" && (
          <>
            {filtered.length} of {projects.length} projects use {filter.value}
            <button type="button" onClick={() => setFilter({ type: "all", value: null })}>
              Clear ×
            </button>
          </>
        )}
      </p>

        {view === "map" ? (
          <Reveal>
            <StarMap visible={visible} onOpen={openProject} />
          </Reveal>
        ) : (
          <ProjectGrid items={filtered} onOpen={openProject} />
        )}
    </div>
  );
}
