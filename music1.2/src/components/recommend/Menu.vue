<template>
    <div class="menu">
        <h4>热门歌单推荐</h4>
        <dl>
            <dt v-for="item in hotList" @click="play(item)">
                <div class="pic"><img :src="item.albumpic_small" alt=""></div>
                <div class="desc">
                    <p class="song-name">{{item.songname}}</p>
                    <p class="singer-name">{{item.singername}}</p>
                </div>
            </dt>
        </dl>
        <router-view/>
    </div>
</template>
<script>
import axios from 'axios'
import {getHot} from '../../data/getHot'
export default {
    data(){
        return{
            hotList:[]
        }
    },
    mounted(){
        getHot().then(res=>{
            //console.log(res);
            this.hotList=res;
        })
    },
    methods:{
        play(item){
            this.$router.push({
                path:`/recommend/${item.albumid}`
            })
        }
    }
}
</script>
<style>
.menu h4{text-align: center;color: #ffcd32;}
.menu dl dt>div{display: inline-block;}
.menu dl dt{padding: 0 20px 20px 20px;cursor: pointer;}
.menu .pic{vertical-align: top;font-size: 0;}
.menu .desc .singer-name{color: rgba(255, 255, 255, 0.3);font-size: 14px;}
</style>
