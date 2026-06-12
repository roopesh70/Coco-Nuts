import { useRef, useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

/* ---------- Simulated chat bot responses ---------- */

const botReplies = [
  {
    keywords: ['price', 'cost', 'pricing', 'how much', 'rate', 'expensive', 'cheap', 'quote'],
    reply: `Great question! Our wholesale pricing varies by order volume and contract length. For instance, fresh mature coconuts start at highly competitive bulk rates with progressive scaling discounts. Would you like our sales team to provide a customized FOB or CIF price sheet?`,
  },
  {
    keywords: ['shipping', 'delivery', 'ship', 'freight', 'logistics', 'transport', 'cargo', 'port'],
    reply: `We coordinate global maritime shipping through our trade network. Standard transit times average 14–30 days depending on destination port and loading options (FCL or LCL). We manage the complete customs and documentation suite, including phytosanitary certification.`,
  },
  {
    keywords: ['order', 'buy', 'purchase', 'minimum', 'moq', 'quantity', 'volume', 'bulk'],
    reply: `Our minimum order volumes are: 500 nuts for fresh mature coconuts, 200 cartons for young drinking coconuts, 1 MT for industrial copra, and 1 drum (200L) for virgin coconut oil. Trial samples are available for qualified trade accounts.`,
  },
  {
    keywords: ['coconut', 'product', 'variety', 'type', 'grade', 'quality', 'spec', 'specification'],
    reply: `Our wholesale catalog includes: Fresh Mature Coconuts (Grade A, 11–12 months), Tender Young Coconuts (Grade A, 6–7 months), Industrial Copra (moisture ≤6%, oil ≥65%), Virgin Coconut Oil (cold-pressed, acidity ≤0.2%), and our Certified Organic Range. All items meet rigorous export standards.`,
  },
  {
    keywords: ['organic', 'certified', 'certification', 'usda', 'eu', 'sustainable', 'eco'],
    reply: `Yes, our organic parcel production holds USDA Organic and EU Organic certifications. We issue complete chain-of-custody documentation with every international dispatch.`,
  },
  {
    keywords: ['sample', 'trial', 'test', 'small', 'try'],
    reply: `We provide product samples to verified businesses. Standard samples are prepared and shipped via air courier within 3–5 business days. Let us know which product you would like to sample and we will draft the request.`,
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    reply: `Hello! Welcome to Coco Nuts. I am your automated trade assistant. I can assist you with catalog specifications, volume pricing, shipping inquiries, or certifications. How may I help you today?`,
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'grateful'],
    reply: `You are very welcome. We look forward to a potential supply partnership. If you require formal pricing, please submit a quote request via our form, and our sales directors will follow up directly.`,
  },
  {
    keywords: ['payment', 'pay', 'terms', 'credit', 'invoice', 'letter of credit', 'lc'],
    reply: `We offer flexible trade payment mechanisms for verified importers. Standard terms are T/T (Telegraphic Transfer) or Irrevocable L/C (Letter of Credit) at sight. Established partners may qualify for Net-30 or Net-60 credit lines.`,
  },
  {
    keywords: ['help', 'support', 'contact', 'call', 'email', 'reach'],
    reply: `I am here to help! You can chat with me, submit the Quote Form, or email us directly at sales@coconutsfarm.com. We typically respond to email inquiries within 24 hours.`,
  },
]

const defaultReply = `Thank you for your message. Could you share a few details about your company and required volumes? Alternatively, please submit a formal Quote Request using the tab above, and a trade representative will email you directly.`

function getBotReply(userMessage) {
  const msg = userMessage.toLowerCase()
  for (const entry of botReplies) {
    if (entry.keywords.some((kw) => msg.includes(kw))) {
      return entry.reply
    }
  }
  return defaultReply
}

export default function QuoteModal({ product, onClose, initialMode = 'form' }) {
  const overlayRef = useRef()
  const dialogRef = useRef()
  const chatEndRef = useRef()
  const chatInputRef = useRef()
  const [mode, setMode] = useState(initialMode) // 'form' | 'chat'
  const [step, setStep] = useState('form') // 'form' | 'success'
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    quantity: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [messages, setMessages] = useState(() => [
    {
      id: 0,
      role: 'bot',
      text: `Welcome to Coco Nuts. I am your trade assistant. I can assist you with specifications, pricing, shipping, or documentation for ${product?.name || 'our products'}. How may I serve your business today?`,
      timestamp: Date.now(),
    },
  ])
  const [chatInput, setChatInput] = useState('')
  const [isBotTyping, setIsBotTyping] = useState(false)

  /* ---------- GSAP entrance ---------- */
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.5 },
    })
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 })
    tl.fromTo(
      dialogRef.current,
      { opacity: 0, y: 40, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.6)' },
      '-=0.15'
    )
    return () => tl.kill()
  }, [])

  /* ---------- Auto-scroll chat ---------- */
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages, isBotTyping])

  /* ---------- Focus input when switching to chat ---------- */
  useEffect(() => {
    if (mode === 'chat' && chatInputRef.current) {
      setTimeout(() => chatInputRef.current?.focus(), 400)
    }
  }, [mode])

  /* ---------- ESC / backdrop click close ---------- */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  /* ---------- Exit animation then call onClose ---------- */
  const animateOut = useCallback(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.in', duration: 0.25 },
      onComplete: onClose,
    })
    tl.to(dialogRef.current, { opacity: 0, y: 20, scale: 0.96 })
    tl.to(overlayRef.current, { opacity: 0 }, '-=0.1')
  }, [onClose])

  /* ---------- Validation ---------- */
  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  /* ---------- Submit ---------- */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Simulate sending the quote request
    setTimeout(() => setStep('success'), 500)
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  /* ---------- Chat logic ---------- */
  const sendMessage = useCallback((overrideText) => {
    const text = (overrideText || chatInput).trim()
    if (!text || isBotTyping) return

    const userMsg = {
      id: messages.length,
      role: 'user',
      text,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setChatInput('')
    setIsBotTyping(true)

    // Simulate bot response after a delay
    const delay = 600 + Math.random() * 900
    setTimeout(() => {
      const botText = getBotReply(text)
      const botMsg = {
        id: Date.now(),
        role: 'bot',
        text: botText,
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsBotTyping(false)
    }, delay)
  }, [chatInput, isBotTyping, messages.length])

  const handleChatSubmit = (e) => {
    e.preventDefault()
    sendMessage()
  }

  const handleChatKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  /* ---------- Suggested quick replies ---------- */
  const quickReplies = [
    'Tell me about your products',
    'What are your prices?',
    'Do you offer samples?',
    'Shipping & delivery',
  ]

  /* ---------- Switch to form mode with chat context ---------- */
  const switchToForm = () => {
    setMode('form')
    // Pre-fill the message with a summary of the chat
    const chatSummary = messages
      .filter((m) => m.role === 'user')
      .slice(-3)
      .map((m) => m.text)
      .join('; ')
    if (chatSummary) {
      setForm((prev) => ({
        ...prev,
        message: `[From live chat] ${chatSummary}`,
      }))
    }
  }

  return createPortal(
    <div className="modal-overlay" ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) animateOut() }}>
      <div className={`modal-dialog ${mode === 'chat' ? 'modal-dialog--chat' : ''}`} ref={dialogRef} role="dialog" aria-modal="true" aria-label="Contact Coco Nuts">
        {/* Close button */}
        <button className="modal-close" onClick={animateOut} aria-label="Close modal">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        {/* Mode toggle tabs */}
        <div className="modal-mode-tabs" role="tablist" aria-label="Contact mode">
          <button
            role="tab"
            aria-selected={mode === 'form'}
            className={`modal-mode-tab ${mode === 'form' ? 'modal-mode-tab--active' : ''}`}
            onClick={() => setMode('form')}
          >
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="modal-mode-icon">
              <path d="M17 4a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2l2 2 2-2h4a2 2 0 002-2V4z" />
            </svg>
            <span>Quote Form</span>
          </button>
          <button
            role="tab"
            aria-selected={mode === 'chat'}
            className={`modal-mode-tab ${mode === 'chat' ? 'modal-mode-tab--active' : ''}`}
            onClick={() => setMode('chat')}
          >
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="modal-mode-icon">
              <path d="M3 3h14a2 2 0 012 2v8a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2z" />
            </svg>
            <span>Live Chat</span>
          </button>
        </div>

        {mode === 'form' ? (
          step === 'form' ? (
            <>
              {/* Header */}
              <div className="modal-header">
                <span className="modal-badge">Quote Request</span>
                <h2 className="modal-title">{product?.name || 'Custom Order'}</h2>
                <p className="modal-sub">
                  Fill out the form below and our team will get back to you within 24 hours with a tailored quote.
                </p>
              </div>

              {/* Form */}
              <form className="modal-form" onSubmit={handleSubmit} noValidate>
                <div className="modal-fields">
                  <div className="modal-field modal-field--half">
                    <label htmlFor="quote-name" className="modal-label">Name *</label>
                    <input
                      id="quote-name"
                      type="text"
                      className={`modal-input ${errors.name ? 'modal-input--error' : ''}`}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange('name')}
                    />
                    {errors.name && <span className="modal-error">{errors.name}</span>}
                  </div>

                  <div className="modal-field modal-field--half">
                    <label htmlFor="quote-email" className="modal-label">Email *</label>
                    <input
                      id="quote-email"
                      type="email"
                      className={`modal-input ${errors.email ? 'modal-input--error' : ''}`}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange('email')}
                    />
                    {errors.email && <span className="modal-error">{errors.email}</span>}
                  </div>

                  <div className="modal-field modal-field--half">
                    <label htmlFor="quote-company" className="modal-label">Company</label>
                    <input
                      id="quote-company"
                      type="text"
                      className="modal-input"
                      placeholder="Your company name"
                      value={form.company}
                      onChange={handleChange('company')}
                    />
                  </div>

                  <div className="modal-field modal-field--half">
                    <label htmlFor="quote-phone" className="modal-label">Phone</label>
                    <input
                      id="quote-phone"
                      type="tel"
                      className="modal-input"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange('phone')}
                    />
                  </div>

                  <div className="modal-field">
                    <label htmlFor="quote-product" className="modal-label">Product Interest</label>
                    <input
                      id="quote-product"
                      type="text"
                      className="modal-input modal-input--disabled"
                      value={product?.name || 'Custom order'}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="modal-field">
                    <label htmlFor="quote-quantity" className="modal-label">Estimated Quantity / Volume</label>
                    <input
                      id="quote-quantity"
                      type="text"
                      className="modal-input"
                      placeholder="e.g. 500 nuts, 2 metric tons, 5 drums"
                      value={form.quantity}
                      onChange={handleChange('quantity')}
                    />
                  </div>

                  <div className="modal-field">
                    <label htmlFor="quote-message" className="modal-label">Additional Details</label>
                    <textarea
                      id="quote-message"
                      className="modal-textarea"
                      rows={3}
                      placeholder="Specific requirements, delivery timeline, destination port…"
                      value={form.message}
                      onChange={handleChange('message')}
                    />
                  </div>
                </div>

                <button type="submit" className="modal-submit">
                  Send Quote Request
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10h12M13 7l3 3-3 3" />
                  </svg>
                </button>

                <p className="modal-footnote">
                  By submitting, you agree to our privacy policy. We&rsquo;ll never share your information.
                </p>
              </form>
            </>
          ) : (
            /* ---------- Success state ---------- */
            <div className="modal-success">
              <div className="modal-success-icon">
                <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="#5d8c5b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="24" cy="24" r="20" strokeOpacity="0.3" />
                  <path d="M16 24l6 6 10-10" />
                </svg>
              </div>
              <h2 className="modal-success-title">Request Sent!</h2>
              <p className="modal-success-desc">
                Thank you for your interest in <strong>{product?.name || 'our products'}</strong>. Our team will review your request and respond within 24 hours.
              </p>
              <button className="modal-submit" onClick={animateOut}>
                Close
              </button>
            </div>
          )
        ) : (
          /* ---------- Live Chat UI ---------- */
          <div className="chat-container" role="tabpanel">
            {/* Chat header */}
            <div className="chat-header">
              <span className="chat-status-dot" />
              <span className="chat-status-text">Online — Usually responds in a few minutes</span>
            </div>

            {/* Messages area */}
            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-bubble chat-bubble--${msg.role} animate-in`}
                  style={{ animationDelay: '0.1s' }}
                >
                  <div className="chat-bubble-content">{msg.text}</div>
                  <span className="chat-bubble-time">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isBotTyping && (
                <div className="chat-bubble chat-bubble--bot animate-in">
                  <div className="chat-typing">
                    <span className="chat-typing-dot" />
                    <span className="chat-typing-dot" />
                    <span className="chat-typing-dot" />
                  </div>
                </div>
              )}

              {/* Quick reply suggestions (only when there's no pending bot response) */}
              {messages.length === 1 && !isBotTyping && (
                <div className="chat-quick-replies">
                  <span className="chat-quick-label">Quick questions:</span>
                  <div className="chat-quick-grid">
                    {quickReplies.map((text, i) => (
                      <button
                        key={i}
                        className="chat-quick-btn"
                        onClick={() => sendMessage(text)}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Chat input area */}
            <form className="chat-input-area" onSubmit={handleChatSubmit}>
              <div className="chat-input-wrapper">
                <input
                  ref={chatInputRef}
                  type="text"
                  className="chat-input"
                  placeholder="Type your message…"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleChatKeyDown}
                  disabled={isBotTyping}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="chat-send-btn"
                  disabled={!chatInput.trim() || isBotTyping}
                  aria-label="Send message"
                >
                  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10h12M13 7l3 3-3 3" />
                  </svg>
                </button>
              </div>
              <div className="chat-footer">
                <span className="chat-footer-text">
                  Need a formal quote?{' '}
                  <button type="button" className="chat-form-link" onClick={switchToForm}>
                    Switch to quote form
                  </button>
                </span>
              </div>
            </form>
          </div>
        )}

        {/* Decorative corner accents */}
        <span className="modal-corner modal-corner--tl" />
        <span className="modal-corner modal-corner--tr" />
        <span className="modal-corner modal-corner--bl" />
        <span className="modal-corner modal-corner--br" />
      </div>
    </div>,
    document.body
  )
}
