import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/form',
    },
    {
      path: '/form',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/pages/form/index.vue'),
        },
      ],
    },
  ],
})

export default router
