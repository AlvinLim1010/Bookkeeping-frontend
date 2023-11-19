<template>
  <v-app>
    <v-main>   
      <router-view />
      <NavBar />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./views/shared/NavBar.vue"

export default {
  name: "App",

  components: {
    NavBar
  }
}
  
</script>
