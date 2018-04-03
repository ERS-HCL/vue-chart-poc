<template>
<ul :class="paginationClass">
  <li @click.prevent="pageChanged(1)" :title="navigationText.first.title" :aria-label="navigationText.first.arialabel" :class="navigationText.first.class">
   
      <span aria-hidden="true">{{navigationText.first.text}}</span>
  
  </li>
  <li v-if="navigationText && navigationText.previous" :class="preDisabled()" @click.prevent="pageChanged(currentPage-1)" :title="navigationText.previous.title" :aria-label="navigationText.previous.arialabel">
   
      <span aria-hidden="true">{{navigationText.previous.text}}</span>
  
  </li>
  <li v-for="n in paginationRange" :class="activePage(n)" @click.prevent="pageChanged(n)">
    <span>{{ n }}</span>
  </li>
  <li v-if="navigationText && navigationText.next" :class="nextDisabled()" @click.prevent="pageChanged(currentPage+1)" :title="navigationText.next.title" :aria-label="navigationText.next.arialabel">
    
      <span aria-hidden="true">{{navigationText.next.text}}</span>
   
  </li>
  <li v-if="navigationText && navigationText.last" @click.prevent="pageChanged(lastPage)" :title="navigationText.last.title" :aria-label="navigationText.last.arialabel" :class="navigationText.last.class">
    
      <span aria-hidden="true">{{navigationText.last.text}}</span>
   
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
    navigationText:{
      type: Object,
      default:{
        first:{text:'<<',title:'First',arialabel:'First',class:''},
        last:{text:'>>',title:'Last',arialabel:'Last',class:''},
        next:{text:'>',title:'Next',arialabel:'Next',class:''},
        previous:{text:'<',title:'Previous',arialabel:'Previous',class:''}
      }
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
    paginationClass: String
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
        return 'disabled ' + this.navigationText.previous.class;
      }
      return this.navigationText.previous.class;
    },
    nextDisabled(){
      if(this.currentPage >=this.lastPage){
        return 'disabled ' + this.navigationText.next.class;
      }
      return this.navigationText.next.class;
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