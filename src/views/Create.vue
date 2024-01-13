<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="min-height: 90vh">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card elevation="5">
          <v-card-title>Enter the details to add one action</v-card-title>
          <v-divider />
          <v-card-text 
            class="text-center mt-3" 
            v-if="this.$store.state.user.username"
          >
            <v-form ref="form" fast-fail @submit.prevent>
              <v-row justify="space-between">
                <v-text-field 
                  class="ml-3 mr-3"
                  style="width: 44%;"
                  v-model="selectedDate"
                  type="date" 
                  label="Date"
                ></v-text-field>
                <v-select
                  class="ml-0 mr-3"
                  style="width: 44%;"
                  v-model="mainAction"
                  label="Select a main-action"
                  :items="mainActionsOptions"
                  filled
              ></v-select>
              </v-row>

              <FormTravelMode
                v-show="mainAction == MainActions.TRAVEL"
                :selectedDate="selectedDate"
                @reset-date="resetSelectedDate"
                ref="formTravelMode"
              />
              <FormFoodMode
                v-show="mainAction == MainActions.FOOD"
                :selectedDate="selectedDate"
                @reset-date="resetSelectedDate"
                ref="formFoodMode"
              />
              <FormHouseholdMode
                v-show="mainAction == MainActions.HOUSEHOLD"
                :selectedDate="selectedDate"
                @reset-date="resetSelectedDate"
                ref="formHouseholdMode"
              />
              <FormIncomeMode
                v-show="mainAction == MainActions.INCOME"
                :selectedDate="selectedDate"
                @reset-date="resetSelectedDate"
                ref="formIncomeMode"
              />
              <FormMiscMode
                v-show="mainAction == MainActions.MISC"
                :selectedDate="selectedDate"
                @reset-date="resetSelectedDate"
                ref="formMiscMode"
              />
              <FormEntertainmentMode
                v-show="mainAction == MainActions.ENTERTAINMENT"
                :selectedDate="selectedDate"
                @reset-date="resetSelectedDate"
                ref="formEntertainmentMode"
              />
              <FormOthersMode
                v-show="mainAction == MainActions.OTHERS"
                :selectedDate="selectedDate"
                @reset-date="resetSelectedDate"
                ref="formOthersMode"
              />
            </v-form>
          </v-card-text>

          <v-card-text
            v-else
          >
            <DialogAccessProfile
              :customText="customText"
              @open-login="openLoginDialog"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

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

</template>

<script>
import { MainActions, CustomDialogText } from "../helper/enums"
import FormTravelMode from "./createActions/FormTravelMode.vue"
import FormFoodMode from "./createActions/FormFoodMode.vue"
import FormIncomeMode from "./createActions/FormIncomeMode.vue"
import FormMiscMode from "./createActions/FormMiscMode.vue"
import FormEntertainmentMode from "./createActions/FormEntertainmentMode.vue"
import FormHouseholdMode from "./createActions/FormHouseholdMode.vue"
import FormOthersMode from "./createActions/FormOthersMode.vue"

import DialogAccessProfile from './shared/DialogAccessProfile.vue'
import UserRegister from '../views/users/Register.vue'
import UserLogin from '../views/users/Login.vue'
import UserForgetPassword from '../views/users/ForgotPassword.vue'

export default {
  name: "Create",

  components: {
    FormTravelMode,
    FormFoodMode,
    FormIncomeMode,
    FormHouseholdMode,
    FormMiscMode,
    FormEntertainmentMode,
    FormOthersMode,
    DialogAccessProfile,

    UserRegister,
    UserLogin,
    UserForgetPassword,
  },
  data() {
    return {
      MainActions,
      mainActionsOptions: [],
      mainAction: null,
      selectedDate: this.getCurrentDate(),
      customText: CustomDialogText.CREATEACTION
    };
  },
  created() {
    this.mainAction = this.getMainActionsOption[0]
    this.mainActionsOptions = this.getMainActionsOption
  },
  computed: {
    getMainActionsOption() {
      return Object.values(MainActions)
    }
  },
  methods: {
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
      const day = today.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
    resetSelectedDate(){
      this.selectedDate = this.getCurrentDate()
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
  }
};
</script>
