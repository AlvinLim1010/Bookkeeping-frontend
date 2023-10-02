<template>
  <div class="register">
    <div class="d-flex justify-center text-center" style="background:gray">
      <v-card width="300px">
        <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-decoration-underline">Register Page</v-card-title>
        <v-card-text>
          Fill in the Form
        </v-card-text>
      </v-card>
    </div>

    <v-divider :thickness="10" style="color:black"></v-divider>

    <v-alert :type="alert_type" :title="title_text" :text="content_text" v-model="alert"></v-alert>

    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail>
        <v-text-field v-model="username" label="Username" :rules="username_rules" required></v-text-field>
        <v-text-field v-model="phone_number" label="Phone Number" :rules="phone_number_rules" required></v-text-field>
        <v-btn class="me-4" type="submit" @click.prevent="submitUser">Submit</v-btn>
        <v-btn class="me-4" type="clear" @click.prevent="clear">Clear</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup>
  const username_rules = [
    username => {
      if (username?.length >= 3 && username?.length <= 20) return true
      return 'Username must be between 4 to 20 characters.'
    },
  ]

  const phone_number_rules = [
    phone_number => {
      if (/[^0-9]/.test(phone_number)) return 'Phone Number can not contain alphabet.'
      return true
    }]
</script>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      alert: false,
      alert_type: "success",
      title_text: "",
      content_text: "",
      username: '',
      phone_number: ''
    }
  },
  methods: {
    submitUser() {
      console.log(this.username)
      console.log(typeof(this.phone_number))
      
      axios.post('register', {"username": this.username, "phone_number": parseInt(this.phone_number)})
        .then(response => {
          console.log(response);
          this.alert = true;
          this.alert_type = "success";
          this.title_text = "User has been Successfully Added";
          this.content_text = this.username + " with Phone Number, " + this.phone_number + ", has been Added to the Database";
          this.clear();
          this.updateAlert();
        })
        .catch(error => {
          console.log(error);
          this.alert = true;
          this.alert_type = "error";
          this.title_text = "Error";
          this.content_text = "Duplicate Phone Number is not Valid";
          this.updateAlert();
        })
    },
    clear() {
      this.username = '';
      this.phone_number = '';
    },
    updateAlert() {
        window.setInterval(() => {
            this.alert = false;
        }, 3000)    
    }
  }
}
</script>

<style>

</style>