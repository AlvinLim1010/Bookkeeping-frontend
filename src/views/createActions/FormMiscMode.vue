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
  import { MiscSubActions } from "../../helper/enums"
  
  export default {
    data() {
      return {
        MiscSubActions,
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
          MiscSubActions.DOGFOODS,
          MiscSubActions.TREATPARENTS,
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
  
  <style>
  </style>