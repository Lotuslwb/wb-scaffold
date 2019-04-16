//index.js
//获取应用实例

import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';
import { handleInput, hanldSelectChange } from '../form/formUtils';
const app = getApp();

Page({
  data: {
    type: 4,
    currentDay: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    ).valueOf()
  },
  onLoad: async function(options) {
    const { time: date, before } = options;
    const timeArr = date.split('-');
    const month = timeArr[1];
    const day = timeArr[2];
    let isEditable = true;

    if (before === 'true') {
      isEditable = false;
    }
    this.setData({
      month,
      day,
      time: date,
      isEditable
    });

    let data = await app.HttpService.getPlanDetail({
      date,
      type: this.data.type
    }).then(res => res.data);
    let {
      info: { record_id = '', plan_id, is_return },
      today
    } = data;
    this.setData({
      record_id,
      plan_id,
      is_return
    });

    // 处理今天的数据
    if (today) {
      const { number = '', hospital = '', doctor = '', remark = '' } = today;
      this.setData({
        number,
        hospital,
        doctor,
        remark
      });
    }
  },
  goToChoose: function() {
    wx.switchTab({
      url: '/pages/log/index'
    });
  },
  handleInput: function(e) {
    handleInput.call(this, e);
  },
  hanldSelectChange: function(e) {
    hanldSelectChange.call(this, e);
  },
  editRecord: function(e) {
    const {
      record_id,
      plan_id,
      number,
      hospital,
      doctor,
      time,
      remark,
      type
    } = this.data;
    const postData = {
      record_id,
      plan_id,
      type,
      detail: {
        number,
        hospital,
        doctor,
        time,
        remark
      }
    };
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
              });
            }, 2000);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
});
