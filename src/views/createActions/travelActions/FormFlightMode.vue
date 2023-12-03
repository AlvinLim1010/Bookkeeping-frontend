<template>
    <span>
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
    </span>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fromAirport: null,
        toAirport: null,
        roundTrip: false
      };
    },
    reset(){
      this.fromAirport = null
      this.toAirport = null
      this.roundTrip = false
    }
  }
  </script>
  