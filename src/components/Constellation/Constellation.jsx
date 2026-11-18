import { useMemo, useState } from "react";

import { useUI } from "../../context/ui";
import { categories, categoryById, projectBySlug, projects } from "../../data/projects";
import { useMediaQuery } from "../../hooks/hooks";
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

function ProjectList({ items, onOpen }) {
  return (
    <ul className={styles.list}>
      {items.map((project) => {
        const category = categoryById[project.category];
        return (
          <li key={project.slug} style={{ "--accent": category.color }}>
            <button type="button" onClick={() => onOpen(project.slug)}>
              <span className={styles.listTitle}>{project.title}</span>
              <span className={styles.listMeta}>
                {category.label.toLowerCase()} · {project.year}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function Constellation() {
  const { filter, setFilter, openProject } = useUI();
  const wide = useMediaQuery("(min-width: 760px)");

  const filtered = useMemo(() => projects.filter((project) => matches(project, filter)), [filter]);
  const visible = useMemo(() => new Set(filtered.map((project) => project.slug)), [filtered]);

  return (
    <div className={`page ${styles.block}`} id="projects">
      <Reveal className={styles.head}>
        <h3 className={styles.heading}>
          the whole <em>pond</em>
        </h3>
        <p className={styles.sub}>
          {wide
            ? `All ${projects.length} projects, floating as lily pads. Hover to peek, click to open.`
            : `All ${projects.length} projects.`}
        </p>
      </Reveal>

      <p className={styles.status} aria-live="polite">
        {filter.type !== "all" && (
          <>
            {filtered.length} of {projects.length} projects use{" "}
            {filter.type === "skill" ? filter.value : categoryById[filter.value].label}
            <button type="button" onClick={() => setFilter({ type: "all", value: null })}>
              show all
            </button>
          </>
        )}
      </p>

      {wide ? (
        <Reveal>
          <StarMap visible={visible} onOpen={openProject} />
        </Reveal>
      ) : (
        <ProjectList items={filtered} onOpen={openProject} />
      )}
    </div>
  );
}
