import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

useGLTF.preload('/models/coconut.glb')

export default function Coconut({ scrollData }) {
  const groupRef = useRef()

  const { scene } = useGLTF('/models/coconut.glb')

  const cloned = useMemo(() => {
    const s = scene.clone(true)
    s.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return s
  }, [scene])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime

    // Hide when scale is near 0 (footer section)
    const shouldShow = scrollData.scale > 0.01
    groupRef.current.visible = shouldShow

    // Idle floating and slow idle rotation
    const idleY = Math.sin(t * 0.4) * 0.04
    const idleRotX = Math.sin(t * 0.3) * 0.02
    const idleRotZ = Math.cos(t * 0.15 + 1) * 0.015

    // Combined rotation: scroll-based Y spin + idle X/Z float + movement tilt
    groupRef.current.rotation.y = scrollData.rotation
    groupRef.current.rotation.x = idleRotX
    groupRef.current.rotation.z = scrollData.tiltZ + idleRotZ

    // Scale with smooth transition
    groupRef.current.scale.setScalar(scrollData.scale)

    // Position: scroll-based X + idle float Y
    groupRef.current.position.x = scrollData.positionX
    groupRef.current.position.y = scrollData.positionY + idleY
  })

  return (
    <group ref={groupRef}>
      <primitive object={cloned} />
    </group>
  )
}
