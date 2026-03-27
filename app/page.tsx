import Hero from "@/components/home/Hero";
import Services from "@/components/home/services/index";
import BlogSection from "@/components/home/BlogSection";
import { getTheme } from "@/lib/queries/colorPalettQuery";
import { getServices } from "@/lib/queries/home/serviceData";
import { getBlogData } from "@/lib/queries/home/blogData";

export default async function Home() {
  const [theme, servicesData, blogResponse] = await Promise.all([
    getTheme(),
    getServices(),
    getBlogData(),
  ]);

  const blogData = blogResponse?.blog;
  const bg = theme.background.homebg || "#fff";

  return (
    <main style={{ background: bg }} className="min-h-screen">
      <Hero />
      <Services data={servicesData} />
      {blogData && <BlogSection data={blogData} />}
    </main>
  );
}