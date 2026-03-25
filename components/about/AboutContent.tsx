'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../common/Button'

interface AboutContentProps {
    mission?: {
        title?: string
        content?: string
        image?: { asset: { url: string } }
    }
    vision?: {
        title?: string
        content?: string
        image?: { asset: { url: string } }
    }
    values?: Array<{
        title?: string
        description?: string
        iconName?: string
        iconImage?: { asset: { url: string } }
    }>
    projects?: Array<{
        title?: string
        category?: string
        description?: string
        image?: { asset: { url: string } }
        link?: string
    }>
    finalCTA?: {
        headline?: string
        body?: string
        bgColor?: string
        textColor?: string
        button?: { label?: string; link?: string; bgColor?: string; textColor?: string }
    }
    stats?: Array<{
        label?: string
        value?: string
    }>
}

const DynamicLucideIcon = ({ name, className }: { name: string, className?: string }) => {
    // Case-insensitive lookup
    const iconKey = Object.keys(LucideIcons).find(
        (key) => key.toLowerCase() === name.toLowerCase()
    )
    const IconComponent = iconKey ? (LucideIcons as any)[iconKey] : LucideIcons.HelpCircle
    
    return <IconComponent className={className} />
}

const AboutContent = ({ mission, vision, values, projects, finalCTA, stats }: AboutContentProps) => {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any } 
        }
    }

    const isHex = (str?: string) => str?.startsWith('#') || str?.includes('rgb') || str?.includes('linear-gradient');
    const isTailwind = (str?: string) => str && !isHex(str);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 pb-32">
            
            {/* Stats section */}
            {stats && stats.length > 0 && (
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-12 py-32 mb-32 border-y border-white/5"
                >
                    {stats.map((stat, i) => (
                        <motion.div 
                            key={i} 
                            variants={fadeUp}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <h3 
                                className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter"
                                style={{ fontFamily: "'Syne', sans-serif" }}
                            >
                                {stat.value}
                            </h3>
                            <p 
                                className="text-indigo-400 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold opacity-70"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                            >
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Mission Section */}
            {(mission?.title || mission?.content) && (
                <section className="mb-48">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2 relative"
                        >
                            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                                {mission?.image?.asset?.url ? (
                                    <Image 
                                        src={mission.image.asset.url} 
                                        alt={mission.title || "Our Mission"} 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                        <LucideIcons.Target className="w-16 h-16 text-indigo-500/20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border border-indigo-500/10 rounded-3xl" />
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="flex items-center gap-3 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>
                                <span className="w-8 h-px bg-indigo-500" />
                                <span className="text-indigo-400 text-xs font-bold uppercase tracking-[0.3em]">
                                    The Mission
                                </span>
                            </div>
                            <h2 
                                className="text-white text-3xl md:text-5xl font-bold mb-8 leading-tight"
                                style={{ fontFamily: "'Syne', sans-serif" }}
                            >
                                {mission?.title || "Architecting Extraordinary Digital Realms"}
                            </h2>
                            <p 
                                className="text-slate-400 text-lg leading-relaxed"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                {mission?.content || "We exist at the intersection of logic and imagination, building ecosystems that don't just solve problems, but define new standards of digital elegance."}
                            </p>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Vision Section - ALTERNATING LAYOUT */}
            {(vision?.title || vision?.content) && (
                <section className="mb-48">
                    <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="flex items-center gap-3 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>
                                <span className="w-8 h-px bg-violet-500" />
                                <span className="text-violet-400 text-xs font-bold uppercase tracking-[0.3em]">
                                    The Vision
                                </span>
                            </div>
                            <h2 
                                className="text-white text-3xl md:text-5xl font-bold mb-8 leading-tight"
                                style={{ fontFamily: "'Syne', sans-serif" }}
                            >
                                {vision?.title || "Envisioning the Intelligent Future"}
                            </h2>
                            <p 
                                className="text-slate-400 text-lg leading-relaxed"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                {vision?.content || "Our vision is to transcend technical boundaries, creating a future where AI and human creativity synthesize into a seamless, intelligent layer that empowers every digital interaction."}
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2 relative"
                        >
                            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                                {vision?.image?.asset?.url ? (
                                    <Image 
                                        src={vision.image.asset.url} 
                                        alt={vision.title || "Our Vision"} 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                        <LucideIcons.Eye className="w-16 h-16 text-violet-500/20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                            <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full border border-violet-500/10 rounded-3xl" />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Core Values Section - REVERTED TO PREVIOUS ENERGETIC DESIGN */}
            <section className="mb-48">
                <div className="flex flex-col items-center text-center mb-20">
                    <span 
                        className="text-indigo-500 text-xs font-bold uppercase tracking-[0.4em] mb-4"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                        Principles
                    </span>
                    <h2 
                        className="text-white text-3xl md:text-5xl font-bold"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        Our Core Values
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values?.map((value, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ 
                                opacity: 1, 
                                y: 0, 
                                transition: { 
                                    duration: 0.6,
                                    ease: [0.16, 1, 0.3, 1] as any,
                                    delay: i * 0.06 
                                } 
                            }}
                            viewport={{ once: true }}
                            whileHover={{ 
                                y: -12,
                                transition: { duration: 0.2, ease: "easeOut" as any }
                            }}
                            transition={{ duration: 0.2, ease: "easeOut" as any }}
                            className="relative p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-indigo-500/40 transition-all group overflow-hidden"
                        >
                            <div className="relative z-10">
                                <motion.div 
                                    whileHover={{ rotate: 8, scale: 1.15 }}
                                    className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-10 border border-indigo-500/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-200"
                                >
                                    {value.iconName ? (
                                        <DynamicLucideIcon name={value.iconName} className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                    ) : value.iconImage?.asset?.url ? (
                                        <div className="relative w-9 h-9">
                                            <Image src={value.iconImage.asset.url} alt={value.title || "Value Icon"} fill className="object-contain" unoptimized />
                                        </div>
                                    ) : (
                                        <LucideIcons.Hexagon className="w-8 h-8 text-indigo-400" />
                                    )}
                                </motion.div>
                                <h4 
                                    className="text-white text-2xl font-bold mb-5 tracking-tight group-hover:text-indigo-100 transition-colors"
                                    style={{ fontFamily: "'Syne', sans-serif" }}
                                >
                                    {value.title}
                                </h4>
                                <p 
                                    className="text-slate-500 text-base leading-relaxed group-hover:text-slate-400 transition-colors"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    {value.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Projects Showcase */}
            {projects && projects.length > 0 && (
                <section className="mb-48">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <span 
                                className="text-indigo-400 text-xs font-bold uppercase tracking-[0.4em] mb-4 block"
                                style={{ fontFamily: "'DM Mono', monospace" }}
                            >
                                Showcase
                            </span>
                            <h2 
                                className="text-white text-4xl md:text-5xl font-bold"
                                style={{ fontFamily: "'Syne', sans-serif" }}
                            >
                                Selected Projects
                            </h2>
                        </div>
                        <Link 
                            href="/projects" 
                            className="group flex items-center gap-3 text-white/60 text-xs font-bold uppercase tracking-widest hover:text-indigo-400 transition-all font-mono"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                            View All Projects
                            <LucideIcons.MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        {projects.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <Link href={project.link || '#'} className="group block">
                                    <div className="relative aspect-16/10 rounded-3xl overflow-hidden mb-8 bg-slate-900 border border-white/5">
                                        {project.image?.asset?.url ? (
                                            <Image 
                                                src={project.image.asset.url} 
                                                alt={project.title || "Project"} 
                                                fill 
                                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-linear-to-br from-indigo-900/20 to-transparent" />
                                        )}
                                        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <LucideIcons.ArrowUpRight className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    
                                    <div className="px-2">
                                        <span 
                                            className="text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-3 block"
                                            style={{ fontFamily: "'DM Mono', monospace" }}
                                        >
                                            {project.category}
                                        </span>
                                        <h3 
                                            className="text-white text-2xl md:text-3xl font-bold mb-4 group-hover:text-indigo-400 transition-colors"
                                            style={{ fontFamily: "'Syne', sans-serif" }}
                                        >
                                            {project.title}
                                        </h3>
                                        <p 
                                            className="text-slate-500 text-base leading-relaxed line-clamp-2"
                                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        >
                                            {project.description}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Final CTA Section */}
            {(finalCTA?.headline || finalCTA?.body) && (
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative p-12 md:p-24 rounded-[3rem] overflow-hidden text-center border border-white/10 ${isTailwind(finalCTA.bgColor) ? (finalCTA.bgColor?.startsWith('bg-') ? finalCTA.bgColor : `bg-${finalCTA.bgColor}`) : ''} ${isTailwind(finalCTA.textColor) ? (finalCTA.textColor?.startsWith('text-') ? finalCTA.textColor : `text-${finalCTA.textColor}`) : ''}`}
                    style={{ 
                        background: isHex(finalCTA.bgColor) ? finalCTA.bgColor : undefined,
                        backgroundColor: isHex(finalCTA.bgColor) ? finalCTA.bgColor : undefined,
                        color: isHex(finalCTA.textColor) ? finalCTA.textColor : undefined
                    }}
                >
                    {!finalCTA.bgColor && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
                    )}
                    
                    <h2 
                        className="text-3xl md:text-6xl font-black mb-8 leading-tight"
                        style={{ fontFamily: "'Syne', sans-serif", color: isHex(finalCTA.textColor) ? finalCTA.textColor : undefined }}
                    >
                        {finalCTA.headline || "Ready to Start Your Next Big Project?"}
                    </h2>
                    <p 
                        className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-80"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: isHex(finalCTA.textColor) ? finalCTA.textColor : undefined }}
                    >
                        {finalCTA.body || "Whether you need a simple website or a complex AI-driven application, our team of experts is ready to bring your vision to life."}
                    </p>
                    
                    {(finalCTA.button?.label || finalCTA.button?.link) && (
                        <div className="flex justify-center">
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Link href={finalCTA.button?.link || '#'}>
                                    <Button 
                                        className={`px-10 py-4 font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl hover:scale-110 active:scale-95 ${isTailwind(finalCTA.button.bgColor) ? (finalCTA.button.bgColor?.startsWith('bg-') ? finalCTA.button.bgColor : `bg-${finalCTA.button.bgColor}`) : ''} ${isTailwind(finalCTA.button.textColor) ? (finalCTA.button.textColor?.startsWith('text-') ? finalCTA.button.textColor : `text-${finalCTA.button.textColor}`) : ''}`}
                                        style={{
                                            backgroundColor: isHex(finalCTA.button.bgColor) ? finalCTA.button.bgColor : undefined,
                                            color: isHex(finalCTA.button.textColor) ? finalCTA.button.textColor : undefined
                                        }}
                                    >
                                        {finalCTA.button?.label || "Get Started"}
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    )}
                </motion.section>
            )}

        </div>
    )
}

export default AboutContent
