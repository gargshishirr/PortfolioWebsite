import { useEffect, useState } from "react";

import { useReducedMotion } from "../../hooks/hooks";
import styles from "./visuals.module.css";

const DECISIONS = [
  { verdict: "ELIGIBLE", ok: true, ms: "2.6" },
  { verdict: "PACING_THROTTLED", ok: false, ms: "2.9" },
  { verdict: "ELIGIBLE", ok: true, ms: "3.1" },
  { verdict: "SPEND_DATA_STALE", ok: false, ms: "2.2" },
  { verdict: "ELIGIBLE", ok: true, ms: "2.7" },
  { verdict: "POLICY_NEGATIVE_KEYWORD", ok: false, ms: "2.4" },
  { verdict: "BUDGET_EXHAUSTED", ok: false, ms: "3.0" },
  { verdict: "ELIGIBLE", ok: true, ms: "2.5" },
  { verdict: "TRAFFIC_RATE_EXCEEDED", ok: false, ms: "2.8" },
];


export function AdGateVisual() {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = setInterval(() => setTick((value) => value + 1), 1400);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const rows = Array.from({ length: 4 }, (_, index) => {
    const position = (tick + index) % DECISIONS.length;
    return { ...DECISIONS[position], id: tick + index };
  }).reverse();

  return (
    <div className={styles.adgate} aria-hidden="true">
      <div className={styles.pipeline}>
        {["request", "gate", "redis", "decision"].map((stage, index) => (
          <div key={stage} className={styles.stage} style={{ "--i": index }}>
            <span className={styles.node} />
            <span>{stage}</span>
          </div>
        ))}
        <span className={styles.packet} />
      </div>

      <ol className={styles.log}>
        {rows.map((row) => (
          <li key={row.id} className={row.ok ? styles.ok : styles.declined}>
            <span className={styles.badge}>{row.ok ? "SERVE" : "DECLINE"}</span>
            <code>{row.verdict}</code>
            <span className={styles.ms}>{row.ms} ms</span>
          </li>
        ))}
      </ol>

    </div>
  );
}
