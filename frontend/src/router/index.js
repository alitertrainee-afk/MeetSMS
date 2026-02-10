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
      name: 'Layout',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('../pages/HomeView.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'AuthLayout',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: LoginView,
        },
        {
          path: '/register',
          name: 'Register',
          component: RegisterView,
        },
      ],
    },
  ],
})  

router.beforeEach((to, from, next) => {
  const token = getLocalStorage('accessToken')
  console.log('🚀 ~ token:', token)

  if (token && (to.name === 'Login' || to.name === 'Register')) {
    return next('/')
  }

  if (to.meta.requiresAuth) {
    if (token) {
      return next()
    } else {
      return next({ name: 'Login' })
    }
  }

  next()
})

export default router
