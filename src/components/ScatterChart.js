import { Scatter } from 'vue-chartjs';

export default {
  name: 'ScatterChart',
  extends: Scatter,
  props: ['data', 'options'],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  }
};