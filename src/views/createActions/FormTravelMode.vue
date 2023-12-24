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
      :selectedDate="selectedDate"
      @reset-date="resetDate"
      ref="formPetrolMode"
    />
    <FormFlightMode
      v-show="subAction == TravelSubActions.FLIGHT"
      :selectedDate="selectedDate"
      @reset-date="resetDate"
      ref="formFlightMode"
    />
    <FormParkingMode
      v-show="subAction == TravelSubActions.PARKING"
      :selectedDate="selectedDate"
      @reset-date="resetDate"
      ref="formParkingMode"
    />
  </span>
</template>

<script>
import { TravelSubActions } from "../../helper/enums"
import FormPetrolMode from "./travelActions/FormPetrolMode.vue"
import FormFlightMode from "./travelActions/FormFlightMode.vue"
import FormParkingMode from "./travelActions/FormParkingMode.vue"

export default {
  props: {
    selectedDate: {
      type: String,
      required: true,
    },
  },
  components: {
    FormPetrolMode,
    FormFlightMode,
    FormParkingMode,
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
    resetDate(){
      this.$emit("reset-date")
    }
  }
}

</script>
