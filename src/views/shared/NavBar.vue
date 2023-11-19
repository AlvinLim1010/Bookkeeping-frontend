<template>
  <v-bottom-navigation mode="shift">
    <router-link v-for="link in items" :key="link.path" :to="link.path">
      <v-btn style="width: 80px; max-width: 80px">
        <v-icon>{{ link.icon }}</v-icon>
        <span>{{ link.title }}</span>
      </v-btn>
    </router-link>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "NavBar",

  data: () => ({
  items: [
    { title: "Overview", icon: "mdi-home", path: "/overview" },
    { title: "Table", icon: "mdi-table", path: "/table" },
    { title: "Create", icon: "mdi-plus-circle", path: "/create" },
    { title: "Visualise", icon: "mdi-telescope", path: "/visualise" },
    { title: "Profile", icon: "mdi-account", path: "/profile" }]
  })
}
</script>
