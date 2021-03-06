const getters = {
  userName: state => state.app.userName,
  isLogin: state => state.app.isLogin,
  languageId: state => state.app.languageId,
  globalRate: state => state.app.globalRate,
  globalRateArr: state => state.app.rateArr,
  isShow: state => state.app.isShow,
  newsTabs: state => state.app.newsTabs,
  hangqingTabs: state => state.app.hangqingTabs,
  pingtaiTas: state => state.app.pingtaiTas,
  qianbaoTabs: state => state.app.qianbaoTabs
}
export default getters
