"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { WhyChooseUsData, WhyChooseUsPoint } from "@/lib/queries/home/whyChooseUsData";

// Utility for resolving custom CMS colors - now allows plain text colors like "black", "blue", "red"
export const resolveColor = (color: string | undefined, type: "bg" | "text" | "border", fallback: string) => {
  if (!color) return { css: {}, class: fallback };
  
  const isHexOrRgb = color.startsWith("#") || color.startsWith("rgb");
  const isNamedColor = /^[a-zA-Z]+$/.test(color); // Catches "black", "white", "blue", etc.

  if (isHexOrRgb || isNamedColor) {
    if (type === "bg") return { css: { backgroundColor: color }, class: "" };
    if (type === "border") return { css: { borderColor: color }, class: "" };
    return { css: { color: color }, class: "" };
  }
  return { css: {}, class: color };
};

// Dynamic Icon Renderer
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  // @ts-ignore - Lucide dynamically exported icons
  const IconComponent = LucideIcons[name] || LucideIcons.CheckCircle;
  return <IconComponent className={className} />;
};

export default function WhyChooseUs({ data }: { data: WhyChooseUsData | null }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animations for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  if (!data || data.isEnabled === false) return null;

  // Resolve styling mapped perfectly to user's flat schema
  // Section background
  const sectionBg = resolveColor(data.sectionBgColor, "bg", "bg-transparent");
  const headingText = resolveColor(data.headingColor, "text", "text-white");
  
  // Card elements
  const cardBgColor = resolveColor(data.bgColor, "bg", "bg-white/5");
  const cardTextColor = resolveColor(data.textColor, "text", "text-white");
  
  // Accents
  const accent = resolveColor(data.accentColor, "text", "text-[#818cf8]");
  
  // Default fallback data if empty in Sanity
  const heading = data.mainHeading || "Why Choose Us?";
  const subheading = data.subheading || "We partner with enterprises to deliver scalable and intelligent solutions.";
  const points = data.points && data.points.length > 0 ? data.points : [
    { _key: "1", title: "End-to-End Solutions", description: "From the first design wireframe to post-launch cloud maintenance, we handle the entire technology lifecycle.", iconName: "Layers" },
    { _key: "2", title: "Forward-Thinking Tech", description: "We don't just use legacy code. By integrating AI, ML, and big data into our development process, we future-proof your business.", iconName: "Cpu" },
    { _key: "3", title: "Business-First Approach", description: "We aren't just coders; we are digital strategists. We build software specifically designed to increase your revenue, efficiency, and market share.", iconName: "TrendingUp" }
  ] as WhyChooseUsPoint[];

  return (
    <section 
      ref={containerRef}
      style={sectionBg.css}
      className={`relative py-32 md:py-48 overflow-hidden border-t border-b border-white/5 ${sectionBg.class}`}
    >
      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        
        {/* Top Header */}
        <div className="max-w-3xl mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 !font-['Syne',sans-serif] leading-[1.05]" style={headingText.css}>
              {heading}
            </h3>
            <p className="text-xl md:text-2xl font-sans leading-relaxed opacity-80 max-w-2xl" style={headingText.css}>
              {subheading}
            </p>
          </motion.div>
        </div>

        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {points.map((point, i) => (
            <motion.div
              key={point._key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
              style={cardBgColor.css}
              className={`group relative flex flex-col p-10 md:p-14 rounded-[2.5rem] border border-white/5 backdrop-blur-md overflow-hidden transition-all duration-700 hover:border-white/20 hover:-translate-y-4 ${cardBgColor.class}`}
            >
              {/* Ambient Hover Glow */}
              <div 
                className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                style={{ background: data.accentColor || "#818cf8" }}
              />

              {/* Icon Container */}
              <div className="relative mb-12 inline-block">
                <div 
                  className="absolute inset-0 blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 scale-150"
                  style={{ background: data.accentColor || "#818cf8" }}
                />
                <DynamicIcon 
                  name={point.iconName} 
                  className={`relative z-10 w-12 h-12 transition-transform duration-500 group-hover:scale-110 ${accent.class}`}
                />
              </div>

              {/* Text Content */}
              <h4 className="text-2xl md:text-3xl font-bold mb-6 !font-['Syne',sans-serif] group-hover:tracking-wider transition-all duration-500" style={cardTextColor.css}>
                {point.title}
              </h4>
              <p className="text-lg opacity-80 leading-[1.8] font-sans flex-grow" style={cardTextColor.css}>
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
