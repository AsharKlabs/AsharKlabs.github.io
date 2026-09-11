<script setup>
defineProps({
  steps: { type: Array, required: true },
  loopNote: { type: String, default: '' },
})
</script>

<template>
  <div>
    <div class="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-2">
      <template v-for="(step, i) in steps" :key="step.label">
        <div class="flex flex-1 flex-col items-center gap-3 text-center">
          <div
            class="relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-950/80 ring-1"
            :class="step.ring"
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
          <span class="text-sm font-medium text-slate-300">{{ step.label }}</span>
          <p class="max-w-[9.5rem] text-xs leading-snug text-slate-500">
            {{ step.description }}
          </p>
        </div>

        <div
          v-if="i < steps.length - 1"
          class="hidden h-px flex-1 bg-slate-700 sm:mt-7 sm:block"
        />
        <div v-if="i < steps.length - 1" class="h-6 w-px bg-slate-800 sm:hidden" />
      </template>
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
