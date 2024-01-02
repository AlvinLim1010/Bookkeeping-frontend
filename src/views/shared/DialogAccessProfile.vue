<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="text-center">
              <h3 class="display-1 white--text">
                Please
                <a href="#" @click.prevent="openLoginDialog" class="white--text">
                  log in
                </a>
                {{ dialogText() }}
              </h3>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { CustomDialogText } from "../../helper/enums"

export default {
  name: "DialogProfile",

  props: {
    customText: String,
  },
  methods: {
    openLoginDialog(){
      this.$emit("open-login")
    },

    dialogText(){
      switch (this.customText) {
        case CustomDialogText.CREATEACTION:
          return "to create an action for your profile.";
        case CustomDialogText.OVERVIEWACCESS:
          return "to have your profile overview.";
        case CustomDialogText.PROFILEACCESS:
          return "to access your profile.";
        case CustomDialogText.ACTIONVISUALISE:
          return "to show the the data visualisation from your actions.";
        case CustomDialogText.ACTIONTABLE:
          return "to view your actions using tabular form.";
        default:
          return "";
      }
    }
  }
};
</script>

<style>
</style>