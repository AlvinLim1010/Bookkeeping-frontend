import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Records from '../views/Records.vue'
import Register from '../views/Register.vue'
import Update from '../views/Update.vue'
import Delete from '../views/Delete.vue'
import Error404 from '../views/404.vue'

import UserRegister from '../views/users/Register.vue'
import UserLogin from '../views/users/Login.vue'
import UserForgetPassword from '../views/users/ForgotPassword.vue'
import UserResetPassword from '../views/users/ResetPassword.vue'
import UserInfo from '../views/users/Info.vue'

const routes = [
  {path: '/', component: Home, meta: {title: 'Home'}},
  {path: '/records', component: Records, meta: {title: 'Records'}},
  {path: '/register', component: Register, meta: {title: 'Register'}},
  {path: '/update', component: Update, meta: {title: 'Update'}},
  {path: '/delete', component: Delete, meta: {title: 'Delete'}},

  // User pages
  {path: '/user/register', component: UserRegister, meta: {title: 'User Register'}},
  {path: '/user/login', component: UserLogin, meta: {title: 'User Login'}},
  {path: '/user/forgetpassword', component: UserForgetPassword, meta: {title: 'User Forgot Password'}},
  {path: '/user/resetpassword', component: UserResetPassword, meta: {title: 'User Reset Password'}},
  {path: '/user/info', component: UserInfo, meta: {title: 'User Info'}},

  // 404 page
  {path: '/:catchAll(.*)', component: Error404, meta: {title: 'Error'}}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
