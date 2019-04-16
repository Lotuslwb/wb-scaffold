//index.js
//获取应用实例

import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';
import moment from '../../js/moment.min';

const app = getApp();
import {
  handleInput,
  hanldSelectChange,
  initMultiOptions,
  handleCheckboxChange
} from './formUtils';

Page({
  data: {
    city: [],
    radioArry: [{
        value: '1',
        text: '男'
      },
      {
        value: '2',
        text: '女'
      }
    ]
  },
  onLoad: async function () {
    const resData = await app.HttpService.queryUserInfo({}).then(
      res => res.data
    );
    const age = resData.birthday ? moment().year() - moment(resData.birthday).year() : null
    this.setData({
      ...resData,
      username: resData.name || '',
      radioArry: this.data.radioArry.map(item => {
        item.checked = (item.text == resData.gender_text)
        return item;
      }),
      city: (resData.city && resData.city.split('-')) || '',
      age,
    })
  },
  handleInput: function (e) {
    handleInput.call(this, e);
  },
  hanldSelectChange: function (e) {
    hanldSelectChange.call(this, e);
  },
  hanldRadioChange: function (e) {
    let radioArry = this.data.radioArry;
    const v = e.detail.value;
    radioArry = radioArry.map(item => {
      item.checked = item.value == v;
      return item;
    });
    this.setData({
      radioArry
    });
  },
  submitHandle: function (e) {
    const {
      username,
      mobile,
      radioArry,
      city,
      age,
    } = this.data;
    let sex = radioArry
      .filter(sex => sex.checked)
      .map(sex => sex.value);
    if (sex.length) {
      sex = Number(sex[0]);
    }
    const postData = {
      classroom_id: app.globalData.room_id,
      username,
      mobile,
      sex,
      // country: city[0],
      // province: city[1],
      city: city.toString(),
      age,
    };
    app.HttpService.signUpRoom(postData)
      .then(data => {
        wx.navigateTo({
          url: '/pages/im/start?id=' + app.globalData.room_id
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
});

//eFIgHLeI