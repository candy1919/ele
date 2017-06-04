import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)
const states = {
	latitude: '', // 当前位置纬度
	longitude: '', // 当前位置经度
	geohash: ''
}
export default new Vuex.Store({
	states,
	mutations,
	actions
})