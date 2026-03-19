'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'ARBEIT', href: '#portfolio' },
    { label: 'VIDEO', href: '#video' },
    { label: 'BUCHUNG', href: '#buchung' },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#F5F5F3]/95 backdrop-blur-md border-b border-black/5' : ''
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <a
            href="#"
            className={`text-xl md:text-2xl tracking-tight transition-colors duration-500 ${scrolled ? 'text-[#0A0A0A]' : 'text-white'}`}
            style={{ fontFamily: 'var(--font-anton)' }}
          >
            VISUALS BY RAMADANI
          </a>

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-medium tracking-[0.15em] transition-colors duration-300 ${scrolled ? 'text-[#0A0A0A]/50 hover:text-[#0A0A0A]' : 'text-white/70 hover:text-white'}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#buchung"
              className={`text-xs font-medium tracking-[0.15em] px-5 py-2.5 rounded-full transition-colors duration-300 ${scrolled ? 'bg-[#0A0A0A] text-[#F5F5F3] hover:bg-[#FF2200]' : 'bg-white text-[#0A0A0A] hover:bg-[#FF2200] hover:text-white'}`}
            >
              BOOK A SHOOT
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-11 h-11 items-center"
            aria-label="Menü öffnen"
          >
            <motion.span
              className={`block w-6 h-[1.5px] origin-center transition-colors duration-300 ${scrolled ? 'bg-[#0A0A0A]' : 'bg-white'}`}
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`block w-6 h-[1.5px] transition-colors duration-300 ${scrolled ? 'bg-[#0A0A0A]' : 'bg-white'}`}
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={`block w-6 h-[1.5px] origin-center transition-colors duration-300 ${scrolled ? 'bg-[#0A0A0A]' : 'bg-white'}`}
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-center items-start px-10 gap-6"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {[...links, { label: 'BOOK A SHOOT', href: '#buchung' }].map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[#F5F5F3] text-[15vw] leading-none tracking-tighter hover:text-[#FF2200] transition-colors"
                style={{ fontFamily: 'var(--font-anton)' }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.p
              className="text-white/20 text-sm mt-8 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              LONDON · WELTWEIT
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
