<template>
  <div class="list">
      <dl>
          <dt v-for="(items,index) in singerList" class="group" :id="items[0].firstchar">
              <h4 class="group-title">{{items[0].firstchar}}</h4>
              <dl class="group-item">
                  <dt v-for="item in items" @click="open(item)">
                      <img :src="item.avatar_small" alt="">
                      <span class="name">{{item.name}}</span>
                  </dt>
              </dl>
          </dt>
      </dl>
      <router-view/>
  </div>
</template>

<script>
import {getSinger} from '../../data/singer'
var singerList=[];
export default {
    data(){
        return{
            singerList:singerList
        }
    },
    mounted(){
        getSinger().then(res=>{
            //console.log(res.artist instanceof Array);
            this.singerList=res.artist;
            //按首字母排序
            function compare(firstchar){
                return function(obj1,obj2){
                    var v1=obj1[firstchar];
                    var v2=obj2[firstchar];
                    if(v1>v2){
                        return 1;
                    }
                    else if(v1<v2){
                        return -1;
                    }
                    else{
                        return 0;
                    }
                }
            }
            this.singerList.sort(compare("firstchar"));
            //把首字母相同的分为一组
            var arr=[];
            for(let i=0;i<this.singerList.length-1;i++){
                for(let j=i+1;j<this.singerList.length;j++){
                    if(this.singerList[i].firstchar!=this.singerList[j].firstchar){
                        arr.push(this.singerList.slice(i,j));
                        i=j;
                    }
                }
            } 
            this.singerList=arr;
            //console.log(this.singerList);
        })
    },
    methods:{
        open(item){
            this.$router.push({
                path:`/singer/${item.ting_uid}`
            })
        }
    }
}
</script>

<style>
.list h4{background: #333;color: rgba(255, 255, 255, 0.5);font-size: 14px;line-height: 30px;padding-left: 20px;}
.list .group-item dt{padding-left: 30px;padding-top: 20px;}
.list .group-item dt img{vertical-align: middle;border-radius: 50%;}
.list .group-item dt .name{margin-left: 20px;font-size: 16px;color: rgba(255, 255, 255, 0.5);}
.list .group-item dt{cursor: pointer;}
</style>
