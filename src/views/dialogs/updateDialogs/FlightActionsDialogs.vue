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
              v-model="updateInput.fromAirport"
              label="Flight From"
              filled
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="updateInput.toAirport"
              label="Flight To"
              filled
            />
          </v-col>
          <v-col>
            <v-checkbox v-model="updateInput.roundTrip" label="Round Trip" />
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
import { getBackEndServer } from "../../../helper/commons";

export default {
  data() {
    return {
      dialog: false,
      checkbox: false,
      id: null,
      main_category: null,
      sub_category: null,
      valueChanged: {},
      requestBody: {},

      initialInput: {
        date: null,
        amount: null,
        fromAirport: null,
        toAirport: null,
        roundTrip: null,
        remarks: null,
      },

      updateInput: {
        date: null,
        amount: null,
        fromAirport: null,
        toAirport: null,
        roundTrip: null,
        remarks: null,
      },
    };
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
      if (this.initialInput.amount !== parseInt(newValue)){
        this.valueChanged.amount = `${this.initialInput.amount} => ${newValue}`
      } else {
        delete this.valueChanged.amount
      }
    },
    "updateInput.fromAirport": function(newValue, oldValue) {
      if (this.initialInput.fromAirport !== newValue){
        this.valueChanged.fromAirport = `${this.initialInput.fromAirport} => ${newValue}`
      } else {
        delete this.valueChanged.fromAirport
      }
    },
    "updateInput.toAirport": function(newValue, oldValue) {
      if (this.initialInput.toAirport !== newValue){
        this.valueChanged.toAirport = `${this.initialInput.toAirport} => ${newValue}`
      } else {
        delete this.valueChanged.toAirport
      }
    },
    "updateInput.roundTrip": function(newValue, oldValue) {
      if (this.initialInput.roundTrip !== newValue){
        this.valueChanged.roundTrip = `${this.initialInput.roundTrip} => ${newValue}`
      } else {
        delete this.valueChanged.roundTrip
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
        var updatedLocation = {}

        this.requestBody["action_id"] = this.id
        for (const key in this.valueChanged){
          if (key === "remarks" || key === "fromAirport" || key === "toAirport" || key === "roundTrip") {
            if (!this.requestBody["remarks"]) {
              this.requestBody["remarks"] = {};
            }

            if (key === "remarks") {
              this.requestBody[key]["Notes"] = this.updateInput[key];
            } else if (key === "fromAirport" || key === "toAirport" || key === "roundTrip") {
              updatedLocation[key] = this.updateInput[key];
            }
          } else {
            this.requestBody[key] = this.updateInput[key]
          }
        }

        // Update the location remarks
        const trip = updatedLocation["roundTrip"] !== undefined ? (updatedLocation["roundTrip"]? "Round Trip" : "One Way") : 
          (this.initialInput.roundTrip ? "Round Trip" : "One Way")

        const from = updatedLocation["fromAirport"] !== undefined ? updatedLocation["fromAirport"] : this.initialInput.fromAirport
        const to = updatedLocation["toAirport"] !== undefined ? updatedLocation["toAirport"] : this.initialInput.toAirport

        this.requestBody["remarks"]["Location"] = `${trip} ${from}-${to}`


        // Check the remarks keys that are not changed
        if (this.requestBody["remarks"] && (this.initialInput.remarks || this.initialInput.fromAirport)){
          if (!this.requestBody["remarks"]['Notes']){
            this.requestBody["remarks"]["Notes"] = this.initialInput.remarks
          }
          if (!this.requestBody["remarks"]['Location'] && this.initialInput.fromAirport) {
            this.requestBody["remarks"]["Location"] = this.initialInput.fromAirport
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
      return `Are you sure you want to update this action?`;
    },
    openDialog(item) {
      this.dialog = true;
      const originalDate = new Date(item.date);
      const formattedDate = originalDate
        .toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .reverse()
        .join("-");

      this.id = item.id;
      this.initialInput.date = this.updateInput.date = formattedDate;
      this.main_category = item.main_category;
      this.sub_category = item.sub_category;
      this.initialInput.amount = this.updateInput.amount = item.amount;
      this.initialInput.fromAirport = this.updateInput.fromAirport =
        item.remarks["Location"] ? (item.remarks["Location"].split(" ")[2]) : null;
      this.initialInput.toAirport = this.updateInput.toAirport =
        item.remarks["Location"] ? (item.remarks["Location"].split(" ")[4]) : null;
      this.initialInput.roundTrip = this.updateInput.roundTrip =
        item.remarks["Location"] ? (item.remarks["Location"].split(" ")[0] === "Round" ? true : false) : null;
      this.initialInput.remarks = this.updateInput.remarks =
        item.remarks["Notes"] ? item.remarks['Notes'] : null;
    },
    closeDialog() {
      this.dialog = false;
      this.reset();
    },
    reset() {
      this.checkbox = false;
      this.id = null,
      this.main_category = null;
      this.sub_category = null;
      this.valueChanged = {};
      this.requestBody = {};

      this.updateInput = {
        date: null,
        amount: null,
        fromAirport: null,
        toAirport: null,
        roundTrip: null,
        remarks: null,
      };

      this.initialInput = {
        date: null,
        amount: null,
        fromAirport: null,
        toAirport: null,
        roundTrip: null,
        remarks: null,
      };
    },
  },
};
</script>