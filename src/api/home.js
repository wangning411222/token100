// import qs from 'qs'

import request from '@/utils/request'

export function getUserInfo(params) {
  return request({
    url: '/user/userinfo',
    method: 'post',
    data: params,
    hideloading: true // 隐藏 loading 组件
  })
}

