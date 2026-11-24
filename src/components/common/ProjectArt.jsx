import { categoryById } from "../../data/projects";
import styles from "./ProjectArt.module.css";

// Stands in for a screenshot when a project has none: its initials on a tinted dot grid.
export function ProjectArt({ project, className = "" }) {
  const category = categoryById[project.category];
  const initials = project.title
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`${styles.art} ${className}`} style={{ "--cat": category.color }} aria-hidden="true">
      <span className={styles.initials}>{initials}</span>
      <span className={styles.label}>{category.label}</span>
    </div>
  );
}
