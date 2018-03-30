<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-md-6">
                <div class="card">
                    <div class="card-block">
                        <p class="card-text" v-if="datacollection">
                            <line-chart :data="datacollection" :options="{title: {display: true,text: 'World population per region (in millions)'}}"></line-chart>
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-md-6" style="float:left;" v-if="currentPageData">
                <div class="card">
                    <div class="card-block">
                        <table width="100%">
                         <caption>{{title}}</caption>
                            <thead>
                                <tr v-if="datacollection">
                                    <th>Country</th><th v-for="l in datacollection.labels">{{l}}</th>  
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="d in currentPageData">
                                    <td>{{d.label}}</td><td v-for="da in d.data">{{da}}</td>
                                   
                                </tr>
                            </tbody>
                            <tfoot>
                              <tr> 
                                <td :colspan="datacollection.labels.length + 1" style="text-align: right;">
                                  <pagination :current-page="pageOne.currentPage"
                                              :total-pages="pageOne.totalPages"
                                              :items-per-page="pageOne.itemsPerPage"
                                              @page-changed="pageOneChanged">
                                  </pagination>
                                </td>
                              </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="errors">{{errors}}</div>
    </div>
</template>

<script>
    import LineChart from '@/components/LineChart';
    import chartService from '@/services/ChartService';
    import Pagination from '@/components/Pagination.vue';
    export default {
        name: 'TableViewPage',
        components: {
            LineChart,Pagination
        },
        data() {
            return {
                title: "Table View of Populatrion",
                datacollection: undefined,
                currentPageData:[],
                errors: undefined,
                pageOne: {
                  currentPage: 1,
                  totalPages: 5,
                  itemsPerPage: 2
                }
            };
        },
        props: {
            chartService: {
                default: () => chartService
            }
        },
        methods: {
            getData() {
                var self = this;
                self.chartService.getCountryPopulationData().then(data => {
                     
                      self.datacollection = data; 
                      self.pageOne.totalPages = parseInt(self.datacollection.datasets.length) / parseInt(self.pageOne.itemsPerPage);
                      self.currentPageData = self.paginate(self.datacollection.datasets,self.pageOne.itemsPerPage,self.pageOne.currentPage);
                    },
                    function(error) {
                        self.errors = error;
                    });
            },
            pageOneChanged (pageNum) {
                this.pageOne.currentPage = pageNum;
                console.log(this.pageOne.currentPage);
                this.currentPageData = this.paginate(this.datacollection.datasets,this.pageOne.itemsPerPage,this.pageOne.currentPage)
            },
            paginate (array, page_size, page_number) {
              console.log("<<<>>> ",array, page_size, page_number);
              return array.slice(page_number * page_size, (page_number + 1) * page_size);
            }
        },
        mounted: function() {
            this.getData();
           
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
table td {
    border: 1px solid gray;
}
table th{
    border: 1px solid #FFF;
}
table thead {
  background-color:gray;
  weight:1px;
  color:#FFF;
}
caption {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    color: #868e96;
    text-align: left;
     caption-side: top;
}
    h1,
    h2 {
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