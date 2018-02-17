import { PolarArea } from 'vue-chartjs';

export default {
  name: 'PolarChart',
  extends: PolarArea,
  props: ['data', 'options'],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  }
};