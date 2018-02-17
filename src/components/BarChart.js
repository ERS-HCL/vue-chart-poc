import { Bar } from 'vue-chartjs';

export default {
  name: 'BarChart',
  extends: Bar,
  props: ['data', 'options'],
  mounted() {
    // Overwriting base render method with actual data.
    console.log("----- ",this.data);
    this.renderChart(this.data, this.options);
  }
};