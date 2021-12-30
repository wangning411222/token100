import qs from 'qs'
import request from '@/utils/request'
// 新闻列表
export function newsList(data) {
  return request({
    url: '/appNews/newsList',
    method: 'post',
    data: qs.stringify(data),
    hideloading: true // 隐藏 loading 组件
  })
}
// 新闻详情
export function newsGet(data) {
  return request({
    url: '/appNews/newsGet',
    method: 'post',
    data: qs.stringify(data),
    hideloading: true // 隐藏 loading 组件
  })
}

// 利好利空
export function newsLike(data) {
  return request({
    url: '/appNews/newsLike',
    method: 'post',
    data: qs.stringify(data),
    hideloading: true // 隐藏 loading 组件
  })
}
