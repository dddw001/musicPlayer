<template>
    <div class="header">
        <div class="wrap">
            <div class="logo"></div>
            <h1 class="header-title">SaltyFish Music</h1>
            <div class="personal" @click="open">
                <i class="iconfont icon-gerenzhongxin"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  methods:{
      open(){
          this.$router.push('/user');
      }
  }
}
</script>
<style>
.header{height: 44px;color: #ffcd32;text-align: center;}
.header .logo{display: inline-block;width: 30px;height: 32px;background: url('../../img/default.png');background-size: 30px 32px;margin-top: 6px;margin-right: 9px;vertical-align: top;}
.header .header-title{display: inline-block;margin: 0;font-size: 18px;line-height: 44px;}
.header .personal{float: right;cursor: pointer;}
.header .personal i{display: block;padding: 12px;font-size: 20px;}
</style>
