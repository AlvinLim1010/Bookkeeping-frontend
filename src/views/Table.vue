<template>
  <v-container fluid>
    <v-card>
      <v-data-table 
        theme="dark" 
        :items="items"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          name: 'African Elephant',
          species: 'Loxodonta africana',
          diet: 'Herbivore',
          habitat: 'Savanna, Forests',
        },
        // ... more items
      ]
    };
  },

}
</script>

<style>

</style>