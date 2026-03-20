'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const REELS = [
  {
    title: 'Championship Nights',
    subtitle: 'Boxen Reel 2024',
    duration: '3:24',
    category: 'BOXEN',
    photoId: '1549719386-74dfcbf7dbed',
    watchUrl:
      'https://www.youtube.com/results?search_query=boxing+championship+cinematic+highlights+4k',
  },
  {
    title: 'Das schöne Spiel',
    subtitle: 'Fußball Reel 2024',
    duration: '4:12',
    category: 'FUSSBALL',
    photoId: '1579952363873-27f3bade9f55',
    watchUrl: 'https://www.youtube.com/results?search_query=football+cinematic+reel+4k+2024',
  },
  {
    title: 'Speed & Style',
    subtitle: 'Automotive Reel 2024',
    duration: '2:58',
    category: 'AUTOMOTIVE',
    photoId: '1555215695-3004980ad54e',
    watchUrl:
      'https://www.youtube.com/results?search_query=automotive+cinematic+car+photography+video+4k',
  },
]

export default function VideoSection() {
  return (
    <section id="video" className="py-24 md:py-36 bg-[#111110]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#FF2200] text-[10px] tracking-[0.35em] uppercase font-medium">
            Cinematic
          </span>
          <h2
            className="text-white leading-none tracking-tighter mt-2"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            MOTION REELS
          </h2>
        </motion.div>

        {/* Cards — 2 oben, 1 mittig unten */}
        <div className="grid grid-cols-2 gap-4">
          {REELS.map((reel, i) => (
            <motion.a
              key={reel.title}
              href={reel.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-xl overflow-hidden block bg-[#1A1A19] cursor-pointer aspect-[3/4] ${
                i === 2 ? 'col-span-2 mx-auto w-1/2' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={`https://images.unsplash.com/photo-${reel.photoId}?auto=format&fit=crop&w=700&q=80`}
                alt={reel.title}
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Category tag */}
              <div className="absolute top-4 left-4">
                <span className="text-white/60 text-[9px] tracking-[0.25em] border border-white/15 rounded-full px-3 py-1.5 backdrop-blur-sm">
                  {reel.category}
                </span>
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#FF2200] group-hover:border-[#FF2200] transition-all duration-400 group-hover:scale-110">
                  <svg
                    className="w-6 h-6 text-white fill-white ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-semibold text-lg leading-tight">{reel.title}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-white/40 text-xs">{reel.subtitle}</span>
                  <span className="text-white/40 text-xs font-medium">{reel.duration}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
