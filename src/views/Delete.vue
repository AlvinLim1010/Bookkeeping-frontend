<template>
    <div class="delete">
        <div class="d-flex justify-center text-center" style="background:gray">
            <v-card width="300px">
            <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-decoration-underline">Delete Page</v-card-title>
            <v-card-text>
                Enter the Phone Number to Delete
            </v-card-text>
            </v-card>
        </div>

        <v-divider :thickness="10" style="color:black"></v-divider>

        <v-alert :type="alert_type" :title="title_text" :text="content_text" v-model="alert"></v-alert>

        <v-sheet width="300" class="mx-auto">
            <v-form fast-fail>
                <v-text-field v-model="phone_number" label="Phone Number" :rules="phone_number_rules" required></v-text-field>
                <v-btn class="me-4" type="submit" @click.prevent="deleteUser">Delete</v-btn>
                <v-btn class="me-4" type="clear" @click.prevent="clear">Clear</v-btn>
            </v-form>
        </v-sheet>      
    </div>
  </template>
  
<script setup>
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
            phone_number: ''
        }
    },
    methods: {
        deleteUser() {
            axios.delete('records', {data: {"phone_number": parseInt(this.phone_number)}})
                .then(response => {
                    console.log(response)
                    this.alert = true;
                    this.alert_type = "success";
                    this.title_text = "User has been Successfully Deleted";
                    this.content_text = "User with Phone Number, " + this.phone_number + ", has been Deleted from the Database";
                    this.clear();
                    this.updateAlert();
                })
                .catch(error => {
                    console.log('404');
                    console.log(error);
                    this.alert = true;
                    this.alert_type = "error";
                    this.title_text = "Error";
                    this.content_text = "Phone Number is not Valid";
                    this.updateAlert();
                })
        },
        clear() {
            this.phone_number = '';
        },
        updateAlert() {
            window.setInterval(() => {
                this.alert = false;
            }, 1500)    
        }
    }
}
</script>
  