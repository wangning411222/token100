import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'

// 根据环境不同引入不同api地址
const baseURL = process.env.VUE_APP_BASE_API
// create an axios instance
const service = axios.create({
  baseURL: baseURL, // url = base api url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['userToken'] = token
    }
    config.headers['languageId'] = store.getters.languageId === 'CNY' ? 'zh-CN' : 'en-US'
    if (config.ContentType) {
      config.headers['Content-Type'] = config.ContentType
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    if (res.status && res.status !== 200) {
      // 登录超时,重新登录

      return Promise.reject(res || 'error')
    } else {
      if (res.ok) {
        return Promise.resolve(res.data)
      } else {
        if (!res.ok && res.message === 'token有误') {
          store.dispatch('setIsLogin', false)
          localStorage.setItem('token', '')
        }
        return Promise.resolve(res.ok)
      }
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
