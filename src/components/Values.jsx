import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { icon: '✓', title: 'Uncompromising Quality', text: 'Every coconut is hand-graded and lab-tested. Our rejection rate is under 0.5% — among the lowest in the industry.' },
  { icon: '♻️', title: 'Zero-Waste Farm', text: 'Husks become coir, shells become biochar, wastewater is recycled. Nothing goes to waste.' },
  { icon: '🤝', title: 'Supply Reliability', text: 'Year-round production, monthly capacity of 200,000+ nuts. We honor contracts regardless of market shifts.' },
  { icon: '🌍', title: 'Carbon-Positive', text: 'We offset 120% of emissions through on-farm solar, reforestation, and mangrove conservation.' },
  { icon: '🔬', title: 'Full Traceability', text: 'Batch-level tracking from harvest to delivery. QR-code enabled for every pallet shipped.' },
  { icon: '📋', title: 'Hassle-Free Docs', text: 'We handle all export documentation — phytosanitary, health certs, origin, and bill of lading.' },
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
        <span className="section-label values-label">Why Buy From Us</span>
        <h2 className="section-title values-title">Trusted by Buyers Worldwide</h2>
        <p className="section-sub values-sub">
          When you partner with us, you get more than coconuts — you get
          consistency, transparency, and a team that delivers.
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
