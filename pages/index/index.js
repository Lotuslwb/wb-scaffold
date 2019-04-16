//index.js
//获取应用实例

import regeneratorRuntime, {
  async
} from '../../plugins/regenerator-runtime/runtime';
const app = getApp();

Page({
  data: {
    today:
      '' +
      new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      new Date().getDate()
  },

  handleMsgCode: function(e) {
    var value = e.detail.value;
  },

  // onLoad: async function() {
  //   const homeData = await app.HttpService.indexHome({}).then(res => res.data);
  //   this.setData({
  //     homeData
  //   });
  // },
  onShow: async function() {
    const homeData = await app.HttpService.indexHome({}).then(res => res.data);
    this.setData({
      homeData
    });
    const { enable_type: chooseDay = [] } = homeData;
    this.setData({
      chooseDay
    });
  },
  gotoHandle: function(e) {
    const { url, type } = e.currentTarget.dataset;
    if (type == 'navbar') {
      wx.switchTab({
        url: url
      });
    } else if (type == 'web') {
      const { detail, url } = e.currentTarget.dataset;

      // 由于详情页的url链接字符串里有问号等特殊字符，不能直接从url里传过去，所以存储在本地
      wx.setStorageSync('articleUrl', detail);
      wx.navigateTo({
        url
      });
    } else {
      wx.navigateTo({
        url
      });
    }
  },
  getScan: async () => {
    let qcode = await app.WxService.scanCode({
      onlyFromCamera: false
    }).then(res => {
      return res.result;
    });
  },
  chooseToDaka: function() {
    const { chooseDay: actions, today: time } = this.data;
    const { have_plan, is_need_confirm } = this.data.homeData;
    const doActions = (chooseDay) => {
      if (chooseDay.length == 1) {
        switch (chooseDay[0].key) {
          case 'heal':
            goToDetail({ index: 1, time });
            break;
          case 'watch':
            goToDetail({ index: 2, time });
            break;
          case 'return':
            goToDetail({ index: 3, time });
            break;
        }
      } else {
        app.WxService.showActionSheet({
          itemList: chooseDay.map(item => item.value)
        })
          .then(res => {
            if (!res.cancel) {
              if (chooseDay[res.tapIndex].key == 'return') {
                goToDetail({ index: 3, time });
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
    if (have_plan == 1) {
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
    } else {
      // 未完善基础病历，提示用户去完善
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
    }

    function goToDetail({ index, time }) {
      wx.navigateTo({
        url: `/pages/log/detail_${index}?time=${time}`
      });
    }
  }
});
