//index.js
//获取应用实例

import regeneratorRuntime, {
  async
} from '../../plugins/regenerator-runtime/runtime';
import moment from '../../js/moment.min';
const app = getApp();

// is_auth：0未报名  -1审核中 1通过
// status 1：报名中，2:直播中，3：已结束
// role -1未报名 1普通 2管理员或嘉宾

Page({
  data: {
    timerInfo: {
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
    }
  },
  onLoad: async function (options) {
    const code = options.code || '';
    console.log('start_code', code);
    if (code) {
      wx.setStorageSync('invite_code', code);
      try {
        await app.HttpService.toBeguess({
          invite_code: code
        })
      } catch (error) {

      }
    }

    const roomInfo = await app.HttpService.getClassroomInfo({
      classroom_id: options.id
    }).then(res => res.data);
    const {
      invite_title
    } = await app.HttpService.getInvite({
      room_id: options.id
    }).then(res => res.data);

    this.setData({
      roomInfo,
      invite_title,
      code,
    })
    setInterval(() => {
      this.renderTimer();
    }, 1000)
  },
  renderTimer: function () {
    const {
      start_time
    } = this.data.roomInfo;
    let startTime = new Date(start_time.replace(/-/g, "/")).getTime();
    let diff = startTime - new Date().getTime();
    if (diff <= 0) {
      return false;
    }

    const int_day = Math.floor(diff / 86400000)
    diff -= int_day * 86400000;
    const int_hour = Math.floor(diff / 3600000)
    diff -= int_hour * 3600000;
    const int_minute = Math.floor(diff / 60000)
    diff -= int_minute * 60000;
    const int_second = Math.floor(diff / 1000)
    this.setData({
      timerInfo: {
        day: int_day,
        hour: int_hour,
        min: int_minute,
        sec: int_second,
      }
    })
  },
  gotoHandle: function (e) {
    const {
      url,
      type
    } = e.currentTarget.dataset;
    app.globalData.room_id = this.data.roomInfo.id;
    if (type == 'navbar') {
      wx.switchTab({
        url,
      });
    } else {
      wx.navigateTo({
        url
      });
    }
  },
  onShareAppMessage: function (res) {
    const {
      invite_title,
      roomInfo
    } = this.data;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    const config = {
      imageUrl: roomInfo.invite_img,
      title: invite_title,
      path: '/pages/im/start?id=' + roomInfo.id
    };
    return config;
  },
});