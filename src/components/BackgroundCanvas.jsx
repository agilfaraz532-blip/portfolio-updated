import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export const BackgroundCanvas = () => {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 8

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Particles Geometry
    const count = 1200
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const randomFrequencies = new Float32Array(count)

    // Distribute points in a sphere shell
    for (let i = 0; i < count; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 3.5 + Math.random() * 0.5 // Sphere shell thickness

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      randomFrequencies[i] = Math.random() * 10
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x06B6D4, // cyan accent
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    // Mesh
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Draw connection lines for a net-like cyber structure
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x2563EB, // blue primary
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    // Create lines between random neighboring particles
    const lineIndices = []
    for (let i = 0; i < count; i += 4) {
      const next1 = (i + 1) % count
      const next2 = (i + 2) % count
      lineIndices.push(i, next1)
      lineIndices.push(i, next2)
    }

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    lineGeometry.setIndex(lineIndices)
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Mouse Move listener
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseRef.current.targetX = x * 1.5
      mouseRef.current.targetY = y * 1.5
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Window Resize listener
    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Clock
    const clock = new THREE.Clock()

    // Animation Loop
    let animationFrameId
    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

      // Slowly rotate points
      particles.rotation.y = elapsedTime * 0.04
      particles.rotation.x = elapsedTime * 0.02
      lines.rotation.y = elapsedTime * 0.04
      lines.rotation.x = elapsedTime * 0.02

      // Smoothly interpolate mouse movement (lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      // Slight tilt on mouse move
      particles.rotation.x += mouseRef.current.y * 0.1
      particles.rotation.y += mouseRef.current.x * 0.1
      lines.rotation.x += mouseRef.current.y * 0.1
      lines.rotation.y += mouseRef.current.x * 0.1

      // Modulate coordinates
      const positionsArr = particles.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        const x = positions[i * 3]
        const y = positions[i * 3 + 1]
        const z = positions[i * 3 + 2]
        
        const wave = Math.sin(elapsedTime * 1.2 + randomFrequencies[i]) * 0.03
        const factor = 1 + wave

        positionsArr[i * 3] = x * factor
        positionsArr[i * 3 + 1] = y * factor
        positionsArr[i * 3 + 2] = z * factor
      }
      particles.geometry.attributes.position.needsUpdate = true
      lines.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(tick)
    }

    tick()

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-40 bg-[#050816]"
    />
  )
}
export default BackgroundCanvas
