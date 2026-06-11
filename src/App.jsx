import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import Navbar from './components/Navbar'
import Scene from './components/Scene'
import About from './components/About'
import Process from './components/Process'
import Shop from './components/Shop'
import Values from './components/Values'
import Footer from './components/Footer'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const appRef = useRef(null)
  const heroTextRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to([heroTextRef.current, scrollIndicatorRef.current], {
        autoAlpha: 0,
        y: -48,
        ease: 'none',
        scrollTrigger: {
          trigger: appRef.current,
          start: 'top top',
          end: '+=420',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    }, appRef)

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(refreshFrame)
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    ScrollTrigger.refresh()
    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={appRef} className="app" id="top">
      <Navbar />
      <Canvas
        className="webgl-canvas"
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <div ref={heroTextRef} className="hero-text">
        <h1>Coco Nuts</h1>
        <p>Nature&apos;s Perfect Hydration</p>
      </div>

      <div ref={scrollIndicatorRef} className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="line" />
      </div>

      <main className="main-content">
        <div className="hero-spacer" />
        {/* Model: center ➔ About: right ➔ Process: left ➔ Shop: center ➔ Values: right ➔ Footer: hidden */}
        <About layout="left" />           {/* model on right  */}
        <Process layout="right" />         {/* model on left   */}
        <Shop layout="center" />           {/* model at center */}
        <Values layout="left" />           {/* model on right  */}
      </main>

      <Footer />
    </div>
  )
}

export default App
