<script setup>
import { RouterLink } from 'vue-router'
import { vReveal } from '../composables/useScrollReveal'
import { vTilt } from '../composables/useCardTilt'

const projects = [
  {
    title: 'E-Commerce Catalog Automation',
    label: 'LetsUpMart',
    description:
      'Built Python scrapers and ETL pipelines ingesting 1000+ products, with LLM rewriting for uniqueness and SEO — replacing 10+ hours/week of manual cataloging. LLM-based de-duplication resolved duplicate-content exclusions, taking indexed pages from 0 to 1000+.',
    tags: ['Python Scrapers', 'ETL', 'LLM De-duplication', 'Bagisto / Laravel'],
    accent: 'cyan',
    span: 'sm:col-span-2 lg:col-span-2',
    url: 'https://letsupmart.com',
  },
  {
    title: 'Telemedicine Platform',
    label: 'LetsUpDoc',
    description:
      'Owned the full stack — patient portals, real-time video consults, and a symptom checker that recommends specialists via Pinecone embeddings. Built longitudinal consultation memory so prior context surfaces at follow-up.',
    tags: ['Laravel Octane', 'LiveKit', 'Pinecone', 'LLM Symptom Checker'],
    accent: 'emerald',
    span: 'lg:col-span-1',
    url: 'https://letsupdoc.com/pk',
  },
  {
    title: 'Football Analytics Platform',
    label: 'Jamaheer',
    description:
      'Provisioned VPS infrastructure and designed backends for live match tracking, squad lineup builder, and statistics generation for the Bahrain Premier League — delivered with mobile teams in an 8-week AI-assisted build cycle.',
    tags: ['Live Match Control', 'VPS', 'AI-Assisted Delivery'],
    accent: 'indigo',
    span: 'lg:col-span-1',
    url: 'https://jamaheer.co',
  },
  {
    title: 'Distributed Signage Platform',
    label: 'CODOT',
    description:
      'Led emergency migration from AWS Bahrain to AWS Mumbai after regional data centres were destroyed — rebuilt the stack with no recoverable backups and reconnected 250+ devices. Deployed custom MinIO for Oman, a Node.js WebSocket + Coturn P2P layer, and a native Kotlin playback client.',
    tags: ['AWS Multi-Region', 'MinIO', 'Coturn / WebRTC', 'Kotlin', 'WebSockets'],
    accent: 'indigo',
    span: 'sm:col-span-2 lg:col-span-2',
    url: 'https://www.getcodot.com/',
    writeUps: [
      {
        to: '/writing/codot-bahrain-mumbai-migration',
        label: 'Bahrain → Mumbai migration',
      },
      {
        to: '/writing/codot-minio-oman',
        label: 'Why MinIO in Oman',
      },
      {
        to: '/writing/codot-kotlin-player-rewrite',
        label: 'Why the Kotlin rewrite',
      },
    ],
  },

  {
    title: 'Clinical Training Platform',
    label: 'RCSI AI Simulator',
    description:
      'Embedded LLMs into a live clinical simulation for real-time simulated patient dialogue and automated triage scoring. Engineered the state-intensive Laravel backend, guided the React/Inertia.js SPA, and configured a Laravel Nova admin portal under zero-downtime deploys.',
    tags: ['LLM Integration', 'Laravel', 'React / Inertia.js', 'Laravel Nova'],
    accent: 'cyan',
    span: 'sm:col-span-2 lg:col-span-2',
    url: 'https://rcsi.byklabs.com/',
  },
  {
    title: 'Hospital Operations Platform',
    label: 'LetsUpDoc | Wasl',
    description:
      'Extended the LetsUpDoc stack for KSA clinic operations — patient care, video consultations, e-prescriptions, billing, and bilingual Arabic/English workflows in one MOH-aligned system.',
    tags: ['Telemedicine', 'KSA / GCC', 'Bilingual UX'],
    accent: 'emerald',
    span: 'lg:col-span-1',
    url: 'https://letsupdoc.com/',
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
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 [perspective:1200px]">
    <div
      v-for="(project, i) in projects"
      :key="project.label"
      class="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-7 panel-surface backdrop-blur-sm elevated-shadow"
      :class="[
        accentMap[project.accent].border,
        project.span,
        project.url ? 'cursor-pointer' : '',
      ]"
      v-tilt="{ max: 4, scale: 1.01 }"
      v-reveal="{ delay: (i % 3) * 100 }"
    >
      <a
        v-if="project.url"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
        class="absolute inset-0 z-0"
        :aria-label="`Open ${project.label}`"
      />

      <div
        class="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        :class="accentMap[project.accent].glow"
      />

      <div class="relative z-10 pointer-events-none">
        <div class="flex items-start justify-between gap-3">
          <p
            class="text-xs font-semibold uppercase tracking-widest"
            :class="accentMap[project.accent].label"
          >
            {{ project.label }}
          </p>
          <svg
            v-if="project.url"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 shrink-0 text-slate-500 transition-colors"
            :class="accentMap[project.accent].label.replace('text-', 'group-hover:text-')"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
        <h3 class="mt-2 text-lg font-bold text-slate-50">
          {{ project.title }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-400">
          {{ project.description }}
        </p>

        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1 font-mono text-xs text-slate-400 transition-colors"
            :class="accentMap[project.accent].tag"
          >
            {{ tag }}
          </span>
        </div>

        <div
          v-if="project.writeUps?.length"
          class="pointer-events-auto relative z-10 mt-5 flex flex-col items-start gap-2"
        >
          <RouterLink
            v-for="writeUp in project.writeUps"
            :key="writeUp.to"
            :to="writeUp.to"
            class="text-sm font-medium transition-colors"
            :class="accentMap[project.accent].label"
          >
            {{ writeUp.label }} →
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
