import { Bubble } from 'vue-chartjs';

export default {
  name: 'BubbleChart',
  extends: Bubble,
  props: ['data', 'options'],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  }
};