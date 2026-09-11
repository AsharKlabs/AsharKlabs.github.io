<script setup>
import { vReveal } from './composables/useScrollReveal'
import NavBar from './components/NavBar.vue'
import AiTerminal from './components/AiTerminal.vue'
import TelemetryWidget from './components/TelemetryWidget.vue'
import MethodologySection from './components/MethodologySection.vue'
import BentoGrid from './components/BentoGrid.vue'
import OpenSourceSection from './components/OpenSourceSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="relative min-h-screen bg-slate-950">
    <div class="bg-grid bg-grid-fade pointer-events-none fixed inset-0 -z-10" />

    <NavBar />

    <main class="relative pt-32">
      <section id="top" class="relative px-6 pb-20 text-center">
        <!-- Floating HUD widgets: draggable, scroll with the hero, desktop-only -->
        <div class="hidden lg:block">
          <AiTerminal />
          <TelemetryWidget />
        </div>

        <p
          v-reveal
          class="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-400"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Karachi, Pakistan
        </p>

        <h1
          v-reveal="{ delay: 80 }"
          class="text-5xl font-extrabold tracking-tight text-slate-50 sm:text-6xl md:text-7xl"
        >
          Ashar Ayub
        </h1>

        <h2
          v-reveal="{ delay: 160 }"
          class="mt-4 bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-xl font-medium text-transparent sm:text-2xl"
        >
          Lead Software Engineer | AI-Augmented Architect
        </h2>

        <p
          v-reveal="{ delay: 240 }"
          class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          I build scalable backend infrastructure and real-time systems, with 5+ years
          turning complex product requirements into production-grade software. I
          architect AI-augmented development workflows — using Cursor, Claude Code, and
          the Model Context Protocol — to integrate LLMs into production systems while
          providing architectural governance and mentorship for the teams I work with.
        </p>

        <div
          v-reveal="{ delay: 320 }"
          class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://github.com/AsharKlabs"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-transform hover:-translate-y-0.5 hover:bg-indigo-400"
          >
            View My Work on GitHub
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>

          <a
            href="/Ashar_Ayub_Resume.pdf"
            download
            class="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-emerald-500/60 hover:text-emerald-400"
          >
            Download Resume
          </a>
        </div>
      </section>

      <MethodologySection />

      <section id="work" class="px-6 py-16">
        <div class="mx-auto max-w-6xl">
          <div v-reveal class="mx-auto max-w-2xl text-center">
            <p class="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Mission Control
            </p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              Selected Work
            </h2>
          </div>

          <div class="mt-14">
            <BentoGrid />
          </div>
        </div>
      </section>

      <OpenSourceSection />
    </main>

    <FooterSection />
  </div>
</template>
