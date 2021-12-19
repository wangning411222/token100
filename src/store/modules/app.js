const state = {
  userName: '',
  isLogin: false,
  languageId: 'zh-CN'
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
  }
}
export default {
  state,
  mutations,
  actions
}
