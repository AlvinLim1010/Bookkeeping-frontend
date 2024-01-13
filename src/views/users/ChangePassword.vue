<template>
  <v-container fluid>
    <v-dialog v-model="dialog" max-width="800">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card elevation="5">
            <v-row justify="center">
              <v-card-title 
                class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-center"
                style="line-height: 2"
              >
                Change Password
              </v-card-title>
            </v-row>
            <v-divider></v-divider>
            <v-card-text class="text-center">
              <v-form ref="form" fast-fail @submit.prevent>
                <v-text-field
                  :type="showPassword1 ? 'text' : 'password'"
                  :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword1 = !showPassword1"
                  required
                  :rules="rules.minimum"
                  v-model="password"
                  label="Old Password"
                ></v-text-field>

                <v-text-field
                  :type="showPassword2 ? 'text' : 'password'"
                  :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword2 = !showPassword2"
                  required
                  :rules="rules.minimum"
                  v-model="confirm_password"
                  label="New Password"
                ></v-text-field>

                <v-text-field
                  :type="showPassword3 ? 'text' : 'password'"
                  :append-icon="showPassword3 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword3 = !showPassword3"
                  required
                  :rules="rules.passwordMatch"
                  v-model="confirm_password2"
                  label="Confirm Password"
                ></v-text-field>

                <v-divider class="my-1"></v-divider>

                <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"
                  absolute
                  top
                  color="primary"
                ></v-progress-linear>

                <v-btn type="submit" color="primary" block @click="updatePassword">
                  Reset Password
                </v-btn>
                <v-btn type="clear" block class="mt-3" @click="reset">
                  Clear
                </v-btn>
              </v-form>
            </v-card-text>

            <v-card-actions style="max-height: 10px">
              <v-spacer />
              <v-btn
                color="green darken-1"
                text
                @click="closeDialog()"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
  </v-container>
</template>

<script>
let httpRequest = require("../../helper/httpRequests");
import { getBackEndServer } from "../../helper/commons";
import { RouteAuthServer } from "../../helper/enums";

export default {
  data() {
    return {
      dialog: false,
      password: '',
      confirm_password: '',
      confirm_password2: '',
      showPassword1: false,
      showPassword2: false,
      showPassword3: false,
      loading: false,
      rules: {
        minimum: [v => v.length >= 6 || "Min 6 characters"],
        passwordMatch: [v => v === this.confirm_password || "Password must match"]
      }
    };
  },
  methods: {
    reset(){
      this.password = '',
      this.confirm_password = '',
      this.confirm_password2 = '',
      this.showPassword1 = false,
      this.showPassword2 = false,
      this.showPassword3 = false,
      this.loading = false
    },
    async updatePassword(){
      if (
        this.password.length >= 6 && 
        this.confirm_password.length >= 6 && 
        this.confirm_password === this.confirm_password2
      ){
        var requestBody = { 
          "email": this.$store.state.user.email, 
          "old_password": this.password, 
          "new_password": this.confirm_password
        }

        this.loading = true
        
        let response = await httpRequest.axiosRequest(
          "patch",
          getBackEndServer(), 
          RouteAuthServer.RESETPASSWORD, 
          requestBody,
        )
        
        if (response.status === 200){
          this.closeDialog()
        } else {
          this.loading = false
        }
      }
    },
    openDialog(){
      this.dialog = true
    },
    closeDialog(){
      this.reset()
      this.dialog = false
    },
  }
}
</script>

<style>

</style>