<template>
  <div class="hot-singer" id="热">
      <h4>热门</h4>
      <dl class="group">
          <dt v-for="item in hotSingerList" @click="open(item)">
              <img :src="item.avatar_small" />
              <span class="name">{{item.name}}</span>
          </dt>
      </dl>
  </div>
</template>

<script>
import {getSinger} from '../../data/singer'
var hotSingerList=[];
export default {
    data(){
        return{
            hotSingerList:hotSingerList
        }
    },
    mounted(){
        getSinger().then(res=>{
            //console.log(res.artist);
            this.hotSingerList=res.artist.slice(0,10);
        })
    },
    methods:{
        open(item){
            this.$router.push({
                path:`/singer/${item.ting_uid}`
            })
        }
    }
}
</script>

<style>
.hot-singer h4{background: #333;color: rgba(255, 255, 255, 0.5);font-size: 14px;line-height: 30px;padding-left: 20px;}
.hot-singer dl dt{padding-left: 30px;padding-top: 20px;cursor: pointer;}
.hot-singer dl dt img{vertical-align: middle;border-radius: 50%;}
.hot-singer dl dt .name{margin-left: 20px;font-size: 16px;color: rgba(255, 255, 255, 0.5);}
</style>
