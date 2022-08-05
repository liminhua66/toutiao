import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  // JSON.parse(localStorage.getItem('TOUITIAO-TOKEN'))
  state: {
    tokenObj: getToken() || ''
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      // localStorage.setItem('TOUITIAO-TOKEN', JSON.stringify(payload))
      // storage.set('TOUITIAO-TOKEN', payload)
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
