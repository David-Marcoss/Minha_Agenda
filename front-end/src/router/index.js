import { createRouter, createWebHashHistory } from 'vue-router'
import  {logout, isNotAuthenticated, isAuthenticated}  from './guards.js'


const routes = [
  {
    path: '/',
    name: 'dashboard',
    beforeEnter: isAuthenticated,
    component: () => import( '../views/DashboardView.vue')
  },

  {
    path: '/user',
    name: 'user',
    beforeEnter: isAuthenticated,
    component: () => import( '../views/User/UserView.vue'),
    children: [
      {
        path: 'edit',
        name: 'edit',
        component: () => import( '../components/User/UserEdit.vue'),
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: () => import( '../components/User/UserChangePassword.vue'),
      },
      {
        path: 'delete',
        name: 'delete',
        component: () => import( '../components/User/UserDelete.vue'),
      }
    ]
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: logout
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: isNotAuthenticated,
    component: () => import( '../views/User/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    beforeEnter: isNotAuthenticated,
    component: () => import( '../views/User/RegisterView.vue')
  },
  {
    path: '/request-reset-password',
    name: 'request-reset-password',
    beforeEnter: isNotAuthenticated,
    component: () => import('../views/User/RequestResetPassword.vue')
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    beforeEnter: isNotAuthenticated,
    component: () => import('../views/User/ResetPassword.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
