<template>
  <div class="singer">
      <HotSinger></HotSinger>
      <SingerList></SingerList>
      <Nav></Nav>
  </div>
</template>

<script>
import HotSinger from './HotSinger'
import SingerList from './SingerList'
import Nav from './Nav'
export default {
  components:{HotSinger,SingerList,Nav}
}
</script>

<style>

</style>
