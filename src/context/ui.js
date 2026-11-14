import { createContext, useContext } from "react";

export const UIContext = createContext(null);

export function useUI() {
  const value = useContext(UIContext);
  if (!value) throw new Error("useUI must be used inside UIContext");
  return value;
}

export const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function scrollToSection(id) {
  const target = id === "top" ? document.body : document.getElementById(id);
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  } else {
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
}
