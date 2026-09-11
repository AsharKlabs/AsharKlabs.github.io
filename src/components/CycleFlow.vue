<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  steps: { type: Array, required: true },
  centerTitle: { type: String, default: '' },
  centerNote: { type: String, default: '' },
})

const RADIUS = 190
const selectedIndex = ref(2)
const isOrbitPaused = ref(false)

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

const selectedNode = computed(() => nodes.value[selectedIndex.value] ?? nodes.value[0])

const selectNode = (index) => {
  selectedIndex.value = index
}

const pauseOrbit = () => {
  isOrbitPaused.value = true
}

const resumeOrbit = () => {
  isOrbitPaused.value = false
}
</script>

<template>
  <div>
    <!-- Orbit diagram (md and up) -->
    <div class="relative mx-auto hidden h-[520px] w-full max-w-[680px] md:block">
      <div
        class="orbit-stage absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2"
        :class="{ 'is-paused': isOrbitPaused }"
      >
        <svg
          class="animate-orbit absolute inset-0 h-full w-full"
          viewBox="0 0 380 380"
          fill="none"
        >
          <circle
            cx="190"
            cy="190"
            r="189"
            stroke="currentColor"
            class="text-slate-700"
            stroke-width="1"
            stroke-dasharray="4 10"
            stroke-linecap="round"
          />
        </svg>

        <!-- Center hub -->
        <div
          class="absolute left-1/2 top-1/2 flex h-[132px] w-[132px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-slate-800 bg-slate-950/70 px-3 text-center backdrop-blur-sm"
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
          <span
            class="flex h-5 min-w-5 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-1.5 font-mono text-[10px] text-cyan-300"
          >
            {{ String(selectedNode.index + 1).padStart(2, '0') }}
          </span>
          <p class="mt-2 text-xs font-semibold tracking-wide text-slate-200">
            {{ selectedNode.label }}
          </p>
          <p class="mt-1 text-[11px] leading-snug text-slate-500">
            {{ selectedNode.description }}
          </p>
          <p class="mt-2 text-[10px] font-medium uppercase tracking-widest text-cyan-400/80">
            {{ centerTitle }}
          </p>
        </div>

        <!-- Orbiting step nodes -->
        <div class="orbit-track absolute inset-0">
        <button
          v-for="node in nodes"
          :key="node.label"
          type="button"
          class="group absolute w-[150px] -translate-x-1/2 -translate-y-1/2 appearance-none border-0 bg-transparent p-0 text-center transition-transform duration-200 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none"
          :style="{ left: `calc(50% + ${node.x}px)`, top: `calc(50% + ${node.y}px)` }"
          :aria-label="`${node.label}: ${node.description}`"
          :aria-pressed="selectedIndex === node.index"
          @click="selectNode(node.index)"
          @mouseenter="pauseOrbit(); selectNode(node.index)"
          @mouseleave="resumeOrbit"
          @focus="pauseOrbit"
          @blur="resumeOrbit"
        >
          <div class="orbit-node-content">
            <div
              class="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 ring-1 transition-all duration-200 group-focus-visible:ring-2 group-focus-visible:ring-cyan-400/70"
              :class="[
                node.ring,
                selectedIndex === node.index && 'ring-2 ring-cyan-400/70 shadow-lg shadow-cyan-500/15',
              ]"
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
            <p
              class="mt-2.5 text-sm font-medium transition-colors"
              :class="selectedIndex === node.index ? 'text-cyan-200' : 'text-slate-200'"
            >
              {{ node.label }}
            </p>
            <p class="mt-1 text-[11px] leading-snug text-slate-500 transition-colors group-hover:text-slate-300">
              {{ node.description }}
            </p>
          </div>
        </button>
        </div>
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
