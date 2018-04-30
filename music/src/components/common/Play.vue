<template>
  <div class="play" v-show="musicId">
      <div class="normal" v-if="!little">
          <div class="bg">
                <img :src="musicInfo.songinfo.pic_small" alt="">
            </div>
      <div class="top">
          <div class="back" @click="back">
              <i class="iconfont icon-jiantouxia"></i>
          </div>
          <h3 class="title">{{musicInfo.songinfo.author}}</h3>
          <h4 class="subtitle">{{musicInfo.songinfo.title}}</h4>
      </div>
        <div class="middle"></div>
      <div class="bottom">
          <div class="progress">
              <span class="time time-s">{{Math.floor(currentTime/60)+":"+(currentTime%60/100).toFixed(2).slice(-2)}}</span>
              <div class="progress-bar">
                  <div class="bar-inner">
                      <div class="rate" id="rate"></div>
                      <div class="btn-wrap">
                          <div class="pro-btn"></div>
                      </div>
                  </div>
              </div>
              <span class="time time-e">{{time}}</span>
          </div>
          <div class="operators">
              <div class="iconfont">
                  <i class="iconfont icon-xunhuan" @click="loop"></i>
              </div>
              <div class="iconfont">
                  <i class="iconfont icon-houtui1"></i>
              </div>
              <div class="iconfont i-center">
                <i class="iconfont" :class="isActive?'icon-zanting':'icon-bofang'"  @click="play" id="bo"></i>
              </div>
              <div class="iconfont i-left">
                  <i class="iconfont icon-qianjin"></i>
              </div>
              <div class="iconfont i-left">
                <i :class="['iconfont','icon-collection',{'active':like}]" @click="love"></i>
              </div>
          </div>
      </div>    
      </div>
      <div class="mini-player" v-if="little">
        <div class="icon" @click="backBig">
            <img :src="musicInfo.songinfo.pic_small" alt="">
        </div>
        <div class="text" @click="backBig">
          <h2 class="name">{{musicInfo.songinfo.title}}</h2>
          <p class="desc">{{musicInfo.songinfo.author}}</p>
        </div>
        <div class="control">
          <div class="progress-circle">
            <img :src="musicInfo.songinfo.pic_small" alt="">
            <div id="player" class="box">
              <div class="box-in">
                <div class="box-in-in"></div>
              </div>
              <div class="box-con iconfont" :class="isActive?'icon-zanting':'icon-bofang'" @click="littlePlay">
              </div>
            </div>
          </div>
        </div>
        <div class="control c2">
          <div class="like">
              <i class="iconfont icon-collection" :class="{'active':like}" @click="love"></i>
          </div>
          <div class="close" @click="closeLittle">
              <i class="iconfont icon-cha"></i>
          </div>
        </div>
      </div>
      <audio :src="musicInfo.bitrate.file_link" id="audio"></audio>
  </div>
</template>

<script>
import { play } from "../../data/play";
import Vue from 'vue';
var music={
    songinfo: { pic_small: "", author: "", title: "" },
    bitrate: { file_link: "",file_duration:0}
};
export default {
  props: ["musicId"],
  data() {
    return {
      musicInfo: music,
      currentTime: 0,
      like: false,
      songId: 0,
      isActive:false,
      little:false,
      big:true
    };
  },
  beforeRouterEnter(to,from,next){
      this.$route.meta.keepAlive=true;
      next();
  },
  mounted() {
    this.currentTime = document.getElementById("audio").currentTime;

    var oAudio = document.getElementById("audio");
    var oBtn = document.getElementsByClassName("pro-btn")[0];
    var oRate = document.getElementById("rate");
    var oBar = document.getElementsByClassName("progress-bar")[0];
    var all = oBar.offsetWidth;
    let self = this;
    oBtn.onmousedown = function(event) {
      let disX = event.clientX - oBtn.offsetLeft;
      document.onmousemove = function(e) {
        let l = e.clientX - disX;
        if (oBtn.offsetLeft > 0 && l < oBar.offsetWidth) {
          oBtn.style.left = l + "px";
          oRate.style.width = l + "px";
          self.currentTime = l / all * oAudio.duration;
          oAudio.currentTime = self.currentTime;
        }
        document.onmouseup = function(e) {
          document.onmousemove = null;
          document.onmouseup = null;
          self.play();
        };
      };
    };
  },
  methods: {
    back() {
      this.little=true;
      this.big=false;
      if(this.isActive){
        this.isActive=false;
        this.littlePlay();
      }
    },
    play() {
      this.isActive=!this.isActive;
      var oAudio = document.getElementById("audio");
      if (this.isActive) {
        oAudio.play();
        var that = this;
        oAudio.ontimeupdate=function(){
          that.currentTime = oAudio.currentTime;
        }
      } else {
        oAudio.pause();
      }
      if (localStorage.getItem("listenList").length > 0) {
        var arr = localStorage.getItem("listenList").split(",");
      } else {
        arr = [];
      }
      arr.unshift(this.songId);
      localStorage.setItem("listenList", arr);
    },
    loop() {
      var oAudio = document.getElementById("audio");
      oAudio.loop = !oAudio.loop;
    },
    love() {
      this.like = !this.like;
      if (this.like) {
        if (localStorage.getItem("loveSongs").length > 0) {
          var arr = localStorage.getItem("loveSongs").split(",");
        } else {
          arr = [];
        }
        arr.unshift(this.songId);
        localStorage.setItem("loveSongs", arr);
      } else {
        if (localStorage.getItem("loveSongs").length > 0) {
          var arr = localStorage.getItem("loveSongs").split(",");
          var index = arr.indexOf(this.songId);
          arr.splice(index, 1);
        }
        //localStorage.setItem('loveSongs',arr.push(this.songId));
      }
    },
    closeLittle(){
        this.little=false;
        window.location.reload();
    },
    littlePlay(){
      //console.log(this.isActive);
      this.isActive=!this.isActive;
      var oAudio = document.getElementById("audio");
      //console.log(oAudio.duration);
      if(this.isActive){
        oAudio.play();
        var that = this;
        oAudio.ontimeupdate=function(){
          that.currentTime = oAudio.currentTime;
          if(that.little){
              var hidden =  document.getElementsByClassName('box-in')[0];
          var rotate =  document.getElementsByClassName('box-in-in')[0];
          rotate.style.transform = 'rotate('+ oAudio.currentTime/audio.duration*360 + 'deg)';
        if((oAudio.currentTime/oAudio.duration)<=0.5){
          hidden.style.cssText = 'overflow:hidden;background:transparent';        
        }
        else{
          hidden.style.cssText = 'overflow:visible;background:black url("img/music.png") 61px 0';
        }    
          }
        }
      }
      else{
        oAudio.pause();
      }
    },
    backBig(){
      this.little=false;
    }
  },
  watch: {
    currentTime(val) {
      if(!this.little){
        var oAudio = document.getElementById("audio");
      var oRate = document.getElementById("rate");
      var oBar = document.getElementsByClassName("progress-bar")[0];
      var oBtn = document.getElementsByClassName("pro-btn")[0];
      var all = oBar.offsetWidth;
      oRate.style.width = (val / oAudio.duration).toFixed(2) * all + "px";
      oBtn.style.left = (val / oAudio.duration).toFixed(2) * all+7 + "px";
      }
    },
    musicId(val){
        if(val){
            play(val).then(res => {
            //console.log(typeof res.bitrate.file_duration);
            Vue.set(music.songinfo,'pic_small',res.songinfo.pic_small);
            Vue.set(music.songinfo,'author',res.songinfo.author);
            Vue.set(music.songinfo,'title',res.songinfo.title);
            Vue.set(music.bitrate,'file_link',res.bitrate.file_link);
            Vue.set(music.bitrate,'file_duration',res.bitrate.file_duration);
            this.songId = res.songinfo.song_id;
        }).then(()=>{
          this.play();
        });
    }
    }
  },
  computed:{
      time(){
          var d=this.musicInfo.bitrate.file_duration;
          return parseInt(d/60)+":"+d % 60;;
      }
  }
};
</script>

<style>
.normal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #222;
}
.normal .back {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
}
.normal .back i {
  display: inline-block;
  font-size: 22px;
  padding: 10px;
  color: #ffcd32;
  cursor: pointer;
}
.normal .bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.8;
}
.play .bg img {
  width: 100%;
  height: 100%;
}
.play .top {
  text-align: center;
}
.play .top .title {
  margin-top: 10px;
}
.play .bottom {
  position: absolute;
  bottom: 20px;
  width: 100%;
}
.play .bottom .progress {
  display: flex;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
}
.play .bottom .progress .time {
  font-size: 12px;
  color: #fff;
  line-height: 30px;
  width: 30px;
}
.play .bottom .progress .progress-bar {
  flex: 1;
  height: 30px;
}
.play .bottom .progress .progress-bar .bar-inner {
  position: relative;
  top: 13px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
}
.play .bottom .progress .progress-bar .bar-inner .rate {
  position: absolute;
  height: 100%;
  background: #ffcd32;
}
.play .bottom .progress .progress-bar .bar-inner .btn-wrap {
  position: absolute;
  left: -8px;
  top: -13px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.play .bottom .progress .progress-bar .bar-inner .btn-wrap .pro-btn {
  position: relative;
  top: 7px;
  left: 7px;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #ffcd32;
}
.play .bottom .operators {
  display: flex;
  align-items: center;
  margin-bottom: 60px;
}
.play .bottom .operators div {
  flex: 1;
  color: #ffcd32;
  text-align: right;
}
.play .bottom .operators .i-center {
  text-align: center;
}
.play .bottom .operators .i-left {
  text-align: left;
}
.play .bottom .operators div i {
  font-size: 30px;
  cursor: pointer;
}
.play .active {
  color: red;
}
.play .mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #333;
  z-index: 999;
  display: flex;
  align-items: center;
}
.play .mini-player .icon{width: 40px;padding: 0 10px 0 20px;cursor: pointer;}
.play .mini-player .icon img{border-radius: 50%;background-size: cover;width: 100%;}
.play .mini-player .text{display: flex;flex-direction: column;justify-content: center;flex: 1;cursor: pointer;}
.play .mini-player .text h2{margin: 0;font-size: 16px;}
.play .mini-player .text p{margin: 0;font-size: 14px;}
.play .control{width: 30px;padding: 0 10px;}
.play .mini-player .c2{display: flex;margin-right: 20px;margin-left: 10px;}
.play .control .like{line-height: 60px;display: inline-block;}
.play .control .close{line-height: 60px;display: inline-block;}
.play .control .like i{font-size: 35px;line-height: 60px;cursor: pointer;}
.play .control .close i{font-size: 26px;line-height: 60px;cursor: pointer;}
.play .mini-player .progress-circle{position: relative;width: 40px;height: 40px;border-radius: 50%;overflow: hidden;}
.play .mini-player .progress-circle img{width: 100%;display: block;border: none;}
.play .mini-player .progress-circle .box{position: absolute;top: 0;left: 0;width: 40px;height: 40px;background: url('../../assets/img/music.png');background-size: cover;}
.play .mini-player .progress-circle .box-in{position: absolute;top: 0;right: 0;width: 50%;height: 100%;overflow: hidden;}
.play .mini-player .progress-circle .box-in-in{position: absolute;width: 20px;margin-left: -20px;height: 100%;background: black url('../../assets/img/music.png');transform-origin: right;transform: rotate(0deg);}
.play .mini-player .progress-circle .box-con{position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);height: 10px;width: 10px;color: black;cursor: pointer;background: #fff;border-radius: 50%;font-size: 10px;}
</style>
