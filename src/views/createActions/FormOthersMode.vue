<template>
  <span>
    <v-row>
      <v-text-field
        class="ml-3 mr-3"
        v-model="subAction"
        label="Enter the action detail"
        filled
      ></v-text-field>
    </v-row>
  </span>
</template>

<script>
export default {
  data() {
  return {
    subAction: null
  };
},
}
</script>
