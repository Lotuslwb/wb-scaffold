//index.js
//获取应用实例

import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';
const app = getApp();

Page({
  data: {
  },
  onLoad: async function(options) {
    const { time: date } = options;
    const timeArr = date.split('-');
    const month = timeArr[1];
    const day = timeArr[2];
    this.setData({
      month,
      day,
    })
    let data = await app.HttpService.getCycleHistory({ date }).then(
      res => res.data
    );
    if (data && data.length) {
      // 取今天的数据
      const { plan_id, data_type } = data[0];
      this.splitDetail(data);
      this.setData({
        plan_id,
        data_type,
      });
    }
  },
  splitDetail: function(detail) {
    // let handledDetail = [];
    // let tmp = [];
    // for (let i = 0; i < detail.length; i++) {
    //   tmp.push(detail[i]);
    //   if (tmp.length === 2) {
    //     handledDetail.push(tmp);
    //     tmp = [];
    //   }
    //   // 如果最后一个是奇数
    //   if (i === detail.length - 1 && i % 2 === 0) {
    //     handledDetail.push(tmp);
    //   }
    // }
    this.setData({
      handledDetail: detail
    });
  },
  goToPic: function(e) {
    const { plan_id } = this.data;
    const { pid, pname } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/log/pic?plan_id=${plan_id}&part_id=${pid}&part_name=${pname}`
    });
  }
});
