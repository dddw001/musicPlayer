<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
    <router-view @playById='begin'/>
    <play :musicId="id"></play>
  </div>
</template>

<script>
import Header from './components/header/Header'
import Tab from './components/tab/Tab'
import Play from './components/common/Play'
export default {
  name: 'App',
  components:{Header,Tab,Play},
  data(){
    return{
      id:''
    }
  },
  mounted(){
    if(!localStorage.getItem('loveSongs')){
      localStorage.setItem('loveSongs',[]);
    }
    if(!localStorage.getItem('listenList')){
      localStorage.setItem('listenList',[]);
    }
    //console.log(localStorage.getItem('loveSongs'));
  },
  methods:{
    begin(val){
      this.id=val;
    }
  }
}
</script>

<style>
html,body{margin: 0;padding: 0;}
body{background: #222;color: #fff;}
</style>
