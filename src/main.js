// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
import 'moment/locale/zh-cn'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(Lazyload)
Vue.prototype.$moment = moment
// filters
import './filters'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
