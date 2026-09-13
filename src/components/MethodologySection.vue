<script setup>
import { ref } from 'vue'
import { vReveal } from '../composables/useScrollReveal'
import { vTilt } from '../composables/useCardTilt'
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
    icon: 'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317.159.69.159 1.006 0l4.875 2.437c.317.159.69.159 1.006 0z',
  },
  {
    title: 'Development Kickoff',
    description: 'Kick off AI-augmented development with full context already in place.',
    icon: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5',
  },
]

const selectedPipelineIndex = ref(0)
const openPanels = ref({
  pipeline: false,
  incremental: false,
})

const togglePanel = (key) => {
  openPanels.value[key] = !openPanels.value[key]
}

const selectPipelineStep = (index) => {
  selectedPipelineIndex.value = index
}

const previousPipelineStep = () => {
  selectPipelineStep(Math.max(0, selectedPipelineIndex.value - 1))
}

const nextPipelineStep = () => {
  selectPipelineStep(Math.min(pipelineSteps.length - 1, selectedPipelineIndex.value + 1))
}
</script>

<template>
  <section id="methodology" class="px-6 py-16">
    <div class="mx-auto max-w-6xl">
      <div v-reveal class="mx-auto max-w-2xl text-center">
        <p class="text-sm font-semibold uppercase tracking-widest text-indigo-400">
          Client Engagements
        </p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
          How I Run Engagements
        </h2>
        <p class="mt-4 text-slate-400">
          Two operating loops I use on freelance and consulting work — how an engagement
          starts, and how each increment stays tied to what was actually discussed.
        </p>
      </div>

      <!-- Engagement 01: AI-Accelerated Delivery Pipeline -->
      <div
        v-reveal="{ delay: 100 }"
        v-tilt="{ max: 2.5, scale: 1.005 }"
        class="group relative mt-14 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 panel-surface backdrop-blur-sm transition-colors duration-300 hover:border-slate-700"
        :class="openPanels.pipeline ? 'border-cyan-500/25' : ''"
      >
        <div
          class="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-emerald-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <button
          type="button"
          class="relative flex w-full items-start justify-between gap-4 p-8 text-left sm:p-10"
          :aria-expanded="openPanels.pipeline"
          aria-controls="engagement-pipeline-body"
          @click="togglePanel('pipeline')"
        >
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Engagement 01
            </p>
            <h3 class="mt-2 text-xl font-bold text-slate-50">
              AI-Accelerated Delivery Pipeline
            </h3>
            <p class="mt-2 max-w-2xl text-sm text-slate-400">
              From the first stakeholder call to a kicked-off build — every step wired so
              the brief, not tribal knowledge, drives the work.
            </p>
          </div>
          <span
            class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-800 bg-slate-950/60 text-slate-400 transition-transform duration-300"
            :class="openPanels.pipeline && 'rotate-180 border-cyan-500/40 text-cyan-300'"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        <div
          id="engagement-pipeline-body"
          class="grid transition-[grid-template-rows] duration-300 ease-out"
          :class="openPanels.pipeline ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div class="overflow-hidden">
            <div class="relative border-t border-slate-800/80 px-8 pb-8 sm:px-10 sm:pb-10">
              <div class="relative mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                <div
                  v-for="(step, i) in pipelineSteps"
                  :key="step.title"
                  class="relative"
                >
                  <button
                    type="button"
                    class="group flex w-full gap-4 rounded-xl border border-transparent p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-800 hover:bg-slate-950/45 focus-visible:border-cyan-500/40 focus-visible:outline-none"
                    :class="selectedPipelineIndex === i && 'border-cyan-500/30 bg-slate-950/55 shadow-lg shadow-cyan-950/20'"
                    :aria-label="`${step.title}: ${step.description}`"
                    :aria-pressed="selectedPipelineIndex === i"
                    @click="selectPipelineStep(i)"
                    @focus="selectPipelineStep(i)"
                  >
                    <div class="flex flex-col items-center">
                      <div
                        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-950/80 ring-1 transition-all duration-200 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-cyan-400/70"
                        :class="[
                          accentClasses[accentCycle[i % 3]].ring,
                          selectedPipelineIndex === i && 'ring-2 ring-cyan-400/70',
                        ]"
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
                      <p class="flex items-center gap-2 font-mono text-xs text-slate-500">
                        <span :class="accentClasses[accentCycle[i % 3]].dot" class="h-1 w-1 rounded-full" />
                        STEP {{ String(i + 1).padStart(2, '0') }}
                      </p>
                      <h4
                        class="mt-1 text-sm font-semibold transition-colors"
                        :class="selectedPipelineIndex === i ? 'text-cyan-200' : 'text-slate-100'"
                      >
                        {{ step.title }}
                      </h4>
                      <p class="mt-1.5 text-sm leading-relaxed text-slate-400">
                        {{ step.description }}
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div
                class="relative mt-8 hidden flex-col gap-4 rounded-xl border border-slate-800 bg-slate-950/45 p-4 sm:flex sm:flex-row sm:items-center sm:justify-between sm:p-5"
                aria-live="polite"
              >
                <div class="flex items-start gap-3">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 font-mono text-[10px] text-cyan-300">
                    {{ String(selectedPipelineIndex + 1).padStart(2, '0') }}
                  </span>
                  <div>
                    <p class="text-[10px] font-semibold uppercase tracking-widest text-cyan-400/80">
                      Selected stage · {{ selectedPipelineIndex + 1 }} of {{ pipelineSteps.length }}
                    </p>
                    <p class="mt-1 text-sm font-semibold text-slate-100">
                      {{ pipelineSteps[selectedPipelineIndex].title }}
                    </p>
                    <p class="mt-1 text-xs leading-relaxed text-slate-400">
                      {{ pipelineSteps[selectedPipelineIndex].description }}
                    </p>
                  </div>
                </div>
                <div class="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    class="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
                    :disabled="selectedPipelineIndex === 0"
                    @click="previousPipelineStep"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    class="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-200 transition-colors hover:border-cyan-400 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                    :disabled="selectedPipelineIndex === pipelineSteps.length - 1"
                    @click="nextPipelineStep"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Engagement 02: Context-Driven Incremental Updates -->
      <div
        v-reveal="{ delay: 160 }"
        v-tilt="{ max: 2.5, scale: 1.005 }"
        class="group relative mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 panel-surface backdrop-blur-sm transition-colors duration-300 hover:border-slate-700"
        :class="openPanels.incremental ? 'border-indigo-500/25' : ''"
      >
        <div
          class="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-emerald-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <button
          type="button"
          class="relative flex w-full items-start justify-between gap-4 p-8 text-left sm:p-10"
          :aria-expanded="openPanels.incremental"
          aria-controls="engagement-incremental-body"
          @click="togglePanel('incremental')"
        >
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Engagement 02
            </p>
            <h3 class="mt-2 text-xl font-bold text-slate-50">
              Context-Driven Incremental Updates
            </h3>
            <p class="mt-2 max-w-2xl text-sm text-slate-400">
              Progress stays anchored to what was actually discussed — every increment
              traces back to a recorded conversation, not a fading memory of one.
            </p>
          </div>
          <span
            class="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-800 bg-slate-950/60 text-slate-400 transition-transform duration-300"
            :class="openPanels.incremental && 'rotate-180 border-indigo-500/40 text-indigo-300'"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        <div
          id="engagement-incremental-body"
          class="grid transition-[grid-template-rows] duration-300 ease-out"
          :class="openPanels.incremental ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div class="overflow-hidden">
            <div class="relative border-t border-slate-800/80 px-8 pb-8 sm:px-10 sm:pb-10">
              <CycleFlow
                class="relative mt-8"
                :steps="cddSteps"
                center-title="Incremental Loop"
                center-note="Repeats until sign-off"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
