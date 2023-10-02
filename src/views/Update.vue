<template>
    <div class="update">
        <div class="d-flex justify-center text-center" style="background:gray">
            <v-card width="300px">
            <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-decoration-underline">Update Page</v-card-title>
            <v-card-text>
                Enter the Phone Number to Edit
            </v-card-text>
            </v-card>
        </div>
    
        <v-divider :thickness="10" style="color:black"></v-divider>

        <v-alert :type="alert_type" :title="title_text" :text="content_text" v-model="alert"></v-alert>
        
        <v-sheet width="300" class="mx-auto">
            <v-form fast-fail>
                <v-text-field v-model="old_phone_number" label="Old Phone Number" :rules="phone_number_rules" required></v-text-field>
                <v-text-field v-model="new_phone_number" label="New Phone Number" :rules="phone_number_rules"></v-text-field>
                <v-text-field v-model="new_username" label="New Username" :rules="username_rules"></v-text-field>
                <v-btn class="me-4" type="submit" @click.prevent="updateUser">Update</v-btn>
                <v-btn class="me-4" type="clear" @click.prevent="clear">Clear</v-btn>
            </v-form>
        </v-sheet>
    </div>
  </template>

<script setup>
    const username_rules = [
        username => {
        if (username?.length <= 20) return true
        return 'Username must be less than 20 characters.'
    }]

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
            title_text: '',
            content_text: '',
            old_phone_number: '',
            new_phone_number: '',
            new_username: '',
            data: {}
        }
    },
    methods: {
        updateUser() {
            if (this.new_phone_number && this.new_username) {
                this.data = {"phone_number": parseInt(this.old_phone_number), 
                            "new_phone_number": parseInt(this.new_phone_number), 
                            "new_username": this.new_username};
            } else if (this.new_phone_number && !this.new_username) {
                this.data = {"phone_number": parseInt(this.old_phone_number), 
                            "new_phone_number": parseInt(this.new_phone_number)}
            } else if (!this.new_phone_number && this.new_username) {
                this.data = {"phone_number": parseInt(this.old_phone_number), 
                            "new_username": this.new_username}
            } else {
                this.data = {}
            }

            axios.patch('records', this.data)
                .then(response => {
                    console.log(response);
                    this.alert = true;
                    this.alert_type = "success";
                    this.title_text = "Phone Number successfully updated";
                    this.content_text = "User with Phone Number, " + this.old_phone_number + ", has been updated in the Database";
                    this.clear()
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
            this.old_phone_number = '';
            this.new_phone_number = '';
            this.new_username = '';
            this.data = {};
        },
        updateAlert() {
            window.setInterval(() => {
                this.alert = false;
            }, 2000)    
        }
    }
}
</script>
  