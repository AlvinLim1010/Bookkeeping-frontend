<template>
  <v-container fluid>
    <v-card>
      <v-data-table 
        theme="dark" 
        :headers="headers"
        :items="items"
        :fixed-header="true"
        v-if="this.$store.state.user.username"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>My Data Table</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                class="ma-1"
                @click="refreshData()"
              >
                <v-icon>mdi-restart</v-icon>
                <span>Refresh</span>
              </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
            size="small"
            class="me-2"
            @click="updateItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>

      <v-card-text
        v-else
      >
        <DialogAccessProfile
          :customText="customText"
          @open-login="openLoginDialog"
        />
      </v-card-text>

    </v-card>
  </v-container>

  <DeleteNormalActionsDialogs
    @removeData = "removeData"
    ref="deleteNormalActionsDialogs" 
  />

  <DeleteFlightActionsDialogs
    @removeData = "removeData"
    ref="deleteFlightActionsDialogs" 
  />

  <DeletePetrolActionsDialogs
    @removeData = "removeData"
    ref="deletePetrolActionsDialogs" 
  />

  <UpdateNormalActionsDialogs
    @refreshData = "refreshData"
    ref="updateNormalActionsDialogs" 
  />

  <UpdatePetrolActionsDialogs
    @refreshData = "refreshData"
    ref="updatePetrolActionsDialogs" 
  />

  <UpdateFlightActionsDialogs
    @refreshData = "refreshData"
    ref="updateFlightActionsDialogs" 
  />

  <UserRegister 
    @open-login="openLoginDialog"
    ref="userRegister" 
  />
  <UserLogin 
    @open-register="openRegisterDialog"
    @open-forgetpassword="openForgetPasswordDialog"
    ref="userLogin"
  />
  <UserForgetPassword 
    @open-login="openLoginDialog"
    ref="userForgetPassword"
  />
  <UserResetPassword 
    ref="userResetPassword"
  />
</template>

<script>
import { CustomDialogText } from "../helper/enums"
import DialogAccessProfile from './shared/DialogAccessProfile.vue'
import UserRegister from '../views/users/Register.vue'
import UserLogin from '../views/users/Login.vue'
import UserForgetPassword from '../views/users/ForgotPassword.vue'
import UserResetPassword from '../views/users/ResetPassword.vue'

import UpdateNormalActionsDialogs from '../views/dialogs/updateDialogs/NormalActionsDialogs.vue'
import UpdatePetrolActionsDialogs from '../views/dialogs/updateDialogs/PetrolActionsDialogs.vue'
import UpdateFlightActionsDialogs from '../views/dialogs/updateDialogs/FlightActionsDialogs.vue'
import DeleteNormalActionsDialogs from '../views/dialogs/deleteDialogs/NormalActionsDialogs.vue'
import DeletePetrolActionsDialogs from '../views/dialogs/deleteDialogs/PetrolActionsDialogs.vue'
import DeleteFlightActionsDialogs from '../views/dialogs/deleteDialogs/FlightActionsDialogs.vue'

let httpRequest = require("../helper/httpRequests");
import { Actions, TravelSubActions } from "../helper/enums"
import { getBackEndServer } from "../helper/commons";

export default {
  name: "Table",

  components: {
    DialogAccessProfile,
    UserRegister,
    UserLogin,
    UserForgetPassword,
    UserResetPassword,
    UpdateNormalActionsDialogs,
    UpdatePetrolActionsDialogs,
    UpdateFlightActionsDialogs,
    DeleteNormalActionsDialogs,
    DeletePetrolActionsDialogs,
    DeleteFlightActionsDialogs,
  },
  async mounted() {
    if (this.$store.state.user.username){
      await this.getTableData()
    }
  },
  data() {
    return {
      headers: [
        { title: 'Date', align: 'center', value: 'date' },
        { title: 'Main Action', align: 'center', value: 'main_category' },
        { title: 'Sub Action', align: 'center', value: 'sub_category' },
        { title: 'Remarks', align: 'center', value: 'remarks' },
        {
          title: 'Amount',
          align: 'center',
          children: [
            { title: 'Debit', align: 'center', value: 'debit' }, // Incoming Money
            { title: 'Credit', align: 'center', value: 'credit' }, // Outgoing Money
          ],
        },
        { title: 'Total', align: 'center', value: 'total' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      items: [],
      customText: CustomDialogText.ACTIONTABLE
    };
  },
  methods: {
    removeData(action_id){
      this.items = this.items.filter(item => item.id !== action_id)
    },
    async refreshData(){
      await this.getTableData()
    },
    async getTableData(){
      var requestBody = {
        "username": this.$store.state.user.username
      }

      let result = await httpRequest.axiosRequest(
        "post",
        getBackEndServer(), 
        Actions.GETACTIONS, 
        requestBody,
      )

      if (result.data.length > 0){
        result.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        let total = 0;

        this.items = result.data.map(item => {
          const isIncome = item.main_category === 'Income';
          const amount = parseFloat(item.amount) || 0; 

          total += isIncome ? amount : -amount;
          const date = new Date(item.date)
          const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

          return {
            id: item.id,
            date: formattedDate,
            main_category: item.main_category,
            sub_category: item.sub_category,
            remarks: (typeof item.remarks === 'object' && Object.keys(item.remarks).length === 0) ? '' : item.remarks,
            debit: isIncome ? item.amount : '', 
            credit: !isIncome ? item.amount : '', 
            amount: item.amount,
            total: total.toFixed(2),
          };
        });

        this.items.reverse()
      }
    },
    deleteItem(item){
      if (item.sub_category === TravelSubActions.FLIGHT){
        this.$refs.deleteFlightActionsDialogs.openDialog(item)
      } else if (item.sub_category === TravelSubActions.PETROL){
        this.$refs.deletePetrolActionsDialogs.openDialog(item)
      } else {
        this.$refs.deleteNormalActionsDialogs.openDialog(item)
      }
    },
    updateItem(item){
      if (item.sub_category === TravelSubActions.FLIGHT){
        this.$refs.updateFlightActionsDialogs.openDialog(item)
      } else if (item.sub_category === TravelSubActions.PETROL){
        this.$refs.updatePetrolActionsDialogs.openDialog(item)
      } else {
        this.$refs.updateNormalActionsDialogs.openDialog(item)
      }
    },
    openLoginDialog(){
      this.$refs.userLogin.openDialog()
    },
    openRegisterDialog(){
      this.$refs.userRegister.openDialog()
    },
    openForgetPasswordDialog(){
      this.$refs.userForgetPassword.openDialog()
    },
    openResetPasswordDialog(){
      this.$refs.userResetPassword.openDialog()
    }
  }

}
</script>

<style>

</style>