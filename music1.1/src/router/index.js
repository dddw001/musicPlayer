import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/Recommend.vue'
import Singer from '../components/singer/Singer.vue'
import Rank from '../components/rank/Rank.vue'
import Search from '../components/search/Search.vue'
import Disc from '../components/disc/Disc.vue'
import DetailSinger from '../components/singer/DetailSinger.vue'
import DetailRank from '../components/rank/DetailRank.vue'
import User from '../components/user/User.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path:'/recommend',
      name:'recommend',
      component:Recommend,
      children:[
        {path:':id',component:Disc}
      ]
    },
    {
      path:'/singer',
      name:'singer',
      component:Singer,
      children:[
        {path:':id',component:DetailSinger}
      ]
    },
    {
      path:'/rank',
      name:'rank',
      component:Rank,
      children:[
        {path:':id',component:DetailRank}
      ]
    },
    {
      path:'/search',
      name:'search',
      component:Search
    },
    {
      path:'/user',
      component:User
    }
  ]
})
