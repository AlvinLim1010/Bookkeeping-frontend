<template>
  <v-container fluid>
    <v-dialog v-model="dialog" max-width="800">
      <v-row align="center" justify="center" class="fill-height">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card elevation="5">
            <v-row justify="center">
              <v-card-title 
                class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-center"
                style="line-height: 2"
              >
                Register
              </v-card-title>
            </v-row>
            <v-divider></v-divider>
            <v-card-text class="text-center">
              <v-form ref="form" fast-fail @submit.prevent>
                <v-text-field 
                    v-model="username" 
                    label="Username"
                    required>
                </v-text-field>

                <v-text-field
                  v-model="email"
                  label="Email Address"
                  :rules="rules.emailRules"
                  required
                ></v-text-field>

                <v-text-field
                  :type="showPassword1 ? 'text' : 'password'"
                  :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword1 = !showPassword1"
                  required
                  :rules="rules.minimum"
                  v-model="password"
                  label="Password"
                ></v-text-field>

                <v-text-field
                  :type="showPassword2 ? 'text' : 'password'"
                  :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword2 = !showPassword2"
                  required
                  :rules="rules.passwordMatch"
                  v-model="confirm_password"
                  label="Confirm Password"
                ></v-text-field>

                <v-divider class="my-1"></v-divider>

                <div class="text-center">
                  <small
                    >Already have an Account?
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

                <v-btn type="submit" color="primary" block @click="submitForm">
                  Register
                </v-btn>
                <v-btn type="clear" block class="mt-3" @click="reset">
                  Clear
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      showPassword1: false,
      showPassword2: false,
      loading: false,
      rules: {
        minimum: [v => v.length >= 6 || "Min 6 characters"],
        emailRules: [v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"],
        passwordMatch: [v => v === this.password || "Password must match"]
      }
    };
  },
  methods: {
    login(){
      console.log("login")
    }
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
  