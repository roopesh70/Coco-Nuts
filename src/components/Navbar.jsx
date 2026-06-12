import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Shop', href: '#shop' },
  { label: 'Values', href: '#values' },
]

export default function Navbar({ openQuoteModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCtaClick = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (openQuoteModal) {
      openQuoteModal({
        id: 'custom',
        name: 'Bespoke Bulk Solutions',
        desc: 'Custom specifications, packaging, or shipping schedules for volume trade buyers.',
        specs: ['Tailored Grades', 'Flexible Volume', 'Global Logistics'],
        moq: 'Contact Sales for Details',
        benefits: [
          'Fully custom product size sorting and grading',
          'Flexible trade payment terms (T/T, L/C)',
          'Complete phytosanitary and export documentation',
          'Direct logistics routing under FOB/CIF/CFR terms'
        ]
      })
    }
  }

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#" className="navbar-logo" onClick={(e) => handleClick(e, '#top')}>
          <span className="navbar-logo-text">COCO NUTS</span>
        </a>

        <button
          className={`navbar-toggle${menuOpen ? ' navbar-toggle--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`navbar-links${menuOpen ? ' navbar-links--open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="navbar-cta-mobile">
            <a href="#shop" className="navbar-cta" onClick={handleCtaClick}>
              Get a Quote
            </a>
          </li>
        </ul>

        <a href="#shop" className="navbar-cta navbar-cta-desktop" onClick={handleCtaClick}>
          Get a Quote
        </a>
      </div>
    </nav>
  )
}
