<script setup>
import { ref, computed, useTemplateRef } from 'vue'
import { useDraggable, useIntervalFn, useNow } from '@vueuse/core'

const card = useTemplateRef('card')
const handle = useTemplateRef('handle')

const initialX = typeof window !== 'undefined' ? window.innerWidth - 336 : 800

const { style } = useDraggable(card, {
  initialValue: { x: Math.max(24, initialX), y: 8 },
  handle,
})

const now = useNow()
const time = computed(() =>
  now.value.toLocaleTimeString('en-US', { hour12: false }),
)

const latency = ref(18)
const throughput = ref(842)
const bars = ref(Array.from({ length: 16 }, () => 6 + Math.random() * 26))

useIntervalFn(() => {
  latency.value = 12 + Math.round(Math.random() * 14)
  throughput.value = 780 + Math.round(Math.random() * 140)
  bars.value = [...bars.value.slice(1), 6 + Math.random() * 26]
}, 1200)

const stats = computed(() => [
  { label: 'LATENCY', value: `${latency.value}ms`, accent: 'text-cyan-400' },
  { label: 'REQ/SEC', value: throughput.value, accent: 'text-emerald-400' },
  { label: 'UPTIME', value: '99.98%', accent: 'text-indigo-400' },
])
</script>

<template>
  <div
    ref="card"
    class="pointer-events-auto absolute z-40 w-64 select-none rounded-xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-black/40 backdrop-blur-md sm:w-72"
    :style="style"
  >
    <div
      ref="handle"
      class="flex cursor-grab items-center justify-between rounded-t-xl border-b border-slate-800 bg-slate-950/60 px-4 py-2.5 active:cursor-grabbing"
    >
      <span class="font-mono text-[11px] tracking-wide text-slate-500">telemetry</span>
      <span class="flex items-center gap-1.5 text-[10px] text-emerald-400">
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        {{ time }}
      </span>
    </div>

    <div class="space-y-3 px-4 py-3.5">
      <div class="flex items-end gap-0.5 h-10">
        <span
          v-for="(h, idx) in bars"
          :key="idx"
          class="flex-1 rounded-t bg-gradient-to-t from-cyan-500/40 to-emerald-400/70 transition-all duration-300"
          :style="{ height: `${h}px` }"
        />
      </div>

      <dl class="grid grid-cols-3 gap-2">
        <div v-for="stat in stats" :key="stat.label">
          <dt class="font-mono text-[10px] tracking-wide text-slate-500">
            {{ stat.label }}
          </dt>
          <dd class="font-mono text-sm font-semibold" :class="stat.accent">
            {{ stat.value }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
