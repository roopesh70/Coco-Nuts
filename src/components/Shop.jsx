import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

/* Product SVG icons — premium vector representations */
const ProductIcon = ({ id }) => {
  const icons = {
    '01': (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shop-product-icon-svg" aria-hidden="true">
        {/* Brown coconut outer */}
        <ellipse cx="24" cy="25" rx="16" ry="19" fill="url(#cocoa-grad)" />
        {/* Shell highlight */}
        <ellipse cx="20" cy="20" rx="6" ry="8" fill="rgba(200,160,80,0.08)" />
        {/* Water inside */}
        <ellipse cx="24" cy="27" rx="8" ry="6" fill="rgba(255,255,255,0.06)" />
        {/* Eye dimples */}
        <circle cx="20" cy="13" r="1.5" fill="rgba(30,18,8,0.5)" />
        <circle cx="28" cy="13" r="1.5" fill="rgba(30,18,8,0.5)" />
        {/* Gradients */}
        <defs>
          <radialGradient id="cocoa-grad" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#8B6938" />
            <stop offset="60%" stopColor="#6D4C2A" />
            <stop offset="100%" stopColor="#3E2723" />
          </radialGradient>
        </defs>
      </svg>
    ),
    '02': (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shop-product-icon-svg" aria-hidden="true">
        {/* Green young coconut body */}
        <ellipse cx="24" cy="26" rx="15" ry="18" fill="url(#green-coco-grad)" />
        {/* Light reflection */}
        <ellipse cx="19" cy="21" rx="4" ry="7" fill="rgba(255,255,255,0.1)" />
        {/* Stem */}
        <rect x="22" y="6" width="4" height="6" rx="2" fill="#4a7c3f" />
        {/* Leaves */}
        <path d="M22 8 Q14 3 10 8" stroke="#5a8f4e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M26 8 Q34 3 38 8" stroke="#5a8f4e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <defs>
          <radialGradient id="green-coco-grad" cx="38%" cy="30%">
            <stop offset="0%" stopColor="#7BC67E" />
            <stop offset="40%" stopColor="#5EAA61" />
            <stop offset="75%" stopColor="#3D8B40" />
            <stop offset="100%" stopColor="#2A6B2D" />
          </radialGradient>
        </defs>
      </svg>
    ),
    '03': (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shop-product-icon-svg" aria-hidden="true">
        {/* Copra piece */}
        <path d="M14 18 Q18 12 24 14 Q30 12 34 18 Q36 24 34 30 Q30 36 24 34 Q18 36 14 30 Q12 24 14 18Z" fill="url(#copra-grad)" />
        {/* Crack lines */}
        <path d="M20 16 L22 24 L18 28" stroke="rgba(0,0,0,0.15)" strokeWidth="1" fill="none" />
        <path d="M28 18 L26 26 L30 30" stroke="rgba(0,0,0,0.1)" strokeWidth="1" fill="none" />
        {/* Texture dots */}
        <circle cx="22" cy="22" r="1" fill="rgba(0,0,0,0.08)" />
        <circle cx="26" cy="24" r="0.8" fill="rgba(0,0,0,0.06)" />
        <defs>
          <radialGradient id="copra-grad" cx="40%" cy="35%" >
            <stop offset="0%" stopColor="#D4B896" />
            <stop offset="50%" stopColor="#C4A07A" />
            <stop offset="100%" stopColor="#A07D5A" />
          </radialGradient>
        </defs>
      </svg>
    ),
    '04': (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shop-product-icon-svg" aria-hidden="true">
        {/* Oil bottle */}
        <rect x="16" y="14" width="16" height="22" rx="3" fill="url(#bottle-grad)" />
        {/* Bottle neck */}
        <rect x="20" y="8" width="8" height="8" rx="2" fill="rgba(200,180,120,0.3)" />
        {/* Cap */}
        <rect x="19.5" y="6" width="9" height="4" rx="1.5" fill="#c4a77d" />
        {/* Oil inside */}
        <rect x="18" y="20" width="12" height="14" rx="2" fill="rgba(255,210,100,0.25)" />
        {/* Drop */}
        <path d="M30 18 Q34 22 33 26 Q32 29 30 28" fill="rgba(255,210,100,0.3)" />
        {/* Label */}
        <rect x="18" y="24" width="12" height="2" rx="0.5" fill="rgba(196,167,125,0.2)" />
        <defs>
          <linearGradient id="bottle-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(200,190,160,0.15)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(200,190,160,0.1)" />
          </linearGradient>
        </defs>
      </svg>
    ),
    '05': (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shop-product-icon-svg" aria-hidden="true">
        {/* Organic leaf badge */}
        <circle cx="24" cy="24" r="18" stroke="rgba(93,140,91,0.3)" strokeWidth="1" fill="rgba(93,140,91,0.06)" />
        {/* Large leaf */}
        <path d="M24 14 Q30 18 32 24 Q30 30 24 28 Q20 26 18 24 Q20 18 24 14Z" fill="url(#leaf-grad)" />
        {/* Stem */}
        <path d="M24 14 L24 10" stroke="#5d8c5b" strokeWidth="1.5" strokeLinecap="round" />
        {/* Vein */}
        <path d="M24 16 L24 26" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        {/* Small decorative dots */}
        <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.2)" />
        <circle cx="28" cy="22" r="0.8" fill="rgba(255,255,255,0.15)" />
        {/* Check mark */}
        <path d="M30 18 L22 28 L18 24" stroke="#5d8c5b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <radialGradient id="leaf-grad" cx="40%" cy="30%" >
            <stop offset="0%" stopColor="#7BC67E" />
            <stop offset="100%" stopColor="#3D8B40" />
          </radialGradient>
        </defs>
      </svg>
    ),
    '06': (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shop-product-icon-svg" aria-hidden="true">
        {/* Box/package */}
        <rect x="10" y="18" width="28" height="20" rx="2" fill="url(#box-grad)" stroke="rgba(196,167,125,0.15)" strokeWidth="0.5" />
        {/* Lid */}
        <rect x="10" y="14" width="28" height="6" rx="1" fill="rgba(196,167,125,0.1)" stroke="rgba(196,167,125,0.12)" strokeWidth="0.5" />
        {/* Tape */}
        <rect x="21" y="14" width="6" height="24" rx="0.5" fill="rgba(196,167,125,0.06)" />
        {/* Globe lines */}
        <circle cx="24" cy="28" r="5" stroke="rgba(196,167,125,0.2)" strokeWidth="0.8" fill="none" />
        <ellipse cx="24" cy="28" rx="5" ry="2" stroke="rgba(196,167,125,0.15)" strokeWidth="0.5" fill="none" />
        <path d="M19 28 Q24 24 29 28" stroke="rgba(196,167,125,0.15)" strokeWidth="0.5" fill="none" />
        <path d="M19 28 Q24 32 29 28" stroke="rgba(196,167,125,0.15)" strokeWidth="0.5" fill="none" />
        {/* Arrow */}
        <path d="M24 11 L24 8 M22 10 L24 8 L26 10" stroke="rgba(196,167,125,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="box-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>
      </svg>
    ),
  }
  return icons[id] || null
}

const products = [
  {
    id: '01',
    name: 'Fresh Mature Coconuts',
    desc: 'Premium Grade A coconuts (11-12 months). High meat thickness and excellent water yield. Best suited for copra drying, milling, and fresh wholesale.',
    specs: ['Grade 20–25', '≤45% Moisture', '50kg Mesh Bags'],
    moq: 'MOQ: 500 Coconuts',
    benefits: [
      'Hand-graded for export-level maturity (11-12 months)',
      'High kernel weight with optimal moisture retention',
      'Clean, nutrient-dense coconut water',
      'Shipped in high-tensile 50kg mesh sacks',
    ],
  },
  {
    id: '02',
    name: 'Tender Young Coconuts',
    desc: 'Green drinking coconuts harvested at 6-7 months. Contains sweet, electrolyte-rich water and soft jelly-textured meat. Prepared for direct shelf placement.',
    specs: ['Grade 18–22', '6–7 Months', '30-Nut Cartons'],
    moq: 'MOQ: 200 Cartons',
    benefits: [
      'Meticulously harvested at peak sweetness (6-7 months)',
      'Pristine source of natural hydration',
      'Soft, premium culinary-grade jelly meat',
      'Complete batch tracking from tree to client',
    ],
  },
  {
    id: '03',
    name: 'Industrial Copra',
    desc: 'Sun and kiln-dried coconut kernels. High extraction efficiency with minimized free fatty acid content. The preferred raw material for commercial oil expellers.',
    specs: ['Moisture ≤6%', 'Oil Content ≥65%', '50kg Bags'],
    moq: 'MOQ: 1 Metric Ton',
    benefits: [
      'Kiln-dried under controlled heat to moisture ≤6%',
      'High oil yield (65%+) for optimized manufacturing',
      'Excellent physical stability during shipping',
      'Unaltered, natural coconut aroma',
    ],
  },
  {
    id: '04',
    name: 'Virgin Coconut Oil',
    desc: 'Pure cold-pressed, unrefined VCO extracted from fresh white kernels. Retains original fragrance, lauric acid, and bioactive properties.',
    specs: ['Acidity ≤0.2%', '200kg Drums', '20MT Flexitanks'],
    moq: 'MOQ: 1 Drum (200L)',
    benefits: [
      'Cold-pressed from freshly harvested kernel meat',
      'Ultra-low acidity (≤0.2%) for premium grades',
      'Ideal for beauty, pharmaceutical, and food brands',
      'Supplied in food-grade drums or large bulk flexitanks',
    ],
  },
  {
    id: '05',
    name: 'Certified Organic Range',
    desc: 'Produce grown on fully organic parcels. Backed by USDA Organic and EU Organic certifications with full chain-of-custody documentation.',
    specs: ['USDA Organic', 'EU Organic', 'Full Traceability'],
    moq: 'MOQ: 1,000 Coconuts',
    benefits: [
      'Verified USDA Organic and EU Organic status',
      'Zero exposure to chemical fertilizers or pest control',
      'Comprehensive chain-of-custody logs included',
      'Unlocks premium organic consumer markets',
    ],
  },
  {
    id: '06',
    name: 'Bespoke Bulk Solutions',
    desc: 'Tailored specifications, custom packing sizes, and scheduled annual contract deliveries to fit your exact business operations.',
    specs: ['Custom Specs', 'Flexible Packing', 'FOB/CIF Logistics'],
    moq: 'Contact for Quote',
    benefits: [
      'Customizable size sortings and specialized packaging',
      'Flexible contract cycles for volume manufacturers',
      'Door-to-door global shipping terms (FOB, CIF, CFR)',
      'Dedicated import/export account manager',
    ],
  },
]



const features = [
  { icon: '◆', label: 'Premium Quality' },
  { icon: '●', label: 'Export Ready' },
  { icon: '■', label: 'Bulk Pricing' },
  { icon: '▲', label: 'Global Delivery' },
]

export default function Shop({ layout = 'center', openQuoteModal }) {
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

      tl.fromTo('.shop-label',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
      tl.fromTo('.shop-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.15'
      )
      tl.fromTo('.shop-sub',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      )
      tl.fromTo('.shop-hex-card',
        { opacity: 0, y: 40, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.5)' },
        '-=0.15'
      )
      tl.fromTo('.shop-features',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.2'
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])



  const leftProducts = products.slice(0, 3)
  const rightProducts = products.slice(3, 6)

  return (
    <section ref={sectionRef} className="section shop-section" id="shop" data-layout={layout}>
      <div className="shop-bg-dots" aria-hidden="true" />
      <div className="section-container shop-container">
        <span className="section-label shop-label">Wholesale Products</span>
        <h2 className="section-title shop-title">Wholesale Portfolio</h2>
        <p className="section-sub shop-sub">
          Premium agricultural products and derivatives customized for food manufacturing, cosmetics, and large-scale distribution.
        </p>

        <div className="shop-main">
          <div className="shop-column shop-column-left">
            {leftProducts.map((product) => (
              <div key={product.id} className="shop-hex-card" tabIndex="0">
                <span className="shop-hex-badge">{product.id}</span>
                <div className="shop-hex-icon-wrap">
                  <ProductIcon id={product.id} />
                </div>
                <h3 className="shop-hex-name">{product.name}</h3>
                <p className="shop-hex-desc">{product.desc}</p>
                <div className="shop-hex-specs">
                  {product.specs.map((spec, j) => (
                    <span key={j} className="shop-hex-spec">{spec}</span>
                  ))}
                </div>
                <span className="shop-hex-moq">{product.moq}</span>
                <button className="shop-hex-btn" onClick={() => openQuoteModal(product)}>Request Quote</button>

                {/* Hover overlay — expanded product preview */}
                <div className="shop-hex-overlay" aria-hidden="true">
                  <div className="shop-hex-overlay-inner">
                    <div className="shop-hex-overlay-icon">
                      <ProductIcon id={product.id} />
                    </div>
                    <h4 className="shop-hex-overlay-name">{product.name}</h4>
                    <ul className="shop-hex-overlay-benefits">
                      {product.benefits.map((benefit, k) => (
                        <li key={k} className="shop-hex-overlay-benefit">{benefit}</li>
                      ))}
                    </ul>
                    <button className="shop-hex-overlay-btn" onClick={() => openQuoteModal(product)}>Get a Quote</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="shop-column shop-column-center" aria-hidden="true" />

          <div className="shop-column shop-column-right">
            {rightProducts.map((product) => (
              <div key={product.id} className="shop-hex-card" tabIndex="0">
                <span className="shop-hex-badge">{product.id}</span>
                <div className="shop-hex-icon-wrap">
                  <ProductIcon id={product.id} />
                </div>
                <h3 className="shop-hex-name">{product.name}</h3>
                <p className="shop-hex-desc">{product.desc}</p>
                <div className="shop-hex-specs">
                  {product.specs.map((spec, j) => (
                    <span key={j} className="shop-hex-spec">{spec}</span>
                  ))}
                </div>
                <span className="shop-hex-moq">{product.moq}</span>
                <button className="shop-hex-btn" onClick={() => openQuoteModal(product)}>Request Quote</button>

                {/* Hover overlay — expanded product preview */}
                <div className="shop-hex-overlay" aria-hidden="true">
                  <div className="shop-hex-overlay-inner">
                    <div className="shop-hex-overlay-icon">
                      <ProductIcon id={product.id} />
                    </div>
                    <h4 className="shop-hex-overlay-name">{product.name}</h4>
                    <ul className="shop-hex-overlay-benefits">
                      {product.benefits.map((benefit, k) => (
                        <li key={k} className="shop-hex-overlay-benefit">{benefit}</li>
                      ))}
                    </ul>
                    <button className="shop-hex-overlay-btn" onClick={() => openQuoteModal(product)}>Get a Quote</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



        <div className="shop-features">
          {features.map((feature) => (
            <div key={feature.label} className="shop-feature-item">
              <span className="shop-feature-icon">{feature.icon}</span>
              <span className="shop-feature-label">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
