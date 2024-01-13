<template>
  <v-card v-show="card">
    <div ref="chart" :style="cardStyle"></div>
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
      cardStyle: null,
    }
  },
  mounted(){
    this.style()
  },  
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
  methods: {
    style(){
      this.cardStyle = {
        width: `${(window.innerWidth / 2) - 53}px`,
        height: "400px"
      }
    },
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
    async openCard() {
      this.card = true;
      await this.updateItems();
      this.visualiseItem.reverse();
      await this.getDate();
      await this.getAmount();

      this.myChart = echarts.init(this.$refs.chart);
      this.buildChart(); 
    },
    buildChart() {
      const option = {
        xAxis: {
          type: "category",
          data: this.date,
          name: "Date",
          nameLocation: "middle",
          nameGap: 35,
        },
        yAxis: {
          type: "value",
          name: "Amount (MYR)",
          nameLocation: "middle",
          nameGap: 55,
        },
        series: [
          {
            data: this.amount,
            type: "line",
          },
        ],
      };

      this.myChart.setOption(option);
    },
    async updateChart() {
      await this.updateItems();
      this.visualiseItem.reverse();
      await this.getDate();
      await this.getAmount();

      this.buildChart(); 
    }
  }
};
</script>
