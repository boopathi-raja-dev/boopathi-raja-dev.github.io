import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "~/components/sections/Contact";
import { ExperienceAbout } from "~/components/sections/ExperienceAbout";
import { Hero } from "~/components/sections/Hero";
import { Projects } from "~/components/sections/Projects";
import { ProofStrip } from "~/components/sections/ProofStrip";
import { Skills } from "~/components/sections/Skills";
import { WorkCards } from "~/components/sections/WorkCards";
import { canonical, personJsonLd } from "~/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [canonical("/")],
    scripts: [{ type: "application/ld+json", children: personJsonLd() }],
  }),
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
      <ExperienceAbout />
      <Contact />
    </>
  );
}
