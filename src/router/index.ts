import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import AdminOverview from '../views/AdminOverview.vue'
import Menu from '../views/Menu.vue'
import Registration from '../views/Registration.vue'
import Invitation from '../views/Invitation.vue'
import Login from '@/views/Login.vue'
import routes from '@/models/componentModels/Routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.LandingPage.Route,
      name: routes.LandingPage.Title,
      component: LandingPage
    },
    {
      path: routes.Login.Route,
      name: 'login',
      component: Login
    },
    {
      path: routes.Admin.Route,
      name: 'adminverview',
      component: AdminOverview
    },
    {
      path: routes.Menu.Route,
      name: 'menu',
      component: Menu
    },
    {
      path: routes.Invitation.Route,
      name: 'invitation',
      component: Invitation
    },
    {
      path: routes.Registration.Route,
      name: 'registration',
      component: Registration
    },
  ]
})

export default router
