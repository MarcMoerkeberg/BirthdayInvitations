import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import AdminOverview from '../views/AdminOverview.vue'
import Menu from '../views/Menu.vue'
import Registration from '../views/Registration.vue'
import Invitation from '../views/Invitation.vue'
import Login from '@/views/Login.vue'
import routes from '@/models/componentModels/Routes'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.LandingPage.Route + ':guestId?',
      name: routes.LandingPage.Title,
      component: LandingPage
    },
    {
      path: routes.Login.Route,
      name: routes.Login.Title,
      component: Login
    },
    {
      path: routes.Admin.Route,
      name: routes.Admin.Title,
      component: AdminOverview,
      beforeEnter: async () => {
        const isAdminUser: boolean = !!await getCurrentUser()
        return isAdminUser
      }
    },
    {
      path: routes.Menu.Route + ':guestId?',
      name: routes.Menu.Title,
      component: Menu
    },
    {
      path: routes.Invitation.Route + ':guestId?',
      name: routes.Invitation.Title,
      component: Invitation
    },
    {
      path: routes.Registration.Route + ':guestId?',
      name: routes.Registration.Title,
      component: Registration
    },
  ]
})

export default router
