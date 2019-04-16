//index.js
//获取应用实例

import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';
const app = getApp();


Page({
  data: {

  },
  onLoad: async function () {
    const resData = await app.HttpService.getBasicCase({}).then(
      res => res.data
    );
    const {data_type, day_type} = resData.model;
    this.setData({
      data_type,
      day_type,
    })
  },
  dayChange: function(e) {
    if (e.detail.value) {
      this.setData({
        day_type: 2
      })
    } else {
      this.setData({
        day_type: 1
      })
    }
  },
  dataChange: function(e) {
    let data_type;
    if (e.detail.value) {
      data_type = 2;
    } else {
      data_type = 1;
    }
    app.HttpService.setModel({data_type}).then(() => {
      this.setData({
        data_type,
      })
    })
  }
});