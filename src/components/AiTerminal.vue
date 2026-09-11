<script setup>
import { ref, useTemplateRef } from 'vue'
import { useDraggable, useIntervalFn } from '@vueuse/core'

const card = useTemplateRef('card')
const handle = useTemplateRef('handle')
const { style } = useDraggable(card, {
  initialValue: { x: 24, y: 8 },
  handle,
})

const script = [
  { prompt: '$', text: 'listening for client meeting…' },
  { prompt: '›', text: 'transcribing requirements + constraints' },
  { prompt: '›', text: 'generating structured context.md' },
  { prompt: '$', text: 'mcp connect --server architecture' },
  { prompt: '›', text: 'agent loop: generate → review → refine' },
  { prompt: '✓', text: 'tests passing · types clean', ok: true },
  { prompt: '✓', text: 'deploy: production ✓', ok: true },
]

const lines = ref([])
let i = 0

useIntervalFn(() => {
  lines.value.push(script[i % script.length])
  if (lines.value.length > 6) lines.value.shift()
  i++
}, 1400)
</script>

<template>
  <div
    ref="card"
    class="pointer-events-auto absolute z-40 w-72 select-none rounded-xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-black/40 backdrop-blur-md sm:w-80"
    :style="style"
  >
    <div
      ref="handle"
      class="flex cursor-grab items-center gap-2 rounded-t-xl border-b border-slate-800 bg-slate-950/60 px-4 py-2.5 active:cursor-grabbing"
    >
      <span class="h-2.5 w-2.5 rounded-full bg-red-500/70" />
      <span class="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
      <span class="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
      <span class="ml-2 font-mono text-[11px] tracking-wide text-slate-500">
        ai-agent.log
      </span>
      <span class="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400">
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        LIVE
      </span>
    </div>

    <div class="h-40 space-y-1.5 overflow-hidden px-4 py-3 font-mono text-xs">
      <p
        v-for="(line, idx) in lines"
        :key="idx"
        class="flex gap-2 leading-relaxed"
        :class="line.ok ? 'text-emerald-400' : 'text-slate-400'"
      >
        <span class="text-cyan-500">{{ line.prompt }}</span>
        <span class="truncate">{{ line.text }}</span>
      </p>
      <span class="inline-block h-3 w-1.5 animate-pulse bg-cyan-400/70 align-middle" />
    </div>
  </div>
</template>
