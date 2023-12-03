import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import createStore from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

router.beforeEach((to, from, next) => {
  if (to.path === "/"){
    next('/overview')
  }

  if (to.meta.title) {
    document.title = `Bookkeeping ${to.meta.title}`
  } else {
    document.title = "Bookkeeping"
  }
  next()
})

createApp(App)
  .use(router)
  .use(createStore)
  .use(vuetify)
  .mount('#app')
