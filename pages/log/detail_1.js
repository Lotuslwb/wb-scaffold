//index.js
//获取应用实例

import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';
import { handleInput } from '../form/formUtils';
const app = getApp();

Page({
  data: {
    type: 1,
  },
  onLoad: async function(options) {
    const { time: date } = options;
    const timeArr = date.split('-');
    const month = timeArr[1];
    const day = timeArr[2];
    this.setData({
      month,
      day
    });
    let data = await app.HttpService.getPlanDetail({
      date,
      type: this.data.type,
    }).then(res => res.data);
    let {
      info: { record_id = '', plan_id, is_return, data_type },
      last: prev,
      today
    } = data;
    this.setData({
      record_id,
      plan_id,
      is_return,
      data_type,
    });

    // 处理今天的数据
    if (today && today.length) {
      // this.splitDetail(today, 'current');
      this.setData({
        detail: today,
      })
    }
    // 处理上一次的数据
    if (prev && prev.length > 0) {
      this.splitDetail(prev, 'prev');
    }
  },
  splitDetail: function(detail, day) {
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
      [day]: [...detail]
    });
  },
  handleInput: function(e) {
    handleInput.call(this, e);
    this.splitDetail(this.data.detail);
  },
  editRecord: function(e) {
    const { record_id, plan_id, detail, type, data_type } = this.data;
    const postData = {
      type,
      record_id,
      plan_id,
      detail
    };
    let msg = '';
    let flag = 1;
    for (let item of detail) {
      if (!item.time) {
        msg = '请填写信息';
        flag = 0;
        break;
      } else if (data_type == 1 && (item.time <=0 || item.time > 5)) {
        // 剂量模式下，每一项的范围（0，5]
        msg = '剂量应在0~5之间';
        flag = 0;
        break;
      }
    }
    if (!flag) {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      });
    } else {
      app.HttpService.setPlanDetail(postData)
        .then(data => {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
            success: () => {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  changeTime: function(e) {
    const {index} = e.currentTarget.dataset;
    const copyData = [...this.data.detail];
    copyData[index].time = e.detail.time;
    this.setData({
      detail: copyData
    });
  },
  copyFirst: function(e) {
    let tmp = this.data.detail;
    let firstTime = tmp[0].time;
    tmp = tmp.map(item => ({...item, time: firstTime}))
    this.setData({
      detail: tmp,
    })
  },
});
