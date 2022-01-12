import { rateList } from '@/api/common'
const state = {
  userName: '',
  isLogin: false,
  languageId: 'CNY',
  globalRate: 1,
  rateArr: [],
  isShow: true,
  newsTabs: 0,
  hangqingTabs: 1,
  pingtaiTas: 0,
  qianbaoTabs: 0
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_USER_NEWSTABS(state, index) {
    state.newsTabs = index
  },
  SET_USER_HANGQINGTABS(state, index) {
    state.hangqingTabs = index
  },
  SET_USER_QIANBAOTABS(state, index) {
    state.qianbaoTabs = index
  },
  SET_USER_PINGTAITABS(state, index) {
    state.pingtaiTas = index
  },
  SET_USER_LOGIN(state, login) {
    state.isLogin = login
  },
  // 当前语言版本 CNY中文 USD英文
  SET_USER_LANGUAGE(state, languageId) {
    state.languageId = languageId
  },
  // 全局汇率
  SET_USER_RATE(state, globalRate) {
    state.globalRate = globalRate
  },
  // 汇率数组
  SET_USER_RATEARR(state, arr) {
    state.rateArr = arr
  },
  SET_USER_show(state, flag) {
    state.isShow = flag
  }
}
const actions = {
  setShow({ commit }, flag) {
    commit('SET_USER_show', flag)
  },
  setNewTabs({ commit }, index) {
    commit('SET_USER_NEWSTABS', index)
  },
  setqianbaoTabs({ commit }, index) {
    commit('SET_USER_QIANBAOTABS', index)
  },
  setHangqingTabs({ commit }, index) {
    commit('SET_USER_HANGQINGTABS', index)
  },
  setPingtaiTabs({ commit }, index) {
    commit('SET_USER_PINGTAITABS', index)
  },
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  setIsLogin({ commit }, flag) {
    commit('SET_USER_LOGIN', flag)
  },
  setLanguageId({ commit }, languageId) {
    commit('SET_USER_LANGUAGE', languageId)
  },
  setRate({ commit }, globalRate) {
    commit('SET_USER_RATE', globalRate)
  },
  getRateArr({ commit }, arr) {
    return new Promise((resolve, reject) => {
      rateList().then(res => {
        resolve(res)
        commit('SET_USER_RATEARR', res)
      })
    })
  }
}
export default {
  state,
  mutations,
  actions
}
