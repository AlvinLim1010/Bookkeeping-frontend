<template>
  <v-form ref="form" fast-fail @submit.prevent>
    <v-row>
      <v-text-field
        class="ml-3 mr-3"
        v-model="subAction"
        label="Enter the sub-action detail"
        filled
        required
        :rules="[v => !!v || 'The sub-action is required']"
      ></v-text-field>
    </v-row>

    <v-row justify="space-between" class="mt-0">
        <v-text-field
          class="ml-3 mr-3"
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
let httpRequest = require("../../helper/httpRequests");
import { Actions, MainActions } from "../../helper/enums"
import { getBackEndServer } from "../../helper/commons";

export default {
  props: {
    selectedDate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      subAction: null,
      loading: false,
      amount: null,
      remarks: null,
    };
  },
  methods:{
    reset(){
      this.$refs.form.reset()
      this.$emit("reset-date")
    },
    async submit() {
      if (this.amount !== null && this.subAction && this.selectedDate) {
        var requestBody = { 
          "username": this.$store.state.user.username, 
          "date": this.selectedDate,
          "main_category": MainActions.OTHERS,
          "sub_category": this.subAction,
          "amount": this.amount,
          "remarks": this.remarks === null ? {} : { "Notes": this.remarks }
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
  }
}
</script>
