<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-6 col-md-6">
        <div class="card">
            <div class="card-block">
              <h4 class="card-title">{{title}}</h4>
              <p class="card-text" v-if="datacollection">
                <bar-chart :data="datacollection" :options="{responsive: true, maintainAspectRatio: false}"></bar-chart>
              </p>
            </div>
          </div>
      </div>
    </div>
     <div class="col-sm-6 col-md-6">
    
      <table class="table table-bordered">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Created At</th>
        </tr>
        <tr >
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
     
    
     </div>
    <div class="row" v-if="errors">{{errors}}</div>
  </div>
</template>

<script>

import BarChart from '@/components/BarChart';
import chartService from '@/services/ChartService';
import VuePagination from '@/components/Pagination.vue';

export default {
  name: 'BarChartPage',
  components: { BarChart,VuePagination },
  data() {
    return {
      title: "Bar Chart",
      datacollection: undefined,
      errors: undefined,
      gitdata: {
            total: 0,
            per_page: 2,
            from: 1,
            to: 0,
            current_page: 1
        },
      offset: 4,
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
      return self.chartService.getChartData().then(data => {
         console.log(data);
         self.datacollection = data;
      },
      function(error) {
        //console.log(error);
        self.errors = error;
      });
    }
  },
  mounted: function () {
    this.getData().then(()=>{
      console.log('loaded', this.datacollection);
    });
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
