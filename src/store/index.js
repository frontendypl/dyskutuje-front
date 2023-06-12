import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import topicModule from "@/store/modules/topicModule";

export default new Vuex.Store({
  modules: {
    topicModule
  },
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

})
