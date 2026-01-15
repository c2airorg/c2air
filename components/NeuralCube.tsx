'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  faction: 'cyan' | 'purple'
}

interface NeuralCubeSceneProps {
  cubeSize?: number
  particleCount?: number
  connectionDistance?: number
}

function NeuralCubeScene({
  cubeSize = 8,
  particleCount = 100,
  connectionDistance = 1.5
}: NeuralCubeSceneProps) {
  const cyanParticlesRef = useRef<THREE.InstancedMesh>(null)
  const purpleParticlesRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.Group>(null)

  const halfSize = cubeSize / 2
  const cyanCount = Math.floor(particleCount / 2)
  const purpleCount = Math.ceil(particleCount / 2)

  const particles = useMemo(() => {
    const p: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const faction = i < cyanCount ? 'cyan' : 'purple'

      p.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * cubeSize * 0.9,
          (Math.random() - 0.5) * cubeSize * 0.9,
          (Math.random() - 0.5) * cubeSize * 0.9
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        faction
      })
    }
    return p
  }, [particleCount, cyanCount, cubeSize])

  useFrame((state, delta) => {
    if (!cyanParticlesRef.current || !purpleParticlesRef.current || !linesRef.current) return

    const cyanMatrix = new THREE.Matrix4()
    const purpleMatrix = new THREE.Matrix4()

    particles.forEach((particle, i) => {

      particle.velocity.x += (Math.random() - 0.5) * 0.001
      particle.velocity.y += (Math.random() - 0.5) * 0.001
      particle.velocity.z += (Math.random() - 0.5) * 0.001

      particle.velocity.multiplyScalar(0.98)

      particle.position.add(particle.velocity)

      if (Math.abs(particle.position.x) > halfSize) {
        particle.position.x = Math.sign(particle.position.x) * halfSize
        particle.velocity.x *= -0.5
      }
      if (Math.abs(particle.position.y) > halfSize) {
        particle.position.y = Math.sign(particle.position.y) * halfSize
        particle.velocity.y *= -0.5
      }
      if (Math.abs(particle.position.z) > halfSize) {
        particle.position.z = Math.sign(particle.position.z) * halfSize
        particle.velocity.z *= -0.5
      }

      const matrix = particle.faction === 'cyan' ? cyanMatrix : purpleMatrix
      matrix.setPosition(particle.position)

      if (particle.faction === 'cyan') {
        cyanParticlesRef.current.setMatrixAt(i, matrix)
      } else {
        purpleParticlesRef.current.setMatrixAt(i - cyanCount, matrix)
      }
    })

    cyanParticlesRef.current.instanceMatrix.needsUpdate = true
    purpleParticlesRef.current.instanceMatrix.needsUpdate = true

    const linesGroup = linesRef.current

    while (linesGroup.children.length > 0) {
      const child = linesGroup.children[0]
      if (child instanceof THREE.Line) {
        child.geometry.dispose()
        if (child.material instanceof THREE.Material) {
          child.material.dispose()
        }

      }
      linesGroup.remove(child)
    }

    particles.forEach((particle, i) => {
      particles.forEach((other, j) => {
        if (i >= j) return

        if (particle.faction === other.faction) return

        const distance = particle.position.distanceTo(other.position)

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.8

          const geometry = new THREE.BufferGeometry().setFromPoints([
            particle.position.clone(),
            other.position.clone()
          ])

          const material = new THREE.LineBasicMaterial({
            color: 0x00f3ff,
            transparent: true,
            opacity: opacity,
            linewidth: 2
          })
          const line = new THREE.Line(geometry, material)
          linesGroup.add(line)

          const glowGeometry = new THREE.BufferGeometry().setFromPoints([
            particle.position.clone(),
            other.position.clone()
          ])
          const glowMaterial = new THREE.LineBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: opacity * 0.4,
            linewidth: 4
          })
          const glowLine = new THREE.Line(glowGeometry, glowMaterial)
          linesGroup.add(glowLine)
        }
      })
    })
  })

  const wireframeGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize))
  }, [cubeSize])

  return (
    <>
      <lineSegments geometry={wireframeGeometry}>
        <lineBasicMaterial
          color={0x444444}
          transparent
          opacity={0.3}
        />
      </lineSegments>
      <instancedMesh
        ref={cyanParticlesRef}
        args={[undefined, undefined, cyanCount]}
      >
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          color={0x00f3ff}
          emissive={0x00aacc}
          emissiveIntensity={0.8}
        />
      </instancedMesh>
      <instancedMesh
        ref={purpleParticlesRef}
        args={[undefined, undefined, purpleCount]}
      >
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          color={0xbd00ff}
          emissive={0x7700aa}
          emissiveIntensity={0.8}
        />
      </instancedMesh>
      <group ref={linesRef} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color={0xbd00ff} />
    </>
  )
}

export default function NeuralCube({
  cubeSize = 8,
  particleCount = 100,
  connectionDistance = 1.5
}: {
  cubeSize?: number
  particleCount?: number
  connectionDistance?: number
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [12, 12, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <NeuralCubeScene
          cubeSize={cubeSize}
          particleCount={particleCount}
          connectionDistance={connectionDistance}
        />
      </Canvas>
    </div>
  )
}

