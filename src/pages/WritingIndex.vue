<script setup>
import { RouterLink } from 'vue-router'
import { posts } from '../data/writing'
import { vReveal } from '../composables/useScrollReveal'
</script>

<template>
  <main class="relative z-10 px-6 pb-24 pt-32">
    <div class="mx-auto max-w-3xl">
      <div v-reveal>
        <p class="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Writing
        </p>
        <h1 class="mt-3 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
          Case studies
        </h1>
        <p class="mt-4 text-base leading-relaxed text-slate-400">
          Longer notes on decisions, incidents, and trade-offs — the parts that don’t fit
          on a card.
        </p>
      </div>

      <ul class="mt-12 space-y-6">
        <li v-for="(post, i) in posts" :key="post.slug" v-reveal="{ delay: i * 80 }">
          <RouterLink
            :to="{ name: 'writing-post', params: { slug: post.slug } }"
            class="group block rounded-2xl border border-slate-800 bg-slate-900/80 p-6 panel-surface transition-colors hover:border-cyan-500/40 sm:p-8"
          >
            <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span>{{ post.date }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ post.readingMinutes }} min read</span>
            </div>
            <h2
              class="mt-3 text-xl font-bold text-slate-50 transition-colors group-hover:text-cyan-300"
            >
              {{ post.title }}
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-400">
              {{ post.description }}
            </p>
            <p
              class="mt-5 text-sm font-medium text-cyan-400 transition-colors group-hover:text-cyan-300"
            >
              Read the write-up →
            </p>
          </RouterLink>
        </li>
      </ul>
    </div>
  </main>
</template>
