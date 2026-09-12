<script setup>
import { useTemplateRef } from 'vue'
import { useDraggable } from '@vueuse/core'

const props = defineProps({
  initialX: { type: Number, default: 24 },
  initialY: { type: Number, default: 24 },
  dot: { type: String, default: 'bg-emerald-400' },
  eyebrow: { type: String, required: true },
  value: { type: String, required: true },
  valueClass: { type: String, default: 'text-slate-50' },
  valueSize: { type: String, default: 'text-2xl' },
  label: { type: String, required: true },
  trend: { type: String, default: '' },
  trendClass: { type: String, default: 'text-emerald-400' },
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
    class="pointer-events-auto absolute z-40 w-48 cursor-grab select-none rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 elevated-shadow panel-surface backdrop-blur-md transition-colors hover:border-slate-700 active:cursor-grabbing"
    :style="style"
  >
    <p class="flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-slate-500">
      <span class="h-1.5 w-1.5 shrink-0 rounded-full" :class="dot" />
      {{ eyebrow }}
    </p>
    <p class="mt-1.5 font-bold leading-tight whitespace-nowrap" :class="[valueSize, valueClass]">
      {{ value }}
    </p>
    <p class="mt-0.5 text-[11px] leading-snug text-slate-400">{{ label }}</p>
    <p v-if="trend" class="mt-1 text-[10px] font-medium" :class="trendClass">
      {{ trend }}
    </p>
  </div>
</template>
