// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/lib'

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<router-view transition="slide"></router-view>',
  methods: {
    showPosition(position) {
      store.commit({
        type: 'setGeo',
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }
  },
  mounted () {

    if (navigator.geolocation) {//
      navigator.geolocation.getCurrentPosition(this.showPosition);//有拿到位置就呼叫 showPosition 函式
    } else {
      alert('請開啟手機定位')
    }
  }
})

