import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import AdminOverview from '../views/AdminOverview.vue'
import Menu from '../views/Menu.vue'
import Registration from '../views/Registration.vue'
import Details from '../views/Details.vue'
import Login from '@/views/Login.vue'
import Routes from '@/models/componentModels/Routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: Routes.LandingPage.Route,
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: Routes.Login.Route,
      name: 'login',
      component: Login
    },
    {
      path: Routes.Admin.Route,
      name: 'adminverview',
      component: AdminOverview
    },
    {
      path: Routes.Menu.Route,
      name: 'menu',
      component: Menu
    },
    {
      path: Routes.Details.Route,
      name: 'details',
      component: Details
    },
    {
      path: Routes.Registration.Route,
      name: 'registration',
      component: Registration
    },
  ]
})

export default router
