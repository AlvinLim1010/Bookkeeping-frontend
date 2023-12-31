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

  <DeleteActionsDialogs
    ref="deleteActionsDialogs" 
  />

  <NormalActionsDialogs
    ref="normalActionsDialogs" 
  />

  <PetrolActionsDialogs
    ref="petrolActionsDialogs" 
  />

  <FlightActionsDialogs
    ref="flightActionsDialogs" 
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

import NormalActionsDialogs from '../views/dialogs/updateDialogs/NormalActionsDialogs.vue'
import PetrolActionsDialogs from '../views/dialogs/updateDialogs/PetrolActionsDialogs.vue'
import FlightActionsDialogs from '../views/dialogs/updateDialogs/FlightActionsDialogs.vue'
import DeleteActionsDialogs from '../views/dialogs/DeleteActionsDialogs.vue'

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
    NormalActionsDialogs,
    PetrolActionsDialogs,
    FlightActionsDialogs,
    DeleteActionsDialogs,
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
    async getTableData(){
      var username = this.$store.state.user.username;

      let result = await httpRequest.axiosGetRequest(
        getBackEndServer(), 
        Actions.GETACTIONS, 
        { username },
      )

      if (result.data.length > 0){
        result.data.sort((a, b) => new Date(b.date) - new Date(a.date));
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
      }
    },
    deleteItem(item){
      this.$refs.deleteActionsDialogs.openDialog(item)
    },
    updateItem(item){
      if (item.sub_category === TravelSubActions.FLIGHT){
        this.$refs.flightActionsDialogs.openDialog(item)
      } else if (item.sub_category === TravelSubActions.PETROL){
        this.$refs.petrolActionsDialogs.openDialog(item)
      } else {
        this.$refs.normalActionsDialogs.openDialog(item)
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