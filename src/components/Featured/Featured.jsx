import { useUI } from "../../context/ui";
import codebattleFocus from "../../assets/projects/codebattle-focus.webp";
import { categoryById, projectBySlug } from "../../data/projects";
import { Reveal } from "../common/Reveal";
import { AdGateVisual } from "../visuals/AdGateVisual";
import styles from "./Featured.module.css";

const SELECTED = [
  "adgate",
  "codebattle",
  "medrecords",
  "wanderly",
  "kharcha",
  "proctorcode",
  "accessdesk",
  "reqlab",
  "jobbot",
];

function Cover({ project }) {
  if (project.slug === "adgate") {
    return (
      <div className={styles.visual}>
        <AdGateVisual />
      </div>
    );
  }
  if (project.slug === "kharcha") {
    return (
      <div className={styles.phones}>
        {project.images.slice(0, 3).map((image) => (
          <img key={image.src} src={image.src} alt="" loading="lazy" decoding="async" />
        ))}
      </div>
    );
  }
  const src = project.slug === "codebattle" ? codebattleFocus : project.images[0].src;
  return <img src={src} alt="" loading="lazy" decoding="async" />;
}

export function Featured() {
  const { openProject } = useUI();

  return (
    <div className="page">
      <Reveal className="section-head">
        <h2 id="work-title" className="section-title">
          things i&apos;ve <span className="gradient-text">built</span>
        </h2>
        <p className="section-lead">Side projects I build outside my day job.</p>
      </Reveal>

      <ul className={styles.grid}>
        {SELECTED.map((slug, index) => {
          const project = projectBySlug[slug];
          const category = categoryById[project.category];
          return (
            <Reveal
              as="li"
              key={slug}
              delay={(index % 3) * 70}
              className={styles.card}
              style={{ "--accent": category.color }}
            >
              <div className={styles.cover}>
                <Cover project={project} />
              </div>
              <div className={styles.body}>
                <p className={styles.meta}>
                  {category.label.toLowerCase()} · {project.year}
                  {project.links.live && <span className={styles.live}>live</span>}
                </p>
                <h3 className={styles.title}>
                  <button type="button" className={styles.stretch} onClick={() => openProject(slug)}>
                    {project.title}
                  </button>
                </h3>
                <p className={styles.tagline}>{project.tagline}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
