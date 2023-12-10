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
                ref="formTravelMode"
              />
              <FormFoodMode
                v-show="mainAction == MainActions.FOOD"
                ref="formFoodMode"
              />
              <FormHouseholdMode
                v-show="mainAction == MainActions.HOUSEHOLD"
                ref="formHouseholdMode"
              />
              <FormIncomeMode
                v-show="mainAction == MainActions.INCOME"
                ref="formIncomeMode"
              />
              <FormMiscMode
                v-show="mainAction == MainActions.MISC"
                ref="formMiscMode"
              />
              <FormOthersMode
                v-show="mainAction == MainActions.OTHERS"
                ref="formOthersMode"
              />

              <v-row justify="space-between">
                <v-select
                  class="ml-3 mr-3"
                  style="width: 0%;"
                  v-model="selectedCurrency"
                  :items="currencies"
                  label="Select Currency"
                ></v-select>
                <v-text-field
                  class="ml-0 mr-3"
                  v-model="amount"
                  label="Amount"
                  required
                  type="number"
                ></v-text-field>
              </v-row>

              <v-row justify="space-between" class="mt-0">
                <v-text-field 
                  class="ml-3 mr-3"
                  v-model="remarks"
                  label="Remarks"
                  required
                ></v-text-field>
              </v-row>

              <v-divider />

              <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="primary"
              ></v-progress-linear>

              <v-card-actions>
                <v-row justify="space-between">
                  <v-btn type="submit" class="mt-3 ml-3" style="width: 44%;" color="primary">
                    Create Action
                  </v-btn>
                  <v-btn type="clear" class="mt-3 mr-3" style="width: 44%;" @click="reset">
                    Clear
                  </v-btn>
                </v-row>
              </v-card-actions>
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
    <UserResetPassword 
      ref="userResetPassword"
    />

</template>

<script>
import { MainActions, CustomDialogText } from "../helper/enums"
import FormTravelMode from "./createActions/FormTravelMode.vue"
import FormFoodMode from "./createActions/FormFoodMode.vue"
import FormIncomeMode from "./createActions/FormIncomeMode.vue"
import FormMiscMode from "./createActions/FormMiscMode.vue"
import FormHouseholdMode from "./createActions/FormHouseholdMode.vue"
import FormOthersMode from "./createActions/FormOthersMode.vue"

import DialogAccessProfile from './shared/DialogAccessProfile.vue'
import UserRegister from '../views/users/Register.vue'
import UserLogin from '../views/users/Login.vue'
import UserForgetPassword from '../views/users/ForgotPassword.vue'
import UserResetPassword from '../views/users/ResetPassword.vue'

export default {
  name: "Create",

  components: {
    FormTravelMode,
    FormFoodMode,
    FormIncomeMode,
    FormHouseholdMode,
    FormMiscMode,
    FormOthersMode,
    DialogAccessProfile,

    UserRegister,
    UserLogin,
    UserForgetPassword,
    UserResetPassword,
  },
  data() {
    return {
      MainActions,
      mainActionsOptions: [],
      mainAction: null,
      amount: null,
      remarks: null,
      loading: false,
      selectedDate: this.getCurrentDate(),
      selectedCurrency: null,
      currencies: ['MYR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD'],
      customText: CustomDialogText.CREATEACTION
    };
  },
  created() {
    console.log(this.$store.state)
    console.log(this.$store.state.user.id)
    this.mainAction = this.getMainActionsOption[0]
    this.mainActionsOptions = this.getMainActionsOption
    this.selectedCurrency = this.currencies[0]
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
    reset() {
      this.mainAction = this.getMainActionsOption[0]
      this.mainActionsOptions = this.getMainActionsOption
      this.amount = null
      this.selectedDate = this.getCurrentDate()
      this.remarks = null
      this.selectedCurrency = this.currencies[0]

      this.$refs.formTravelMode.reset()
      this.$refs.formFoodMode.reset()
      this.$refs.formHouseholdMode.reset()
      this.$refs.formMiscMode.reset()
      this.$refs.formIncomeMode.reset()
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
