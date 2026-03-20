'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden h-[55vw] md:h-screen">
      <Image
        src="/mercedes_190e_evo2.jpg"
        alt="Mercedes 190E Evolution II rolling shot — Visuals by Ramadani"
        fill
        priority
        className="object-cover"
        style={{ objectPosition: '50% 45%' }}
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/75" />

      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Content — bottom area */}
      <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-12 md:pb-20" style={{ paddingBottom: 'max(3rem, calc(env(safe-area-inset-bottom) + 2rem))' }}>
        {/* Category pills */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {['BOXEN', 'FUSSBALL', 'AUTOMOTIVE'].map((cat) => (
            <span
              key={cat}
              className="text-[#0A0A0A] bg-white text-[10px] font-semibold tracking-[0.25em] rounded-full px-3 py-1"
            >
              {cat}
            </span>
          ))}
        </motion.div>

        {/* "Visuals by" label */}
        <motion.p
          className="text-white text-xs tracking-[0.3em] uppercase mb-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Visuals by
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="text-white leading-none tracking-tighter"
          style={{
            fontFamily: 'var(--font-anton)',
            fontSize: 'clamp(3rem, 7vw, 7rem)',
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          RAMADANI
        </motion.h1>

        {/* Bottom row: tagline + CTA */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <p className="text-white text-sm leading-relaxed max-w-xs">
            Sport & Automotive Fotografie
            <br />
            London — Weltweit verfügbar
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#portfolio"
              className="bg-white text-[#0A0A0A] text-xs font-semibold tracking-[0.15em] px-6 py-3 rounded-full hover:bg-[#FF2200] hover:text-white transition-colors duration-300"
            >
              MEINE ARBEIT
            </a>
            <a
              href="#contact"
              className="text-white/70 text-xs font-medium tracking-[0.15em] flex items-center gap-2 hover:text-white transition-colors group"
            >
              BOOK A SHOOT
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Vertical scroll label */}
      <motion.div
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <span
          className="text-white/30 text-[9px] tracking-[0.35em]"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          SCROLL
        </span>
        <motion.div
          className="w-px bg-white/25 origin-top"
          style={{ height: '60px' }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
