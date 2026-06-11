import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    icon: '🥥',
    name: 'Fresh Mature Coconuts',
    desc: 'Grade A mature (11-12 months). High meat yield, clean water. Ideal for copra, oil milling, and fresh export.',
    spec: 'Grade 20-25 | 50kg mesh bags',
    moq: 'MOQ: 500 nuts',
  },
  {
    icon: '🌴',
    name: 'Tender Young Coconuts',
    desc: 'Green coconuts at 6-7 months. Premium drinking water, soft jelly meat. Export-ready with full traceability.',
    spec: 'Grade 18-22 | 30-nut cartons',
    moq: 'MOQ: 200 cartons',
  },
  {
    icon: '🏭',
    name: 'Copra (Dried Coconut)',
    desc: 'Sun and kiln-dried copra, moisture ≤6%. High oil content (65%+). Perfect for oil expellers.',
    spec: 'Moisture ≤6% | Oil ≥65% | 50kg bags',
    moq: 'MOQ: 1 metric ton',
  },
  {
    icon: '🛢️',
    name: 'Virgin Coconut Oil',
    desc: 'Cold-pressed VCO from fresh kernel. Low acidity (0.2% max). Drums or flexitanks for bulk buyers.',
    spec: 'Acidity ≤0.2% | 200kg drums / 20MT flexitanks',
    moq: 'MOQ: 1 drum (200L)',
  },
  {
    icon: '📦',
    name: 'Custom Bulk Orders',
    desc: 'Need specific grades, pack sizes, or schedules? We accommodate custom specs for volume buyers.',
    spec: 'Tailored to your requirements',
    moq: 'Contact for pricing',
  },
  {
    icon: '🌿',
    name: 'Organic Certified',
    desc: 'USDA Organic and EU Organic certified coconuts. Full chain of custody documentation with every shipment.',
    spec: 'USDA / EU Organic | Batch traceable',
    moq: 'MOQ: 1,000 nuts',
  },
]

export default function Shop({ layout = 'right' }) {
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
      tl.fromTo('.shop-label',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      // 2. Title slides up
      tl.fromTo('.shop-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.2'
      )
      // 3. Subtitle fades in
      tl.fromTo('.shop-sub',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      // 4. Product cards bounce in with a fun back.out ease
      tl.fromTo('.shop-card',
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.6)' },
        '-=0.2'
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section" id="shop" data-layout={layout}>
      <div className="section-container">
        <span className="section-label shop-label">Wholesale Products</span>
        <h2 className="section-title shop-title">Coconut Supply Catalog</h2>
        <p className="section-sub shop-sub">
          Bulk pricing for volume buyers. All prices exclude transport —
          <strong style={{ color: '#c4a77d' }}> contact us for a quote.</strong>
        </p>
        <div className="shop-grid">
          {products.map((product, i) => (
            <div key={i} className="shop-card">
              <span className="product-icon">{product.icon}</span>
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <div className="shop-specs">
                <span className="shop-spec">{product.spec}</span>
                <span className="shop-moq">{product.moq}</span>
              </div>
              <button className="btn">Request Quote</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
