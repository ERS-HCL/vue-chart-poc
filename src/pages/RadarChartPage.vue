<template>
   <div class="container" >
    <div class="row">
      <div class="col-sm-6 col-md-6">
        <div class="card">
          <div class="card-block">
            <h4 class="card-title">{{title}}</h4>
            <p class="card-text" v-if="datacollection">
              <radar-chart :data="datacollection" :options="{responsive: true, maintainAspectRatio: false}"></radar-chart>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="errors">{{errors}}</div>
  </div>
</template>

<script>
import RadarChart from '@/components/RadarChart';
import chartService from '@/services/ChartService';

export default {
  name: 'RadarChartPage',
  components: { RadarChart },
  data() {
    return {
      title: "Radar Chart",
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
      self.chartService.getPolarChartData().then(data => {
         console.log(data);
         self.datacollection = data;
         var bcolor = ["#C0CCC0","#E40051"];
          for(let i=0; i<self.datacollection.datasets.length;i++){
            self.datacollection.datasets[i].backgroundColor = bcolor[i];
          }
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
<style>
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
