// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElmentUI from 'element-ui'
import VueAMap from 'vue-amap'
import { lazyAMapApiLoaderInstance } from 'vue-amap'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/animate.css'
Vue.use(ElmentUI)
Vue.use(VueAMap)
Vue.config.productionTip = false
import store from './store'

VueAMap.initAMapApiLoader({
  key: '3f027b691362f39e8c7b5f338e1b3ac6',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
lazyAMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
})
/* eslint-disable no-new */
Vue.filter('timeDouble', val => val < 10 ? `0${val}` : val)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
