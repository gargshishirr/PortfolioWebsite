import { useEffect, useRef, useState } from "react";

import { scrollToSection, useUI } from "../../context/ui";
import { complete, run, welcome } from "./commands";
import styles from "./Terminal.module.css";

const PROMPT = "guest@shishir:~$";

export function Terminal({ open, onClose }) {
  const { openProject } = useUI();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const [lines, setLines] = useState(welcome);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [lines]);

  const submit = () => {
    const command = value;
    setValue("");
    setCursor(-1);
    if (command.trim()) setHistory((items) => [command, ...items].slice(0, 50));

    const result = run(command, {
      openProject: (slug) => openProject(slug),
      goto: (id) => {
        onClose();
        requestAnimationFrame(() => scrollToSection(id));
      },
      close: onClose,
    });

    if (result === "clear") {
      setLines([]);
      return;
    }
    setLines((current) => [...current, [{ text: PROMPT, tone: "mint" }, { text: ` ${command}` }], ...result]);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    } else if (event.key === "Tab") {
      event.preventDefault();
      const completion = complete(value);
      if (completion) setValue(completion);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next] !== undefined) {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setValue(next >= 0 ? history[next] : "");
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Terminal"
      onClose={() => open && onClose()}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <span className={styles.lights}>
            <button type="button" onClick={onClose} aria-label="Close terminal" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </span>
          <span className={styles.title}>guest@shishir.sh — zsh</span>
          <span className={styles.escHint}>esc to close</span>
        </div>

        <div
          ref={outputRef}
          className={styles.output}
          onClick={() => inputRef.current?.focus()}
          role="presentation"
        >
          <div role="log" aria-live="polite" aria-label="Terminal output">
            {lines.map((line, index) =>
              Array.isArray(line) ? (
                <p key={index} className={styles.line}>
                  {line.map((segment, segmentIndex) => (
                    <span key={segmentIndex} className={segment.tone ? styles[segment.tone] : undefined}>
                      {segment.text}
                    </span>
                  ))}
                  {!line.length && " "}
                </p>
              ) : (
                <p
                  key={index}
                  className={`${styles.row} ${styles.indent}`}
                  style={{ gridTemplateColumns: line.columns }}
                >
                  {line.cells.map((cell, cellIndex) => (
                    <span key={cellIndex} className={cell.tone ? styles[cell.tone] : undefined}>
                      {cell.text}
                    </span>
                  ))}
                </p>
              ),
            )}
          </div>

          <form
            className={styles.inputLine}
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <label htmlFor="terminal-input" className={styles.prompt}>
              {PROMPT}
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              aria-describedby="terminal-help"
            />
          </form>
          <p id="terminal-help" className="visually-hidden">
            Type help and press Enter to list commands. Use Tab to autocomplete and arrow keys for history.
          </p>
        </div>
      </div>
    </dialog>
  );
}
