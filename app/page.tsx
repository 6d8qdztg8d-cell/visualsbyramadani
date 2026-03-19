import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import VideoSection from '@/components/VideoSection'
import BookingCalendar from '@/components/BookingCalendar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Portfolio />
      <VideoSection />
      <BookingCalendar />
      <Contact />
      <Footer />
    </main>
  )
}
