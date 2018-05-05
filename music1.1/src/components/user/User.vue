<template>
  <div class="user">
      <div class="back">
          <i class="iconfont icon-houtui" @click="back"></i>
      </div>
      <div class="switches-wrapper">
          <ul class="switches">
              <li class="switch-item" :class="{'active':isA}" @click="toggle">
                  <span>我喜欢的</span>
              </li>
              <li class="switch-item" :class="{'active':!isA}" @click="toggle">
                  <span>最近听的</span>
              </li>
          </ul>
      </div>
      <div class="play-btn" @click="playAll">
          <i class="iconfont icon-bofang"></i>
          <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper">
          <div class="list-scroll">
              <div class="song-list">
                  <ul>
                      <li v-for="item in isA?likeList:listenList" @click="play(item)">
                          <h2>{{item.title}}</h2>
                          <p class="desc">{{item.author}}</p>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="no-result" v-show="likeList==[]">
          <div class="icon"></div>
          <p>暂无收藏歌曲</p>
      </div>
      <play :musicId="id" v-if="id!=''"></play>
  </div>
</template>

<script>
import {play} from '../../data/play'
import Play from '../common/Play'
export default {
    data(){
        return{
            isA:true,
            likeList:[],
            listenList:[],
            id:''
        }
    },
    components:{Play},
    methods:{
        back(){
            this.$router.go(-1);
        },
        toggle(){
            this.isA=!this.isA;
        },
        play(item){
           this.id=item.id;
        },
        playAll(){
            this.id=this.likeList[0].id;
        }
    },
    mounted(){
        if(localStorage.getItem('loveSongs').length>0){
            var arr1=localStorage.getItem('loveSongs').split(',');
            for(let i=0;i<arr1.length;i++){
                play(arr1[ i]).then(res=>{
                    this.likeList.push({'id':res.songinfo.song_id,'author':res.songinfo.author,'title':res.songinfo.title});
                })
            }
        }
        if(localStorage.getItem('listenList').length>0){
            var arr2=localStorage.getItem('listenList').split(',');
            arr2=[...new Set(arr2)];
            for(let i=0;i<arr2.length;i++){
                play(arr2[i]).then(res=>{
                    this.listenList.push({'id':res.songinfo.song_id,'author':res.songinfo.author,'title':res.songinfo.title});
                })
            }
        }
    }
}
</script>

<style>
.user{position: fixed;left: 0;top: 0;right: 0;bottom: 0;background: #222;z-index: 999;text-align: center;background-size: cover;}
.user .back{display: inline-block;position: absolute;left: 0;top: 0;}
.user .back i{display: inline-block;font-size: 22px;padding: 10px;color: #ffcd32;cursor: pointer;}
.user .switches-wrapper{margin: 10px 0 30px 0;}
.user .switches-wrapper .switches{width: 240px;margin: 0 auto;border: 1px solid #333;border-radius: 5px;display: flex;padding-left: 0;}
.user .switches .switch-item{flex: 1;list-style: none;padding: 8px;font-size: 14px;text-align: center;cursor: pointer;}
.user .switches .active{background: #333;color: #fff;}
.user .play-btn{width: 135px;margin: 0 auto;padding: 7px 0;border: 1px solid rgba(255, 255, 255, 0.5);color: rgba(255, 255, 255, 0.5);border-radius: 100px;font-size: 14px;cursor: pointer;}
.user .no-result{position: absolute;width: 100%;top: 50%;transform: translateY(-50%);}
.user .no-result .icon{width: 86px;height: 90px;margin: 0 auto;background-image: url('../../assets/img/no.png');background-size: 86px 90px;}
.user .no-result p{margin-top: 30px;font-size: 14px;color: rgba(255, 255, 255, 0.3);}
.user .list-wrapper{position: absolute;top: 110px;bottom: 60px;width: 100%;}
.user .list-scroll{height: 100%;overflow: hidden;padding: 20px 30px;}
.user .song-list ul li{list-style: none;text-align: left;cursor: pointer;}
.user .song-list ul li h2{margin: 0;color: #fff;font-weight: 300;font-size: 14px;}
.user .song-list ul li .desc{margin-top: 5px;color: rgba(255, 255, 255, 0.3);font-size: 14px;}
</style>
