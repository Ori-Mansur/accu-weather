import Vue from 'vue'
import Vuex from 'vuex'
import forecastsStore from './forecastsStore'
import searchStore from './searchStore'
import locationStore from './locationStore'
import favoriteStore from './favoriteStore'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    locationStore,
    favoriteStore,
    searchStore,
    forecastsStore
  }
})
