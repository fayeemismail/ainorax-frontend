'use client'

// components/common/Navbar.tsx
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { type Navbar } from '@/lib/queries/navbarData'

const Navbar = ({
  navbarData,
  scrolled = false,
}: {
  navbarData: Navbar
  scrolled?: boolean
}) => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href?: string) => {
    if (!href) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className="relative flex items-center justify-between py-4 px-6">

        {/* ── Logo — outside pill, fades + slides up on scroll ── */}
        <div
          className={`
            flex items-center z-10
            transition-all duration-500 ease-in-out
            ${scrolled
              ? 'opacity-0 pointer-events-none -translate-y-2'
              : 'opacity-100 translate-y-0'
            }
          `}
        >
          {(navbarData.logoImage || navbarData.logoText) && (
            <Link href={navbarData.logoLink ?? '/'} onClick={closeMenu}>
              {navbarData.logoImage ? (
                <Image
                  src={navbarData.logoImage}
                  alt="logo"
                  height={36}
                  width={130}
                  className="object-contain drop-shadow-sm"
                  priority
                />
              ) : (
                <span className="text-sm font-bold text-white tracking-tight whitespace-nowrap">
                  {navbarData.logoText}
                </span>
              )}
            </Link>
          )}
        </div>

        {/* ── Center pill — desktop nav links, ALWAYS visible ── */}
        <div
          className="
            absolute left-1/2 -translate-x-1/2
            hidden md:flex items-center
            backdrop-blur-xl bg-white/20
            border border-white/30
            shadow-lg shadow-black/10
            rounded-full
            px-2 py-1.5
          "
        >
          <ul className="flex items-center gap-0.5">
            {navbarData.links?.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href ?? '#'}
                  className={`
                    inline-flex items-center
                    px-4 py-2
                    rounded-full
                    text-sm font-medium
                    whitespace-nowrap
                    transition-all duration-200
                    ${isActive(link.href)
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-800 hover:bg-white/30 hover:text-gray-900'
                    }
                  `}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right side — CTA (desktop) + Hamburger (mobile) ── */}
        <div className="flex items-center gap-3 z-10">

          {/* CTA Button — desktop only, hides on scroll */}
          <div
            className={`
              hidden md:block
              transition-all duration-500 ease-in-out
              ${scrolled
                ? 'opacity-0 pointer-events-none -translate-y-2'
                : 'opacity-100 translate-y-0'
              }
            `}
          >
            {navbarData.ctaButton?.label && (
              <Link
                href={navbarData.ctaButton.href ?? '#'}
                className="
                  inline-flex items-center
                  px-4 py-2
                  bg-gray-900 text-white
                  text-sm font-semibold rounded-full
                  hover:bg-gray-800
                  transition-all duration-200
                  shadow-sm active:scale-95 whitespace-nowrap
                "
              >
                {navbarData.ctaButton.label}
              </Link>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              md:hidden
              flex flex-col justify-center items-center
              w-10 h-10 rounded-full
              backdrop-blur-xl bg-white/20
              border border-white/30
              shadow-md
              gap-1.5
              transition-all duration-200
              hover:bg-white/30
            "
            aria-label="Toggle menu"
          >
            <span
              className={`
                block w-4 h-0.5 bg-gray-800 rounded-full
                transition-all duration-300 origin-center
                ${menuOpen ? 'rotate-45 translate-y-2' : ''}
              `}
            />
            <span
              className={`
                block w-4 h-0.5 bg-gray-800 rounded-full
                transition-all duration-300
                ${menuOpen ? 'opacity-0 scale-x-0' : ''}
              `}
            />
            <span
              className={`
                block w-4 h-0.5 bg-gray-800 rounded-full
                transition-all duration-300 origin-center
                ${menuOpen ? '-rotate-45 -translate-y-2' : ''}
              `}
            />
          </button>

        </div>
      </nav>

      {/* ── Mobile menu — slides down below navbar ── */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-500 ease-in-out
          ${menuOpen ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div
          className="
            mx-4 mb-4
            backdrop-blur-xl bg-white/20
            border border-white/30
            shadow-lg shadow-black/10
            rounded-2xl
            px-3 py-3
            flex flex-col gap-1
          "
        >
          {navbarData.links?.map((link, index) => (
            <Link
              key={index}
              href={link.href ?? '#'}
              onClick={closeMenu}
              className={`
                flex items-center
                px-4 py-3
                rounded-xl
                text-sm font-medium
                transition-all duration-200
                ${isActive(link.href)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-800 hover:bg-white/40 hover:text-gray-900'
                }
              `}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA inside mobile menu */}
          {navbarData.ctaButton?.label && (
            <Link
              href={navbarData.ctaButton.href ?? '#'}
              onClick={closeMenu}
              className="
                flex items-center justify-center
                mt-2 px-4 py-3
                bg-gray-900 text-white
                text-sm font-semibold rounded-xl
                hover:bg-gray-800
                transition-all duration-200
                active:scale-95
              "
            >
              {navbarData.ctaButton.label}
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar