import { useEffect, useState } from "react";

import { useReducedMotion } from "../../hooks/hooks";
import styles from "./visuals.module.css";

const CODE = [
  ["k", "class "], ["t", "Solution"], ["p", " {"],
  null,
  ["s", "  "], ["f", "twoSum"], ["p", "(nums, target) {"],
  null,
  ["s", "    "], ["k", "const "], ["p", "seen = "], ["k", "new "], ["t", "Map"], ["p", "();"],
  null,
  ["s", "    "], ["k", "for "], ["p", "("], ["k", "let "], ["p", "i = "], ["n", "0"], ["p", "; i < nums.length; i++) {"],
  null,
  ["s", "      "], ["k", "if "], ["p", "(seen.has(target - nums[i]))"],
  null,
  ["s", "        "], ["k", "return "], ["p", "[seen.get(target - nums[i]), i];"],
  null,
  ["s", "      "], ["p", "seen.set(nums[i], i);"],
  null,
  ["s", "    "], ["p", "}"],
  null,
  ["s", "  "], ["p", "}"],
  null,
  ["p", "}"],
];

const lines = CODE.reduce(
  (all, token) => {
    if (token === null) all.push([]);
    else all[all.length - 1].push(token);
    return all;
  },
  [[]],
);

const PLAYERS = [
  { name: "you", elo: 1342, solved: 3, color: "var(--cyan)" },
  { name: "aarav", elo: 1288, solved: 2, color: "var(--violet)" },
  { name: "meera", elo: 1410, solved: 2, color: "var(--pink)" },
  { name: "kabir", elo: 1201, solved: 1, color: "var(--mint)" },
];

export function CodeBattleVisual() {
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(reduceMotion ? lines.length : 3);

  useEffect(() => {
    if (reduceMotion) {
      setShown(lines.length);
      return undefined;
    }
    const timer = setInterval(
      () => setShown((value) => (value >= lines.length + 4 ? 3 : value + 1)),
      520,
    );
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const accepted = shown >= lines.length;

  return (
    <div className={styles.battle} aria-hidden="true">
      <div className={styles.editor}>
        <div className={styles.editorBar}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span>solution.js</span>
          <span className={styles.timer}>04:12</span>
        </div>
        <pre className={styles.code}>
          {lines.slice(0, Math.min(shown, lines.length)).map((line, index) => (
            <span key={index} className={styles.line}>
              <span className={styles.gutter}>{index + 1}</span>
              {line.map(([kind, text], tokenIndex) => (
                <span key={tokenIndex} className={styles[`tok_${kind}`]}>
                  {text}
                </span>
              ))}
              {index === Math.min(shown, lines.length) - 1 && !accepted && (
                <span className={styles.caret} />
              )}
            </span>
          ))}
        </pre>
        <div className={`${styles.verdict} ${accepted ? styles.verdictShow : ""}`}>
          ✓ Accepted · 42 / 42 hidden tests
        </div>
      </div>

      <div className={styles.board}>
        <div className={styles.boardHead}>
          <span>Scoreboard</span>
          <span className={styles.liveDot}>LIVE</span>
        </div>
        <ol>
          {PLAYERS.map((player) => (
            <li key={player.name}>
              <span className={styles.avatar} style={{ background: player.color }}>
                {player.name[0].toUpperCase()}
              </span>
              <span className={styles.player}>{player.name}</span>
              <span className={styles.solved}>
                {Array.from({ length: 3 }, (_, dot) => (
                  <i key={dot} data-on={dot < player.solved} />
                ))}
              </span>
              <span className={styles.elo}>{player.elo}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
