<script setup>
import { vReveal } from '../composables/useScrollReveal'

const projects = [
  {
    title: 'Distributed Signage Platform',
    label: 'CODOT',
    description:
      'Led a multi-region disaster recovery failover (AWS Bahrain → Mumbai) and architected custom MinIO storage for the Oman region, paired with a Node.js WebSocket + Coturn P2P streaming layer and a native Kotlin playback client for distributed signage devices.',
    tags: ['AWS Multi-Region', 'MinIO', 'WebRTC / P2P', 'Kotlin'],
    accent: 'indigo',
    span: 'sm:col-span-2 lg:col-span-2',
  },
  {
    title: 'Healthcare Triage API',
    label: 'LetsUpDoc',
    description:
      'Architected clinical triage workflows, real-time video consultations, and continuous-memory PHP Swoole environments for zero-latency patient portals.',
    tags: ['Laravel Octane', 'WebRTC', 'PostgreSQL'],
    accent: 'emerald',
    span: 'lg:col-span-1',
  },
  {
    title: 'E-Commerce Infrastructure',
    label: 'LetsUpMart',
    description:
      'Scaled high-availability retail architectures handling complex product indices, seamless checkout routing, and merchant affiliations.',
    tags: ['High-Availability', 'Search Indexing', 'Node.js'],
    accent: 'cyan',
    span: 'lg:col-span-1',
  },
  {
    title: 'Live Sports Telemetry',
    label: 'Jamaheer',
    description:
      'Engineered real-time statistical backends and live match tracking pipelines for the Bahrain Premier League.',
    tags: ['WebSockets', 'Real-Time Data', 'Cloudflare'],
    accent: 'indigo',
    span: 'sm:col-span-2 lg:col-span-2',
  },
  {
    title: 'Clinical AI Simulation Platform',
    label: 'RCSI AI Simulator',
    description:
      'Embedded LLMs into a live clinical simulation environment driving real-time simulated patient dialogue and automated triage scoring, engineered the state-intensive Laravel backend, and led the React/Inertia.js frontend alongside a Laravel Nova admin portal.',
    tags: ['LLM Integration', 'React / Inertia.js', 'Laravel Nova'],
    accent: 'cyan',
    span: 'sm:col-span-2 lg:col-span-2',
  },
  {
    title: 'Geospatial Plot Management',
    label: 'Al Msayyan',
    description:
      'Built a live land visualization and plot management platform with Leaflet.js — custom map overlays and interactive polygons across 250+ residential plots, synced in real time with color-coded availability.',
    tags: ['Leaflet.js', 'Real-Time Polling', 'Geospatial'],
    accent: 'emerald',
    span: 'lg:col-span-1',
  },
]

const accentMap = {
  emerald: {
    border: 'hover:border-emerald-500/50',
    glow: 'bg-emerald-500/20',
    tag: 'group-hover:border-emerald-500/40 group-hover:text-emerald-300',
    label: 'text-emerald-400',
  },
  cyan: {
    border: 'hover:border-cyan-500/50',
    glow: 'bg-cyan-500/20',
    tag: 'group-hover:border-cyan-500/40 group-hover:text-cyan-300',
    label: 'text-cyan-400',
  },
  indigo: {
    border: 'hover:border-indigo-500/50',
    glow: 'bg-indigo-500/20',
    tag: 'group-hover:border-indigo-500/40 group-hover:text-indigo-300',
    label: 'text-indigo-400',
  },
}
</script>

<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="(project, i) in projects"
      :key="project.label"
      v-reveal="{ delay: (i % 3) * 100 }"
      class="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
      :class="[accentMap[project.accent].border, project.span]"
    >
      <div
        class="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        :class="accentMap[project.accent].glow"
      />

      <p
        class="relative text-xs font-semibold uppercase tracking-widest"
        :class="accentMap[project.accent].label"
      >
        {{ project.label }}
      </p>
      <h3 class="relative mt-2 text-lg font-bold text-slate-50">
        {{ project.title }}
      </h3>
      <p class="relative mt-3 text-sm leading-relaxed text-slate-400">
        {{ project.description }}
      </p>

      <div class="relative mt-6 flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1 font-mono text-xs text-slate-400 transition-colors"
          :class="accentMap[project.accent].tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
