import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import topicModule from "@/store/modules/topicModule";

export default new Vuex.Store({
  modules: {
    topicModule,
  },
  state: {
  },
  getters: {
    /**
     * Returns api url depending on enviroment (dev or production)
     * @returns {string}
     */
    apiUrl(){
      return location.href.indexOf('localhost') === -1? 'https://api.dyskutuje.pl' : 'http://localhost:2000'
    },
    /**
     * Returns front url depending on enviroment (dev or production)
     * @returns {string}
     */
    frontUrl(){
      return location.href.indexOf('localhost') === -1? 'https://dyskutuje.pl' : 'http://localhost:8080'
    },
  },
  mutations: {
  },
  actions: {
  },

})
