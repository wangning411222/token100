const state = {
  userName: '',
  isLogin: false,
  languageId: 'zh-CN',
  globalRate: 0
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_USER_LOGIN(state, login) {
    state.isLogin = login
  },
  SET_USER_LANGUAGE(state, languageId) {
    state.languageId = languageId
  },
  SET_USER_RATE(state, globalRate) {
    state.globalRate = globalRate
  }
}
const actions = {
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
  }
}
export default {
  state,
  mutations,
  actions
}
