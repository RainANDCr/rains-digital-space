import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

export default function PointerParticles() {
 const canvasRef = useRef(null)
 const { theme } = useTheme()

 useEffect(() => {
  const canvas = canvasRef.current
  const context = canvas.getContext('2d')
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  const particles = []
  let frame = 0
  let lastMove = 0
  let previous = performance.now()
  const colors = theme === 'dark' ? ['#a4b5ff', '#a58aff'] : ['#4662d9', '#6946b5']

  function resize() {
   const scale = Math.min(devicePixelRatio || 1, 2)
   canvas.width = innerWidth * scale
   canvas.height = innerHeight * scale
   context.setTransform(scale, 0, 0, scale, 0, 0)
  }

  function draw(now) {
   const elapsed = Math.min((now - previous) / 16.67, 2)
   previous = now
   context.clearRect(0, 0, innerWidth, innerHeight)
   for (let index = particles.length - 1; index >= 0; index--) {
    const particle = particles[index]
    particle.x += particle.vx * elapsed
    particle.y += particle.vy * elapsed
    particle.life -= elapsed / 36
    if (particle.life <= 0) { particles.splice(index, 1); continue }
    context.globalAlpha = particle.life * 0.8
    context.fillStyle = particle.color
    context.beginPath()
    context.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2)
    context.fill()
   }
   context.globalAlpha = 1
   frame = particles.length ? requestAnimationFrame(draw) : 0
  }

  function emit(x, y, count, speed) {
   if (motion.matches) return
   for (let index = 0; index < count; index++) {
    const angle = Math.random() * Math.PI * 2
    const velocity = Math.random() * speed + 0.4
    particles.push({ x, y, vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity,
     size: Math.random() * 2.5 + 1, life: 1, color: colors[index % colors.length] })
   }
   if (particles.length > 80) particles.splice(0, particles.length - 80)
   if (!frame) { previous = performance.now(); frame = requestAnimationFrame(draw) }
  }

  function move(event) {
   if (event.pointerType !== 'mouse' || performance.now() - lastMove < 35) return
   lastMove = performance.now()
   emit(event.clientX, event.clientY, 1, 1)
  }
  function click(event) { emit(event.clientX, event.clientY, 16, 3.5) }
  function reduce() {
   if (motion.matches) {
    particles.length = 0
    cancelAnimationFrame(frame)
    frame = 0
    context.clearRect(0, 0, innerWidth, innerHeight)
   }
  }

  resize()
  addEventListener('resize', resize)
  addEventListener('pointermove', move, { passive: true })
  addEventListener('pointerdown', click, { passive: true })
  motion.addEventListener('change', reduce)
  return () => {
   removeEventListener('resize', resize)
   removeEventListener('pointermove', move)
   removeEventListener('pointerdown', click)
   motion.removeEventListener('change', reduce)
   cancelAnimationFrame(frame)
  }
 }, [theme])

 return <canvas className="pointer-particles" ref={canvasRef} aria-hidden="true" />
}
