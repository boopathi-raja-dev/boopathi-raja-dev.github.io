import { createFileRoute } from "@tanstack/react-router";
import { About } from "~/components/sections/About";
import { Contact } from "~/components/sections/Contact";
import { Experience } from "~/components/sections/Experience";
import { Hero } from "~/components/sections/Hero";
import { Projects } from "~/components/sections/Projects";
import { ProofStrip } from "~/components/sections/ProofStrip";
import { Skills } from "~/components/sections/Skills";
import { WorkCards } from "~/components/sections/WorkCards";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <WorkCards />
      <Projects />
      <Skills />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
