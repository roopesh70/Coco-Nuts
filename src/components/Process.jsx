import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'Hand-Selected at Peak', desc: 'Skilled harvesters pick only fully mature coconuts at 11-12 months. Each nut is inspected on the tree before cutting.' },
  { num: '02', title: 'Graded & Sorted', desc: 'Coconuts are washed, sorted by size (grades 18-25), and checked for defects. Only Grade A nuts proceed.' },
  { num: '03', title: 'Cold-Chain Packed', desc: 'Within 4 hours of harvest, nuts are packed in ventilated crates. Temperature-controlled staging preserves freshness.' },
  { num: '04', title: 'Lab Tested', desc: 'Every batch is sampled for moisture content, mold, and residue. Certificates accompany all wholesale orders.' },
  { num: '05', title: 'Shipped Within 24h', desc: 'Direct from farm to your warehouse. We handle all documentation — phytosanitary, origin, and export paperwork.' },
]

export default function Process({ layout = 'left' }) {
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
      tl.fromTo('.process-label',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      // 2. Title slides up
      tl.fromTo('.process-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.2'
      )
      // 3. Subtitle fades in
      tl.fromTo('.process-sub',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      // 4. Steps slide in from the left
      tl.fromTo('.process-step',
        { opacity: 0, x: -35, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, stagger: 0.2 },
        '-=0.2'
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section" id="process" data-layout={layout}>
      <div className="section-container">
        <span className="section-label process-label">Our Process</span>
        <h2 className="section-title process-title">From Tree to Your Warehouse</h2>
        <p className="section-sub process-sub">
          Every coconut travels a carefully managed path from farm to export,
          ensuring peak quality when it reaches you.
        </p>
        <div className="process-steps">
          {steps.map((step, i) => (
            <div key={i} className="process-step">
              <div className="step-number">{step.num}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
