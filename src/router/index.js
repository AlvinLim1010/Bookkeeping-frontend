import { createRouter, createWebHistory } from 'vue-router'
import Error404 from '../views/404.vue'

import Profile from '../views/Profile.vue'
import Overview from '../views/Overview.vue'
import Create from '../views/Create.vue'
import Table from '../views/Table.vue'
import Visualise from '../views/Visualise.vue'

import UserRegister from '../views/users/Register.vue'
import UserLogin from '../views/users/Login.vue'
import UserForgetPassword from '../views/users/ForgotPassword.vue'
import UserResetPassword from '../views/users/ResetPassword.vue'

const routes = [
  // User pages
  {path: '/user/register', component: UserRegister, meta: {title: 'User Register'}},
  {path: '/user/login', component: UserLogin, meta: {title: 'User Login'}},
  {path: '/user/forgetpassword', component: UserForgetPassword, meta: {title: 'User Forgot Password'}},
  {path: '/user/resetpassword', component: UserResetPassword, meta: {title: 'User Reset Password'}},

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
