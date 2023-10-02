<template>
  <div class="records">
    <div class="d-flex justify-center text-center" style="background:gray">
    <v-card width="300px">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-decoration-underline">Records Page</v-card-title>
      <v-card-text>
        Database Results
      </v-card-text>
    </v-card>
  </div>

  <v-divider :thickness="10" style="color:black"></v-divider>

  <v-alert :type="alert_type" :title="title_text" :text="content_text" v-model="alert"></v-alert>

  <div v-if="users.length > 0">
    <v-card class="mx-auto" max-width="500">
    
      <v-card-title>User List</v-card-title>

      <v-divider></v-divider>

      <v-virtual-scroll :items="users" height="450" item-height="48">
        <template v-slot:default="{ item }">
          <v-list-item
            :title="`${item.username}`"
            :subtitle="`Phone Number: ${item.phone_number}`"
          >
            <template v-slot:prepend>
              <v-icon class="bg-primary">mdi-account</v-icon>
            </template>

            <template v-slot:append>
              <v-btn icon="mdi-delete" size="x-small" variant="tonal" @click.prevent="deleteUser(item.phone_number)"></v-btn>
            </template>
            
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>

  <div class="d-flex justify-center text-center" v-else>No users found in database...</div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      alert: false,
      alert_type: "success",
      title_text: "",
      content_text: "",
      users: []
    }
  },  
  methods: {
    deleteUser(phone_number) {
      axios.delete('records', {data: {"phone_number": parseInt(phone_number)}})
        .then(response => {
          console.log(response)
          this.alert = true;
          this.alert_type = "success";
          this.title_text = "User has been Successfully Deleted";
          this.content_text = "User with Phone Number, " + phone_number + ", has been Deleted from the Database";
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
    updateAlert() {
        window.setInterval(() => {
            this.alert = false;
            window.location.reload();
        }, 2000)    
    }
  },
  mounted() {
    axios.get('records')
      .then(response => {
        this.users = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style>

</style>
