<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="white--text">
            Profile Information
          </v-card-title>
          <v-card-text>
            <v-list v-if="this.$store.state.user.username">
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
              <DialogAccessProfile 
                @open-login="openLoginDialog"
                :customText="customText"
              />
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
import { CustomDialogText } from "../helper/enums"
import UserRegister from '../views/users/Register.vue'
import UserLogin from '../views/users/Login.vue'
import UserForgetPassword from '../views/users/ForgotPassword.vue'
import UserResetPassword from '../views/users/ResetPassword.vue'

import DialogAccessProfile from './shared/DialogAccessProfile.vue'

export default {
  name: "Profile",

  components: {
    UserRegister,
    UserLogin,
    UserForgetPassword,
    UserResetPassword,
    DialogAccessProfile
  },
  data() {
    return {
      user: {
        email: this.$store.state.user.email,
        username: this.$store.state.user.username,
        password: this.$store.state.user.password,
        join_date: this.$store.state.user.joinDate,
      },
      customText: CustomDialogText.PROFILEACCESS
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
