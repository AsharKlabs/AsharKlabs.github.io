<script setup>
import { ref } from 'vue'
import { useActiveSection } from '../composables/useScrollReveal'

const links = [
  { id: 'methodology', label: 'Methodology' },
  { id: 'work', label: 'Work' },
  { id: 'open-source', label: 'Open Source' },
  { id: 'contact', label: 'Contact' },
]

const activeId = useActiveSection(links.map((l) => l.id))
const mobileOpen = ref(false)
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a
        href="#top"
        class="font-semibold tracking-tight text-slate-100 hover:text-indigo-400 transition-colors"
      >
        Ashar Ayub
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="text-sm font-medium transition-colors"
          :class="
            activeId === link.id
              ? 'text-indigo-400'
              : 'text-slate-400 hover:text-slate-100'
          "
        >
          {{ link.label }}
        </a>
        <a
          href="/Ashar_Ayub_Resume.pdf"
          download
          class="rounded-full border border-slate-700 px-4 py-1.5 text-sm font-medium text-slate-200 transition-colors hover:border-emerald-500/60 hover:text-emerald-400"
        >
          Download Resume
        </a>
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
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="text-sm font-medium text-slate-300 hover:text-slate-100"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </a>
        <a
          href="/Ashar_Ayub_Resume.pdf"
          download
          class="text-sm font-medium text-emerald-400"
          @click="mobileOpen = false"
        >
          Download Resume
        </a>
      </div>
    </div>
  </header>
</template>
