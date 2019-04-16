//index.js
//获取应用实例

import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';
import qiniuUploader from '../../plugins/qiniuUploader';
import { handleInput, hanldSelectChange } from '../form/formUtils';
const app = getApp();
let wxapp_id = '10001';

Page({
  data: {
    type: 2,
    all_reaction: ['无反应', '轻微红斑', '明显红斑', '严重红斑/水泡'],
    all_assessment: ['无改善', '轻微改善', '已痊愈', '恶化']
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
      initDetail(today);
      // this.splitDetail(today);
      this.setData({
        detail: today,
      })
    }

    function initDetail(detail) {
      detail.map(item => {
        if (!item.reaction) {
          item.reaction = '无反应';
        }
        if (!item.appraise) {
          item.appraise = '无改善';
        }
        return item;
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
  handleInput: function(e) {
    handleInput.call(this, e);
    this.splitDetail(this.data.detail);
  },
  hanldSelectChange: function(e) {
    hanldSelectChange.call(this, e);
    this.splitDetail(this.data.detail);
  },
  chooseImage: async function(e) {
    const { index } = e.currentTarget.dataset;
    let filePath = await app.WxService.chooseImage({
      count: 1
    }).then(res => res.tempFilePaths[0]);
    this.qiniuUploadFile(filePath, res => {
      const copyData = [...this.data.detail];
      copyData[index].img_url = res.imageURL;
      this.setData({
        detail: copyData
      });
      this.splitDetail(copyData);
    });
  },
  qiniuUploadFile: async function(filePath, cb) {
    const { domain, token } = await app.HttpService.uploadToken({
      wxapp_id: wxapp_id
    }).then(res => res.data);
    qiniuUploader.upload(
      filePath,
      res => {
        cb && cb(res);
      },
      error => {
        console.log('error: ' + error);
      },
      {
        region: 'ECN',
        domain: domain, // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
        uptoken: token // 由其他程序生成七牛 uptoken
      },
      res => {
        console.log('上传进度', res.progress);
        console.log('已经上传的数据长度', res.totalBytesSent);
        console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
      }
    );
  },
  deletePic: function(e) {
    const { index } = e.currentTarget.dataset;
    const copyData = [...this.data.detail];
    copyData[index].img_url = '';
    this.setData({
      detail: copyData
    });
    this.splitDetail(copyData);
  },

  editRecord: function(e) {
    const { record_id, plan_id, detail, type } = this.data;
    // const test = detail.map(item => {
    //   item.img_url = 'http://res.shsmiles.com/201812031604585ab248763.jpg';
    //   return item
    // });
    const postData = {
      type,
      record_id,
      plan_id,
      detail,
      // detail: test,
    };
    // 必填项校验：img_url,time,reaction（有默认值）, appraise（有默认值）; flag: 0失败，1成功
    let msg = '';
    let flag = 1;
    // 客户说img_url不用校验
    // for (let item of detail) {
    //   if (!item.img_url) {
    //     msg = '请上传患处图片'
    //     flag = 0;
    //     break;
    //   }
    // }

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
            icon: 'none',
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
    let firstObj = {appraise: tmp[0].appraise, reaction: tmp[0].reaction, remark: tmp[0].remark}
    tmp = tmp.map(item => ({...item, ...firstObj}))
    this.setData({
      detail: tmp,
    })
  },
});
