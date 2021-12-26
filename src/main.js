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
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.getItem('languageSet') || 'zh', // 从localStorage里获取用户中英文选择，没有则默认中文
  messages: {
    'zh': require('./components/language/zh'),
    'en': require('./components/language/en')
  }
})
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
  i18n,
  render: h => h(App)
})
