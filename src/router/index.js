import { createRouter, createWebHistory } from 'vue-router'
import WelcomeScreen from '../views/WelcomeScreen.vue'
import PhotoDetail from '../views/PhotoDetail.vue'
import Favorites from '../views/Favorites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeScreen
    },
    {
      path: '/photos/:id',
      name: 'photo-detail',
      component: PhotoDetail
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    }
  ]
})

export default router
