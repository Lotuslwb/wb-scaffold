//index.js
//获取应用实例

import regeneratorRuntime, {
  async
} from '../../plugins/regenerator-runtime/runtime';
import {
  handleInput,
  hanldSelectChange,
  initMultiOptions,
  handleMultiSelectChange
} from './formUtils';
import {proposal} from '../../data/proposal';
const app = getApp();

Page({
  data: {
    // posX: 10,
    // all_attention_type: [],
    // all_job: [],
    visible: false,
    proposal: proposal,
    city: [],
    radioArry: [
      {
        value: '1',
        text: '男'
      },
      {
        value: '2',
        text: '女'
      }
    ]
  },
  onLoad: async function() {
    const resData = await app.HttpService.queryUserInfo({}).then(
      res => res.data
    );
    const gender = resData.gender_text;
    let radioArry = this.data.radioArry;
    // resData.city = resData.city.split('-');
    radioArry = radioArry.map(item => {
      item.checked = item.text == gender;
      return item;
    });
    // 初始化已选的类型
    // let attention_type = resData.attention_type || [];
    // let all_attention_type = resData.all_attention_type || [];
    // const { handledAllOptions } = initMultiOptions(
    //   all_attention_type,
    //   attention_type
    // );
    this.setData({
      ...resData,
      radioArry,
      // attention_type,
      // all_attention_type: handledAllOptions
    });
  },
  handleInput: function(e) {
    handleInput.call(this, e);
  },
  hanldSelectChange: function(e) {
    hanldSelectChange.call(this, e);
  },
  hanldRadioChange: function(e) {
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
  handleMultiSelectChange: function(e, allOptions, allOptionStr) {
    handleMultiSelectChange.call(this, e, allOptions, allOptionStr);
  },
  changeAttentionType: function(e) {
    this.handleMultiSelectChange(
      e,
      this.data.all_attention_type,
      'all_attention_type'
    );
  },
  getPhoneNumber: async function(e) {
    //点击获取手机号码按钮
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    if (e.detail.errMsg !== 'getPhoneNumber:fail user deny') {
      //同意授权
      const resData = await app.HttpService.getPhone({
        data: encryptedData,
        iv
      })
        .then(res => res.data)
        .catch(err => {
          console.log(err);
        });
      this.setData({
        mobile: resData.purePhoneNumber
      });
    } else {
      console.log('用户不同意授权');
    }
  },
  validate: function() {
    let flag = true;
    let msg = '';
    const { mobile, radioArry } = this.data;
    let gender = radioArry
      .filter(gender => gender.checked)
      .map(gender => gender.value);
    if (!mobile) {
      msg = '请进行手机号授权';
      flag = false;
    } else if (!gender.length) {
      msg = '请选择性别';
      flag = false;
    }
    return {
      flag,
      msg
    };
  },
  editInfo: function(e) {
    const { flag, msg } = this.validate();
    if (!flag) {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      });
    } else {
      const {
        // name,
        mobile,
        radioArry,
        // city,
        // job,
        // sign,
        // attention_type
      } = this.data;
      let gender = radioArry
        .filter(gender => gender.checked)
        .map(gender => gender.value);
      if (gender.length) {
        gender = Number(gender[0]);
      }
      const postData = {
        // name,
        mobile,
        gender,
        // country: city[0],
        // province: city[1],
        // city: city[2],
        // job,
        // sign,
        // attention_type: attention_type && attention_type.join('-')
      };
      app.HttpService.postUserInfo(postData)
        .then(data => {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 2000,
            success: () => {
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/index/index'
                });
              }, 2000);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  showModal: function(e) {
    this.setData({
      visible: true,
    })
  },
  hideModal: function(e) {
    this.setData({
      visible: false,
    })
  },
});
