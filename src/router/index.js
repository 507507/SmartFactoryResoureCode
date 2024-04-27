import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/home/index',
          name: 'index',
          meta: { title: '首页' },
          component: () => import('../views/home/index.vue')
        },
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
          meta: { title: '员工同事' },
          children: [
            {
              path: '/user/index',
              name: 'index',
              meta: { title: '员工管理' },
              component: () => import('../views/user/index.vue')
            }
          ]
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
