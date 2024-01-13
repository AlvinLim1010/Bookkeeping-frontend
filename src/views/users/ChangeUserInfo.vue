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
                Change {{ title }}
              </v-card-title>
            </v-row>
            <v-divider></v-divider>
            <v-card-text class="text-center">
              <v-form ref="form" fast-fail @submit.prevent>
                <v-text-field
                  required
                  v-model="old_input_field"
                  :label="old_label"
                  readonly
                />
                <v-text-field
                  required
                  :rules="getTitleRules()"
                  v-model="new_input_field"
                  :label="new_label"
                  @input="onInput"
                />

                <v-divider class="my-1"></v-divider>

                <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"
                  absolute
                  top
                  color="primary"
                ></v-progress-linear>

                <v-btn type="submit" color="primary" block @click="updateInfo">
                  Change
                </v-btn>
                <v-btn type="clear" block class="mt-3" @click="reset">
                  Clear
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
      title: null,
      old_label: null,
      new_label: null,
      old_input_field: null,
      new_input_field: null,
      loading: false,
      rules: {
        emailRules: [v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"],
      },
    };
  },
  methods: {
    onInput() {
      if (this.title === "Username"){
        this.new_input_field = this.new_input_field.toUpperCase();
      }
    },
    getTitleRules(){
      if (this.title === "Email") {
        return this.rules.emailRules;
      } else {
        return [];
      }
    },
    reset() {
      this.new_input_field = null
    },
    async updateInfo() {
      if (this.new_input_field !== null && this.new_input_field !== ''){
        if (this.title === "Email") {
          var requestBody = { 
            "email": this.$store.state.user.email, 
            "new_email": this.new_input_field
          }
        } else {
          var requestBody = { 
            "email": this.$store.state.user.email, 
            "username": this.new_input_field, 
          }
        }

        this.loading = true
        
        let response = await httpRequest.axiosRequest(
          "patch",
          getBackEndServer(), 
          RouteAuthServer.UPDATEINFO, 
          requestBody,
        )
        
        if (response.status === 200){
          setStateUser(response.data)
          const data = { 
            value: response.data, 
            timestamp: new Date().getTime() 
          };
          localStorage.setItem('user', JSON.stringify(data));
          this.$emit("update-info")
          this.closeDialog()
        } 
      }
    },
    openDialog(key, value) {
      this.title = key
      this.old_input_field = value
      this.old_label = `Old ${key}`
      this.new_label = `New ${key}`
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.loading = false;
      this.title = null
      this.old_label = null
      this.new_label = null
      this.old_input_field = null
      this.new_input_field = null
    },
  },
};
</script>