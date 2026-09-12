<script setup>
const path = defineModel({ type: String, default: 'vertical' })
</script>

<template>
  <div class="relative mt-8">
    <div class="flex flex-col items-center">
      <div
        class="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-950 ring-1 transition-colors duration-500"
        :class="path === 'vertical' ? 'ring-indigo-500/40' : 'ring-cyan-500/40'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-slate-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.75"
            d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.787 3.45c.54.668.9 1.52.9 2.7"
          />
        </svg>
      </div>
      <Transition name="scale-copy" mode="out-in">
        <p
          :key="path"
          class="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500"
        >
          {{ path === 'vertical' ? 'Vertical' : 'Horizontal' }}
        </p>
      </Transition>
    </div>

    <div
      class="mx-auto mt-1 h-6 w-px transition-colors duration-500"
      :class="path === 'vertical' ? 'bg-indigo-500/50' : 'bg-cyan-500/50'"
    />

    <div class="scale-panel-stage relative h-[26rem] sm:h-[28rem]">
      <Transition name="scale-panel" mode="out-in">
        <div
          v-if="path === 'vertical'"
          key="vertical"
          class="absolute inset-0 overflow-y-auto rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.03] p-5 sm:p-8"
        >
        <p class="mb-5 text-center text-[10px] font-semibold uppercase tracking-widest text-indigo-400/70">
          Increase resources
        </p>

        <div class="grid grid-cols-3 gap-3 sm:gap-5">
          <div
            v-for="item in [
              {
                label: 'RAM',
                icon: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12',
              },
              {
                label: 'CPU',
                icon: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z',
              },
              {
                label: 'Storage',
                icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375',
                fork: true,
              },
            ]"
            :key="item.label"
            class="relative flex flex-col items-center rounded-xl border px-2 py-5 text-center sm:px-4"
            :class="
              item.fork
                ? 'border-indigo-500/40 bg-indigo-500/10'
                : 'border-slate-800 bg-slate-950/60'
            "
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full ring-1"
              :class="
                item.fork
                  ? 'bg-indigo-500/20 ring-indigo-400/50'
                  : 'bg-indigo-500/10 ring-indigo-500/40'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.75"
                  :d="item.icon"
                />
              </svg>
            </div>
            <p class="mt-2 text-sm font-semibold text-slate-100">{{ item.label }}</p>
            <p v-if="!item.fork" class="mt-1 text-xs text-indigo-300/80">↑ scale up</p>
            <p v-else class="mt-1 text-xs text-indigo-300/80">2 options ↓</p>
          </div>
        </div>

        <div class="mx-auto mt-0 flex max-w-xs flex-col items-center sm:ml-auto sm:mr-[calc(16.666%-0.5rem)] sm:max-w-[11rem]">
          <div class="h-6 w-px bg-indigo-500/60" />
          <div class="h-px w-full bg-indigo-500/60" />
          <div class="flex w-full justify-between">
            <div class="h-6 w-px bg-indigo-500/60" />
            <div class="h-6 w-px bg-indigo-500/60" />
          </div>
        </div>

        <div
          class="mx-auto grid max-w-xs grid-cols-2 gap-3 sm:ml-auto sm:mr-[calc(16.666%-0.5rem)] sm:max-w-[14rem]"
        >
          <div
            class="flex flex-col items-center rounded-xl border border-indigo-500/35 bg-slate-950/80 px-2 py-4 text-center"
          >
            <div
              class="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/15 ring-1 ring-indigo-500/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <p class="mt-2 text-[11px] font-semibold text-indigo-100">Grow volume</p>
          </div>
          <div
            class="flex flex-col items-center rounded-xl border border-indigo-500/35 bg-slate-950/80 px-2 py-4 text-center"
          >
            <div
              class="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/15 ring-1 ring-indigo-500/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.75"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </div>
            <p class="mt-2 text-[11px] font-semibold text-indigo-100">Attach volumes</p>
          </div>
        </div>
      </div>

      <div
        v-else
        key="horizontal"
        class="absolute inset-0 overflow-y-auto rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-5 sm:p-8"
      >
        <p class="mb-5 text-center text-[10px] font-semibold uppercase tracking-widest text-cyan-400/70">
          Spread the load
        </p>

        <div class="flex flex-col items-center sm:flex-row sm:justify-center">
          <template
            v-for="(step, i) in [
              {
                label: '+ VPS',
                hint: 'Allocate',
                icon: 'M12 4.5v15m7.5-7.5h-15',
              },
              {
                label: 'Load balancer',
                hint: 'Configure',
                icon: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5',
              },
              {
                label: 'Route traffic',
                hint: 'Distribute',
                icon: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5',
              },
            ]"
            :key="step.label"
          >
            <div
              class="flex w-full max-w-[11rem] flex-col items-center rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-5 text-center"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 ring-1 ring-cyan-500/40"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-cyan-300"
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
              <p class="mt-2 text-sm font-semibold text-slate-100">{{ step.label }}</p>
              <p class="mt-0.5 text-[10px] text-slate-500">{{ step.hint }}</p>
            </div>
            <div
              v-if="i < 2"
              class="flex h-8 w-px flex-col items-center justify-center text-cyan-500/70 sm:h-auto sm:w-10 sm:flex-row"
              aria-hidden="true"
            >
              <span class="sm:hidden">↓</span>
              <span class="hidden sm:inline">→</span>
            </div>
          </template>
        </div>

        <div class="mx-auto mt-1 max-w-lg">
          <div class="flex justify-center">
            <div class="h-7 w-px bg-cyan-500/50" />
          </div>
          <div class="mx-auto h-px w-[78%] bg-cyan-500/50" />
          <div class="mx-auto flex w-[78%] justify-between">
            <div class="h-7 w-px bg-cyan-500/50" />
            <div class="h-7 w-px bg-cyan-500/50" />
            <div class="h-7 w-px bg-cyan-500/50" />
          </div>
          <div class="mx-auto grid w-[90%] grid-cols-3 gap-3">
            <div
              v-for="n in 3"
              :key="n"
              class="flex flex-col items-center rounded-xl border border-cyan-500/30 bg-slate-950/70 py-5"
            >
              <span
                class="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15 font-mono text-xs font-semibold text-cyan-200 ring-1 ring-cyan-500/40"
              >
                {{ String(n).padStart(2, '0') }}
              </span>
              <p class="mt-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                VPS
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    </div>
  </div>
</template>
