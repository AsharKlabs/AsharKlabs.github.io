import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import { getPost } from '../data/writing'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/writing',
    name: 'writing',
    component: () => import('../pages/WritingIndex.vue'),
    meta: { title: 'Writing — Ashar Ayub' },
  },
  {
    path: '/writing/:slug',
    name: 'writing-post',
    component: () => import('../pages/WritingPost.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.name === 'writing-post') {
    const post = getPost(to.params.slug)
    document.title = post
      ? `${post.title} — Ashar Ayub`
      : 'Writing — Ashar Ayub'
    return
  }
  document.title =
    to.meta.title ||
    'Ashar Ayub — Backend & Infrastructure Engineer | Laravel, AWS, Real-Time Systems, LLM Integration'
})

export default router
