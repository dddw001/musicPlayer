<template>
  <div class="disc">
    <div class="back">
        <i class="iconfont icon-houtui" @click="back"></i>
    </div>
    <h3 class="title">{{music.songname}}</h3>
    <div class="play">
        
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {getHot} from '../../data/getHot'
export default {
    data(){
        return{
            music:{}
        }
    },
    mounted(){
        getHot().then(res=>{
            for(let i=0;i<res.length;i++){
                console.log(res);
                //console.log(res[i].albumid);
                if(this.$route.params.id==res[i].albumid){
                    this.music=res[i];
                    var oDisc=document.getElementsByClassName('disc')[0]
                    oDisc.style.backgroundImage=`url(${this.music.albumpic_big})`;
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
.disc{position: fixed;left: 0;top: 0;right: 0;bottom: 0;background: #222;z-index: 999;text-align: center;background-size: cover;}
.disc .back{display: inline-block;position: absolute;left: 0;top: 0;}
.disc .back i{display: inline-block;font-size: 22px;padding: 10px;color: #ffcd32;cursor: pointer;}
.disc .title{display: inline-block;margin: 10px;}
</style>
