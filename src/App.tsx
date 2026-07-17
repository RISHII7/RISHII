import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true });
    return () => lenis.destroy();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/:slug" element={<ProjectPage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
    </Routes>
  );
}
