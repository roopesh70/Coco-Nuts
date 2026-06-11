import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Our Heritage',
    text: 'For three generations, our family has cultivated coconuts across 500+ acres of tropical farmland. What began as a small grove is now one of the region\'s most trusted coconut suppliers.',
  },
  {
    title: 'Sustainable Farming',
    text: 'We practice regenerative agriculture — no synthetic pesticides, solar-powered drip irrigation, and intercropping with native species.',
  },
  {
    title: 'Quality at Scale',
    text: 'With 50,000+ bearing trees and an annual yield exceeding 2 million nuts, we deliver consistent quality year-round.',
  },
  {
    title: 'Global Standards',
    text: 'Our farms are GLOBALG.A.P. certified with full traceability from tree to shipment and third-party lab testing on every batch.',
  },
]

export default function About({ layout = 'left' }) {
  const sectionRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      })

      // 1. Section label fades in from above
      tl.fromTo('.about-label',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      // 2. Section title slides up
      tl.fromTo('.about-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.2'
      )
      // 3. Section subtitle fades in
      tl.fromTo('.about-sub',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      // 4. Cards stagger in
      tl.fromTo('.about-card',
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2 },
        '-=0.2'
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section" id="about" data-layout={layout}>
      <div className="section-container">
        <span className="section-label about-label">About Our Farm</span>
        <h2 className="section-title about-title">Premium Coconuts,<br />Generations in the Making</h2>
        <p className="section-sub about-sub">
          From our family farm to your supply chain — we deliver the finest
          fresh coconuts with unwavering quality and sustainability.
        </p>
        <div className="about-grid">
          {cards.map((card, i) => (
            <div key={i} className="about-card">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
