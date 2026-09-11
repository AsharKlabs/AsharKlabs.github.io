<script setup>
import { computed } from 'vue'

const props = defineProps({
  steps: { type: Array, required: true },
  centerTitle: { type: String, default: '' },
  centerNote: { type: String, default: '' },
})

const RADIUS = 170

const nodes = computed(() =>
  props.steps.map((step, i) => {
    const angle = ((-90 + (i * 360) / props.steps.length) * Math.PI) / 180
    return {
      ...step,
      index: i,
      x: Math.round(Math.cos(angle) * RADIUS),
      y: Math.round(Math.sin(angle) * RADIUS),
    }
  }),
)
</script>

<template>
  <div>
    <!-- Orbit diagram (md and up) -->
    <div class="relative mx-auto hidden h-[520px] w-full max-w-[600px] md:block">
      <svg
        class="animate-orbit absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 340 340"
        fill="none"
      >
        <circle
          cx="170"
          cy="170"
          r="169"
          stroke="currentColor"
          class="text-slate-700"
          stroke-width="1"
          stroke-dasharray="4 10"
          stroke-linecap="round"
        />
      </svg>

      <!-- Center hub -->
      <div
        class="absolute left-1/2 top-1/2 flex h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-slate-800 bg-slate-950/70 px-4 text-center backdrop-blur-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.75"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <p class="mt-2 text-xs font-semibold tracking-wide text-slate-200">
          {{ centerTitle }}
        </p>
        <p class="mt-1 text-[11px] leading-snug text-slate-500">{{ centerNote }}</p>
      </div>

      <!-- Orbiting step nodes -->
      <div
        v-for="node in nodes"
        :key="node.label"
        class="absolute w-[150px] -translate-x-1/2 -translate-y-1/2 text-center"
        :style="{ left: `calc(50% + ${node.x}px)`, top: `calc(50% + ${node.y}px)` }"
      >
        <div
          class="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 ring-1"
          :class="node.ring"
        >
          <span
            v-if="node.live"
            class="absolute inset-0 animate-ping rounded-full bg-cyan-500/20"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="relative h-6 w-6"
            :class="node.accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.75"
              :d="node.icon"
            />
          </svg>
          <span
            class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-slate-800 bg-slate-950 font-mono text-[10px] text-slate-400"
          >
            {{ node.index + 1 }}
          </span>
        </div>
        <p class="mt-2.5 text-sm font-medium text-slate-200">{{ node.label }}</p>
        <p class="mt-1 text-[11px] leading-snug text-slate-500">
          {{ node.description }}
        </p>
      </div>
    </div>

    <!-- Stacked list (below md) -->
    <ol class="space-y-5 md:hidden">
      <li v-for="node in nodes" :key="node.label" class="flex gap-4">
        <div class="flex flex-col items-center">
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-950 ring-1"
            :class="node.ring"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              :class="node.accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.75"
                :d="node.icon"
              />
            </svg>
          </div>
          <span class="mt-2 w-px flex-1 bg-slate-800" />
        </div>
        <div class="pb-1">
          <p class="font-mono text-[11px] text-slate-500">
            STEP {{ String(node.index + 1).padStart(2, '0') }}
          </p>
          <p class="mt-0.5 text-sm font-semibold text-slate-100">{{ node.label }}</p>
          <p class="mt-1 text-sm leading-relaxed text-slate-400">
            {{ node.description }}
          </p>
        </div>
      </li>
      <li class="flex items-center gap-2 pl-1 text-xs font-medium text-slate-500">
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
            stroke-width="1.75"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {{ centerNote }}
      </li>
    </ol>
  </div>
</template>
