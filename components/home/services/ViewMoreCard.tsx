import Link from "next/link";

const CARD_W = 380;
const CARD_H = 520;

type Props = {
  bg?: string | null;
  textColor?: string | null;
};

export default function ViewMoreCard({ bg, textColor }: Props) {
  return (
    <Link
      href="/services"
      className="group relative flex-none flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40"
      style={{ width: CARD_W, height: CARD_H, background: bg ?? undefined }}
    >
      <div className="absolute w-40 h-40 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-all duration-700" style={{ background: textColor ?? "#ffffff" }} />

      <div
        className="relative flex items-center justify-center w-24 h-24 rounded-full border-2 transition-all duration-500"
        style={{ borderColor: `${textColor ?? "#ffffff"}30` }}
      >
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ borderTopColor: `${textColor ?? "#ffffff"}80` }}
        />
        <svg
          className="w-9 h-9 transition-all duration-300 group-hover:translate-x-1"
          fill="none"
          stroke={textColor ?? "#ffffff"}
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          style={{ opacity: 0.7 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>

      <div className="text-center px-8 relative">
        <p className="font-bold text-xl tracking-wide" style={{ color: textColor ?? "#ffffff" }}>
          View All Services
        </p>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: `${textColor ?? "#ffffff"}70` }}>
          Explore our complete range of capabilities
        </p>
      </div>
    </Link>
  );
}