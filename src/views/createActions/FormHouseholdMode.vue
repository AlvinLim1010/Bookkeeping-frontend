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
  </span>
</template>

<script>
import { HouseholdSubActions } from "../../helper/enums"

export default {
  data() {
    return {
      HouseholdSubActions,
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
        HouseholdSubActions.RENTAL,
        HouseholdSubActions.UTILITY,
        "OTHERS"
      ]
    }
  },
  methods:{
    reset(){
      this.subAction = this.getSubActionsOption[0]
      this.subActionsOptions = this.getSubActionsOption
    }
  }
}

</script>
