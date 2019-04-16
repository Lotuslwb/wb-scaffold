//index.js
//获取应用实例

import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';
import qiniuUploader from '../../plugins/qiniuUploader';
const app = getApp();

Page({
  data: {

  },
  onLoad: async function(options) {
    const { part_id, plan_id, part_name } = options;
    let data = await app.HttpService.getPartImg({ part_id, plan_id }).then(
      res => res.data
    );
    const {imgs = []} = data;
    const files = imgs.map(item => item.img_url)
    let firstRow = [];
    let restRow = [];
    if (imgs.length > 3) {
      firstRow = imgs.slice(0, 3);
      restRow = imgs.slice(3);
    } else {
      firstRow = imgs;
    }
    this.setData({
      firstRow,
      restRow,
      part_name,
      files,
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    });
  },
});
