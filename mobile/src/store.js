import Vue from 'vue'
import Vuex from 'vuex'

import router from './router'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'http://125.227.84.249:8080/',
    IMEI: window.IMEI, //window.IMEI,//window.IMEI, //'99000783158573'
    lat: 0,
    lng: 0
  },
  mutations: {
    setGeo (state, payload) {
      state.lat = payload.lat
      state.lng = payload.lng
    }
  },
  actions: {

  },
  getters: {
  }
})
