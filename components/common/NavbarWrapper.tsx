'use client'

// components/common/NavbarWrapper.tsx
import { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { type Navbar as NavbarType } from '@/lib/queries/navbarData'

type NavbarWrapperProps = {
  navbarData: NavbarType
}

export default function NavbarWrapper({ navbarData }: NavbarWrapperProps) {
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 60)
      lastY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Navbar navbarData={navbarData} scrolled={scrolled} />
    </div>
  )
}