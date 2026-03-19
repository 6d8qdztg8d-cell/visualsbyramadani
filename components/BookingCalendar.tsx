'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TIMESLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
]

const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

const DAY_NAMES = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const EVENT_TYPES = [
  'Boxveranstaltung',
  'Fußballspiel',
  'Autoevents',
  'Markenkampagne',
  'Sonstiges',
]

export default function BookingCalendar() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', eventType: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()

  const firstDayOfWeek = (() => {
    const d = new Date(year, month, 1).getDay()
    return d === 0 ? 6 : d - 1 // Mon = 0
  })()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setViewMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setViewMonth(new Date(year, month + 1, 1))

  const isPast = (day: number) => new Date(year, month, day) < today
  const isSelected = (day: number) =>
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === month &&
    selectedDate?.getFullYear() === year
  const isToday = (day: number) =>
    today.getDate() === day && today.getMonth() === month && today.getFullYear() === year

  const handleDayClick = (day: number) => {
    if (isPast(day)) return
    setSelectedDate(new Date(year, month, day))
    setSelectedTime(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    setSubmitted(true)
  }

  const canSubmit = selectedDate && selectedTime && form.name && form.email && form.eventType

  const formattedDate = selectedDate
    ? `${selectedDate.getDate()}. ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    : null

  // Build calendar grid cells
  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null)

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#FF2200]/60 transition-colors duration-200'
  const labelClass = 'text-white/35 text-[10px] tracking-[0.2em] uppercase block mb-2'

  return (
    <section id="buchung" className="py-24 md:py-36 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="text-[#FF2200] text-[10px] tracking-[0.35em] uppercase font-medium">
            Buchung
          </span>
          <h2
            className="text-white leading-none tracking-tighter mt-2"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            BOOK A SHOOT
          </h2>
          <p className="text-white/35 text-sm mt-4 max-w-md leading-relaxed">
            Wähle einen Termin und sende deine Anfrage. Ich melde mich innerhalb von 24 Stunden.
          </p>
        </motion.div>

        {!submitted ? (
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Calendar + Time */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Calendar */}
              <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
                {/* Month nav */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={prevMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span
                    className="text-white font-semibold text-sm tracking-wide"
                    style={{ fontFamily: 'var(--font-anton)', letterSpacing: '0.05em' }}
                  >
                    {MONTH_NAMES[month]} {year}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {DAY_NAMES.map((d) => (
                    <div key={d} className="text-center text-white/25 text-[10px] tracking-[0.15em] py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-y-1">
                  {cells.map((day, idx) => {
                    if (day === null) return <div key={`empty-${idx}`} />
                    const past = isPast(day)
                    const sel = isSelected(day)
                    const tod = isToday(day)
                    return (
                      <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        disabled={past}
                        className={`
                          aspect-square flex items-center justify-center rounded-full text-sm transition-all duration-200 cursor-pointer min-w-[44px] min-h-[44px]
                          ${past ? 'text-white/15 cursor-not-allowed' : 'hover:bg-white/10 text-white/70 hover:text-white'}
                          ${sel ? '!bg-[#FF2200] !text-white font-semibold' : ''}
                          ${tod && !sel ? 'border border-white/30 text-white' : ''}
                        `}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time slots */}
              <AnimatePresence>
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6"
                  >
                    <p className="text-white/35 text-[10px] tracking-[0.2em] uppercase mb-3">
                      Uhrzeit — {formattedDate}
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {TIMESLOTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`
                            py-3 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer min-h-[44px]
                            ${selectedTime === t
                              ? 'bg-[#FF2200] text-white'
                              : 'bg-white/5 border border-white/10 text-white/50 hover:border-white/30 hover:text-white'}
                          `}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right: Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5 flex flex-col justify-start"
            >
              {/* Selected summary */}
              <AnimatePresence>
                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-[#FF2200]/10 border border-[#FF2200]/25 rounded-xl px-5 py-4 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#FF2200] shrink-0" />
                    <p className="text-white/70 text-sm">
                      <span className="text-white font-medium">{formattedDate}</span>
                      {' '}um{' '}
                      <span className="text-white font-medium">{selectedTime} Uhr</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

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

              <div>
                <label className={labelClass}>Art des Events</label>
                <select
                  required
                  value={form.eventType}
                  onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="" className="bg-[#0A0A0A]">Bitte auswählen</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#0A0A0A]">{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Nachricht (optional)</label>
                <textarea
                  rows={4}
                  placeholder="Erzähl mir von deinem Event — Ort, Ablauf, besondere Wünsche..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className={`
                  w-full text-xs font-semibold tracking-[0.2em] py-4 rounded-lg transition-all duration-300
                  flex items-center justify-center gap-3 group cursor-pointer
                  ${canSubmit
                    ? 'bg-[#FF2200] text-white hover:bg-white hover:text-[#0A0A0A]'
                    : 'bg-white/5 text-white/25 cursor-not-allowed border border-white/10'}
                `}
              >
                ANFRAGE ABSENDEN
                {canSubmit && (
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
              </button>

              <p className="text-white/20 text-[11px] text-center">
                Kein Spam. Nur direkte Kommunikation.
              </p>
            </motion.form>
          </div>
        ) : (
          <motion.div
            className="py-20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-[#FF2200]/15 border border-[#FF2200]/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-[#FF2200]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white text-2xl font-medium">Anfrage erhalten!</p>
            <p className="text-white/40 mt-3 text-sm">
              {formattedDate} um {selectedTime} Uhr — ich melde mich innerhalb von 24 Stunden.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
