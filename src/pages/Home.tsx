import { useMemo, useState } from "react";
import { nav } from "../data/site";
import { useActiveSection } from "../hooks/useActiveSection";
import { Header } from "../components/layout/Header";
import { Preloader } from "../components/layout/Preloader";
import { StatusBar, EdgeLines } from "../components/layout/StatusBar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { TechBand } from "../components/sections/TechBand";
import { FeaturedWork } from "../components/sections/FeaturedWork";
import { MoreProjects } from "../components/sections/MoreProjects";
import { Lab } from "../components/sections/Lab";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";

/** Session flag so the preloader plays once, not on every route return. */
let preloaderPlayed = false;

export default function Home() {
  const sectionIds = useMemo(() => ["top", ...nav.map((n) => n.href.slice(1))], []);
  const active = useActiveSection(sectionIds);
  const [ready, setReady] = useState(preloaderPlayed);

  return (
    <div className={`noise ${ready ? "" : "preloading"}`}>
      {!ready && (
        <Preloader
          onDone={() => {
            preloaderPlayed = true;
            setReady(true);
          }}
        />
      )}
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
