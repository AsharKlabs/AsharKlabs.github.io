import { computed, onMounted, ref } from 'vue'

const isDark = ref(true)

const applyTheme = (dark) => {
  isDark.value = dark
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
}

export function useTheme() {
  const toggleTheme = () => {
    const nextThemeIsDark = !isDark.value
    applyTheme(nextThemeIsDark)
    localStorage.setItem('theme', nextThemeIsDark ? 'dark' : 'light')
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark)
  })

  return { isDark: computed(() => isDark.value), toggleTheme }
}