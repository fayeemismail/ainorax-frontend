"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { urlFor } from "@/lib/sanity";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  publishedAt?: string;
  excerpt?: string;
  author?: string;
  categories?: string[];
}

interface BlogSectionProps {
  data: {
    isEnabled?: boolean;
    heading?: string;
    subheading?: string;
    selectedPosts?: BlogPost[];
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    cardBackgroundColor?: string;
    cardTextColor?: string;
    readMoreLabel?: string;
    viewAllLabel?: string;
  };
}

const resolveColor = (color: string, type: "bg" | "text") => {
  if (!color) return {};
  const isHex = color.startsWith("#") || color.startsWith("rgb");
  if (isHex) {
    return { [type === "bg" ? "backgroundColor" : "color"]: color };
  }
  return {};
};

const BlogSection: React.FC<BlogSectionProps> = ({ data }) => {
  const {
    isEnabled = true,
    heading = "Latest Insights",
    subheading = "Stay updated with our latest thoughts and industry trends.",
    selectedPosts = [],
    backgroundColor = "bg-white",
    textColor = "text-gray-900",
    accentColor = "text-blue-600",
    cardBackgroundColor = "bg-white/10",
    cardTextColor,
    readMoreLabel = "Read Article",
    viewAllLabel = "Explore All News",
  } = data;

  if (!isEnabled) return null;

  const bgStyle = resolveColor(backgroundColor, "bg");
  const textStyle = resolveColor(textColor, "text");
  const accentStyle = resolveColor(accentColor, "text");

  const cardBgStyle = resolveColor(cardBackgroundColor, "bg");
  const cardTextStyle = resolveColor(cardTextColor || textColor, "text");

  const isTailwindBg = !backgroundColor?.startsWith("#") && !backgroundColor?.startsWith("rgb");
  const isTailwindText = !textColor?.startsWith("#") && !textColor?.startsWith("rgb");
  const isTailwindAccent = !accentColor?.startsWith("#") && !accentColor?.startsWith("rgb");

  const isTailwindCardBg = !cardBackgroundColor?.startsWith("#") && !cardBackgroundColor?.startsWith("rgb");
  const isTailwindCardText = !cardTextColor?.startsWith("#") && !cardTextColor?.startsWith("rgb");

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section 
      style={bgStyle}
      className={`py-24 ${isTailwindBg ? backgroundColor : ""} relative overflow-hidden`}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={accentStyle}
              className={`inline-block mb-4 text-sm font-bold tracking-widest uppercase ${isTailwindAccent ? accentColor : ""}`}
            >
              Our Blog
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={textStyle}
              className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${isTailwindText ? textColor : ""}`}
            >
              {heading}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={textStyle}
              className={`text-lg opacity-80 ${isTailwindText ? textColor : ""}`}
            >
              {subheading}
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/blog" 
              style={accentStyle}
              className={`group flex items-center gap-2 font-semibold hover:gap-3 transition-all duration-300 ${isTailwindAccent ? accentColor : ""}`}
            >
              {viewAllLabel} <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {selectedPosts.map((post) => (
            <motion.article 
              key={post._id} 
              variants={itemVariants}
              style={cardBgStyle}
              className={`group backdrop-blur-sm border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full ${isTailwindCardBg ? cardBackgroundColor : ""}`}
            >
              <div className="relative h-64 w-full overflow-hidden">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {post.categories && post.categories.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {post.categories.slice(0, 2).map((cat, i) => (
                      <span key={i} className="px-3 py-1 bg-white/90 backdrop-blur-md text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-xs font-medium opacity-60 uppercase tracking-wider">
                  {post.publishedAt && (
                    <span className="flex items-center gap-1" style={cardTextStyle}>
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                  {post.author && (
                    <span className="flex items-center gap-1" style={cardTextStyle}>
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                  )}
                </div>

                <h3 
                  style={cardTextStyle}
                  className={`text-2xl font-bold mb-4 line-clamp-2 leading-tight transition-colors duration-300 ${isTailwindCardText ? (cardTextColor || textColor) : ""}`}
                >
                  <Link href={`/blog/${post.slug.current}`}>
                    {post.title}
                  </Link>
                </h3>

                <p 
                  style={cardTextStyle}
                  className={`opacity-70 line-clamp-3 mb-6 flex-grow ${isTailwindCardText ? (cardTextColor || textColor) : ""}`}
                >
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <Link 
                    href={`/blog/${post.slug.current}`}
                    style={accentStyle}
                    className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-3 transition-all duration-300 ${isTailwindAccent ? accentColor : ""}`}
                  >
                    {readMoreLabel} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
