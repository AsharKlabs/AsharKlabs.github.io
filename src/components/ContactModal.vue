<script setup>
import { onMounted, onUnmounted, watch } from 'vue'

const open = defineModel({ type: Boolean, default: false })

const email = 'asharproject24@gmail.com'
const phoneDisplay = '+92 321 8964094'
const phoneHref = 'tel:+923218964094'

function close() {
  open.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape') close()
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <button
        type="button"
        class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        aria-label="Close contact dialog"
        @click="close"
      />

      <div
        class="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 p-6 panel-surface elevated-shadow sm:p-8"
      >
        <button
          type="button"
          class="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
          aria-label="Close"
          @click="close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <p class="text-sm font-semibold uppercase tracking-widest text-indigo-400">
          Get in touch
        </p>
        <h2 id="contact-modal-title" class="mt-2 text-2xl font-bold tracking-tight text-slate-50">
          Contact
        </h2>
        <p class="mt-2 text-sm text-slate-400">
          Reach out by email or phone — both links open on your device.
        </p>

        <div class="mt-8 flex flex-col gap-3">
          <a
            :href="`mailto:${email}`"
            class="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition-colors hover:border-indigo-500/50 hover:bg-indigo-500/5"
          >
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <span class="min-w-0 text-left">
              <span class="block text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Email
              </span>
              <span
                class="mt-0.5 block truncate text-sm font-medium text-slate-100 transition-colors group-hover:text-indigo-300"
              >
                {{ email }}
              </span>
            </span>
          </a>

          <a
            :href="phoneHref"
            class="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition-colors hover:border-cyan-500/50 hover:bg-cyan-500/5"
          >
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </span>
            <span class="min-w-0 text-left">
              <span class="block text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Phone
              </span>
              <span
                class="mt-0.5 block text-sm font-medium text-slate-100 transition-colors group-hover:text-cyan-300"
              >
                {{ phoneDisplay }}
              </span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>
