import { Doughnut } from 'vue-chartjs';

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  props: ['data', 'options'],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  }
};