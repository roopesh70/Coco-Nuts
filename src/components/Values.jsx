import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { icon: '✓', title: 'Guaranteed Consistency', text: 'With a crop rejection rate under 0.5%, we guarantee consistent size, shape, and maturity in every batch.' },
  { icon: '♻️', title: 'Circular Zero-Waste', text: 'Operating a zero-waste plantation: husks become bio-coir, shells become active carbon, and water is reclaimed for farm use.' },
  { icon: '🤝', title: 'Reliability of Supply', text: 'Year-round production cycles and 200,000+ monthly nut capacity. We honor contract pricing despite market shifts.' },
  { icon: '🌍', title: 'Carbon-Positive Farm', text: 'We offset 120% of operations through solar transition, native forestation, and coastal mangrove planting.' },
  { icon: '🔬', title: 'Granular Traceability', text: 'Pallet-level digital tracking. Scan the QR code on delivery to see harvest dates and block origins.' },
  { icon: '📋', title: 'Comprehensive Customs', text: 'All trade documents managed in-house—phytosanitary certificates, health filings, and bill of lading releases.' },
]

export default function Values({ layout = 'right' }) {
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

      // 1. Section label fades in
      tl.fromTo('.values-label',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      // 2. Title slides up
      tl.fromTo('.values-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.2'
      )
      // 3. Subtitle fades in
      tl.fromTo('.values-sub',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      // 4. Value items stagger in
      tl.fromTo('.value-item',
        { opacity: 0, y: 25, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2 },
        '-=0.2'
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section" id="values" data-layout={layout}>
      <div className="section-container">
        <span className="section-label values-label">The Coco Nuts Advantage</span>
        <h2 className="section-title values-title">The Import Partner of Choice</h2>
        <p className="section-sub values-sub">
          We go beyond supplying raw ingredients. We establish stable, transparent, and high-performance supply partnerships.
        </p>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-item">
              <span className="value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
