<template>
  <div class="hot-search">
      <h4>热门搜索</h4>
      <dl>
          <dt v-for="item in hotList" @click="hotKey(item)">{{item}}</dt>
      </dl>
  </div>
</template>

<script>
var hotList=['病变','说散就散','空空如也','周杰伦','毛不易','等你下课','离人','差一步','消愁','我们不一样'];
export default {
    data(){
        return{
            hotList:hotList
        }
    },
    methods:{
        hotKey(val){
            this.$emit('hotSearch',val);
        }
    }
}
</script>

<style>
.hot-search{margin: 0 20px 20px 20px;}
.hot-search dl dt{display: inline-block;padding: 5px 10px;margin: 0 20px 10px 0;background: #333;border-radius: 6px;font-size: 14px;color: rgba(255, 255, 255, 0.3);cursor: pointer;}
</style>
