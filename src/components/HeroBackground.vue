<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
const reduceMotion = ref(false)

let raf = 0
let cleanup = () => {}

onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceMotion.value = mq.matches
  if (mq.matches) return

  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const SPEED = 1.2
  const ACCENTS_DARK = [
    [129, 140, 248],
    [34, 211, 238],
    [52, 211, 153],
  ]
  const ACCENTS_LIGHT = [
    [79, 70, 229],
    [8, 145, 178],
    [5, 150, 105],
  ]
  let accents = ACCENTS_DARK
  const isLight = () => document.documentElement.dataset.theme === 'light'
  const syncPalette = () => {
    accents = isLight() ? ACCENTS_LIGHT : ACCENTS_DARK
  }
  syncPalette()

  const NODES = [
    [0.12, 0.22],
    [0.38, 0.16],
    [0.68, 0.24],
    [0.88, 0.14],
    [0.18, 0.52],
    [0.48, 0.58],
    [0.78, 0.48],
    [0.28, 0.78],
    [0.62, 0.8],
    [0.9, 0.68],
  ]

  let w = 0
  let h = 0
  let gridCanvas = null
  const mouse = { x: -9999, y: -9999 }
  let scan = 0

  class TrailParticle {
    constructor() {
      this.reset(true)
    }

    reset(initial = false) {
      this.isH = Math.random() > 0.4
      this.dir = Math.random() > 0.5 ? 1 : -1
      if (this.isH) {
        this.x = this.dir > 0 ? -30 : w + 30
        this.y = 60 + Math.random() * Math.max(120, h - 120)
        this.vy = (Math.random() - 0.5) * 0.28
        this.vx = 0
      } else {
        this.y = this.dir > 0 ? -30 : h + 30
        this.x = 60 + Math.random() * Math.max(120, w - 120)
        this.vx = (Math.random() - 0.5) * 0.28
        this.vy = 0
      }
      this.speed = (0.45 + Math.random() * 1.1) * SPEED
      this.trail = []
      this.maxTrail = 18 + Math.floor(Math.random() * 22)
      this.color = accents[Math.floor(Math.random() * accents.length)]
      this.opacity = 0.45 + Math.random() * 0.35
      if (initial && w && h) {
        if (this.isH) this.x = Math.random() * w
        else this.y = Math.random() * h
      }
    }

    update() {
      this.trail.push({ x: this.x, y: this.y })
      if (this.trail.length > this.maxTrail) this.trail.shift()

      if (this.isH) {
        this.x += this.speed * this.dir
        this.y += this.vy
        this.y = Math.max(16, Math.min(h - 16, this.y))
      } else {
        this.y += this.speed * this.dir
        this.x += this.vx
        this.x = Math.max(16, Math.min(w - 16, this.x))
      }

      const off =
        this.isH
          ? this.dir > 0
            ? this.x > w + 40
            : this.x < -40
          : this.dir > 0
            ? this.y > h + 40
            : this.y < -40
      if (off) this.reset()
    }

    draw() {
      const [r, g, b] = this.color
      const trailAlpha = isLight() ? this.opacity * 0.4 : this.opacity * 0.32
      if (this.trail.length > 1) {
        ctx.beginPath()
        ctx.moveTo(this.trail[0].x, this.trail[0].y)
        for (let i = 1; i < this.trail.length; i++) {
          ctx.lineTo(this.trail[i].x, this.trail[i].y)
        }
        ctx.strokeStyle = `rgba(${r},${g},${b},${trailAlpha})`
        ctx.lineWidth = 1.4
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.arc(this.x, this.y, 2.1, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r},${g},${b},${this.opacity})`
      ctx.fill()
    }
  }

  class DriftDot {
    constructor() {
      this.reset(true)
    }

    reset(initial = false) {
      this.x = Math.random() * (w || 1)
      this.y = Math.random() * (h || 1)
      this.vx = (Math.random() - 0.5) * 0.22 * SPEED
      this.vy = (Math.random() - 0.5) * 0.22 * SPEED
      this.r = 1 + Math.random() * 2
      this.color = accents[Math.floor(Math.random() * accents.length)]
      this.base = isLight() ? 0.28 + Math.random() * 0.32 : 0.22 + Math.random() * 0.35
      this.phase = Math.random() * Math.PI * 2
      this.pulse = 0.01 + Math.random() * 0.014
      if (!initial && (!w || !h)) return
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      this.phase += this.pulse
      if (this.x < -8) this.x = w + 8
      if (this.x > w + 8) this.x = -8
      if (this.y < -8) this.y = h + 8
      if (this.y > h + 8) this.y = -8
    }

    draw() {
      const [r, g, b] = this.color
      const a = this.base * (0.7 + 0.3 * Math.sin(this.phase))
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r},${g},${b},${a})`
      ctx.fill()
    }
  }

  class RoutePulse {
    constructor(idx) {
      this.route = [
        NODES[idx % NODES.length],
        NODES[(idx + 3) % NODES.length],
        NODES[(idx + 6) % NODES.length],
      ]
      this.t = Math.random()
      this.speed = (0.0012 + Math.random() * 0.0014) * SPEED
      this.color = accents[idx % accents.length]
    }

    update() {
      this.t += this.speed
      if (this.t > 1) this.t -= 1
    }

    pointAt(t) {
      const segs = this.route.length - 1
      const scaled = t * segs
      const i = Math.min(segs - 1, Math.floor(scaled))
      const local = scaled - i
      const a = this.route[i]
      const b = this.route[i + 1]
      return {
        x: (a[0] + (b[0] - a[0]) * local) * w,
        y: (a[1] + (b[1] - a[1]) * local) * h,
      }
    }

    draw() {
      const [r, g, b] = this.color
      const lineA = isLight() ? 0.16 : 0.1
      const nodeA = isLight() ? 0.32 : 0.22
      ctx.beginPath()
      this.route.forEach((n, i) => {
        const x = n[0] * w
        const y = n[1] * h
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.strokeStyle = `rgba(${r},${g},${b},${lineA})`
      ctx.lineWidth = 1.25
      ctx.setLineDash([4, 10])
      ctx.stroke()
      ctx.setLineDash([])

      this.route.forEach((n) => {
        ctx.beginPath()
        ctx.arc(n[0] * w, n[1] * h, 2.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${nodeA})`
        ctx.fill()
      })

      const p = this.pointAt(this.t)
      ctx.beginPath()
      ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r},${g},${b},0.75)`
      ctx.fill()
    }
  }

  const trails = []
  const dots = []
  const routes = []

  const buildGrid = () => {
    const off = document.createElement('canvas')
    off.width = w
    off.height = h
    const g = off.getContext('2d')
    if (!g) return
    const step = 48
    g.strokeStyle = isLight()
      ? 'rgba(100, 116, 139, 0.14)'
      : 'rgba(148, 163, 184, 0.07)'
    g.lineWidth = 0.5
    for (let x = 0; x < w; x += step) {
      g.beginPath()
      g.moveTo(x, 0)
      g.lineTo(x, h)
      g.stroke()
    }
    for (let y = 0; y < h; y += step) {
      g.beginPath()
      g.moveTo(0, y)
      g.lineTo(w, y)
      g.stroke()
    }
    gridCanvas = off
  }

  const resize = () => {
    const rect = canvas.getBoundingClientRect()
    w = Math.max(1, Math.floor(rect.width))
    h = Math.max(1, Math.floor(rect.height))
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    buildGrid()
  }

  const onMove = (e) => {
    const rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  }

  const onLeave = () => {
    mouse.x = -9999
    mouse.y = -9999
  }

  const onThemeChange = () => {
    syncPalette()
    trails.forEach((p) => {
      p.color = accents[Math.floor(Math.random() * accents.length)]
    })
    dots.forEach((d) => {
      d.color = accents[Math.floor(Math.random() * accents.length)]
      d.base = isLight() ? 0.28 + Math.random() * 0.32 : 0.22 + Math.random() * 0.35
    })
    routes.forEach((r, i) => {
      r.color = accents[i % accents.length]
    })
    buildGrid()
  }

  const themeObserver = new MutationObserver(onThemeChange)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  resize()
  for (let i = 0; i < 6; i++) trails.push(new TrailParticle())
  for (let i = 0; i < 56; i++) dots.push(new DriftDot())
  for (let i = 0; i < 3; i++) routes.push(new RoutePulse(i))

  const drawScans = () => {
    scan += 0.22 * SPEED
    const mid = isLight() ? 'rgba(79, 70, 229, 0.045)' : 'rgba(99, 102, 241, 0.05)'
    for (let i = 0; i < 3; i++) {
      const band = h / 3
      const y = ((scan * 0.4 + i * band) % (h + band)) - band
      const grad = ctx.createLinearGradient(0, y, 0, y + band)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.5, mid)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, y, w, band)
    }
  }

  const drawMouseGlow = () => {
    if (mouse.x < 0 || mouse.y < 0 || mouse.y > h) return
    const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220)
    if (isLight()) {
      glow.addColorStop(0, 'rgba(8, 145, 178, 0.1)')
      glow.addColorStop(0.45, 'rgba(79, 70, 229, 0.06)')
    } else {
      glow.addColorStop(0, 'rgba(34, 211, 238, 0.08)')
      glow.addColorStop(0.45, 'rgba(129, 140, 248, 0.045)')
    }
    glow.addColorStop(1, 'transparent')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, w, h)
  }

  const frame = () => {
    ctx.clearRect(0, 0, w, h)
    if (gridCanvas) ctx.drawImage(gridCanvas, 0, 0)
    drawScans()
    drawMouseGlow()
    routes.forEach((r) => {
      r.update()
      r.draw()
    })
    dots.forEach((d) => {
      d.update()
      d.draw()
    })
    trails.forEach((p) => {
      p.update()
      p.draw()
    })
    raf = requestAnimationFrame(frame)
  }

  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf)
      raf = 0
    } else if (!raf) {
      raf = requestAnimationFrame(frame)
    }
  }

  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('visibilitychange', onVisibility)
  raf = requestAnimationFrame(frame)

  cleanup = () => {
    cancelAnimationFrame(raf)
    themeObserver.disconnect()
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseleave', onLeave)
    document.removeEventListener('visibilitychange', onVisibility)
  }
})

onUnmounted(() => cleanup())
</script>

<template>
  <div class="hero-bg pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden" aria-hidden="true">
    <div class="hero-glow hero-glow--cyan" />
    <div class="hero-glow hero-glow--indigo" />
    <div class="hero-glow hero-glow--emerald" />
    <canvas
      v-show="!reduceMotion"
      ref="canvasRef"
      class="absolute inset-0 h-full w-full opacity-90"
    />
    <div class="hero-grain" />
  </div>
</template>
