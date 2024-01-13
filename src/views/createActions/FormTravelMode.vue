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
    <FormOthersMode
      v-show="subAction !== TravelSubActions.FLIGHT && subAction !== TravelSubActions.PETROL"
      :selectedDate="selectedDate"
      :subAction="subAction"
      @reset-date="resetDate"
      ref="formOthersMode"
    />
  </span>
</template>

<script>
import { TravelSubActions } from "../../helper/enums"
import FormPetrolMode from "./travelActions/FormPetrolMode.vue"
import FormFlightMode from "./travelActions/FormFlightMode.vue"
import FormOthersMode from "./travelActions/FormOthersMode.vue"

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
    FormOthersMode,
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
        ...Object.values(TravelSubActions),
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
