import Hero from "@/components/home/Hero";
import Services from "@/components/home/services/index";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BlogSection from "@/components/home/BlogSection";
import { getTheme } from "@/lib/queries/colorPalettQuery";
import { getServices } from "@/lib/queries/home/serviceData";
import { getWhyChooseUsData } from "@/lib/queries/home/whyChooseUsData";
import { getBlogData } from "@/lib/queries/home/blogData";

export default async function Home() {
  const [theme, servicesData, whyChooseUsData, blogResponse] = await Promise.all([
    getTheme(),
    getServices(),
    getWhyChooseUsData(),
    getBlogData(),
  ]);

  const blogData = blogResponse?.blog;
  const bg = theme.background.homebg || "#fff";

  return (
    <main style={{ background: bg }} className="min-h-screen">
      <Hero />
      <Services data={servicesData} />
      <WhyChooseUs data={whyChooseUsData} />
      {blogData && <BlogSection data={blogData} />}
    </main>
  );
}