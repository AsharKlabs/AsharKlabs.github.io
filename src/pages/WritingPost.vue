<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getPost, relatedPosts } from '../data/writing'
import CodotMigrationArticle from './articles/CodotMigrationArticle.vue'
import MinioOmanArticle from './articles/MinioOmanArticle.vue'
import KotlinPlayerArticle from './articles/KotlinPlayerArticle.vue'

const route = useRoute()
const post = computed(() => getPost(route.params.slug))
const related = computed(() => relatedPosts(route.params.slug))

const articleMap = {
  'codot-bahrain-mumbai-migration': CodotMigrationArticle,
  'codot-minio-oman': MinioOmanArticle,
  'codot-kotlin-player-rewrite': KotlinPlayerArticle,
}

const Article = computed(() => articleMap[route.params.slug] ?? null)
</script>

<template>
  <main class="relative z-10 px-6 pb-24 pt-32">
    <div v-if="post && Article" class="mx-auto max-w-2xl">
      <RouterLink
        to="/writing"
        class="text-sm font-medium text-slate-500 transition-colors hover:text-cyan-400"
      >
        ← Writing
      </RouterLink>

      <header class="mt-8">
        <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>{{ post.date }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ post.readingMinutes }} min read</span>
        </div>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
          {{ post.title }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-slate-400">
          {{ post.description }}
        </p>
        <div class="mt-5 flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-400"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <div class="mt-12 border-t border-slate-800 pt-10">
        <component :is="Article" />
      </div>

      <aside v-if="related.length" class="mt-16 border-t border-slate-800 pt-8">
        <p class="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Related
        </p>
        <ul class="mt-4 space-y-3">
          <li v-for="item in related" :key="item.slug">
            <RouterLink
              :to="{ name: 'writing-post', params: { slug: item.slug } }"
              class="text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
            >
              {{ item.title }} →
            </RouterLink>
          </li>
        </ul>
      </aside>

      <footer class="mt-12 border-t border-slate-800 pt-8">
        <RouterLink
          to="/#work"
          class="text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
        >
          ← Back to selected work
        </RouterLink>
      </footer>
    </div>

    <div v-else class="mx-auto max-w-2xl py-20 text-center">
      <h1 class="text-2xl font-bold text-slate-50">Post not found</h1>
      <RouterLink to="/writing" class="mt-4 inline-block text-cyan-400 hover:text-cyan-300">
        Browse writing
      </RouterLink>
    </div>
  </main>
</template>
