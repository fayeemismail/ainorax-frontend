'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'

interface CarouselImage {
    asset: {
        url: string
    }
}

interface ImageCarouselProps {
    images: CarouselImage[]
    headline?: string
}

const ImageCarousel = ({ images, headline }: ImageCarouselProps) => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (images.length <= 1) return
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [images.length])

    if (!images?.[0]?.asset?.url) return null

    return (
        <div className="w-full md:flex-1 flex justify-center md:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm aspect-3/4">

                {/* Decorative border frame */}
                <div className="absolute -inset-3 rounded-3xl border border-indigo-500/20" />
                <div className="absolute -inset-6 rounded-3xl border border-white/5" />

                {/* Corner accent dots */}
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.8)]" />

                {/* Image container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    {images.map((img, i) => (
                        <Image
                            key={i}
                            src={img.asset.url}
                            alt={headline || `Hero image ${i + 1}`}
                            fill
                            className={`object-cover object-center scale-[1.02] transition-opacity duration-700 ${
                                i === current ? 'opacity-100' : 'opacity-0'
                            }`}
                            priority={i === 0}
                        />
                    ))}

                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#080a0f] via-transparent to-transparent opacity-70" />

                    {/* Left edge gradient */}
                    <div className="absolute inset-0 bg-linear-to-r from-[#080a0f]/40 via-transparent to-transparent" />

                    {/* Colour tint overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-900/30 via-transparent to-violet-900/20 mix-blend-color" />

                    {/* Dot indicators */}
                    {images.length > 1 && (
                        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        i === current
                                            ? 'w-4 bg-indigo-400'
                                            : 'w-1.5 bg-white/30 hover:bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Floating badge */}
                    {/* <div
                        className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl z-10"
                        style={{
                            background: 'rgba(8,10,15,0.75)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        <span className="relative flex h-2.5 w-2.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                        </span>
                        <p
                            className="text-slate-300 text-xs font-medium"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Available for new projects
                        </p>
                    </div> */}
                </div>

                {/* Glow beneath card */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-indigo-600/20 blur-2xl rounded-full" />
            </div>
        </div>
    )
}

export default ImageCarousel