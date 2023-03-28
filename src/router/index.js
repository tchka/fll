import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PartnersView from '../views/PartnersView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import PublishedOrdersView from '../views/PublishedOrdersView.vue'
import UserOrdersView from '../views/UserOrdersView.vue'
import CustomerOrdersAllView from '../views/CustomerOrdersAllView.vue'
import UserViewLayout from '../views/UserViewLayout.vue'
import LoginView from '../views/LoginView.vue'
import Login from '@/components/Login'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/partner',
    name: 'PartnersView',
    component: PartnersView
  },
  {
    path: '/user/:id',
    name: 'UserViewLayout',
    component: UserViewLayout,
    children: [
      {
        path: 'profile',
        name: 'UserProfileView',
        component: UserProfileView,
      },
      {
        path: 'published_orders',
        name: 'PublishedOrdersView',
        component: PublishedOrdersView,
      },
      {
        path: 'orders',
        name: 'UserOrdersView',
        component: UserOrdersView,
        children: [
        {
          path: 'not-published',
          name: 'CustomerOrdersNotPublishedView',
          component: UserOrdersView,
        },
        {
          path: 'all',
          name: 'CustomerOrdersAllView',
          component: CustomerOrdersAllView,
        },
      ],
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
