import qs from 'qs'
import request from '@/utils/request'
// 交易所详情
export function marketInfo(data) {
  return request({
    url: `/appMarket/marketInfo?marketId=${data}`,
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}
// ER全球交易所排行
export function marketChangePage(data) {
  return request({
    url: '/appMarket/marketChangePage',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}
// 持有资产排行
export function marketHoldPage(data) {
  return request({
    url: '/appMarket/marketHoldPage',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}
// 合约平台
export function marketContractPage(data) {
  return request({
    url: '/appMarket/marketContractPage',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}
//   OTC
export function marketOtcPage(data) {
  return request({
    url: '/appMarket/marketOtcPage',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}
// 活跃平台
export function marketActivePage(data) {
  return request({
    url: '/appMarket/marketActivePage',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}
// 交易所-K线
export function marketKline(data) {
  return request({
    url: '/appMarket/marketKline',
    method: 'post',
    data: qs.stringify(data),
    hideloading: true // 隐藏 loading 组件
  })
}
// 交易所-行情
export function marketTickerPage(data) {
  return request({
    url: '/appMarket/marketTickerPage',
    method: 'post',
    data: qs.stringify(data),
    hideloading: true // 隐藏 loading 组件
  })
}
// 交易所-公告
export function marketNews(data) {
  return request({
    url: '/appMarket/marketNews',
    method: 'post',
    data: qs.stringify(data),
    hideloading: true // 隐藏 loading 组件
  })
}
