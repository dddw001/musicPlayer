<template>
  <div class="detail">
    <div class="back">
        <i class="iconfont icon-houtui" @click="back"></i>
    </div>
    <h3 class="title">{{titleList[index]}}</h3>
  </div>
</template>

<script>
var imgList=[
  require('../../assets/img/pic1.jpg'),
  require('../../assets/img/pic2.jpg'),
  require('../../assets/img/pic3.jpg'),
  require('../../assets/img/pic4.jpg')
];
var titleList=["巅峰榜-流行指数","巅峰榜-热歌","巅峰榜-新歌","巅峰榜-内地"];
export default {
    data(){
        return{
            imgList:imgList,
            titleList:titleList,
            index:this.$route.params.id
        }
    },
    mounted(){
        var oDetail=document.getElementsByClassName('detail')[0]
         oDetail.style.backgroundImage=`url(${imgList[this.index]})`;
    },
    methods:{
        back(){
            this.$router.go(-1);
        }
    }
}
</script>

<style>
.detail{position: fixed;left: 0;top: 0;right: 0;bottom: 0;background: #222;z-index: 999;text-align: center;background-size: cover;}
.detail .back{display: inline-block;position: absolute;left: 0;top: 0;}
.detail .back i{display: inline-block;font-size: 22px;padding: 10px;color: #ffcd32;cursor: pointer;}
.detail .title{display: inline-block;margin: 10px;}
</style>
