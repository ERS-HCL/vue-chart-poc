<template>
<ul :class="paginationClass">
  <li @click.prevent="pageChanged(1)" title="Previous" aria-label="Previous">
   
      <span aria-hidden="true">&laquo;</span>
  
  </li>
  <li :class="preDisabled()" @click.prevent="pageChanged(currentPage-1)" title="Previous" aria-label="Previous">
   
      <span aria-hidden="true">&lt;</span>
  
  </li>
  <li v-for="n in paginationRange" :class="activePage(n)" @click.prevent="pageChanged(n)">
    <span>{{ n }}</span>
  </li>
  <li :class="nextDisabled()" @click.prevent="pageChanged(currentPage+1)" title="Next" aria-label="Next">
    
      <span aria-hidden="true">&gt;</span>
   
  </li>
  <li @click.prevent="pageChanged(lastPage)" title="Next" aria-label="Next">
    
      <span aria-hidden="true">&raquo;</span>
   
  </li>
  
</ul>
</template>

<script>
import Util from '@/services/Util';
export default {
  props: {
    // Current Page
    currentPage: {
      type: Number,
      required: true
    },
    // Total page
    totalPages: Number,
    // Items per page
    itemsPerPage: Number,
    // Total items
    totalItems: Number,
    // Visible Pages
    visiblePages: {
      type: Number,
      default: 5,
      coerce: (val) => parseInt(val)
    },
    paginationClass:''
  },
  data () {
    return {}
  },
  computed: {
    lastPage () {
      if (this.totalPages) {
        return this.totalPages
      } else {
        return this.totalItems % this.itemsPerPage === 0
          ? this.totalItems / this.itemsPerPage
          : Math.floor(this.totalItems / this.itemsPerPage) + 1
      }
    },
    paginationRange () {
      let start = this.currentPage - this.visiblePages / 2 <= 0
                    ? 1 : this.currentPage + this.visiblePages / 2 > this.lastPage
                    ? Util.lowerBound(this.lastPage - this.visiblePages + 1, 1)
                    : Math.ceil(this.currentPage - this.visiblePages / 2)
      let range = []
      for (let i = 0; i < this.visiblePages && i < this.lastPage; i++) {
        range.push(start + i)
      }
      return range
    }
  },
  methods: {
    pageChanged (pageNum) {
      this.$emit('page-changed', pageNum)
    },
    activePage (pageNum) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>. ",this.currentPage === pageNum);
      return this.currentPage === pageNum ? 'active' : ''
    },
    preDisabled (){
      if(this.currentPage <=1){
        return 'disabled';
      }
      return '';
    },
    nextDisabled(){
      if(this.currentPage >=this.lastPage){
        return 'disabled';
      }
      return '';
    }
  }
}
</script>
<style>
.disabled {
    pointer-events:none; 
    opacity:0.6;         
}
</style>