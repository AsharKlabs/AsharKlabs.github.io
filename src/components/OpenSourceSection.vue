<script setup>
import { vReveal } from '../composables/useScrollReveal'
import { vTilt } from '../composables/useCardTilt'

const repos = [
  {
    title: 'Laravel Octane Starter',
    description:
      'A sample Laravel + Swoole/Octane boilerplate exploring continuous-memory app structure and horizontal scale patterns.',
    tags: ['Laravel', 'Octane', 'Swoole'],
    url: 'https://github.com/AsharKlabs/laravel-octane-enterprise-boilerplate',
  },
  {
    title: 'FastAPI AI / MCP Starter',
    description:
      'A sample FastAPI layout for LLM-integrated services with MCP tooling and agent-style workflows.',
    tags: ['FastAPI', 'LLM', 'MCP'],
    url: 'https://github.com/AsharKlabs/fastapi-ai-mcp-boilerplate',
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
          Sample boilerplates you can explore — starters and reference layouts.
        </p>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <a
          v-for="(repo, i) in repos"
          :key="repo.title"
          v-reveal="{ delay: i * 120 }"
          v-tilt="{ max: 3.5, scale: 1.01 }"
          :href="repo.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-7 panel-surface hover:border-emerald-500/50 elevated-shadow"
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
