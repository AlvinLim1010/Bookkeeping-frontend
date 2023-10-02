<template>
    <v-app>
      <v-main>
        <router-view/>
        <v-bottom-navigation mode="shift">
          <router-link :to="{ name: 'home' }">
            <v-btn value="home">
              <v-icon>mdi-home</v-icon>
              <span>Home</span>
            </v-btn>
          </router-link>
  
          <router-link :to="{ name: 'records' }">
            <v-btn value="records">
              <v-icon>mdi-account</v-icon>
              <span>Records</span>
            </v-btn>
          </router-link>
  
          <router-link :to="{ name: 'register' }">
            <v-btn value="register">
              <v-icon>mdi-plus</v-icon>
              <span>Register</span>
            </v-btn>
          </router-link> 
  
          <router-link :to="{ name: 'update' }">
            <v-btn value="update">
              <v-icon >mdi-pencil</v-icon>
              <span>Update</span>
            </v-btn>
          </router-link> 
  
          <router-link :to="{ name: 'delete' }">
            <v-btn value="delete">
              <v-icon>mdi-delete</v-icon>
              <span>Delete</span>
            </v-btn>
          </router-link> 
        </v-bottom-navigation>
      </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",
}

</script>
