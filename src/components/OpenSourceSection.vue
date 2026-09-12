<script setup>
import { vReveal } from '../composables/useScrollReveal'

// TODO: replace with the real repo URLs once available.
const repos = [
  {
    title: 'High-Performance Laravel Octane Enterprise Boilerplate',
    description:
      'A production-hardened starter for Laravel applications running on Swoole/Octane — built for continuous-memory performance, enterprise-grade architecture, and horizontal scale from day one.',
    tags: ['Laravel', 'Octane', 'Swoole', 'Enterprise Architecture'],
    url: 'https://github.com/AsharKlabs',
  },
  {
    title: 'FastAPI AI-Augmented Architecture Boilerplate',
    description:
      'An opinionated FastAPI foundation for building LLM-integrated services, structured for MCP tooling and agentic workflows with clean separation between AI orchestration and core business logic.',
    tags: ['FastAPI', 'LLM Integration', 'MCP', 'Agentic Workflows'],
    url: 'https://github.com/AsharKlabs',
  },
]
</script>

<template>
  <section id="open-source" class="px-6 py-28">
    <div class="mx-auto max-w-6xl">
      <div v-reveal class="mx-auto max-w-2xl text-center">
        <p class="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Give Back
        </p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
          Open Source
        </h2>
        <p class="mt-4 text-slate-400">
          Flagship boilerplates I maintain for teams shipping AI-augmented,
          production-grade backends.
        </p>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <a
          v-for="(repo, i) in repos"
          :key="repo.title"
          v-reveal="{ delay: i * 120 }"
          :href="repo.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-7 panel-surface transition-all hover:-translate-y-1 hover:border-emerald-500/50 elevated-shadow"
        >
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-lg font-bold text-slate-50">{{ repo.title }}</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 shrink-0 text-slate-600 transition-colors group-hover:text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
          <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
            {{ repo.description }}
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="tag in repo.tags"
              :key="tag"
              class="rounded-full border border-slate-800 bg-slate-950/60 px-3 py-1 text-xs font-medium text-slate-400"
            >
              {{ tag }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
