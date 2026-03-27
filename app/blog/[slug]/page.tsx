import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getBlogPostBySlug } from "@/lib/queries/blog/blogData";
import { getBlogPageData } from "@/lib/queries/blog/blogPageData";
import { getTheme } from "@/lib/queries/colorPalettQuery";
import { urlFor } from "@/lib/sanity";
import { RichTextComponents } from "@/components/blog/RichTextComponents";
import { notFound } from "next/navigation";

// Utility for dynamic tailwind vs hex resolution
const resolveColor = (color: string | undefined, type: "bg" | "text", fallback: string) => {
  if (!color) return { css: {}, class: fallback };
  const isHex = color.startsWith("#") || color.startsWith("rgb");
  return isHex ? { css: { [type === "bg" ? "backgroundColor" : "color"]: color }, class: "" } : { css: {}, class: color };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  return {
    title: post ? `${post.title} | Ainorax Blog` : 'Blog | Ainorax',
    description: post?.excerpt || 'Read our latest insights.',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const [post, pageData, theme] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPageData(),
    getTheme()
  ]);

  if (!post) {
    notFound();
  }

  // Fallback to blogPage settings
  const p = pageData || {};
  const c = p.colors || {};
  const h = p.hero || {};

  // Default to global theme background if no explicit override is provided in Blog Page Settings
  const globalBgHex = theme?.background?.homebg || "#0a0a0a";
  const bg = c.backgroundColor ? resolveColor(c.backgroundColor, "bg", "") : { css: { backgroundColor: globalBgHex }, class: "" };
  
  const text = resolveColor(c.textColor, "text", "text-white");
  const accent = resolveColor(c.accentColor, "text", "text-[#818cf8]");

  return (
    <main 
      style={bg.css}
      className={`min-h-screen relative pb-32 pt-32 ${bg.class}`}
    >
      {/* Ambient background glow from Blog Page Settings */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none opacity-30 mix-blend-screen">
        {h.glowColorLeft && (
          <div 
            className="absolute -top-40 left-1/4 w-[800px] h-[800px] rounded-full blur-[120px]" 
            style={{ background: h.glowColorLeft }} 
          />
        )}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 shrink-0">
        
        {/* Back Button */}
        <Link 
          href="/blog" 
          style={accent.css}
          className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity duration-300 mb-16 group ${accent.class}`}
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-2" />
          Back to Insights
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {post.categories.map((cat, i) => (
                <span 
                  key={i} 
                  style={text.css}
                  className={`px-4 py-1.5 bg-white/10 backdrop-blur-xl text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10 ${text.class}`}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 
            style={text.css}
            className={`text-4xl md:text-5xl lg:text-7xl font-black mb-10 tracking-tight leading-[1.05] !font-['Syne',sans-serif] ${text.class}`}
          >
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-8 text-xs font-black uppercase tracking-[0.2em] opacity-60 border-t border-b border-white/10 py-6" style={text.css}>
            {post.publishedAt && (
              <span className={`flex items-center gap-2 ${text.class}`}>
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            )}
            {post.author && (
              <span className={`flex items-center gap-2 ${text.class}`}>
                <User className="w-4 h-4" />
                {post.author}
              </span>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="relative w-full h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden mb-20 shadow-2xl border border-white/10 group">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        {/* Content Body */}
        <article className="max-w-3xl mx-auto">
          {post.body ? (
            <div className={text.class} style={text.css}>
              <PortableText
                value={post.body}
                components={RichTextComponents}
              />
            </div>
          ) : (
            <p className={`text-xl opacity-60 ${text.class}`} style={text.css}>No content available for this post.</p>
          )}
        </article>

      </div>
    </main>
  );
}
