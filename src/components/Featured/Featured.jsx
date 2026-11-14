import { useUI } from "../../context/ui";
import { categoryById, projectBySlug } from "../../data/projects";
import { Reveal } from "../common/Reveal";
import { AdGateVisual } from "../visuals/AdGateVisual";
import { CodeBattleVisual } from "../visuals/CodeBattleVisual";
import styles from "./Featured.module.css";

const trackSpotlight = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

function PhoneStack({ images }) {
  return (
    <div className={styles.phones}>
      {images.slice(0, 3).map((image, index) => (
        <figure key={image.src} className={styles.phone} style={{ "--i": index }}>
          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  );
}

function BrowserAndPhone({ desktop, phone }) {
  return (
    <div className={styles.devices}>
      <figure className={styles.browser}>
        <div className={styles.browserBar} aria-hidden="true">
          <i />
          <i />
          <i />
          <span>wanderly-fna8.onrender.com</span>
        </div>
        <img src={desktop.src} alt={desktop.alt} loading="lazy" decoding="async" />
      </figure>
      <figure className={`${styles.phone} ${styles.floatingPhone}`}>
        <img src={phone.src} alt={phone.alt} loading="lazy" decoding="async" />
      </figure>
    </div>
  );
}

const FEATURES = [
  {
    slug: "adgate",
    layout: "wide",
    media: <AdGateVisual />,
    note: "Illustration using AdGate's real reason codes",
  },
  {
    slug: "kharcha",
    layout: "tall",
    media: <PhoneStack images={projectBySlug.kharcha.images} />,
  },
  {
    slug: "codebattle",
    layout: "wide",
    media: <CodeBattleVisual />,
    note: "Illustration of a live battle",
  },
  {
    slug: "wanderly",
    layout: "full",
    media: (
      <BrowserAndPhone
        desktop={projectBySlug.wanderly.images[0]}
        phone={projectBySlug.wanderly.images[1]}
      />
    ),
  },
];

export function Featured() {
  const { openProject } = useUI();

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="page">
        <Reveal className="section-head">
          <p className="eyebrow">Flagship missions</p>
          <h2 id="work-title" className="section-title">
            Selected work, <span className="gradient-text">built to hold up.</span>
          </h2>
          <p className="section-lead">
            Four projects I&apos;m proudest of: a millisecond-budget backend, a
            multiplayer coding arena, a travel-matching app and a mobile app for
            everyday money.
          </p>
        </Reveal>

        <div className={styles.bento}>
          {FEATURES.map((feature, index) => {
            const project = projectBySlug[feature.slug];
            const category = categoryById[project.category];
            return (
              <Reveal
                as="article"
                key={project.slug}
                delay={index * 80}
                className={`${styles.card} ${styles[feature.layout]}`}
                style={{ "--accent": category.color }}
                onPointerMove={trackSpotlight}
              >
                <div className={styles.copy}>
                  <p className={styles.meta}>
                    <span className={styles.index}>0{index + 1}</span>
                    <span className={styles.category}>{category.label}</span>
                    <span>{project.year}</span>
                  </p>
                  <h3 className={styles.title}>
                    <button
                      type="button"
                      className={styles.stretch}
                      onClick={() => openProject(project.slug)}
                    >
                      {project.title}
                    </button>
                  </h3>
                  <p className={styles.tagline}>{project.tagline}</p>

                  {project.metrics.length > 0 && (
                    <dl className={styles.metrics}>
                      {project.metrics.slice(0, feature.layout === "full" ? 3 : 2).map((metric) => (
                        <div key={metric.label}>
                          <dt>{metric.label}</dt>
                          <dd>{metric.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <ul className={styles.stack} aria-label="Tech stack">
                    {project.stack.slice(0, 5).map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.actions}>
                    <span className={styles.open} aria-hidden="true">
                      Open dossier <span>→</span>
                    </span>
                    {project.links.live && (
                      <a
                        className={styles.raised}
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live demo ↗
                      </a>
                    )}
                    {project.links.source && (
                      <a
                        className={styles.raised}
                        href={project.links.source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source ↗
                      </a>
                    )}
                    {project.visibility === "private" && (
                      <span className={styles.private}>Private repo</span>
                    )}
                  </div>
                </div>

                <div className={styles.media}>
                  {feature.media}
                  {feature.note && <p className={styles.note}>{feature.note}</p>}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
