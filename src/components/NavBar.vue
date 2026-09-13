<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useActiveSection } from '../composables/useScrollReveal'
import { useTheme } from '../composables/useTheme'
import ContactModal from './ContactModal.vue'

const route = useRoute()
const isHome = computed(() => route.name === 'home')

const sectionLinks = [
  { id: 'work', label: 'Work' },
  { id: 'methodology', label: 'Engagements' },
  { id: 'open-source', label: 'Open Source' },
]

const activeId = useActiveSection([...sectionLinks.map((l) => l.id), 'contact'])
const mobileOpen = ref(false)
const contactOpen = ref(false)
const { isDark, toggleTheme } = useTheme()

function sectionHref(id) {
  return isHome.value ? `#${id}` : `/#${id}`
}

function openContact() {
  contactOpen.value = true
  mobileOpen.value = false
}
</script>

<template>
  <header
    class="site-nav fixed top-0 inset-x-0 z-50 border-b border-slate-800/40 bg-slate-950/45 backdrop-blur-md"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <RouterLink
        to="/"
        class="font-semibold tracking-tight text-slate-100 hover:text-indigo-400 transition-colors"
      >
        Ashar Ayub
      </RouterLink>

      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in sectionLinks"
          :key="link.id"
          :href="sectionHref(link.id)"
          class="text-sm font-medium transition-colors"
          :class="
            isHome && activeId === link.id
              ? 'text-indigo-400'
              : 'text-slate-400 hover:text-slate-100'
          "
        >
          {{ link.label }}
        </a>
        <RouterLink
          to="/writing"
          class="text-sm font-medium transition-colors"
          :class="
            route.path.startsWith('/writing')
              ? 'text-indigo-400'
              : 'text-slate-400 hover:text-slate-100'
          "
        >
          Writing
        </RouterLink>
        <button
          type="button"
          class="text-sm font-medium transition-colors"
          :class="
            contactOpen || (isHome && activeId === 'contact')
              ? 'text-indigo-400'
              : 'text-slate-400 hover:text-slate-100'
          "
          @click="openContact"
        >
          Contact
        </button>
        <a
          href="/Ashar_Ayub_Resume.pdf"
          download
          class="rounded-full border border-slate-700 px-4 py-1.5 text-sm font-medium text-slate-200 transition-colors hover:border-emerald-500/60 hover:text-emerald-400"
        >
          Download Resume
        </a>
        <button
          type="button"
          class="rounded-full border border-slate-700 p-2 text-slate-300 transition-colors hover:border-cyan-500/60 hover:text-cyan-400"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <svg
            v-if="isDark"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M12 3v2m0 14v2M5.636 5.636l1.414 1.414m9.9 9.9l1.414 1.414M3 12h2m14 0h2M5.636 18.364l1.414-1.414m9.9-9.9l1.414-1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            />
          </svg>
        </button>
      </div>

      <button
        class="md:hidden text-slate-300"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <svg
          v-if="!mobileOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </nav>

    <div
      v-if="mobileOpen"
      class="md:hidden border-t border-slate-800/80 bg-slate-950/95 px-6 py-4"
    >
      <div class="flex flex-col gap-4">
        <a
          v-for="link in sectionLinks"
          :key="link.id"
          :href="sectionHref(link.id)"
          class="text-sm font-medium text-slate-300 hover:text-slate-100"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </a>
        <RouterLink
          to="/writing"
          class="text-sm font-medium text-slate-300 hover:text-slate-100"
          @click="mobileOpen = false"
        >
          Writing
        </RouterLink>
        <button
          type="button"
          class="text-left text-sm font-medium text-slate-300 hover:text-slate-100"
          @click="openContact"
        >
          Contact
        </button>
        <a
          href="/Ashar_Ayub_Resume.pdf"
          download
          class="text-sm font-medium text-emerald-400"
          @click="mobileOpen = false"
        >
          Download Resume
        </a>
        <button
          type="button"
          class="flex items-center gap-2 text-left text-sm font-medium text-slate-300 hover:text-cyan-400"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <svg
            v-if="isDark"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M12 3v2m0 14v2M5.636 5.636l1.414 1.414m9.9 9.9l1.414 1.414M3 12h2m14 0h2M5.636 18.364l1.414-1.414m9.9-9.9l1.414-1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            />
          </svg>
          {{ isDark ? 'Light theme' : 'Dark theme' }}
        </button>
      </div>
    </div>

    <ContactModal v-model="contactOpen" />
  </header>
</template>
