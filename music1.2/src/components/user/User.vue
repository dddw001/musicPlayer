<template>
  <div class="user">
      <div class="back">
          <i class="iconfont icon-houtui" @click="back"></i>
      </div>
      <div class="switches-wrapper">
          <ul class="switches">
              <li class="switch-item" v-for="(item,index) in switches" :class="{active:item.active}" @click="toggle(index)">
                  <span>{{item.text}}</span>
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
                      <li v-for="item in switches[0].active?likeList:listenList" @click="play(item)">
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
  </div>
</template>

<script>
import {play} from '../../data/play'
var switches=[{text:'我喜欢的',active:true},{text:'最近听的',active:false}]
export default {
    data(){
        return{
            switches:switches,
            likeList:[],
            listenList:[]
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        toggle(index){
            if(index==0){
                this.switches[0].active=true;
                this.switches[1].active=false;
            }
            if(index==1){
                this.switches[0].active=false;
                this.switches[1].active=true;
            }
        },
        play(item){
            this.$emit('playById',item.id);
            var old=this.listenList;
            var index;
            var cur;
            for(let i=0;i<old.length;i++){
                if(item.id==old[i].id){
                    index=i;
                    break;
                }
            }
            cur=old[index];
            this.listenList.splice(index,1);
            this.listenList.unshift(cur);
        },
        playAll(){
            var arr=[];
            if(switches[0].active){
                arr=this.likeList;
            }
            else{
                arr=this.listenList;
            }
            this.$emit('playAll',arr);
        }
    },
    mounted(){
        if(localStorage.getItem('loveSongs')&&localStorage.getItem('loveSongs').length>0){
            var arr1=localStorage.getItem('loveSongs').split(',');
            loop(0);
            let that=this;
            function loop(i){
                if(i!=arr1.length){
                    return play(arr1[i]).then(res=>{
                        that.likeList.push({'id':res.songinfo.song_id,'author':res.songinfo.author,'title':res.songinfo.title});
                        return loop(i+1);
                    })
                }
            }
        }
        if(localStorage.getItem('listenList').length>0){
            var arr2=localStorage.getItem('listenList').split(',');
            loop(0);
            let that=this;
            function loop(i){
                if(i!=arr2.length){
                    return play(arr2[i]).then(res=>{
                        that.listenList.push({'id':res.songinfo.song_id,'author':res.songinfo.author,'title':res.songinfo.title});
                        return loop(i+1);
                    })
                }
            }
        }
    },
    watch:{
        listenList(val){
            //console.log(val[0].author);
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
