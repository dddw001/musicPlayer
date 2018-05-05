<template>
  <div class="rank">
      <dl>
        <dt v-for="(items,index) in rankList" class="wrap" @click="open(index)">
          <div class="pic">
            <img :src="imgList[index]" alt="">
          </div>
          <h3 class="title">{{titleList[index]}}</h3><br/>
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
var titleList=['流行指数','热歌','新歌','内地'];
export default {
  data(){
    return{
      rankList:[],
      imgList:imgList,
      titleList:titleList
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
.rank{overflow: hidden;}
.rank .wrap{background: #333;margin-bottom: 20px;display: flex;}
.rank .pic{vertical-align: top;font-size: 0;}
.rank .pic img{width: 100px;height: 100px;}
.rank .group{height: 100px;padding-left: 20px;box-sizing: border-box;margin: 0;padding-top: 5px;padding-bottom: 15px;flex: 4;overflow: hidden;}
.rank .text{color: rgba(255, 255, 255, 0.5);font-size: 14px;line-height: 26px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 90%;}
.rank .title{display: none;}
@media screen and (max-width:568px){
  .pic{display: none;}
  .title{display: block!important;width: 80px;padding-left: 5px;}
  .rank .group{padding-top: 35px;height: 135px;}
}
</style>
