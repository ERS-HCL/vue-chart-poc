<template>
    <table width="100%" v-if="currentPageData" :class="className">
        <thead>
            <tr v-if="labels">
                <th v-for="l in labels">
                    <a v-if="l.sortable" href="javascript:void(0);" @click="sortByKey(l.key)">{{l.display}} <i v-if="l.sortable && !dataorderFn && sortablekeyFn===l.key" class="up"></i><i v-if="l.sortable && dataorderFn && sortablekeyFn===l.key" class="down"></i></a>
                    <span v-if="!l.sortable">{{l.display}}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="d in currentPageData">
                <td v-for="l in labels">{{d[l.key]}}</td>
               
            </tr>
        </tbody>
        
    </table>
</template>
<script>
export default {
  name: 'TableView',
  props: {
    currentPageData:{
        type:Array,
        default:[]
    },
    labels:Array,
    className: String
  },
  data () {
    return { sortablekey:'',
    dataorder:true
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
        
    }
  }
}
</script>