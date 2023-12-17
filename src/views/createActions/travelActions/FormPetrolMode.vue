<template>
  <v-form ref="form" fast-fail @submit.prevent>
    <v-row justify="space-between">
      <v-text-field
        class="ml-3 mr-3"
        style="width: 44%;"
        v-model="odometer"
        label="Odometer"
        filled
      ></v-text-field>
      <v-select
        style="width: 15%;"
        v-model="selectedCurrency"
        :items="currencies"
        label="Select Currency"
      ></v-select>
      <v-text-field
        class="ml-1 mr-3"
        style="width: 29%;"
        v-model="fuelPrice"
        label="Fuel Price per Litre"
        filled
      ></v-text-field>
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
      odometer: null,
      fuelPrice: "2.05",
      amount: null,
      selectedCurrency: "MYR",
      currencies: ['MYR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD'],
      remarks: null
    };
  },
  methods: {
    submit() {
      if (this.amount !== null && this.selectedDate) {
        console.log("submit")
      } 
    },
    reset() {
      this.$refs.form.reset()
      this.fuelPrice = "2.05"
      this.selectedCurrency = this.currencies[0]
    }
  }
}
</script>
