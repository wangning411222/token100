
import request from '@/utils/request'
// 交易所详情
export function searchHotList() {
  return request({
    url: `/appSymbol/searchHotList`,
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}
// 搜索接口
export function searchPage(data) {
  return request({
    url: `/appSymbol/searchPage`,
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}

