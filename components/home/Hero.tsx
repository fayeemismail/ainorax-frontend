import { getHero } from '@/lib/queries/home/heroData'
import ImageCarousel from './ImageCarousel'
import Button from '../common/Button'

// ── Fallback defaults (used only if Sanity returns nothing) ──────────────────
const DEFAULTS = {
  glowLeft:         "rgba(55, 48, 163, 0.20)",
  glowRight:        "rgba(109, 40, 217, 0.15)",
  eyebrowColor:     "#818cf8",
  headlineColor:    "#ffffff",
  headlineAccent:   "linear-gradient(to right, #818cf8, #a78bfa)",
  subheadlineColor: "#94a3b8",
  buttonBg:         "linear-gradient(135deg, #6366f1, #8b5cf6)",
  buttonGlow:       "rgba(99, 102, 241, 0.35)",
} as const

function headlineAccentStyle(value: string) {
  const isGradient = value.trim().startsWith("linear-gradient") ||
                     value.trim().startsWith("radial-gradient")
  if (isGradient) {
    return {
      backgroundImage: value,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
    }
  }
  return { color: value }
}

const Hero = async () => {
  const heroData = await getHero()
  const h = heroData.hero ?? {}

  // ── Merge Sanity values over defaults — Sanity always wins ──────────────────
  const colors = {
    glowLeft:         h.glowLeft         ?? DEFAULTS.glowLeft,
    glowRight:        h.glowRight        ?? DEFAULTS.glowRight,
    eyebrowColor:     h.eyebrowColor     ?? DEFAULTS.eyebrowColor,
    headlineColor:    h.headlineColor    ?? DEFAULTS.headlineColor,
    headlineAccent:   h.headlineAccent   ?? DEFAULTS.headlineAccent,
    subheadlineColor: h.subheadlineColor ?? DEFAULTS.subheadlineColor,
    buttonBg:         h.buttonBg         ?? DEFAULTS.buttonBg,
    buttonGlow:       h.buttonGlow       ?? DEFAULTS.buttonGlow,
  }

  return (
    <section className="relative overflow-hidden">

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 md:w-125 md:h-125 rounded-full blur-[120px]"
          style={{ background: colors.glowLeft }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 md:w-105 md:h-105 rounded-full blur-[100px]"
          style={{ background: colors.glowRight }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-20 md:py-28 lg:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-20">

          {/* ── LEFT: Text content ── */}
          <div className="w-full md:flex-1 flex flex-col items-start">

            {/* Eyebrow label */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className="block w-8 h-px"
                style={{ background: colors.eyebrowColor }}
              />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: colors.eyebrowColor, fontFamily: "'DM Mono', monospace" }}
              >
                Welcome
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-black text-4xl md:text-5xl lg:text-5xl leading-[1.05] mb-6 tracking-tight"
              style={{ color: colors.headlineColor, fontFamily: "'Syne', sans-serif" }}
            >
              {h.headline?.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? (
                    <span style={headlineAccentStyle(colors.headlineAccent)}>
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p
              className="text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-lg"
              style={{ color: colors.subheadlineColor, fontFamily: "'DM Sans', sans-serif" }}
            >
              {h.subheadline}
            </p>

            {/* CTA Button */}
            <Button
              href={h.cta?.href}
              className="relative px-7 py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden"
              style={{
                background: colors.buttonBg,
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: `0 0 32px ${colors.buttonGlow}`,
              }}
            >
              <span className="relative z-10">{h.cta?.label}</span>
            </Button>

          </div>

          {/* ── RIGHT: Image Carousel ── */}
          <div className="w-full md:w-auto md:flex-1">
            <ImageCarousel images={h.images ?? []} headline={h.headline} />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero