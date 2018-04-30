<template>
  <div class="search-bar">
      <div class="search-box">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" placeholder="搜索歌曲、歌手" v-model="searchKey" @keyup.enter="search(searchKey)"/>
          <i class="iconfont icon-wrong" v-if="show" @click="deleteKey"></i>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            searchKey:''
        }
    },
    props:["hotKey"],
    computed:{
        show(){
            if(this.searchKey!=''){
                return true;
            }
            return false;
        }
    },
    methods:{
        search(val){
            this.$emit('searchByKey',val);
        },
        deleteKey(){
            this.searchKey='';
            this.$emit('delete')
        }
    },
    watch:{
        hotKey(val){
            this.searchKey=val;
            this.search(val);
        }
    }
}
</script>

<style>
.search-bar{margin: 20px;}
.search-box{box-sizing: border-box;width: 100%;height: 40px;padding: 0 6px;background: #333;border-radius: 6px;display: flex;align-items: center;}
.search-box .icon-sousuo{font-size: 24px;color: #222;cursor: pointer;}
.search-box .icon-wrong{font-size: 16px;color: #222;cursor: pointer;}
.search-box input{width: calc(100% - 60px);color: #fff;background: #333;
border: none;margin: 0 5px;}
</style>
