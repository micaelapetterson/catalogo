import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import Pizza from '../views/PizzaView.vue'
import List from '../views/List.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: 'pizza',
          name: 'Pizza',
          component: Pizza
        },
        {
          path: 'list',
          name: 'List',
          component: List
        }            
      ]
    },
  ]
})

export default router
