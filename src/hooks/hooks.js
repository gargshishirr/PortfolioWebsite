import { useEffect, useRef, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export function useReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const key = ids.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return undefined;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let best = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        });
        setActive(best);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75], rootMargin: "-30% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
