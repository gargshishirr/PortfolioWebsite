import { useUI } from "../../context/ui";
import { skillGroups } from "../../data/skills";
import { Reveal } from "../common/Reveal";
import styles from "./Toolbox.module.css";

const ACCENTS = ["var(--cyan)", "var(--violet)", "var(--mint)", "var(--pink)", "var(--amber)"];

export function Toolbox() {
  const { focusSkill } = useUI();

  return (
    <section className="section" id="toolbox" aria-labelledby="toolbox-title">
      <div className="page">
        <Reveal className="section-head">
          <p className="eyebrow">Toolbox</p>
          <h2 id="toolbox-title" className="section-title">
            The stack, <span className="gradient-text">linked to the proof.</span>
          </h2>
          <p className="section-lead">
            Click any technology with a count to light up every project in the
            constellation that uses it.
          </p>
        </Reveal>

        <div className={styles.groups}>
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index * 70}
              className={styles.group}
              style={{ "--accent": ACCENTS[index % ACCENTS.length] }}
            >
              <h3>{group.title}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    {skill.count > 0 ? (
                      <button
                        type="button"
                        className={styles.skill}
                        onClick={() => focusSkill(skill.name)}
                        aria-label={`${skill.name}: show ${skill.count} project${skill.count === 1 ? "" : "s"}`}
                      >
                        {skill.name}
                        <span aria-hidden="true">{skill.count}</span>
                      </button>
                    ) : (
                      <span className={`${styles.skill} ${styles.plain}`}>{skill.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
