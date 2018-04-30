<template>
  <div class="history">
      <h3>
        搜索历史
        <i class="iconfont icon-lajixiang" @click="clear"></i>
      </h3>
      <dl>
          <dt v-for="item in historyList">
            {{item}}
            <span class="iconfont icon-cha" @click="deleteItem(item)"></span>
          </dt>
      </dl>
  </div>
</template>

<script>
export default {
    props:["historyList"],
    methods:{
        clear(){
            localStorage.removeItem('searchHistory');
            this.$emit('clearHistory');
        },
        deleteItem(item){
            var arr=localStorage.getItem('searchHistory').split(',');
            var index=arr.indexOf(item);
            arr.splice(index,1);
            localStorage.setItem('searchHistory',arr);
            this.$emit('deleteItem');
        }
    }
}
</script>

<style>
.history{margin: 0 20px 20px 20px;}
.history .icon-lajixiang{float: right;cursor: pointer;}
.history dl dt{font-size: 14px;color: rgba(255, 255, 255, 0.3);cursor: pointer;}
</style>
