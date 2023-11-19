<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="white--text">
            Profile Information
          </v-card-title>
          <v-card-text>
            <v-list v-if="user.logged">
              <v-list-item v-for="(value, key) in user" :key="key">
                <v-list-item-title class="white--text">
                  {{ capitalize(key) }}:
                </v-list-item-title>

                <v-list-item-subtitle class="white--text">
                  {{ value }}
                </v-list-item-subtitle>

              </v-list-item>
            </v-list>

            <v-row v-else>
              <v-col cols="12" class="text-center">
                <h3 class="display-1 white--text">Please 
                  <a 
                    href="#" 
                    @click.prevent="openLoginDialog" 
                    class="white--text"
                  >
                    log in
                  </a> 

                  to access your profile.
                </h3>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <UserRegister 
      @open-login="openLoginDialog"
      ref="userRegister" 
    />
    <UserLogin 
      @open-register="openRegisterDialog"
      @open-forgetpassword="openForgetPasswordDialog"
      ref="userLogin"
    />
    <UserForgetPassword 
      @open-login="openLoginDialog"
      ref="userForgetPassword"
    />
    <UserResetPassword 
      ref="userResetPassword"
    />

  </v-container>
</template>

<script>
import UserRegister from '../views/users/Register.vue'
import UserLogin from '../views/users/Login.vue'
import UserForgetPassword from '../views/users/ForgotPassword.vue'
import UserResetPassword from '../views/users/ResetPassword.vue'

export default {
  components: {
    UserRegister,
    UserLogin,
    UserForgetPassword,
    UserResetPassword
  },
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
    openLoginDialog(){
      this.$refs.userLogin.openDialog()
    },
    openRegisterDialog(){
      this.$refs.userRegister.openDialog()
    },
    openForgetPasswordDialog(){
      this.$refs.userForgetPassword.openDialog()
    },
    openResetPasswordDialog(){
      this.$refs.userResetPassword.openDialog()
    }
  }
};
</script>

<style>

</style>
