import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'About Our Estate', href: '#about' },
  { label: 'Supply Chain', href: '#process' },
  { label: 'Wholesale Portfolio', href: '#shop' },
  { label: 'Certifications', href: '#values' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17" cy="7" r="1.2" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M8 11v6M8 8v0M12 17v-4.5a2.5 2.5 0 015 0V17M12 12v-.5" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l6.5 8.5L4 20h2.5l5-6 4 6H20l-7-9.5L19.5 4H17l-5 6-4-6H4z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 8.4a3.5 3.5 0 00-2.5-2.5C17.5 5.5 12 5.5 12 5.5s-5.5 0-7.5.4A3.5 3.5 0 002 8.4a36 36 0 00-.5 3.6 36 36 0 00.5 3.6 3.5 3.5 0 002.5 2.5c2 .4 7.5.4 7.5.4s5.5 0 7.5-.4a3.5 3.5 0 002.5-2.5c.4-1.2.5-2.4.5-3.6s-.1-2.4-.5-3.6z" />
        <path d="M10 15.5V8.5l5 3.5-5 3.5z" />
      </svg>
    ),
  },
]

const trustBadges = [
  { icon: '◆', label: 'USDA Organic' },
  { icon: '●', label: 'EU Organic' },
  { icon: '■', label: 'GLOBALG.A.P.' },
  { icon: '▲', label: 'ISO 22000' },
]

export default function Footer({ openQuoteModal, showToast }) {
  const footerRef = useRef()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('idle') // idle | submitting | success | error
  const [showBackToTop, setShowBackToTop] = useState(false)

  /* ---------- Scroll detection for back-to-top ---------- */
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ---------- GSAP entrance animation ---------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      })

      tl.fromTo('.footer-brand-col',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      tl.fromTo('.footer-nav-col',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      tl.fromTo('.footer-contact-col',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      tl.fromTo('.footer-newsletter-col',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      tl.fromTo('.footer-bottom',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  /* ---------- Smooth-scroll handler ---------- */
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  /* ---------- Back-to-top ---------- */
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  /* ---------- Newsletter submit ---------- */
  const handleNewsletterSubmit = useCallback((e) => {
    e.preventDefault()
    if (!newsletterEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterStatus('error')
      setTimeout(() => setNewsletterStatus('idle'), 3000)
      return
    }
    setNewsletterStatus('submitting')
    // Simulate API call
    setTimeout(() => {
      setNewsletterStatus('success')
      setNewsletterEmail('')
      // Reset after a few seconds
      setTimeout(() => setNewsletterStatus('idle'), 4000)
    }, 1200)
  }, [newsletterEmail])



  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-content">
        {/* Brand column */}
        <div className="footer-brand-col">
          <h4 className="footer-brand-name">
            <span className="footer-brand-icon">🥥</span>
            <span className="footer-brand-text">Coco Nuts Farm</span>
          </h4>
          <p className="footer-brand-desc">
            Premium wholesale coconut supplier serving food manufacturers, cosmetics brands, and international distributors. Family-owned since 1985.
          </p>

          {/* Social media */}
          <div className="footer-social">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                {social.svg}
              </a>
            ))}
          </div>

          {/* Request a Quote CTA */}
          <button className="footer-cta" onClick={() => openQuoteModal && openQuoteModal({ id: 'footer', name: 'General Inquiry' })}>
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 4a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2l2 2 2-2h4a2 2 0 002-2V4z" />
            </svg>
            <span>Request a Quote</span>
          </button>
        </div>

        {/* Quick Links column */}
        <div className="footer-nav-col">
          <h4 className="footer-title">Quick Links</h4>
          <nav className="footer-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="footer-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span className="footer-link-arrow">→</span>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact column */}
        <div className="footer-contact-col">
          <h4 className="footer-title">Contact Sales</h4>
          <div className="footer-contact-list">
            <a href="tel:+18002286254" className="footer-contact-item">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="footer-contact-icon">
                <path d="M3 3h4l2 4-2.5 1.5a11 11 0 005 5L13 13l4 2v4a1 1 0 01-1 1A16 16 0 012 4a1 1 0 011-1z" />
              </svg>
              <span>+1 (800) 228-6254</span>
            </a>
            <a href="mailto:sales@coconutsfarm.com" className="footer-contact-item">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="footer-contact-icon">
                <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                <path d="M3 5l7 5 7-5" />
              </svg>
              <span>sales@coconutsfarm.com</span>
            </a>
            <div className="footer-contact-item">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="footer-contact-icon">
                <path d="M10 1a7 7 0 00-7 7c0 5 7 11 7 11s7-6 7-11a7 7 0 00-7-7z" />
                <circle cx="10" cy="8" r="2.5" />
              </svg>
              <span>123 Coconut Highway,<br />Tropical City, TC 10001</span>
            </div>
            <div className="footer-contact-item footer-contact-item--hours">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="footer-contact-icon">
                <circle cx="10" cy="10" r="8" />
                <path d="M10 5v5l3 2" />
              </svg>
              <span>Mon — Fri: 8AM – 6PM (EST)</span>
            </div>
          </div>
        </div>

        {/* Newsletter column */}
        <div className="footer-newsletter-col">
          <h4 className="footer-title">Stay Updated</h4>
          <p className="footer-newsletter-desc">
            Receive market insights, crop forecasts, and exclusive trade offers.
          </p>
          <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
            <div className="footer-newsletter-input-wrap">
              <input
                type="email"
                className="footer-newsletter-input"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={newsletterStatus === 'submitting' || newsletterStatus === 'success'}
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="footer-newsletter-btn"
                disabled={newsletterStatus === 'submitting' || newsletterStatus === 'success' || !newsletterEmail.trim()}
                aria-label="Subscribe to newsletter"
              >
                {newsletterStatus === 'submitting' ? (
                  <span className="footer-newsletter-spinner" />
                ) : newsletterStatus === 'success' ? (
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 10l3 3 7-7" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10h12M13 7l3 3-3 3" />
                  </svg>
                )}
              </button>
            </div>
            {newsletterStatus === 'success' && (
              <span className="footer-newsletter-status footer-newsletter-status--success">
                ✓ Subscribed successfully!
              </span>
            )}
            {newsletterStatus === 'error' && (
              <span className="footer-newsletter-status footer-newsletter-status--error">
                Something went wrong. Please try again.
              </span>
            )}
          </form>

          {/* Trust badges */}
          <div className="footer-trust">
            {trustBadges.map((badge) => (
              <span key={badge.label} className="footer-trust-badge">
                <span className="footer-trust-icon">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>&copy; {new Date().getFullYear()} Coco Nuts Farm. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link" onClick={(e) => { e.preventDefault(); showToast && showToast("Privacy Policy document loading...") }}>
              Privacy Policy
            </a>
            <span className="footer-bottom-sep">·</span>
            <a href="#" className="footer-bottom-link" onClick={(e) => { e.preventDefault(); showToast && showToast("Terms of Trade document loading...") }}>
              Terms of Trade
            </a>
            <span className="footer-bottom-sep">·</span>
            <a href="#" className="footer-bottom-link" onClick={(e) => { e.preventDefault(); showToast && showToast("Sitemap indexing in progress...") }}>
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        className={`footer-back-to-top${showBackToTop ? ' footer-back-to-top--visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 17V4M5 9l5-5 5 5" />
        </svg>
      </button>
    </footer>
  )
}
