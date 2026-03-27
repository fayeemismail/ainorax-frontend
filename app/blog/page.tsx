import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getAllBlogPosts } from "@/lib/queries/blog/blogData";
import { getBlogPageData } from "@/lib/queries/blog/blogPageData";
import { getTheme } from "@/lib/queries/colorPalettQuery";
import { urlFor } from "@/lib/sanity";

// Utility for dynamic tailwind vs hex resolution
const resolveColor = (color: string | undefined, type: "bg" | "text", fallback: string) => {
  if (!color) return { css: {}, class: fallback };
  const isHex = color.startsWith("#") || color.startsWith("rgb");
  return isHex ? { css: { [type === "bg" ? "backgroundColor" : "color"]: color }, class: "" } : { css: {}, class: color };
};

export async function generateMetadata() {
  const pageData = await getBlogPageData();
  return {
    title: pageData?.seo?.title || 'Blog | Ainorax',
    description: pageData?.seo?.description || 'Explore our latest insights.',
  };
}

export default async function BlogListingPage() {
  const [posts, pageData, theme] = await Promise.all([
    getAllBlogPosts(),
    getBlogPageData(),
    getTheme()
  ]);

  // Fallbacks
  const p = pageData || {};
  const c = p.colors || {};
  const h = p.hero || {};
  const ui = p.ui || {};

  // Default to global theme background if no explicit override is provided in Blog Page Settings
  const globalBgHex = theme?.background?.homebg || "#0a0a0a";
  const bg = c.backgroundColor ? resolveColor(c.backgroundColor, "bg", "") : { css: { backgroundColor: globalBgHex }, class: "" };
  
  const text = resolveColor(c.textColor, "text", "text-white");
  const accent = resolveColor(c.accentColor, "text", "text-[#818cf8]");
  const cardBg = resolveColor(c.cardBackgroundColor, "bg", "bg-white/5");
  const cardText = resolveColor(c.cardTextColor || c.textColor, "text", "text-white");

  return (
    <main 
      style={bg.css}
      className={`min-h-screen relative pb-32 ${bg.class}`}
    >
      {/* Dynamic Ambient Hero */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
          {h.glowColorLeft && (
            <div 
              className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]" 
              style={{ background: h.glowColorLeft }}
            />
          )}
          {h.glowColorRight && (
            <div 
              className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]" 
              style={{ background: h.glowColorRight }}
            />
          )}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <h1 
            style={text.css}
            className={`text-6xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter ${text.class} !font-['Syne',sans-serif]`}
          >
            {h.heading || "Our Insights"}
          </h1>
          <p 
            style={text.css}
            className={`text-lg md:text-xl opacity-70 max-w-3xl mx-auto font-sans leading-relaxed ${text.class}`}
          >
            {h.subheading || "Stay updated with our latest thoughts, industry trends, and deep dives into the technology shaping tomorrow."}
          </p>
        </div>
      </section>

      {/* Dynamic Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-24">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className={`text-3xl opacity-50 font-bold !font-['Syne',sans-serif] ${text.class}`}>{ui.emptyStateMessage || "No posts found."}</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <article 
                key={post._id} 
                style={cardBg.css}
                className={`group relative flex flex-col h-full rounded-3xl overflow-hidden border border-white/5 backdrop-blur-md hover:border-white/20 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 ${cardBg.class}`}
              >
                <div className="relative h-72 w-full overflow-hidden">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900/50 flex items-center justify-center">
                      <span className="text-slate-500 font-medium tracking-widest uppercase text-[10px]">No Image</span>
                    </div>
                  )}
                  
                  {/* Dynamic Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Tags */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map((cat, i) => (
                        <span key={i} className="px-4 py-1.5 bg-white/10 backdrop-blur-xl text-white text-[9px] font-black uppercase tracking-[0.15em] rounded-full border border-white/20">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-10 flex flex-col flex-grow relative z-10">
                  <div className="flex items-center gap-6 mb-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-50" style={cardText.css}>
                    {post.publishedAt && (
                      <span className={`flex items-center gap-2 ${cardText.class}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                    {post.author && (
                      <span className={`flex items-center gap-2 ${cardText.class}`}>
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                    )}
                  </div>

                  <h3 
                    style={cardText.css}
                    className={`text-2xl lg:text-3xl font-bold mb-6 line-clamp-2 leading-[1.25] transition-colors duration-500 !font-['Syne',sans-serif] ${cardText.class}`}
                  >
                    <Link href={`/blog/${post.slug.current}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p 
                    style={cardText.css}
                    className={`opacity-70 text-base leading-relaxed line-clamp-3 mb-10 flex-grow font-sans ${cardText.class}`}
                  >
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <Link 
                      href={`/blog/${post.slug.current}`}
                      style={accent.css}
                      className={`inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] group/btn transition-all duration-300 ${accent.class}`}
                    >
                      {ui.readMoreLabel || "Read Full Story"}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
