//index.js
//获取应用实例

import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';
import {
  handleInput,
  hanldSelectChange,
  initMultiOptions,
  handleCheckboxChange
} from './formUtils';
import { all_body, all_head, all_part } from './part';
const app = getApp();

Page({
  data: {
    firstBasic: false,
    firstCase: false,
    currentPage: '',
    allPartSelected: false,
    returnPeriod: [
      {
        value: 20,
        text: '20天'
      },
      {
        value: 40,
        text: '40天'
      },
      {
        value: 60,
        text: '60天'
      },
      {
        value: 0,
        text: '不设定'
      }
    ],
    dayRadioArray: [
      {
        value: '1',
        text: '两日模式'
      },
      {
        value: '2',
        text: '三日模式'
      },
      {
        value: '3',
        text: '自定义模式'
      }
    ],
    dataRadioArray: [
      {
        value: '1',
        text: '剂量模式'
      },
      {
        value: '2',
        text: '时间模式'
      }
    ],
    showTip: true,
    body: all_body,
    head: all_head,
    all_part: all_part,
    current: 0 // 0 body, 1 head
  },
  onLoad: async function() {
    let [basicInfo, caseInfo] = await Promise.all([
      app.HttpService.getBasicInfo({}),
      app.HttpService.getBasicCase({})
    ]);
    const handleBasicInfo = () => {
      basicInfo = basicInfo.data;
      // 初始化使用的药物;
      let myUseWays =
        (basicInfo.user_medical && basicInfo.user_medical.use_ways) || [];
      let all_use_ways = basicInfo.use_ways || [];
      const { handledAllOptions: use_ways } = initMultiOptions(
        all_use_ways,
        myUseWays
      );
      // 初始化对光疗的了解
      let myKnows =
        (basicInfo.user_medical && basicInfo.user_medical.knows) || [];
      let all_knows = basicInfo.knows || [];
      const firstBasic = basicInfo.is_first === 1;
      const { handledAllOptions: knows } = initMultiOptions(all_knows, myKnows);
      this.setData({
        ...basicInfo,
        use_ways,
        knows,
        user_medical: basicInfo.user_medical || {},
        firstBasic,
        currentPage: firstBasic ? 'basic' : 'case',
      });
    };
    const handleCaseInfo = () => {
      caseInfo = caseInfo.data;
      const firstCase = caseInfo.is_first === 1;
      let {
        model: { data_type = 2, day_type = 1, return_day = 20 } = {}
      } = caseInfo;
      // 兼容处理
      if (!data_type) {
        data_type = 2;
      }
      if (!day_type) {
        day_type = 1;
      }
      if (!return_day && return_day !== 0) {
        return_day = 20;
      }
      let { dataRadioArray, dayRadioArray } = this.data;
      dataRadioArray = dataRadioArray.map(item => {
        item.checked = item.value == data_type;
        return item;
      });
      dayRadioArray = dayRadioArray.map(item => {
        item.checked = item.value == day_type;
        return item;
      });
      this.setData({
        dataRadioArray,
        dayRadioArray,
        return_day
      });

      const { part = [] } = caseInfo;
      const handledPart = part.map(({ part_key, part_name }) => ({
        part_key,
        part_name,
        text: part_name
      }));
      // 如果是全选模式
      if (handledPart.length === 1 && handledPart[0].part_key === '000') {
        this.setData({
          allPartSelected: true
        });
        this.handleAllSelected(true);
      } else {
        this.computeParts(handledPart);
      }
      // this.setTextPart(part);
      this.setData({
        ...caseInfo,
        firstCase
        // part: handledPart
      });
    };
    handleBasicInfo();
    handleCaseInfo();
  },
  onUnload: function() {
    const pages = getCurrentPages();
    const len = pages.length;
    const prevRroute = pages[len - 2];
    if (prevRroute && prevRroute.route == 'pages/log/index') {
      // 如果是从日历页跳转过来，给上一页面设置状态
      prevRroute.setData({
        backAgain: true
      });
    }
  },
  handleInput: function(e) {
    handleInput.call(this, e);
  },
  hanldSelectChange: function(e) {
    hanldSelectChange.call(this, e);
  },
  handleCheckboxChange: function(e, allOptions, allOptionStr, preHandler) {
    handleCheckboxChange.call(this, e, allOptions, allOptionStr, preHandler);
  },
  useWaysChange: function(e) {
    this.handleCheckboxChange(e, this.data.use_ways, 'use_ways', true);
  },
  knowsChange: function(e) {
    this.handleCheckboxChange(e, this.data.knows, 'knows', true);
  },
  changeUseDrug: function(e) {
    this.setData({
      use_drug: e.detail.tags
    });
  },
  setTextPart: function(part) {
    const textPart = part.map(item => item.part_name);
    this.setData({
      textPart
    });
  },
  changePart: function(e) {
    const part = e.detail.tags;
    if (part.part_key === '000') {
      this.handleAllSelected(false);
    } else {
      this.computeParts(part);
    }
  },
  togglePart: function(e) {
    const { key } = e.currentTarget.dataset;
    if (key != '116' && key != '313') {
      // 如果该部位还没有添加过，则添加
      let part;
      // 如果原来是全部部位，则操作无效
      if (this.data.part.length === 1 && this.data.part[0].part_key === '000') {
        return;
        // const all = this.data.body.concat(this.data.head).map(item => ({part_key: item.part_key, part_name: item.part_name}))
        // part = all.filter(part => part.part_key !== key);
      } else {
        const index = this.data.part.findIndex(part => part.part_key === key);
        if (index < 0) {
          const addedPart = this.findPartByKey(key);
          part = [...this.data.part, addedPart[0]];
        } else {
          // 如果该部位已经添加过，则取消该部位
          part = this.data.part.filter(part => part.part_key !== key);
        }
      }
      // 更新part,textPart的数据
      this.computeParts(part);
    }
  },
  setSexBody: function(body) {
    const sexBody = body.filter(item => {
      if (this.data.sex == 1) {
        return item.part_key != '115';
      } else {
        return item.part_key != '116';
      }
    });
    this.setData({
      sexBody
    });
  },
  computeParts: function(selectedParts = []) {
    const { body, head } = this.data;
    const handledBody = setSelected(body);
    const handledHead = setSelected(head);
    if (this.isAllSelected({ body: handledBody, head: handledHead })) {
      this.setData({
        allPartSelected: true,
        part: all_part
      });
      this.setTextPart(all_part);
    } else {
      this.setData({
        allPartSelected: false,
        part: selectedParts
      });
      this.setTextPart(selectedParts);
    }
    this.setData(
      {
        body: handledBody
      },
      () => this.setSexBody(handledBody)
    );
    this.setData({
      head: handledHead
    });
    function setSelected(data) {
      const copyData = [...data];
      for (let part of copyData) {
        if (selectedParts.find(item => item.part_key == part.part_key)) {
          part.selected = true;
          part.active = true;
        } else {
          part.selected = false;
          part.active = false;
        }
      }
      return copyData;
    }
  },
  isAllSelected: function({ body, head }) {
    const sexBody = body.filter(item => {
      if (this.data.sex == 1) {
        return item.part_key != '115';
      } else {
        return item.part_key != '116';
      }
    });
    const allBodySelected = sexBody.filter(item => !item.selected).length === 0;
    const allHeadSelected =
      head
        .filter(item => item.part_key !== '313')
        .filter(item => !item.selected).length === 0;
    return allBodySelected && allHeadSelected;
  },
  toggleSelectAllPart: function(e) {
    let selected;
    if (e.detail.value[0] === '1') {
      selected = true;
    } else {
      selected = false;
    }
    this.setData({
      allPartSelected: selected
    });
    this.handleAllSelected(selected);
  },
  handleAllSelected: function(selected) {
    const { body, head } = this.data;
    const handledBody = setSelected(body);
    const handledHead = setSelected(head);
    if (selected) {
      this.setTextPart(all_part);
      this.setData({
        part: all_part
      });
    } else {
      this.setTextPart([]);
      this.setData({
        part: []
      });
    }
    this.setData(
      {
        body: handledBody
      },
      () => this.setSexBody(handledBody)
    );
    this.setData({
      head: handledHead
    });

    function setSelected(data) {
      const copyData = [...data];
      for (let part of copyData) {
        if (selected) {
          part.selected = true;
          part.active = true;
        } else {
          part.selected = false;
          part.active = false;
        }
      }
      return copyData;
    }
  },
  findPartByKey(part_key) {
    const { body, head } = this.data;
    const flatParts = body.concat(head);
    return flatParts.filter(part => part.part_key == part_key);
  },
  editBasicInfo: function(e) {
    const validate = () => {
      let flag = true;
      let msg = '';
      if (!this.data.user_medical.medical_type) {
        msg = '请选择疾病类型';
        flag = false;
      } else if (!this.data.user_medical.birthday) {
        msg = '请选择生日';
        flag = false;
      } else if (!this.data.user_medical.age) {
        msg = '请填写首发病年龄';
        flag = false;
      } else if (
        !this.data.user_medical.use_ways ||
        !this.data.user_medical.use_ways.length
      ) {
        msg = '请选择曾用疗法';
        flag = false;
      } else if (
        !this.data.user_medical.knows ||
        !this.data.user_medical.knows.length
      ) {
        msg = '请选择对光疗的了解';
        flag = false;
      }
      return {
        flag,
        msg
      };
    };
    const { flag, msg } = validate();
    if (!flag) {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      });
    } else {
      const {
        user_name,
        medical_type,
        birthday,
        age,
        use_ways,
        knows
      } = this.data.user_medical;
      const postData = {
        user_name,
        medical_type,
        birthday,
        age,
        use_ways,
        knows
      };
      app.HttpService.setBasicInfo(postData)
        .then(data => {
          this.setData({
            currentPage: 'case',
            firstBasic: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  gotoBasic: function(e) {
    this.setData({
      currentPage: 'basic'
    });
  },
  editBasicCase: function(e) {
    const validate = () => {
      let flag = true;
      let msg = '';
      if (!this.data.part || !this.data.part.length) {
        msg = '请选择身体部位';
        flag = false;
      }
      return {
        flag,
        msg
      };
    };
    const { flag, msg } = validate();
    if (!flag) {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      });
    } else {
      const postCase = () => {
        const { dataRadioArray, dayRadioArray } = this.data;
        let data_type = dataRadioArray
          .filter(type => type.checked)
          .map(type => type.value);
        data_type = Number(data_type[0]);
        let day_type = dayRadioArray
          .filter(type => type.checked)
          .map(type => type.value);
        day_type = Number(day_type[0]);
        const part = this.data.part.map(({ part_key, part_name }) => ({
          part_key,
          part_name
        }));
        const { use_drug, return_day } = this.data;
        const postData = {
          use_drug,
          part,
          day_type,
          data_type,
          return_day
        };
        app.HttpService.setBasicCase(postData)
          .then(data => {
            wx.showToast({
              title: '恭喜你，保存成功！',
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
      };
      if (this.data.firstCase) {
        postCase();
      } else {
        app.WxService.showModal({
          title: '确认',
          content:
            '提交基础病历后，会为您开启一个新的计划，旧的治疗计划也将随之失效，请谨慎修改。是否确认提交？'
        }).then(res => {
          if (res.confirm) {
            postCase();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        });
      }
    }
  },
  closeTip: function(e) {
    this.setData({
      showTip: false
    });
  },
  changeSwiper: function(e) {
    const { current } = e.detail;
    this.setData({
      current
    });
  },
  changeCurrent: function(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      current: Number(index)
    });
  },
  toPreCurrent: function(e) {
    this.setData({
      current: 0
    });
  },
  toNextCurrent: function(e) {
    this.setData({
      current: 1
    });
  },
  dayChange: function(e) {
    let day_type;
    if (e.detail.value) {
      day_type = 2;
    } else {
      day_type = 1;
    }
    this.setData({
      day_type
    });
  },
  dataChange: function(e) {
    let data_type;
    if (e.detail.value) {
      data_type = 2;
    } else {
      data_type = 1;
    }
    this.setData({
      data_type
    });
  },
  hanldRadioChange: function(e, radioArry, key) {
    const v = e.detail.value;
    radioArry = radioArry.map(item => {
      item.checked = item.value == v;
      return item;
    });
    this.setData({
      [key]: radioArry
    });
  },
  handleDataTypeChange: function(e) {
    this.hanldRadioChange(e, this.data.dataRadioArray, 'dataRadioArray');
  },
  handleDayTypeChange: function(e) {
    this.hanldRadioChange(e, this.data.dayRadioArray, 'dayRadioArray');
  }
});
