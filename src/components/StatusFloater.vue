<script setup>
import { useTemplateRef } from 'vue'
import { useDraggable } from '@vueuse/core'

const props = defineProps({
  initialX: { type: Number, default: 24 },
  initialY: { type: Number, default: 24 },
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  icon: { type: String, required: true },
})

const card = useTemplateRef('card')
const { style } = useDraggable(card, {
  initialValue: { x: props.initialX, y: props.initialY },
  containerElement: () => card.value?.parentElement?.parentElement,
})
</script>

<template>
  <div
    ref="card"
    class="pointer-events-auto absolute z-40 w-60 cursor-grab select-none rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-md transition-colors hover:border-slate-700 active:cursor-grabbing"
    :style="style"
  >
    <p class="flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-slate-500">
      <span class="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-cyan-400" />
      {{ eyebrow }}
    </p>

    <div class="mt-2 flex items-center gap-2.5">
      <div
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950/80 ring-1 ring-cyan-500/40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-cyan-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="icon" />
        </svg>
      </div>
      <div class="min-w-0">
        <p class="truncate text-xs font-semibold text-slate-100">{{ title }}</p>
        <p class="truncate text-[11px] text-slate-500">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>
