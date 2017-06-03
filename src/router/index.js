import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
Vue.use(Router)

const home = resolve => require(['@/pages/home/home'], resolve)
const city = resolve => require(['@/pages/city/city'], resolve)
const msite = resolve => require(['@/pages/msite/msite'], resolve)
export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children:[
      	{
      		path:'',
      		redirect:'/home'
      	},
      	{
      		path:'home',
      		component:home
      	},
        {
          path:'city/:cityid',
          component:city
        },
        {
          path:'msite/:geohash',
          component:msite
        }
      ]
    }
  ]
})
