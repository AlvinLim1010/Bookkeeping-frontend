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
                Forget Password
              </v-card-title>
            </v-row>
            <v-row justify="center">
              <v-card-text class="text-center">
                Enter the Email Address to Get the New Password Code
              </v-card-text>
            </v-row>
            <v-divider></v-divider>
            <v-card-text class="text-center">
              <v-form ref="form" fast-fail @submit.prevent>
                <v-text-field
                  v-model="email"
                  label="Email Address"
                  :rules="rules.emailRules"
                  required
                ></v-text-field>

                <v-divider class="my-1"></v-divider>

                <div class="text-center">
                  <small
                    >Go back to Login?
                    <a href="#" @click.prevent="login">
                      <span>Click Here</span>
                    </a>
                  </small>
                </div>

                <v-divider class="my-2"></v-divider>

                <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"
                  absolute
                  top
                  color="primary"
                ></v-progress-linear>

                <v-btn type="submit" color="primary" block @click="forgotPassword">
                  Forget Password
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
      email: '',
      loading: false,
      rules: {
        emailRules: [v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"]
      }
    };
  },
  methods: {
    reset(){
      this.email = ''
      this.loading = false
    },
    async forgotPassword(){
      if (this.isEmailValid(this.email)){
        var requestBody = { 
          "email": this.email, 
        }

        this.loading = true
        
        let response = await httpRequest.axiosRequest(
          "post",
          getBackEndServer(), 
          RouteAuthServer.FORGOTPASSWORD, 
          requestBody,
        )
        
        if (response.status === 200){
          httpRequest.awn.info("Your password has been changed to 'abc123'")
          this.$emit("open-login")
          this.closeDialog()
        } else {
          this.loading = false
        }
        
        this.reset()
      }
    },
    isEmailValid(email) {
      return this.rules.emailRules[0](email) === true;
    },
    openDialog(){
      this.dialog = true
    },
    closeDialog(){
      this.dialog = false
    },
    login(){
      this.$emit("open-login")
      this.closeDialog()
    }
  }
}
</script>
