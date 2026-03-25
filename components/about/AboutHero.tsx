'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'

interface AboutHeroProps {
    heroData?: {
        headline?: string
        subheadline?: string
        images?: any[]
        leftIcon?: string
        rightIcon?: string
        cta?: { label?: string; link?: string; bgColor?: string; textColor?: string }
    }
}

const DynamicLucideIcon = ({ name, className }: { name: string, className?: string }) => {
    // Case-insensitive lookup
    const iconKey = Object.keys(LucideIcons).find(
        (key) => key.toLowerCase() === name.toLowerCase()
    )
    const IconComponent = iconKey ? (LucideIcons as any)[iconKey] : LucideIcons.HelpCircle
    
    return <IconComponent className={className} />
}

const AboutHero = ({ heroData }: AboutHeroProps) => {
    const { headline, subheadline, images, cta, leftIcon, rightIcon } = heroData || {}

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" as any }
        }
    }

    // Helper to determine if a string is a hex color or tailwind class
    const getButtonStyle = (bgColor?: string, textColor?: string) => {
        const isHex = (str?: string) => str?.startsWith('#') || str?.includes('rgb') || str?.includes('linear-gradient');
        
        return {
            background: isHex(bgColor) ? bgColor : undefined,
            backgroundColor: isHex(bgColor) ? bgColor : undefined,
            color: isHex(textColor) ? textColor : undefined,
        };
    };

    const isTailwindBg = (str?: string) => str && !str.startsWith('#') && !str.includes('rgb') && !str.includes('linear-gradient');

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-24">
            {/* Background Glows */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[100px]" />
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center"
            >
                {/* Eyebrow */}
                <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-8 text-indigo-400">
                    <span className="block w-8 h-px bg-current opacity-50" />
                    <span 
                        className="text-[10px] font-bold tracking-[0.3em] uppercase"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                        Future Solutions
                    </span>
                    <span className="block w-8 h-px bg-current opacity-50" />
                </motion.div>

                {/* Main Headline */}
                <motion.h1 
                    variants={itemVariants}
                    className="text-white font-black text-5xl md:text-7xl lg:text-8xl leading-tight mb-10 tracking-tighter"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    {headline?.split(' ').map((word, i, arr) => (
                        <span key={i}>
                            {i === arr.length - 1 ? (
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400">
                                    {word}
                                </span>
                            ) : word}
                            {i < arr.length - 1 ? ' ' : ''}
                        </span>
                    )) || "Transforming Ideas into Intelligent Experiences"}
                </motion.h1>

                {/* Subheadline */}
                <motion.p 
                    variants={itemVariants}
                    className="text-slate-400 text-lg md:text-xl leading-relaxed mb-16 max-w-2xl mx-auto"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    {subheadline || "We specialize in modern web development, cutting-edge AI solutions, and data-driven growth."}
                </motion.p>

                {/* CTA - Fixed Spacing and Coloring */}
                {cta?.label && (
                    <motion.div variants={itemVariants} className="mt-4">
                        <Button
                            href={cta?.link || '#'}
                            className={`relative px-8 py-4 rounded-2xl text-base font-bold overflow-hidden group shadow-xl hover:scale-105 transition-transform active:scale-95 ${isTailwindBg(cta?.bgColor) ? (cta?.bgColor?.startsWith('bg-') ? cta?.bgColor : `bg-${cta?.bgColor}`) : ''} ${isTailwindBg(cta?.textColor) ? (cta?.textColor?.startsWith('text-') ? cta?.textColor : `text-${cta?.textColor}`) : 'text-white'}`}
                            style={getButtonStyle(cta?.bgColor, cta?.textColor)}
                        >
                            {!isTailwindBg(cta?.bgColor) && !cta?.bgColor && (
                                <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600 -z-10" />
                            )}
                            <span className="relative z-10">
                                {cta.label}
                            </span>
                        </Button>
                    </motion.div>
                )}

                {/* Floating Elements - Tiered Hybrid (Images + Glass Icons) */}
                
                {/* Left Side Elements */}
                <div className="absolute -left-16 top-1/2 -translate-y-1/2 hidden xl:block z-20 pointer-events-none">
                    <div className="flex flex-col gap-12 items-center">
                        {/* Image Element */}
                        {images?.[0]?.asset?.url && (
                            <motion.div 
                                initial={{ y: 0 }}
                                animate={{ y: [-15, 15, -15] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                className="group cursor-pointer pointer-events-auto"
                            >
                                <motion.div 
                                    whileHover={{ scale: 1.05, filter: "none", opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative w-40 h-56 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all opacity-20 filter grayscale blur-[1px]"
                                >
                                    <Image src={images[0].asset.url} alt="Ainorax" fill className="object-cover" unoptimized />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Glass Icon Element */}
                        {leftIcon && (
                            <motion.div 
                                initial={{ y: 0, x: 0 }}
                                animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="pointer-events-auto"
                            >
                                <motion.div 
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="relative w-16 h-16 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl group transition-all"
                                >
                                    <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-md group-hover:bg-indigo-500/20 transition-colors" />
                                    <DynamicLucideIcon name={leftIcon} className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right Side Elements */}
                <div className="absolute -right-16 top-1/3 hidden xl:block z-20 pointer-events-none">
                    <div className="flex flex-col gap-16 items-center">
                        {/* Glass Icon Element */}
                        {rightIcon && (
                            <motion.div 
                                initial={{ y: 0, x: 0 }}
                                animate={{ y: [-12, 12, -12], x: [-6, 6, -6] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="pointer-events-auto"
                            >
                                <motion.div 
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl group transition-all"
                                >
                                    <div className="absolute inset-0 bg-violet-500/10 rounded-2xl blur-md group-hover:bg-violet-500/20 transition-colors" />
                                    <DynamicLucideIcon name={rightIcon} className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors" />
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Image Element */}
                        {images?.[1]?.asset?.url && (
                            <motion.div 
                                initial={{ y: 0 }}
                                animate={{ y: [15, -15, 15] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="group cursor-pointer pointer-events-auto"
                            >
                                <motion.div 
                                    whileHover={{ scale: 1.05, filter: "none", opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative w-44 h-44 rounded-full overflow-hidden border border-white/10 shadow-2xl transition-all opacity-20 filter grayscale blur-[1px]"
                                >
                                    <Image src={images[1].asset.url} alt="Ainorax" fill className="object-cover" unoptimized />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default AboutHero
