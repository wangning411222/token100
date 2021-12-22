import qs from 'qs'
import request from '@/utils/request'
// 市值排名
export function newsList(data) {
  return request({
    url: '/appNews/newsList',
    method: 'post',
    data: qs.stringify(data),
    hideloading: true // 隐藏 loading 组件
  })
}
