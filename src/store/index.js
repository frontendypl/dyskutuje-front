import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    apiUrl(){
      return location.href.indexOf('localhost') === -1? 'https://???????' : 'http://localhost:2000'
    },
    frontUrl(){
      return location.href.indexOf('localhost') === -1? 'https://???????' : 'http://localhost:8080'
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
