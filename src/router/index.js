import { createRouter, createWebHistory } from 'vue-router'
import EuropeView from '@/views/EuropeView.vue'
import AsiaView from '@/views/AsiaView.vue'
import AfricaView from '@/views/AfricaView.vue'
import NorthAmView from '@/views/NorthAmView.vue'
import SouthAmView from '@/views/SouthAmView.vue'
import WorldView from '@/views/WorldView.vue'
import OceaniaView from '@/views/OceaniaView.vue'
import NotFound from '@/views/NotFound.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/europe',
      name: 'europe',
      component: EuropeView
  },
  {
      path: '/asia',
      name: 'asia',
      component: AsiaView
  },
  {
      path: '/africa',
      name: 'africa',
      component: AfricaView
  },
  {
      path: '/north-america',
      name: 'north america',
      component: NorthAmView
  },
  {
      path: '/south-america',
      name: 'south america',
      component: SouthAmView
  },
  {
      path: '/oceania',
      name: 'oceania',
      component: OceaniaView
  },
  {
      path: '/world',
      name: 'world',
      component: WorldView
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
  ],
})

export default router
