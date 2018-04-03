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
                        @page-changed="pageOneChanged" :paginationClass="paginationClass"
                        :navigationText="{
                          first:{text:'<<',title:'First',arialabel:'First'},
                          last:{text:'>>',title:'Last',arialabel:'Last'},
                          next:{text:'Next',title:'Next',arialabel:'Next',class:'btnPageNav'},
                          previous:{text:'Previous',title:'Previous',arialabel:'Previous',class:'btnPageNav'}
                        }">
                        </pagination>
                        <table-view :labels="labels" :currentPageData="currentPageData" :sortablekey="sortkey" 
                        :className="'tableview'"
                        :dataorder="order">
                        </table-view>
                         
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import populationService from '@/services/PopulationService';
    import Pagination from '@/components/Pagination.vue';
    import TableView from '@/components/TableView.vue';
    export default {
        name: 'TableViewPage',
        components: {
            Pagination,TableView
        },
        data() {
            return {
                title: "Table View of Population",
                datacollection: undefined,
                labels:undefined,
                currentPageData:[],
                errors: undefined,
                order: true,
                sortkey:'',
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
                        //var lbl =  Object.keys(self.datacollection[0]);
                        self.sortkey = 'name';
                        self.labels = [{key:'name',sortable:true,display:'Country Name'},
                        {key:'capital',sortable:true,display:'Capital'},
                        {key:'region',sortable:true,display:'Region'},
                        {key:'subregion',sortable:true,display:'Sub Region'},
                        {key:'population',sortable:true,display:'Population'}];
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
            }
        },
        mounted: function() {
            this.getData();
           
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tableview{

}
.tableview td {
    border: 1px solid gray;
}
.tableview  th{
    border: 1px solid #FFF;
}
.tableview  thead {
  background-color:gray;
  weight:1px;
  color:#FFF;
  text-transform: capitalize;
}
.tableview  thead a {
  
  color:#FFF;
  
}
.tableview caption {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    color: #868e96;
    text-align: left;
     caption-side: top;
}

.tableview i {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
}
.tableview .up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
}

.tableview .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
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
    padding: 0 5px;
    background-color: #CCC;
    min-width: 30px;
    width: auto;
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
.paginationClass .btnPageNav{
  background-color: #95c5c5;
    width: auto;
    color: #000;
}
</style>