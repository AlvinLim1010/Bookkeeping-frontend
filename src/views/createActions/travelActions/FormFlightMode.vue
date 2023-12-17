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
    submit() {
      if (this.amount && this.selectedDate) {
        console.log("submit")
      } 
    },
    reset(){
      this.$refs.form.reset()
      this.selectedCurrency = this.currencies[0]
    }
  }
}
</script>
  