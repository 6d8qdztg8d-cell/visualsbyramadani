'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-white/30 transition-colors duration-200'

  const labelClass = 'text-white/35 text-[10px] tracking-[0.2em] uppercase block mb-2'

  return (
    <section id="kontakt" className="py-24 md:py-36 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[#FF2200] text-[10px] tracking-[0.35em] uppercase font-medium">
            Kontakt
          </span>
          <h2
            className="text-white leading-none tracking-tighter mt-2 mb-16"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(3rem, 9vw, 9rem)' }}
          >
            LASS UNS ETWAS
            <br />
            IKONISCHES
            <br />
            ERSCHAFFEN.
          </h2>
        </motion.div>

        {!submitted ? (
          <div className="grid md:grid-cols-2 gap-14 md:gap-24">
            {/* Left: info */}
            <motion.div
              className="flex flex-col gap-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div>
                <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-2">
                  Standort
                </p>
                <p className="text-white text-xl font-medium">London, Vereinigtes Königreich</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-2">E-Mail</p>
                <a
                  href="mailto:hello@visualsbyramadani.com"
                  className="text-white text-xl font-medium hover:text-[#FF2200] transition-colors duration-200"
                >
                  hello@visualsbyramadani.com
                </a>
              </div>
              <div>
                <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">
                  Verfügbar für
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Boxveranstaltungen', 'Fußballspiele', 'Autoevents', 'Markenkampagnen', 'Editorial'].map(
                    (type) => (
                      <span
                        key={type}
                        className="text-white/60 text-xs border border-white/10 rounded-full px-4 py-1.5"
                      >
                        {type}
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Dein Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>E-Mail</label>
                  <input
                    type="email"
                    required
                    placeholder="deine@email.de"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Art des Events</label>
                  <select
                    required
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" className="bg-[#0A0A0A]">
                      Bitte auswählen
                    </option>
                    <option value="boxing" className="bg-[#0A0A0A]">
                      Boxveranstaltung
                    </option>
                    <option value="football" className="bg-[#0A0A0A]">
                      Fußballspiel
                    </option>
                    <option value="automotive" className="bg-[#0A0A0A]">
                      Autoevent
                    </option>
                    <option value="brand" className="bg-[#0A0A0A]">
                      Markenkampagne
                    </option>
                    <option value="other" className="bg-[#0A0A0A]">
                      Sonstiges
                    </option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Datum</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Nachricht</label>
                <textarea
                  rows={4}
                  placeholder="Erzähl mir von deinem Event..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF2200] text-white text-xs font-semibold tracking-[0.2em] py-4 rounded-lg hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300 flex items-center justify-center gap-3 group cursor-pointer"
              >
                NACHRICHT SENDEN
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.form>
          </div>
        ) : (
          <motion.div
            className="py-20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white text-2xl font-medium">Nachricht erhalten.</p>
            <p className="text-white/40 mt-3 text-sm">
              Ich melde mich innerhalb von 24 Stunden.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
