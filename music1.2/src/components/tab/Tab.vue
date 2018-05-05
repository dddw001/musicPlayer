<template>
    <div class="tab">
        <div class="tab-item" v-for="(item,index) in tabList">
            <span class="tab-link" :class="{active:isCur==index}" @click="change(index)">{{item}}</span>
        </div>
    </div>
</template>
<script>
var tabList=["推荐","歌手","排行","搜索"];
var urlList=["/recommend","/singer","/rank","/search"];
export default {
    data(){
        return{
            tabList:tabList,
            isCur:0,
            urlList:urlList
        }
    },
    methods:{
        change(index){
            this.isCur=index;
            this.$router.push({
                path:`${this.urlList[index]}`
            })
        }
    },
    mounted(){
        for(let i=0;i<this.urlList.length;i++){
            if(this.urlList[i].indexOf(this.$route.name)>-1){
                this.isCur=i;
                break;
            }
        }
    }
}
</script>
<style>
.tab{height: 44px;width:100%;display: flex;line-height: 44px;}
.tab .tab-item{flex: 1;text-align: center;}
.tab .tab-item .tab-link{padding-bottom: 5px;cursor: pointer;}
.tab .active{color:#ffcd32;border-bottom: 2px solid #ffcd32;}
</style>
