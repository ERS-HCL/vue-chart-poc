<template>
<table width="100%" v-if="currentPageData">
    <tr><td class="totalPages" :colspan="labels.length" v-if="showTotalPages && this.paginationOption.showPagination">
     <p class="control is-expanded">
        <input class="input" v-model="searchItem" v-on:keyup="searchInTheList(searchItem)" type="text" placeholder="Search Record">
        <span class="help is-dark"><strong>{{filteredItems.length}}</strong> of {{datacollection.length}} record(s) found</span>
    </p>
    <span class="pageHeading">Total Page(s):</span> {{pageOne.totalPages}}</td></tr>
    <tr><td :colspan="labels.length" class="navLayout" v-if="paginationOption.showPagination && (paginationOption.position =='top' || paginationOption.position=='both')">
        <pagination :current-page="pageOne.currentPage"
                :total-pages="pageOne.totalPages"
                :items-per-page="pageOne.itemsPerPage"
                @page-changed="pageOneChanged" :paginationClass="paginationOption.paginationClass"
                :navigationText="paginationOption.navigationText">
    </pagination>
    </td></tr>
    <tr><td :colspan="labels.length">
    <table width="100%" v-if="currentPageData" :class="className">
        <thead>
            <tr v-if="labels">
                <th v-for="l in labels" :class="l.headclass">
                    <a v-if="l.sortable" href="javascript:void(0);" @click="sortByKey(l.key)">
                        {{l.display}} 
                        <i v-if="l.sortable && !dataorderFn && sortablekeyFn===l.key" class="up"></i>
                        <i v-if="l.sortable && dataorderFn && sortablekeyFn===l.key" class="down"></i>
                    </a>
                    <span v-if="!l.sortable">{{l.display}}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="d in currentPageData">
                <td v-for="l in labels" :class="l.itemclass">{{d[l.key]}}</td>
            </tr>
        </tbody> 
    </table>
    </td>
    </tr>
    <tr><td :colspan="labels.length" class="navLayout" v-if="paginationOption.showPagination && (paginationOption.position=='bottom' || paginationOption.position=='both')">
        <pagination :current-page="pageOne.currentPage"
                :total-pages="pageOne.totalPages"
                :items-per-page="pageOne.itemsPerPage"
                @page-changed="pageOneChanged" :paginationClass="paginationOption.paginationClass"
                :navigationText="paginationOption.navigationText">
    </pagination>
    </td></tr>
    </table>
</template>
<script>
import Pagination from '@/components/Pagination.vue';
export default {
    components: {
        Pagination
    },
    name: 'TableView',
    props: {
        datacollection:{
            type:Array,
            default:[]
        },
        labels:Array,
        className: String,
        showTotalPages:false,
        paginationOption:{
            type:Object,
            default:{position:'top',showPagination:true,itemsPerPage:10,navigationText:[],paginationClass:''}
        }
    },
    data () {
        return { 
            sortablekey:'',
            dataorder:true,
            pageOne: {
                currentPage: 1,
                totalPages: 10,
                itemsPerPage: 10
            },
            currentPageData:[],
            filteredItems: [],
            searchItem:''
        }
    },
    computed: {
    sortablekeyFn:{
        get: function(){
            return this.sortablekey;
        },
        set: function(value){
            this.sortablekey = value;
        }
    },
    dataorderFn:{
        get: function(){
            return this.dataorder;
        },
        set: function(value){
            this.dataorder = value;
        }
    },
    setPage(){
        if(this.paginationOption.itemsPerPage){
            this.pageOne.itemsPerPage = this.paginationOption.itemsPerPage;
        }
        this.pageOne.totalPages = Math.ceil(parseInt(this.filteredItems.length) / parseInt(this.pageOne.itemsPerPage));
        if(this.paginationOption.showPagination){
            this.currentPageData = this.paginate(this.filteredItems,this.pageOne.itemsPerPage,this.pageOne.currentPage);
        } else{
            this.currentPageData = this.filteredItems;
        }
        
    }
   
    },
    methods: {
    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    },
    sortByKey(key) {
        this.sortablekeyFn = key;
        if(this.dataorderFn){
        this.dataorderFn = false;
        this.currentPageData.sort(this.dynamicSort(key));
        } else{
        this.dataorderFn = true;
            this.currentPageData.sort(this.dynamicSort("-"+key));
        }
        
    },
    pageOneChanged (pageNum) {
        this.pageOne.currentPage = pageNum;
        console.log(this.pageOne.currentPage);
        this.currentPageData = this.paginate(this.filteredItems,this.pageOne.itemsPerPage,this.pageOne.currentPage)
    },
    paginate (array, page_size, page_number) {
        page_number = page_number - 1;
        console.log("<<<>>> ",array, page_size, page_number);
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
    },
    searchInTheList: function searchInTheList(searchText, currentPage) {
      if (!searchText) {
        this.filteredItems = this.datacollection.filter(function (v, k) {
          return true;
        });
      } else {
        this.filteredItems = this.datacollection.filter(function (v, k) {
            //return this.labels.some( l => 
            //String(v[l.key]).toLowerCase().includes(searchText.toLowerCase()) 
            //);
          return v.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        });
      }
      this.setPage;

      if (!currentPage) {
        this.pageOneChanged(1);
      } else {
        this.pageOneChanged(currentPage);
      }
    }
    },
    mounted: function() {
        this.searchInTheList('');
       
    }
}
</script>