<template>
  <v-container fluid>
    <v-dialog v-model="dialog" max-width="800" persistent>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card elevation="5">
            <v-row justify="center">
              <v-card-title
                class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-center"
                style="line-height: 2"
              >
                Login
              </v-card-title>
            </v-row>
            <v-divider></v-divider>
            <v-card-text class="text-center">
              <v-form ref="form" fast-fail @submit.prevent>
                <v-text-field
                  v-model="email"
                  label="Email Address"
                  :rules="rules.emailRules"
                  required
                />

                <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  required
                  v-model="password"
                  label="Password"
                />

                <v-divider class="my-1" />

                <div class="text-center">
                  <div>
                    <small
                      >Don't have an Account?
                      <a href="#" @click.prevent="register">
                        <span>Click Here</span>
                      </a>
                    </small>
                  </div>
                  <div>
                    <small
                      >Forgot Password?
                      <a href="#" @click.prevent="forgotpassword">
                        <span>Click Here</span>
                      </a>
                    </small>
                  </div>
                </div>

                <v-divider class="my-2" />

                <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"
                  absolute
                  top
                  color="primary"
                ></v-progress-linear>

                <v-btn type="submit" color="primary" block @click="login"
                  >Login
                </v-btn>
                <v-btn type="clear" block class="mt-3" @click="reset"
                  >Clear
                </v-btn>
              </v-form>
            </v-card-text>

            <v-card-actions style="max-height: 10px">
              <v-spacer />
              <v-btn color="green darken-1" text @click="closeDialog()">
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
import { getBackEndServer, setStateUser } from "../../helper/commons";
import { RouteAuthServer } from "../../helper/enums";

export default {
  data() {
    return {
      dialog: false,
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      rules: {
        emailRules: [
          (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid",
        ],
      },
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset()
      this.loading = false
    },
    async login() {
      if (this.$refs.form.validate()){
        var requestBody = { 
          "email": this.email, 
          "password": this.password
        }

        this.loading = true
        
        let response = await httpRequest.axiosRequest(
          "post",
          getBackEndServer(), 
          RouteAuthServer.LOGIN, 
          requestBody,
        )
        
        if (response.status === 200){
          setStateUser(response.data)
          const data = { 
            value: response.data, 
            timestamp: new Date().getTime() 
          };
          localStorage.setItem('user', JSON.stringify(data));

          this.closeDialog()
        } else if (response.status === 401){
          console.log("Incorrect Email/Password")
        } else if (response.status === 403){
          console.log("Verify Email")
        }
        
        this.reset()
      }
    },
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    forgotpassword() {
      this.$emit("open-forgetpassword");
      this.closeDialog();
    },
    register() {
      this.$emit("open-register");
      this.closeDialog();
    },
  },
};
</script>
  