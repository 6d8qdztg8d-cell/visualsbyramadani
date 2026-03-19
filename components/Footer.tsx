export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-10" style={{ paddingBottom: 'max(2.5rem, calc(env(safe-area-inset-bottom) + 1.5rem))' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <span
          className="text-white tracking-tighter text-2xl"
          style={{ fontFamily: 'var(--font-anton)' }}
        >
          VISUALS BY RAMADANI
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white transition-colors duration-200 text-xs tracking-[0.2em]"
          >
            INSTAGRAM
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white transition-colors duration-200 text-xs tracking-[0.2em]"
          >
            YOUTUBE
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white transition-colors duration-200 text-xs tracking-[0.2em]"
          >
            LINKEDIN
          </a>
        </div>

        <p className="text-white/25 text-xs">
          © 2025 Visuals by Ramadani. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  )
}
