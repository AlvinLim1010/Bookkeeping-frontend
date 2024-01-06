<template>
  <v-card v-show="card">
    <div ref="chart" style="width: 600px; height: 400px"></div>
  </v-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      card: false,
      myChart: null,
      visualiseItem: Object(),
      date: Array(),
      amount: Array(),
      options: null
    }
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
  methods: {
    async updateItems(){
      let seenDates = new Set();
      this.visualiseItem = this.items.filter(element => {
          const date = element.date;
          if (!seenDates.has(date)) {
              seenDates.add(date);
              return true;
          }
          return false;
      });
    },
    async getDate(){
      this.date = this.visualiseItem.map(element => {
        return element.date
      })
    },
    async getAmount(){
      this.amount = this.visualiseItem.map(element => {
        return element.total
      })
    },
    async openCard(){
      this.card = true
      await this.updateItems()
      this.visualiseItem.reverse()
      await this.getDate()
      await this.getAmount()

      this.myChart = echarts.init(this.$refs.chart);

      this.option = {
        xAxis: {
          type: "category",
          data: this.date,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.amount,
            type: "line",
          },
        ],
      };

      this.myChart.setOption(this.option);
    }
  }
};
</script>

<style>
</style>