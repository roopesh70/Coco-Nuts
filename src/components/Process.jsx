import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'Hand-Selected Harvest', desc: 'Skilled arborists select only peak-matured nuts (11-12 months) or young drinking nuts (6-7 months) directly on the tree.' },
  { num: '02', title: 'Classification & Sorting', desc: 'Washed and graded by size (standard export specifications 18-25). Only defect-free Grade A fruit enters our staging.' },
  { num: '03', title: 'Cold-Chain Preparation', desc: 'Packed in ventilated, high-durability crates within 4 hours of harvest, then moved to our temperature-regulated staging bays.' },
  { num: '04', title: 'Laboratory Inspection', desc: 'Every batch undergoes rigorous quality-control checks, testing for moisture content, purity, and chemical-free cultivation.' },
  { num: '05', title: 'Global Trade Dispatch', desc: 'Swift dispatch from estate to port. We manage the entire trade documentation package including origin certificates and phytosanitary permits.' },
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
        <span className="section-label process-label">The Supply Chain</span>
        <h2 className="section-title process-title">From Tree to Port: Meticulously Managed</h2>
        <p className="section-sub process-sub">
          Every coconut travels through a highly optimized, temperature-controlled pipeline
          ensuring peak freshness and structure upon delivery.
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
