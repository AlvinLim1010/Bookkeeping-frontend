import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import createStore from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import { setStateUser } from "./helper/commons";

loadFonts()

router.beforeEach((to, from, next) => {
  fetchUser()

  if (to.path === "/"){
    next('/overview')
  }

  if (to.meta.title) {
    document.title = `${ process.env.VUE_APP_TITLE } ${ to.meta.title }`
  } else {
    document.title = `${ process.env.VUE_APP_TITLE }`
  }
  next()
})

createApp(App)
  .use(router)
  .use(createStore)
  .use(vuetify)
  .mount('#app')


function fetchUser() {
  const localResult = JSON.parse(localStorage.getItem('user'))
  const expirationTime = 10 * 60 * 1000 // 10 min in milliseconds

  if (localResult){
    if ((new Date().getTime() - localResult.timestamp) >= expirationTime) {
      // Data has expired, remove it
      localStorage.removeItem('user');
      setStateUser(null)
    } else {
      // Extend the expiration time by another expirationTime
      const updatedTimestamp = new Date().getTime() + expirationTime;
      
      // Update the timestamp in local storage
      localStorage.setItem('user', JSON.stringify({
        timestamp: updatedTimestamp,
        value: localResult.value
      }));
      setStateUser(localResult.value)
    }
  }
}
