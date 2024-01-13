<template>
  <v-card v-show="card">
    <div ref="chart" :style="cardStyle"></div>
  </v-card>
</template>

<script>
import * as echarts from 'echarts';
import { MainActions } from "../../helper/enums"

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
      category: Array(),
      value: Object(),
      cardStyle: null,
    };
  },
  mounted() {
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
      for (const item of this.items){
        const main_cat = item.main_category === MainActions.INCOME ? "Saved" : item.main_category
        if (!this.category.includes(main_cat)){
          this.category.push(main_cat)
        }
        this.value[main_cat] = (this.value[main_cat] || 0) + item.amount;
      }

      const sumOfExpenses = Object.keys(this.value)
        .filter(key => key !== "Saved")
        .reduce((sum, key) => sum + this.value[key], 0);

      this.value["Saved"] -= sumOfExpenses;

      this.visualiseItem = Object.entries(this.value).map(([key, value]) => ({ name: key, value:value.toFixed(2) }));
    },
    async openCard(){
      this.card = true
      await this.updateItems()
      this.myChart = echarts.init(this.$refs.chart);
      this.buildChart(); 
    },
    buildChart(){
      const option = {
        legend: {
          orient: 'vertical', 
          x: 'left', 
          data: this.category,
        },
        series: [
          {
            name: 'Doughnut Chart',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside', 
              formatter: '{b}: {d}%', 
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold',
                formatter: '{b}: {c}', 
              },
            },
            labelLine: {
              show: true,
              length: 15,
              length2: 3,
              minShowLabelLine: 0.1
            },
            data: this.visualiseItem
          },
        ],
      };

      this.myChart.setOption(option);
    },
    async updateChart() {
      await this.updateItems()
      this.buildChart(); 
    }
  }
};
</script>
