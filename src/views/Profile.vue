<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="white--text">Profile Information</v-card-title>
          <v-card-text>
            <v-list v-if="user.logged">
              <v-list-item v-for="(value, key) in user" :key="key">
                <v-list-item-title class="white--text">{{ capitalize(key) }}:</v-list-item-title>
                <v-list-item-subtitle class="white--text">{{ value }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <v-row v-else>
              <v-col cols="12" class="text-center">
                <h3 class="display-1 white--text">Please <a href="#" @click.prevent="login" class="white--text">log in</a> to access your profile.</h3>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: 'user@example.com',
        username: 'example_user',
        password: '*************',
        roles: 'Normal',
        join_date: "",
        logged: false
      },
    };
  },
  methods: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    login(){
      console.log("Login")
    }
  }
};
</script>

<style>

</style>
