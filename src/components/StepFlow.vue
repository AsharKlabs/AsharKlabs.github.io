<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  steps: { type: Array, required: true },
  loopNote: { type: String, default: '' },
})

const selectedIndex = ref(0)
const selectedStep = computed(() => props.steps[selectedIndex.value])

const selectStep = (index) => {
  selectedIndex.value = index
}

const selectPrevious = () => {
  selectStep(Math.max(0, selectedIndex.value - 1))
}

const selectNext = () => {
  selectStep(Math.min(props.steps.length - 1, selectedIndex.value + 1))
}
</script>

<template>
  <div>
    <div class="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-2">
      <template v-for="(step, i) in steps" :key="step.label">
        <button
          type="button"
          class="group flex flex-1 flex-col items-center gap-3 rounded-xl border border-transparent px-2 py-2 text-center transition-all duration-200 hover:-translate-y-1 hover:border-slate-800 hover:bg-slate-950/40 focus-visible:-translate-y-1 focus-visible:border-cyan-500/40 focus-visible:outline-none"
          :aria-label="`${step.label}: ${step.description}`"
          :aria-pressed="selectedIndex === i"
          @click="selectStep(i)"
          @focus="selectStep(i)"
        >
          <div
            class="relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-950/80 ring-1 transition-all duration-200 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-cyan-400/70"
            :class="[
              step.ring,
              selectedIndex === i && 'ring-2 ring-cyan-400/70 shadow-lg shadow-cyan-500/15',
            ]"
          >
            <span
              v-if="step.live"
              class="absolute inset-0 animate-ping rounded-full bg-cyan-500/20"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="relative h-6 w-6"
              :class="step.accent"
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
            class="text-sm font-medium transition-colors"
            :class="selectedIndex === i ? 'text-cyan-200' : 'text-slate-300'"
          >
            {{ step.label }}
          </span>
        </button>

        <div
          v-if="i < steps.length - 1"
          class="hidden h-px flex-1 bg-slate-700 transition-colors sm:mt-7 sm:block"
          :class="i < selectedIndex ? 'bg-cyan-500/60' : 'bg-slate-700'"
        />
        <div v-if="i < steps.length - 1" class="h-6 w-px bg-slate-800 sm:hidden" />
      </template>
    </div>

    <div
      class="mt-8 hidden flex-col gap-4 rounded-xl border border-slate-800 bg-slate-950/45 p-4 sm:flex sm:flex-row sm:items-center sm:justify-between sm:p-5"
      aria-live="polite"
    >
      <div class="flex min-w-0 items-start gap-3">
        <span
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 font-mono text-[10px] text-cyan-300"
        >
          {{ String(selectedIndex + 1).padStart(2, '0') }}
        </span>
        <div class="min-w-0">
          <p class="text-[10px] font-semibold uppercase tracking-widest text-cyan-400/80">
            Current stage · {{ selectedIndex + 1 }} of {{ steps.length }}
          </p>
          <p class="mt-1 text-sm font-semibold text-slate-100">{{ selectedStep.label }}</p>
          <p class="mt-1 text-xs leading-relaxed text-slate-400">
            {{ selectedStep.description }}
          </p>
        </div>
      </div>

      <div class="flex shrink-0 items-center gap-2">
        <button
          type="button"
          class="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="selectedIndex === 0"
          aria-label="Previous pipeline stage"
          @click="selectPrevious"
        >
          Previous
        </button>
        <button
          type="button"
          class="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-200 transition-colors hover:border-cyan-400 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="selectedIndex === steps.length - 1"
          aria-label="Next pipeline stage"
          @click="selectNext"
        >
          Next
        </button>
      </div>
    </div>

    <p
      v-if="loopNote"
      class="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-500"
    >
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
      {{ loopNote }}
    </p>
  </div>
</template>
