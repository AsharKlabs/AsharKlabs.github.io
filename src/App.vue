<script setup>
import { vReveal } from './composables/useScrollReveal'
import NavBar from './components/NavBar.vue'
import StatFloater from './components/StatFloater.vue'
import StatusFloater from './components/StatusFloater.vue'
import MethodologySection from './components/MethodologySection.vue'
import BentoGrid from './components/BentoGrid.vue'
import TechStackMarquee from './components/TechStackMarquee.vue'
import OpenSourceSection from './components/OpenSourceSection.vue'
import FooterSection from './components/FooterSection.vue'

const rightX = (width) => (typeof window !== 'undefined' ? window.innerWidth - 24 - width : 1200)
</script>

<template>
  <div class="relative min-h-screen bg-slate-950">
    <div class="bg-grid bg-grid-fade pointer-events-none fixed inset-0 -z-10" />

    <NavBar />

    <main class="relative pt-32">
      <section id="top" class="relative px-6 pb-20 text-center">
        <!-- Floating project signals: draggable, scroll with the hero, desktop-only -->
        <div class="hidden lg:block">
          <StatusFloater
            :initial-x="24"
            :initial-y="8"
            eyebrow="AI IN PRODUCTION"
            title="LLM + Contextual Memory"
            subtitle="RCSI Simulator · LetsUpDoc"
            icon="M12 3v2m0 14v2M5.636 5.636l1.414 1.414m9.9 9.9l1.414 1.414M3 12h2m14 0h2M5.636 18.364l1.414-1.414m9.9-9.9l1.414-1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
          <StatFloater
            :initial-x="rightX(192)"
            :initial-y="8"
            dot="bg-cyan-400"
            eyebrow="REAL-TIME SYSTEMS"
            value="P2P + WS"
            value-class="text-cyan-300"
            label="Live streaming · Instant messaging"
            trend="CODOT · LetsUpDoc"
            trend-class="text-cyan-400"
          />
          <StatFloater
            :initial-x="rightX(192)"
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
            :initial-x="24"
            :initial-y="158"
            dot="bg-indigo-400"
            eyebrow="LIVE DATA"
            value="250+ plots"
            value-class="text-indigo-300"
            label="Geospatial state synced live"
            trend="Al Msayyan · Leaflet.js"
            trend-class="text-indigo-400"
          />
          <StatusFloater
            :initial-x="rightX(240)"
            :initial-y="300"
            eyebrow="AI-ASSISTED DELIVERY"
            title="MCP + Agent Workflows"
            subtitle="Context-first architecture"
            icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </div>

        <div
          v-reveal
          class="mx-auto mb-4 flex flex-wrap items-center justify-center gap-2.5"
        >
          <span
            class="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-400"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            5+ Yrs Experience
          </span>
          <span
            class="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-400"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Karachi, Pakistan
          </span>
        </div>

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

      <TechStackMarquee />

      <OpenSourceSection />
    </main>

    <FooterSection />
  </div>
</template>
