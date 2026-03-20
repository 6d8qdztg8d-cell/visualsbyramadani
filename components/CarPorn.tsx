'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CarPorn() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const prevScrollY = useRef(0)
  const isVisible = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    video.pause()
    video.currentTime = 0
    prevScrollY.current = window.scrollY

    // Sichtbarkeit überwachen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting
      },
      { threshold: 0.5 }
    )
    observer.observe(section)

    // Scroll → Video
    const onScroll = () => {
      if (!isVisible.current) {
        prevScrollY.current = window.scrollY
        return
      }

      const delta = window.scrollY - prevScrollY.current
      prevScrollY.current = window.scrollY

      if (!video.duration || !isFinite(video.duration)) return

      // Geschwindigkeit: gesamte Video-Länge über ~1800px Scroll
      const speed = video.duration / 1800
      video.currentTime = Math.min(
        Math.max(video.currentTime + delta * speed, 0),
        video.duration
      )
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A]" style={{ height: '100vh' }}>
      {/* Gradient oben */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#111110] to-transparent z-10 pointer-events-none" />

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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

      {/* Text */}
      <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-12 md:pb-20 z-10">
        <motion.div
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
        </motion.div>
      </div>

      {/* Fortschrittsbalken */}
      <ProgressBar videoRef={videoRef} isVisible={isVisible} />
    </section>
  )
}

function ProgressBar({
  videoRef,
  isVisible,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>
  isVisible: React.RefObject<boolean>
}) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const video = videoRef.current
      const bar = barRef.current
      if (!video || !bar || !video.duration) return
      bar.style.transform = `scaleX(${video.currentTime / video.duration})`
      requestAnimationFrame(update)
    }
    const raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [videoRef])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
      <div
        ref={barRef}
        className="h-full bg-[#FF2200] origin-left"
        style={{ transform: 'scaleX(0)', transition: 'none' }}
      />
    </div>
  )
}
