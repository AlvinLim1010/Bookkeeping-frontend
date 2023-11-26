<template>
  <v-app app>
    <v-container fluid>
      <v-card-title class="grey lighten-5">
        Today {{ todaysDate }}
      </v-card-title>

      <!-- Shows the number of actions stored based on the type of actions. For example
        Total: 15
        Travel: 5
        Household: 10 
        
        Record from STARTING DATE to ENDING DATE
      -->
        <v-card 
          color="indigo" 
          variant="flat"
        >
          <v-card-title>Record Actions Information</v-card-title>
          <v-card-subtitle class="white--text">
            This section reveals how many records you have and the timeframe they cover, from the beginning to the end.
          </v-card-subtitle>
          <v-card-text>
            <div class="my-2">
              <v-row>
                <v-col cols="2">
                  <v-card-text class="text-h5 white--text">
                    Title: 
                  </v-card-text>
                </v-col>
                <v-col cols="1">
                  <v-card-text class="text-h5 white--text">
                    {{ modelData.data.totalActions }}
                  </v-card-text>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>

      <v-card 
        class="mt-5" 
        color="indigo" 
        variant="flat"
      >
        <v-card-title
          >Last 7 days statistics
        </v-card-title>
        <v-card-subtitle>
          This section displays the types of actions that have been previously added.
        </v-card-subtitle>
        <v-expansion-panels focusable>
          <v-expansion-panel
            v-for="(item, index) in modelData.data.previousActions"
            :key="index"
          >
            <v-expansion-panel-title 
              class="font-weight-medium" 
              color="indigo-darken-3" 
              variant="elevated"
            >
              {{ item.date }} Total : {{ item.count }}
            </v-expansion-panel-title>
            
            <v-card
              color="indigo-darken-3" 
              variant="tonal"
            >
              <v-expansion-panel-text>
                <v-row v-for="title in modelData.actionTypes" :key="title">
                  
                    <v-col>
                      <v-card-subtitle class="black--text">
                        {{ title }}:
                      </v-card-subtitle>
                    </v-col>
                    
                    <v-col>
                      <v-card-subtitle>
                        {{ item[title.toLowerCase()] }}
                      </v-card-subtitle>
                    </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-card>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: "Overview",

  data() {
    return {
      todaysDate: this.getCurrentDate(),
      modelData: {
        data: {
          totalActions: 0,
          previousActions: [1, 2]
        },
        actionTypes: ["Income", "Food", "Travel", "Household", "Others"]
      }
    };
  },
  methods: {
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
      const day = today.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
  }
};
</script>
