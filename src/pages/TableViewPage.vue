<template>
    <div class="container">
        <div class="row">
   
            <div class="col-sm-12 col-md-12" style="float:left;padding-top:10px;" v-if="datacollection">
                <div class="card">
                    <div class="card-block">
                    <h3>{{title}}</h3>
                        
                        <table-view :labels="labels" :sortablekey="sortkey" 
                        :className="'tableview'"
                        :dataorder="order" 
                        :paginationOption="paginationOption"
                        :datacollection="datacollection"
                        :showTotalPages="true"
                        :showFilter="true"
                        :showSearch="true">
                        </table-view>
                         
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import populationService from '@/services/PopulationService';
    import TableView from '@/components/TableView.vue';
    export default {
        name: 'TableViewPage',
        components: {
            TableView
        },
        data() {
            return {
                title: "Table View of Population",
                datacollection: undefined,
                labels:undefined,
                errors: undefined,
                order: true,
                sortkey:''
               
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
                        self.labels = [{key:'name',sortable:true,display:'Country Name',itemclass:'textleft',headclass:''},
                        {key:'capital',sortable:true,display:'Capital',itemclass:'textleft',headclass:''},
                        {key:'region',sortable:true,display:'Region',itemclass:'textleft',headclass:''},
                        {key:'subregion',sortable:true,display:'Sub Region',itemclass:'textleft',headclass:''},
                        {key:'population',sortable:true,display:'Population',itemclass:'textright',headclass:''}];

                        self.navigationText = {
                          first:{text:'<<',title:'First',arialabel:'First'},
                          last:{text:'>>',title:'Last',arialabel:'Last'},
                          next:{text:'>',title:'Next',arialabel:'Next',class:'btnPageNav'},
                          previous:{text:'<',title:'Previous',arialabel:'Previous',class:'btnPageNav'}
                        };
                        self.paginationOption = {position:'top',showPagination:true,itemsPerPage:10,navigationText:self.navigationText,paginationClass:'paginationClass'};
                      }
                      
                    },
                    function(error) {
                        self.errors = error;
                    }
                );
            }
           
        },
        mounted: function() {
            this.getData();
           
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.control .input{
        margin: 0 5px;
        border-radius: 5px;
        border-color: #aaa;
}
.control .filter{
    background-color: white;
    padding: 3px;
    border: 2px solid #aaa;
    border-radius: 5px;

}
.control .filter option:checked, 
.control filter option:hover{
    background-color: #95c5c5;
}
.tableview{
     border: 1px solid gray;
}
.tableview td {
    border: 1px solid gray;
    padding:5px;
}
.tableview  th{
    border: 1px solid #FFF;
    padding:5px;
}
.tableview  th{
    border-top: 1px solid gray;
}
.tableview  th:first-child{
    border-left: 1px solid gray;
}
.tableview  th:last-child{
     border-right: 1px solid gray;
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
    float: right;
    margin-top:5px;
}

.tableview .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    float: right;
    margin-top:5px;
}
.tableview .rowalt0{
    background-color:#fff;
}
.tableview .rowalt1{
    background-color:#ccc;
}
.textleft {
   text-align:left
}
.headleft{
    text-align:left
}
.textright {
   text-align:right
}
.headright{
    text-align:right
}
.textcenter {
   text-align:center
}
.headcenter{
    text-align:center
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
            margin: 0px;
    }

.paginationClass > li {
    display: inline-block;
    margin: 2px;
    padding: 0 3px;
    background-color: #CCC;
    min-width: 25px;
    width: auto;
    color: black;
    border: 1px solid gray;
    border-radius: 5px;
    height: 25px;
    line-height: 25px;
    cursor:pointer;
    text-align:center;
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
.navLayout{
    text-align:right;
    padding-right:10px;
}
.totalPages{
    text-align:right;
    padding-right:15px;
}
</style>