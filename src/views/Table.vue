<template>
  <v-container fluid>
    <v-card>
      <v-data-table 
        theme="dark" 
        :headers="headers"
        :items="items"
        :fixed-header="true"
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
    </v-card>
  </v-container>
</template>

<script>
export default {
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
    };
  },

}
</script>

<style>

</style>