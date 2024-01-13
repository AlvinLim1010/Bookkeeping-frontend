<template>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <v-card>
      <v-col>
        <v-row class="mt-2">
          <v-col>
            <v-text-field
                v-model="updateInput.date"
                label="Date"
                type="date"
                rounded
                filled
              />
          </v-col>
          <v-col>
            <v-text-field
              v-model="main_category"
              label="Main Category"
              rounded
              filled
              readonly
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="sub_category"
              label="Sub Category"
              rounded
              filled
              readonly
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="updateInput.amount"
              label="Amount"
              type="number"
              rounded
              filled
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="updateInput.remarks"
              label="Remarks"
              rounded
              filled
            />
          </v-col>
        </v-row>
    
        <v-row>
          <v-col>
            <v-alert border="top" color="green" dark>
              <v-checkbox v-model="checkbox" :label="getText()" color="white" />
              <v-list v-if="Object.keys(valueChanged).length > 0" style="background-color: limegreen;">
                <v-list-item v-for="(value, key) in valueChanged" :key="key">
                  <v-list-item-subtitle>{{ key }}: {{ value }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-alert>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="btnConfirm()"
            :disabled="disableConfirm()"
          >
            Confirm
          </v-btn>
          <v-btn color="green darken-1" text @click="closeDialog()">
            Close
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-card>
  </v-dialog>
</template>
  
<script>
let httpRequest = require("../../../helper/httpRequests");
import { Actions } from "../../../helper/enums"
import { getBackEndServer, changeDateFormat } from "../../../helper/commons";

export default {
  data() {
    return {
      dialog: false,
      checkbox: false,
        id: null,
        id: null,
        date: null,
      id: null,
        date: null,
      main_category: null,
      sub_category: null,
      valueChanged: {},
      requestBody: {},
      
      initialInput: {
        date: null,
        amount: null,
        remarks: null,
      },

      updateInput: {
        date: null,
        amount: null,
        remarks: null,
      }
    }
  },
  watch: {
    "updateInput.date": function(newValue, oldValue) {
      if (this.initialInput.date !== newValue){
        this.valueChanged.date = `${this.initialInput.date} => ${newValue}`
      } else {
        delete this.valueChanged.date
      }
    },
    "updateInput.amount": function(newValue, oldValue) {
      if (this.initialInput.amount !== parseFloat(newValue)){
        this.valueChanged.amount = `${this.initialInput.amount} => ${newValue}`
      } else {
        delete this.valueChanged.amount
      }
    },
    "updateInput.remarks": function(newValue, oldValue) {
      if (this.initialInput.remarks !== newValue){
        this.valueChanged.remarks = `${this.initialInput.remarks} => ${newValue}`
      } else {
        delete this.valueChanged.remarks
      }
    },
  },
  methods: {
    async btnConfirm() {
      if (Object.keys(this.valueChanged).length > 0){
        this.requestBody["action_id"] = this.id
        for (const key in this.valueChanged){
          if (key === "remarks"){
            this.requestBody[key] = {
              "Notes": this.updateInput[key]
            }
          } else {
            this.requestBody[key] = this.updateInput[key]
          }
        }

        let response = await httpRequest.axiosRequest(
          "patch",
          getBackEndServer(), 
          Actions.UPDATE, 
          this.requestBody,
        )

        if (response.status === 200){
          this.$emit("refreshData")
          this.closeDialog()
        }

      } else {
        httpRequest.awn.alert("There is nothing to be changed")
      }
    },
    disableConfirm() {
      if (!this.checkbox) {
        return true;
      }
      return false;
    },
    getText() {
      return `Are you sure you want to update this action?`
    },
    openDialog(item) {
      this.dialog = true;

      this.id = item.id
      this.initialInput.date = this.updateInput.date = changeDateFormat(item.date)
      this.main_category = item.main_category
      this.sub_category = item.sub_category
      this.initialInput.amount = this.updateInput.amount = item.amount
      this.initialInput.remarks = this.updateInput.remarks = item.remarks['Notes']
    },
    closeDialog() {
      this.dialog = false;
      this.reset()
    },
    reset(){
      this.checkbox = false;
      this.id = null;
      this.main_category = null;
      this.sub_category = null;
      this.valueChanged = {}
      this.requestBody = {}

      this.updateInput = {
        date: null,
        amount: null,
        remarks: null,
      }

      this.initialInput = {
        date: null,
        amount: null,
        remarks: null,
      }
    }
  },
};
</script>