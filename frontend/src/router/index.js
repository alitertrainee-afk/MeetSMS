import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Main/Layout.vue'
import AuthLayout from '@/layout/Auth/AuthLayout.vue'
import LoginView from '@/pages/LoginView.vue'
import RegisterView from '@/pages/RegisterView.vue'
import { getLocalStorage } from '@/service/localStorageService'
import { useAuthStore } from '@/stores/modules/authStore'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../pages/HomeView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: LoginView,
        },
        {
          path: 'register',
          name: 'Register',
          component: RegisterView,
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const authStore = getLocalStorage('auth')

  const isAuthenticated = !!authStore?.accessToken

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'Login' }
  }

  if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    return { name: 'Home' }
  }

  return true
})

export default router
