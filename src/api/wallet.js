
import qs from 'qs'
import request from '@/utils/request'
// 市值排名
export function walletClassify(data) {
  return request({
    url: '/appWallet/walletClassify',
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}

// 钱包列表
export function walletList(data) {
  return request({
    url: '/appWallet/walletList',
    method: 'post',
    data: qs.stringify(data),
    hideloading: true // 隐藏 loading 组件
  })
}
