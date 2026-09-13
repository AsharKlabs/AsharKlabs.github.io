<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)
const showKey = ref(0)
const paused = ref(false)

const INITIAL_DELAY_MS = 2000
const VISIBLE_MS = 5500
const HIDDEN_MS = 4000

let timer
let remainingMs = VISIBLE_MS
let visibleStartedAt = 0

function later(fn, ms) {
  window.clearTimeout(timer)
  timer = window.setTimeout(fn, ms)
}

function show() {
  showKey.value += 1
  visible.value = true
  paused.value = false
  remainingMs = VISIBLE_MS
  visibleStartedAt = performance.now()
  later(hide, VISIBLE_MS)
}

function hide() {
  visible.value = false
  paused.value = false
  later(show, HIDDEN_MS)
}

function onEnter() {
  if (!visible.value || paused.value) return
  paused.value = true
  remainingMs = Math.max(0, remainingMs - (performance.now() - visibleStartedAt))
  window.clearTimeout(timer)
}

function onLeave() {
  if (!visible.value || !paused.value) return
  paused.value = false
  visibleStartedAt = performance.now()
  later(hide, remainingMs)
}

onMounted(() => {
  later(show, INITIAL_DELAY_MS)
})

onUnmounted(() => {
  window.clearTimeout(timer)
})
</script>

<template>
  <div
    class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2"
    aria-live="polite"
  >
    <Transition name="waka-toast">
      <div
        v-if="visible"
        :key="showKey"
        class="pointer-events-auto overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 shadow-lg shadow-black/20 panel-surface"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
        @focusin="onEnter"
        @focusout="onLeave"
      >
        <a
          href="https://wakatime.com/@27dd049c-f744-4622-9431-a2d4f4da96e1"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-2 py-1.5 transition-opacity hover:opacity-90"
        >
          <img
            src="https://wakatime.com/badge/user/27dd049c-f744-4622-9431-a2d4f4da96e1.svg"
            alt="Total time coded since Aug 25 2025"
            class="h-5 w-auto"
            loading="lazy"
          />
        </a>
        <div class="h-0.5 w-full bg-slate-800/80" aria-hidden="true">
          <div
            class="waka-progress h-full origin-left bg-cyan-400"
            :class="{ 'is-paused': paused }"
            :style="{ animationDuration: `${VISIBLE_MS}ms` }"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.waka-toast-enter-active,
.waka-toast-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.waka-toast-enter-from,
.waka-toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.waka-progress {
  animation-name: waka-progress-drain;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.waka-progress.is-paused {
  animation-play-state: paused;
}

@keyframes waka-progress-drain {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}
</style>
