import Hero from "@/components/home/Hero";
import Services from "@/components/home/services/index";
import { getTheme } from "@/lib/queries/colorPalettQuery";
import { getServices } from "@/lib/queries/home/serviceData";

export default async function Home() {
  const [theme, servicesData] = await Promise.all([
    getTheme(),
    getServices(),
  ]);

  const bg = theme.background.homebg || "#fff";

  return (
    <main style={{ background: bg }} className="min-h-screen">
      <Hero />
      <Services data={servicesData} />
    </main>
  );
}