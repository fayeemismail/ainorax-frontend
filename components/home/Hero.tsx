import { getHero } from '@/lib/queries/home/heroData'
import Image from 'next/image'
import React from 'react'

const Hero = async () => {
  const heroData = await getHero()
  const { images } = heroData.hero || {}

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-20 py-24 md:py-0 overflow-hidden gap-12 md:gap-8 lg:gap-0">

      {/* Left: Text Content */}
      <div className="w-full md:flex-1 z-10">
        <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6">
          {heroData.hero?.headline}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
          {heroData.hero?.subheadline}
        </p>
      </div>

      {/* Right: Image Collage */}
      <div className="w-full md:flex-1 flex items-center justify-center py-4">
        <div
          className="relative w-full max-w-[360px] md:max-w-none"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: '10px',
          }}
        >
          {/* Image 0 — top-left, spans 1 row */}
          {images?.[0]?.asset?.url && (
            <div
              className="relative rounded-xl overflow-hidden"
              style={{ gridColumn: '1', gridRow: '1', aspectRatio: '3/4' }}
            >
              <Image
                src={images[0].asset.url}
                alt="Team member 1"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Image 1 — top-right, offset down via margin */}
          {images?.[1]?.asset?.url && (
            <div
              className="relative rounded-xl overflow-hidden self-end"
              style={{ gridColumn: '2', gridRow: '1 / 3', aspectRatio: '3/4' }}
            >
              <Image
                src={images[1].asset.url}
                alt="Team member 2"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Image 2 — bottom-left, slightly taller to overlap visually */}
          {images?.[2]?.asset?.url && (
            <div
              className="relative rounded-xl overflow-hidden shadow-2xl -mt-8"
              style={{ gridColumn: '1', gridRow: '2', aspectRatio: '3/4' }}
            >
              <Image
                src={images[2].asset.url}
                alt="Team member 3"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

    </section>
  )
}

export default Hero