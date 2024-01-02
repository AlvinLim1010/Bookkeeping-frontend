<template>
  <v-app app>
    <v-container fluid>
      <v-row>
        <v-card-title class="grey lighten-5">
          Today {{ todaysDate }}
        </v-card-title>
        <v-spacer />
        
        <v-btn :color="recordAllTime ? 'indigo' : 'white'" @click="swapRecordOverview(true)">All</v-btn>
        <v-btn :color="recordAllTime ? 'white' : 'indigo'" class="ml-1 mr-3" @click="swapRecordOverview(false)">Yours</v-btn>
      </v-row>
      
        <v-card 
          color="indigo" 
          variant="flat"
          class="mt-3"
        >
          <v-card-title>Record Actions Information</v-card-title>
          <v-card-subtitle class="white--text">
            This section reveals how many records {{ textShowing }} and the timeframe they cover, from the beginning to the end.
          </v-card-subtitle>
          <v-card-text v-if="recordAllTime || this.$store.state.user.username">
            <div class="my-2">
              <v-row>
                <v-card-text class="text-h6">
                  Record from {{ modelData['all_category']['Start_date'] }} to {{ modelData['all_category']['Final_date'] }}
                </v-card-text>
              </v-row>

              <v-divider />

              <v-row v-for="(title, index) in totalTitle" :key="index">
                <v-col cols="4" sm="2" v-if="index % 2 === 0">
                  <v-card-text class="text-h8">
                    {{ totalTitle[index] }}:
                  </v-card-text>
                </v-col>

                <v-col cols="8" sm="4" v-if="index % 2 === 0">
                  <v-card-text class="text-h8">
                    {{ modelData['all_category'][totalTitle[index]] }}
                  </v-card-text>
                </v-col>

                <v-col cols="4" sm="2" v-if="index + 1 < totalTitle.length && index % 2 === 0">
                  <v-card-text class="text-h8">
                    {{ totalTitle[index + 1] }}:
                  </v-card-text>
                </v-col>

                <v-col cols="8" sm="4" v-if="index % 2 === 0">
                  <v-card-text class="text-h8">
                    {{ modelData['all_category'][totalTitle[index + 1]] }}
                  </v-card-text>
                </v-col>
              </v-row>
            </div>
          </v-card-text>

          <v-card-text
            v-else
          >
            <div v-if="this.$store.state.user.username" class="my-2">
              <v-row>
                <v-card-text class="text-h6">
                  Record from {{ modelData['user_category']['Start_date'] }} to {{ modelData['user_category']['Final_date'] }}
                </v-card-text>
              </v-row>

              <v-divider />

              <v-row v-for="(title, index) in totalTitle" :key="index">
                <v-col cols="4" sm="2" v-if="index % 2 === 0">
                  <v-card-text class="text-h8">
                    {{ totalTitle[index] }}:
                  </v-card-text>
                </v-col>

                <v-col cols="8" sm="4" v-if="index % 2 === 0">
                  <v-card-text class="text-h8">
                    {{ modelData['user_category'][totalTitle[index]] }}
                  </v-card-text>
                </v-col>

                <v-col cols="4" sm="2" v-if="index + 1 < totalTitle.length && index % 2 === 0">
                  <v-card-text class="text-h8">
                    {{ totalTitle[index + 1] }}:
                  </v-card-text>
                </v-col>

                <v-col cols="8" sm="4" v-if="index % 2 === 0">
                  <v-card-text class="text-h8">
                    {{ modelData['user_category'][totalTitle[index + 1]] }}
                  </v-card-text>
                </v-col>
              </v-row>
            </div>

            <DialogAccessProfile
              v-else
              :customText="customText"
              @open-login="openLoginDialog"
            />
          </v-card-text>
        </v-card>

      <v-card 
        class="mt-5" 
        color="indigo" 
        variant="flat"
        v-if="this.$store.state.user.username"
      >
        <v-card-title
          >Last 7 days statistics
        </v-card-title>
        <v-card-subtitle>
          This section displays the types of actions that have been previously added/updated by you!
        </v-card-subtitle>
        <v-expansion-panels focusable>
          <v-expansion-panel
            v-for="(item, index) in modelData['previous_category']"
            :key="index"
          >
            <v-expansion-panel-title 
              class="font-weight-medium" 
              color="indigo-darken-3" 
              variant="elevated"
            >
              {{ item['date'] }} | Total : {{ item['count'] }}
            </v-expansion-panel-title>
            
            <v-card
              color="indigo-darken-3" 
              variant="tonal"
            >
              <v-expansion-panel-text>
                <v-row v-for="title in actionTypes" :key="title">
                  
                    <v-col cols="2">
                      <v-card-subtitle class="black--text">
                        {{ title }}:
                      </v-card-subtitle>
                    </v-col>
                    
                    <v-col cols="9">
                      <v-card-subtitle>
                        {{ item['categories'][title] }}
                      </v-card-subtitle>
                    </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-card>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-container>
  </v-app>

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
import DialogAccessProfile from './shared/DialogAccessProfile.vue'
import UserRegister from '../views/users/Register.vue'
import UserLogin from '../views/users/Login.vue'
import UserForgetPassword from '../views/users/ForgotPassword.vue'
import UserResetPassword from '../views/users/ResetPassword.vue'

let httpRequest = require("../helper/httpRequests");
import { Actions } from "../helper/enums"
import { getBackEndServer } from "../helper/commons";

export default {
  name: "Overview",
  components: {
    DialogAccessProfile,
    UserRegister,
    UserLogin,
    UserForgetPassword,
    UserResetPassword,
  },
  async created() {
    await this.getOverviewData()
  },
  data() {
    return {
      recordAllTime: true,
      textShowing: "are inputted into database",
      todaysDate: this.getCurrentDate(),
      actionTypes: Object.values(MainActions),
      totalTitle: ["Total", ...Object.values(MainActions)],
      modelData: {
        "all_category": {
          "Start_date": null,
          "Final_date": null,
        }
      },
      customText: CustomDialogText.OVERVIEWACCESS
    };
  },
  methods: {
    async getOverviewData(){
      var requestBody = {
        "username": this.$store.state.user.username !== null ? this.$store.state.user.username : ""
      }

      let result = await httpRequest.axiosRequest(
        "post",
        getBackEndServer(), 
        Actions.ACTIONSOVERVIEW, 
        requestBody,
      )

      this.modelData = result.data
    },
    swapRecordOverview(value){
      this.recordAllTime = value
      if (value){
        this.textShowing = "are inputted into database"
      } else {
        this.textShowing = "you have"
      }
    },
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
      const day = today.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
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
