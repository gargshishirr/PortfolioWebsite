import codebattleFocus from "../../assets/projects/codebattle-focus.webp";
import { useUI } from "../../context/ui";
import { categoryById, projectBySlug, projects } from "../../data/projects";
import { ArrowRight } from "../common/Icons";
import { Reveal } from "../common/Reveal";
import styles from "./Work.module.css";

// The order of the big cards. Every other project is listed under "More projects", newest first.
const SELECTED = [
  "adgate",
  "codebattle",
  "medrecords",
  "wanderly",
  "kharcha",
  "proctorcode",
  "accessdesk",
  "reqlab",
  "pathfinder",
];

const MORE = projects
  .filter((project) => !SELECTED.includes(project.slug))
  .sort((a, b) => b.year - a.year);

function Cover({ project }) {
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
  return <img className={styles.shot} src={src} alt="" loading="lazy" decoding="async" />;
}

function ProjectCard({ project, index }) {
  const { openProject } = useUI();
  const category = categoryById[project.category];
  const wide = index === 0;

  return (
    <Reveal
      as="li"
      delay={wide ? 0 : ((index - 1) % 2) * 90}
      className={`${styles.item} ${wide ? styles.wideItem : ""}`}
    >
      <article className={`${styles.card} ${wide ? styles.wide : ""}`} style={{ "--cat": category.color }}>
        <div className={styles.media}>
          <Cover project={project} />
        </div>
        <div className={styles.body}>
          <p className={styles.meta}>
            <span>{category.label}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            {project.links.live && <span className={styles.live}>Live</span>}
          </p>
          <h3 className={styles.title}>
            <button
              type="button"
              className={styles.open}
              aria-haspopup="dialog"
              onClick={() => openProject(project.slug)}
            >
              {project.title}
            </button>
            <ArrowRight className={styles.arrow} />
          </h3>
          <p className={styles.tagline}>{project.tagline}</p>
          <ul className={styles.tags} aria-label={`${project.title} is built with`}>
            {project.stack.slice(0, 4).map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  const { openProject } = useUI();

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="page">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">
            <b>01</b>Selected work
          </p>
          <h2 id="work-title" className="section-title">
            Things I&apos;ve <em className="serif">built</em>
          </h2>
          <p className="section-lead">
            Side projects I build outside my day job. Open one for screenshots, numbers and how it works.
          </p>
        </Reveal>

        <ul className={styles.grid}>
          {SELECTED.map((slug, index) => (
            <ProjectCard key={slug} project={projectBySlug[slug]} index={index} />
          ))}
        </ul>

        <Reveal className={styles.more}>
          <h3 className={styles.moreTitle}>More projects</h3>
          <ul className={styles.moreList}>
            {MORE.map((project) => (
              <li key={project.slug}>
                <button
                  type="button"
                  className={styles.moreRow}
                  aria-haspopup="dialog"
                  onClick={() => openProject(project.slug)}
                >
                  <span className={styles.moreYear}>{project.year}</span>
                  <span className={styles.moreName}>{project.title}</span>
                  <span className={styles.moreTagline}>{project.tagline}</span>
                  <ArrowRight className={styles.moreArrow} />
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
