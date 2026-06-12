import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Generational Heritage',
    text: 'Cultivating over 500 acres of pristine tropical groves. From a single family plot to a globally trusted B2B import partner.',
  },
  {
    title: 'Regenerative Agriculture',
    text: 'Practicing organic cultivation: zero chemical pesticides, precision solar-powered irrigation, and native intercropping to enrich soil ecology.',
  },
  {
    title: 'Supply Scale',
    text: 'Over 50,000 mature, high-yielding trees delivering a consistent volume of 2+ million nuts annually to prevent supply chain disruption.',
  },
  {
    title: 'Global Certification',
    text: 'GLOBALG.A.P. certified operations with end-to-end batch traceability, phytosanitary clearance, and independent laboratory verification.',
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
        <span className="section-label about-label">About Our Estate</span>
        <h2 className="section-title about-title">Generations of Cultivation,<br />Built on Sustainability</h2>
        <p className="section-sub about-sub">
          From our family-owned agricultural estate to your global supply chain,
          we deliver premium-grade tropical coconuts with uncompromising quality control
          and verified ecological standards.
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
