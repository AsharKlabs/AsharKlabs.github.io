// Pointer-follow 3D tilt (skips touch + reduced-motion).
export const vTilt = {
  mounted(el, binding) {
    const opts = typeof binding.value === 'object' && binding.value ? binding.value : {}
    const max = opts.max ?? 4
    const scale = opts.scale ?? 1.01
    const glare = opts.glare !== false

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return
    }

    el.classList.add('tilt-card')
    el.style.transformStyle = 'preserve-3d'
    el.style.willChange = 'transform'

    let glareEl = null
    if (glare) {
      glareEl = document.createElement('div')
      glareEl.className = 'tilt-glare'
      glareEl.setAttribute('aria-hidden', 'true')
      el.appendChild(glareEl)
    }

    let frame = 0
    let targetX = 0
    let targetY = 0

    const render = () => {
      frame = 0
      el.style.transform = `perspective(1000px) rotateX(${targetX}deg) rotateY(${targetY}deg) scale3d(${scale}, ${scale}, ${scale})`
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      targetY = (px - 0.5) * max * 2
      targetX = (0.5 - py) * max * 2

      if (glareEl) {
        glareEl.style.opacity = String(0.35 + Math.hypot(px - 0.5, py - 0.5) * 0.45)
        glareEl.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.22), transparent 52%)`
      }

      if (!frame) frame = requestAnimationFrame(render)
    }

    const onEnter = () => {
      el.style.transition = 'transform 80ms ease-out'
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      el.style.transition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)'
      el.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      if (glareEl) glareEl.style.opacity = '0'
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    el.__tiltCleanup = () => {
      if (frame) cancelAnimationFrame(frame)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      glareEl?.remove()
      el.classList.remove('tilt-card')
      el.style.transform = ''
      el.style.transition = ''
      el.style.willChange = ''
      el.style.transformStyle = ''
    }
  },

  unmounted(el) {
    el.__tiltCleanup?.()
    delete el.__tiltCleanup
  },
}
