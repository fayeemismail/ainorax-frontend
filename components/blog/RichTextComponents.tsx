import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { PortableTextComponents } from "@portabletext/react";

export const RichTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value) return null;
      return (
        <div className="relative w-full h-80 md:h-[500px] my-12 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <Image
            src={urlFor(value).url()}
            alt="Blog Post Context Image"
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-6 py-4 list-disc space-y-3 opacity-90 text-lg md:text-xl font-sans text-white/80">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="ml-6 py-4 list-decimal space-y-3 opacity-90 text-lg md:text-xl font-sans text-white/80">
        {children}
      </ol>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl font-black mb-8 mt-16 tracking-tight text-white !font-['Syne',sans-serif]">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-14 tracking-tight text-white !font-['Syne',sans-serif]">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl md:text-3xl font-bold mb-6 mt-12 tracking-tight text-white !font-['Syne',sans-serif]">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl md:text-2xl font-bold mb-4 mt-10 tracking-tight text-white !font-['Syne',sans-serif]">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-l-[#818cf8] pl-6 py-6 my-10 bg-[#818cf8]/5 rounded-r-2xl border border-white/5 backdrop-blur-sm">
        <div className="text-xl md:text-2xl italic font-medium opacity-90 text-white/90 leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-8 text-lg md:text-xl leading-[1.8] opacity-80 text-white/80 font-sans tracking-wide">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-white opacity-100">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic opacity-90">{children}</em>
    ),
    link: ({ children, value }: any) => {
      const rel = !value.href?.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className="text-[#818cf8] underline decoration-[#818cf8]/40 decoration-2 underline-offset-4 hover:decoration-[#818cf8] transition-all duration-300 font-medium"
        >
          {children}
        </Link>
      );
    },
  },
};
