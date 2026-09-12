<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  prefix: { type: String, default: 'Lead Software Engineer' },
  variants: {
    type: Array,
    default: () => [
      'AI-Augmented Architect',
      'Backend Systems Builder',
      'Real-Time Systems Engineer',
      'Cloud Infrastructure Lead',
      'MCP Workflow Architect',
    ],
  },
  typeMs: { type: Number, default: 55 },
  deleteMs: { type: Number, default: 32 },
  holdMs: { type: Number, default: 1800 },
  gapMs: { type: Number, default: 320 },
})

const displayed = ref('')
const variantIndex = ref(0)
const reduceMotion = ref(false)

let timer = 0

const currentVariant = computed(
  () => props.variants[variantIndex.value % props.variants.length] || '',
)

const longestVariant = computed(() =>
  props.variants.reduce((longest, next) => (next.length > longest.length ? next : longest), ''),
)

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = 0
  }
}

function schedule(fn, ms) {
  clearTimer()
  timer = window.setTimeout(fn, ms)
}

function typeForward(i = 0) {
  const full = currentVariant.value
  if (i <= full.length) {
    displayed.value = full.slice(0, i)
    schedule(() => typeForward(i + 1), props.typeMs)
    return
  }
  schedule(typeBackward, props.holdMs)
}

function typeBackward() {
  if (displayed.value.length > 0) {
    displayed.value = displayed.value.slice(0, -1)
    schedule(typeBackward, props.deleteMs)
    return
  }
  variantIndex.value = (variantIndex.value + 1) % props.variants.length
  schedule(() => typeForward(0), props.gapMs)
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion.value || !props.variants.length) {
    displayed.value = props.variants[0] || ''
    return
  }
  typeForward(0)
})

onUnmounted(() => clearTimer())
</script>

<template>
  <h2
    class="relative z-10 mt-4 text-xl font-medium sm:text-2xl"
    :aria-label="`${prefix} | ${currentVariant}`"
  >
    <span class="relative inline-grid max-w-full justify-items-center text-center">
      <span
        class="invisible col-start-1 row-start-1 px-1"
        aria-hidden="true"
      >
        {{ prefix }} | {{ longestVariant }}
      </span>
      <span
        class="col-start-1 row-start-1 justify-self-center px-1 whitespace-pre"
      >
        <span
          class="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
        >{{ prefix }} | {{ displayed }}</span><span
          v-if="!reduceMotion"
          class="typewriter-caret ml-0.5 inline-block align-[-0.12em]"
          aria-hidden="true"
        />
      </span>
    </span>
  </h2>
</template>
