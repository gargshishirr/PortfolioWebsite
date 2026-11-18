import { useEffect, useRef } from "react";

import { createLife } from "./life";
import styles from "./Pond.module.css";
import { createWater } from "./water";

const INTERACTIVE = "a, button, input, select, textarea, label, [role='button']";

export function Pond({ fish = "auto", pads = "edges", ambient = true, className = "" }) {
  const wrapRef = useRef(null);
  const waterRef = useRef(null);
  const lifeRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const surface = wrap.parentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const water = createWater(waterRef.current);
    const life = createLife(lifeRef.current, { fish, pads, ambient });
    if (!water) wrap.classList.add(styles.fallback);

    let frame = 0;
    let visible = false;
    let last = 0;
    let clock = 0;

    const now = () => clock;

    const render = () => {
      water?.draw(clock);
      life.draw();
    };

    const loop = (stamp) => {
      const dt = Math.min(0.05, last ? (stamp - last) / 1000 : 0.016);
      last = stamp;
      clock += dt;
      life.update(dt, clock);
      render();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (motion.matches) render();
      else if (visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      water?.resize(width, height, ratio * 0.5);
      life.resize(width, height, ratio);
      if (motion.matches || !visible) render();
    };

    resize();
    life.warmUp(2);
    render();

    const local = (event) => {
      const rect = wrap.getBoundingClientRect();
      return [event.clientX - rect.left, event.clientY - rect.top];
    };
    const onMove = (event) => {
      if (motion.matches) return;
      const [x, y] = local(event);
      life.pointerMove(x, y, now(), event.pointerType);
    };
    const onDown = (event) => {
      if (motion.matches || event.target.closest(INTERACTIVE)) return;
      const [x, y] = local(event);
      life.tap(x, y, now());
    };
    const onLeave = () => life.pointerLeave();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    visibility.observe(wrap);
    const onVisibility = () => start();
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", start);
    surface.addEventListener("pointermove", onMove, { passive: true });
    surface.addEventListener("pointerdown", onDown, { passive: true });
    surface.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", start);
      surface.removeEventListener("pointermove", onMove);
      surface.removeEventListener("pointerdown", onDown);
      surface.removeEventListener("pointerleave", onLeave);
      water?.destroy();
    };
  }, [fish, pads, ambient]);

  return (
    <div ref={wrapRef} className={`${styles.pond} ${className}`} aria-hidden="true">
      <canvas ref={waterRef} className={styles.layer} />
      <canvas ref={lifeRef} className={styles.layer} />
    </div>
  );
}
