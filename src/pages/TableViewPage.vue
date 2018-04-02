<template>
    <div class="container">
        <div class="row">
   
            <div class="col-sm-12 col-md-12" style="float:left;" v-if="currentPageData">
                <div class="card">
                    <div class="card-block">
                    <h3>{{title}}</h3>
                        <pagination :current-page="pageOne.currentPage"
                        :total-pages="pageOne.totalPages"
                        :items-per-page="pageOne.itemsPerPage"
                        @page-changed="pageOneChanged" :paginationClass="paginationClass">
                        </pagination>
                        <table width="100%">
                            <thead>
                                <tr v-if="datacollection">
                                    <th ><a href="javascript:void(0);" @click="sortByKey(labels[0])">{{labels[0]}}</a></th><th><a href="javascript:void(0);" @click="sortByKey(labels[5])">{{labels[5]}}</a></th><th><a href="javascript:void(0);" @click="sortByKey(labels[7])">{{labels[7]}}</a></th><th><a href="javascript:void(0);" @click="sortByKey(labels[8])">{{labels[8]}}</a></th><th><a href="javascript:void(0);" @click="sortByKey(labels[9])">{{labels[9]}}</a></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="d in currentPageData">
                                    <td>{{d.name}}</td>
                                    <td>{{d.capital}}</td>
                                    <td>{{d.region}}</td>
                                    <td>{{d.subregion}}</td>
                                    <td>{{d.population}}</td>
                                    
                                </tr>
                            </tbody>
                          
                        </table>
                         
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import populationService from '@/services/PopulationService';
    import Pagination from '@/components/Pagination.vue';
    export default {
        name: 'TableViewPage',
        components: {
            Pagination
        },
        data() {
            return {
                title: "Table View of Population",
                datacollection: undefined,
                labels:undefined,
                currentPageData:[],
                errors: undefined,
                order: true,
                paginationClass : 'paginationClass',
                pageOne: {
                  currentPage: 1,
                  totalPages: 10,
                  itemsPerPage: 10
                }
            };
        },
        props: {
            populationService: {
                default: () => populationService
            }
        },
        methods: {
            getData() {
                var self = this;
                self.populationService.getCountryPopulationData().then(data => {
                     console.log(data);
                      self.datacollection = data; 

                      if(self.datacollection && self.datacollection.length && self.datacollection.length>0) {
                        self.labels =  Object.keys(self.datacollection[0]);
                        self.pageOne.totalPages = parseInt(self.datacollection.length) / parseInt(self.pageOne.itemsPerPage);
                        self.currentPageData = self.paginate(self.datacollection,self.pageOne.itemsPerPage,self.pageOne.currentPage);
                      }
                      
                    },
                    function(error) {
                        self.errors = error;
                    });
            },
            pageOneChanged (pageNum) {
                this.pageOne.currentPage = pageNum;
                console.log(this.pageOne.currentPage);
                this.currentPageData = this.paginate(this.datacollection,this.pageOne.itemsPerPage,this.pageOne.currentPage)
            },
            paginate (array, page_size, page_number) {
              page_number = page_number - 1;
              console.log("<<<>>> ",array, page_size, page_number);
              return array.slice(page_number * page_size, (page_number + 1) * page_size);
            },
            sortByKey(key) {
              self = this;
              return this.currentPageData.sort(function(a, b) {
                
                console.log("<<<<<<<<<<<<<<<<< ",self.order, "  :: ",key, "a :: ",a);
                 if(self.order) {
                   self.order = false;
                     if ( a[key] < b[key] )
                        return -1;
                      if ( a[key] > b[key] )
                          return 1;
                      return 0;
                 } else {
                    self.order = true;
                     if ( b[key] < a[key] )
                        return -1;
                      if ( b[key] > a[key] )
                          return 1;
                      return 0;
                 }
               
                  
              });
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
  text-transform: capitalize;
}
table thead a {
  
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
    .paginationClass{

}

.paginationClass > li {
    display: inline-block;
    margin: 5px;
    background-color: #CCC;
    width: 30px;
    color: black;
    border: 1px solid gray;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
    cursor:pointer;
  }
  .paginationClass > li > a{
    color:black;
  }
   .paginationClass .active{
    background-color: #000;
    width: 30px;
    color: #FFF;
    border: 1px solid gray;
}
</style>