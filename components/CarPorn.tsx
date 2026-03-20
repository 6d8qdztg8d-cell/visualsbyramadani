'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CarPorn() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    video.preload = 'auto'
    video.pause()
    video.currentTime = 0

    // Glockenkurve: f(x) = (1 - cos(π·x)) / 2
    // Ableitung f'(x) = π/2 · sin(π·x) → Maximum bei x=0.5 (Sektion mittig im Viewport)
    // Selbst kleinster Scroll (x→0+) hat sofort positiven Effekt da sin(π·0+) > 0
    const easeInOut = (x: number) => (1 - Math.cos(Math.PI * x)) / 2

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const scrollable = section.offsetHeight - window.innerHeight
        const rawProgress = Math.min(Math.max(-rect.top / scrollable, 0), 1)

        // Nicht-lineare Abbildung: langsam → schnell → langsam
        const easedProgress = easeInOut(rawProgress)

        if (video.duration && isFinite(video.duration)) {
          video.currentTime = easedProgress * video.duration
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative" style={{ height: '280vh' }}>
      {/* Sticky Container — bleibt im Viewport während gescrollt wird */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A]">
        {/* Video */}
        <video
          ref={videoRef}
          src="/carporn.mov"
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />

        {/* Gradient oben für Übergang von Motion Reels */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#111110] to-transparent pointer-events-none" />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-12 md:pb-20 pointer-events-none">
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#FF2200] text-[10px] tracking-[0.35em] uppercase font-medium block mb-2">
              Exklusiv
            </span>
            <h2
              className="text-white leading-none tracking-tighter"
              style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(3.5rem, 10vw, 10rem)' }}
            >
              CARPORN
            </h2>
            <p className="text-white/50 text-sm mt-3 max-w-xs leading-relaxed">
              Scroll für die volle Erfahrung
            </p>
          </motion.div>
        </div>

        {/* Scroll-Fortschrittsbalken */}
        <ScrollProgress sectionRef={sectionRef} />
      </div>
    </section>
  )
}

function ScrollProgress({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const bar = barRef.current
    if (!section || !bar) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrolled = -rect.top
      const scrollable = section.offsetHeight - window.innerHeight
      const progress = Math.min(Math.max(scrolled / scrollable, 0), 1)
      bar.style.transform = `scaleX(${progress})`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionRef])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
      <div
        ref={barRef}
        className="h-full bg-[#FF2200] origin-left transition-none"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
