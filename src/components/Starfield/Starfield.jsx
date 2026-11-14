import { useEffect, useRef } from "react";

import styles from "./Starfield.module.css";

const TINTS = ["255,255,255", "190,240,255", "215,200,255", "255,215,230"];

function createStars(width, height) {
  const count = Math.min(280, Math.round((width * height) / 7000));
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    depth: 0.15 + Math.random() * 0.85,
    radius: 0.3 + Math.random() * 1.1,
    phase: Math.random() * Math.PI * 2,
    speed: 0.4 + Math.random() * 1.4,
    tint: TINTS[Math.floor(Math.random() * TINTS.length)],
  }));
}

export function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let stars = [];
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let easedX = 0;
    let easedY = 0;
    let meteor = null;
    let nextMeteor = performance.now() + 4000;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = createStars(width, height);
    };

    const draw = (time) => {
      context.clearRect(0, 0, width, height);
      easedX += (pointerX - easedX) * 0.04;
      easedY += (pointerY - easedY) * 0.04;
      const scroll = window.scrollY;
      const animate = !motion.matches;

      for (const star of stars) {
        const shift = star.depth * star.depth;
        let x = star.x - easedX * 18 * shift;
        let y = star.y - scroll * 0.12 * shift - easedY * 18 * shift;
        x = ((x % width) + width) % width;
        y = ((y % height) + height) % height;
        const twinkle = animate ? 0.55 + 0.45 * Math.sin(time * 0.001 * star.speed + star.phase) : 0.8;
        context.globalAlpha = (0.25 + 0.75 * star.depth) * twinkle;
        context.fillStyle = `rgb(${star.tint})`;
        context.beginPath();
        context.arc(x, y, star.radius * (0.6 + star.depth * 0.7), 0, Math.PI * 2);
        context.fill();
      }

      if (animate) {
        if (!meteor && time > nextMeteor) {
          meteor = {
            x: Math.random() * width * 0.7 + width * 0.3,
            y: Math.random() * height * 0.35,
            life: 0,
          };
        }
        if (meteor) {
          meteor.life += 1;
          const progress = meteor.life / 60;
          const headX = meteor.x - progress * 420;
          const headY = meteor.y + progress * 200;
          const gradient = context.createLinearGradient(headX, headY, headX + 120, headY - 57);
          gradient.addColorStop(0, "rgba(255,255,255,0.9)");
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          context.globalAlpha = Math.sin(Math.PI * progress);
          context.strokeStyle = gradient;
          context.lineWidth = 1.4;
          context.beginPath();
          context.moveTo(headX, headY);
          context.lineTo(headX + 120, headY - 57);
          context.stroke();
          if (progress >= 1) {
            meteor = null;
            nextMeteor = time + 7000 + Math.random() * 9000;
          }
        }
      }
      context.globalAlpha = 1;
    };

    const loop = (time) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (motion.matches) draw(0);
      else frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (event) => {
      pointerX = event.clientX / width - 0.5;
      pointerY = event.clientY / height - 0.5;
    };
    const onScroll = () => {
      if (motion.matches) draw(0);
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else start();
    };
    const onResize = () => {
      resize();
      if (motion.matches) draw(0);
    };

    resize();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", start);
    };
  }, []);

  return (
    <div className={styles.sky} aria-hidden="true">
      <div className={styles.nebula} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
