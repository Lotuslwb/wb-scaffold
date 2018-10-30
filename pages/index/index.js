//index.js
//获取应用实例
const app = getApp();

Page({
  data: {

  },

  handleMsgCode: function (e) {
    var value = e.detail.value;
  },

  onLoad: function () {

  },
  onShow: function () {

  },
  
  onShareAppMessage: function (res) {
    return {
      title: '偷偷告诉你 say something',
      path: '/pages/index/index'
    }
  }
});