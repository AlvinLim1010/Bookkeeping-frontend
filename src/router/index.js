import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Records from '../views/Records.vue'
import Register from '../views/Register.vue'
import Update from '../views/Update.vue'
import Delete from '../views/Delete.vue'
import Error404 from '../views/404.vue'

const routes = [
  {path: '/', name: 'home', component: Home, meta: {title: 'Home'}},
  {path: '/records', name: 'records', component: Records, meta: {title: 'Records'}},
  {path: '/register', name: 'register', component: Register, meta: {title: 'Register'}},
  {path: '/update', name: 'update', component: Update, meta: {title: 'Update'}},
  {path: '/delete', name: 'delete', component: Delete, meta: {title: 'Delete'}},

  // 404 page
  {path: '/:catchAll(.*)', name: 'Error404', component: Error404, meta: {title: 'Error'}}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
