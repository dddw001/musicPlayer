<template>
  <div class="detail">
    <div class="back">
        <i class="iconfont icon-houtui" @click="back"></i>
    </div>
    <h3 class="title">{{singer.name}}</h3>
  </div>
</template>

<script>
import {getSinger} from '../../data/singer'
export default {
    data(){
        return{
            singer:{}
        }
    },
    mounted(){
        getSinger().then(res=>{
            //console.log(res.artist[45].ting_uid);
            //console.log(res.artist[0]);
            for(let i=0;i<res.artist.length;i++){
                if(this.$route.params.id==res.artist[i].ting_uid){
                    this.singer=res.artist[i];
                    //console.log(this.singer.avatar_big)
                    //var picUrl=require(`${this.singer.avatar_big}`);
                    var oDetail=document.getElementsByClassName('detail')[0]
                    oDetail.style.backgroundImage=`url(${this.singer.avatar_big})`;
                    break;
                }
            }
        })
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
