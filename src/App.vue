<script setup>
import { vReveal } from './composables/useScrollReveal'
import NavBar from './components/NavBar.vue'
import HeroBackground from './components/HeroBackground.vue'
import StatFloater from './components/StatFloater.vue'
import StatusFloater from './components/StatusFloater.vue'
import MethodologySection from './components/MethodologySection.vue'
import BentoGrid from './components/BentoGrid.vue'
import TechStackMarquee from './components/TechStackMarquee.vue'
import OpenSourceSection from './components/OpenSourceSection.vue'
import FooterSection from './components/FooterSection.vue'

// Sit just outside the centered hero copy, with optional stagger offset.
const rightCluster = (width, offset = 0) => {
  if (typeof window === 'undefined') return 720 + offset
  const center = window.innerWidth / 2
  const textHalf = 336
  const gap = 56
  const minX = center + textHalf + gap // never overlap text from the right
  const maxX = window.innerWidth - 24 - width
  const preferred = minX + offset
  return Math.min(Math.max(preferred, minX), maxX)
}

// Mirror of rightCluster — just left of the hero copy, never overlapping it.
const leftCluster = (width, offset = 0) => {
  if (typeof window === 'undefined') return Math.max(24, 24 + offset)
  const center = window.innerWidth / 2
  const textHalf = 336
  const gap = 56
  const maxX = center - textHalf - gap - width // right edge stays clear of text
  const preferred = maxX + offset
  return Math.min(Math.max(preferred, 24), maxX)
}
</script>

<template>
  <div class="relative min-h-screen bg-slate-950">
    <div class="bg-grid bg-grid-fade pointer-events-none fixed inset-0 -z-10" />
    <HeroBackground />

    <NavBar />

    <main class="relative z-10 pt-32">
      <section id="top" class="relative px-6 pb-12 text-center">
        <!-- Floating project signals: draggable, scroll with the hero, desktop-only -->
        <div class="relative z-10 hidden lg:block">
          <StatusFloater
            :initial-x="leftCluster(240, 0)"
            :initial-y="8"
            eyebrow="LETSUPDOC"
            title="LLM Symptom Checker"
            subtitle="Doctor-gated clinical triage"
            icon="M12 3v2m0 14v2M5.636 5.636l1.414 1.414m9.9 9.9l1.414 1.414M3 12h2m14 0h2M5.636 18.364l1.414-1.414m9.9-9.9l1.414-1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
          <StatFloater
            :initial-x="rightCluster(192, 0)"
            :initial-y="8"
            dot="bg-cyan-400"
            eyebrow="CODOT"
            value="P2P + WS"
            value-class="text-cyan-300"
            label="Live streaming · Instant messaging"
            trend="Real-time systems"
            trend-class="text-cyan-400"
          />
          <StatFloater
            :initial-x="rightCluster(192, 96)"
            :initial-y="154"
            dot="bg-emerald-400"
            eyebrow="CLOUD DELIVERY"
            value="AWS + MinIO"
            value-class="text-emerald-300"
            label="Multi-region · Zero-downtime deploys"
            trend="CODOT · Production Ops"
            trend-class="text-emerald-400"
          />
          <StatFloater
            :initial-x="leftCluster(192, -96)"
            :initial-y="158"
            dot="bg-indigo-400"
            eyebrow="LETSUPDOC"
            value="LiveKit + Agent"
            value-class="text-indigo-300"
            value-size="text-lg"
            label="Consults recorded, transcribed & summarized"
            trend="Longitudinal clinical memory"
            trend-class="text-indigo-400"
          />
          <StatusFloater
            :initial-x="rightCluster(240, -8)"
            :initial-y="300"
            eyebrow="AI-ASSISTED DELIVERY"
            title="MCP + Agent Workflows"
            subtitle="Context-first architecture"
            icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </div>

        <div
          v-reveal
          class="relative z-10 mx-auto mb-4 flex flex-wrap items-center justify-center gap-2.5"
        >
          <span
            class="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-400 panel-surface"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            5+ Yrs Experience
          </span>
          <span
            class="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-400 panel-surface"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Karachi, Pakistan
          </span>
        </div>

        <h1
          v-reveal="{ delay: 80 }"
          class="relative z-10 text-5xl font-extrabold tracking-tight text-slate-50 sm:text-6xl md:text-7xl"
        >
          Ashar Ayub
        </h1>

        <h2
          v-reveal="{ delay: 160 }"
          class="relative z-10 mt-4 bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-xl font-medium text-transparent sm:text-2xl"
        >
          Lead Software Engineer | AI-Augmented Architect
        </h2>

        <p
          v-reveal="{ delay: 240 }"
          class="relative z-10 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          I build scalable backend infrastructure and real-time systems, with 5+ years
          turning complex product requirements into production-grade software. I
          architect AI-augmented development workflows — using Cursor, Claude Code, and
          the Model Context Protocol — to integrate LLMs into production systems while
          providing architectural governance and mentorship for the teams I work with.
        </p>

        <div
          v-reveal="{ delay: 320 }"
          class="relative z-10 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
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

      <TechStackMarquee />

      <OpenSourceSection />
    </main>

    <FooterSection />
  </div>
</template>
