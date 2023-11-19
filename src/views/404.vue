<template>
    <div class="error" style="height: 100%; background-color: #f5f5f5;">
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-card class="elevation-12" width="400">
            <v-card-title 
              class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-decoration-underline" 
            >
              Oops! Page not found
            </v-card-title>
            <v-card-text class="text-h6">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    name: "Error404",
  };
  </script>
  