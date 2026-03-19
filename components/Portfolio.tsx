'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type Category = 'all' | 'boxing' | 'football' | 'automotive'

const PHOTOS = [
  {
    id: 1,
    category: 'boxing',
    title: 'Championship Night',
    location: 'London, UK',
    src: '/portfolio/boxing-1.jpg',
  },
  {
    id: 2,
    category: 'boxing',
    title: 'Der Knockout',
    location: 'Manchester, UK',
    src: '/portfolio/boxing-2.jpg',
  },
  {
    id: 3,
    category: 'boxing',
    title: 'Siegesmoment',
    location: 'Berlin, Deutschland',
    src: '/portfolio/boxing-3.jpg',
  },
  {
    id: 4,
    category: 'football',
    title: 'Spieltag',
    location: 'Wembley, London',
    src: '/portfolio/football-1.jpg',
  },
  {
    id: 5,
    category: 'football',
    title: 'Stadionenergie',
    location: 'Amsterdam, NL',
    src: '/portfolio/football-2.jpg',
  },
  {
    id: 6,
    category: 'football',
    title: 'Reiner Instinkt',
    location: 'Madrid, Spanien',
    src: '/portfolio/football-3.jpg',
  },
  {
    id: 7,
    category: 'automotive',
    title: 'Rolling Thunder',
    location: 'Monaco',
    src: '/portfolio/auto-1.jpg',
  },
  {
    id: 8,
    category: 'automotive',
    title: 'Volle Fahrt',
    location: 'Dubai, UAE',
    src: '/portfolio/auto-2.jpg',
  },
  {
    id: 9,
    category: 'automotive',
    title: 'Präzision',
    location: 'London, UK',
    src: '/portfolio/auto-3.jpg',
  },
]

const FILTERS: { key: Category; label: string }[] = [
  { key: 'all', label: 'ALLE' },
  { key: 'boxing', label: 'BOXEN' },
  { key: 'football', label: 'FUSSBALL' },
  { key: 'automotive', label: 'AUTOMOTIVE' },
]

export default function Portfolio() {
  const [active, setActive] = useState<Category>('all')

  const filtered = PHOTOS.filter((p) => active === 'all' || p.category === active)

  return (
    <section id="portfolio" className="py-24 md:py-36 px-6 md:px-12 bg-[#F5F5F3]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#FF2200] text-[10px] tracking-[0.35em] uppercase font-medium">
              Portfolio
            </span>
            <h2
              className="text-[#0A0A0A] leading-none tracking-tighter mt-2"
              style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              MEINE ARBEIT
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`px-4 py-2 text-[10px] font-semibold tracking-[0.18em] rounded-full transition-all duration-300 cursor-pointer ${
                  active === f.key
                    ? 'bg-[#0A0A0A] text-[#F5F5F3]'
                    : 'border border-[#E0E0DE] text-[#8C8C8A] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EBEBEA] cursor-pointer"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out">
                  <div className="absolute bottom-0 left-0 p-5">
                    <span className="text-[#FF2200] text-[9px] tracking-[0.3em] uppercase font-semibold">
                      {photo.category === 'boxing' ? 'BOXEN' : photo.category === 'football' ? 'FUSSBALL' : 'AUTOMOTIVE'}
                    </span>
                    <p className="text-white font-medium mt-1 text-base">{photo.title}</p>
                    <p className="text-white/50 text-xs mt-0.5">{photo.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
