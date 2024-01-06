<template>
  <div>
    <div ref="chart" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    // Initialize the chart
    this.myChart = echarts.init(this.$refs.chart);

    // Set the chart options
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    };

    // Set the options and render the chart
    this.myChart.setOption(option);
  },
  beforeDestroy() {
    // Dispose of the chart when the component is destroyed to prevent memory leaks
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
