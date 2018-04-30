<template>
  <div class="slide">
      <div class="wrapper">
          <div class="slide-item" v-for="item in slideList">
              <a :href="item.linkUrl">
                  <img :src="item.picUrl" alt="">
              </a>
          </div>
      </div>
      <div class="dots">
          <div v-for="(item,index) in dotList" class="dot" :class="{active:index==isCur}"></div>
      </div>
  </div>
</template>

<script>
var slideList=[
    {linkUrl:"https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=720475",picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000000uaWLN2YBlcn.jpg"},
    {linkUrl:"http://y.qq.com/w/album.html?albummid=003geTcp2zw14x",picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000001v7biG2ohQIf.jpg"},
    {linkUrl:"http://y.qq.com/w/album.html?albummid=000ToYLG1IjiAc",picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000001d5jQG2Id8Bh.jpg"},
    {linkUrl:"http://y.qq.com/m/act/sfhd/132.html?ADTAG=banner",picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000004QGxvP3bUtjz.jpg"},
    {linkUrl:"http://y.qq.com/w/album.html?albummid=000nSJSa3jUDH4",picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000003eIpfP2OfSTL.jpg"}
    ];
var dotList=['','','','',''];
export default {
    data(){
        return{
            slideList:slideList,
            dotList:dotList,
            isCur:0
        }
    },
    methods:{
    },
    mounted(){
        var oSlide=document.getElementsByClassName('slide')[0];
        var oWrapper=oSlide.getElementsByClassName('wrapper')[0];
        var aItem=oSlide.getElementsByClassName('slide-item');

        var str=oWrapper.innerHTML+oWrapper.innerHTML;
        oWrapper.innerHTML=str;
        var flag_left=true;

        //设置item的宽度和slide的高度
        for(let i=0;i<aItem.length;i++){
            aItem[i].style.width=oSlide.clientWidth+'px';
        }
        oWrapper.style.width=aItem[0].clientWidth*aItem.length+'px';
        oSlide.style.height=aItem[0].clientHeight+'px';
        //console.log(oSlide.clientHeight);
        window.onresize=()=>{
            for(let i=0;i<aItem.length;i++){
                aItem[i].style.width=oSlide.clientWidth+'px';
            }
            oWrapper.style.width=aItem[0].clientWidth*aItem.length+'px';
            oSlide.style.height=aItem[0].clientHeight+'px';
        }

        //移动
        
        function move(offset){
            var l=parseInt(oWrapper.offsetLeft)+offset;
            if(flag_left){
                if(l<=-oWrapper.clientWidth/2){
                    l=0;
                }
            }
            else{
                if(l>=0){
                    l-=oWrapper.offsetWidth/2;
                }
            }
            oWrapper.style.left=l+'px';
        }

        // setInterval(function(){
        //     move(-aItem[0].offsetWidth);
        // },1000)
    }
}

</script>

<style>
.slide{width: 100%;overflow: hidden;font-size: 0;position: relative;}
.slide .wrapper{position: absolute;left: 0;top: 0;}
.slide .slide-item{display: inline-block;}
.slide .slide-item img{width: 100%;}
.slide .dots{position: absolute;left: 0;right: 0;bottom: 12px;text-align: center;}
.slide .dots .dot{display: inline-block;width: 8px;height: 8px;border-radius: 50%;background: rgba(255, 255, 255, 0.5);margin: 0 4px;}
.slide .dots .active{width: 20px;border-radius: 5px;background: rgba(255, 255, 255, 0.8);}
</style>
