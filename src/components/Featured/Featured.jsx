import { useUI } from "../../context/ui";
import codebattleFocus from "../../assets/projects/codebattle-focus.webp";
import { categoryById, projectBySlug } from "../../data/projects";
import { Reveal } from "../common/Reveal";
import { AdGateVisual } from "../visuals/AdGateVisual";
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

function Browser({ image, url }) {
  return (
    <figure className={styles.browser}>
      <div className={styles.browserBar} aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{url}</span>
      </div>
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
    </figure>
  );
}

function BrowserAndPhone({ desktop, phone, url }) {
  return (
    <div className={styles.devices}>
      <Browser image={desktop} url={url} />
      <figure className={`${styles.phone} ${styles.floatingPhone}`}>
        <img src={phone.src} alt={phone.alt} loading="lazy" decoding="async" />
      </figure>
    </div>
  );
}

const MORE = ["proctorcode", "accessdesk", "reqlab", "jobbot"];

const FEATURES = [
  {
    slug: "adgate",
    layout: "wide",
    media: <AdGateVisual />,
    note: "illustration using adgate's real reason codes",
  },
  {
    slug: "kharcha",
    layout: "tall",
    media: <PhoneStack images={projectBySlug.kharcha.images} />,
  },
  {
    slug: "codebattle",
    layout: "wide",
    media: (
      <Browser
        image={{ src: codebattleFocus, alt: projectBySlug.codebattle.images[0].alt }}
        url="localhost:3000/room · Friday night DSA"
      />
    ),
  },
  {
    slug: "medrecords",
    layout: "full",
    media: (
      <BrowserAndPhone
        desktop={projectBySlug.medrecords.images[0]}
        phone={projectBySlug.medrecords.images[4]}
        url="gargshishirr.github.io/MedRecords"
      />
    ),
  },
  {
    slug: "wanderly",
    layout: "full",
    reverse: true,
    media: (
      <BrowserAndPhone
        desktop={projectBySlug.wanderly.images[0]}
        phone={projectBySlug.wanderly.images[1]}
        url="wanderly-fna8.onrender.com"
      />
    ),
  },
];

export function Featured() {
  const { openProject } = useUI();

  return (
    <div className="page">
        <Reveal className="section-head">
          <p className="eyebrow">selected work</p>
          <h2 id="work-title" className="section-title">
            things i&apos;ve <span className="gradient-text">built</span>
          </h2>
          <p className="section-lead">Side projects I build outside my day job.</p>
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
                className={`${styles.card} ${styles[feature.layout]} ${feature.reverse ? styles.reverse : ""}`}
                style={{ "--accent": category.color }}
                onPointerMove={trackSpotlight}
              >
                <div className={styles.copy}>
                  <p className={styles.meta}>
                    {category.label} · {project.year}
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

                  <div className={styles.actions}>
                    <span className={styles.open} aria-hidden="true">
                      View project <span>→</span>
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

        <h3 className={styles.moreHeading}>
          more i&apos;m <em>proud of</em>
        </h3>
        <ul className={styles.more}>
          {MORE.map((slug, index) => {
            const project = projectBySlug[slug];
            const category = categoryById[project.category];
            return (
              <Reveal
                as="li"
                key={slug}
                delay={index * 60}
                className={styles.mini}
                style={{ "--accent": category.color }}
              >
                <div className={styles.miniCover}>
                  <img src={project.images[0].src} alt="" loading="lazy" decoding="async" />
                </div>
                <div className={styles.miniBody}>
                  <p className={styles.meta}>
                    {category.label} · {project.year}
                  </p>
                  <h4 className={styles.miniTitle}>
                    <button
                      type="button"
                      className={styles.stretch}
                      onClick={() => openProject(project.slug)}
                    >
                      {project.title}
                    </button>
                  </h4>
                  <p className={styles.miniTagline}>{project.tagline}</p>
                  {project.links.live && (
                    <a className={styles.raised} href={project.links.live} target="_blank" rel="noreferrer">
                      Live demo ↗
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
    </div>
  );
}
