//index.js
//获取应用实例

import regeneratorRuntime, {
  async
} from '../../plugins/regenerator-runtime/runtime';
const app = getApp();

Page({
  data: {},
  onLoad: async function () {
    const list = await app.HttpService.getClassroomList({
      currentPageCount: 999
    }).then(res => res.data);
    this.setData({
      list
    });
  },
  navToDetail: function (e) {
    const {
      url,
      type
    } = e.currentTarget.dataset;
    if (type == 'navbar') {
      wx.switchTab({
        url: url
      });
    } else if (type == 'web') {
      // 由于详情页的url链接字符串里有问号等特殊字符，不能直接从url里传过去，所以存储在本地
      wx.setStorageSync('articleUrl', url);
      wx.navigateTo({
        url: '/pages/news/detail'
      });
    } else {
      wx.navigateTo({
        url
      });
    }
  }
});