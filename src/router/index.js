import { createRouter, createWebHistory } from 'vue-router'
import Error404 from '../views/404.vue'

import Profile from '../views/Profile.vue'
import Overview from '../views/Overview.vue'
import Create from '../views/Create.vue'
import Table from '../views/Table.vue'
import Visualise from '../views/Visualise'

const routes = [
  // NavBar
  {path: '/overview', component: Overview, meta: {title: 'Overview'}},
  {path: '/table', component: Table, meta: {title: 'Table'}},
  {path: '/create', component: Create, meta: {title: 'Create'}},
  {path: '/visualise', component: Visualise, meta: {title: 'Visualise'}},
  {path: '/profile', component: Profile, meta: {title: 'Profile'}},

  // 404 page
  {path: '/:catchAll(.*)', component: Error404, meta: {title: 'Error'}}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
