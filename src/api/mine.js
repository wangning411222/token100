import qs from 'qs'
import request from '@/utils/request'
// 交易所详情
export function getCountry(data) {
  return request({
    url: `/appUser/getCountry`,
    method: 'post',
    data: qs.stringify({}),
    hideloading: true // 隐藏 loading 组件
  })
}
export function login(data) {
  return request({
    url: `/appUser/login`,
    method: 'post',
    data: qs.stringify({ data }),
    hideloading: true // 隐藏 loading 组件
  })
}

