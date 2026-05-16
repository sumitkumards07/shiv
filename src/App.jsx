import { useEffect, useMemo, useState } from 'react'
import referenceImg from './assets/website-reference.png'
import heroImg from './assets/hero.jpg'
import room2BedImg from './assets/room-2bed.png'
import roomBestImg from './assets/room-best.png'
import room4BedImg from './assets/room-4bed.png'

const CONTACT_PHONE_DISPLAY = '+91 83978 78010'
const CONTACT_PHONE_E164 = '+918397878010'
const WHATSAPP_NUMBER_E164 = '918397878010'

const POLICIES = {
  'Terms & Conditions': {
    title: 'Terms & Conditions',
    content: (
      <div className="space-y-4">
        <p>Welcome to Shree Mahakaleshwar Bhakt Niwas. By accessing this website and booking our services, you agree to comply with and be bound by the following terms and conditions.</p>
        <h4 className="font-bold text-slate-900">1. Booking and Cancellation</h4>
        <p>All bookings are subject to availability. Full payment or a deposit may be required at the time of booking to secure your reservation.</p>
        <h4 className="font-bold text-slate-900">2. Check-in and Check-out</h4>
        <p>Check-in time is 12:00 PM and Check-out time is 11:00 AM. Early check-in or late check-out is subject to availability and may incur additional charges.</p>
        <h4 className="font-bold text-slate-900">3. Guest Conduct</h4>
        <p>Guests are expected to maintain decorum and respect the sanctity of the place. Any behavior deemed inappropriate may result in immediate eviction without refund.</p>
      </div>
    )
  },
  'Privacy Policy': {
    title: 'Privacy Policy',
    content: (
      <div className="space-y-4">
        <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
        <h4 className="font-bold text-slate-900">1. Information Collection</h4>
        <p>We collect information you provide directly to us, such as when you make a booking, subscribe to our newsletter, or contact us.</p>
        <h4 className="font-bold text-slate-900">2. Use of Information</h4>
        <p>We use your information to process bookings, provide customer support, and send promotional communications if you have opted in.</p>
        <h4 className="font-bold text-slate-900">3. Data Security</h4>
        <p>We implement industry-standard security measures to protect your personal data from unauthorized access or disclosure.</p>
      </div>
    )
  },
  'Disclaimer': {
    title: 'Disclaimer',
    content: (
      <div className="space-y-4">
        <p>The information provided on this website is for general informational purposes only. While we strive for accuracy, we make no representations or warranties of any kind about the completeness or reliability of the information.</p>
        <h4 className="font-bold text-slate-900">1. Limitation of Liability</h4>
        <p>In no event will Shree Mahakaleshwar Bhakt Niwas be liable for any loss or damage arising out of, or in connection with, the use of this website.</p>
        <h4 className="font-bold text-slate-900">2. External Links</h4>
        <p>Our website may contain links to external sites that are not operated by us. We have no control over the content and practices of these sites.</p>
      </div>
    )
  },
  'Cancellation & Refund Policy': {
    title: 'Cancellation & Refund Policy',
    content: (
      <div className="space-y-4">
        <p>We understand that plans can change. Our cancellation and refund policy is as follows:</p>
        <h4 className="font-bold text-slate-900">1. Cancellation Timelines</h4>
        <p>- Cancellations made 48 hours or more before check-in: Full refund (minus processing fees).<br/>- Cancellations made less than 48 hours before check-in: No refund.</p>
        <h4 className="font-bold text-slate-900">2. Refund Processing</h4>
        <p>Refunds will be processed within 7-10 working days to the original mode of payment.</p>
        <h4 className="font-bold text-slate-900">3. No-Show Policy</h4>
        <p>In case of a no-show, the entire booking amount will be forfeited.</p>
      </div>
    )
  }
};

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact Us', href: '#contact' },
]

const rooms = [
  {
    title: 'Ac Room 2 bed',
    price: '₹1,650',
    description:
      'Compact and comfortable with 2 beds and full AC, ideal for travelers.',
    badge: null,
    features: ['2 Beds', 'AC', 'WiFi', 'TV', 'Hot Water'],
    image: room2BedImg,
  },
  {
    title: 'Best Room',
    price: '₹2,445',
    description:
      'Our premium offering with the best views and comfort.',
    badge: 'TOP CHOICE',
    features: ['Comfortable Bed', 'AC', 'WiFi', 'TV', 'Hot Water'],
    image: roomBestImg,
  },
  {
    title: 'Ac room 4 bed',
    price: '₹2,500',
    description:
      'Spacious room with 4 beds, perfect for groups.',
    badge: null,
    features: ['4 Beds', 'AC', 'WiFi', 'TV', 'Hot Water'],
    image: room4BedImg,
  },
]

const amenities = [
  { title: 'Wi‑Fi', subtitle: 'Wi‑Fi and access via Wi‑Fi', icon: WifiIcon },
  { title: 'Intercom', subtitle: 'Devices service and intercom', icon: PhoneIcon },
  { title: 'RO Water', subtitle: 'Every technology for RO water', icon: DropIcon },
  { title: 'Hot Water', subtitle: '24×7 hot water available', icon: FlameIcon },
  { title: 'Lift', subtitle: 'Lift to ease travel in the building', icon: ElevatorIcon },
  { title: 'Free Parking', subtitle: 'Free parking for our guests', icon: CarIcon },
]

function App() {
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [activePolicy, setActivePolicy] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState('')
  const [enquiryDefaults, setEnquiryDefaults] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
  })

  const [availability, setAvailability] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
  })

  const openEnquiry = (roomTitle) => {
    setSelectedRoom(roomTitle)
    setEnquiryDefaults({ checkIn: '', checkOut: '', guests: '2' })
    setEnquiryOpen(true)
  }

  const openAvailabilityEnquiry = () => {
    setSelectedRoom('')
    setEnquiryDefaults(availability)
    setEnquiryOpen(true)
  }

  return (
    <div className="min-h-dvh bg-white">
      <header className="sticky top-0 z-40 bg-brand-navy/90 text-white backdrop-blur">
        <div className="container-page flex h-14 items-center justify-between gap-6">
          <a
            href="#home"
            className="flex items-center gap-2 font-semibold tracking-wide"
          >
            <span className="grid size-8 place-items-center rounded bg-white/10 ring-1 ring-white/15">
              <TempleIcon className="size-5 text-brand-gold" />
            </span>
            <span className="text-sm sm:text-base">
              Shree Mahakaleshwar
              <span className="text-white/75"> Bhakt Niwas</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#learn-more"
              className="rounded bg-brand-gold px-3 py-1.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-brand-gold2"
            >
              Learn more
            </a>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="relative isolate overflow-hidden bg-brand-navy text-white">
          <img
            src={heroImg}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/20" />

          <div className="container-page flex min-h-[520px] items-center py-14 sm:py-20">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15">
                <span className="size-1.5 rounded-full bg-brand-gold" />
                Trusted stay near Mahakaleshwar
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Experience Luxury
                <br />
                Like Never Before
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
                Experience exceptional amenities, stunning views, and outstanding
                service in an exclusive setting.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#learn-more"
                  className="rounded bg-brand-gold px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-brand-gold2"
                >
                  Learn more
                </a>
                <a
                  href="#rooms"
                  className="rounded px-4 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/20 transition hover:bg-white/10"
                >
                  View rooms
                </a>
              </div>

              <a
                href="#rooms"
                className="mt-12 inline-flex items-center gap-2 text-xs font-medium text-white/70 hover:text-white"
              >
                <span>Scroll Down</span>
                <span className="grid size-8 place-items-center rounded-full bg-brand-gold text-slate-950">
                  <ArrowDownIcon className="size-4" />
                </span>
              </a>
            </div>
          </div>

          <div className="container-page pb-10">
            <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/15 backdrop-blur sm:p-5">
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="grid gap-1">
                  <label className="text-[11px] font-semibold text-white/80">
                    Check‑in
                  </label>
                  <input
                    type="date"
                    value={availability.checkIn}
                    onChange={(e) =>
                      setAvailability((s) => ({ ...s, checkIn: e.target.value }))
                    }
                    className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-[11px] font-semibold text-white/80">
                    Check‑out
                  </label>
                  <input
                    type="date"
                    value={availability.checkOut}
                    onChange={(e) =>
                      setAvailability((s) => ({ ...s, checkOut: e.target.value }))
                    }
                    className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-[11px] font-semibold text-white/80">
                    Guests
                  </label>
                  <select
                    value={availability.guests}
                    onChange={(e) =>
                      setAvailability((s) => ({ ...s, guests: e.target.value }))
                    }
                    className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  >
                    {['1', '2', '3', '4', '5', '6', '7', '8'].map((n) => (
                      <option key={n} value={n} className="text-slate-900">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={openAvailabilityEnquiry}
                    className="w-full rounded-lg bg-brand-gold px-4 py-3 text-sm font-extrabold tracking-wide text-slate-950 transition hover:bg-brand-gold2"
                  >
                    CHECK AVAILABILITY
                  </button>
                </div>
              </div>
              <div className="mt-3 text-xs text-white/70">
                Fill dates & guests to enquire about availability.
              </div>
            </div>
          </div>
        </section>

        <section id="rooms" className="bg-white py-14 sm:py-20">
          <div className="container-page">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-gold2 sm:text-3xl">
                Featured Accommodations
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Choose a room that fits your stay.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {rooms.map((room) => (
                <article
                  key={room.title}
                  className="overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-slate-200"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={room.image}
                      alt={room.title}
                      className="h-full w-full object-cover"
                    />
                    {room.badge ? (
                      <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-brand-gold px-3 py-1 text-[11px] font-extrabold tracking-wide text-slate-950 shadow-sm">
                        {room.badge}
                      </div>
                    ) : null}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-extrabold tracking-wide text-slate-900">
                      {room.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">
                      {room.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {room.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <div className="text-base font-extrabold text-brand-gold2">
                        {room.price}
                      </div>
                      <button
                        type="button"
                        onClick={() => openEnquiry(room.title)}
                        className="rounded bg-brand-navy px-4 py-2 text-xs font-extrabold tracking-wide text-white transition hover:bg-brand-navy2"
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <a
                href="#"
                className="rounded bg-white px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-300 transition hover:bg-slate-50"
              >
                View All Rooms
              </a>
            </div>
          </div>
        </section>

        <section className="bg-brand-navy py-14 text-white sm:py-20">
          <div className="container-page">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-gold sm:text-3xl">
                Premium Amenities
              </h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {amenities.map((a) => (
                <div
                  key={a.title}
                  className="flex gap-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand-gold/15 text-brand-gold ring-1 ring-brand-gold/25">
                    <a.icon className="size-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{a.title}</div>
                    <div className="mt-1 text-xs text-white/70">
                      {a.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="container-page">
            <div className="rounded-2xl bg-brand-navy px-6 py-10 text-center text-white shadow-soft sm:px-10">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready for an Unforgettable Experience?
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-white/75">
                Book your stay today and see why Shree Mahakaleshwar Bhakt Niwas
                is a trusted choice for travelers from around the world.
              </p>
              <div className="mt-6 flex justify-center">
                <a
                  href="#contact"
                  className="rounded bg-brand-gold px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-brand-gold2"
                >
                  Book Your Stay Now
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white pb-16">
          <div className="container-page">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Find Us
            </h2>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-slate-200">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-brand-gold/15 text-brand-gold ring-1 ring-brand-gold/25">
                    <PinIcon className="size-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Shree Mahakaleshwar Bhakt Niwas
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      Ujjain, Madhya Pradesh
                    </div>
                    <div className="mt-3 text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">
                        Phone:
                      </span>{' '}
                      {CONTACT_PHONE_DISPLAY}
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Social Media
                  </div>
                  <div className="mt-3 flex gap-2">
                    <SocialButton label="Facebook" />
                    <SocialButton label="Instagram" />
                    <SocialButton label="YouTube" />
                    <SocialButton label="X" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 overflow-hidden rounded-2xl shadow-soft ring-1 ring-slate-200">
                <iframe
                  title="Map"
                  className="h-[320px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Mahakaleshwar%20Temple%20Ujjain&output=embed"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-navy text-white">
        <div className="container-page py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-semibold">
                <span className="grid size-9 place-items-center rounded bg-white/10 ring-1 ring-white/15">
                  <TempleIcon className="size-5 text-brand-gold" />
                </span>
                <span>
                  Shree Mahakaleshwar
                  <span className="text-white/75"> Bhakt Niwas</span>
                </span>
              </div>
              <p className="mt-3 text-sm text-white/70">
                Comfortable rooms, premium amenities, and a peaceful stay.
              </p>
            </div>

            <FooterCol
              title="Quick Links"
              links={[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Bhakt Niwas', href: '#rooms' },
                { label: 'Terms & Conditions', onClick: () => setActivePolicy('Terms & Conditions') },
              ]}
            />
            <FooterCol 
              title="Policies" 
              links={[
                { label: 'Privacy Policy', onClick: () => setActivePolicy('Privacy Policy') },
                { label: 'Disclaimer', onClick: () => setActivePolicy('Disclaimer') },
                { label: 'Cancellation & Refund Policy', onClick: () => setActivePolicy('Cancellation & Refund Policy') },
              ]} 
            />

            <div>
              <div className="text-sm font-semibold">Newsletter Subscription</div>
              <p className="mt-2 text-sm text-white/70">
                Get updates and offers in your inbox.
              </p>
              <form
                className="mt-4 flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded bg-brand-gold px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-gold2"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
            Copyright © {new Date().getFullYear()} Shree Mahakaleshwar Bhakt Niwas.
            All rights reserved.
          </div>
        </div>
      </footer>

      <EnquiryModal
        open={enquiryOpen}
        roomTitle={selectedRoom}
        defaults={enquiryDefaults}
        onClose={() => setEnquiryOpen(false)}
      />

      <PolicyModal
        policy={activePolicy ? POLICIES[activePolicy] : null}
        onClose={() => setActivePolicy(null)}
      />

      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
        <a
          href={`tel:${CONTACT_PHONE_E164}`}
          className="flex items-center gap-2 rounded-full bg-brand-navy px-4 py-3 text-sm font-semibold text-white shadow-soft ring-1 ring-white/10 transition hover:bg-brand-navy2"
          aria-label="Call"
        >
          <PhoneCallIcon className="size-5" />
          Call
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(
            'Hello, I would like to enquire about room availability.'
          )}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-soft ring-1 ring-emerald-400/30 transition hover:bg-emerald-700"
          aria-label="WhatsApp"
        >
          <WhatsappIcon className="size-5" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}

function EnquiryModal({ open, roomTitle, defaults, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: '',
    message: '',
  })

  const title = useMemo(() => roomTitle || 'Room Enquiry', [roomTitle])

  useEffect(() => {
    if (!open) return
    setSubmitted(false)
    setErrors({})
    setForm((s) => ({
      ...s,
      checkIn: defaults?.checkIn ?? '',
      checkOut: defaults?.checkOut ?? '',
      guests: defaults?.guests ?? '2',
      roomType: roomTitle ?? '',
    }))

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const onSubmit = (e) => {
    e.preventDefault()

    const nextErrors = validateEnquiry(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const lines = [
      'Room Enquiry',
      '--------------------',
      `Name: ${form.name || '-'}`,
      `Phone: ${form.phone || '-'}`,
      `Room Type: ${form.roomType || roomTitle || '-'}`,
      `Guests: ${form.guests || '-'}`,
      `Check-in: ${form.checkIn || '-'}`,
      `Check-out: ${form.checkOut || '-'}`,
      form.email ? `Email: ${form.email}` : null,
      form.message ? `Message: ${form.message}` : null,
    ].filter(Boolean)

    const text = lines.join('\n')
    const url = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(
      text
    )}`

    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Enquiry form"
    >
      <button
        type="button"
        aria-label="Close enquiry form"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/55"
      />

      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4 bg-brand-navy px-5 py-4 text-white">
          <div>
            <div className="text-xs font-semibold text-white/70">ENQUIRY</div>
            <div className="mt-1 text-lg font-extrabold tracking-tight">
              {title}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/15 transition hover:bg-white/15"
          >
            Close
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900 ring-1 ring-emerald-200">
              <div className="font-semibold">Thank you!</div>
              <div className="mt-1 text-emerald-800/90">
                We received your enquiry. We will contact you soon.
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded bg-brand-navy px-4 py-2 text-xs font-extrabold tracking-wide text-white transition hover:bg-brand-navy2"
                >
                  DONE
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(v) => setForm((s) => ({ ...s, name: v }))}
                  required
                  error={errors.name}
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder={CONTACT_PHONE_DISPLAY}
                  value={form.phone}
                  onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
                  required
                  error={errors.phone}
                />
              </div>

              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(v) => setForm((s) => ({ ...s, email: v }))}
                error={errors.email}
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Check-in"
                  name="checkin"
                  type="date"
                  value={form.checkIn}
                  onChange={(v) => setForm((s) => ({ ...s, checkIn: v }))}
                  required
                  error={errors.checkIn}
                />
                <Field
                  label="Check-out"
                  name="checkout"
                  type="date"
                  value={form.checkOut}
                  onChange={(v) => setForm((s) => ({ ...s, checkOut: v }))}
                  required
                  error={errors.checkOut}
                />
              </div>

              <div className="grid gap-1">
                <label className="text-xs font-semibold text-slate-700">
                  Guests
                </label>
                <select
                  value={form.guests}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, guests: e.target.value }))
                  }
                  className="w-full rounded-lg bg-white px-3 py-2 text-sm text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                >
                  {['1', '2', '3', '4', '5', '6', '7', '8'].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                {errors.guests ? (
                  <div className="mt-1 text-xs font-medium text-rose-600">
                    {errors.guests}
                  </div>
                ) : null}
              </div>

              <div className="grid gap-1">
                <label className="text-xs font-semibold text-slate-700">
                  Room Type
                </label>
                <select
                  value={form.roomType}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, roomType: e.target.value }))
                  }
                  className="w-full rounded-lg bg-white px-3 py-2 text-sm text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  required
                >
                  <option value="" disabled>
                    Select room type
                  </option>
                  {rooms.map((r) => (
                    <option key={r.title} value={r.title}>
                      {r.title}
                    </option>
                  ))}
                </select>
                {errors.roomType ? (
                  <div className="mt-1 text-xs font-medium text-rose-600">
                    {errors.roomType}
                  </div>
                ) : null}
              </div>

              <div className="grid gap-1">
                <label className="text-xs font-semibold text-slate-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Write your enquiry..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, message: e.target.value }))
                  }
                  className="w-full resize-none rounded-lg bg-white px-3 py-2 text-sm text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
              </div>

              <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  We’ll contact you on phone/email.
                </div>
                <button
                  type="submit"
                  className="rounded bg-brand-gold px-5 py-2.5 text-xs font-extrabold tracking-wide text-slate-950 transition hover:bg-brand-gold2"
                >
                  SEND ENQUIRY
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
  error,
}) {
  return (
    <div className="grid gap-1">
      <label htmlFor={name} className="text-xs font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={[
          'w-full rounded-lg bg-white px-3 py-2 text-sm text-slate-900 ring-1 placeholder:text-slate-400 focus:outline-none focus:ring-2',
          error
            ? 'ring-rose-300 focus:ring-rose-400'
            : 'ring-slate-200 focus:ring-brand-gold',
        ].join(' ')}
      />
      {error ? (
        <div className="text-xs font-medium text-rose-600">{error}</div>
      ) : null}
    </div>
  )
}

function validateEnquiry(form) {
  const errs = {}

  const name = (form.name ?? '').trim()
  const phone = (form.phone ?? '').trim()
  const email = (form.email ?? '').trim()
  const roomType = (form.roomType ?? '').trim()
  const guests = Number(form.guests)
  const checkIn = form.checkIn ?? ''
  const checkOut = form.checkOut ?? ''

  if (!name) errs.name = 'Name is required.'
  if (!phone) errs.phone = 'Phone is required.'
  else {
    const digits = phone.replace(/[^\d]/g, '')
    // Accept 10-digit Indian numbers, or 12 digits starting with 91
    const ok = digits.length === 10 || (digits.length === 12 && digits.startsWith('91'))
    if (!ok) errs.phone = 'Enter a valid phone number.'
  }

  if (email) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!ok) errs.email = 'Enter a valid email.'
  }

  if (!roomType) errs.roomType = 'Please select a room type.'

  if (!Number.isFinite(guests) || guests < 1) errs.guests = 'Guests must be at least 1.'

  if (!checkIn) errs.checkIn = 'Check-in date is required.'
  if (!checkOut) errs.checkOut = 'Check-out date is required.'
  if (checkIn && checkOut) {
    const inDate = new Date(checkIn)
    const outDate = new Date(checkOut)
    if (Number.isNaN(inDate.valueOf()) || Number.isNaN(outDate.valueOf())) {
      errs.checkOut = 'Please enter valid dates.'
    } else if (outDate <= inDate) {
      errs.checkOut = 'Check-out must be after check-in.'
    }
  }

  return errs
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-white/70">
        {links.map((l) => (
          <li key={l.label}>
            {l.onClick ? (
              <button
                type="button"
                onClick={l.onClick}
                className="transition hover:text-white"
              >
                {l.label}
              </button>
            ) : (
              <a href={l.href} className="transition hover:text-white">
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PolicyModal({ policy, onClose }) {
  useEffect(() => {
    if (!policy) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [policy, onClose])

  if (!policy) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/55"
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4 bg-brand-navy px-5 py-4 text-white">
          <div>
            <div className="text-xs font-semibold text-white/70">POLICY</div>
            <div className="mt-1 text-lg font-extrabold tracking-tight">
              {policy.title}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/15 transition hover:bg-white/15"
          >
            Close
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6 sm:p-8">
          <div className="text-sm leading-relaxed text-slate-600">
            {policy.content}
          </div>
          <div className="mt-10 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-brand-navy px-5 py-2.5 text-xs font-extrabold tracking-wide text-white transition hover:bg-brand-navy2"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialButton({ label }) {
  return (
    <a
      href="#"
      className="grid size-9 place-items-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/15 transition hover:bg-white/15 hover:text-white"
      aria-label={label}
      title={label}
    >
      <span className="text-[11px] font-semibold">{label[0]}</span>
    </a>
  )
}

function TempleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2l3 3v2h-6V5l3-3z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 9h12l-1 13H7L6 9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 12h6M9 15h6M9 18h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ArrowDownIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 5v12m0 0l-5-5m5 5l5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WifiIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.5 8.5C8.3 3.6 15.7 3.6 21.5 8.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5.5 11.5c4.2-3.4 8.8-3.4 13 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.8 14.7c2.2-1.7 4.2-1.7 6.4 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 18.6h0"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PhoneIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 4h8v16H8V4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 7h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 18.2h0"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function DropIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2s6 7 6 12a6 6 0 11-12 0c0-5 6-12 6-12z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 14.5c.6 1.6 1.8 2.6 3.4 3.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function FlameIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M13 2s1 4-1 6 0 4 0 4-3-2-3-6C9 3.5 13 2 13 2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 22a7 7 0 007-7c0-3-2-5-3-6 0 2-1 3-2 4-1 1-1 2 0 4-1-1-2-1.5-3-3-1 2-2 3-2 5a7 7 0 007 7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ElevatorIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 3h10a2 2 0 012 2v16H5V5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 7h6v10H9V7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 9l-1 1h2l-1-1zM12 15l-1-1h2l-1 1z"
        fill="currentColor"
      />
    </svg>
  )
}

function CarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 16V9.5c0-.6.2-1.1.5-1.6l1.7-2.7c.4-.7 1.1-1.1 1.9-1.1h4c.8 0 1.5.4 1.9 1.1l1.7 2.7c.3.5.5 1 .5 1.6V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M6 16h12m-11 0v3m10-3v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.5 12h7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 16.8h0M16 16.8h0"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 22s7-6.2 7-13a7 7 0 10-14 0c0 6.8 7 13 7 13z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.2a3 3 0 100-6 3 3 0 000 6z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function PhoneCallIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 5.5l1.7-1.7c.5-.5 1.2-.6 1.8-.3l2.3 1.2c.6.3.9 1 .7 1.6l-.8 2.4c-.2.6 0 1.3.5 1.7l1.9 1.5c.5.4.7 1.1.5 1.7l-.8 2.4c-.2.6-.8 1-1.4 1.1-6.7.7-12.4-5-11.7-11.7.1-.6.5-1.2 1.1-1.4l2.4-.8c.6-.2 1.3 0 1.7.5l1.5 1.9c.4.5 1.1.7 1.7.5l2.4-.8c.6-.2 1.3.1 1.6.7l1.2 2.3c.3.6.2 1.3-.3 1.8L18.5 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WhatsappIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12.1 21c-1.6 0-3.2-.4-4.6-1.2L3 21l1.3-4.2A8.7 8.7 0 013.4 12c0-4.8 3.9-8.7 8.7-8.7S20.8 7.2 20.8 12s-3.9 8.7-8.7 8.7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.8c.2-.5.6-.7 1-.7h.7c.3 0 .6.2.8.6l.7 1.7c.1.3.1.6-.1.9l-.4.6c-.2.3-.2.6 0 .9.5.9 1.3 1.7 2.2 2.2.3.2.6.1.9 0l.6-.4c.3-.2.6-.2.9-.1l1.7.7c.4.2.6.5.6.8v.7c0 .4-.2.8-.7 1-1 .5-2.2.5-3.2.1-2.6-1.1-4.7-3.2-5.8-5.8-.4-1-.4-2.2.1-3.2z"
        fill="currentColor"
      />
    </svg>
  )
}

export default App
