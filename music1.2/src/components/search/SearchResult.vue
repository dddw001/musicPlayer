<template>
  <div class="search-result" v-if="show">
      <dl v-if="!empty">
          <dt v-for="item in result" @click="play(item.songid)">
              <i class="iconfont icon-yinyue"></i>
              <span class="name">{{item.songname}}-{{item.artistname}}</span>
          </dt>
      </dl>
      <p v-else class="none">没有相关信息,请重新搜索</p>
  </div>
</template>

<script>
import {search} from '../../data/search'
export default {
  props:["searchKey"],
  data(){
      return{
          result:[],
          empty:true
      }
  },
  methods:{
      show(){
          return this.result.length>0;
      },
      play(val){
            var play=document.getElementsByClassName('play')[0];
           var normal=play.getElementsByClassName('normal')[0];
        // // //   var mini=document.getElementsByClassName('mini-player')[0];
         //   play.style.display='block';
         //  normal.style.display='block';
        //   mini.style.display='none';
          this.$emit('playMusic',val);
      }
  },
  watch:{
      searchKey(val){
          search(this.searchKey).then(res=>{
            //console.log(res.song);
            this.result=res.song;
            if(this.result&&this.result.length>0){
                this.empty=false;
            }
          })
      }
  }
}
</script>

<style>
.search-result dl{padding-left: 20px;padding-right: 20px;}
.search-result dl dt{margin-bottom: 20px;cursor: pointer;}
.search-result dl dt i{font-size: 14px;color: rgba(255, 255, 255, 0.3);}
.search-result dl dt .name{display: inline-block;width: calc(100% - 100px);vertical-align: top;}
.search-result .none{text-align: center;}
</style>
