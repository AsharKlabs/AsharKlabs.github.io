export const posts = [
  {
    slug: 'codot-bahrain-mumbai-migration',
    title: 'Rebuilding CODOT after the Bahrain data centres were destroyed',
    description:
      'An emergency AWS migration from Bahrain to Mumbai with no recoverable backups, and what it taught me about treating backup as a design requirement.',
    date: '2024',
    readingMinutes: 6,
    tags: ['CODOT', 'AWS', 'Incident Response', 'Migration'],
  },
  {
    slug: 'codot-minio-oman',
    title: 'Why MinIO in Oman',
    description:
      'AWS had no native bucket support where the screens lived — so we weighed remote S3, CDN, and an S3-compatible store we operated ourselves.',
    date: '2024',
    readingMinutes: 4,
    tags: ['CODOT', 'MinIO', 'Object Storage', 'Oman'],
  },
  {
    slug: 'codot-kotlin-player-rewrite',
    title: 'Why we rewrote the CODOT player in Kotlin',
    description:
      'The hybrid player worked for shipping. Unattended signage forced a native rewrite — and a clear bar for knowing it was worth it.',
    date: '2024',
    readingMinutes: 4,
    tags: ['CODOT', 'Kotlin', 'Android', 'Media Playback'],
  },
]

export function getPost(slug) {
  return posts.find((post) => post.slug === slug) ?? null
}

export function relatedPosts(slug, limit = 2) {
  const current = getPost(slug)
  if (!current) return []
  return posts
    .filter((post) => post.slug !== slug)
    .filter((post) => post.tags.some((tag) => current.tags.includes(tag)))
    .slice(0, limit)
}
