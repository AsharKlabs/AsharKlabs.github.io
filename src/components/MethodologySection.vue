<script setup>
import { vReveal } from '../composables/useScrollReveal'
import StepFlow from './StepFlow.vue'
import CycleFlow from './CycleFlow.vue'

const cddSteps = [
  {
    label: 'Record Meeting',
    description: 'Record the stakeholder meeting to discuss development progress.',
    icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z',
    accent: 'text-slate-300',
    ring: 'ring-slate-700',
  },
  {
    label: 'Generate Context',
    description: 'Generate a summary, markdown files, and contextual prompts from the recording.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    accent: 'text-indigo-300',
    ring: 'ring-indigo-500/40',
  },
  {
    label: 'AI Refinement',
    description: 'Feed the context into agent AI to perform the refinements.',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    accent: 'text-cyan-300',
    ring: 'ring-cyan-500/40',
    live: true,
  },
  {
    label: 'Generate Updates',
    description: 'Generate the updates and ship them for review.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    accent: 'text-emerald-300',
    ring: 'ring-emerald-500/40',
  },
  {
    label: 'Client Review',
    description: 'Discuss the updates with the client, then loop again.',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    accent: 'text-slate-300',
    ring: 'ring-slate-700',
    loop: true,
  },
]

const accentCycle = ['indigo', 'cyan', 'emerald']
const accentClasses = {
  indigo: { ring: 'ring-indigo-500/40', text: 'text-indigo-300', dot: 'bg-indigo-400' },
  cyan: { ring: 'ring-cyan-500/40', text: 'text-cyan-300', dot: 'bg-cyan-400' },
  emerald: { ring: 'ring-emerald-500/40', text: 'text-emerald-300', dot: 'bg-emerald-400' },
}

const pipelineSteps = [
  {
    title: 'Stakeholder Meeting',
    description:
      'Schedule a requirements-gathering session directly with the client stakeholder.',
    icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
  },
  {
    title: 'Record & Transcribe',
    description:
      'Record the meeting and transcribe it, capturing every requirement and nuance verbatim.',
    icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z',
  },
  {
    title: 'AI-Generated Project Brief',
    description:
      'Feed the transcript into AI to synthesize a structured, unambiguous project brief.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'Connect Design Tools (MCP)',
    description:
      "Wire design-tool MCP servers into the agent's context to reason directly against the source design.",
    icon: 'M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125z',
  },
  {
    title: 'Connect Project Management (MCP)',
    description:
      'Wire project-management MCP servers to sync scope, tickets, and status automatically.',
    icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M8.25 8.25V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 011.123-.08m0 0V4.5A2.25 2.25 0 0113.5 2.25h1.5a2.25 2.25 0 012.25 2.25v.086m-5.8-.086h5.8M4.875 8.25h9.75c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-9.75A1.125 1.125 0 013.75 20.625V9.375c0-.621.504-1.125 1.125-1.125z',
  },
  {
    title: 'Brief as Source of Truth',
    description:
      'Lock the project brief as the single source of truth the whole team and every agent reasons from.',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z',
  },
  {
    title: 'Plan Development Workflows',
    description:
      'Plan the development workflow and sprint breakdown directly from the brief.',
    icon: 'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.875 2.437c.317.159.69.159 1.006 0z',
  },
  {
    title: 'Development Kickoff',
    description: 'Kick off AI-augmented development with full context already in place.',
    icon: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5',
  },
]

const deploySteps = [
  {
    label: 'Provision the Server',
    description: 'Stand up and size the Ubuntu / AWS environment for the workload.',
    icon: 'M2.25 6.75a3 3 0 013-3h13.5a3 3 0 013 3v1.5a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-1.5zM2.25 15.75a3 3 0 013-3h13.5a3 3 0 013 3v1.5a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-1.5zM6.75 8.25h.008v.008H6.75V8.25zm0 9h.008v.008H6.75v-.008z',
    accent: 'text-slate-300',
    ring: 'ring-slate-700',
  },
  {
    label: 'Set Up Web Server',
    description: 'Configure Nginx, Octane / FPM workers, queues, and scheduled jobs.',
    icon: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75',
    accent: 'text-indigo-300',
    ring: 'ring-indigo-500/40',
  },
  {
    label: 'Deploy the Application',
    description: 'Ship the build through zero-downtime GitHub Actions pipelines.',
    icon: 'M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z',
    accent: 'text-cyan-300',
    ring: 'ring-cyan-500/40',
    live: true,
  },
  {
    label: 'Route the Domain',
    description: 'Point DNS, load balancers, and Cloudflare routing at the environment.',
    icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
    accent: 'text-indigo-300',
    ring: 'ring-indigo-500/40',
  },
  {
    label: 'Secure the Application',
    description: 'Terminate SSL, harden firewalls, and gate every admin surface.',
    icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
    accent: 'text-emerald-300',
    ring: 'ring-emerald-500/40',
  },
]
</script>

<template>
  <section id="methodology" class="px-6 py-16">
    <div class="mx-auto max-w-6xl">
      <div v-reveal class="mx-auto max-w-2xl text-center">
        <p class="text-sm font-semibold uppercase tracking-widest text-indigo-400">
          Architectural Philosophy
        </p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
          How I Work
        </h2>
        <p class="mt-4 text-slate-400">
          Three governed loops — how an engagement starts, how each increment ships,
          and how it reaches production.
        </p>
      </div>

      <!-- Panel 1: Context-Driven Incremental Updates -->
      <div
        v-reveal="{ delay: 100 }"
        class="group relative mt-14 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 sm:p-10"
      >
        <div
          class="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-emerald-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <p class="relative text-xs font-semibold uppercase tracking-widest text-slate-500">
          Philosophy 01
        </p>
        <h3 class="relative mt-2 text-xl font-bold text-slate-50">
          Context-Driven Incremental Updates
        </h3>
        <p class="relative mt-2 max-w-2xl text-sm text-slate-400">
          Progress stays anchored to what was actually discussed — every increment
          traces back to a recorded conversation, not a fading memory of one.
        </p>

        <CycleFlow
          class="relative mt-8"
          :steps="cddSteps"
          center-title="Incremental Loop"
          center-note="Repeats until sign-off"
        />
      </div>

      <!-- Panel 2: AI-Accelerated Delivery Pipeline -->
      <div
        v-reveal="{ delay: 160 }"
        class="group relative mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 sm:p-10"
      >
        <div
          class="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-emerald-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <p class="relative text-xs font-semibold uppercase tracking-widest text-slate-500">
          Philosophy 02
        </p>
        <h3 class="relative mt-2 text-xl font-bold text-slate-50">
          AI-Accelerated Delivery Pipeline
        </h3>
        <p class="relative mt-2 max-w-2xl text-sm text-slate-400">
          From the first stakeholder call to a kicked-off build — every step wired so
          the brief, not tribal knowledge, drives the work.
        </p>

        <div class="relative mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          <div
            v-for="(step, i) in pipelineSteps"
            :key="step.title"
            class="relative flex gap-4"
          >
            <div class="flex flex-col items-center">
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-950/80 ring-1"
                :class="accentClasses[accentCycle[i % 3]].ring"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  :class="accentClasses[accentCycle[i % 3]].text"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                    :d="step.icon"
                  />
                </svg>
              </div>
              <span
                v-if="i < pipelineSteps.length - 1"
                class="mt-2 hidden w-px flex-1 bg-slate-800 sm:block"
              />
            </div>
            <div class="pb-2">
              <p class="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span :class="accentClasses[accentCycle[i % 3]].dot" class="h-1 w-1 rounded-full" />
                STEP {{ String(i + 1).padStart(2, '0') }}
              </p>
              <h4 class="mt-1 text-sm font-semibold text-slate-100">
                {{ step.title }}
              </h4>
              <p class="mt-1.5 text-sm leading-relaxed text-slate-400">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel 3: Cloud Deployment -->
      <div
        v-reveal="{ delay: 220 }"
        class="group relative mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 sm:p-10"
      >
        <div
          class="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <p class="relative text-xs font-semibold uppercase tracking-widest text-slate-500">
          Philosophy 03
        </p>
        <h3 class="relative mt-2 text-xl font-bold text-slate-50">
          Cloud Deployment
        </h3>
        <p class="relative mt-2 max-w-2xl text-sm text-slate-400">
          Infrastructure owned end to end — from bare server to a secured, routed
          production endpoint.
        </p>

        <StepFlow class="relative mt-8" :steps="deploySteps" />
      </div>
    </div>
  </section>
</template>
