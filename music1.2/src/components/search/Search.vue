<template>
  <div class="search">
      <search-bar @searchByKey="showResult" @delete="clear" :hotKey="key"></search-bar>
      <hot-search v-show="key==''" @hotSearch="hot"></hot-search>
      <search-result v-show="key!=''" :searchKey="key" @playMusic="play"></search-result>
      <search-history :historyList='historyList' v-if="historyList.length>0" @clearHistory='clearHistory' @deleteItem="deleteItem"></search-history>
  </div>
</template>

<script>
import SearchBar from './SearchBar'
import HotSearch from './HotSearch'
import SearchResult from './SearchResult'
import SearchHistory from './SearchHistory'
export default {
  data(){
    return{
      key:'',
      id:'',
      historyList:[]
    }
  },
  components:{SearchBar,SearchResult,HotSearch,SearchHistory},
  mounted(){
    if(localStorage.getItem('searchHistory')){
      this.historyList=localStorage.getItem('searchHistory').split(',');
    }
  },
  methods:{
    showResult(val){
      this.key=val;
      if(val){
        this.historyList.unshift(val);
        localStorage.setItem('searchHistory',this.historyList);
        this.historyList=localStorage.getItem('searchHistory').split(',');
      }
    },
    clear(){
      this.key='';
    },
    clearHistory(){
      this.historyList=[];
    },
    deleteItem(){
      if(localStorage.getItem('searchHistory')){
        this.historyList=localStorage.getItem('searchHistory').split(',');
      }
      else{
        this.historyList=[];
      }
    },
    hot(val){
      this.key=val;
    },
    play(val){
      this.$emit('playById',val,this.key);
    }
  }
}
</script>

<style>
.search{overflow: hidden;}
</style>
