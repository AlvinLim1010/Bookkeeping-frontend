<template>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <v-card>
      <v-col>
        <v-row class="mt-2">
          <v-col>
            <v-text-field
              v-model="date"
              label="Date"
              rounded
              filled
              readonly
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
              v-model="amount"
              label="Amount"
              rounded
              filled
              readonly
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="remarks"
              label="Remarks"
              rounded
              filled
              readonly
            />
          </v-col>
        </v-row>
    
        <v-row>
          <v-col>
            <v-alert border="top" color="red" dark>
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

      id: null,
      date: null,
      main_category: null,
      sub_category: null,
      amount: null,
      remarks: null,
    }
  },
  methods: {
    async btnConfirm() {
      console.log("CONFIRM")
    },
    disableConfirm() {
      if (!this.checkbox) {
        return true;
      }
      return false;
    },
    getText() {
      return `Are you sure you want to delete this action?`
    },
    openDialog(item) {
      this.dialog = true;

      this.id = item.id
      this.date = item.date
      this.main_category = item.main_category
      this.sub_category = item.sub_category
      this.amount = item.amount
      this.remarks = item.remarks
    },
    closeDialog() {
      this.dialog = false;
      this.reset()
    },
    reset(){
      this.checkbox = false;
      this.id = null;
      this.date = null;
      this.main_category = null;
      this.sub_category = null;
      this.amount = null;
      this.remarks = null;
    }
  },
};
</script>