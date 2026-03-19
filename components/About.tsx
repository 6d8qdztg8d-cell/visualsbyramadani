'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const STATS = [
  { value: '500+', label: 'Events Covered' },
  { value: '8+', label: 'Years Experience' },
  { value: '20+', label: 'Countries' },
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-12 bg-[#F5F5F3]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '3/4' }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85"
              alt="Ramadani — photographer at work"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Accent stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF2200]" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#FF2200] text-[10px] tracking-[0.35em] uppercase font-medium">
              About
            </span>
            <h2
              className="text-[#0A0A0A] leading-none tracking-tighter mt-2 mb-8"
              style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
            >
              CAPTURING
              <br />
              INTENSITY
            </h2>

            <div className="space-y-5 text-[#0A0A0A]/65 leading-relaxed text-[15px]">
              <p>
                I&apos;m Ramadani — a London-based sports and automotive photographer with over 8
                years of experience documenting the raw intensity of boxing galas, the electric
                atmosphere of football matches, and the precision of luxury automotive events.
              </p>
              <p>
                My approach combines photojournalistic instinct with cinematic visual storytelling.
                Every image is crafted to capture not just the moment, but the emotion, the tension,
                and the energy behind it.
              </p>
              <p>
                Available for editorial commissions, event coverage, and brand campaigns across
                Europe and the Middle East.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-[#E0E0DE]">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-[#0A0A0A] leading-none tracking-tighter"
                    style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[#8C8C8A] text-[10px] mt-2 tracking-[0.15em] uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
