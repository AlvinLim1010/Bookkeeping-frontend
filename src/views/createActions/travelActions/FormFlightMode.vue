<template>
  <v-form ref="form" fast-fail @submit.prevent>
    <v-row justify="space-between">
      <v-text-field
        class="ml-3 mr-3"
        style="width: 33%;"
        v-model="fromAirport"
        label="Flight From"
        filled
      ></v-text-field>
      <v-text-field
        class="ml-0 mr-3"
        style="width: 33%;"
        v-model="toAirport"
        label="Flight To"
        filled
      ></v-text-field>
      <v-checkbox
        v-model="roundTrip"
        label="Round Trip">
      </v-checkbox>
    </v-row>

    <v-row justify="space-between" class="mt-0">
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
        :rules="[v => !!v || 'Amount is required']"
        type="number"
      ></v-text-field>
    </v-row>

    <v-row justify="space-between" class="mt-0">
      <v-text-field 
        class="ml-3 mr-3"
        v-model="remarks"
        label="Remarks"
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
        <v-btn type="submit" class="mt-3 ml-3" style="width: 44%;" color="primary" @click="submit">
          Create Action
        </v-btn>
        <v-btn type="clear" class="mt-3 mr-3" style="width: 44%;" @click="reset">
          Clear
        </v-btn>
      </v-row>
    </v-card-actions>

  </v-form>
</template>
  
<script>
let httpRequest = require("../../../helper/httpRequests");
import { Actions, MainActions, TravelSubActions } from "../../../helper/enums"
import { getBackEndServer } from "../../../helper/commons";

export default {
  props: {
    selectedDate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      amount: null,
      remarks: null,
      selectedCurrency: "MYR",
      currencies: ['MYR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD'],
      fromAirport: null,
      toAirport: null,
      roundTrip: false
    };
  },
  methods: {
    async submit() {
      if (this.amount && this.selectedDate) {
        if ((!this.fromAirport && this.toAirport) || (this.fromAirport && !this.toAirport)){
          httpRequest.awn.alert("Please enter the details of both airports")
        } else {
          var requestBody = { 
            "username": this.$store.state.user.username, 
            "date": this.selectedDate,
            "main_category": MainActions.TRAVEL,
            "sub_category": TravelSubActions.FLIGHT,
            "amount": this.amount,
            "remarks": {
              ...(this.fromAirport !== null
                ? this.roundTrip
                  ? { 'Location': `Round Trip ${this.fromAirport} - ${this.toAirport}` }
                  : { 'Location': `One Way ${this.fromAirport} - ${this.toAirport}` }
                : {}
              ),
              ...(this.remarks !== null
                ? { 'Notes': this.remarks }
                : {}
              )
            }
          }

          this.loading = true
          
          let response = await httpRequest.axiosRequest(
            "post",
            getBackEndServer(), 
            Actions.CREATE, 
            requestBody,
          )

          if (response.status === 200){
            this.reset()
          }
          this.loading = false
        }
      } 
    },
    reset(){
      this.$refs.form.reset()
      this.$emit("reset-date")
      this.selectedCurrency = this.currencies[0]
    }
  }
}
</script>
  