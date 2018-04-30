<template>
  <div class="rank">
      <dl>
        <dt v-for="(items,index) in rankList" class="wrap" @click="open(index)">
          <div class="pic">
            <img :src="imgList[index]" alt="">
          </div>
          <dl class="group">
            <dt v-for="(item,index) in items" class="text">
              {{index+1}} {{item.author}}-{{item.title}}
            </dt>
          </dl>
        </dt>
      </dl>
      <router-view/>
  </div>
</template>

<script>
import {rank} from '../../data/rank'
const Num=4;
var imgList=[
  require('../../assets/img/pic1.jpg'),
  require('../../assets/img/pic2.jpg'),
  require('../../assets/img/pic3.jpg'),
  require('../../assets/img/pic4.jpg')
];
export default {
  data(){
    return{
      rankList:[],
      imgList:imgList
    }
  },
  mounted(){
    for(let i=0;i<Num;i++){
      rank(i).then(res=>{
        this.rankList.push(res.song_list.slice(0,3));  
      })
    }
  },
  methods:{
    open(index){
      this.$router.push({
        path:`/rank/${index}`
      })
    }
  }
}
</script>

<style>
.rank .wrap{background: #333;margin-left: 20px;margin-bottom: 20px;}
.rank .pic{display: inline-block;vertical-align: top;font-size: 0;}
.rank .pic img{width: 100px;height: 100px;}
.rank .group{display: inline-block;height: 100px;padding-left: 20px;box-sizing: border-box;margin: 0;padding-top: 5px;padding-bottom: 15px;}
.rank .text{color: rgba(255, 255, 255, 0.5);font-size: 14px;line-height: 26px;}
</style>
