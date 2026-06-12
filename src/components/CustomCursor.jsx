import { useRef, useEffect } from 'react'

/* ---------- Interactive element selector ---------- */
const INTERACTIVE_SELECTOR =
  'a, button, [tabindex]:not([tabindex="-1"]), .shop-hex-card, .shop-hex-btn, .shop-hex-overlay-btn, .modal-close, .modal-submit, .navbar-cta, .navbar-toggle, .navbar-links a, .process-step, .step-number'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const rAF = useRef(null)
  const state = useRef({
    x: -100,
    y: -100,
    ringX: -100,
    ringY: -100,
    hovered: false,
    hidden: true,
  })

  useEffect(() => {
    /* Touch device check */
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let hoveredElements = 0

    /* ---------- Event delegation ---------- */
    const onMouseMove = (e) => {
      state.current.x = e.clientX
      state.current.y = e.clientY
      state.current.hidden = false
    }

    /* Hide cursor when leaving the viewport */
    const onMouseLeaveDoc = () => {
      state.current.hidden = true
      hoveredElements = 0
      state.current.hovered = false
    }

    /* Single delegated listener for hover enter/exit */
    const onMouseOver = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) {
        hoveredElements++
        state.current.hovered = true
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) {
        hoveredElements = Math.max(0, hoveredElements - 1)
        if (hoveredElements === 0) state.current.hovered = false
      }
    }

    /* ---------- Animation loop ---------- */
    const tick = () => {
      const s = state.current

      /* Smooth lerp for the ring trailer */
      s.ringX += (s.x - s.ringX) * 0.12
      s.ringY += (s.y - s.ringY) * 0.12

      if (s.hidden) {
        dot.style.opacity = '0'
        ring.style.opacity = '0'
      } else {
        dot.style.opacity = '1'
        ring.style.opacity = s.ringX > -50 ? '1' : '0'
      }

      dot.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%)`
      ring.style.transform = `translate(${s.ringX}px, ${s.ringY}px) translate(-50%, -50%)`

      if (s.hovered) {
        ring.style.width = '34px'
        ring.style.height = '34px'
        ring.style.borderColor = 'rgba(196,167,125,0.7)'
        ring.style.boxShadow = '0 0 20px rgba(196,167,125,0.15)'
        ring.style.background = 'rgba(196,167,125,0.04)'
        dot.style.width = '18px'
        dot.style.height = '18px'
        dot.style.background = '#d4b78d'
        dot.style.boxShadow = '0 0 10px rgba(196,167,125,0.4)'
      } else {
        ring.style.width = '28px'
        ring.style.height = '28px'
        ring.style.borderColor = 'rgba(196,167,125,0.35)'
        ring.style.boxShadow = 'none'
        ring.style.background = 'transparent'
        dot.style.width = '8px'
        dot.style.height = '8px'
        dot.style.background = '#c4a77d'
        dot.style.boxShadow = 'none'
      }

      rAF.current = requestAnimationFrame(tick)
    }

    /* Attach delegated listeners on document */
    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })
    document.addEventListener('mouseleave', onMouseLeaveDoc, { passive: true })
    rAF.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('mouseleave', onMouseLeaveDoc)
      cancelAnimationFrame(rAF.current)
    }
  }, [])

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return null

  return (
    <>
      <span className="custom-cursor-dot" ref={dotRef} aria-hidden="true" />
      <span className="custom-cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
