'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { type Footer as FooterType, type SocialLink } from '@/lib/queries/footerData'

interface FooterProps {
  footerData: FooterType
}

const Footer: React.FC<FooterProps> = ({ footerData }) => {
  const {
    logoText,
    logoLink = '/',
    logoImage,
    description,
    sections = [],
    socialLinks = [],
    copyrightText,
    backgroundColor = '#0a0a0a',
    textColor = '#ffffff',
    accentColor = '#3b82f6'
  } = footerData

  // Helper to get Lucide icon dynamically
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent ? <IconComponent size={20} /> : null
  }

  // Define CSS variables for dynamic colors
  const containerStyle = {
    '--footer-bg': backgroundColor,
    '--footer-text': textColor,
    '--footer-accent': accentColor,
    '--footer-text-muted': `${textColor}b3`, // 70% opacity
  } as React.CSSProperties

  return (
    <footer 
      style={containerStyle}
      className="bg-[var(--footer-bg)] text-[var(--footer-text)] pt-16 pb-8 px-6 lg:px-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href={logoLink} className="inline-block transition-transform hover:scale-105 active:scale-95">
              {logoImage ? (
                <Image 
                  src={logoImage} 
                  alt={logoText || 'Logo'} 
                  width={140} 
                  height={40} 
                  className="object-contain"
                />
              ) : (
                <span className="text-2xl font-bold tracking-tight">{logoText}</span>
              )}
            </Link>
            
            {description && (
              <p className="text-[var(--footer-text-muted)] text-sm leading-relaxed max-w-xs">
                {description}
              </p>
            )}

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social: SocialLink, idx: number) => (
                <motion.a
                  key={idx}
                  href={social.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: 'var(--footer-accent)' }}
                  className="text-[var(--footer-text-muted)] transition-colors"
                  aria-label={social.platform}
                >
                  {social.icon && getIcon(social.icon)}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav Sections */}
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--footer-accent)]">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links?.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      href={link.href || '#'}
                      className="text-[var(--footer-text-muted)] hover:text-[var(--footer-text)] transition-all duration-300 text-sm flex items-center group"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-[var(--footer-accent)]">
                        →
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--footer-text-muted)] text-xs">
            {copyrightText}
          </p>
          
          <div className="flex gap-6 text-xs text-[var(--footer-text-muted)]">
            <Link href="/privacy" className="hover:text-[var(--footer-text)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--footer-text)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
