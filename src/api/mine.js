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
// 登陆
export function login(data) {
  return request({
    url: `/appUser/login?code=${data.code}&phone=${data.phone}&userPassword=${data.userPassword}`,
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}
// 获取个人信息
export function getUser(data) {
  return request({
    url: `/appUser/getUser`,
    method: 'post',
    data: data,
    hideloading: true // 隐藏 loading 组件
  })
}

// 发送验证码
export function smsSend(data) {
  return request({
    url: `/appUser/smsSend?code=${data.code}&phone=${data.phone}`,
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}
// 注册
export function register(data) {
  return request({
    url: `/appUser/register?code=${data.code}&phone=${data.phone}&smsCode=${data.smsCode}&userPassword=${data.userPassword}`,
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}
// 忘记密码后修改
export function userPasswordUpdate(data) {
  return request({
    url: `/appUser/userPasswordUpdate?smsCode=${data.smsCode}&userPassword=${data.userPassword}`,
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}
// 修改账号
export function userNameUpdate(data) {
  return request({
    url: `/appUser/userNameUpdate?code=${data.code}&smsCode=${data.smsCode}&phone=${data.phone}`,
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}
// 关于我们
export function getSetting(data) {
  return request({
    url: `/appUser/getSetting?settingTitle=${data.settingTitle}`,
    method: 'post',
    data: {},
    hideloading: true // 隐藏 loading 组件
  })
}

