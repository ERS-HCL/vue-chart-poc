<template>
   <div class="container" >
    <div class="row">
      <div class="col-sm-6 col-md-6">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title">{{title}}</h4>
            <p class="card-text" v-if="datacollection">
              <bubble-chart :data="datacollection" :options="{responsive: true, maintainAspectRatio: false}"></bubble-chart>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="errors">{{errors}}</div>
  </div>
</template>

<script>
import BubbleChart from '@/components/BubbleChart';
import chartService from '@/services/ChartService';

export default {
  name: 'BubbleChartPage',
  components: { BubbleChart },
  data() {
    return {
      title: "Bubble Chart",
      datacollection: undefined,
      errors: undefined
    };
  },
  props: {
    chartService: {
      default: ()=>chartService
    }
  },
  methods: {
    getData() {
      var self = this;
      self.chartService.getBubbleChartData().then(data => {
         console.log(data);
         self.datacollection = data;
      },
      function(error) {
        self.errors = error;
      });
    }
  },
  mounted: function () {
    this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p.card-text canvas {
  margin: auto;
}
</style>
