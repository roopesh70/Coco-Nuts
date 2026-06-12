import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Coconut from './Coconut'

gsap.registerPlugin(ScrollTrigger)

const scrollState = {
  rotation: 0,
  positionX: 0,
  positionY: 0,
  scale: 0.5,
  tiltZ: 0,
  opacity: 1,
}

// Movement pattern: center ➔ right ➔ left ➔ center ➔ right (then scales to 0 for footer)
const positions = [0, 1.5, -1.5, 0, 1.5, 1.5]
const scales = [0.65, 1.30, 1.30, 0.65, 1.30, 0]
const sectionCount = positions.length - 1

export default function Scene() {
  const lightRef = useRef()
  const shadowGroupRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.6,
        invalidateOnRefresh: true,
      },
      defaults: { ease: 'sine.inOut' },
    })

    for (let i = 0; i < sectionCount; i++) {
      const p = i / sectionCount
      const x = positions[i + 1]
      const s = scales[i + 1]
      tl.to(scrollState, {
        positionX: x,
        scale: s,
        tiltZ: x < 0 ? 0.1 : x > 0 ? -0.1 : 0,
        rotation: '+=' + Math.PI * 2.5,
        duration: 1 / sectionCount,
      }, p)
    }

    ScrollTrigger.refresh()

    return () => {
      tl.kill()
      scrollState.rotation = 0
      scrollState.positionX = 0
      scrollState.positionY = 0
      scrollState.scale = 0.5
      scrollState.tiltZ = 0
      scrollState.opacity = 1
    }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    // Animate shadow to follow the model
    if (shadowGroupRef.current) {
      shadowGroupRef.current.position.x = scrollState.positionX
      // Scale shadow with model, keeping a minimum for smooth transition
      const shadowScale = scrollState.scale > 0.01 ? scrollState.scale * 3 : 0.01
      shadowGroupRef.current.scale.setScalar(shadowScale)
    }

    // Animate light
    if (lightRef.current) {
      const angle = t * 0.08
      lightRef.current.position.x = Math.sin(angle) * 5
      lightRef.current.position.z = Math.cos(angle) * 5
      lightRef.current.position.y = 7 + Math.sin(angle * 0.6) * 2
      // Shadow darkness follows model scale
      lightRef.current.intensity = 4 + scrollState.scale * 2
    }
  })

  return (
    <>
      <Environment preset="sunset" />
      <directionalLight
        ref={lightRef}
        position={[5, 8, 5]}
        intensity={5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-near={0.1}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-4, 3, -5]} intensity={0.5} />
      <hemisphereLight args={['#faf6f0', '#2c1810', 0.3]} />

      <Coconut scrollData={scrollState} />

      <group ref={shadowGroupRef} position={[0, -0.9, 0]}>
        <ContactShadows
          opacity={0.45}
          blur={3.5}
          far={4}
          resolution={512}
          color="#1a0f0a"
        />
      </group>
    </>
  )
}
