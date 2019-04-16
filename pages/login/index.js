//index.js
//获取应用实例

import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';
const app = getApp();


Page({
  data: {

  },
  onLoad: async function (options) {
    let token = wx.getStorageSync('token');
    if (token) {
      wx.navigateTo({
        url: "/pages/im/index"
      });
    }
  },
  bindGetUserInfo(e) {
    let userInfo = e.detail.userInfo
    wx.setStorageSync('userInfo', userInfo);
    this.getToken(userInfo);
  },
  onShow: function () {

  },
  getToken: async (userInfo) => {
    try {
      let invite_code = wx.getStorageSync('invite_code');;
      let code = await app.WxService.login().then(res => res.code);
      let res = await app.HttpService.login({
        noToken: true,
        code,
        user_info: JSON.stringify(userInfo)
      }).then(res => res.data);
      res.user_id && wx.setStorageSync('userid', res.user_id);
      res.token && wx.setStorageSync('token', res.token);
      if (invite_code) {
        try {
          await app.HttpService.toBeguess({
            invite_code: invite_code
          })
          wx.removeStorageSync('invite_code')
        } catch (error) {
          console.error(error);
        }
      }

      if (res.is_saved == 1 || invite_code) {
        // 填过个人信息，直接跳转到首页
        wx.switchTab({
          url: '/pages/index/index'
        });
      } else {
        // 未填过个人信息，跳转到个人信息页，让用户去填
        wx.navigateTo({
          url: '/pages/form/personal'
        });
      }

      // wx.navigateBack({
      //   delta: 1
      // })
    } catch (e) {
      console.error(e);
    }
  }
});