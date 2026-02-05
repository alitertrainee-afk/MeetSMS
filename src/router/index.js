import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: HomeView,
        },
      ],
    },
  ],
})

export default router
