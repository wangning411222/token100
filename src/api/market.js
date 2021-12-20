
import request from '@/utils/request'
// 市值排名
export function symbolRankPage(data) {
  return request({
    url: '/appSymbol/symbolRankPage',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}
// 期货合约
export function symbolFuturesPage(data) {
  return request({
    url: '/appSymbol/symbolFuturesPage',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}

// 热搜榜
export function symbolHotList(data) {
  return request({
    url: '/appSymbol/symbolHotList',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}
// 历史高位
export function symbolHignList(data) {
  return request({
    url: '/appSymbol/symbolHignList',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}

// 涨跌榜
export function symbolSortList(data) {
  return request({
    url: '/appSymbol/symbolSortList',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}
// 换手率

export function symbolChangeList(data) {
  return request({
    url: '/appSymbol/symbolChangeList',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}

// 成交额榜
export function symbolVolumeList(data) {
  return request({
    url: '/appSymbol/symbolVolumeList',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}
// 新币上市

export function symbolNewsList(data) {
  return request({
    url: '/appSymbol/symbolNewsList',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}
// 概念详情

export function symbolConceptList(data) {
  return request({
    url: '/appSymbol/symbolConceptList',
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}
