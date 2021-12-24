const getters = {
  userName: state => state.app.userName,
  isLogin: state => state.app.isLogin,
  languageId: state => state.app.languageId,
  globalRate: state => state.app.globalRate,
  globalRateArr: state => state.app.rateArr,
  isShow: state => state.app.isShow
}
export default getters
