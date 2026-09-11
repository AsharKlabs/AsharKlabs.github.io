// Reveal-on-scroll directive: fades/slides an element in once when it enters the viewport.
export const vReveal = {
  mounted(el, binding) {
    const delay = binding?.value?.delay ?? 0

    el.style.opacity = '0'
    el.style.transform = 'translateY(1.5rem)'
    el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
  },
}

// Tracks which section id is currently most in view, for nav scroll-spy.
import { ref, onMounted, onUnmounted } from 'vue'

export function useActiveSection(sectionIds) {
  const activeId = ref(sectionIds[0])
  let observer

  onMounted(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          activeId.value = visible[0].target.id
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
  })

  onUnmounted(() => observer?.disconnect())

  return activeId
}
