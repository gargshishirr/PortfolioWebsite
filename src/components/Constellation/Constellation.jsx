import { useMemo, useState } from "react";

import { useUI } from "../../context/ui";
import { categories, categoryById, projectBySlug, projects } from "../../data/projects";
import { allStackItems } from "../../data/skills";
import { useMediaQuery } from "../../hooks/hooks";
import { ProjectArt } from "../common/ProjectArt";
import { Reveal } from "../common/Reveal";
import styles from "./Constellation.module.css";
import { DUST, EDGES, LABELS, POSITIONS, VIEW } from "./layout";

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
        <svg
          className={styles.lines}
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
          aria-hidden="true"
        >
          {DUST.map((star, index) => (
            <circle key={index} cx={star.x} cy={star.y} r={star.r} fill="#fff" opacity={star.o} />
          ))}
          {categories.map((category) => {
            const [x, y] = LABELS[category.id];
            return (
              <g key={category.id} className={styles.constellationLabel}>
                <text x={x} y={y} fill={category.color}>
                  {category.constellation.toUpperCase()}
                </text>
                <text x={x} y={y + 18} className={styles.subLabel}>
                  {category.label}
                </text>
              </g>
            );
          })}
          {EDGES.map(([from, to]) => {
            const a = projectBySlug[from];
            const lit = visible.has(from) && visible.has(to);
            const focus = hoveredProject && hoveredProject.category === a.category;
            const [x1, y1] = POSITIONS[from];
            const [x2, y2] = POSITIONS[to];
            return (
              <line
                key={`${from}-${to}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={categoryById[a.category].color}
                className={styles.edge}
                data-lit={lit}
                data-focus={Boolean(focus)}
                pathLength="1"
              />
            );
          })}
        </svg>

        <ul className={styles.stars}>
          {projects.map((project) => {
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
      <p className={styles.previewHint}>Click to open the dossier →</p>
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
                {project.visibility === "private" && <span>Private</span>}
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
              <ul className={styles.cardStack} aria-label="Tech stack">
                {project.stack.slice(0, 4).map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
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
  const view = viewChoice ?? (wide ? "map" : "list");

  const filtered = useMemo(() => projects.filter((project) => matches(project, filter)), [filter]);
  const visible = useMemo(() => new Set(filtered.map((project) => project.slug)), [filtered]);

  const categoryCount = (id) => projects.filter((project) => project.category === id).length;

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="page">
        <Reveal className="section-head">
          <p className="eyebrow">The constellation</p>
          <h2 id="projects-title" className="section-title">
            Every project, <span className="gradient-text">mapped like a night sky.</span>
          </h2>
          <p className="section-lead">
            All {projects.length} projects, grouped into four constellations by what
            they do. Hover a star to preview it, click to open its dossier, or
            filter by the tech you care about.
          </p>
        </Reveal>

        <Reveal className={styles.controls}>
          <div className={styles.chips} role="group" aria-label="Filter by category">
            <button
              type="button"
              className={styles.filterChip}
              aria-pressed={filter.type === "all"}
              onClick={() => setFilter({ type: "all", value: null })}
            >
              All <span>{projects.length}</span>
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
                {category.label} <span>{categoryCount(category.id)}</span>
              </button>
            ))}
          </div>

          <div className={styles.toolsRow}>
            <label className={styles.select}>
              <span className="visually-hidden">Filter by technology</span>
              <select
                value={filter.type === "skill" ? filter.value : ""}
                onChange={(event) =>
                  setFilter(
                    event.target.value
                      ? { type: "skill", value: event.target.value }
                      : { type: "all", value: null },
                  )
                }
              >
                <option value="">Any technology</option>
                {allStackItems.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <div className={styles.viewToggle} role="group" aria-label="View">
              {["map", "list"].map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={view === option}
                  onClick={() => setViewChoice(option)}
                >
                  {option === "map" ? "✦ Sky map" : "▤ List"}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <p className={styles.status} aria-live="polite">
          {filter.type === "all"
            ? `Showing all ${projects.length} projects`
            : `Showing ${filtered.length} of ${projects.length} projects · ${
                filter.type === "skill" ? filter.value : categoryById[filter.value].label
              }`}
          {filter.type !== "all" && (
            <button type="button" onClick={() => setFilter({ type: "all", value: null })}>
              Clear filter ×
            </button>
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
    </section>
  );
}
