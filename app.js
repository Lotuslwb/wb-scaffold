//app.js
import WxValidate from './plugins/wx-validate/WxValidate'
import WxService from './plugins/wx-service/WxService'
import HttpResource from './helpers/HttpResource'
import HttpService from './helpers/HttpService'
import __config from './etc/config'

App({
  onLaunch() {
    wx.showShareMenu()
    const res = wx.getSystemInfoSync();
    console.log(res.model);
    this.globalData.isIphX = (res.model.indexOf('iPhone X') > -1);
  },
  onShow() {},
  onHide() {

  },
  globalData: {
    userInfo: null,
  },
  renderImage(path) {
    if (!path) return ''
    if (path.indexOf('http') !== -1) return path
    return `${this.__config.domain}${path}`
  },
  WxValidate: (rules, messages) => new WxValidate(rules, messages),
  HttpResource: (url, paramDefaults, actions, options) => new HttpResource(url, paramDefaults, actions, options).init(),
  HttpService: new HttpService({
    baseURL: __config.basePath,
  }),
  WxService: new WxService,
  __config,
  globalData: {
    room_id: null,
  }
})