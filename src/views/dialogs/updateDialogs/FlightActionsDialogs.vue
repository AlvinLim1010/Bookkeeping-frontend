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
              v-model="updateInput.main_category"
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
              v-model="updateInput.sub_category"
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
export default {
  data() {
    return {
      dialog: false,
      checkbox: false,

      initialInput: {
        id: null,
        date: null,
        main_category: null,
        sub_category: null,
        amount: null,
        fromAirport: null,
        toAirport: null,
        roundTrip: null,
        remarks: null,
      },

      updateInput: {
        id: null,
        date: null,
        main_category: null,
        sub_category: null,
        amount: null,
        fromAirport: null,
        toAirport: null,
        roundTrip: null,
        remarks: null,
      },
    };
  },
  methods: {
    async btnConfirm() {
      console.log("CONFIRM");
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

      console.log(item.remarks["Location"].split(" "));

      this.initialInput.id = this.updateInput.id = item.id;
      this.initialInput.date = this.updateInput.date = formattedDate;
      this.initialInput.main_category = this.updateInput.main_category =
        item.main_category;
      this.initialInput.sub_category = this.updateInput.sub_category =
        item.sub_category;
      this.initialInput.amount = this.updateInput.amount = item.amount;
      this.initialInput.fromAirport = this.updateInput.fromAirport =
        item.remarks["Location"].split(" ")[2];
      this.initialInput.toAirport = this.updateInput.toAirport =
        item.remarks["Location"].split(" ")[4];
      this.initialInput.roundTrip = this.updateInput.roundTrip =
        item.remarks["Location"].split(" ")[0] === "Round" ? true : false;
      this.initialInput.remarks = this.updateInput.remarks =
        item.remarks["Notes"];
    },
    closeDialog() {
      this.dialog = false;
      this.reset();
    },
    reset() {
      this.checkbox = false;

      this.updateInput = {
        id: null,
        date: null,
        main_category: null,
        sub_category: null,
        amount: null,
        fromAirport: null,
        toAirport: null,
        roundTrip: null,
        remarks: null,
      };

      this.initialInput = {
        id: null,
        date: null,
        main_category: null,
        sub_category: null,
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