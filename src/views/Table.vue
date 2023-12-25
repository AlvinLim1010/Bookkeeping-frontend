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
            @click="editItem(item)"
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

let httpRequest = require("../helper/httpRequests");
import { Actions } from "../helper/enums"
import { getBackEndServer } from "../helper/commons";

export default {
  name: "Table",

  components: {
    DialogAccessProfile,
    UserRegister,
    UserLogin,
    UserForgetPassword,
    UserResetPassword,
  },
  async created() {
    await this.getTableData()
  },
  data() {
    return {
      headers: [
        { title: 'Date', align: 'center', value: 'date' },
        { title: 'Main Action', align: 'center', value: 'mainAction' },
        { title: 'Sub Action', align: 'center', value: 'subAction' },
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
      items: Array(15).fill({
        date: 'African Elephant',
        mainAction: 'Loxodonta africana',
        subAction: 'Herbivore',
        remarks: 'Savanna, Forests',
        debit: 'Savanna, Forests',
        total: 'Savanna, Forests',
      }),
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

      console.log(result.data)
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