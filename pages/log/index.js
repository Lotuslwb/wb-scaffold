//index.js
//获取应用实例

import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';
import moment from '../../js/moment.min';
const app = getApp();

Page({
  data: {
    // 复查日，复查周，未治疗，不完整治疗，完整治疗，复诊，观察，治疗
    statusArray: [
      'recheckDay',
      'recheckWeek',
      'none',
      'halfOk',
      'ok',
      'doctor',
      'watch',
      'heart'
    ],
    today: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    ).valueOf(),
    // today:
    //   '' +
    //   new Date().getFullYear() +
    //   '-' +
    //   (new Date().getMonth() + 1) +
    //   '-' +
    //   new Date().getDate(),
    // chooseDay: ['治疗日', '观察日', '复诊日'],
    start_date: moment()
      .subtract(1, 'M')
      .format('YYYY-MM-DD'),
    end_date: moment()
      .add(1, 'M')
      .format('YYYY-MM-DD'),
    current_date: moment().format('YYYY-MM-DD')
  },
  onLoad: function() {
    // this.setData({
    //   chooseDay: app.globalData.chooseDay
    // });
    // this.getCalendar();
  },
  onUnload: function() {
    // 这一段好像不会进来
    const pages = getCurrentPages();
    const len = pages.length;
    const currentRroute = pages[len - 1];
    currentRroute.setData({
      backAgain: false
    });
  },
  onShow: function() {
    if (this.data.backAgain) {
      this.setData({
        backAgain: false
      });
      wx.switchTab({
        url: '/pages/index/index'
      });
    } else {
      this.getCalendar();
    }
  },
  getCalendar: async function() {
    const { start_date, end_date, current_date } = this.data;
    const preResData = await app.HttpService.getTreatPlan({
      start_date,
      end_date
    }).then(res => res.data);
    if (preResData.have_plan == -1) {
      // 如果基础病历未填，则跳转到基础病历页
      wx.showToast({
        title: '请先完善基础病历',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/form/basicHistory'
            });
          }, 2000);
        }
      });
    } else {
      this.setData({
        chooseDay: preResData.enable_type,
        is_need_confirm: preResData.is_need_confirm
      });
      const resData = handleRes(preResData.records);

      function handleRes(data) {
        let res = [];
        for (let [key, value] of Object.entries(data)) {
          if (value) {
            res.push(Object.assign(value, { time: key }));
          }
        }
        return res;
      }
      let days_style = [];
      for (let item of resData) {
        const timeArray = item.time.split('-');
        let year = timeArray[0];
        let month = timeArray[1];
        const day = timeArray[2];
        // 根据start_date和end_date判断是否current、prev、next
        const currentYear = current_date.split('-')[0];
        const currentMonth = current_date.split('-')[1];
        if (month === currentMonth) {
          month = 'current';
        } else if (
          year > currentYear ||
          (year === currentYear && month > currentMonth)
        ) {
          month = 'next';
        } else {
          month = 'prev';
        }
        const { type, status, is_return, cycle, is_return_week, id } = item;
        let statusArray = [];
        // is_return 是否是复诊日 1是 -1不是
        if (is_return == 1) {
          statusArray.push('doctor');
        }
        switch (type) {
          case 1:
            statusArray.push('heart');
            break;
          case 2:
            statusArray.push('watch');
            break;
        }
        switch (status) {
          case 1:
            statusArray.push('none');
            break;
          case 2:
            statusArray.push('ok');
            break;
          case 3:
            statusArray.push('halfOk');
            break;
        }
        days_style.push({
          month,
          day,
          status: statusArray,
          cycle,
          is_return_week,
          is_return,
          id
        });
      }
      this.setData({
        days_style
      });
    }
  },
  handleDayClick: async function(e) {
    let { time, id } = e.detail;
    const { today } = this.data;

    const timeArr = time.split('-');
    const clickTime = new Date(timeArr[0], timeArr[1], timeArr[2]).valueOf();
    const before = clickTime < today;
    const equal = clickTime == today;
    if (id && before) {
      const actions = await app.HttpService.getControl({ date: time }).then(
        res => res.data
      );
      if (actions.length == 1) {
        if (actions[0].key == 'return') {
          goToDetail({ index: 3, time, before });
        } else {
          goToDetail({ index: 4, time });
        }
      } else {
        app.WxService.showActionSheet({
          itemList: actions.map(item => item.value)
        })
          .then(res => {
            if (!res.cancel) {
              if (actions[res.tapIndex].key == 'return') {
                goToDetail({ index: 3, time, before });
              } else {
                goToDetail({ index: 4, time });
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    } else if (equal) {
      const { chooseDay: actions, is_need_confirm } = this.data;
      const doActions = chooseDay => {
        if (chooseDay.length == 1) {
          switch (chooseDay[0].key) {
            case 'heal':
              goToDetail({ index: 1, time });
              break;
            case 'watch':
              goToDetail({ index: 2, time });
              break;
            case 'return':
              goToDetail({ index: 3, time, before });
              break;
          }
        } else {
          app.WxService.showActionSheet({
            itemList: chooseDay.map(item => item.value)
          })
            .then(res => {
              if (!res.cancel) {
                if (chooseDay[res.tapIndex].key == 'return') {
                  goToDetail({ index: 3, time, before });
                } else if (chooseDay[res.tapIndex].key == 'heal') {
                  goToDetail({ index: 1, time });
                } else if (chooseDay[res.tapIndex].key == 'watch') {
                  goToDetail({ index: 2, time });
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      };
      let chooseDay = actions;
      if (is_need_confirm == 1) {
        // 需要弹窗提示昨日是否进行了治疗
        app.WxService.showModal({
          title: '确认',
          content: '您昨天是否进行了治疗？',
          cancelText: '否',
          confirmText: '是'
        }).then(res => {
          if (res.confirm) {
            chooseDay = actions.yes;
            doActions(chooseDay);
          } else if (res.cancel) {
            chooseDay = actions.no;
            doActions(chooseDay);
          }
        });
      } else {
        doActions(chooseDay);
      }
    }
    function goToDetail({ index, time, before }) {
      wx.navigateTo({
        url: `/pages/log/detail_${index}?time=${time}&before=${before}`
      });
    }
  },
  handleDayLongPress: function(e) {
    const { is_return, time } = e.detail;
    const that = this;
    if (is_return != 1) {
      // 设置为复诊日
      app.HttpService.setReturnDay({ date: time })
        .then(res => {
          this.getCalendar();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // 取消设置为复诊日
      wx.showModal({
        title: '警告',
        content: '确定要取消复诊吗？',
        success(res) {
          if (res.confirm) {
            app.HttpService.unsetReturnDay({ date: time }).then(res => {
              that.getCalendar();
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  },
  handleClickPrev: function(e) {
    const { start_date, end_date, current_date } = this.data;
    this.setData(
      {
        start_date: moment(start_date)
          .subtract(1, 'M')
          .format('YYYY-MM-DD'),
        end_date: moment(end_date)
          .subtract(1, 'M')
          .format('YYYY-MM-DD'),
        current_date: moment(current_date)
          .subtract(1, 'M')
          .format('YYYY-MM-DD')
      },
      this.getCalendar
    );
  },
  handleClickNext: function(e) {
    const { start_date, end_date, current_date } = this.data;
    this.setData(
      {
        start_date: moment(start_date)
          .add(1, 'M')
          .format('YYYY-MM-DD'),
        end_date: moment(end_date)
          .add(1, 'M')
          .format('YYYY-MM-DD'),
        current_date: moment(current_date)
          .add(1, 'M')
          .format('YYYY-MM-DD')
      },
      this.getCalendar
    );
  }
});
