<template>
  <v-container fluid>
    <v-card v-if="$store.state.user.username">
      <v-card-title>
        <div class="d-flex align-center">
          <h2 class="headline">Data Visualisation</h2>
          <v-spacer></v-spacer>
          <v-text-field 
            class="mt-5 ml-1 mr-1"
            v-model="selectedStartDate"
            type="date" 
            label="Start Date"
          ></v-text-field>
          <v-text-field 
            class="mt-5 ml-1 mr-1"
            v-model="selectedEndDate"
            type="date" 
            label="End Date"
          ></v-text-field>
          <v-btn
            class="ma-1"
            @click="refreshData()"
          >
            <v-icon>mdi-restart</v-icon>
            <span>Refresh</span>
          </v-btn>
        </div>
        <v-divider></v-divider>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="auto">
            <AmountLineCard 
              :items="updatedItems"
              ref="amountLineCard" 
            />
          </v-col>
          <v-col cols="auto">
            <PercentageDoughnutCard 
              :items="updatedItems"
              ref="percentageDoughnutCard" 
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card v-else>
      <v-card-text>
        <DialogAccessProfile
          :customText="customText"
          @open-login="openLoginDialog"
        />
      </v-card-text>
    </v-card>
  </v-container>

  <UserRegister 
    @open-login="openLoginDialog"
    ref="userRegister" 
  />
  <UserLogin 
    @logged-in="refreshData"
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
import { CustomDialogText } from "../helper/enums"
import DialogAccessProfile from './shared/DialogAccessProfile.vue'
import UserRegister from '../views/users/Register.vue'
import UserLogin from '../views/users/Login.vue'
import UserForgetPassword from '../views/users/ForgotPassword.vue'

import AmountLineCard from '../views/visualiseCards/AmountLineCard.vue'
import PercentageDoughnutCard from '../views/visualiseCards/PercentageDoughnutCard.vue'

let httpRequest = require("../helper/httpRequests");
import { Actions } from "../helper/enums"
import { getBackEndServer, changeDateFormat } from "../helper/commons";

export default {
  name: "Visualise",
  components: {
    DialogAccessProfile,
    UserRegister,
    UserLogin,
    UserForgetPassword,
    AmountLineCard,
    PercentageDoughnutCard
  },
  async mounted() {
    if (this.$store.state.user.username){
      await this.getTableData()
      this.openVisualiseCard()
      this.cardOpen = true
      window.addEventListener("resize", this.updateStyle)
    }
  },
  beforeDestroy(){
    window.removeEventListener("resize", this.updateStyle)
  },
  data() {
    return {
      cardOpen: false,
      selectedStartDate: null,
      selectedEndDate: null,
      items: [],
      updatedItems: [],
      customText: CustomDialogText.ACTIONVISUALISE
    };
  },
  watch:{
    selectedStartDate: async function(newValue, oldValue) {
      if (oldValue !== null){
        await this.updateItems()
        await this.updateVisualiseCard()
      }
    },
    selectedEndDate: async function(newValue, oldValue) {
      if (oldValue !== null){
        await this.updateItems()
        await this.updateVisualiseCard()
      }
    }
  },
  methods: {
    async refreshData(){
      await this.getTableData()
      if (!this.cardOpen){
        this.openVisualiseCard()
        this.cardOpen = true
      } else {
        await this.updateVisualiseCard()
      }
    },
    async getTableData(){
      var requestBody = {
        "username": this.$store.state.user.username
      }

      let result = await httpRequest.axiosRequest(
        "post",
        getBackEndServer(), 
        Actions.GETACTIONS, 
        requestBody,
      )

      if (result.data.length > 0){
        result.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        let total = 0;

        this.items = result.data.map(item => {
          const isIncome = item.main_category === 'Income';
          const amount = parseFloat(item.amount) || 0; 

          total += isIncome ? amount : -amount;
          const date = new Date(item.date)
          const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

          return {
            id: item.id,
            date: formattedDate,
            main_category: item.main_category,
            sub_category: item.sub_category,
            remarks: (typeof item.remarks === 'object' && Object.keys(item.remarks).length === 0) ? '' : item.remarks,
            debit: isIncome ? item.amount : '', 
            credit: !isIncome ? item.amount : '', 
            amount: item.amount,
            total: total.toFixed(2),
          };
        });

        this.items.reverse()
        this.updatedItems = this.items

        this.selectedStartDate = changeDateFormat(this.items[this.items.length - 1]['date'])
        this.selectedEndDate = changeDateFormat(this.items[0]['date'])
      }
    },
    async updateItems(){
      this.updatedItems = this.items.filter(item => {
        const formattedDate = changeDateFormat(item.date)
        return formattedDate >= this.selectedStartDate && formattedDate <= this.selectedEndDate;
      });
    },
    updateStyle(){
      this.$refs.amountLineCard.style()
      this.$refs.percentageDoughnutCard.style()
    },
    openVisualiseCard(){
      this.$refs.amountLineCard.openCard()
      this.$refs.percentageDoughnutCard.openCard()
    },
    async updateVisualiseCard(){
      this.$refs.amountLineCard.updateChart()
      this.$refs.percentageDoughnutCard.updateChart()
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

}
</script>

<style>

</style>