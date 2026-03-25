"use client";

import { useRef, useEffect, useCallback } from "react";
import { ServicesQueryResult } from "@/lib/queries/home/serviceData";
import ServiceCard from "./ServiceCard";
import ViewMoreCard from "./ViewMoreCard";
import ScrollArrow from "./ScrollArrow";

const CARD_W = 380;

type Props = {
  data: ServicesQueryResult;
};

export default function Services({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  const isSectionInView = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return false;
    const { top, bottom } = section.getBoundingClientRect();
    const vh = window.innerHeight;
    // Section must cover at least 80% of the viewport
    const visibleTop = Math.max(0, top);
    const visibleBottom = Math.min(vh, bottom);
    const visibleHeight = visibleBottom - visibleTop;
    const sectionHeight = bottom - top;
    return visibleHeight / Math.min(sectionHeight, vh) >= 0.8;
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isHovered.current) return;
    if (!isSectionInView()) return; // ← section must be well in view

    const track = scrollRef.current;
    if (!track) return;

    const atStart = track.scrollLeft <= 0;
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;

    if (atStart && e.deltaY < 0) return;
    if (atEnd && e.deltaY > 0) return;

    e.preventDefault();
    track.scrollLeft += e.deltaY * 1.2;
  }, [isSectionInView]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onEnter = () => (isHovered.current = true);
    const onLeave = () => (isHovered.current = false);

    section.addEventListener("wheel", handleWheel, { passive: false });
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("wheel", handleWheel);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [handleWheel]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -(CARD_W + 20) : CARD_W + 20,
      behavior: "smooth",
    });
  };

  const block = data?.services?.[0];
  if (!block) return null;

  const { mainHeading, sectionBg, headingColor, accentColor, viewMoreBg, viewMoreText, services } = block;

  return (
    <section
      ref={sectionRef}
      className="py-20 overflow-hidden"
      style={{ background: sectionBg ?? undefined }}
    >
      {/* Heading + arrows */}
      <div className="flex items-end justify-between px-6 md:px-16 mb-10 gap-4">
        <div>
          {mainHeading && (
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight tracking-tight"
              style={{ color: headingColor ?? undefined }}
            >
              {mainHeading}
            </h2>
          )}
          <div className="mt-3 h-0.5 w-14 rounded-full" style={{ background: accentColor ?? undefined }} />
        </div>
        <div className="flex items-center gap-2">
          <ScrollArrow direction="left" onClick={() => scroll("left")} accentColor={accentColor} />
          <ScrollArrow direction="right" onClick={() => scroll("right")} accentColor={accentColor} />
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-6 md:px-16 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {services?.map((svc) => (
          <ServiceCard
            key={svc._key}
            title={svc.title}
            description={svc.description}
            bgColor={svc.bgColor}
            textColor={svc.textColor}
            image={svc.image}
            items={svc.items}
          />
        ))}
        <ViewMoreCard bg={viewMoreBg} textColor={viewMoreText} />
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-5">
        {[...(services ?? []), { _key: "view-more" }].map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: `${accentColor ?? "#ffffff"}33` }}
          />
        ))}
      </div>
    </section>
  );
}