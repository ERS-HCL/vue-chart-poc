<template>

  <div class="search-wrapper">
        <input type="text" v-model="search" placeholder="Search title.."/>
        <label>Search title:</label>
  </div>

</template>
<script>

export default {
    name: 'SearchWithFilterOption',
    props: {
        filter:String
        keyword:String
    },
    data () {
        return { 
            search: '',
            dataList:[]
        }
    },
    computed: {
     filteredList() {
      return this.dataList.filter(item => {
        return item[filter].toLowerCase().includes(this.search.toLowerCase())
      })
    }
    },
    methods: {
    
    },
    mounted: function() {
      
    }
}
</script>
<style>


</style>