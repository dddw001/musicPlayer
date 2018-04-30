<template>
  <div class="nav">
      <dl>
          <dt v-for="item in list">
              <a :href="`#${item}`">{{item}}</a>
          </dt>
      </dl>
  </div>
</template>

<script>
var list=['热','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
export default {
    data(){
        return{
            list:list
        }
    }
    // mounted(){
    // var aGroup=document.getElementsByClassName('group');
    // console.log(aGroup.length);
    // for(let i=0;i<aGroup.length;i++){
    //   console.log(aGroup[i]);
    // }
  //}
}
</script>

<style>
.singer .nav{position: fixed;top: 15px;right: 0;}
.singer .nav a{text-decoration: none;color: rgba(255, 255, 255, 0.5);font-size: 12px;padding: 3px;}
.singer .nav .active{color:#ffcd32;}
</style>
