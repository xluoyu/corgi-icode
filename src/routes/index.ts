import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/form',
      component: () => import('@/pages/form/index.vue'),
    },
  ],
})

export default router
