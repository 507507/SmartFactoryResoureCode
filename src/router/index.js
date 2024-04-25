import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/system',
          name: 'system',
          meta: { title: '系统管理' },
          children: [
            {
              path: '/system/log',
              name: 'log',
              meta: { title: '系统日志' },
              component: () => import('../views/system/log.vue')
            }
          ]
        },
        {
          path: '/user',
          name: 'user',
          meta: { title: '用户管理' },
          component: () => import('../views/users/index.vue')
        },
        {
          path: '/about',
          name: 'about',
          meta: { title: 'about页面' },
          component: () => import('../views/AboutView.vue')
        }
      ]
    }
  ]
})

export default router
