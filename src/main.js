import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${process.env.DOC_TITLE} ${to.meta.title}`
  } else {
    document.title = process.env.DOC_TITLE
  }
  next()
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
