<template>
  <swipe class="my-swipe">
    <swipe-item v-for="(item,index) in imgList" :key="index">
        <a :href="item.linkUrl">
            <img :src="item.picUrl" alt="">
        </a>   
    </swipe-item>
  </swipe>
</template>

<script>
var slideList=[
    {linkUrl:"https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=720475",picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000000uaWLN2YBlcn.jpg"},
    {linkUrl:"http://y.qq.com/w/album.html?albummid=003geTcp2zw14x",picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000001v7biG2ohQIf.jpg"},
    {linkUrl:"http://y.qq.com/w/album.html?albummid=000ToYLG1IjiAc",picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000001d5jQG2Id8Bh.jpg"},
    {linkUrl:"http://y.qq.com/m/act/sfhd/132.html?ADTAG=banner",picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000004QGxvP3bUtjz.jpg"},
    {linkUrl:"http://y.qq.com/w/album.html?albummid=000nSJSa3jUDH4",picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000003eIpfP2OfSTL.jpg"}
];
export default {
  data(){
      return{
          imgList:slideList,
          autoplay:3000
      }
  }
}
</script>

<style>
@import 'vue-swipe/dist/vue-swipe.css';
.my-swipe {
  height: 300px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.my-swipe .mint-swipe-item a img{width: 100%;}
</style>
