import { useCallback, useEffect, useMemo, useState } from "react";

import { About } from "./components/About/About";
import { CommandPalette } from "./components/CommandPalette/CommandPalette";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { ProjectDrawer } from "./components/ProjectDrawer/ProjectDrawer";
import { Terminal } from "./components/Terminal/Terminal";
import { Work } from "./components/Work/Work";
import { UIContext } from "./context/ui";
import { projectBySlug } from "./data/projects";

const readProjectFromUrl = () => {
  const slug = new URLSearchParams(window.location.search).get("project");
  return slug && projectBySlug[slug] ? slug : null;
};

const writeProjectToUrl = (slug) => {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set("project", slug);
  else url.searchParams.delete("project");
  window.history.replaceState(null, "", url);
};

const isTypingTarget = (element) =>
  element instanceof HTMLElement &&
  (element.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName));

function App() {
  const [activeSlug, setActiveSlug] = useState(readProjectFromUrl);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const openProject = useCallback((slug) => {
    if (!projectBySlug[slug]) return;
    setPaletteOpen(false);
    setTerminalOpen(false);
    setActiveSlug(slug);
    writeProjectToUrl(slug);
  }, []);

  const closeProject = useCallback(() => {
    setActiveSlug(null);
    writeProjectToUrl(null);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setTerminalOpen(false);
        setPaletteOpen((open) => !open);
        return;
      }
      if (
        (event.key === "`" || event.key === "~") &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isTypingTarget(event.target) &&
        !document.querySelector("dialog[open]")
      ) {
        event.preventDefault();
        setTerminalOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const ui = useMemo(
    () => ({
      openProject,
      openPalette: () => {
        setTerminalOpen(false);
        setPaletteOpen(true);
      },
      openTerminal: () => {
        setPaletteOpen(false);
        setTerminalOpen(true);
      },
    }),
    [openProject],
  );

  return (
    <UIContext.Provider value={ui}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <ProjectDrawer
        slug={activeSlug}
        onClose={closeProject}
        onNavigate={openProject}
      />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </UIContext.Provider>
  );
}

export default App;
