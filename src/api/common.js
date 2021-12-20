
import request from '@/utils/request'
// banner
export function bannerList() {
  return request({
    url: '/appSymbol/bannerList',
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}
// 全局弹窗
export function total() {
  return request({
    url: '/appSymbol/total',
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}

// 汇率列表
export function rateList() {
  return request({
    url: '/appSymbol/rateList',
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}

