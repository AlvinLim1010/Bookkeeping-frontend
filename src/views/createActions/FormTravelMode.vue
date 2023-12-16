<template>
  <span>
    <v-row>
      <v-select
        class="ml-3 mr-3"
        v-model="subAction"
        label="Select a sub-action"
        :items="subActionsOptions"
        filled
      ></v-select>
    </v-row>

    <FormPetrolMode
      v-show="subAction == TravelSubActions.PETROL"
      ref="formPetrolMode"
    />
    <FormFlightMode
      v-show="subAction == TravelSubActions.FLIGHT"
      ref="formFlightMode"
    />
  </span>
</template>

<script>
import { TravelSubActions } from "../../helper/enums"
import FormPetrolMode from "./travelActions/FormPetrolMode.vue"
import FormFlightMode from "./travelActions/FormFlightMode.vue"

export default {
  components: {
    FormPetrolMode,
    FormFlightMode
  },
  data() {
    return {
      TravelSubActions,
      subActionsOptions: [],
      subAction: null,
    };
  },
  created() {
    this.subAction = this.getSubActionsOption[0]
    this.subActionsOptions = this.getSubActionsOption
  },
  computed: {
    getSubActionsOption() {
      return [
        TravelSubActions.PETROL,
        TravelSubActions.FLIGHT,
        TravelSubActions.HOTEL,
        TravelSubActions.PARKING,
        "Others"
      ]
    }
  },
  methods:{
  }
}

</script>

<style>
</style>