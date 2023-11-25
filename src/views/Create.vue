<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="min-height: 100vh">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card elevation="5">
          <v-card-title>Enter the details to add one action</v-card-title>
          <v-card-text class="text-center">
            <v-form ref="form" fast-fail @submit.prevent>
              <v-row justify="space-between" class="mt-2">
                <v-select
                  class="ml-3 mr-2"
                  style="width: 44%;"
                  v-model="selectedMainAction"
                  :items="mainActions"
                  label="Select a main-action"
                ></v-select>

                <v-select
                  class="ml-3 mr-2"
                  style="width: 44%;"
                  v-model="selectedSubAction"
                  :items="subActions"
                  label="Select a sub-action"
                ></v-select>
              </v-row>

              <v-row justify="space-between">
                <v-text-field
                  class="ml-3 mr-2"
                  style="width: 44%;"
                  v-model="amount"
                  label="Amount"
                  required
                ></v-text-field>

                <v-text-field 
                  class="ml-3 mr-2"
                  style="width: 44%;"
                  v-model="selectedDate"
                  type="date" 
                  label="Date"
                ></v-text-field>
              </v-row>

              <v-text-field
                v-model="remarks"
                label="Remarks"
                required
              ></v-text-field>

              <v-divider />

              <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="primary"
              ></v-progress-linear>

              <v-card-actions>
                <v-row justify="space-between">
                  <v-btn type="submit" class="mt-3 ml-3" style="width: 44%;" color="primary" >
                    Create Action
                  </v-btn>
                  <v-btn type="clear" class="mt-3 mr-3" style="width: 44%;" @click="reset">
                    Clear
                  </v-btn>
                </v-row>
              </v-card-actions>

            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    const defaultActions = {
      selectedMain: "Food",
      selectedSub: "Breakfast",
      main: ["Food", "Travel", "Household", "Income", "Misc"],
      sub: ["Breakfast", "Lunch", "Dinner", "Grocery", "Others"]
    };

    return {
      selectedDate: this.getCurrentDate(),
      amount: 0,
      remarks: null,
      loading: false,
      defaultActions: defaultActions,
      selectedMainAction: defaultActions.selectedMain,
      selectedSubAction: defaultActions.selectedSub,
      mainActions: defaultActions.main,
      subActions: defaultActions.sub
    };
  },
  watch: {
    selectedMainAction(newMainAction) {
      this.updateSubActions(newMainAction);
    },
    selectedSubAction(newSubAction) {
      switch (newSubAction) {
        case "Petrol":
          console.log("ODOMETER")
          break;
        default:
          console.log("NOTHING")
          break;
      }
    }
  },
  methods: {
    reset() {
      this.selectedDate = this.getCurrentDate()
      this.amount = 0
      this.remarks = null
      this.selectedMainAction = this.defaultActions.selectedMain,
      this.selectedSubAction = this.defaultActions.selectedSub,
      this.mainActions = this.defaultActions.main,
      this.subActions = this.defaultActions.sub
    },
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
      const day = today.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
    updateSubActions(mainAction) {
      switch (mainAction) {
        case "Food":
          this.subActions = ["Breakfast", "Lunch", "Dinner", "Grocery"];
          break;
        case "Income":
          this.subActions = ["Salary", "Birthday Present"];
          break;
        case "Travel":
          this.subActions = ["Petrol", "Flight", "Parking"];
          break;
        case "Household":
          this.subActions = ["Utility", "Rental"];
          break;
        case "Misc":
          this.subActions = ["Dog + Parents"];
          break;
      }
      
      this.subActions.push("Others")
      this.selectedSubAction = this.subActions[0]
    }
  }
}
</script>
