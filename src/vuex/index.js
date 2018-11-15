import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

// 定义store
let state = {
  selectedCity: {
    city: '中国大陆',
    tel: '86'
  }
}
export default new Vuex.Store({
  state,
  mutations
})
