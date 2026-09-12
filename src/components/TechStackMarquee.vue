<script setup>
const tools = [
  { name: 'Laravel', slug: 'laravel' },
  { name: 'PHP', slug: 'php' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'NestJS', slug: 'nestjs' },
  { name: 'Python', slug: 'python' },
  { name: 'FastAPI', slug: 'fastapi' },
  { name: 'Vue.js', slug: 'vuedotjs' },
  { name: 'React', slug: 'react' },
  { name: 'Angular', slug: 'angular', color: 'DD0031' },
  { name: 'Ionic', slug: 'ionic' },
  { name: 'Capacitor', slug: 'capacitor' },
  { name: 'React Native', slug: 'react' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Kotlin', slug: 'kotlin' },
  {
    name: 'Java',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  },
  {
    name: 'AWS',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  },
  {
    name: 'Azure',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  },
  { name: 'Google Cloud', slug: 'googlecloud' },
  { name: 'Cloudflare', slug: 'cloudflare' },
  { name: 'Firebase', slug: 'firebase' },
  { name: 'MinIO', slug: 'minio' },
  { name: 'Nginx', slug: 'nginx' },
  { name: 'Ubuntu', slug: 'ubuntu' },
  { name: 'GitHub Actions', slug: 'githubactions' },
  { name: 'Redis', slug: 'redis' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'GraphQL', slug: 'graphql' },
  { name: 'Leaflet', slug: 'leaflet' },
]

function iconSrc(tool) {
  if (tool.src) return tool.src
  return tool.color
    ? `https://cdn.simpleicons.org/${tool.slug}/${tool.color}`
    : `https://cdn.simpleicons.org/${tool.slug}`
}

// Duplicate for a seamless infinite loop.
const track = [...tools, ...tools]
</script>

<template>
  <section id="stack" class="relative overflow-hidden py-16" aria-label="Tools and languages">
    <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent sm:w-28" />
    <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent sm:w-28" />

    <div class="tech-marquee group">
      <div class="tech-marquee-track" role="list">
        <div
          v-for="(tool, index) in track"
          :key="`${tool.name}-${index}`"
          role="listitem"
          class="flex shrink-0 items-center gap-3 px-5 sm:px-8"
        >
          <img
            :src="iconSrc(tool)"
            :alt="tool.name"
            width="28"
            height="28"
            loading="lazy"
            decoding="async"
            class="h-7 w-7 object-contain opacity-70 transition-opacity group-hover:opacity-90"
          />
          <span class="whitespace-nowrap text-sm font-medium tracking-wide text-slate-400">
            {{ tool.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
