"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoveLeft, ShieldQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NotFoundData } from "@/lib/queries/notFound";
import { Theme } from "@/lib/queries/colorPalettQuery";

interface NotFoundClientProps {
  data: NotFoundData | null;
  theme: Theme | null;
}

// Enterprise Color Resolver: Maps common brand color strings to their Hex equivalents
// This handles the issue of Tailwind classes being purged when coming from a CMS
const resolveBrandColor = (colorStr: string): string => {
  if (!colorStr) return "";

  // If it's already a Hex, RGB, or RGBA, return it directly
  if (colorStr.startsWith("#") || colorStr.startsWith("rgb") || colorStr.startsWith("rgba")) {
    return colorStr;
  }

  // Common Tailwind Brand Mappings (Enterprise convenience)
  const colorMap: Record<string, string> = {
    "bg-amber-400": "#fbbf24",
    "amber-400": "#fbbf24",
    "bg-amber-500": "#f59e0b",
    "amber-500": "#f59e0b",
    "bg-slate-900": "#0f172a",
    "slate-900": "#0f172a",
    "bg-slate-950": "#020617",
    "slate-950": "#020617",
    "bg-blue-600": "#2563eb",
    "blue-600": "#2563eb",
    "bg-emerald-500": "#10b981",
    "emerald-500": "#10b981",
    "text-white": "#ffffff",
    "white": "#ffffff",
  };

  return colorMap[colorStr.toLowerCase()] || colorStr;
};

export default function NotFoundClient({ data, theme }: NotFoundClientProps) {
  const pathname = usePathname();

  // Page background follows global theme (Static for performance)
  const themeBg = theme?.background?.homebg || "#080a0f";
  const pageBg = resolveBrandColor(themeBg);

  // Card styling from Sanity document (Resolved via Map or direct Value)
  const cardBg = resolveBrandColor(data?.bgColor || "rgba(255, 255, 255, 0.05)");
  const cardTextColor = resolveBrandColor(data?.textColor || "#ffffff");

  // Button styling
  const accentColor = resolveBrandColor(data?.cta?.bgColor || theme?.button?.primary?.bgColor || "#3b82f6");
  const buttonTextColor = resolveBrandColor(data?.cta?.textColor || theme?.button?.primary?.textColor || "#ffffff");

  // Dynamic Messaging
  let dynamicSubheadline = data?.subheadline;
  if (!dynamicSubheadline) {
    if (pathname.startsWith("/service")) {
      dynamicSubheadline = "The service you are looking for might have been moved or is currently being updated to meet our new enterprise standards.";
    } else if (pathname.startsWith("/project")) {
      dynamicSubheadline = "We couldn't locate that specific project in our portfolio. Please check our main projects page.";
    } else {
      dynamicSubheadline = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.";
    }
  }

  const headline = data?.headline || "404 - Page Not Found";

  return (
    <main
      style={{ background: pageBg }}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-6"
    >
      {/* Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{ backgroundColor: accentColor }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[140px] opacity-[0.05]"
        />
        <div
          style={{ backgroundColor: accentColor }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-[0.03]"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl"
        >
          {/* Centered Glass Card - Uses Inline Styles for absolute reliability with CMS data */}
          <div
            style={{
              background: cardBg,
              color: cardTextColor
            }}
            className="rounded-[40px] border border-white/10 backdrop-blur-xl shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] p-10 md:p-16 text-center relative overflow-hidden"
          >
            {/* Decorative Icon */}
            <div className="hidden md:block absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <ShieldQuestion size={180} strokeWidth={1} />
            </div>

            <div className="relative z-10 space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
                  Status Code 404
                </span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl font-bold tracking-tight"
                >
                  {headline.split(" ").map((word, i) => (
                    <span key={i} className={word === "404" ? "" : "opacity-90"}>
                      <span style={word === "404" ? { color: accentColor } : {}}>
                        {word}{" "}
                      </span>
                    </span>
                  ))}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mx-auto max-w-md text-base md:text-lg opacity-40 leading-relaxed font-medium"
                >
                  {dynamicSubheadline}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Link
                  href={data?.cta?.link || "/"}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-4 transition-all active:scale-95 shadow-xl"
                  style={{ backgroundColor: accentColor, color: buttonTextColor }}
                >
                  <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span className="relative z-10 font-bold text-sm tracking-wide">
                    {data?.cta?.label || "Back to Homepage"}
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
