//index.js
//获取应用实例

import regeneratorRuntime, {
  async
} from '../../plugins/regenerator-runtime/runtime';
const app = getApp();

Page({
  data: {},
  onLoad: async function() {
    const articleList = await app.HttpService.articleList({
      currentPageCount: 999
    }).then(res => res.data.list);
    this.setData({
      articleList
    });
  },
  navToDetail: function(e) {
    const { id, url } = e.currentTarget.dataset;
    const detail = this.data.articleList.filter(item => item.id == id);

    // 由于详情页的url链接字符串里有问号等特殊字符，不能直接从url里传过去，所以存储在本地
    wx.setStorageSync('articleUrl', detail[0].detail_url);
    wx.navigateTo({
      url
    });
  }
});
