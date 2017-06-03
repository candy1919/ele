// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import components from '@/components'
import { Swipe, SwipeItem } from 'vue-swipe';
import "@/assets/css/swipe.css"
import "@/plugins/swipe.js"
Vue.use(VueResource)
Vue.config.productionTip = false

Object.keys(components).forEach(key=>{
	Vue.component(key,components[key])
})
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App ,Swipe , SwipeItem},
})
