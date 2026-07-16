import { useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { nav } from "./data/site";
import { useActiveSection } from "./hooks/useActiveSection";
import { Header } from "./components/layout/Header";
import { Preloader } from "./components/layout/Preloader";
import { StatusBar, EdgeLines } from "./components/layout/StatusBar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { TechBand } from "./components/sections/TechBand";
import { FeaturedWork } from "./components/sections/FeaturedWork";
import { MoreProjects } from "./components/sections/MoreProjects";
import { Lab } from "./components/sections/Lab";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";

export default function App() {
  const sectionIds = useMemo(() => ["top", ...nav.map((n) => n.href.slice(1))], []);
  const active = useActiveSection(sectionIds);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true });
    return () => lenis.destroy();
  }, []);

  return (
    <div className={`noise ${ready ? "" : "preloading"}`}>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Header active={active === "top" ? "" : active} />
      <main>
        <Hero />
        <TechBand />
        <FeaturedWork />
        <MoreProjects />
        <Lab />
        <About />
        <Contact />
      </main>
      <Footer />
      <StatusBar active={active} />
      <EdgeLines />
      {/* Clearance for the fixed bottom HUD */}
      <div aria-hidden="true" className="h-12" />
    </div>
  );
}
