<template>
  <span>
    <v-row justify="space-between">
      <v-text-field
        class="ml-3 mr-3"
        style="width: 44%;"
        v-model="odometer"
        label="Odometer"
        filled
      ></v-text-field>
      <v-text-field
        class="ml-0 mr-3"
        style="width: 44%;"
        v-model="fuelPrice"
        label="Fuel Price per Litre"
        filled
      ></v-text-field>
    </v-row>
  </span>
</template>

<script>
export default {
  data() {
    return {
      odometer: null,
      fuelPrice: null
    };
  },
  reset(){
    this.odometer = null
    this.fuelPrice = null
  }
}
</script>
