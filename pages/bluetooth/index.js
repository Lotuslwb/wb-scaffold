//index.js
//获取应用实例

import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';
import bluetoothUtil from '../../plugins/wxBlueTooth/index';

const app = getApp();


Page({
  data: {

  },

  handleMsgCode: function (e) {

  },

  onLoad: function () {
    this.test();
  },
  onShow: function () {

  },
  test: function () {
    debugger;
    bluetoothUtil.startConnect();
  },
  getScan: async () => {
    let qcode = await app.WxService.scanCode({
      onlyFromCamera: false,
    }).then(res => {
      return res.result;
    });
    console.log(qcode);
  }
});