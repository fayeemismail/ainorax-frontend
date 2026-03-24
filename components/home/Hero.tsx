import { getHero } from '@/lib/queries/home/heroData'
import React from 'react'
import ImageCarousel from './ImageCarousel'
import Button from '../common/Button'

const Hero = async () => {
    const heroData = await getHero()
    const { images } = heroData.hero || {}

    return (
        <section className="relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 md:w-125 md:h-125 bg-indigo-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 md:w-105 md:h-105 bg-violet-900/15 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-20 md:py-28 lg:py-32">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-20">

                    {/* ── LEFT: Text content ── */}
                    <div className="w-full md:flex-1 flex flex-col items-start">

                        {/* Eyebrow label */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="block w-8 h-px bg-indigo-400" />
                            <span
                                className="text-indigo-400 text-xs font-semibold tracking-[0.2em] uppercase"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                            >
                                Welcome
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            className="text-white font-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 tracking-tight"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                            {heroData.hero?.headline?.split(' ').map((word, i, arr) => (
                                <span key={i}>
                                    {i === arr.length - 1 ? (
                                        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400">
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
                            className="text-slate-400 text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-lg"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {heroData.hero?.subheadline}
                        </p>

                        {/* CTA Button */}
                        <div>
                            <Button
                                href={heroData.hero?.cta?.href}
                                className="relative px-7 py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden group from-indigo-500 to-violet-500 shadow-lg"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    fontFamily: "'DM Sans', sans-serif",
                                    boxShadow: '0 0 32px rgba(99, 102, 241, 0.35)',
                                }}
                            >
                                <span className="relative z-10">
                                    {heroData.hero?.cta?.label}
                                </span>
                            </Button>
                        </div>
                    </div>

                    {/* ── RIGHT: Image Carousel ── */}
                    <div className="w-full md:w-auto md:flex-1">
                        <ImageCarousel
                            images={images ?? []}
                            headline={heroData.hero?.headline}
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero