import React from "react";
import { getAboutData } from "@/lib/queries/about/aboutData";
import { getTheme } from "@/lib/queries/colorPalettQuery";
import AboutHero from "@/components/about/AboutHero";
import AboutContent from "@/components/about/AboutContent";

export default async function AboutPage() {
  const [aboutData, theme] = await Promise.all([
    getAboutData().catch(() => null),
    getTheme().catch(() => null),
  ]);

  const bg = theme?.background?.homebg || "#080a0f";

  return (
    <main style={{ background: bg }} className="min-h-screen">
      <AboutHero heroData={aboutData?.hero} />
      <AboutContent
        mission={aboutData?.mission}
        vision={aboutData?.vision}
        values={aboutData?.values}
        projects={aboutData?.projects}
        stats={aboutData?.stats}
        finalCTA={aboutData?.finalCTA}
      />
    </main>
  );
}
